const TERMS = [
  // ── CORE PROGRAMMING ──────────────────────────────────────────
  { cat:"core", term:"Algorithm", pronun:"/ˈælɡərɪðəm/",
    def:"A precise, step-by-step set of instructions to solve a specific problem. Every program is built from algorithms — from sorting a list to finding the shortest route.",
    ex:"\"We switched to a more efficient algorithm and the response time dropped from 3 seconds to 50ms.\"",
    phrases:["efficient algorithm","implement an algorithm","algorithm complexity","O(n) algorithm"],
    tip:"You'll hear 'algo' as shorthand. When someone says 'what's your algorithm?', they want to understand your logical approach, not just your code." },

  { cat:"core", term:"Abstraction", pronun:"/æbˈstrækʃən/",
    def:"Hiding complex implementation details behind a simpler interface. It lets you work with high-level concepts without needing to understand how they work internally.",
    ex:"\"We abstracted the payment logic into a service class — now the rest of the app just calls `processPayment()` without knowing about Stripe.\"",
    phrases:["layer of abstraction","abstract away","high-level abstraction","leaky abstraction"],
    tip:"'Leaky abstraction' is when the hidden complexity 'leaks through'. It's a negative thing — it means the abstraction isn't clean." },

  { cat:"core", term:"Refactoring", pronun:"/riːˈfæktərɪŋ/",
    def:"Restructuring existing code to improve its readability or design, without changing what it does. Think of it as cleaning your room — nothing new added, just better organized.",
    ex:"\"Before adding the new feature, can we refactor this module? It's gotten really hard to follow.\"",
    phrases:["refactor the code","refactoring sprint","safe to refactor","needs refactoring"],
    tip:"Key phrase: 'without changing its behavior'. If you're fixing bugs or adding features, that's not refactoring — it's development." },

  { cat:"core", term:"Dependency", pronun:"/dɪˈpendənsi/",
    def:"An external library, package, or module that your project relies on. If your app needs a library to work, that library is a dependency.",
    ex:"\"We have a version conflict in our dependencies — `react-router` requires React 17 but we're on React 18.\"",
    phrases:["dependency injection","circular dependency","install dependencies","dependency management","peer dependency"],
    tip:"'Dependency hell' is the informal term for when conflicting versions of dependencies make a project nearly impossible to maintain." },

  { cat:"core", term:"Scalability", pronun:"/ˌskeɪləˈbɪlɪti/",
    def:"The ability of a system to handle a growing amount of work — more users, data, or requests — without breaking or needing a complete redesign.",
    ex:"\"The app handles 1,000 users fine, but we need to think about scalability before the marketing campaign launches.\"",
    phrases:["horizontal scaling","scale up / scale out","scalability bottleneck","designed for scale","not scalable"],
    tip:"'Scale up' = bigger machine. 'Scale out' = more machines. Engineers prefer scale-out (horizontal scaling) because it's cheaper and more resilient." },

  { cat:"core", term:"API", pronun:"/ˌeɪ.piːˈaɪ/",
    def:"Application Programming Interface — a defined contract that lets two pieces of software communicate. APIs define what requests can be made, how to make them, and what responses to expect.",
    ex:"\"We're using the Stripe API to handle payments and the Twilio API to send SMS notifications.\"",
    phrases:["REST API","API endpoint","call an API","API documentation","public / private API","rate limit"],
    tip:"When you hear 'expose an API', it means making your service accessible to other developers or systems. 'Consume an API' means using one." },

  { cat:"core", term:"Edge Case", pronun:"/ˈedʒ keɪs/",
    def:"An unusual or extreme input condition at the boundaries of normal operation. Edge cases frequently cause bugs because they're easy to overlook during development.",
    ex:"\"What happens if the user's name contains an apostrophe? That's an edge case we need to handle.\"",
    phrases:["handle edge cases","edge case testing","missed an edge case","corner case","unhappy path"],
    tip:"The 'happy path' is normal usage. Edge cases and 'unhappy paths' are everything that can go wrong. Good engineers plan for both." },

  { cat:"core", term:"Iteration", pronun:"/ˌɪtəˈreɪʃən/",
    def:"Repeating a process multiple times. In code: looping through items. In product development: completing cycles of work to progressively improve a product.",
    ex:"\"We'll ship a lean version first and improve it through iterations based on real user feedback.\"",
    phrases:["iterate over","rapid iteration","next iteration","iterate on the design","iterative development"],
    tip:"This word appears in both coding ('iterate over this array') and project management ('iterate on the product'). Context makes it clear which is meant." },

  { cat:"core", term:"Bottleneck", pronun:"/ˈbɒtəlnek/",
    def:"A point in a system that limits overall performance, causing everything else to wait. Like a traffic jam on one road slowing down the entire city.",
    ex:"\"Profiling showed the database query is the bottleneck — everything else is waiting on it.\"",
    phrases:["identify the bottleneck","performance bottleneck","remove the bottleneck","CPU/memory bottleneck"],
    tip:"Always identify the bottleneck before optimizing. Optimizing the wrong part wastes time and won't improve performance." },

  { cat:"core", term:"Hardcoding", pronun:"/ˈhɑːrdˌkoʊdɪŋ/",
    def:"Embedding fixed values directly into code rather than making them configurable. This makes code rigid, harder to maintain, and dangerous if sensitive values like passwords are exposed.",
    ex:"\"Don't hardcode the API key into the source file — use an environment variable instead.\"",
    phrases:["hardcoded value","avoid hardcoding","hardcoded string","magic number"],
    tip:"A 'magic number' is a hardcoded numeric value with no explanation. Both are code smells — signs that code needs improvement." },

  { cat:"core", term:"Recursion", pronun:"/rɪˈkɜːrʒən/",
    def:"When a function calls itself as part of its own logic. It's used to solve problems that can be broken into identical smaller sub-problems, like traversing a tree.",
    ex:"\"We used recursion to traverse the nested folder structure — each folder calls the same function on its subfolders.\"",
    phrases:["recursive function","base case","recursive call","stack overflow (from recursion)"],
    tip:"Every recursive function needs a 'base case' — a condition where it stops calling itself. Without one, you get infinite recursion and a crash." },

  { cat:"core", term:"Concurrency", pronun:"/kənˈkɜːrənsi/",
    def:"Handling multiple tasks that overlap in time. They don't necessarily run at the exact same moment, but their execution is interleaved to make progress on multiple things simultaneously.",
    ex:"\"The server handles concurrency by processing multiple requests at the same time without blocking.\"",
    phrases:["concurrent requests","concurrency issues","race condition","thread-safe","async/await"],
    tip:"'Race condition' is a famous concurrency bug: two processes access shared data at the same time, and the outcome depends on who gets there first." },

  // ── PROCESS & AGILE ──────────────────────────────────────────
  { cat:"process", term:"Sprint", pronun:"/sprɪnt/",
    def:"A fixed, short time-box (usually 1–2 weeks) in Agile development during which a team commits to completing a defined set of work from the backlog.",
    ex:"\"We have six tickets to close before the sprint ends on Friday — let's prioritize the critical bug first.\"",
    phrases:["sprint planning","sprint review","sprint retrospective","end of sprint","two-week sprint","sprint goal"],
    tip:"'Sprint planning' is how work gets into a sprint. 'Sprint review' shows stakeholders what was built. 'Retrospective' (retro) is the team reflecting on how to improve." },

  { cat:"process", term:"Backlog", pronun:"/ˈbæklɒɡ/",
    def:"A prioritized list of all features, bugs, and tasks that need to be done. The team pulls work from the top of the backlog when planning what to tackle next.",
    ex:"\"Product added twenty items to the backlog this week. We need a grooming session to prioritize them.\"",
    phrases:["product backlog","backlog grooming","add to the backlog","clear the backlog","backlog refinement","technical backlog"],
    tip:"'Backlog grooming' (or refinement) means cleaning up the list: clarifying unclear tickets, breaking large items into smaller ones, and re-prioritizing." },

  { cat:"process", term:"Pull Request", pronun:"/pʊl rɪˈkwest/",
    def:"A request to merge your code changes into the main codebase. It's a formal mechanism for peer review, discussion, and approval before code becomes official.",
    ex:"\"My PR is ready for review — I've added tests and updated the docs. Can you take a look?\"",
    phrases:["open a PR","review the PR","approve/merge the PR","PR comments","request changes","PR description"],
    tip:"Also called 'MR' (merge request) on GitLab. A good PR has a clear description, is small enough to review easily, and includes tests." },

  { cat:"process", term:"Technical Debt", pronun:"/ˈteknɪkəl det/",
    def:"The accumulated cost of shortcuts and poor decisions made in the past. Like financial debt, it grows over time — the longer you ignore it, the more expensive it becomes to fix.",
    ex:"\"We shipped fast for the launch, but now we're drowning in technical debt. We need a dedicated cleanup sprint.\"",
    phrases:["accumulate tech debt","pay down tech debt","incur tech debt","refactor to reduce debt","debt ceiling"],
    tip:"Not all tech debt is bad — sometimes a deliberate shortcut makes sense. The key is acknowledging it and planning to address it later." },

  { cat:"process", term:"Deployment", pronun:"/dɪˈplɔɪmənt/",
    def:"The process of making your application available to users by releasing it to a live server or platform. Deployments can be manual or fully automated.",
    ex:"\"The Friday afternoon deployment caused an outage — we now have a rule: no deploys on Fridays.\"",
    phrases:["deploy to production","deployment pipeline","rollback a deployment","zero-downtime deployment","blue-green deployment"],
    tip:"'Rollback' is reverting to the previous version when a deployment causes problems. 'Zero-downtime deployment' means releasing without the site going offline." },

  { cat:"process", term:"Standup", pronun:"/ˈstændˌʌp/",
    def:"A brief daily team meeting (≤15 min) where each member shares what they did yesterday, what they'll do today, and any blockers. Designed to keep everyone aligned.",
    ex:"\"Mention the API issue in standup so the team knows you're blocked and someone can help.\"",
    phrases:["daily standup","async standup","standup update","share in standup","standup notes"],
    tip:"'Async standup' is a written version (via Slack/Notion) for remote teams in different timezones — everyone posts their update without meeting in real time." },

  { cat:"process", term:"Blocker", pronun:"/ˈblɒkər/",
    def:"Anything preventing a developer from making progress — a missing decision, a broken API, an unclear requirement, or a dependency on another team's work.",
    ex:"\"I'm blocked waiting for the design mockups — I can't start the frontend without knowing the final layout.\"",
    phrases:["raise a blocker","unblocked","blocked by","clear the blocker","dependency blocker"],
    tip:"The verb form is important: 'I'm blocked' (current state) vs 'I got unblocked' (issue resolved). In standups, blockers are the most important thing to surface quickly." },

  { cat:"process", term:"Code Review", pronun:"/kōd rɪˈvjuː/",
    def:"The practice of having peers examine your code before it's merged. Reviews catch bugs, enforce standards, improve code quality, and spread knowledge across the team.",
    ex:"\"Code review isn't about finding fault — it's how we share knowledge and keep the codebase healthy.\"",
    phrases:["conduct a code review","request a review","review cycle","LGTM (looks good to me)","nit (nitpick)","blocking comment"],
    tip:"'LGTM' means the reviewer approves. A 'nit' is a minor non-blocking suggestion. A 'blocking comment' means the reviewer wants a change before approving." },

  { cat:"process", term:"Retrospective", pronun:"/ˌretrəˈspektɪv/",
    def:"A team meeting at the end of a sprint to reflect on what went well, what didn't, and what the team will change for the next sprint.",
    ex:"\"In the retro, we agreed the unclear requirements were the biggest issue last sprint. We'll do better spec reviews going forward.\"",
    phrases:["sprint retro","run a retrospective","action items from retro","what went well / what to improve","retro format"],
    tip:"A productive retro leads to concrete 'action items' — specific changes the team commits to making. Without these, retros become just venting sessions." },

  // ── INFRASTRUCTURE ──────────────────────────────────────────
  { cat:"infra", term:"Repository", pronun:"/rɪˈpɒzɪtəri/",
    def:"A storage location where a project's source code and its complete change history are tracked using version control (typically Git). Hosted on platforms like GitHub or GitLab.",
    ex:"\"Fork the repo, create a feature branch, make your changes, and submit a pull request.\"",
    phrases:["clone a repo","push to a repo","open-source repo","mono-repo","private/public repo","fork a repo"],
    tip:"'Clone' = download to your machine. 'Fork' = make your own copy on the hosting platform. 'Push' = upload your local changes back to the remote repo." },

  { cat:"infra", term:"Environment", pronun:"/ɪnˈvaɪrənmənt/",
    def:"A complete, isolated setup where an application runs. Common environments are: development (local), staging (pre-production), and production (live users).",
    ex:"\"It works in my dev environment but fails in staging. There must be a configuration difference.\"",
    phrases:["dev / staging / production environment","environment variable","environment parity","replicate the environment","config per environment"],
    tip:"Environment variables (env vars) store configuration like API keys or database URLs that differ between environments — never hardcode these values." },

  { cat:"infra", term:"CI/CD", pronun:"/ˌsiːˈaɪ ˌsiːˈdiː/",
    def:"Continuous Integration / Continuous Deployment. Automated pipelines that build, test, and deploy code on every commit. CI catches bugs early; CD gets working code to users fast.",
    ex:"\"Our CI/CD pipeline runs 600 automated tests on every commit — nothing reaches production without passing them.\"",
    phrases:["CI/CD pipeline","CI checks","deploy via CD","set up CI/CD","pipeline failed","green build"],
    tip:"'Pipeline failed' or 'CI is red' means automated tests didn't pass. Fixing a broken build is urgent — it blocks everyone who needs to merge code." },

  { cat:"infra", term:"Container", pronun:"/kənˈteɪnər/",
    def:"A lightweight, isolated package that bundles an application with all its dependencies, ensuring it runs identically on any machine. Docker is the dominant tool.",
    ex:"\"We containerized the app, so the 'works on my machine' problem is gone — it runs the same everywhere.\"",
    phrases:["Docker container","spin up a container","container image","containerize the app","container orchestration","Kubernetes (K8s)"],
    tip:"'It works on my machine' is a famous developer complaint. Containers solve this by making the environment part of the package that ships with the code." },

  { cat:"infra", term:"Load Balancer", pronun:"/loʊd ˈbælənsər/",
    def:"A system that distributes incoming traffic across multiple servers to prevent any single server from being overwhelmed, improving both reliability and speed.",
    ex:"\"We put a load balancer in front of three application servers — traffic is spread evenly and if one goes down, the others keep serving.\"",
    phrases:["set up a load balancer","behind the load balancer","round-robin","load distribution","health check"],
    tip:"Load balancers do 'health checks' — they regularly ping servers to confirm they're up. If one fails a health check, the balancer stops sending it traffic." },

  { cat:"infra", term:"Cache", pronun:"/kæʃ/",
    def:"A fast, temporary storage layer that saves the results of expensive operations so they can be served instantly on repeat requests without re-doing the work.",
    ex:"\"The API was slow because it hit the database every time. We cached the results for 5 minutes and latency dropped 90%.\"",
    phrases:["cache hit / cache miss","clear the cache","cache invalidation","in-memory cache","Redis cache","TTL (time to live)"],
    tip:"'Cache invalidation' — deciding when to clear old cached data — is famously considered one of the hardest problems in computer science. When does stale data become a problem?" },

  { cat:"infra", term:"Latency", pronun:"/ˈleɪtənsi/",
    def:"The time delay between when a request is made and when the response arrives. Low latency is fast and responsive; high latency feels slow.",
    ex:"\"Users in Southeast Asia are experiencing high latency because our only server is in Virginia — we need a CDN.\"",
    phrases:["low / high latency","reduce latency","latency issues","network latency","p99 latency","end-to-end latency"],
    tip:"'p99 latency' means the 99th percentile — 99% of requests are faster than this number. It's used because averages hide worst-case experience for real users." },

  { cat:"infra", term:"Microservices", pronun:"/ˈmaɪkrəʊˌsɜːvɪsɪz/",
    def:"An architectural style where an application is split into small, independently deployable services, each responsible for a specific function and communicating via APIs.",
    ex:"\"We broke the monolith into microservices — now the payments team can deploy independently without coordinating with everyone else.\"",
    phrases:["microservices architecture","service boundary","split into microservices","service mesh","microservice communication"],
    tip:"Microservices solve organizational problems as much as technical ones — they let separate teams work and deploy independently. But they add complexity, so they're not always the right choice." },

  // ── DESIGN & ARCHITECTURE ──────────────────────────────────────────
  { cat:"design", term:"Architecture", pronun:"/ˈɑːrkɪtektʃər/",
    def:"The high-level structure of a software system — how components are organized, how they communicate, and how they'll scale. Good architecture makes systems easier to understand, build, and change.",
    ex:"\"Before we start coding the new service, let's get alignment on the overall architecture so we're not making conflicting decisions.\"",
    phrases:["system architecture","architectural decision","architecture diagram","monolith vs microservices","event-driven architecture"],
    tip:"An 'architectural decision record' (ADR) is a document explaining why a major technical decision was made — useful because the reasoning is often more important than the decision itself." },

  { cat:"design", term:"Design Pattern", pronun:"/dɪˈzaɪn ˈpætərn/",
    def:"A reusable, proven solution template for a commonly recurring problem in software design. Patterns like Singleton, Factory, and Observer give engineers a shared vocabulary and starting point.",
    ex:"\"We used the Observer pattern here — when the state changes, all registered listeners are automatically notified.\"",
    phrases:["design pattern","apply a pattern","anti-pattern","GoF patterns","Singleton / Factory / Observer"],
    tip:"An 'anti-pattern' is the opposite — a commonly used solution that seems sensible but actually makes things worse in practice." },

  { cat:"design", term:"Monolith", pronun:"/ˈmɒnəlɪθ/",
    def:"A software application where all components are tightly coupled and deployed as a single unit. Simpler to start with, but harder to scale, test, and maintain as it grows.",
    ex:"\"Our monolith has become painful to work with — a one-line change to billing requires re-testing the entire application.\"",
    phrases:["legacy monolith","break up the monolith","modular monolith","monolithic codebase","monolith to microservices"],
    tip:"Monoliths aren't automatically bad. A well-structured 'modular monolith' can be easier to manage than a messy microservices setup — it depends on team size and complexity." },

  { cat:"design", term:"Separation of Concerns", pronun:"/ˌsepəˈreɪʃən əv kənˈsɜːrnz/",
    def:"A design principle that says different parts of a program should each handle one distinct responsibility and not mix concerns. It makes code easier to test, change, and understand.",
    ex:"\"Mix the database logic with the UI code and you've violated separation of concerns — now you can't test either independently.\"",
    phrases:["single responsibility","separate concerns","mixing concerns","clean separation","SoC principle"],
    tip:"This is closely related to 'Single Responsibility Principle' (SRP): every module or class should have exactly one reason to change." },

  { cat:"design", term:"Interface", pronun:"/ˈɪntəfeɪs/",
    def:"A formal contract defining what a module or class must do (methods and properties it must have), without specifying how. Enables components to work together without being tightly coupled.",
    ex:"\"Define the interface first — then the frontend and backend teams can develop in parallel against the same contract.\"",
    phrases:["define an interface","implement an interface","programming interface","interface contract","API interface"],
    tip:"Don't confuse with UI (User Interface). When engineers say 'interface' in a coding context, they mean a type contract, not a visual design." },

  { cat:"design", term:"State", pronun:"/steɪt/",
    def:"The stored data that represents the current condition of a system or component at any point in time. Managing state — what data exists, where it lives, and how it changes — is central to software design.",
    ex:"\"The bug was a state management issue — the shopping cart was updating locally but not syncing with the server.\"",
    phrases:["manage state","global / local state","state machine","stateful / stateless","state mutation","shared state"],
    tip:"'Stateless' systems (like RESTful APIs) don't remember anything between requests — each request must contain all needed information. This makes them easier to scale." },

  // ── DEBUGGING & QUALITY ──────────────────────────────────────────
  { cat:"debug", term:"Bug", pronun:"/bʌɡ/",
    def:"An error or flaw in software that causes it to behave in an unintended way. Bugs range from trivial cosmetic issues to critical failures that crash systems or expose data.",
    ex:"\"There's a bug where users get logged out when they click Save. Can you reproduce it and check the console logs?\"",
    phrases:["file a bug","reproduce a bug","squash a bug","regression bug","bug report","severity / priority"],
    tip:"'Reproduce' is key — if you can't make the bug happen consistently, it's very hard to fix. A good bug report includes steps to reproduce, expected behavior, and actual behavior." },

  { cat:"debug", term:"Stack Trace", pronun:"/stæk treɪs/",
    def:"An error report showing the exact sequence of function calls that led to a crash or exception. It shows you precisely where in the code something went wrong, from outermost to innermost call.",
    ex:"\"Paste the full stack trace — I can see from line 142 it's a null pointer exception in the payment service.\"",
    phrases:["read the stack trace","stack trace shows","full stack trace","stack overflow","call stack"],
    tip:"Read a stack trace from bottom to top: the bottom is your code (most useful), the top is the deepest point of the crash. Library frames in the middle are usually less relevant." },

  { cat:"debug", term:"Regression", pronun:"/rɪˈɡreʃən/",
    def:"When a code change accidentally breaks functionality that was previously working correctly. Regressions are a primary reason automated tests exist.",
    ex:"\"The latest release introduced a regression — the password reset flow that worked last week is now broken.\"",
    phrases:["regression bug","regression test","introduce a regression","catch regressions","regression suite"],
    tip:"'Regression testing' means re-running existing tests to confirm new changes haven't broken old functionality. This is typically automated in CI/CD." },

  { cat:"debug", term:"Unit Test", pronun:"/ˈjuːnɪt test/",
    def:"An automated test that verifies a small, isolated unit of code (typically one function) works correctly. Unit tests run fast and give specific, precise feedback when something breaks.",
    ex:"\"Write a unit test for this function before merging — we don't want this edge case to regress silently.\"",
    phrases:["write unit tests","test coverage","pass / fail a test","test-driven development (TDD)","mock / stub","assertion"],
    tip:"'TDD' (Test-Driven Development) means writing the test before the code. The test fails first (red), then you write code to make it pass (green), then clean up (refactor)." },

  { cat:"debug", term:"Root Cause", pronun:"/ruːt kɔːz/",
    def:"The fundamental, underlying reason why a problem occurred — not just the visible symptom. Good engineers diagnose and fix root causes rather than patching surface-level symptoms.",
    ex:"\"The crash is just a symptom. The root cause is that we're not validating the API response — we assume it always has the data field.\"",
    phrases:["root cause analysis (RCA)","identify root cause","fix the root cause","5 Whys technique","post-mortem"],
    tip:"The '5 Whys' technique: ask 'why?' five times to drill down from a symptom to its root cause. A 'post-mortem' is a document written after an incident to record the root cause and prevention plan." },

  { cat:"debug", term:"Logging", pronun:"/ˈlɒɡɪŋ/",
    def:"Recording events, errors, warnings, and informational messages about what an application is doing while it runs. Logs are the primary tool for understanding and diagnosing issues in production.",
    ex:"\"We couldn't diagnose the production issue because there was no logging around that code path. We went in blind.\"",
    phrases:["add logging","check the logs","log level (DEBUG / INFO / WARN / ERROR)","structured logging","log aggregation","tail the logs"],
    tip:"Log levels matter: DEBUG is verbose (for development), INFO is normal events, WARN is a concern but not broken, ERROR is something wrong. Never log sensitive data like passwords." },

  { cat:"debug", term:"Monitoring", pronun:"/ˈmɒnɪtərɪŋ/",
    def:"Continuously observing a live system's health, performance, and behavior using metrics, alerts, and dashboards so engineers can detect and respond to problems quickly.",
    ex:"\"Our monitoring alerted us within 60 seconds of the database going down — we restored service before most users noticed.\"",
    phrases:["set up monitoring","alerting","metrics dashboard","uptime monitoring","error rate","on-call","SLA"],
    tip:"'On-call' means being available to respond to production alerts outside normal hours. Engineers take turns being on-call. Getting paged at 2am is a real part of the job." },

  // ── COLLABORATION & SOFT SKILLS ──────────────────────────────────────────
  { cat:"collab", term:"Scope Creep", pronun:"/skōp kriːp/",
    def:"The gradual, uncontrolled expansion of a project's requirements beyond its original boundaries — usually without corresponding increases in time, budget, or team size.",
    ex:"\"We started with a login page and somehow ended up building a whole user profile system. That's scope creep — we need to push the extras to the next sprint.\"",
    phrases:["prevent scope creep","out of scope","manage scope","feature creep","original scope"],
    tip:"'In scope' means agreed-upon work. 'Out of scope' means it wasn't agreed to and can be pushed back. Saying 'that's out of scope' is a valid and professional response." },

  { cat:"collab", term:"Trade-off", pronun:"/ˈtreɪdˌɒf/",
    def:"A situation where gaining one benefit requires giving up another. Engineering is full of trade-offs — speed vs. accuracy, performance vs. cost, flexibility vs. simplicity.",
    ex:"\"There's a trade-off: we can build it properly in three weeks, or ship a quick version in three days that we'll need to rework later.\"",
    phrases:["make a trade-off","engineering trade-off","discuss the trade-offs","balance the trade-offs","cost vs. quality"],
    tip:"Discussing trade-offs openly shows engineering maturity. Instead of 'what's the right answer?', experienced engineers ask 'what are the trade-offs?'" },

  { cat:"collab", term:"On-boarding", pronun:"/ˈɒnˌbɔːrdɪŋ/",
    def:"The process of integrating a new team member into a project — setting up their development environment, explaining the codebase, and getting them productive as quickly as possible.",
    ex:"\"Our onboarding docs are outdated — the last three new hires spent their first week just getting the environment to run.\"",
    phrases:["onboarding process","onboarding docs","onboard a new hire","smooth onboarding","ramping up"],
    tip:"'Ramp-up time' or 'ramping up' describes how long it takes a new engineer to become fully productive. Good onboarding dramatically reduces ramp-up time." },

  { cat:"collab", term:"Pair Programming", pronun:"/per ˈproʊɡræmɪŋ/",
    def:"A collaborative technique where two engineers work together at one workstation — one writes code (the 'driver') while the other reviews and guides in real time (the 'navigator').",
    ex:"\"Let's pair on this problem — it's complex and two sets of eyes will catch issues faster than working alone.\"",
    phrases:["pair on this","driver / navigator","remote pairing","mob programming","pair programming session"],
    tip:"'Mob programming' (or ensemble programming) extends this to a whole team working on one problem together. Surprisingly effective for complex or critical problems." },

  { cat:"collab", term:"Documentation", pronun:"/ˌdɒkjʊmenˈteɪʃən/",
    def:"Written information explaining what software does, how it works, and how to use it. Good documentation reduces onboarding time, prevents repeated questions, and keeps institutional knowledge from walking out the door.",
    ex:"\"The API works but there's no documentation — every consumer has to read the source code to understand how to call it.\"",
    phrases:["write docs","update the docs","API documentation","inline comments","README","docs as code"],
    tip:"'Docs rot' means documentation that was once accurate but has gone out of date as the code changed. Outdated docs are sometimes worse than no docs — they actively mislead people." },

  { cat:"collab", term:"Ticket", pronun:"/ˈtɪkɪt/",
    def:"A single unit of work tracked in a project management tool like Jira, Linear, or GitHub Issues. Each ticket describes a task, bug, or feature request with context, requirements, and status.",
    ex:"\"Create a ticket for this bug with reproduction steps so we don't lose track of it. Link it to the sprint board.\"",
    phrases:["file a ticket","assign a ticket","close the ticket","ticket description","acceptance criteria","linked tickets"],
    tip:"'Acceptance criteria' defines exactly what 'done' means for a ticket. Without clear criteria, a ticket can be 'done' to the engineer but not the product manager." },

  { cat:"collab", term:"Refine", pronun:"/rɪˈfaɪn/",
    def:"In Agile, to review, clarify, and improve backlog items before they enter a sprint — ensuring requirements are clear, tickets are well-sized, and acceptance criteria are understood.",
    ex:"\"Let's refine these stories before sprint planning so the team isn't doing discovery work mid-sprint.\"",
    phrases:["refine the backlog","refinement session","story refinement","groom the backlog","story points"],
    tip:"'Story points' are an abstract unit for estimating effort (not time). Teams debate these endlessly. The point is relative sizing: a 5-point story is roughly twice a 3-pointer, not '5 hours'." },
];

const CAT_META = {
  all:     { label:"All",     color:"var(--ink)" },
  core:    { label:"Core",    color:"var(--accent)" },
  process: { label:"Process", color:"var(--accent2)" },
  infra:   { label:"Infra",   color:"var(--accent3)" },
  design:  { label:"Design",  color:"var(--amber)" },
  debug:   { label:"Debug",   color:"var(--purple)" },
  collab:  { label:"Collab",  color:"#0891b2" },
};

let activeCat = "all";
let searchQ = "";
let learnedSet = new Set(JSON.parse(localStorage.getItem("se2_learned") || "[]"));

// Quiz state
let quizTerms = [];
let quizIdx = 0;
let quizScore = 0;
let quizAnswered = false;
let quizCat = "all";

function save() { localStorage.setItem("se2_learned", JSON.stringify([...learnedSet])); }

function updateStats() {
  const total = TERMS.length;
  const learned = [...learnedSet].filter(t => TERMS.find(x => x.term === t)).length;
  const pct = total ? Math.round((learned / total) * 100) : 0;
  document.getElementById("statTotal").textContent = total;
  document.getElementById("statLearned").textContent = learned;
  document.getElementById("statPct").textContent = pct + "%";
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent = pct + "%";
  document.getElementById("progressText").textContent =
    learned === 0 ? "Start marking terms as learned!" :
    learned === total ? "🎉 All terms learned!" :
    `${total - learned} terms to go`;
}

function filtered() {
  return TERMS.filter(t => {
    const mc = activeCat === "all" || t.cat === activeCat;
    const q = searchQ.toLowerCase();
    const ms = !q || t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
    return mc && ms;
  });
}

function renderPills() {
  const el = document.getElementById("catPills");
  el.innerHTML = "";
  Object.entries(CAT_META).forEach(([key, meta]) => {
    const cnt = key === "all" ? TERMS.length : TERMS.filter(t => t.cat === key).length;
    const btn = document.createElement("button");
    btn.className = "pill" + (activeCat === key ? ` active-${key}` : "");
    btn.textContent = `${meta.label} ${cnt}`;
    btn.onclick = () => { activeCat = key; renderPills(); renderCards(); };
    el.appendChild(btn);
  });
}

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  const list = filtered();
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `<div class="no-results">No terms found. Try a different search or category.</div>`;
    return;
  }
  list.forEach((t, i) => {
    const learned = learnedSet.has(t.term);
    const card = document.createElement("div");
    card.className = "card" + (learned ? " is-learned" : "");
    card.style.animationDelay = Math.min(i * 0.04, 0.4) + "s";
    card.innerHTML = `
      <div class="card-ribbon ribbon-${t.cat}"></div>
      <div class="card-top">
        <div class="card-term">${t.term}</div>
        <span class="badge badge-${t.cat}">${CAT_META[t.cat].label}</span>
      </div>
      <div class="card-pronun">${t.pronun}</div>
      <div class="card-def">${t.def}</div>
      <div class="card-example-wrap">
        <div class="card-example">${t.ex}</div>
      </div>
      <div class="card-actions">
        <button class="expand-btn">▼ example</button>
        <button class="learned-toggle">${learned ? "✓ Learned" : "Mark Learned"}</button>
      </div>
    `;
    card.querySelector(".card-term").onclick = () => openModal(t);
    card.querySelector(".expand-btn").onclick = (e) => {
      e.stopPropagation();
      card.classList.toggle("expanded");
      card.querySelector(".expand-btn").textContent = card.classList.contains("expanded") ? "▲ hide" : "▼ example";
    };
    card.querySelector(".learned-toggle").onclick = (e) => {
      e.stopPropagation();
      learnedSet.has(t.term) ? learnedSet.delete(t.term) : learnedSet.add(t.term);
      save(); renderCards(); updateStats();
    };
    grid.appendChild(card);
  });
}

function openModal(t) {
  const el = document.getElementById("modalInner");
  const learned = learnedSet.has(t.term);
  el.innerHTML = `
    <div class="modal-eyebrow" style="color:${CAT_META[t.cat].color}">${CAT_META[t.cat].label}</div>
    <div class="modal-title">${t.term}</div>
    <div class="modal-pronun">${t.pronun}</div>
    <div class="modal-section">
      <div class="modal-label">Definition</div>
      <div class="modal-def">${t.def}</div>
    </div>
    <div class="modal-section">
      <div class="modal-label">In Context</div>
      <div class="modal-ex">${t.ex}</div>
    </div>
    <div class="modal-section">
      <div class="modal-label">Common Phrases</div>
      <div class="modal-phrases">${t.phrases.map(p => `<span class="phrase-chip">${p}</span>`).join("")}</div>
    </div>
    ${t.tip ? `<div class="modal-section"><div class="modal-label">💡 Pro Tip</div><div class="modal-remember">${t.tip}</div></div>` : ""}
    <div class="modal-footer">
      <button class="modal-btn" onclick="closeModal()">Close</button>
      <button class="modal-btn primary ${learned ? "learned-active" : ""}" id="modalLearnBtn">
        ${learned ? "✓ Learned!" : "Mark as Learned"}
      </button>
    </div>
  `;
  document.getElementById("modalLearnBtn").onclick = () => {
    learnedSet.has(t.term) ? learnedSet.delete(t.term) : learnedSet.add(t.term);
    save(); renderCards(); updateStats(); openModal(t);
  };
  document.getElementById("modalBg").classList.add("open");
}

function closeModal() { document.getElementById("modalBg").classList.remove("open"); }
document.getElementById("modalBg").onclick = (e) => { if (e.target === e.currentTarget) closeModal(); };

function showPanel(name) {
  document.getElementById("browsePanel").style.display = name === "browse" ? "block" : "none";
  document.getElementById("quizPanel").style.display = name === "quiz" ? "block" : "none";
  document.getElementById("btnBrowse").className = "nav-btn" + (name === "browse" ? " active" : "");
  document.getElementById("btnQuiz").className = "nav-btn" + (name === "quiz" ? " active" : "");
}

// ── QUIZ ──────────────────────────────────────────
function renderQuizSetup() {
  const el = document.getElementById("quizCatBtns");
  el.innerHTML = "";
  Object.entries(CAT_META).forEach(([key, meta]) => {
    const btn = document.createElement("button");
    btn.className = "quiz-cat-btn" + (quizCat === key ? " sel" : "");
    const cnt = key === "all" ? TERMS.length : TERMS.filter(t => t.cat === key).length;
    btn.textContent = `${meta.label} (${cnt})`;
    btn.onclick = () => { quizCat = key; renderQuizSetup(); };
    el.appendChild(btn);
  });
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  const pool = quizCat === "all" ? [...TERMS] : TERMS.filter(t => t.cat === quizCat);
  quizTerms = shuffle(pool).slice(0, Math.min(10, pool.length));
  quizIdx = 0; quizScore = 0;
  document.getElementById("quizSetup").style.display = "none";
  document.getElementById("quizGame").style.display = "block";
  document.getElementById("quizScoreCard").style.display = "none";
  renderQuestion();
}

function renderQuestion() {
  if (quizIdx >= quizTerms.length) { showScore(); return; }
  quizAnswered = false;
  const t = quizTerms[quizIdx];
  const pct = Math.round((quizIdx / quizTerms.length) * 100);
  document.getElementById("qpFill").style.width = pct + "%";
  document.getElementById("qpLabel").textContent = `${quizIdx + 1} / ${quizTerms.length}`;
  document.getElementById("quizQuestion").textContent = t.term;
  document.getElementById("quizFeedback").className = "quiz-feedback";
  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("quizNextBtn").className = "quiz-next-btn";

  // Build distractors
  const correct = t.def;
  const others = shuffle(TERMS.filter(x => x.term !== t.term)).slice(0, 3).map(x => x.def);
  const options = shuffle([correct, ...others]);

  const container = document.getElementById("quizOptions");
  container.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.textContent = opt.length > 120 ? opt.slice(0, 117) + "…" : opt;
    btn.onclick = () => selectAnswer(btn, opt, correct, t);
    container.appendChild(btn);
  });
}

function selectAnswer(btn, selected, correct, term) {
  if (quizAnswered) return;
  quizAnswered = true;
  const isRight = selected === correct;
  if (isRight) quizScore++;

  document.querySelectorAll(".quiz-opt").forEach(b => {
    b.disabled = true;
    if (b.textContent === correct.slice(0, 117) + (correct.length > 120 ? "…" : "") || b.textContent === correct) b.classList.add("correct");
  });
  if (!isRight) btn.classList.add("wrong");

  const fb = document.getElementById("quizFeedback");
  fb.className = "quiz-feedback show " + (isRight ? "correct" : "wrong");
  fb.textContent = isRight
    ? `✓ Correct! ${term.tip || "Great job."}`
    : `✗ Not quite. ${term.tip || "Review this one and try again."}`;

  document.getElementById("quizNextBtn").className = "quiz-next-btn show";
}

function nextQuestion() {
  quizIdx++;
  renderQuestion();
}

function showScore() {
  document.querySelectorAll(".quiz-card > *:not(.quiz-score-card)").forEach(el => el.style.display = "none");
  const sc = document.getElementById("quizScoreCard");
  sc.style.display = "block";
  const pct = Math.round((quizScore / quizTerms.length) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "📚" : "💪";
  const msg = pct === 100 ? "Perfect score! You've mastered these terms. Move to a different category to keep learning." :
              pct >= 70 ? "Strong performance! Review the ones you missed and you'll have them all locked in soon." :
              pct >= 40 ? "Good effort! These terms take time to absorb. Use the Browse view to review and try again." :
              "Keep going! Read through the definitions in Browse mode, then come back and try again.";

  document.getElementById("scoreEmoji").textContent = emoji;
  document.getElementById("scoreBig").textContent = `${quizScore}/${quizTerms.length}`;
  document.getElementById("scoreLabel").textContent = `${pct}% correct`;
  document.getElementById("scoreMsg").textContent = msg;
}

function resetQuiz() {
  document.querySelectorAll(".quiz-card > *").forEach(el => el.style.display = "");
  document.getElementById("quizScoreCard").style.display = "none";
  document.getElementById("quizSetup").style.display = "block";
  document.getElementById("quizGame").style.display = "none";
}

// ── SEARCH ──────────────────────────────────────────
document.getElementById("searchInput").oninput = e => {
  searchQ = e.target.value;
  renderCards();
};

// INIT
renderPills();
renderCards();
renderQuizSetup();
updateStats();