import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Full-stack software engineer building accessible, data-driven web tools with clean UI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">
        <SiteNav />
          {children}
        <SiteFooter />
      </body>
    </html>
  );
}