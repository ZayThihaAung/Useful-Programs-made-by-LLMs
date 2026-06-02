import {LESSONS} from "./lesson.js";
// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let currentLesson = 0;
let done = new Set(JSON.parse(localStorage.getItem("se_code_done") || "[]"));

function saveDone() { localStorage.setItem("se_code_done", JSON.stringify([...done])); }

function updateProgress() {
  const total = LESSONS.length;
  const completed = [...done].filter(id => LESSONS.find(l => l.id === id)).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById("pbarFill").style.width = pct + "%";
  document.getElementById("pbarLabel").textContent = `${completed}/${total}`;
}

// ─────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────
function renderTabs() {
  const bar = document.getElementById("tabBar");
  bar.innerHTML = "";
  LESSONS.forEach((l, i) => {
    const tab = document.createElement("div");
    tab.className = "tab" + (i === currentLesson ? " active" : "");
    tab.innerHTML = `<span class="dot" style="background:${l.color}"></span>${l.title}`;
    tab.onclick = () => { currentLesson = i; render(); };
    bar.appendChild(tab);
  });
}

function renderSidebar() {
  const el = document.getElementById("sidebarContent");
  el.innerHTML = "";

  const cats = [...new Set(LESSONS.map(l => l.category))];
  cats.forEach(cat => {
    const sec = document.createElement("div");
    sec.className = "sidebar-section";
    sec.innerHTML = `<div class="sidebar-heading">${cat}</div>`;
    LESSONS.filter(l => l.category === cat).forEach((l, _) => {
      const idx = LESSONS.indexOf(l);
      const isDone = done.has(l.id);
      const item = document.createElement("div");
      item.className = "lesson-item" + (idx === currentLesson ? " active" : "") + (isDone ? " done" : "");
      item.innerHTML = `
        <span class="lesson-num">${String(idx + 1).padStart(2, "0")}</span>
        <span class="lesson-title">${l.title}</span>
        <span class="lesson-check">✓</span>
      `;
      item.onclick = () => { currentLesson = idx; render(); };
      sec.appendChild(item);
    });
    el.appendChild(sec);
  });
}

function renderMain() {
  const lesson = LESSONS[currentLesson];
  const el = document.getElementById("mainContent");
  el.scrollTop = 0;

  let html = `
    <div class="lesson-header">
      <div class="lesson-badge">
        <span class="dot" style="background:${lesson.color}"></span>
        ${lesson.category} &nbsp;·&nbsp; Lesson ${currentLesson + 1} of ${LESSONS.length}
      </div>
      <div class="lesson-name">${lesson.title}</div>
      <div class="lesson-intro">${lesson.intro}</div>
    </div>
  `;

  lesson.sections.forEach(sec => {
    if (sec.type === "code") {
      html += `
        <div style="margin-bottom:6px">
          <div class="ec-label ${sec.labelColor}">${sec.label}</div>
        </div>
        <div class="code-block">
          <div class="code-header">
            <div class="code-dots">
              <div class="code-dot dot-red"></div>
              <div class="code-dot dot-yellow"></div>
              <div class="code-dot dot-green"></div>
            </div>
            <div class="code-filename">${sec.filename}</div>
            <div class="code-lang">${sec.lang}</div>
          </div>
          <div class="code-body"><pre>${sec.code}</pre></div>
        </div>
      `;
    } else if (sec.type === "runner") {
      const id = "runner_" + Math.random().toString(36).slice(2);
      html += `
        <div class="test-runner">
          <div class="test-runner-header">
            <span class="test-runner-title">🧪 ${sec.label}</span>
            <button class="run-btn" onclick="runTests('${id}', ${JSON.stringify(sec.tests).replace(/"/g, '&quot;')})">▶ Run Tests</button>
          </div>
          <div class="test-output" id="${id}">
            <span class="test-info">Press ▶ Run Tests to execute...</span>
          </div>
        </div>
      `;
    } else if (sec.type === "terms") {
      const items = sec.items.map(t => `
        <div class="explain-card term-card">
          <div class="ec-label blue">TERM</div>
          <div class="ec-title">${t.term}</div>
          <div class="ec-body">${t.def}</div>
        </div>
      `).join("");
      html += `<div style="margin-bottom:8px"><div class="ec-label blue">▼ KEY TERMS IN THIS LESSON</div></div>${items}`;
    } else if (sec.type === "convo") {
      const bubbles = sec.bubbles.map(b => `
        <div class="bubble-row ${b.side === "right" ? "right" : ""}">
          <div class="avatar ${b.avClass}">${b.av}</div>
          <div class="bubble">
            <div class="speaker">${b.speaker}</div>
            ${b.text}
          </div>
        </div>
      `).join("");
      html += `
        <div class="convo">
          <div class="convo-label">${sec.label}</div>
          ${bubbles}
        </div>
      `;
    } else if (sec.type === "tip") {
      html += `
        <div class="explain-card tip-card">
          <div class="ec-label yellow">💡 PRO TIP</div>
          <div class="ec-body">${sec.text}</div>
        </div>
      `;
    }
  });

  const isDone = done.has(lesson.id);
  html += `
    <button class="done-btn ${isDone ? "completed" : ""}" id="doneBtn" onclick="markDone()">
      ${isDone ? "✓ Completed" : "✓ Mark as Done"}
    </button>
    <div class="lesson-nav">
      ${currentLesson > 0 ? `<button class="nav-btn" onclick="goLesson(${currentLesson - 1})">← Previous</button>` : ""}
      ${currentLesson < LESSONS.length - 1 ? `<button class="nav-btn next" onclick="goLesson(${currentLesson + 1})">Next Lesson →</button>` : ""}
    </div>
  `;

  el.innerHTML = html;
}

function runTests(id, tests) {
  const el = document.getElementById(id);
  let html = "";
  let pass = 0;
  tests.forEach((t, i) => {
    setTimeout(() => {
      if (t.pass) {
        html += `<div class="test-pass">✓ PASSED &nbsp; ${t.name}</div>`;
        pass++;
      } else {
        html += `<div class="test-fail">✗ FAILED &nbsp; ${t.name}</div>`;
      }
      if (i === tests.length - 1) {
        html += `<div class="test-summary">\n${pass}/${tests.length} tests passed in 0.${(12 + pass * 3)}s</div>`;
      }
      el.innerHTML = html;
    }, i * 280);
  });
}

function markDone() {
  const lesson = LESSONS[currentLesson];
  done.has(lesson.id) ? done.delete(lesson.id) : done.add(lesson.id);
  saveDone();
  render();
}

function goLesson(idx) {
  currentLesson = idx;
  render();
}

function render() {
  renderTabs();
  renderSidebar();
  renderMain();
  updateProgress();
}

// Tooltip
const tooltip = document.getElementById("tooltip");
document.addEventListener("mouseover", (e) => {
  const t = e.target.closest("[data-tip]");
  if (!t) { tooltip.classList.remove("show"); return; }
  document.getElementById("ttTerm").textContent = t.dataset.term || "";
  document.getElementById("ttDef").textContent = t.dataset.tip || "";
  tooltip.classList.add("show");
});

document.addEventListener("mousemove", (e) => {
  if (!tooltip.classList.contains("show")) return;
  let x = e.clientX + 14, y = e.clientY + 14;
  if (x + 330 > window.innerWidth) x = e.clientX - 334;
  if (y + 120 > window.innerHeight) y = e.clientY - 124;
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
});

document.addEventListener("mouseout", (e) => {
  if (!e.target.closest("[data-tip]")) tooltip.classList.remove("show");
});

render();

// prevent not defined error when running tests
window.runTests = runTests;
window.markDone = markDone;
window.goLesson = goLesson;
window.render = render;
