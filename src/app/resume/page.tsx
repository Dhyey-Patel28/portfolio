import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume for Dhyey Patel, software developer.",
};

const mobileResumePdfSrc =
  "/resume.pdf#toolbar=1&navpanes=0&scrollbar=1&view=Fit&zoom=page-fit";

const desktopResumePdfSrc = "/resume.pdf#view=FitH";

export default function ResumePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen bg-[#f7f3ec] text-stone-950"
    >
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
                Software developer building full-stack tools, data-rich
                interfaces, and practical ML systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="soft-pill soft-pill-md"
              >
                Open PDF
                <ExternalLink className="h-4 w-4" />
              </a>

              <a href="/resume.pdf" download className="soft-pill soft-pill-md">
                Download PDF
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 md:pb-24">
        <div className="mx-auto max-w-6xl">
          {/* Mobile only: page-ratio container to avoid sideways PDF scrolling */}
          <div className="md:hidden">
            <div className="mb-5 rounded-[1.5rem] border border-stone-300/80 bg-[#fbf8f1]/80 p-4 text-sm leading-7 text-stone-600">
              The resume is scaled for mobile viewing. Use{" "}
              <span className="font-medium text-stone-950">Open PDF</span> for
              the browser’s native PDF viewer or{" "}
              <span className="font-medium text-stone-950">Download PDF</span>{" "}
              to save it.
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-stone-300/80 bg-[#fbf8f1] shadow-sm">
              <div className="relative aspect-[8.5/11] w-full">
                <iframe
                  src={mobileResumePdfSrc}
                  title="Dhyey Patel resume"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="soft-pill soft-pill-md"
              >
                Open PDF
                <ExternalLink className="h-4 w-4" />
              </a>

              <a href="/resume.pdf" download className="soft-pill soft-pill-md">
                Download PDF
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Tablet / desktop: keep the original larger embedded PDF viewer */}
          <div className="hidden overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[#fbf8f1] shadow-sm md:block">
            <iframe
              src={desktopResumePdfSrc}
              title="Dhyey Patel resume"
              className="h-[78vh] w-full border-0"
            />
          </div>
        </div>
      </section>
    </main>
  );
}