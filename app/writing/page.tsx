import Link from "next/link";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { writing } from "@/data/writing";

export default function WritingIndex() {
    return (
        <main>
            <Container className="py-16">
                <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                    Notes from classes, projects, and things I learn while building.
                </p>

                <div className="mt-8 grid gap-4">
                    {writing.map((w) => (
                        <Link key={w.slug} href={`/writing/${w.slug}`} className="block">
                            <Card className="transition hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>{w.title}</span>
                                        <span className="text-xs font-normal text-muted-foreground">
                                            {w.date}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    {w.description}
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </Container>
        </main>
    );
}