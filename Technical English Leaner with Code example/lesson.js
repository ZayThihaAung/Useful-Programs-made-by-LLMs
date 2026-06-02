export const LESSONS = [
  // ── LESSON 1: Unit Testing ──────────────────────────────────────────────
  {
    id: "unit-test",
    title: "Unit Test",
    color: "#3fb950",
    category: "Debug & Quality",
    intro: `A <span class="term-highlight">unit test</span> is code that tests another small piece of code automatically.
    You write a function, then write a test to prove it works correctly — including when things go wrong.
    Below is a real Python example: a shopping cart, and tests for it.`,
    sections: [
      {
        type: "code",
        filename: "cart.py",
        lang: "python",
        label: "THE PROGRAM (what we're testing)",
        labelColor: "muted",
        code: `<span class="cm"># cart.py — a simple shopping cart</span>
<span class="cm"># This is the code our unit tests will verify.</span>

<span class="kw">class</span> <span class="cls">ShoppingCart</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="param">self</span>):
        <span class="cm"># This stores the cart's current state</span>
        <span class="param">self</span>.items = []

    <span class="kw">def</span> <span class="fn">add_item</span>(<span class="param">self</span>, <span class="param">name</span>, <span class="param">price</span>):
        <span class="cm"># Guard clause: reject negative prices (an edge case)</span>
        <span class="kw">if</span> price <span class="op">&lt;</span> <span class="num">0</span>:
            <span class="kw">raise</span> <span class="cls">ValueError</span>(<span class="str">"Price cannot be negative"</span>)
        <span class="param">self</span>.items.append({<span class="str">"name"</span>: name, <span class="str">"price"</span>: price})

    <span class="kw">def</span> <span class="fn">get_total</span>(<span class="param">self</span>) <span class="op">-&gt;</span> <span class="ret">float</span>:
        <span class="cm"># Iterates over items and sums up the prices</span>
        <span class="kw">return</span> sum(item[<span class="str">"price"</span>] <span class="kw">for</span> item <span class="kw">in</span> <span class="param">self</span>.items)

    <span class="kw">def</span> <span class="fn">remove_item</span>(<span class="param">self</span>, <span class="param">name</span>):
        <span class="cm"># Filter out the first item that matches the name</span>
        <span class="param">self</span>.items = [i <span class="kw">for</span> i <span class="kw">in</span> <span class="param">self</span>.items <span class="kw">if</span> i[<span class="str">"name"</span>] <span class="op">!=</span> name]

    <span class="kw">def</span> <span class="fn">is_empty</span>(<span class="param">self</span>) <span class="op">-&gt;</span> <span class="ret">bool</span>:
        <span class="kw">return</span> <span class="bool">len</span>(<span class="param">self</span>.items) <span class="op">==</span> <span class="num">0</span>`
      },
      {
        type: "code",
        filename: "test_cart.py",
        lang: "python",
        label: "THE UNIT TESTS",
        labelColor: "green",
        code: `<span class="cm"># test_cart.py — unit tests for ShoppingCart</span>
<span class="cm">#</span>
<span class="cm"># Each test function is completely independent (isolated).</span>
<span class="cm"># It sets up its own data, runs one assertion, and tears down.</span>
<span class="cm"># This is the "Arrange → Act → Assert" pattern.</span>

<span class="kw">import</span> pytest
<span class="kw">from</span> cart <span class="kw">import</span> <span class="cls">ShoppingCart</span>


<span class="kw">class</span> <span class="cls">TestShoppingCart</span>:

    <span class="kw">def</span> <span class="fn">test_new_cart_is_empty</span>(<span class="param">self</span>):
        <span class="cm"># Arrange: create a fresh cart</span>
        cart = <span class="cls">ShoppingCart</span>()

        <span class="cm"># Assert: a new cart should have no items (base case)</span>
        <span class="kw">assert</span> cart.<span class="fn">is_empty</span>() <span class="op">==</span> <span class="bool">True</span>


    <span class="kw">def</span> <span class="fn">test_add_item_updates_total</span>(<span class="param">self</span>):
        <span class="cm"># Arrange</span>
        cart = <span class="cls">ShoppingCart</span>()

        <span class="cm"># Act: call the function we're testing</span>
        cart.<span class="fn">add_item</span>(<span class="str">"Apple"</span>, <span class="num">1.50</span>)
        cart.<span class="fn">add_item</span>(<span class="str">"Bread"</span>, <span class="num">3.00</span>)

        <span class="cm"># Assert: total should be the sum of both items</span>
        <span class="kw">assert</span> cart.<span class="fn">get_total</span>() <span class="op">==</span> <span class="num">4.50</span>


    <span class="kw">def</span> <span class="fn">test_remove_item_reduces_total</span>(<span class="param">self</span>):
        cart = <span class="cls">ShoppingCart</span>()
        cart.<span class="fn">add_item</span>(<span class="str">"Apple"</span>, <span class="num">1.50</span>)
        cart.<span class="fn">add_item</span>(<span class="str">"Milk"</span>, <span class="num">2.00</span>)

        cart.<span class="fn">remove_item</span>(<span class="str">"Apple"</span>)

        <span class="cm"># Assert: only Milk remains</span>
        <span class="kw">assert</span> cart.<span class="fn">get_total</span>() <span class="op">==</span> <span class="num">2.00</span>


    <span class="kw">def</span> <span class="fn">test_negative_price_raises_error</span>(<span class="param">self</span>):
        <span class="cm"># This tests an EDGE CASE: what if price is negative?</span>
        <span class="cm"># We expect a ValueError to be RAISED (thrown).</span>
        cart = <span class="cls">ShoppingCart</span>()

        <span class="kw">with</span> pytest.raises(<span class="cls">ValueError</span>):
            cart.<span class="fn">add_item</span>(<span class="str">"Broken item"</span>, <span class="num">-5.00</span>)  <span class="cm"># should throw!</span>`
      },
      {
        type: "runner",
        label: "RUN THE TESTS",
        tests: [
          { name: "test_new_cart_is_empty", pass: true },
          { name: "test_add_item_updates_total", pass: true },
          { name: "test_remove_item_reduces_total", pass: true },
          { name: "test_negative_price_raises_error", pass: true },
        ]
      },
      {
        type: "terms",
        items: [
          { term: "Unit Test", def: "A test that checks ONE small piece of code in isolation. Each test function = one unit test." },
          { term: "Assert", def: "The check. `assert x == 4.50` means: 'I claim this must be true — if it's not, FAIL the test.'" },
          { term: "Edge Case", def: "An unusual input at the boundary — like a negative price. You must test these, they're where bugs hide." },
          { term: "Arrange → Act → Assert", def: "The 3-step pattern every unit test follows: set up data → do the thing → check the result." },
          { term: "Raise / Throw", def: "When code hits an error it can't handle, it raises (Python) or throws (JS/Java) an exception." },
          { term: "Isolated", def: "Each test runs independently with no shared state. Tests must not depend on each other." },
        ]
      },
      {
        type: "convo",
        label: "WHAT ENGINEERS SAY (in code review)",
        bubbles: [
          { side:"left",  av:"DEV", avClass:"av-dev", speaker:"Junior Dev",
            text: `I added <span class="hl" title="A test that verifies one small unit of code">unit tests</span> for the cart. All four <span class="hl" title="The checks inside a test that verify the output">assertions</span> pass.` },
          { side:"right", av:"SR",  avClass:"av-sr",  speaker:"Senior Dev",
            text: `Nice. Did you test the <span class="hl" title="Unusual or extreme input at the boundary of normal usage">edge case</span> where the price is zero? That might be valid but we should check it explicitly.` },
          { side:"left",  av:"DEV", avClass:"av-dev", speaker:"Junior Dev",
            text: `Good catch — I only tested negative. I'll add a test for zero price and make sure it doesn't <span class="hl" title="When code hits an error it cannot handle, it raises/throws an exception">throw</span>.` },
        ]
      },
      {
        type: "tip",
        text: `When a test catches a bug before deployment, engineers say: <strong>"the test caught the regression"</strong>.
        A <strong>regression</strong> is when new code breaks something that used to work.
        That's the whole point of unit tests — they're your safety net.`
      }
    ]
  },

  // ── LESSON 2: Refactoring ──────────────────────────────────────────────
  {
    id: "refactoring",
    title: "Refactoring",
    color: "#ffa657",
    category: "Core Concepts",
    intro: `<span class="term-highlight">Refactoring</span> means rewriting code to be cleaner — <em>without changing what it does</em>.
    Below is the same function written badly, then refactored. The output is identical. The code is night and day.`,
    sections: [
      {
        type: "code",
        filename: "before_refactor.py",
        lang: "python",
        label: "BEFORE — messy code (works but hard to maintain)",
        labelColor: "pink",
        code: `<span class="cm"># ❌ BEFORE refactoring</span>
<span class="cm"># This works but it's a mess. Hard to read, hard to test, full of issues.</span>

<span class="kw">def</span> <span class="fn">p</span>(<span class="param">d</span>):                               <span class="cm"># ← bad name: what is "p"? what is "d"?</span>
    x = <span class="num">0</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="param">d</span>:
        <span class="kw">if</span> i[<span class="str">'s'</span>] <span class="op">==</span> <span class="str">'active'</span>:           <span class="cm"># ← magic string, no explanation</span>
            <span class="kw">if</span> i[<span class="str">'r'</span>] <span class="op">==</span> <span class="str">'admin'</span>:
                x <span class="op">+=</span> i[<span class="str">'sal'</span>] <span class="op">*</span> <span class="num">1.2</span>       <span class="cm"># ← magic number 1.2 — what is it??</span>
            <span class="kw">else</span>:
                x <span class="op">+=</span> i[<span class="str">'sal'</span>]
    <span class="kw">return</span> x`
      },
      {
        type: "code",
        filename: "after_refactor.py",
        lang: "python",
        label: "AFTER — refactored (same result, clean code)",
        labelColor: "green",
        code: `<span class="cm"># ✅ AFTER refactoring</span>
<span class="cm"># Same logic. Same output. But now anyone can read it.</span>

<span class="cm"># Named constant instead of a magic number</span>
ADMIN_BONUS_MULTIPLIER = <span class="num">1.2</span>

<span class="kw">def</span> <span class="fn">calculate_total_payroll</span>(<span class="param">employees</span>: <span class="ret">list</span>) <span class="op">-&gt;</span> <span class="ret">float</span>:
    <span class="str">"""
    Calculate the total payroll for all active employees.
    Admins receive a 20% bonus on their base salary.
    """</span>
    total = <span class="num">0.0</span>

    <span class="kw">for</span> employee <span class="kw">in</span> employees:
        <span class="kw">if</span> employee[<span class="str">"status"</span>] <span class="op">!=</span> <span class="str">"active"</span>:
            <span class="kw">continue</span>                         <span class="cm"># skip inactive employees</span>

        salary = employee[<span class="str">"salary"</span>]

        <span class="cm"># Extracted into a helper — now testable in isolation</span>
        <span class="kw">if</span> <span class="fn">_is_admin</span>(employee):
            salary <span class="op">*=</span> ADMIN_BONUS_MULTIPLIER

        total <span class="op">+=</span> salary

    <span class="kw">return</span> total


<span class="kw">def</span> <span class="fn">_is_admin</span>(<span class="param">employee</span>: <span class="ret">dict</span>) <span class="op">-&gt;</span> <span class="ret">bool</span>:
    <span class="cm"># Underscore prefix means this is a private helper function</span>
    <span class="kw">return</span> employee[<span class="str">"role"</span>] <span class="op">==</span> <span class="str">"admin"</span>`
      },
      {
        type: "terms",
        items: [
          { term: "Refactoring", def: "Rewriting code to be cleaner without changing its behavior. Same output, better code." },
          { term: "Magic Number", def: "A raw number in code with no name or explanation. `1.2` means nothing. `ADMIN_BONUS_MULTIPLIER = 1.2` is clear." },
          { term: "Magic String", def: "Same as magic number but text — `'s'`, `'r'`, `'sal'` are terrible key names. `'status'`, `'role'`, `'salary'` are clear." },
          { term: "Extract Function", def: "A refactoring move: pull logic out of a big function into a smaller named one (`_is_admin`). Now it's testable and readable." },
          { term: "Docstring", def: "The triple-quoted comment inside a function explaining what it does. Part of good documentation." },
          { term: "Private Helper", def: "A function only meant to be used inside the same file/class. Python convention: prefix with `_`." },
        ]
      },
      {
        type: "convo",
        label: "IN A CODE REVIEW",
        bubbles: [
          { side:"left", av:"DEV", avClass:"av-dev", speaker:"Junior Dev",
            text: `Done! The payroll function is working.` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Senior Dev",
            text: `Good, but I left a comment — can you <span class="hl" title="Rewrite code to be cleaner without changing what it does">refactor</span> it? There are <span class="hl" title="Raw numbers in code with no explanation — hard to understand">magic numbers</span> and single-letter variable names. It'll be a pain to maintain.` },
          { side:"left", av:"DEV", avClass:"av-dev", speaker:"Junior Dev",
            text: `Sure — I'll <span class="hl" title="A refactoring move: pull logic into a smaller named function">extract</span> the admin logic into a helper and replace the magic numbers with named constants.` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Senior Dev",
            text: `Perfect. The <span class="hl" title="The external behavior — what the function returns — must stay the same">behavior</span> stays the same, just cleaner. LGTM after that.` },
        ]
      },
      {
        type: "tip",
        text: `<strong>"LGTM"</strong> = "Looks Good To Me" — the most common code review approval phrase.
        When a senior says "LGTM after that fix", it means: make that one change and you're cleared to merge.
        <strong>"Nit"</strong> (short for nitpick) is a minor style suggestion that doesn't block the PR.`
      }
    ]
  },

  // ── LESSON 3: Debugging ──────────────────────────────────────────────
  {
    id: "debugging",
    title: "Debugging & Stack Trace",
    color: "#d2a8ff",
    category: "Debug & Quality",
    intro: `<span class="term-highlight">Debugging</span> is the process of finding and fixing bugs.
    A <span class="term-highlight">stack trace</span> is the error report Python gives you — it shows exactly where the crash happened.
    Learning to read one is one of the most vital skills you'll develop.`,
    sections: [
      {
        type: "code",
        filename: "user_service.py",
        lang: "python",
        label: "THE BUGGY CODE",
        labelColor: "pink",
        code: `<span class="cm"># user_service.py</span>
<span class="cm"># This code has a bug. Can you spot it before running it?</span>

<span class="kw">def</span> <span class="fn">get_user_email</span>(<span class="param">users</span>, <span class="param">user_id</span>):
    <span class="str">"""Look up a user's email by their ID."""</span>
    user = users.get(user_id)            <span class="cm"># returns None if not found</span>
    <span class="kw">return</span> user[<span class="str">"email"</span>]               <span class="cm"># ← BUG: crashes if user is None!</span>


<span class="cm"># Simulate a database of users</span>
user_db = {
    <span class="num">1</span>: {<span class="str">"name"</span>: <span class="str">"Alice"</span>, <span class="str">"email"</span>: <span class="str">"alice@example.com"</span>},
    <span class="num">2</span>: {<span class="str">"name"</span>: <span class="str">"Bob"</span>,   <span class="str">"email"</span>: <span class="str">"bob@example.com"</span>},
}

<span class="cm"># This works fine:</span>
<span class="fn">print</span>(<span class="fn">get_user_email</span>(user_db, <span class="num">1</span>))      <span class="cm"># → alice@example.com ✅</span>

<span class="cm"># This crashes — user ID 99 does not exist (an edge case!)</span>
<span class="fn">print</span>(<span class="fn">get_user_email</span>(user_db, <span class="num">99</span>))     <span class="cm"># 💥 TypeError!</span>`
      },
      {
        type: "code",
        filename: "terminal output",
        lang: "bash",
        label: "THE STACK TRACE (read it bottom-to-top)",
        labelColor: "pink",
        code: `<span class="cm">$ python user_service.py</span>
alice@example.com

Traceback (most recent call last):
  File <span class="str">"user_service.py"</span>, line <span class="num">16</span>, in <span class="op">&lt;</span>module<span class="op">&gt;</span>
    print(get_user_email(user_db, <span class="num">99</span>))   <span class="cm">← 3. The line that triggered it</span>
  File <span class="str">"user_service.py"</span>, line <span class="num">6</span>, in <span class="fn">get_user_email</span>
    return user[<span class="str">"email"</span>]                 <span class="cm">← 2. The function where it broke</span>
<span class="pink">TypeError</span>: <span class="str">'NoneType' object is not subscriptable</span>  <span class="cm">← 1. START HERE</span>

<span class="cm"># Translation: user is None. You can't do None["email"].</span>
<span class="cm"># Root cause: we never handled the case where user_id doesn't exist.</span>`
      },
      {
        type: "code",
        filename: "user_service_fixed.py",
        lang: "python",
        label: "THE FIX — handle the None case",
        labelColor: "green",
        code: `<span class="kw">def</span> <span class="fn">get_user_email</span>(<span class="param">users</span>, <span class="param">user_id</span>):
    <span class="str">"""
    Look up a user's email by their ID.
    Returns None if the user is not found (instead of crashing).
    """</span>
    user = users.get(user_id)

    <span class="cm"># Guard clause: handle the None case explicitly</span>
    <span class="kw">if</span> user <span class="kw">is</span> <span class="bool">None</span>:
        <span class="kw">return</span> <span class="bool">None</span>           <span class="cm"># or raise a custom UserNotFoundError</span>

    <span class="kw">return</span> user[<span class="str">"email"</span>]   <span class="cm"># safe — we know user exists here</span>


<span class="cm"># Now we can handle the result gracefully in the caller</span>
email = <span class="fn">get_user_email</span>(user_db, <span class="num">99</span>)
<span class="kw">if</span> email <span class="kw">is</span> <span class="bool">None</span>:
    <span class="fn">print</span>(<span class="str">"User not found."</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(email)


<span class="cm"># ─── Unit tests for the fixed version ───────────────────────────</span>

<span class="kw">def</span> <span class="fn">test_existing_user_returns_email</span>():
    result = <span class="fn">get_user_email</span>(user_db, <span class="num">1</span>)
    <span class="kw">assert</span> result <span class="op">==</span> <span class="str">"alice@example.com"</span>

<span class="kw">def</span> <span class="fn">test_missing_user_returns_none</span>():
    <span class="cm"># This test covers the edge case we just fixed</span>
    result = <span class="fn">get_user_email</span>(user_db, <span class="num">99</span>)
    <span class="kw">assert</span> result <span class="kw">is</span> <span class="bool">None</span>          <span class="cm"># must NOT crash</span>`
      },
      {
        type: "runner",
        label: "RUN TESTS AFTER THE FIX",
        tests: [
          { name: "test_existing_user_returns_email", pass: true },
          { name: "test_missing_user_returns_none", pass: true },
        ]
      },
      {
        type: "terms",
        items: [
          { term: "Stack Trace / Traceback", def: "Python's error report. Read it from the BOTTOM up — the bottom line is the actual error type and message." },
          { term: "Root Cause", def: "The real reason a bug exists. Here: we never handled the case where `user_id` doesn't exist." },
          { term: "Guard Clause", def: "An early `if` check at the top of a function that handles invalid input before the real logic runs." },
          { term: "Null / None", def: "A value meaning 'nothing here'. In Python it's `None`. Forgetting to handle None is one of the most common bugs." },
          { term: "Reproduce", def: "Making the bug happen reliably. You must reproduce a bug before you can fix it." },
          { term: "TypeError", def: "A specific error type: you used a value as the wrong type. `None['email']` = TypeError." },
        ]
      },
      {
        type: "convo",
        label: "DEBUGGING CONVERSATION",
        bubbles: [
          { side:"left", av:"DEV", avClass:"av-dev", speaker:"Junior Dev",
            text: `The app crashed in production. I see a <span class="hl" title="Python's error report showing the sequence of calls that led to the crash">traceback</span> but I don't understand it.` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Senior Dev",
            text: `Read it from the bottom up. The last line is the actual error. What does it say?` },
          { side:"left", av:"DEV", avClass:"av-dev", speaker:"Junior Dev",
            text: `TypeError: 'NoneType' object is not subscriptable. Line 6 in get_user_email.` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Senior Dev",
            text: `Classic. <span class="hl" title="The real underlying reason why a bug exists">Root cause</span>: you're not handling the case where the user doesn't exist. Add a <span class="hl" title="An early if-check that handles invalid input before the real logic">guard clause</span> for None. Then write a test to cover that <span class="hl" title="Unusual or extreme input at the boundary of normal usage">edge case</span> so it never regresses.` },
        ]
      }
    ]
  },

  // ── LESSON 4: API ──────────────────────────────────────────────
  {
    id: "api",
    title: "API & Endpoints",
    color: "#58a6ff",
    category: "Core Concepts",
    intro: `An <span class="term-highlight">API</span> (Application Programming Interface) is how two programs talk to each other.
    A <span class="term-highlight">REST API</span> uses HTTP — the same protocol as websites.
    Below is a real Flask API with endpoints, and then code that <em>calls</em> that API.`,
    sections: [
      {
        type: "code",
        filename: "api_server.py",
        lang: "python",
        label: "THE API SERVER (Flask)",
        labelColor: "blue",
        code: `<span class="cm"># api_server.py — a simple REST API</span>
<span class="cm"># This EXPOSES endpoints that other code can call.</span>

<span class="kw">from</span> flask <span class="kw">import</span> Flask, jsonify, request

app = <span class="cls">Flask</span>(__name__)

<span class="cm"># Simulated in-memory database (not a real DB for simplicity)</span>
books = {
    <span class="num">1</span>: {<span class="str">"title"</span>: <span class="str">"Clean Code"</span>,        <span class="str">"author"</span>: <span class="str">"Robert Martin"</span>},
    <span class="num">2</span>: {<span class="str">"title"</span>: <span class="str">"The Pragmatic Programmer"</span>, <span class="str">"author"</span>: <span class="str">"Hunt & Thomas"</span>},
}


<span class="cm"># ENDPOINT 1: GET /books — returns all books</span>
<span class="cm"># HTTP GET = "read data, don't change anything"</span>
<span class="deco">@app.route(<span class="str">"/books"</span>, methods=[<span class="str">"GET"</span>])</span>
<span class="kw">def</span> <span class="fn">get_all_books</span>():
    <span class="kw">return</span> <span class="fn">jsonify</span>(books), <span class="num">200</span>       <span class="cm"># 200 = OK (success)</span>


<span class="cm"># ENDPOINT 2: GET /books/&lt;id&gt; — returns one book</span>
<span class="deco">@app.route(<span class="str">"/books/&lt;int:book_id&gt;"</span>, methods=[<span class="str">"GET"</span>])</span>
<span class="kw">def</span> <span class="fn">get_book</span>(<span class="param">book_id</span>):
    book = books.get(book_id)
    <span class="kw">if</span> book <span class="kw">is</span> <span class="bool">None</span>:
        <span class="kw">return</span> <span class="fn">jsonify</span>({<span class="str">"error"</span>: <span class="str">"Not found"</span>}), <span class="num">404</span>   <span class="cm"># 404 = Not Found</span>
    <span class="kw">return</span> <span class="fn">jsonify</span>(book), <span class="num">200</span>


<span class="cm"># ENDPOINT 3: POST /books — creates a new book</span>
<span class="cm"># HTTP POST = "create new data"</span>
<span class="deco">@app.route(<span class="str">"/books"</span>, methods=[<span class="str">"POST"</span>])</span>
<span class="kw">def</span> <span class="fn">create_book</span>():
    <span class="cm"># Parse the JSON body from the request</span>
    data = request.get_json()

    <span class="cm"># Validate required fields (input validation)</span>
    <span class="kw">if</span> <span class="str">"title"</span> <span class="kw">not in</span> data <span class="kw">or</span> <span class="str">"author"</span> <span class="kw">not in</span> data:
        <span class="kw">return</span> <span class="fn">jsonify</span>({<span class="str">"error"</span>: <span class="str">"title and author required"</span>}), <span class="num">400</span>  <span class="cm"># 400 = Bad Request</span>

    new_id = max(books.keys()) <span class="op">+</span> <span class="num">1</span>
    books[new_id] = data
    <span class="kw">return</span> <span class="fn">jsonify</span>({<span class="str">"id"</span>: new_id, <span class="op">**</span>data}), <span class="num">201</span>  <span class="cm"># 201 = Created</span>`
      },
      {
        type: "code",
        filename: "api_client.py",
        lang: "python",
        label: "CALLING THE API (the client side)",
        labelColor: "muted",
        code: `<span class="cm"># api_client.py — code that CONSUMES the API</span>
<span class="cm"># This is what your frontend, mobile app, or another service would do.</span>

<span class="kw">import</span> requests   <span class="cm"># the Python HTTP library</span>

BASE_URL = <span class="str">"http://localhost:5000"</span>


<span class="kw">def</span> <span class="fn">fetch_all_books</span>():
    <span class="cm"># Make a GET request to the /books endpoint</span>
    response = requests.<span class="fn">get</span>(<span class="str">f"{BASE_URL}/books"</span>)

    <span class="cm"># Check the status code to know if it worked</span>
    <span class="kw">if</span> response.status_code <span class="op">==</span> <span class="num">200</span>:
        <span class="kw">return</span> response.<span class="fn">json</span>()    <span class="cm"># parse the JSON response body</span>
    <span class="kw">else</span>:
        <span class="fn">print</span>(<span class="str">f"Error: {response.status_code}"</span>)
        <span class="kw">return</span> []


<span class="kw">def</span> <span class="fn">create_new_book</span>(<span class="param">title</span>, <span class="param">author</span>):
    <span class="cm"># Send a POST request with a JSON payload (request body)</span>
    payload = {<span class="str">"title"</span>: title, <span class="str">"author"</span>: author}
    response = requests.<span class="fn">post</span>(<span class="str">f"{BASE_URL}/books"</span>, json=payload)

    <span class="kw">if</span> response.status_code <span class="op">==</span> <span class="num">201</span>:             <span class="cm"># 201 = Created ✅</span>
        <span class="fn">print</span>(<span class="str">"Book created!"</span>, response.<span class="fn">json</span>())
    <span class="kw">elif</span> response.status_code <span class="op">==</span> <span class="num">400</span>:           <span class="cm"># 400 = Bad Request</span>
        <span class="fn">print</span>(<span class="str">"Validation error:"</span>, response.<span class="fn">json</span>()[<span class="str">"error"</span>])


<span class="cm"># ─── Usage ─────────────────────────────────────────</span>
all_books = <span class="fn">fetch_all_books</span>()
<span class="fn">print</span>(all_books)

<span class="fn">create_new_book</span>(<span class="str">"Refactoring"</span>, <span class="str">"Martin Fowler"</span>)  <span class="cm"># → 201 Created</span>
<span class="fn">create_new_book</span>(<span class="str">"Missing Author"</span>, <span class="str">""</span>)             <span class="cm"># → depends on validation</span>`
      },
      {
        type: "terms",
        items: [
          { term: "API Endpoint", def: "A specific URL your API exposes. `/books` is an endpoint. Each endpoint does one specific thing." },
          { term: "HTTP Method", def: "GET = read. POST = create. PUT/PATCH = update. DELETE = delete. These are the verbs of REST APIs." },
          { term: "Status Code", def: "A number in the response meaning: 200=OK, 201=Created, 400=Bad Request, 404=Not Found, 500=Server Error." },
          { term: "Request / Response", def: "Client sends a request. Server sends back a response. Every API call is a request-response cycle." },
          { term: "JSON", def: "JavaScript Object Notation — the format used to send data between client and server. `{\"key\": \"value\"}`." },
          { term: "Payload / Request Body", def: "The data you send WITH a POST/PUT request. The content being created or updated." },
          { term: "Expose vs Consume", def: "The server EXPOSES an API. The client CONSUMES it. Two common verbs engineers use." },
        ]
      },
      {
        type: "convo",
        label: "SPRINT PLANNING MEETING",
        bubbles: [
          { side:"left", av:"PM", avClass:"av-pm", speaker:"Product Manager",
            text: `We need the mobile app to show the book list. When can that be done?` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Backend Dev",
            text: `I'll <span class="hl" title="Make a service available for other code to use">expose</span> a GET <span class="hl" title="A specific URL your API exposes — each does one thing">endpoint</span> at /books by end of today. Mobile team can start <span class="hl" title="Using/calling an API">consuming</span> it tomorrow.` },
          { side:"left", av:"DEV", avClass:"av-dev", speaker:"Mobile Dev",
            text: `What <span class="hl" title="HTTP status codes — numbers meaning OK, Created, Not Found etc">status codes</span> should I handle? Just 200?` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Backend Dev",
            text: `Handle 200 for success and 404 for not found. I'll document the full <span class="hl" title="The format of data exchanged between client and server">JSON</span> <span class="hl" title="The structure or format of data sent in a request or response">payload</span> in the API docs.` },
        ]
      }
    ]
  },

  // ── LESSON 5: Technical Debt ──────────────────────────────────────────────
  {
    id: "tech-debt",
    title: "Technical Debt",
    color: "#e3b341",
    category: "Process",
    intro: `<span class="term-highlight">Technical debt</span> is what you accumulate when you take shortcuts.
    It's code that works today but will cost you more time to deal with later.
    This lesson shows real code before and after debt is "paid down".`,
    sections: [
      {
        type: "code",
        filename: "notifications.py",
        lang: "python",
        label: "HIGH DEBT CODE — quick and dirty",
        labelColor: "pink",
        code: `<span class="cm"># notifications.py — written in a rush before a deadline</span>
<span class="cm"># TECHNICAL DEBT: works but is a nightmare to extend or test</span>

<span class="kw">def</span> <span class="fn">send_notification</span>(<span class="param">user</span>, <span class="param">type</span>):
    <span class="cm"># Hardcoded logic — adding new notification types means</span>
    <span class="cm"># editing this function forever. This is called a code smell.</span>
    <span class="kw">if</span> type <span class="op">==</span> <span class="str">"email"</span>:
        <span class="fn">print</span>(<span class="str">f"Sending email to {user['email']}"</span>)
        <span class="cm"># actual email logic is copy-pasted 3 times elsewhere too 😬</span>
    <span class="kw">elif</span> type <span class="op">==</span> <span class="str">"sms"</span>:
        <span class="fn">print</span>(<span class="str">f"Sending SMS to {user['phone']}"</span>)
    <span class="kw">elif</span> type <span class="op">==</span> <span class="str">"push"</span>:
        <span class="fn">print</span>(<span class="str">f"Sending push to device {user['device_id']}"</span>)
    <span class="cm"># What happens when we add Slack? WhatsApp? Discord?</span>
    <span class="cm"># This if-chain grows forever. DEBT IS ACCUMULATING.</span>`
      },
      {
        type: "code",
        filename: "notifications_refactored.py",
        lang: "python",
        label: "DEBT PAID — extensible design",
        labelColor: "green",
        code: `<span class="cm"># notifications_refactored.py</span>
<span class="cm"># Paying down debt: we use an interface (abstract base class)</span>
<span class="cm"># so each channel is its own class. Adding Slack = add one class.</span>

<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod

<span class="cm"># Define the interface (contract) every channel must follow</span>
<span class="kw">class</span> <span class="cls">NotificationChannel</span>(ABC):
    <span class="deco">@abstractmethod</span>
    <span class="kw">def</span> <span class="fn">send</span>(<span class="param">self</span>, <span class="param">user</span>: <span class="ret">dict</span>, <span class="param">message</span>: <span class="ret">str</span>) <span class="op">-&gt;</span> <span class="ret">None</span>:
        ...


<span class="cm"># Each channel is now isolated, independently testable</span>
<span class="kw">class</span> <span class="cls">EmailChannel</span>(<span class="cls">NotificationChannel</span>):
    <span class="kw">def</span> <span class="fn">send</span>(<span class="param">self</span>, <span class="param">user</span>, <span class="param">message</span>):
        <span class="fn">print</span>(<span class="str">f"[Email] → {user['email']}: {message}"</span>)

<span class="kw">class</span> <span class="cls">SMSChannel</span>(<span class="cls">NotificationChannel</span>):
    <span class="kw">def</span> <span class="fn">send</span>(<span class="param">self</span>, <span class="param">user</span>, <span class="param">message</span>):
        <span class="fn">print</span>(<span class="str">f"[SMS]   → {user['phone']}: {message}"</span>)

<span class="kw">class</span> <span class="cls">SlackChannel</span>(<span class="cls">NotificationChannel</span>):  <span class="cm"># ← NEW: zero if-chain changes</span>
    <span class="kw">def</span> <span class="fn">send</span>(<span class="param">self</span>, <span class="param">user</span>, <span class="param">message</span>):
        <span class="fn">print</span>(<span class="str">f"[Slack] → @{user['slack_handle']}: {message}"</span>)


<span class="cm"># The service just works with any channel — no if-chains</span>
<span class="kw">class</span> <span class="cls">NotificationService</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="param">self</span>, <span class="param">channel</span>: <span class="cls">NotificationChannel</span>):
        <span class="param">self</span>.channel = channel

    <span class="kw">def</span> <span class="fn">notify</span>(<span class="param">self</span>, <span class="param">user</span>, <span class="param">message</span>):
        <span class="param">self</span>.channel.<span class="fn">send</span>(user, message)


<span class="cm"># ─── Unit tests are now easy to write ─────────────</span>
<span class="kw">def</span> <span class="fn">test_email_channel_sends_to_email</span>():
    user = {<span class="str">"email"</span>: <span class="str">"alice@example.com"</span>}
    <span class="cm"># Each channel can be tested in complete isolation</span>
    channel = <span class="cls">EmailChannel</span>()
    channel.<span class="fn">send</span>(user, <span class="str">"Hello!"</span>)              <span class="cm"># no crash = pass</span></span>

<span class="kw">def</span> <span class="fn">test_service_uses_provided_channel</span>():
    <span class="cm"># Dependency injection: we inject the channel at construction</span>
    user = {<span class="str">"slack_handle"</span>: <span class="str">"alice"</span>}
    service = <span class="cls">NotificationService</span>(<span class="cls">SlackChannel</span>())
    service.<span class="fn">notify</span>(user, <span class="str">"Deploy succeeded!"</span>)   <span class="cm"># no crash = pass</span>`
      },
      {
        type: "terms",
        items: [
          { term: "Technical Debt", def: "The future cost of shortcuts taken today. The messy if-chain works now, but every new channel makes it harder." },
          { term: "Code Smell", def: "A sign that code has a problem — not necessarily a bug, but something that will cause pain. A growing if-chain is a classic smell." },
          { term: "Abstract Base Class / Interface", def: "A contract that says: 'any class that extends me MUST have these methods'. Enables swappable components." },
          { term: "Dependency Injection", def: "Passing a dependency (like `channel`) into a class instead of creating it inside. Makes testing much easier." },
          { term: "Extensible", def: "Code that's easy to add new behavior to without changing existing code. The refactored version is extensible." },
          { term: "Pay Down Debt", def: "Engineers say 'pay down tech debt' when they spend time cleaning up old messy code." },
        ]
      },
      {
        type: "convo",
        label: "SPRINT RETROSPECTIVE",
        bubbles: [
          { side:"left", av:"DEV", avClass:"av-dev", speaker:"Dev",
            text: `Adding the Slack notification took two days because I had to untangle the old if-chain. That hurt.` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Tech Lead",
            text: `That's <span class="hl" title="The accumulated cost of shortcuts — it costs more and more over time">technical debt</span> biting us. We shipped fast months ago but now every feature is slowing down.` },
          { side:"left", av:"PM", avClass:"av-pm", speaker:"Product Manager",
            text: `Can we fix it? How long would it take?` },
          { side:"right", av:"SR", avClass:"av-sr", speaker:"Tech Lead",
            text: `One sprint to <span class="hl" title="Rewrite code to be cleaner without changing behavior">refactor</span> the notification system. It'll feel slow now but it'll <span class="hl" title="Code that's easy to add new behavior to">make it extensible</span> — future channels are just new classes, no touching the core logic.` },
        ]
      }
    ]
  }
];