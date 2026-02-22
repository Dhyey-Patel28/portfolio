"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Writing", href: "/writing" },
  { label: "Resume", href: "/resume" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const github = site.socials.find((s) => s.label === "GitHub");
  const linkedin = site.socials.find((s) => s.label === "LinkedIn");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-medium tracking-tight">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Button key={item.href} variant={active ? "secondary" : "ghost"} asChild>
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu />
          </Button>

          <ThemeToggle />

          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <a href={`mailto:${site.email}`}>Email</a>
          </Button>

          {linkedin ? (
            <Button variant="outline" asChild className="hidden sm:inline-flex">
              <a href={linkedin.href} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Button>
          ) : null}

          {github ? (
            <Button asChild className="hidden sm:inline-flex">
              <a href={github.href} target="_blank" rel="noreferrer" className="font-medium">
                GitHub
              </a>
            </Button>
          ) : null}
        </div>
      </Container>

      {/* Mobile overlay */}
      {open ? (
        <div className="sm:hidden">
          <div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-0 z-50 border-b bg-background">
            <Container className="flex h-14 items-center justify-between">
              <span className="font-medium tracking-tight">{site.name}</span>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X />
                </Button>
              </div>
            </Container>
          </div>

          <div className="fixed inset-x-0 top-14 z-50 bg-background">
            <Container className="py-4">
              <nav className="grid gap-2" aria-label="Mobile primary">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg border px-4 py-3 text-sm",
                        active ? "bg-muted" : "hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 grid gap-2">
                <a className="rounded-lg border px-4 py-3 text-sm hover:bg-muted" href={`mailto:${site.email}`}>
                  Email
                </a>
                {linkedin ? (
                  <a className="rounded-lg border px-4 py-3 text-sm hover:bg-muted" href={linkedin.href} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                ) : null}
                {github ? (
                  <a className="rounded-lg border px-4 py-3 text-sm hover:bg-muted" href={github.href} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}