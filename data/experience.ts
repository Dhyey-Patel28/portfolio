export type Experience = {
    org: string;
    role: string;
    location?: string;
    dates: string;
    highlights: string[];
    links?: { label: string; href: string }[];
};

export const experience: Experience[] = [
    {
        org: "Eastern Michigan University",
        role: "Graduate Assistant · Web Developer (Web Services / Modern Campus CMS)",
        location: "Ypsilanti, MI",
        dates: "2025 — Present",
        highlights: [
            "Shipped production web tools by converting messy requirements + catalog data into structured JSON and accessible UI flows.",
            "Built transfer-planner experiences with keyboard navigation, focus management, and screen-reader-friendly markup.",
            "Owned end-to-end maintenance work across hundreds of pages (QA, link validation, content updates, and tooling improvements).",
        ],
    },
    {
        org: "Givaudan",
        role: "Software Engineering Intern",
        dates: "2024",
        highlights: [
            "Helped migrate an AI-integrated desktop app to a React web app for cloud delivery and faster iteration.",
            "Built dynamic UI features and ported R/MATLAB logic to JavaScript while preserving output parity.",
            "Improved data workflows and built visualizations to reduce analysis time and speed up insights.",
        ],
    },
];