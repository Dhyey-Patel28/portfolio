"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.2 });

    return (
        <motion.div
            aria-hidden
            className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-primary/70"
            style={{ scaleX }}
        />
    );
}