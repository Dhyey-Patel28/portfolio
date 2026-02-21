export type Project = {
    slug: string;
    name: string;
    tagline: string;
    stack: string[];
    links: { label: string; href: string }[];
    highlights: string[];
};

export const projects: Project[] = [
    {
        slug: "job-fair-match",
        name: "Job Fair Match",
        tagline: "AI + semantic matching to connect candidates with roles faster.",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Python", "OpenAI API"],
        links: [
            { label: "GitHub", href: "https://github.com/Dhyey-Patel28" }, // replace with repo
            // { label: "Live", href: "https://..." },
        ],
        highlights: [
            "Built an end-to-end matching flow: resume → embedding → ranked results.",
            "Designed a clean UX for search, filters, and match explanations.",
            "Focused on performance + clarity for recruiter-friendly output.",
        ],
    },
    {
        slug: "automata-workbench",
        name: "Automata Workbench",
        tagline: "Interactive NFA/DFA tooling with visual edits and exports.",
        stack: ["React", "TypeScript", "Canvas/Visualization"],
        links: [{ label: "GitHub", href: "https://github.com/Dhyey-Patel28" }], // replace
        highlights: [
            "Created a visual editor to build and transform automata quickly.",
            "Optimized interaction patterns (drag/drop, keyboard, selection).",
            "Designed for explainability and learning workflows.",
        ],
    },
    {
        slug: "seglungai",
        name: "SegLungAI",
        tagline: "Deep-learning segmentation pipeline for neonatal lung MRI.",
        stack: ["Python", "PyTorch", "Medical Imaging", "U-Net"],
        links: [{ label: "GitHub", href: "https://github.com/Dhyey-Patel28" }], // replace
        highlights: [
            "Worked on preprocessing + standardization of volumetric data.",
            "Built evaluation workflow for segmentation metrics.",
            "Focused on reproducibility and dataset consistency.",
        ],
    },
];