export type LabItem = {
  slug: string;
  title: string;
  status: "In progress" | "Exploring";
  summary: string;
  currentMilestone: string;
  technicalChallenge: string;
  stack: string[];
};

export const labItems: LabItem[] = [
  {
    slug: "code-visualizer",
    title: "Code Visualizer",
    status: "In progress",
    summary:
      "A Python-first developer tool for visualizing execution flow, state changes, and program structure.",
    currentMilestone:
      "Ship a Python-only MVP with clear examples for loops, branches, functions, and state changes.",
    technicalChallenge:
      "Deciding what to show so the visualization improves comprehension instead of becoming noise.",
    stack: ["Python", "AST", "Program Analysis", "Visualization"],
  },
  {
    slug: "defi-protocol-safety",
    title: "DeFi Protocol Safety",
    status: "Exploring",
    summary:
      "A risk-inspection interface for comparing protocol safety signals, evidence, and uncertainty.",
    currentMilestone:
      "Define the first risk-signal schema and build comparison cards with evidence trails.",
    technicalChallenge:
      "Making risk labels explainable instead of turning safety into a black-box score.",
    stack: ["TypeScript", "React", "Data Modeling", "APIs"],
  },
  {
    slug: "momentum-app",
    title: "Momentum App",
    status: "In progress",
    summary:
      "A calm productivity experiment for turning goals into visible progress and repeatable habits.",
    currentMilestone:
      "Build the first flow for goals, daily actions, progress history, and habit continuity.",
    technicalChallenge:
      "Keeping the product focused enough to create momentum instead of becoming another task manager.",
    stack: ["React", "TypeScript", "State Management", "UX"],
  },
];
