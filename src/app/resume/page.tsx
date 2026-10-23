import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import JsonLd from "@/components/json-ld";
import { absoluteUrl, breadcrumbSchema, graph, pageMetadata, personRef, webPageSchema } from "@/lib/seo";
import SiteNav from "@/components/site-nav";

const meta = {
  name: "Resume — Dhyey Patel",
  description:
    "Resume of Dhyey Patel, software engineer: Web Developer at Eastern Michigan University, former Givaudan intern, M.S. Computer Science (Spring 2027), with accepted IEEE research. View or download the PDF.",
  path: "/resume",
};

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Resume",
    description: meta.description,
    path: meta.path,
    socialTitle: "Dhyey Patel — Resume · Software Engineer",
  }),
  // Absolute so searches for "Dhyey Patel resume" match the page title directly.
  title: { absolute: "Dhyey Patel — Resume · Software Engineer" },
};

export default function ResumePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
      <JsonLd
        data={graph(
          webPageSchema({
            ...meta,
            extra: {
              about: personRef,
              mainEntity: {
                "@type": "DigitalDocument",
                name: "Dhyey Patel — Resume",
                encodingFormat: "application/pdf",
                url: absoluteUrl("/resume.pdf"),
                author: personRef,
              },
            },
          }),
          breadcrumbSchema([{ name: "Resume", path: "/resume" }])
        )}
      />
      <SiteNav />

      <section className="px-6 pb-8 pt-32 md:pb-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="soft-pill soft-pill-md">
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-500">
                Resume
              </p>

              <h1 className="mt-6 text-5xl font-medium tracking-[-0.07em] text-stone-950 sm:text-7xl">
                Dhyey Patel
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-stone-600">
                Software engineer with production experience at Eastern Michigan
                University and Givaudan, and accepted IEEE research in applied ML.
              </p>
            </div>

            <div className="hidden flex-wrap gap-3 md:flex">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="soft-pill soft-pill-md"
              >
                Open PDF
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="/resume.pdf"
                download
                className="soft-pill soft-pill-md"
              >
                Download PDF
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Phone browsers render embedded PDFs poorly, so lead with opening it directly. */}
          <div className="rounded-[2rem] border border-stone-300/80 bg-[#fbf8f1] p-6 shadow-sm md:hidden">
            <FileText className="h-6 w-6 text-stone-500" aria-hidden="true" />
            <p className="mt-4 text-base leading-7 text-stone-700">
              One-page PDF resume. It opens in your phone&apos;s PDF viewer, where you can
              zoom and share it.
            </p>
            <div className="mt-6 grid gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-4 text-sm font-medium text-[#fbf8f1] transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-950/30"
              >
                Open PDF
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="soft-pill soft-pill-md justify-center"
              >
                Download PDF
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Desktop: size the frame to a full letter-size page plus the viewer
              toolbar, so the whole page shows and the page itself does the scrolling. */}
          <div className="mx-auto hidden max-w-[880px] md:block">
            <div
              className="relative overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[#fbf8f1] shadow-sm"
              style={{ paddingTop: "calc(129.4% + 52px)" }}
            >
              <iframe
                src="/resume.pdf#view=FitH&navpanes=0"
                title="Dhyey Patel resume"
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <p className="mt-4 text-center text-sm text-stone-500">
              Viewer not loading?{" "}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-stone-700 underline-offset-4 hover:underline"
              >
                Open the PDF in a new tab
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}