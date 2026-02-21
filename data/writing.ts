export type Writing = {
    slug: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
};

export const writing: Writing[] = [
    {
        slug: "first-post",
        title: "First post",
        description: "Quick proof that MDX is wired and ready.",
        date: "2026-02-20",
    },
];