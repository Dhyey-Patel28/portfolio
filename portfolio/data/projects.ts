import type { ProjectMediaType } from "@/components/project-media";

export type ProjectCategory = "Full-stack" | "Frontend" | "Data" | "ML";

export type Project = {
    slug: string;
    name: string;
    tagline: string;
    category: ProjectCategory;
    stack: string[];
    links: { label: "GitHub" | "Live" | "Demo" | "Docs"; href: string }[];
    highlights: string[];
    featured?: boolean;
    media?: ProjectMediaType;
};

export const projects: Project[] = [
    {
        slug: "job-fair-match",
        name: "Job Fair Match",
        tagline:
        "Swipe-based job matching platform with clean UX and production deployment.",
        category: "Full-stack",
        stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Vercel"],
        links: [
            { label: "GitHub", href: "https://github.com/Dhyey-Patel28/job-matching-platform" },
            { label: "Live", href: "https://job-fair-match.vercel.app/" },
        ],
        highlights: [
            "Built profile, swipe, and match flows with a relational schema and fast lookups.",
            "Implemented authentication/authorization for user sessions and protected actions.",
            "Deployed on Vercel with production-ready routing and UI state management.",
        ],
        media: { type: "iframe", src: "https://job-fair-match.vercel.app/" },
        featured: true,
    },
    {
        slug: "automata-workbench",
        name: "Automata Workbench",
        tagline: "Interactive NFA/DFA tooling with visualization for learning and debugging.",
        category: "Frontend",
        stack: ["React", "TypeScript", "Algorithms", "Visualization"],
        links: [
            { label: "GitHub", href: "https://github.com/Dhyey-Patel28/automata-workbench" },
            { label: "Live", href: "https://automataworkbench.vercel.app/" },
        ],
        highlights: [
            "Implemented core automata algorithms (NFA→DFA conversion, DFA minimization).",
            "Built an interactive UI to input automata and visualize states/transitions.",
            "Validated correctness with test cases for common edge conditions.",
        ],
        featured: true,
        media: { type: "iframe", src: "https://automataworkbench.vercel.app/" },
    },
    {
        slug: "drone-flight-data-analytics",
        name: "Drone Flight Data Analytics",
        tagline: "Real flight telemetry pipeline: CoDrone → Kafka → Spark → S3 → plots.",
        category: "Data",
        stack: ["Python", "Kafka", "Spark Structured Streaming", "AWS EC2", "S3"],
        links: [{ label: "GitHub", href: "https://github.com/Dhyey-Patel28/drone-flight-data-analytics" }],
        highlights: [
            "Published live drone telemetry (height/pitch/roll/yaw/battery) to Kafka.",
            "Aggregated and transformed streams in Spark on EC2; persisted outputs to S3.",
            "Generated analytics and time-series plots from aggregated outputs.",
        ],
        featured: true,
        media: {
            type: "image",
            src: "/projects/drone-flight-data-analytics/cover.png",
            alt: "Drone Flight Data Analytics dashboard preview",
        },
    },
    {
        slug: "seglungai",
        name: "SegLungAI",
        tagline: "Neonatal lung segmentation pipeline using U-Net/ResNet.",
        category: "ML",
        stack: ["Python", "PyTorch", "U-Net", "ResNet", "Medical Imaging"],
        links: [{ label: "GitHub", href: "https://github.com/Dhyey-Patel28/SegLungAI" }],
        highlights: [
            "Built a U-Net/ResNet-based segmentation workflow for neonatal chest scans.",
            "Focused on dataset consistency and evaluation for reliable comparisons.",
            "Achieved ~0.9 IoU on lung segmentation (project report).",
        ],
        media: {
            type: "image",
            src: "/projects/seglungai/cover.png",
            alt: "SegLungAI Poster preview",
        },
    },
    {
        slug: "macon-banquet",
        name: "Macon Banquet",
        tagline: "Pixel-clean marketing site with a modern component system and UX polish.",
        category: "Frontend",
        stack: ["Next.js", "TypeScript", "Vercel"],
        links: [
            { label: "GitHub", href: "https://github.com/Dhyey-Patel28/macon-banquet" },
            { label: "Live", href: "https://macon-banquet.vercel.app/" },
        ],
        highlights: [
            "Designed a clean layout system and reusable sections for rapid iteration.",
            "Focused on responsive design and fast loading for a marketing audience.",
            "Implemented a review display with caching/refresh behavior (when available).",
        ],
        media: { type: "iframe", src: "https://macon-banquet.vercel.app/" },
    },
];