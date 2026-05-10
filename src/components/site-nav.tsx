  "use client";

  import Link from "next/link";
  import { Menu, X } from "lucide-react";
  import { useState } from "react";

  type NavSection = "about" | "experience" | "projects" | "lab";

  type SiteNavProps = {
    active?: NavSection;
    home?: boolean;
  };

  const navItems: {
    label: string;
    href: string;
    key: NavSection;
  }[] = [
    {
      label: "About",
      href: "/about",
      key: "about",
    },
    {
      label: "Experience",
      href: "/experience",
      key: "experience",
    },
    {
      label: "Projects",
      href: "/projects",
      key: "projects",
    },
    {
      label: "Lab",
      href: "/lab",
      key: "lab",
    },
  ];

  export default function SiteNav({
    active,
    home = false,
  }: SiteNavProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const brandHref = "/";
    const contactHref = home ? "#contact" : "/#contact";

    return (
      <>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <nav
          className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 sm:py-5"
          aria-label="Main navigation"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-stone-300/70 bg-[#f7f3ec]/80 px-4 py-3 text-sm shadow-sm backdrop-blur sm:px-5">
            <Link
              href={brandHref}
              className="font-medium tracking-tight text-stone-950"
              onClick={() => setMobileOpen(false)}
            >
              Dhyey Patel
            </Link>

            <div className="hidden items-center gap-6 text-stone-500 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={
                    active === item.key
                      ? "text-stone-950"
                      : "transition hover:text-stone-950"
                  }
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href={contactHref}
                className="transition hover:text-stone-950"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/resume" className="soft-pill soft-pill-sm">
                Resume
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((current) => !current)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-[#fbf8f1]/80 text-stone-600 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30 md:hidden"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div
              id="mobile-navigation"
              className="mx-auto mt-3 max-w-6xl rounded-[1.5rem] border border-stone-300/80 bg-[#fbf8f1]/95 p-3 shadow-lg backdrop-blur md:hidden"
            >
              <div className="grid gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      active === item.key
                        ? "rounded-[1rem] bg-stone-950 px-4 py-3 text-sm font-medium text-[#fbf8f1]"
                        : "rounded-[1rem] px-4 py-3 text-sm text-stone-600 transition hover:bg-stone-950 hover:text-[#fbf8f1]"
                    }
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href={contactHref}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-[1rem] px-4 py-3 text-sm text-stone-600 transition hover:bg-stone-950 hover:text-[#fbf8f1]"
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>
      </>
    );
  }