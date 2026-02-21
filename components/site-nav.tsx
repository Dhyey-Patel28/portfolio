import Link from "next/link";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Resume", href: "/resume" },
];

export function SiteNav() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <Container className="flex h-14 items-center justify-between">
                <Link href="/" className="font-medium tracking-tight">
                    {site.name}
                </Link>

                <nav className="hidden items-center gap-1 sm:flex">
                    {nav.map((item) => (
                        <Button key={item.href} variant="ghost" asChild>
                        <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild className="hidden sm:inline-flex">
                        <a href={`mailto:${site.email}`}>Email</a>
                    </Button>
                    <Button asChild>
                        <a
                            href={site.socials[0].href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium"
                        >
                        GitHub
                        </a>
                    </Button>
                </div>
            </Container>
        </header>
    );
}