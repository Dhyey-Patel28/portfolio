import Link from "next/link";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/projects";

export default function ProjectsIndex() {
    return (
        <main>
            <Container className="py-16">
                <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                    Selected work across full-stack web, UI tooling, and applied ML/data.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {projects.map((p) => (
                        <Link key={p.slug} href={`/projects/${p.slug}`} className="block">
                            <Card className="transition hover:shadow-md">
                                <CardHeader>
                                    <CardTitle>{p.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {p.tagline}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </main>
    );
}