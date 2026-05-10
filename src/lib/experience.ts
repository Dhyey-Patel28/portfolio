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
    role: "Web Developer Graduate Assistant",
    location: "Ypsilanti, MI",
    dates: "Sep 2025 – Present",
    summary:
      "Building accessible, data-driven web tools for academic discovery and student workflows inside EMU Web Services.",
    highlights: [
      "Engineered and launched 3 WCAG-friendly transfer-planning tools by converting articulation-guide content into structured data and searchable student workflows.",
      "Built a guided Permit Finder that routes students, staff, partners, and vendors to the correct parking action through a clearer decision flow.",
      "Standardized Request More Information workflows across 500+ academic program pages and 6 colleges by centralizing form logic, recipient mappings, and program metadata.",
      "Reworked catalog-link infrastructure across 400+ pages, replacing a recurring manual process with a more durable implementation and owning tickets end-to-end.",
    ],
    metrics: [
      "3 reusable transfer-planning tools shipped",
      "500+ program pages standardized",
      "400+ catalog links reworked",
      "~2 weeks of recurring maintenance → ~1 day for 2 people",
    ],
    stack: [
      "JavaScript",
      "Modern Campus / Omni CMS",
      "JSON",
      "HTML",
      "CSS",
      "WCAG",
    ],
    links: [
      {
        label: "Original WCC guide list",
        href: "https://www.emich.edu/ccr/articulation-agreements/guides/washtenaw.php",
      },
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
        label: "Permit Finder",
        href: "https://www.emich.edu/parking/index.php",
      },
    ],
    headline:
      "Accessible university web tools that turn messy institutional workflows into clearer student experiences.",
    context:
      "This work happens inside a live university web environment, where maintainability, accessibility, editor workflows, and student clarity matter as much as code quality. The strongest pattern across the role is taking hard-to-navigate content or branching decisions and turning them into reusable, structured interactions.",
    signal:
      "This experience shows that I can inherit messy real-world workflows, model the underlying data, design a better interaction, and ship durable software inside an existing production environment.",
    reviewGuide: {
      title: "Best way to review this role",
      summary:
        "The public proof is strongest when you compare the old information architecture against the new student-facing workflows.",
      steps: [
        "Open the original WCC guide list and the newer WCC transfer tool side by side.",
        "Notice the shift from scanning many static PDF links to selecting a community-college program and getting matching EMU pathways.",
        "Then open Permit Finder to see the same product instinct applied to a branching decision flow instead of a long list of choices.",
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
        title: "Transfer Planning Tools",
        subtitle:
          "From static PDF directories to reusable, searchable transfer workflows.",
        problem:
          "The original WCC articulation-guide page exposed a long descriptive list of PDFs. Students had to scan many program names and infer which guide matched their situation.",
        build:
          "I transformed guide content into structured datasets and built a reusable transfer-planning interface with searchable program input, EMU-equivalent results, keyboard support, live result updates, URL-prefill behavior, and fallback data loading. The pattern was then replicated for HFC and Schoolcraft.",
        result:
          "Students can move from their community-college program to relevant EMU pathways much faster, and the tool design now scales across partner colleges instead of being a one-off page.",
        links: [
          {
            label: "Before: WCC guide list",
            href: "https://www.emich.edu/ccr/articulation-agreements/guides/washtenaw.php",
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
        title: "Permit Finder",
        subtitle:
          "From ambiguous parking choices to a guided decision flow.",
        problem:
          "Parking users arrive with different roles and needs: student, staff, partner, vendor, Rec/IM, and multiple sub-paths inside those roles. A flat set of links makes the user do too much interpretation.",
        build:
          "I built a step-based branching interaction that reveals only the next relevant decision, maps choices to the correct permit destination, and controls disabled/enabled CTA states so users are not sent down invalid paths.",
        result:
          "The page becomes a clearer workflow instead of a guessing exercise, with the interface doing more of the decision work for the user.",
        links: [
          {
            label: "Live Permit Finder",
            href: "https://www.emich.edu/parking/index.php",
          },
        ],
      },
      {
        title: "RMI + Catalog Infrastructure",
        subtitle:
          "Less flashy, high-impact systems work.",
        problem:
          "Program-page workflows were fragmented across hundreds of pages, and annual catalog-link updates required recurring manual effort.",
        build:
          "I centralized form logic, recipient mappings, and program metadata for Request More Information flows, and reworked catalog-link infrastructure across 400+ pages to reduce brittle annual updates.",
        result:
          "RMI inquiry submissions grew about 100% year over year, and annual catalog-link maintenance dropped from roughly two weeks of team effort to about one day for two people.",
      },
    ],
  },
  {
    slug: "givaudan",
    company: "Givaudan",
    role: "Frontend Developer Intern / Web Developer Intern",
    location: "Cincinnati, OH",
    dates: "Aug 2022 – Aug 2023",
    summary:
      "Built internal experiment, dashboard, algorithm, and visualization tools across two co-op terms for scientific workflows.",
    highlights: [
      "Rebuilt 3 ATOM pages in React + MUI, reducing page build time from about 2 weeks to about 3 days.",
      "Converted an R/MATLAB algorithm to JavaScript while preserving output parity and reducing runtime from about 5s to under 0.5s.",
      "Built experiment-creation, response-capture, and admin dashboard tools for Insight using JavaScript and Flask.",
      "Developed D3.js visualizations that replaced slower legacy visuals and cut result-view load times from up to 1 minute to under 3 seconds.",
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
      {
        label: "AI tools announcement",
        href: "https://www.givaudan.com/media/trade-media/2021/givaudan-launches-ground-breaking-ai-tools-next-generation-product",
      },
    ],
    headline:
      "Internal tools, dashboards, and visualization work across two co-op terms.",
    context:
      "This work happened inside a global company environment where internal tools supported experiment creation, response capture, data retrieval, algorithmic behavior, and visualization performance for scientific users.",
    signal:
      "This experience shows that I can improve existing systems, rebuild interfaces, convert algorithms across languages, and ship measurable performance improvements in production workflows.",
    reviewGuide: {
      title: "How to read this work",
      summary:
        "The tools themselves were internal, so the strongest public evidence is the kind of impact I was trusted to ship.",
      steps: [
        "Start with the impact metrics: delivery speed, runtime, retrieval time, and result-view load time.",
        "Then read the three workstreams together: UI rebuilds, admin tooling, and visualization performance improvements.",
        "Use the public Givaudan links as company context; the direct product work was internal and is best evaluated through the scope and measured outcomes.",
      ],
    },
    workstreams: [
      {
        title: "ATOM React Rebuilds",
        subtitle:
          "Moving internal workflows from slower legacy delivery toward faster web iteration.",
        problem:
          "Some internal ATOM workflows were slower to build and harder to iterate on in their prior form.",
        build:
          "I rebuilt 3 pages in React + MUI and converted a legacy R/MATLAB algorithm into JavaScript while preserving output parity.",
        result:
          "Page build time dropped from roughly 2 weeks to roughly 3 days, and algorithm runtime improved from about 5 seconds to under 0.5 seconds.",
      },
      {
        title: "Insight Tools + Admin Dashboard",
        subtitle:
          "Supporting experiment creation, response capture, and asynchronous review.",
        problem:
          "Scientific teams needed more reliable tooling for building experiments, capturing responses, and reviewing submissions.",
        build:
          "I built internal experiment-creation and response-capture tools, plus a Flask admin dashboard with searchable tables, pagination, statistics, and charts.",
        result:
          "Submitted test data could be reviewed asynchronously with retrieval times under 1 second.",
      },
      {
        title: "D3 Visualization Work",
        subtitle:
          "Replacing slower result views with more responsive visual analysis.",
        problem:
          "Legacy visuals made result review slower for users working with larger datasets.",
        build:
          "I developed bidirectional bar, radar/spider, and donut charts in D3.js for ATOM 2.0.",
        result:
          "Result-view load times improved from up to 1 minute to under 3 seconds.",
      },
    ],
  },
];