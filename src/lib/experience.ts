export type ExperienceLink = {
  label: string;
  href: string;
};

export type ExperienceReviewGuide = {
  title: string;
  summary: string;
  steps: string[];
};

export type ExperienceVisual = {
  src: string;
  alt: string;
  caption: string;
};

export type ExperienceWorkstream = {
  title: string;
  subtitle: string;
  problem: string;
  build: string;
  result: string;
  links?: ExperienceLink[];
};

export type ExperienceItem = {
  slug: string;
  company: string;
  role: string;
  location: string;
  dates: string;
  summary: string;
  highlights: string[];
  metrics: string[];
  stack: string[];
  links?: ExperienceLink[];
  headline: string;
  context: string;
  signal: string;
  reviewGuide: ExperienceReviewGuide;
  visuals?: ExperienceVisual[];
  workstreams?: ExperienceWorkstream[];
};

export const experienceItems: ExperienceItem[] = [
  {
    slug: "eastern-michigan-university",
    company: "Eastern Michigan University",
    role: "Web Developer",
    location: "Ypsilanti, MI",
    dates: "Sep 2025 – Present",
    summary:
      "Building and maintaining production web applications with EMU Web Services: a scholarship discovery platform in development, launched transfer-planning tools, university-wide form workflows, and reusable calendar and catalog infrastructure.",
    highlights: [
      "Developing the public-facing scholarship directory for 650+ scholarships in PHP and JavaScript: IC Command API integration, data normalization, cached retrieval with fallback, keyword search, eligibility filters, sorting, and pagination. In final development; not yet launched.",
      "Engineered and launched 3 accessible transfer-planning tools by transforming articulation-guide data into structured JSON and searchable program-matching workflows.",
      "Migrated 60+ legacy forms to the Modern Campus Form Module and standardized Request More Information workflows across 500+ academic program pages and 6 colleges.",
      "Built a reusable Registrar calendar component backed by EMU Today data, replacing manually maintained listings and fixing multi-day event dates and duplicate API results.",
      "Reworked catalog-link infrastructure across 400+ pages, reducing annual maintenance from about 2 weeks of team effort to about 1 day for 2 people.",
      "Built the live Permit Finder on EMU's Parking & Transportation site: a conditional selection flow that routes each visitor to the correct permit-purchasing page.",
    ],
    metrics: [
      "650+ scholarships in the directory (in development)",
      "3 transfer-planning tools launched",
      "60+ forms migrated · 500+ program pages standardized",
      "Catalog upkeep: ~2 weeks → ~1 day for 2 people",
    ],
    stack: [
      "PHP",
      "JavaScript",
      "REST APIs",
      "Modern Campus / Omni CMS",
      "JSON",
      "HTML",
      "CSS",
      "Accessibility",
    ],
    links: [
      {
        label: "WCC transfer tool",
        href: "https://www.emich.edu/wcc-to-emu/index.php",
      },
      {
        label: "HFC transfer tool",
        href: "https://www.emich.edu/hfc-to-emu/index.php",
      },
      {
        label: "Schoolcraft transfer tool",
        href: "https://www.emich.edu/schoolcraft-to-emu/index.php",
      },
      {
        label: "Original WCC guide list",
        href: "https://www.emich.edu/transfer-partnerships/articulation-agreements/guides/washtenaw.php",
      },
      {
        label: "Permit Finder",
        href: "https://www.emich.edu/parking/index.php",
      },
    ],
    headline:
      "Production university web applications: API-backed discovery tools, structured data workflows, and reusable components used across emich.edu.",
    context:
      "This work happens inside a live university web environment, where maintainability, accessibility, editor workflows, and student clarity matter as much as code quality. Accessibility is part of the build, not a final pass: semantic HTML, keyboard navigation, focus management, and reusable accessible interface patterns.",
    signal:
      "This role shows that I can integrate external APIs, model messy institutional data, build reusable components, and ship maintainable software inside an existing production environment.",
    reviewGuide: {
      title: "Best way to review this role",
      summary:
        "The transfer tools are the strongest public proof. The scholarship platform is still in development, so it is described here without a public link or screenshots.",
      steps: [
        "Open the original WCC guide list and the newer WCC transfer tool side by side.",
        "Notice the shift from scanning many static PDF links to selecting a community-college program and getting matching EMU pathways.",
        "Then read the scholarship and infrastructure workstreams for the API integration, data, and maintenance work behind the scenes.",
      ],
    },
    visuals: [
      {
        src: "/old-articulation-guides.jpg",
        alt: "Original WCC articulation guide page showing a long list of PDF links.",
        caption:
          "Before: students had to scan a dense list of articulation-guide links and infer which PDF matched their program.",
      },
      {
        src: "/wcc-transfer-tool.jpg",
        alt: "WCC transfer tool showing a structured program search and matching EMU degrees.",
        caption:
          "After: the transfer tool turns that content into a searchable workflow with immediate matching EMU pathways.",
      },
      {
        src: "/permit-finder.jpg",
        alt: "EMU parking page with guided permit finder controls.",
        caption:
          "Permit Finder applies the same idea to a branching decision problem: fewer guesses, clearer next action.",
      },
    ],
    workstreams: [
      {
        title: "Scholarship Discovery Platform",
        subtitle:
          "In development: a public directory for 650+ scholarships, built on EMU's IC Command API.",
        problem:
          "Scholarship listings were fragmented across the university, which made it hard for students to find awards they might be eligible for.",
        build:
          "I am building the public-facing PHP and JavaScript application on top of EMU's IC Command scholarship API. It normalizes inconsistent API records into student-friendly entries, caches API responses with fallback behavior, and supports keyword search, eligibility filtering, sorting, and pagination. Scholarship details open in accessible modal views, and reusable program-specific carousel components support configurable layouts, navigation, and presentation options. The IC Command database itself is maintained by EMU; my work is the application, API integration, and component layer, plus entering about 70 scholarship records.",
        result:
          "The directory covers 650+ scholarships and is in final development. It has not launched publicly yet, so there is no public link or screenshot.",
      },
      {
        title: "Transfer Planning Tools",
        subtitle:
          "From static PDF directories to reusable, searchable transfer workflows.",
        problem:
          "The original WCC articulation-guide page exposed a long descriptive list of PDFs. Students had to scan many program names and infer which guide matched their situation.",
        build:
          "I transformed guide content into structured datasets and built a reusable transfer-planning interface with searchable program input, EMU-equivalent results, keyboard support, live result updates, URL-prefill behavior, and fallback data loading. The pattern was then replicated for HFC and Schoolcraft.",
        result:
          "Three tools are live. Students can move from their community-college program to relevant EMU pathways directly, and the design scales across partner colleges instead of being a one-off page.",
        links: [
          {
            label: "Before: WCC guide list",
            href: "https://www.emich.edu/transfer-partnerships/articulation-agreements/guides/washtenaw.php",
          },
          {
            label: "After: WCC tool",
            href: "https://www.emich.edu/wcc-to-emu/index.php",
          },
          {
            label: "HFC version",
            href: "https://www.emich.edu/hfc-to-emu/index.php",
          },
          {
            label: "Schoolcraft version",
            href: "https://www.emich.edu/schoolcraft-to-emu/index.php",
          },
        ],
      },
      {
        title: "Forms, Calendar + Catalog Infrastructure",
        subtitle:
          "Less visible, high-leverage maintenance work across hundreds of pages.",
        problem:
          "University forms ran on a legacy module, Request More Information flows were duplicated across hundreds of program pages, Registrar dates were maintained by hand, and annual catalog-link updates took about two weeks of team effort.",
        build:
          "I migrated 60+ legacy forms to the Modern Campus Form Module and standardized RMI workflows across 500+ program pages in 6 colleges by centralizing form logic, recipient mappings, and program metadata. I built a reusable Registrar calendar component on EMU Today data that handles multi-day events and removes duplicate API results, and reworked catalog-link infrastructure across 400+ pages.",
        result:
          "Form workflows are maintained from one place, calendar listings no longer need manual updates, and annual catalog-link maintenance dropped from roughly two weeks of team effort to about one day for two people.",
      },
      {
        title: "Permit Finder",
        subtitle:
          "A smaller live tool: from confusing permit options to one correct purchase link.",
        problem:
          "Visitors arrive with different roles (student, faculty/staff, partner, vendor, Rec/IM), and students also need to pick between commuter, resident, Westview, and other permits. A flat list of options left them to work out which purchasing page applied.",
        build:
          "I built a conditional JavaScript selection flow. Visitors choose their role; students get an additional permit-category dropdown. Each valid combination maps to the right permit-purchasing URL, and the purchase button stays disabled, with accessible disabled states, until a valid selection is made.",
        result:
          "The tool is live on the Parking & Transportation homepage and sends each visitor straight to the correct purchasing page.",
        links: [
          {
            label: "Live Permit Finder",
            href: "https://www.emich.edu/parking/index.php",
          },
        ],
      },
    ],
  },
  {
    slug: "givaudan",
    company: "Givaudan",
    role: "Frontend Developer Intern · Web Developer Intern (co-op)",
    location: "Cincinnati, OH",
    dates: "Aug–Dec 2022 · Apr–Aug 2023",
    summary:
      "Two co-op terms on the internal Insight and ATOM applications: Insight experiment tools, data interfaces, and D3 visualizations in 2022; React rebuilds of ATOM pages, an algorithm port, and production Insight debugging in 2023.",
    highlights: [
      "2023 · Rebuilt 3 ATOM pages in React + MUI, cutting page development from about 2 weeks to about 3 days.",
      "2023 · Converted an R/MATLAB algorithm to JavaScript with output parity, reducing runtime from about 5s to under 0.5s.",
      "2023 · Diagnosed and fixed production data-retrieval and table issues in Insight, restoring a workflow used by internal teams globally.",
      "2022 · Built experiment-creation and response-capture tools for Insight in JavaScript, HTML, and CSS, including a reusable numeric input pad, dynamic image/GIF forms, and Base64 media handling.",
      "2022 · Built a Flask admin dashboard and searchable table interfaces for submitted test data, with retrieval under 1 second.",
      "2022 · Developed D3.js visualizations for ATOM, later reused in Insight, cutting result-view load time from up to 1 minute to under 3 seconds.",
    ],
    metrics: [
      "~2 weeks → ~3 days page build time",
      "~5s → <0.5s algorithm runtime",
      "Up to 1 min → <3s visualization load time",
      "<1s dashboard retrieval time",
    ],
    stack: ["React", "MUI", "JavaScript", "Flask", "D3.js", "HTML", "CSS"],
    links: [
      {
        label: "Givaudan digital tools",
        href: "https://www.givaudan.com/taste-wellbeing/imagine/tools/digital-tools",
      },
    ],
    headline:
      "Internal tools, dashboards, visualizations, and production fixes across two co-op terms.",
    context:
      "This work happened inside a global company, on two internal applications, Insight and ATOM, that supported experiment creation, response capture, data retrieval, algorithmic behavior, and result visualization for scientific users. Tools and techniques sometimes crossed between the two. The applications are private, so there are no public demos.",
    signal:
      "This experience shows that I can improve existing systems, rebuild interfaces, port algorithms across languages, debug production issues, and ship measurable performance improvements.",
    reviewGuide: {
      title: "How to read this work",
      summary:
        "The tools themselves are internal, so the strongest public evidence is the scope and the measured outcomes.",
      steps: [
        "Start with the impact metrics: delivery speed, runtime, retrieval time, and result-view load time.",
        "Then read the workstreams in order: the 2022 term built new tools, and the 2023 term rebuilt, optimized, and fixed existing ones.",
        "The Givaudan link is company context only; the direct product work was internal.",
      ],
    },
    workstreams: [
      {
        title: "Insight Experiment Tools + Admin Dashboard",
        subtitle: "2022 · Web Developer Intern",
        problem:
          "Scientific teams needed reliable tooling in Insight for building experiments, capturing responses, and reviewing submissions.",
        build:
          "I started with a basic calculator that grew into a reusable numeric input pad for Insight, then built experiment-creation and response-capture forms with dynamic image/GIF inputs and Base64 media handling. I also built searchable table interfaces and a Flask admin dashboard with searchable results, pagination, statistics, and charts.",
        result:
          "Submitted test data could be reviewed asynchronously, with retrieval times under 1 second.",
      },
      {
        title: "D3 Visualizations",
        subtitle: "2022 · Web Developer Intern",
        problem:
          "Legacy result views were slow for users reviewing larger sets of test results.",
        build:
          "I learned D3.js on the job and built radar/spider, positive/negative bar, and donut charts for ATOM. The same visualization mechanisms were later reused in Insight.",
        result:
          "Result-view load times improved from up to 1 minute to under 3 seconds.",
      },
      {
        title: "ATOM React Rebuilds + Algorithm Port",
        subtitle: "2023 · Frontend Developer Intern",
        problem:
          "Some ATOM workflows were slow to build and iterate on, and one of their algorithms still ran in R/MATLAB.",
        build:
          "I rebuilt 3 pages in React + MUI and converted the R/MATLAB algorithm to JavaScript while preserving output parity.",
        result:
          "Page development time dropped from roughly 2 weeks to roughly 3 days, and algorithm runtime improved from about 5 seconds to under 0.5 seconds.",
      },
      {
        title: "Insight Production Fix",
        subtitle: "2023 · Frontend Developer Intern",
        problem:
          "Data retrieval and tables in the Insight application were failing in production, blocking a workflow used by teams globally.",
        build:
          "I diagnosed the data-retrieval and table issues and shipped the fixes.",
        result: "The workflow was restored for internal teams.",
      },
    ],
  },
];

