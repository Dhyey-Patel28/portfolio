"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/hero-scene"), { ssr: false });

export function HeroCanvas() {
    const reduceMotion = useReducedMotion();
    if (reduceMotion) return null;

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />

        <div className="absolute inset-0 opacity-[0.85] blur-[0.2px]">
            <HeroScene />
        </div>

        <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-6 top-10 h-[28rem] w-[28rem] rounded-full bg-[var(--chart-2)]/10 blur-3xl" />
        </div>
    );
}