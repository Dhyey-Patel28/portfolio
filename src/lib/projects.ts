export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectReviewGuide = {
  title: string;
  summary: string;
  steps: string[];
};

export type ProjectVisual = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectStatus =
  | "Deployed"
  | "Deployed demo"
  | "Hackathon prototype"
  | "Under development"
  | "Completed";

export type ProjectItem = {
  slug: string;
  title: string;
  type: string;
  status: ProjectStatus;
  // How the project was built: solo, class team, hackathon, course.
  context: string;
  dates?: string;
  summary: string;
  // What I personally built. Kept separate from team credit on purpose.
  myRole: string[];
  teamCredit?: string;
  statusNote?: string;
  proof: string[];
  stack: string[];
  links?: ProjectLink[];
  problem: string;
  build: string;
  takeaway: string;
  next?: string;
  reviewGuide: ProjectReviewGuide;
  visuals?: ProjectVisual[];
};

export const featuredProjects: ProjectItem[] = [
  {
    slug: "job-fair-match",
    title: "Job Fair Match",
    type: "Full-stack application · Auth · Relational data",
    status: "Deployed",
    context: "Class project · team of 6",
    dates: "Sep – Dec 2025",
    summary:
      "A swipe-based job matching app with authentication, candidate and employer profiles, a Prisma/PostgreSQL data model, matches, and chat. It began as a six-person class project; I became the primary developer and implemented most of the final functionality.",
    myRole: [
      "Authentication and Prisma integration, including email verification.",
      "The jobs database and related backend APIs.",
      "Candidate/employer profile modes and application flows.",
      "Swiping, matching, and the chat interface.",
      "Most of the frontend–backend integration that brought the app together.",
    ],
    teamCredit:
      "Teammates contributed early authentication and backend setup, which I later revised or replaced.",
    proof: [
      "Normalized PostgreSQL schema for users, companies/jobs, swipes, and matches, with constraints and fast lookups.",
      "Protected actions such as login, swipes, and match retrieval behind authentication and authorization.",
      "Deployed on Vercel with a Neon-hosted PostgreSQL database.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Neon", "Vercel"],
    links: [
      {
        label: "Live demo",
        href: "https://job-fair-match.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/job-matching-platform",
      },
    ],
    problem:
      "Matching products become unreliable quickly when user state, swipe history, and match generation are not modeled carefully. The class team also needed someone to turn separate pieces into one working application.",
    build:
      "I built the browse → swipe → match flows on a normalized relational schema, with backend APIs for profiles, jobs, swipes, and matches. I rebuilt authentication on Prisma, added email verification and profile modes for candidates and employers, and added matches with a chat dock.",
    takeaway:
      "This project shows full-stack ownership: data modeling, authentication, API design, and integrating a team's partial work into a deployed application.",
    reviewGuide: {
      title: "Follow the data model",
      summary:
        "The strongest signal is the backend correctness behind a familiar swipe-style interface.",
      steps: [
        "Start with the GitHub repository and inspect the Prisma schema for users, jobs, swipes, and matches.",
        "Then review how the APIs protect actions and keep the UI consistent with backend state.",
        "Use the live demo as product context. The landing-page numbers are labelled sample values, not usage data.",
      ],
    },
    visuals: [
      {
        src: "/job-fair-match.jpg",
        alt: "Job Fair Match landing page with swipe-based job discovery interface.",
        caption:
          "The landing page introduces the swipe-first idea. Its numbers are sample values for the demo UI, not real usage.",
      },
    ],
  },
  {
    slug: "atmosphere-atlas",
    title: "Atmosphere Atlas",
    type: "Frontend product · Weather data · 3D UI",
    status: "Deployed",
    context: "Solo project",
    dates: "May 2026",
    summary:
      "A deployed weather dashboard that turns live weather data into an interactive 3D globe, saved places, drop-pin lookup, shareable weather views, and plain-language daily guidance.",
    myRole: ["Designed and built the whole application."],
    proof: [
      "Full React, Vite, and TypeScript app with city search, current weather, air quality, saved places, drop pins, share links, unit conversion, and a 5-day outlook.",
      "Main panel leads with plain-language guidance and moves raw metrics into secondary sections.",
      "Lazy-loads the heavy 3D globe bundle, self-hosts globe textures, and falls back gracefully without WebGL.",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "Open-Meteo"],
    links: [
      {
        label: "Live demo",
        href: "https://atmosphere-atlas.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/atmosphere-atlas",
      },
    ],
    problem:
      "Most weather apps expose plenty of numbers but do not explain what those conditions mean for everyday decisions. I wanted a dashboard that makes weather visual, personal, and easier to act on.",
    build:
      "I built the app around a 3D globe, Open-Meteo APIs, local persistence, shareable coordinate URLs, saved places, drop-pin lookup, air quality, activity planning, and a simplified weather panel that puts guidance before raw metrics.",
    takeaway:
      "This project shows product-oriented frontend engineering: API integration, interactive 3D UI, performance work, responsive design, and local persistence.",
    reviewGuide: {
      title: "Review the product flow",
      summary:
        "Use the live demo like a real weather app rather than only scanning the UI.",
      steps: [
        "Search for a city such as Detroit or Tokyo and watch the globe, weather panel, and daily brief update together.",
        "Use Drop Pin, Save, and Share to test the core interaction model.",
        "Open it on a phone to see how dense weather data is simplified into a scroll-friendly layout.",
      ],
    },
    visuals: [
      {
        src: "/atmosphere-atlas-desktop-dashboard.png",
        alt: "Atmosphere Atlas desktop dashboard showing a 3D globe, weather panel, daily brief, and Life Score.",
        caption:
          "The main dashboard keeps the selected location, globe, daily summary, and comfort score visible without showing every raw metric at once.",
      },
      {
        src: "/atmosphere-atlas-saved-places.png",
        alt: "Atmosphere Atlas saved places row and globe markers.",
        caption:
          "Saved places persist locally, appear in a responsive header row, and show as secondary markers on the globe.",
      },
      {
        src: "/atmosphere-atlas-mobile-dashboard.png",
        alt: "Atmosphere Atlas mobile dashboard showing the globe and Detroit weather panel.",
        caption:
          "The mobile layout keeps the same interaction model with readable cards and touch-friendly controls.",
      },
      {
        src: "/atmosphere-atlas-five-day-outlook.png",
        alt: "Atmosphere Atlas 5-day outlook panel showing daily conditions and temperature ranges.",
        caption:
          "Secondary sections like the 5-day outlook reveal more detail only when users ask for it.",
      },
    ],
  },
  {
    slug: "macon-banquet",
    title: "Macon Banquet",
    type: "Full-stack website · Booking API · Next.js",
    status: "Deployed demo",
    context: "Solo project · prospective client",
    dates: "May – Jul 2025",
    summary:
      "A responsive event-venue website with a booking API, built for a prospective venue client in Georgia. The client already had a similar site and did not proceed, so it runs as a public demo rather than a client's production site.",
    myRole: ["Designed and built the whole application."],
    proof: [
      "Booking endpoint that validates payloads, applies per-IP and daily rate limits, creates Google Calendar events, and sends email and SMS notifications.",
      "Reviews API plus token-protected and scheduled revalidation of cached pages.",
      "Responsive Next.js and Tailwind front end with a booking-focused information architecture.",
    ],
    statusNote:
      "The booking integrations depend on Calendar and email credentials, so the source code is the best evidence for that part.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Google Calendar API", "Nodemailer", "Vercel"],
    links: [
      {
        label: "Live demo",
        href: "https://macon-banquet.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/macon-banquet",
      },
    ],
    problem:
      "Venue websites easily become static brochures. A venue also needs booking requests to land somewhere staff will see them, without the form becoming a spam target.",
    build:
      "I built the site in Next.js with a booking API route that checks request shape, limits requests per IP and per day, adds each request to Google Calendar, and notifies staff by email and SMS. Reviews are served from an API route, and cached pages refresh through token-protected and scheduled revalidation.",
    takeaway:
      "This project shows that I can carry a client-style website past the front end: API design, abuse protection, third-party integrations, and caching.",
    reviewGuide: {
      title: "What to look at first",
      summary:
        "Review the front end in the demo, then the booking and revalidation routes in the code.",
      steps: [
        "Scan the landing page from top to bottom and check how it adapts across screen sizes.",
        "Open src/app/api/book/route.ts on GitHub for validation, rate limiting, and the Calendar and notification integrations.",
        "Look at the reviews, revalidate, and cron routes for how cached content is refreshed.",
      ],
    },
    visuals: [
      {
        src: "/macon-banquet.jpg",
        alt: "Macon Banquet homepage hero section with event venue photography and booking call to action.",
        caption:
          "The homepage leads with the venue, then moves visitors toward a booking request.",
      },
    ],
  },
];

export const moreProjects: ProjectItem[] = [
  {
    slug: "grantpilot",
    title: "GrantPilot",
    type: "Full-stack prototype · Data pipeline · Agent workflow",
    status: "Hackathon prototype",
    context: "HackMichigan · team of 4",
    dates: "May 2026",
    summary:
      "A grant-readiness workspace built at HackMichigan. It turns a rough public-works project description into ranked grant matches, plain-language requirements, and a readiness packet for staff review. I was the primary developer on a team of four.",
    myRole: [
      "Shaped the original product idea and architecture.",
      "Built the grant-data collection and scraping logic, normalizing 1,177 public records from Grants.gov and MI Funding Hub.",
      "Built the agent workflows and orchestration, including the IBM Orchestrate integration.",
      "Built the scoring and consolidated grant-processing pipeline.",
      "Added caching and fallback behavior, built the stormwater workflow, and integrated the components into the final app.",
    ],
    teamCredit:
      "Teammates contributed early UI implementation, theme development, and initial project setup.",
    statusNote:
      "The public deployment runs on saved workflow and grant data. The live agent services used temporary hackathon credits and are no longer connected, so this is a working prototype, not a production system.",
    proof: [
      "Guided workflow across project intake, grant scoring, requirements translation, readiness gaps, saved projects, and packet generation.",
      "Saved-data fallback keeps the deployed demo reviewable without live API credentials.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "IBM Orchestrate", "Vercel"],
    links: [
      {
        label: "Live demo",
        href: "https://grantpilotmi.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/grantpilot",
      },
      {
        label: "HackMichigan",
        href: "https://hackmichigan.com/",
      },
    ],
    problem:
      "Public grant discovery is not just a search problem. Local teams need to know which programs are worth reviewing, what evidence is missing, and how to turn a rough public-works need into a staff-facing packet without overclaiming eligibility.",
    build:
      "I built the data side and the workflow engine: scraping and normalizing public grant records, scoring them against a project profile, orchestrating agent steps for relevance review and requirements translation, and caching results so the app still works when live services are unavailable. I then integrated these with the team's front end into one guided workflow ending in a readiness packet.",
    takeaway:
      "GrantPilot shows that I can lead a fast team build: data collection, pipeline design, agent orchestration, and integration, with a fallback that keeps the demo usable after the event.",
    reviewGuide: {
      title: "Review the saved workflow",
      summary:
        "Open the live demo and follow the saved stormwater workflow from intake to the readiness packet.",
      steps: [
        "Start on the dashboard to see the cached 1,177-record grant database.",
        "Open Project Intake, replay the guided stormwater workflow, then review the project-specific matches.",
        "Open the Readiness Packet to see the memo, missing documents, and verification language.",
      ],
    },
    visuals: [
      {
        src: "/grantpilot-dashboard-overview.png",
        alt: "GrantPilot dashboard showing public grant counts, source freshness, and the recommended grant readiness workflow.",
        caption:
          "The dashboard shows public grant counts, cache freshness, and the path from intake to packet.",
      },
      {
        src: "/grantpilot-explorer-matches.png",
        alt: "GrantPilot Grant Explorer showing ranked stormwater project matches and the selected Clean Water State Revolving Fund opportunity.",
        caption:
          "Project-specific matches keep each grant tied to its source, freshness, fit, and human review signals.",
      },
      {
        src: "/grantpilot-readiness-packet.png",
        alt: "GrantPilot readiness packet showing a score, missing documents, council memo starter, and Trust Guard note.",
        caption:
          "The packet turns discovery into reviewable staff output: readiness score, missing documents, a 30-day plan, and verification warnings.",
      },
    ],
  },
  {
    slug: "meroq",
    title: "Meroq",
    type: "Full-stack ML · Python · FastAPI · Next.js",
    status: "Under development",
    context: "Solo project",
    dates: "Started May 2026",
    summary:
      "An experimental stock-analysis platform for exploring financial software and applied ML: Python modeling and backtesting behind a FastAPI service, with a Next.js client and a Streamlit dashboard. Educational and experimental only; not investment advice or a trading system.",
    myRole: ["Designed and built the whole system."],
    statusNote:
      "Not publicly deployed. Verified locally in October 2026 on cached price data with network access turned off: the test suite passes, and the API and Streamlit dashboard run. Live news sentiment and the Next.js client were not exercised in that check.",
    proof: [
      "Python modules for technical features, XGBoost directional models, walk-forward backtesting, Monte Carlo risk simulation, and news sentiment.",
      "FastAPI endpoints for ticker analysis, watchlist scans, and portfolio analysis, each verified locally on cached data.",
      "A Streamlit dashboard with prediction, chart, risk, report, and backtest views, plus a growing Next.js client for the API.",
      "A 26-test pytest suite (passing) and GitHub Actions CI.",
    ],
    stack: ["Python", "XGBoost", "FastAPI", "Next.js", "TypeScript", "Streamlit", "pytest"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/meroq",
      },
    ],
    problem:
      "I wanted to learn how financial-analysis software is structured end to end: data ingestion, modeling, evaluation that avoids look-ahead bias, risk estimates, and an interface that explains results instead of just printing numbers.",
    build:
      "I separated the analysis code into Python modules for features, models, backtesting, risk simulation, and sentiment, exposed them through a FastAPI backend, and built a Next.js client and a Streamlit dashboard on top. Ticker analyses produce an analyst-style brief with stance, primary driver, evidence quality, and items to watch.",
    takeaway:
      "Meroq shows breadth beyond web apps: ML modeling and evaluation in Python, a typed API boundary, and a separate frontend client.",
    reviewGuide: {
      title: "Read the code, not a demo",
      summary:
        "There is no public deployment yet, so the repository and the screenshot below are the evidence.",
      steps: [
        "Start with the README for the architecture and how the pieces run locally.",
        "Look at the backtesting and risk-simulation modules for the evaluation approach.",
        "Then check api/main.py and the frontend pages to see how analysis results reach the UI.",
      ],
    },
    visuals: [
      {
        src: "/meroq-dashboard.jpg",
        alt: "Meroq Streamlit dashboard showing an AAPL signal summary, model confidence, and a candlestick price chart with moving averages.",
        caption:
          "The Streamlit dashboard running locally on cached AAPL price data, with news turned off. An educational tool, not investment advice.",
      },
    ],
  },
  {
    slug: "automata-workbench",
    title: "Automata Workbench",
    type: "Algorithms · Interactive UI · TypeScript",
    status: "Deployed",
    context: "Class project · team of 3",
    dates: "Nov 2025 – Feb 2026",
    summary:
      "An interactive finite-automata workbench built on the open-source FSM Engine editor, adding conversion workflows: regex → DFA, NFA → DFA, minimization, and DFA → regex. I led much of the implementation, integration, and deployment.",
    myRole: [
      "NFA → DFA conversion, DFA minimization, and DFA → regex export.",
      "Dashboard, layout, and mobile/touch interaction improvements.",
      "Integrating and refining teammates' features, plus hosting and deployment.",
      "Helped set the project direction and divide work; prepared and delivered the final presentation.",
    ],
    teamCredit:
      "Stela built regex → DFA. Isaac built the JSON representation that lets the algorithms run on the editor's automata. The canvas editor comes from FSM Engine by Karthik Saiharsh (GPL-3.0).",
    proof: [
      "Conversion tools sit beside the canvas, so users can draw a machine and transform it in one place.",
      "Clear on-page and repository attribution to the upstream FSM Engine project.",
    ],
    stack: ["React", "TypeScript", "Vite", "React Konva", "Jotai"],
    links: [
      {
        label: "Live demo",
        href: "https://automataworkbench.vercel.app/",
      },
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/automata-workbench",
      },
    ],
    problem:
      "Formal-language tools are often either too abstract or too cluttered, which makes it hard to explore conversions and state-machine behavior interactively.",
    build:
      "Starting from FSM Engine's visual editor, our team added a JSON model of the drawn automaton and algorithms that operate on it. I implemented NFA → DFA, minimization, and DFA → regex, reworked the dashboard and mobile interactions, integrated the regex → DFA work, and deployed the app.",
    takeaway:
      "This project shows algorithm implementation and team leadership on an existing codebase, with honest attribution of what came from upstream and from teammates.",
    reviewGuide: {
      title: "Try this path",
      summary: "Use the tool as an automata workflow, not only as a drawing canvas.",
      steps: [
        "Create or load a small machine, then use the conversion tools instead of stopping at the editor.",
        "Walk through NFA → DFA conversion and minimization.",
        "Compare the repository's attribution notes with the commit history to see who built what.",
      ],
    },
    visuals: [
      {
        src: "/automata-workbench.jpg",
        alt: "Automata Workbench interface showing a state machine and automata conversion tools.",
        caption:
          "Conversion and minimization tools sit beside the canvas instead of being hidden theory.",
      },
    ],
  },
  {
    slug: "visual-data-mining-dashboard",
    title: "Visual Data Mining Showcase",
    type: "Data visualization · Dashboard design",
    status: "Deployed",
    context: "Course project · team of 3",
    summary:
      "Three dashboards comparing how different interface patterns fit the Zoo, KRK chess endgame, and Census-Income datasets. I implemented most of the technical work.",
    myRole: ["Implemented the majority of the technical work across the three dashboards."],
    teamCredit: "Built with teammates Stela and Rami.",
    proof: [
      "Separate dashboards for categorical Zoo data, rule-based KRK chess endgames, and mixed demographic Census-Income data.",
      "Each dashboard is matched to the structure of its dataset instead of reusing one generic chart layout.",
    ],
    stack: ["React", "Data visualization", "Dashboard design"],
    links: [
      {
        label: "Live demo",
        href: "https://viz-dm.vercel.app/",
      },
    ],
    problem:
      "Visualization projects often become collections of charts that ignore the shape of the data. We wanted to show how interface choices should change when the data changes.",
    build:
      "The showcase has three dataset-specific experiences: Zoo for categorical feature exploration, KRK chess for rule-based endgame states, and Census-Income for mixed demographic and work-related factors.",
    takeaway:
      "This project shows data-product judgment: choosing visual structures that help users ask better questions about each dataset.",
    reviewGuide: {
      title: "Compare the three dashboards",
      summary: "Move through all three dashboards rather than judging from one screen.",
      steps: [
        "Start with the landing page to see the three datasets.",
        "Open KRK Chess for the board-native and state-space views.",
        "Compare it with Zoo and Census-Income.",
      ],
    },
    visuals: [
      {
        src: "/viz-dm-krk-dashboard.jpg",
        alt: "Visual Data Mining Showcase showing the KRK chess dashboard within a multi-dashboard visualization project.",
        caption:
          "KRK is one of three views; Zoo and Census-Income each use a different dashboard structure.",
      },
    ],
  },
  {
    slug: "drone-flight-data-analytics",
    title: "Drone Flight Data Analytics",
    type: "Data engineering · Streaming pipeline",
    status: "Completed",
    context: "Course project · team of 3",
    summary:
      "A telemetry pipeline that streams live drone data through Kafka and Spark on AWS into S3 and produces flight-review plots. I implemented the technical functionality.",
    myRole: ["Implemented the technical functionality of the pipeline."],
    teamCredit: "Built with teammates Isaac and Brendan.",
    statusNote:
      "Run in a course AWS lab with temporary credentials; it is not a permanently deployed system.",
    proof: [
      "Kafka → Spark Structured Streaming → S3 pipeline on AWS EC2.",
      "Live telemetry from a CoDrone EDU flight, plus a replay script so the pipeline can be demonstrated without the drone.",
      "Time-series plots of height, pitch, roll, yaw, and battery from the aggregated output.",
    ],
    stack: ["Python", "Kafka", "Spark", "AWS EC2", "S3"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/drone-flight-data-analytics",
      },
    ],
    problem:
      "Raw telemetry is hard to review without a repeatable path from ingestion to aggregated data and useful plots.",
    build:
      "A Python producer publishes telemetry events to Kafka during a real flight. A Spark Structured Streaming job aggregates them and writes results to S3, and a plotting script turns the output into flight-review charts. Recorded logs can be replayed into Kafka for demos.",
    takeaway:
      "This project shows streaming data-engineering basics: ingestion, processing, persistence, and repeatable runs.",
    reviewGuide: {
      title: "Review the architecture first",
      summary: "The strongest signal is the end-to-end pipeline, not any one plot.",
      steps: [
        "Start with the README to follow the data path from drone to S3.",
        "Look at the producer, the Spark aggregator, and the replay script in the repository.",
        "Check the sample plots generated from aggregated output.",
      ],
    },
  },
];
