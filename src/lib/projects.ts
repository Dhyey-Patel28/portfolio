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

export type ProjectItem = {
  slug: string;
  title: string;
  type: string;
  status: "Featured" | "Shipped" | "Research" | "Systems" | "Current";
  summary: string;
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
    slug: "atmosphere-atlas",
    title: "Atmosphere Atlas",
    type: "Frontend product · Weather intelligence · 3D UI",
    status: "Featured",
    summary:
      "A deployed weather intelligence dashboard that turns live weather data into an interactive 3D globe, saved places, drop-pin lookup, shareable weather views, and human-centered daily guidance.",
    proof: [
      "Shipped a full React, Vite, and TypeScript app with city search, current weather, air quality, saved places, drop pins, share links, unit conversion, and a 5-day outlook.",
      "Designed the dashboard around human-centered guidance, keeping the main panel calm while moving raw metrics into secondary sections.",
      "Optimized the production experience by lazy-loading the heavy 3D globe bundle, self-hosting globe textures, and adding a graceful WebGL fallback.",
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
      "Most weather apps expose plenty of numbers but do not explain what those conditions mean for everyday decisions. I wanted to build a dashboard that makes weather feel visual, personal, and easier to act on.",
    build:
      "I built a polished weather intelligence app around a 3D globe, Open-Meteo APIs, local persistence, shareable coordinate URLs, saved places, drop-pin lookup, air quality, activity planning, and a simplified weather panel that prioritizes guidance before raw metrics.",
    takeaway:
      "This project shows product-oriented frontend engineering: API integration, interactive 3D UI, performance optimization, responsive design, local persistence, and UX decisions that reduce cognitive load.",
    next:
      "A future version could add an optional Journey Mode for recently visited places, plus reverse geocoding for friendlier dropped-pin labels.",
    reviewGuide: {
      title: "Review the product flow",
      summary:
        "Start with the live demo and use it like a real weather app rather than only scanning the UI.",
      steps: [
        "Search for a city such as Detroit or Tokyo and notice how the globe, weather panel, daily brief, and Life Score update together.",
        "Use Drop Pin, Save, and Share to test the core interaction model: location selection should feel fast, recoverable, and reusable.",
        "Resize to mobile or open it on a phone to see how the dense weather data is simplified into a calmer, scroll-friendly experience.",
      ],
    },
    visuals: [
      {
        src: "/atmosphere-atlas-desktop-dashboard.png",
        alt: "Atmosphere Atlas desktop dashboard showing a 3D globe, weather panel, daily brief, and Life Score.",
        caption:
          "The main dashboard keeps the selected location, globe, practical daily summary, and comfort score visible without overwhelming the user with every raw metric at once.",
      },
      {
        src: "/atmosphere-atlas-saved-places.png",
        alt: "Atmosphere Atlas saved places row and globe markers.",
        caption:
          "Saved places persist locally, appear in a responsive header row, and are reflected as secondary markers on the globe.",
      },
      {
        src: "/atmosphere-atlas-mobile-dashboard.png",
        alt: "Atmosphere Atlas mobile dashboard showing the globe and Detroit weather panel.",
        caption:
          "The mobile layout preserves the same interaction model while prioritizing scroll behavior, readable cards, and touch-friendly controls.",
      },
      {
        src: "/atmosphere-atlas-five-day-outlook.png",
        alt: "Atmosphere Atlas 5-day outlook panel showing daily conditions and temperature ranges.",
        caption:
          "Secondary sections like the 5-day outlook reveal more detail only when users ask for it, keeping the default experience calm.",
      },
    ],
  },
  {
    slug: "visual-data-mining-dashboard",
    title: "KRK Endgame Explorer",
    type: "Algorithms · Data visualization · Interactive UI",
    status: "Featured",
    summary:
      "An interactive chess endgame visualization for exploring king-rook-king positions, legal-move patterns, heatmaps, and state-space behavior.",
    proof: [
      "Built a public visualization around the king-rook-king chess endgame, turning abstract state-space data into interactive board-native views.",
      "Designed multiple views for understanding position patterns, move behavior, heatmaps, piece journeys, and endgame progression.",
      "Created a recruiter-friendly live demo that shows algorithmic reasoning and visualization design without requiring the reviewer to read code first.",
    ],
    stack: ["React", "Data Visualization", "Algorithms", "Interactive UI"],
    links: [
      {
        label: "Live demo",
        href: "https://viz-dm.vercel.app/krk/",
      },
    ],
    problem:
      "Chess endgame datasets can be difficult to understand from raw tables or static charts because the meaning depends on board position, legal movement, and state transitions.",
    build:
      "I built an interactive KRK endgame explorer that presents the same data through board views, heatmaps, movement patterns, and state-space explanations so users can reason about the endgame visually.",
    takeaway:
      "This project shows that I can turn algorithmic data into a usable interface: the important part was not just plotting values, but choosing visual structures that match the rules and mental model of chess.",
    reviewGuide: {
      title: "Review the KRK flow",
      summary:
        "Open the KRK demo and treat it as an interactive explanation of an algorithmic state space.",
      steps: [
        "Start with the board-based views so the state-space data has concrete chess meaning.",
        "Move through the heatmap and journey-style visualizations to see how patterns emerge across positions.",
        "Judge the project by how the interface makes abstract endgame data easier to inspect, not only by the chart styling.",
      ],
    },
    visuals: [
      {
        src: "/viz-dm-krk-dashboard.jpg",
        alt: "KRK Endgame Explorer showing a chess endgame visualization and state-space dashboard.",
        caption:
          "KRK view: the dashboard uses board-native and state-space visualizations to make chess endgame patterns easier to inspect.",
      },
    ],
  },
  {
    slug: "macon-banquet",
    title: "Macon Banquet",
    type: "Full-stack product · Next.js · TypeScript",
    status: "Featured",
    summary:
      "A polished event-venue website with booking-oriented flows, responsive UI, and production deployment.",
    proof: [
      "Built a complete public-facing product experience rather than a single isolated component.",
      "Combined responsive layout, motion, and booking-oriented information architecture.",
      "Shipped both a live deployment and a public codebase.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
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
      "Venue websites can easily become static brochures. I wanted this to feel like a product experience centered around trust, discovery, and booking intent.",
    build:
      "I built a responsive event-venue website with clear information hierarchy, conversion-focused calls to action, motion details, and a production deployment.",
    takeaway:
      "This project shows frontend product polish: layout, hierarchy, interaction, responsiveness, and a complete deployed experience.",
    reviewGuide: {
      title: "What to look at first",
      summary:
        "Treat this like a product review, not a code sample.",
      steps: [
        "Scan the landing page from top to bottom and watch how it moves from atmosphere to trust to booking intent.",
        "Resize the page and check how the layout, spacing, and navigation adapt across screen sizes.",
        "Use the GitHub link if you want to inspect how the polished front-end experience is organized in code.",
      ],
    },
    visuals: [
      {
        src: "/macon-banquet.jpg",
        alt: "Macon Banquet homepage hero section with event venue photography and booking call to action.",
        caption:
          "The homepage is designed around atmosphere first, then booking intent: the product sells the venue before asking for conversion.",
      },
    ],
  },
  {
    slug: "automata-workbench",
    title: "Automata Workbench",
    type: "Algorithms · Interactive UI · TypeScript",
    status: "Featured",
    summary:
      "An extended finite-automata workspace focused on cleaner workflows for building, converting, and exploring state machines.",
    proof: [
      "Extended a finite-automata workspace with regex → automaton, NFA → DFA, minimization, and DFA → regex workflows.",
      "Improved the dashboard UX by reducing clutter and grouping secondary tools.",
      "Kept clear attribution to the upstream FSM Engine project while making the fork’s changes explicit.",
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
      "Formal-language tools are often either too abstract or too cluttered, which makes it harder to explore conversions and state-machine behavior interactively.",
    build:
      "Starting from the open-source FSM Engine project, I extended the experience around automata-theory workflows: cleaner dashboard behavior, regex → automaton tools, NFA → DFA conversion, minimization, DFA → regex export, and clearer attribution.",
    takeaway:
      "This project shows both algorithmic understanding and engineering judgment: I can extend an existing codebase honestly, improve the UX, and make complex CS workflows easier to inspect.",
    reviewGuide: {
      title: "Try this path",
      summary:
        "Use the tool as an automata workflow, not only as a drawing canvas.",
      steps: [
        "Create or load a small machine, then use the conversion tools instead of stopping at the editor.",
        "Walk through NFA → DFA conversion and DFA minimization to see the algorithmic workflows exposed in the UI.",
        "If reviewing the code, compare the fork’s added workflow features and UX changes against the upstream attribution notes.",
      ],
    },
    visuals: [
      {
        src: "/automata-workbench.jpg",
        alt: "Automata Workbench interface showing a state machine and automata conversion tools.",
        caption:
          "The added workflow tools sit directly beside the canvas, making conversion and minimization part of the interaction rather than hidden theory.",
      },
    ],
  },
];

export const moreProjects: ProjectItem[] = [
  {
    slug: "seglungai",
    title: "SegLungAI",
    type: "ML engineering · Computer vision",
    status: "Research",
    summary:
      "An end-to-end neonatal lung MRI segmentation pipeline using a U-Net with a ResNet backbone.",
    proof: [
      "Built preprocessing, training, evaluation, and inference workflows for neonatal lung MRI segmentation.",
      "Evaluated performance with IoU and Dice, reaching about 0.90 IoU.",
      "Packaged reproducible training scripts and visual outputs to support repeatable experimentation.",
    ],
    stack: ["PyTorch", "NumPy", "scikit-learn", "U-Net", "ResNet"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/SegLungAI",
      },
    ],
    problem:
      "Medical-image segmentation work becomes fragile when preprocessing, training, evaluation, and inference live as disconnected experiments.",
    build:
      "I built a reproducible segmentation pipeline with dataset handling, model training, evaluation metrics, and inference workflows for neonatal lung MRI scans.",
    takeaway:
      "This project shows ML engineering discipline: repeatability, evaluation, and workflow design matter as much as the model itself.",
    reviewGuide: {
      title: "Start with the pipeline",
      summary:
        "This project is strongest when reviewed as a reproducible ML system, not just a model score.",
      steps: [
        "Open the repository and inspect how preprocessing, training, evaluation, and inference are separated.",
        "Look for the evaluation outputs and how IoU / Dice are used to judge segmentation quality.",
        "The main signal is repeatability: this is packaged as a workflow rather than a one-off notebook experiment.",
      ],
    },
    visuals: [
      {
        src: "/seglungai.jpg",
        alt: "SegLungAI research poster showing neonatal lung MRI segmentation architecture, metrics, and outputs.",
        caption:
          "Poster view of the pipeline, evaluation metrics, and segmentation outputs used to explain the full research workflow.",
      },
    ],
  },
  {
    slug: "birdclef-2026",
    title: "BirdCLEF 2026",
    type: "Audio ML · Multilabel classification",
    status: "Current",
    summary:
      "A multilabel bird-audio classification pipeline using mel spectrograms, EfficientNet-B2, weighted sampling, and SpecAugment.",
    proof: [
      "Reached a best validation macro-AUC of 0.8725 on a 234-class setup.",
      "Built a focal-clip and soundscape training workflow around mel spectrogram generation and augmentation.",
      "Currently exploring speech-model embeddings and ensemble strategies to improve robustness.",
    ],
    stack: ["PyTorch", "timm", "librosa", "EfficientNet-B2", "Audio ML"],
    links: [
      {
        label: "Kaggle notebook",
        href: "https://www.kaggle.com/code/dhyey654/birdclef2026-starter",
      },
    ],
    problem:
      "Bird-audio classification is difficult because labels are multilabel, classes are imbalanced, and long recordings contain sparse useful signals.",
    build:
      "I built a training pipeline using mel spectrograms, EfficientNet-B2, weighted sampling, and SpecAugment, then validated on focal clips and soundscapes.",
    takeaway:
      "This project shows current ML work in motion: I am iterating on baselines, testing stronger representations, and treating improvement as an engineering process rather than a one-shot model run.",
    next:
      "I am currently testing speech-model embeddings, increasing the inference window, strengthening the baseline, and planning an ensemble that combines complementary model behavior.",
    reviewGuide: {
      title: "Read this as active ML work",
      summary:
        "The value here is the iteration path, not pretending the competition is finished.",
      steps: [
        "Open the Kaggle notebook and look at the data-prep → mel-spectrogram → training flow.",
        "Notice the class imbalance handling, augmentation choices, and validation setup behind the 0.8725 macro-AUC baseline.",
        "Then read the next-step section to see how I am testing stronger representations instead of stopping at the first working model.",
      ],
    },
  },
  {
    slug: "drone-flight-data-analytics",
    title: "Drone Flight Data Analytics",
    type: "Data engineering · Streaming pipeline",
    status: "Systems",
    summary:
      "A telemetry analytics pipeline that ingests drone data, processes streams, persists outputs, and produces reviewable flight metrics.",
    proof: [
      "Built a Kafka → Spark → S3 telemetry pipeline on AWS.",
      "Processed flight streams into structured datasets and generated review metrics such as speed, altitude, and battery trends.",
      "Automated repeatable runs and documented the architecture and demo workflow.",
    ],
    stack: ["Python", "Kafka", "Spark", "AWS EC2", "S3"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/drone-flight-data-analytics",
      },
    ],
    problem:
      "Raw telemetry is difficult to review without a repeatable path from ingestion to cleaned data and useful metrics.",
    build:
      "I built a streaming pipeline on AWS with Kafka for ingestion, Spark for processing, and S3 for persisted outputs, then automated repeatable job runs and generated flight-review metrics.",
    takeaway:
      "This project shows data-engineering range: streaming, cloud infrastructure, processing, persistence, and operational repeatability.",
    reviewGuide: {
      title: "Review the architecture first",
      summary:
        "The strongest signal is the end-to-end pipeline, not any one plot.",
      steps: [
        "Start with the README or architecture notes to follow the data path from drone telemetry to persisted output.",
        "Look for Kafka ingestion, Spark processing, S3 persistence, and the generated review metrics.",
        "The important question is whether the pipeline can be run and understood repeatedly, not whether one chart looks impressive.",
      ],
    },
  },
  {
    slug: "job-fair-match",
    title: "Job Fair Match",
    type: "Full-stack product · Matching workflow",
    status: "Shipped",
    summary:
      "A swipe-based job matching platform with browse → swipe → match flows, protected actions, and relational backend modeling.",
    proof: [
      "Designed a normalized PostgreSQL schema for users, companies/jobs, swipes, and matches.",
      "Implemented APIs for profile creation, swipe actions, and match generation with validation and reliable UI state handling.",
      "Added authentication and authorization for protected actions such as login, swipes, and match retrieval.",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NeonDB"],
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
      "Matching products become unreliable quickly when user state, swipe history, and match generation are not modeled carefully.",
    build:
      "I built responsive browse → swipe → match flows, a normalized relational schema, backend APIs, and protected user actions with authentication and authorization.",
    takeaway:
      "This project shows product flow design, backend correctness, and data modeling for a real application pattern.",
    reviewGuide: {
      title: "Follow the data model",
      summary:
        "The strongest signal here is the backend correctness behind a familiar swipe-style interface.",
      steps: [
        "Start with the GitHub repository and inspect the schema for users, jobs, swipes, and matches.",
        "Then review how the APIs protect actions and prevent the UI from drifting away from backend state.",
        "Use the live demo as product context, but judge the project by the modeling and flow correctness underneath it.",
      ],
    },
    visuals: [
      {
        src: "/job-fair-match.jpg",
        alt: "Job Fair Match landing page with swipe-based job discovery interface.",
        caption:
          "The polished landing page communicates the swipe-first product idea before the deeper backend schema and auth work take over.",
      },
    ],
  },
];