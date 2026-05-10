import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-[#f7f3ec] px-6 text-stone-950"
    >
      <section className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-stone-400">
          404
        </p>

        <h1 className="mt-8 text-6xl font-medium leading-[0.9] tracking-[-0.075em] sm:text-8xl">
          Page not found.
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-stone-600 sm:text-lg">
          This page does not exist or may have moved.
        </p>

        <Link
          href="/"
          className="soft-pill soft-pill-lg mt-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </section>
    </main>
  );
}