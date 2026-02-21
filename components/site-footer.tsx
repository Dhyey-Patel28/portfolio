import { site } from "@/data/site";
import { Container } from "@/components/container";

export function SiteFooter() {
    return (
        <footer className="border-t">
            <Container className="py-10 text-sm text-muted-foreground">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} {site.name}. Built with Next.js.
                    </p>
                    <div className="flex gap-4">
                        {site.socials.map((s) => (
                            <a
                                key={s.href}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-foreground"
                            >
                                {s.label}
                            </a>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}