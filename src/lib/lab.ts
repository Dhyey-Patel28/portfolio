export type LabLink = {
  label: string;
  href: string;
};

export type LabItem = {
  slug: string;
  title: string;
  status: "Early prototype" | "Prototype" | "Paused experiment" | "Personal prototype";
  context: string;
  summary: string;
  // Only what exists in the code today; plans go in `next`.
  built: string[];
  whereItStands: string;
  technicalChallenge: string;
  next?: string;
  stack: string[];
  links?: LabLink[];
};

export const labItems: LabItem[] = [
  {
    slug: "mancala-engine",
    title: "Mancala Beast v6",
    status: "Paused experiment",
    context: "Solo project",
    summary:
      "A self-play learning engine for Kalah (Mancala) that pairs a residual policy/value network with batched Monte Carlo tree search, in the style of AlphaZero.",
    built: [
      "Kalah rules engine and batched tree search carried over from earlier versions.",
      "A residual policy/value network bootstrapped from earlier replay data and exactly solved positions.",
      "Self-play, targeted training stages, and diagnostic tooling.",
      "Frozen arena suites that compare each new candidate against its parent on fixed positions.",
    ],
    whereItStands:
      "Paused at a promising experimental stage while I focus on other work. No playing-strength results are published here because they have not been established.",
    technicalChallenge:
      "Making evaluation trustworthy. Early arena suites were dominated by positions whose outcome was already decided, so I rebuilt how positions are selected and froze the suite before training the next candidate.",
    stack: ["Python", "PyTorch", "NumPy", "MCTS", "Self-play RL"],
  },
  {
    slug: "code-visualizer",
    title: "Python Code Visualizer",
    status: "Early prototype",
    context: "Solo project",
    summary:
      "A browser-based tool for stepping through Python programs, with the interpreter running client-side through Pyodide.",
    built: [
      "Next.js app with a code editor and sample programs.",
      "A tracer injected into Pyodide that records each executed line, the call stack, local variables, and printed output.",
    ],
    whereItStands:
      "An early implementation exists. I have ideas for developing it further but it is not a finished tool.",
    technicalChallenge:
      "Choosing the right level of detail: too little visualization is useless, too much becomes noise.",
    next:
      "A Python-only MVP with clear examples for loops, branches, function calls, and variable state.",
    stack: ["Next.js", "TypeScript", "Pyodide", "Python"],
  },
  {
    slug: "defi-protocol-safety",
    title: "DeFi Protocol Safety",
    status: "Prototype",
    context: "Solo project",
    summary:
      "A local simulator for a minimal lending protocol, meant to let you trigger failure modes such as stale oracle prices or price shocks and watch the protocol's safety checks respond.",
    built: [
      "Solidity contracts (Foundry) for a collateral vault, a mock price oracle, and LTV-based lending with oracle-freshness checks and an emergency pause.",
      "A Node event indexer backed by SQLite.",
      "A Next.js web app for the protocol dashboard.",
    ],
    whereItStands:
      "Very unfinished. The repository has meaningful pieces, but the end-to-end simulator is not complete or verified.",
    technicalChallenge:
      "Showing why an action was blocked, with on-chain events traced through the indexer to the UI, instead of reducing safety to a single score.",
    stack: ["Solidity", "Foundry", "TypeScript", "Node.js", "SQLite", "Next.js"],
  },
  {
    slug: "gita-path",
    title: "Gita Path",
    status: "Personal prototype",
    context: "Solo · personal project",
    summary:
      "A phone-first app for listening to, reading, and reflecting on the Bhagavad Gita, built around a daily practice and long commutes.",
    built: [
      "A commute mode that queues chapter recordings through YouTube's embedded player and records listening progress.",
      "Voice reflections stored on the device in IndexedDB.",
      "A chapter library, listening history, and a guidance page that finds teachings relevant to a question, optionally passing them to a local model.",
    ],
    whereItStands:
      "Unfinished. Progress stays in each browser, and translations still need review before they can be treated as reference content.",
    technicalChallenge:
      "Keeping the experience hands-free while driving: playback has to continue chapter to chapter with no interaction, and reflection happens only once parked.",
    stack: ["Next.js", "TypeScript", "IndexedDB", "YouTube IFrame API"],
  },
  {
    slug: "flowsafe",
    title: "FlowSafe",
    status: "Prototype",
    context: "Built with Nehang Patel",
    summary:
      "A privacy-first menstrual-cycle tracker concept: records stay on the device and work offline, with no accounts, cloud sync, or analytics.",
    built: [
      "Flutter app with a local SQLite database (Drift) and Riverpod state management.",
      "Today, calendar, insights, and onboarding screens built from a shared design system.",
      "Import, export, and delete-my-data screens so users keep control of their records.",
    ],
    whereItStands:
      "Unfinished. It is not released and not medically validated.",
    technicalChallenge:
      "Delivering useful tracking and insights while keeping every record local, including a portable export so users can move their data themselves.",
    stack: ["Flutter", "Dart", "Drift / SQLite", "Riverpod"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/flow_safe",
      },
    ],
  },
];
