import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ProjectMedia } from "@/components/project-media";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) return notFound();

    return (
        <main>
            <Container className="py-16">
                <h1 className="text-3xl font-semibold tracking-tight">{p.name}</h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">{p.tagline}</p>

                <div className="mt-8">
                    <ProjectMedia media={p.media} title={p.name} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                        <Badge key={s} variant="secondary">
                        {s}
                        </Badge>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {p.links.map((l) => (
                        <Button key={l.href} variant="outline" asChild>
                        <a href={l.href} target="_blank" rel="noreferrer">
                            {l.label}
                        </a>
                        </Button>
                    ))}
                </div>

                <h2 className="mt-12 text-lg font-medium tracking-tight">What I did</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                    ))}
                </ul>
            </Container>
        </main>
    );
}