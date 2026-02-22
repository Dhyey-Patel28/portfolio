import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <main>
      <Container className="py-16 sm:py-24">
        <FadeIn>
          <p className="text-sm text-muted-foreground">
            {site.location} · {site.title}
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Full-stack software engineer building accessible, data-driven web
            tools with clean UI.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            I’m a CS master’s student at EMU and a Web Developer Graduate
            Assistant. I ship production tools by turning messy requirements into
            structured data and an accessible UI—focused on UX polish,
            performance, and maintainability.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/projects">View projects</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resume">Resume</Link>
            </Button>
            <Button variant="ghost" asChild>
              <a href={`mailto:${site.email}`}>Email me</a>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mt-14 flex items-end justify-between">
            <h2 className="text-lg font-medium tracking-tight">
              Featured projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              See all
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featured.map((p) => {
              const github = p.links.find((l) => l.label === "GitHub");
              const live = p.links.find((l) => l.label === "Live");
              const demo = p.links.find((l) => l.label === "Demo");

              return (
                <Card key={p.slug} className="transition hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{p.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {p.stack.slice(0, 2).join(" · ")}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{p.tagline}</p>

                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" asChild>
                        <Link href={`/projects/${p.slug}`}>Case study</Link>
                      </Button>

                      {github ? (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={github.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        </Button>
                      ) : null}

                      {live ? (
                        <Button size="sm" variant="outline" asChild>
                          <a href={live.href} target="_blank" rel="noreferrer">
                            Live
                          </a>
                        </Button>
                      ) : null}

                      {!live && demo ? (
                        <Button size="sm" variant="outline" asChild>
                          <a href={demo.href} target="_blank" rel="noreferrer">
                            Demo
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Experience */}
          <div className="mt-14 flex items-end justify-between">
            <h2 className="text-lg font-medium tracking-tight">Experience</h2>
          </div>

          <div className="mt-6 grid gap-4">
            {experience.map((e) => (
              <Card key={`${e.org}-${e.role}`} className="transition hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-base">
                      <span className="font-semibold">{e.role}</span>{" "}
                      <span className="text-muted-foreground">· {e.org}</span>
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {e.dates}
                      {e.location ? ` · ${e.location}` : ""}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>

                  {e.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.links.map((l) => (
                        <Button key={l.href} size="sm" variant="outline" asChild>
                          <a href={l.href} target="_blank" rel="noreferrer">
                            {l.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </Container>
    </main>
  );
}