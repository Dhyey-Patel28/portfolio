"use client";

import Link from "next/link";
import { useEffect, useRef, useMemo, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  FileText,
  Mail,
} from "lucide-react";
import { experienceItems } from "@/lib/experience";
import { featuredProjects, moreProjects, type ProjectItem } from "@/lib/projects";
import { labItems } from "@/lib/lab";
import SiteNav from "@/components/site-nav";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const HOMEPAGE_PROJECT_SLUGS = [
  "grantpilot",
  "atmosphere-atlas",
  "automata-workbench",
] as const;

const allProjects = [...featuredProjects, ...moreProjects];

const homepageProjects = HOMEPAGE_PROJECT_SLUGS.map((slug) =>
  allProjects.find((project) => project.slug === slug)
).filter((project): project is ProjectItem => Boolean(project));


function ExplodingWord({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`word inline-block whitespace-nowrap align-baseline ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="char inline-block will-change-transform align-baseline"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setHasMounted(true);
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

  return hasMounted;
}

function StickFigureJourney() {
  const hasMounted = useHasMounted();
  const { scrollY, scrollYProgress } = useScroll();

  const x = useTransform(scrollYProgress, [0, 1], ["5vw", "86vw"]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.7, 1],
    ["0px", "-4px", "0px", "-5px", "-8px"]
  );

  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 120,
    damping: 26,
    mass: 0.35,
  });

  const [speed, setSpeed] = useState(0);
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);

  const [isSitting, setIsSitting] = useState(false);
  const [isPanting, setIsPanting] = useState(false);

  const progressRef = useRef(0);
  const isSittingRef = useRef(false);
  const isPantingRef = useRef(false);
  const shouldPantAtFinishRef = useRef(false);
  const hasPantedRef = useRef(false);
  const hasSprintedRef = useRef(false);

  const sitTimerRef = useRef<number | null>(null);
  const pantTimerRef = useRef<number | null>(null);

  const clearSitTimer = () => {
    if (sitTimerRef.current !== null) {
      window.clearTimeout(sitTimerRef.current);
      sitTimerRef.current = null;
    }
  };

  const clearPantTimer = () => {
    if (pantTimerRef.current !== null) {
      window.clearTimeout(pantTimerRef.current);
      pantTimerRef.current = null;
    }
  };

  const beginSitting = () => {
    if (isSittingRef.current || isPantingRef.current) return;
    isSittingRef.current = true;

    window.requestAnimationFrame(() => {
      setIsSitting(true);
    });
  };

  const endSitting = () => {
    if (!isSittingRef.current) return;
    isSittingRef.current = false;

    window.requestAnimationFrame(() => {
      setIsSitting(false);
    });
  };

  const beginPanting = () => {
    if (isPantingRef.current) return;

    isPantingRef.current = true;

    window.requestAnimationFrame(() => {
      setIsPanting(true);
    });

    clearPantTimer();

    pantTimerRef.current = window.setTimeout(() => {
      isPantingRef.current = false;

      window.requestAnimationFrame(() => {
        setIsPanting(false);
      });

      shouldPantAtFinishRef.current = false;
      hasSprintedRef.current = false;
      pantTimerRef.current = null;
    }, 2800);
  };

  useMotionValueEvent(smoothVelocity, "change", (latest) => {
    const nextSpeed = Math.min(Math.abs(latest), 2000);
    setSpeed(nextSpeed);

    if (nextSpeed > 1250) {
      hasSprintedRef.current = true;
      shouldPantAtFinishRef.current = true;
    }

    if (isPantingRef.current || progressRef.current > 0.93) {
      clearSitTimer();
      return;
    }

    if (nextSpeed < 8) {
      if (!isSittingRef.current && sitTimerRef.current === null) {
        sitTimerRef.current = window.setTimeout(() => {
          beginSitting();
          sitTimerRef.current = null;
        }, 950);
      }
      return;
    }

    clearSitTimer();

    if (isSittingRef.current && nextSpeed > 120) {
      endSitting();
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    progressRef.current = latest;
    setProgress(latest);

    if (latest < 0.86) {
      hasPantedRef.current = false;
      if (!isPantingRef.current) {
        shouldPantAtFinishRef.current = false;
        hasSprintedRef.current = false;
      }
    }

    if (
      latest > 0.93 &&
      (shouldPantAtFinishRef.current || hasSprintedRef.current) &&
      !isPantingRef.current &&
      !hasPantedRef.current
    ) {
      hasPantedRef.current = true;
      beginPanting();
    }
  });

  useEffect(() => {
    return () => {
      clearSitTimer();
      clearPantTimer();
    };
  }, []);

  const isCelebrating = progress > 0.955 && !isPanting;
  const isRunning =
    !isCelebrating && !isPanting && !isSitting && speed > 1250;
  const isWalking =
    !isCelebrating && !isPanting && !isSitting && speed > 110;

  type Pose = {
    head: [number, number];
    body: string;
    leftArm: string;
    rightArm: string;
    leftLeg: string;
    rightLeg: string;
  };

  const idleFrames: Pose[] = useMemo(
    () => [
      {
        head: [48, 18],
        body: "M 48 30 Q 48 44 48 60",
        leftArm: "M 48 32 Q 42 42 36 54",
        rightArm: "M 48 32 Q 54 42 60 54",
        leftLeg: "M 48 60 Q 42 78 39 98",
        rightLeg: "M 48 60 Q 54 78 57 98",
      },
      {
        head: [48, 19],
        body: "M 48 31 Q 48 45 48 61",
        leftArm: "M 48 33 Q 41 43 35 55",
        rightArm: "M 48 33 Q 55 43 61 55",
        leftLeg: "M 48 61 Q 42 79 40 99",
        rightLeg: "M 48 61 Q 54 79 56 99",
      },
    ],
    []
  );

  const walkFrames: Pose[] = useMemo(
    () => [
      {
        head: [48, 18],
        body: "M 48 30 Q 48 44 48 60",
        leftArm: "M 48 32 Q 38 42 28 54",
        rightArm: "M 48 32 Q 58 40 66 48",
        leftLeg: "M 48 60 Q 42 76 34 98",
        rightLeg: "M 48 60 Q 55 72 63 90",
      },
      {
        head: [48, 19],
        body: "M 48 31 Q 48 45 48 61",
        leftArm: "M 48 33 Q 41 42 34 52",
        rightArm: "M 48 33 Q 55 43 61 56",
        leftLeg: "M 48 61 Q 43 78 39 98",
        rightLeg: "M 48 61 Q 54 77 59 96",
      },
      {
        head: [48, 18],
        body: "M 49 30 Q 49 44 49 60",
        leftArm: "M 48 32 Q 40 40 30 48",
        rightArm: "M 48 32 Q 60 42 70 56",
        leftLeg: "M 49 60 Q 42 72 35 90",
        rightLeg: "M 49 60 Q 56 78 62 98",
      },
      {
        head: [48, 19],
        body: "M 48 31 Q 48 45 48 61",
        leftArm: "M 48 33 Q 41 43 35 56",
        rightArm: "M 48 33 Q 55 42 62 52",
        leftLeg: "M 48 61 Q 43 77 39 96",
        rightLeg: "M 48 61 Q 54 78 58 98",
      },
    ],
    []
  );

  const runFrames: Pose[] = useMemo(
    () => [
      {
        head: [52, 18],
        body: "M 50 30 Q 46 42 42 56",
        leftArm: "M 48 32 Q 36 40 24 52",
        rightArm: "M 48 32 Q 62 24 74 18",
        leftLeg: "M 42 56 Q 36 72 28 96",
        rightLeg: "M 42 56 Q 56 64 72 76",
      },
      {
        head: [51, 19],
        body: "M 49 31 Q 45 43 42 57",
        leftArm: "M 47 33 Q 38 45 28 56",
        rightArm: "M 47 33 Q 58 38 69 45",
        leftLeg: "M 42 57 Q 38 74 29 86",
        rightLeg: "M 42 57 Q 53 77 61 100",
      },
      {
        head: [52, 18],
        body: "M 50 30 Q 46 42 42 56",
        leftArm: "M 48 32 Q 38 24 28 15",
        rightArm: "M 48 32 Q 62 42 76 55",
        leftLeg: "M 42 56 Q 30 64 18 72",
        rightLeg: "M 42 56 Q 50 72 58 98",
      },
      {
        head: [51, 19],
        body: "M 49 31 Q 45 43 42 57",
        leftArm: "M 47 33 Q 36 40 26 48",
        rightArm: "M 47 33 Q 60 46 73 58",
        leftLeg: "M 42 57 Q 34 76 30 100",
        rightLeg: "M 42 57 Q 56 68 72 82",
      },
    ],
    []
  );

  // torso moved down so the bum visually touches the ground
  const sitFrames: Pose[] = useMemo(
    () => [
      {
        head: [50, 32],
        body: "M 50 44 Q 48 65 46 95",
        leftArm: "M 49 47 Q 43 57 39 67",
        rightArm: "M 49 47 Q 58 51 66 58",
        leftLeg: "M 46 95 Q 58 74 72 80 Q 79 91 84 96",
        rightLeg: "M 46 95 Q 64 86 79 87 Q 88 93 92 96",
      },
      {
        head: [50, 33],
        body: "M 50 45 Q 48 66 46 96",
        leftArm: "M 49 48 Q 43 58 39 68",
        rightArm: "M 49 48 Q 58 52 66 59",
        leftLeg: "M 46 96 Q 58 75 72 81 Q 79 91 84 96",
        rightLeg: "M 46 96 Q 64 87 79 88 Q 88 93 92 96",
      },
    ],
    []
  );

  const pantFrames: Pose[] = useMemo(
    () => [
      {
        head: [56, 24],
        body: "M 54 36 Q 49 47 46 60",
        leftArm: "M 52 38 Q 47 50 43 61",
        rightArm: "M 52 38 Q 58 50 63 61",
        leftLeg: "M 46 60 Q 40 79 38 98",
        rightLeg: "M 46 60 Q 54 79 58 98",
      },
      {
        head: [57, 26],
        body: "M 55 38 Q 50 49 47 62",
        leftArm: "M 53 40 Q 48 51 44 63",
        rightArm: "M 53 40 Q 59 51 64 63",
        leftLeg: "M 47 62 Q 41 80 39 99",
        rightLeg: "M 47 62 Q 55 80 59 99",
      },
    ],
    []
  );

  const celebrateFrames: Pose[] = useMemo(
    () => [
      {
        head: [48, 24],
        body: "M 48 36 Q 48 48 48 60",
        leftArm: "M 48 38 Q 38 50 34 62",
        rightArm: "M 48 38 Q 58 50 62 62",
        leftLeg: "M 48 60 Q 36 70 32 88",
        rightLeg: "M 48 60 Q 60 70 64 88",
      },
      {
        head: [48, 18],
        body: "M 48 30 Q 48 44 48 58",
        leftArm: "M 48 32 Q 38 24 28 18",
        rightArm: "M 48 32 Q 58 24 68 18",
        leftLeg: "M 48 58 Q 40 74 36 94",
        rightLeg: "M 48 58 Q 56 74 60 94",
      },
      {
        head: [48, 10],
        body: "M 48 22 Q 48 34 48 50",
        leftArm: "M 48 24 Q 34 10 20 0",
        rightArm: "M 48 24 Q 62 10 76 0",
        leftLeg: "M 48 50 Q 40 66 30 82",
        rightLeg: "M 48 50 Q 56 66 66 82",
      },
      {
        head: [48, 16],
        body: "M 48 28 Q 48 42 48 58",
        leftArm: "M 48 30 Q 36 18 24 8",
        rightArm: "M 48 30 Q 60 18 72 8",
        leftLeg: "M 48 58 Q 42 76 38 98",
        rightLeg: "M 48 58 Q 54 76 58 98",
      },
    ],
    []
  );

  const frames = isPanting
    ? pantFrames
    : isCelebrating
      ? celebrateFrames
      : isSitting
        ? sitFrames
        : isRunning
          ? runFrames
          : isWalking
            ? walkFrames
            : idleFrames;

  const fps = isPanting
    ? 2.1
    : isCelebrating
      ? 3
      : isSitting
        ? 1
        : isRunning
          ? 6.2
          : isWalking
            ? 4
            : 1.35;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrame((prev) => {
        const next = prev + 1;
        return next >= frames.length ? 0 : next;
      });
    }, 1000 / fps);

    return () => window.clearInterval(interval);
  }, [fps, frames.length]);

  if (!hasMounted) {
    return null;
  }

  const pose = frames[frame % frames.length];

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed bottom-4 left-0 z-50 block scale-75 mix-blend-difference md:scale-100"
      aria-hidden="true"
    >
      <svg
        width="128"
        height="128"
        viewBox="0 0 96 110"
        fill="none"
        className="overflow-visible text-white"
      >
        <ellipse
          cx={isSitting ? 58 : 48}
          cy="102"
          rx={isCelebrating ? 15 : isPanting ? 17 : isSitting ? 28 : 18}
          ry="4"
          fill="currentColor"
          opacity="0.22"
        />

        {isRunning && (
          <>
            <line
              x1="4"
              y1="32"
              x2="18"
              y2="32"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.75"
            />
            <line
              x1="2"
              y1="44"
              x2="16"
              y2="44"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.75"
            />
          </>
        )}

        {isPanting && (
          <motion.g
            initial={false}
            animate={{ x: [0, 3, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
          >
            <line
              x1="63"
              y1="24"
              x2="71"
              y2="23"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="64"
              y1="29"
              x2="74"
              y2="28"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="63"
              y1="34"
              x2="70"
              y2="35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>
        )}

        {isCelebrating && (
          <>
            <motion.g
              initial={false}
              animate={{ x: [0, -1, 1, 0], y: [0, -1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.05, ease: "easeInOut" }}
            >
              <line
                x1="13"
                y1="10"
                x2="5"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="14"
                x2="4"
                y2="14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="13"
                y1="18"
                x2="5"
                y2="24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>

            <motion.g
              initial={false}
              animate={{ x: [0, 1, -1, 0], y: [0, 1, -1, 0] }}
              transition={{ repeat: Infinity, duration: 0.95, ease: "easeInOut" }}
            >
              <line
                x1="83"
                y1="10"
                x2="91"
                y2="4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="80"
                y1="14"
                x2="92"
                y2="14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="83"
                y1="18"
                x2="91"
                y2="24"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>
          </>
        )}

        <circle
          cx={pose.head[0]}
          cy={pose.head[1]}
          r="8"
          stroke="currentColor"
          strokeWidth="2.7"
        />

        <path
          d={pose.body}
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pose.leftArm}
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pose.rightArm}
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pose.leftLeg}
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={pose.rightLeg}
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}


function JourneyGround() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden h-24 md:block">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full text-stone-300"
        fill="none"
      >
        <path
          d="M0 82 C 140 68, 240 92, 380 78 C 540 62, 680 94, 840 78 C 1010 61, 1180 86, 1440 72"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 14"
        />
      </svg>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
      {children}
    </p>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-stone-300/80 bg-[#fbf8f1]/85 p-6 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-140px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="max-w-3xl">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2 className="mt-5 text-5xl font-medium tracking-[-0.06em] text-stone-950 sm:text-7xl">
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">
          {body}
        </p>
      </div>
      {action}
    </motion.div>
  );
}

function PillLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className = "soft-pill soft-pill-md focus:outline-none focus:ring-2 focus:ring-stone-950/30";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function QuickPathCard({
  label,
  title,
  body,
  href,
}: {
  label: string;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[2rem] border border-stone-300/80 bg-[#fbf8f1]/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-400">
        {label}
      </p>
      <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-stone-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-stone-600">{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition group-hover:text-stone-950">
        Go there
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experienceItems)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: "easeOut" }}
    >
      <Surface className="group h-full">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
              Experience / {item.dates}
            </p>
            <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-stone-950">
              {item.company}
            </h3>
            <p className="mt-2 text-sm font-medium text-stone-500">
              {item.role} · {item.location}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="rounded-full border border-stone-300 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Real systems
            </p>

            <Link
              href={`/experience/${item.slug}`}
              aria-label={`Read experience details for ${item.company}`}
              className="group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30"
            >
              <ArrowRight className="h-4 w-4 stroke-current transition group-hover/arrow:text-[#fbf8f1]" />
            </Link>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-7 text-stone-600">
          {item.summary}
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              What I did
            </p>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-stone-600">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-3 h-px w-6 shrink-0 bg-stone-300" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Impact
            </p>
            <div className="mt-3 grid gap-2">
              {item.metrics.map((metric) => (
                <p
                  key={metric}
                  className="rounded-full border border-stone-200 bg-[#fbf8f1]/75 px-3 py-2 text-sm text-stone-600"
                >
                  {metric}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-stone-200 pt-5">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-stone-950 px-3 py-1.5 text-xs text-stone-50"
            >
              {tech}
            </span>
          ))}
        </div>
      </Surface>
    </motion.article>
  );
}

function ProjectCard({
  item,
  index,
}: {
  item: ProjectItem;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: "easeOut" }}
    >
      <Surface className="group h-full transition duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
              Project / {item.status}
            </p>
            <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-stone-950">
              {item.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-stone-500">{item.type}</p>
          </div>
          <Link
            href={`/projects/${item.slug}`}
            aria-label={`Read project details for ${item.title}`}
            className="group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30"
          >
            <ArrowRight className="h-4 w-4 stroke-current transition group-hover/arrow:text-[#fbf8f1]" />
          </Link>
        </div>

        <p className="mt-5 text-sm leading-7 text-stone-600">{item.summary}</p>

        <div className="mt-6 rounded-[1.25rem] border border-stone-200 bg-[#f7f3ec]/70 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Proof
          </p>
          <ul className="mt-3 space-y-3 text-sm leading-7 text-stone-600">
            {item.proof.slice(0, 2).map((proof) => (
              <li key={proof} className="flex gap-3">
                <span className="mt-3 h-px w-6 shrink-0 bg-stone-300" />
                <span>{proof}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {item.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {item.links && item.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 border-t border-stone-200 pt-5">
            {item.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
              >
                {link.label}
                {link.label === "GitHub" ? (
                  <GitHubIcon className="h-3.5 w-3.5" />
                ) : (
                  <ExternalLink className="h-3.5 w-3.5" />
                )}
              </a>
            ))}
          </div>
        )}
      </Surface>
    </motion.article>
  );
}

function LabCard({
  item,
  index,
}: {
  item: (typeof labItems)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
    >
      <Surface className="group h-full">
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-400">
          Lab / {item.status}
        </p>

        <Link
          href={`/lab/${item.slug}`}
          aria-label={`Read lab note for ${item.title}`}
          className="group/arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-500 transition hover:border-stone-950 hover:bg-stone-950 hover:text-[#fbf8f1] focus:outline-none focus:ring-2 focus:ring-stone-950/30"
        >
          <ArrowRight className="h-4 w-4 stroke-current transition group-hover/arrow:text-[#fbf8f1]" />
        </Link>
      </div>
        <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-stone-950">
          {item.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-stone-600">{item.summary}</p>

        <div className="mt-6 space-y-4 border-t border-stone-200 pt-5 text-sm leading-7 text-stone-600">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Current milestone
            </p>
            <p className="mt-2">{item.currentMilestone}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Technical challenge
            </p>
            <p className="mt-2">{item.technicalChallenge}</p>
          </div>
        </div>
      </Surface>
    </motion.article>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-300/70 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-stone-950">Dhyey Patel</p>
          <p className="mt-2">
            Creative software engineer building useful systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/experience" className="transition hover:text-stone-950">
            Experience
          </Link>
          <Link href="/projects" className="transition hover:text-stone-950">
            Projects
          </Link>
          <Link href="/lab" className="transition hover:text-stone-950">
            Lab
          </Link>
          <Link href="mailto:dpatel48@emich.edu" className="transition hover:text-stone-950">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".char");
      const introItems = gsap.utils.toArray<HTMLElement>(".intro-item");

      gsap.set(chars, {
        x: () => gsap.utils.random(-420, 420),
        y: () => gsap.utils.random(-260, 260),
        rotate: () => gsap.utils.random(-60, 60),
        opacity: 0,
        scale: () => gsap.utils.random(0.6, 1.35),
      });

      gsap.set(introItems, {
        y: 20,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      timeline
        .to(chars, {
          x: 0,
          y: 0,
          rotate: 0,
          opacity: 1,
          scale: 1,
          duration: 1.35,
          stagger: {
            amount: 0.6,
            from: "random",
          },
        })
        .to(
          ".hero-line",
          {
            scaleX: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .to(
          introItems,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.35"
        );
    },
    { scope: heroRef }
  );

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="isolate min-h-screen overflow-hidden bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav home />

      <JourneyGround />
      <StickFigureJourney />

      <section
        id="start"
        ref={heroRef}
        className="relative flex min-h-[82svh] items-center justify-center px-6 pb-8 pt-24 md:min-h-[86svh] md:pb-10"
      >
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="intro-item mb-8 font-mono text-xs uppercase tracking-[0.45em] text-stone-500">
            Dhyey Patel
          </p>

          <h1
            className="break-keep text-[clamp(3.2rem,10.5vw,9rem)] font-medium leading-[0.86] tracking-[-0.085em] text-stone-950"
            aria-label="Creative software engineer building useful systems."
          >
            <span className="block">
              <ExplodingWord text="Creative" />
            </span>
            <span className="block">
              <ExplodingWord text="software" />
            </span>
            <span className="block">
              <ExplodingWord text="engineer" />
            </span>
            <span className="block">
              <ExplodingWord text="building" />{" "}
              <ExplodingWord text="useful" />
            </span>
            <span className="block">
              <ExplodingWord text="systems." />
            </span>
          </h1>

          <div className="hero-line mx-auto mt-10 h-px w-72 origin-center scale-x-0 bg-stone-300" />

          <div className="intro-item mx-auto mt-8 max-w-3xl text-stone-600">
            <p className="text-base leading-8 sm:hidden">
              M.S. Computer Science student building full-stack tools, data-rich interfaces, and practical ML systems.
            </p>

            <p className="hidden text-base leading-8 sm:block sm:text-lg">
              M.S. Computer Science student building full-stack tools, data-rich interfaces, and practical ML systems — with real experience across university web platforms, internal tools, dashboards, and shipped product-style projects.
            </p>
          </div>

          <div className="intro-item mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PillLink href="/projects">
              View projects
              <ArrowRight className="h-4 w-4" />
            </PillLink>
            <PillLink href="/experience">
              View experience
              <ArrowRight className="h-4 w-4" />
            </PillLink>
            <PillLink href="/resume.pdf" external>
              Resume
              <FileText className="h-4 w-4" />
            </PillLink>
          </div>

          <div className="intro-item mt-10 flex items-center justify-center gap-3 text-sm text-stone-500">
            <span>Follow the path through experience, projects, and lab work</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </section>

      <section id="paths" className="relative px-6 pb-6 pt-4 md:pb-8 md:pt-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <QuickPathCard
            label="01 / Experience"
            title="Real systems"
            body="EMU web tools and Givaudan internal platforms with measurable workflow and performance improvements."
            href="/experience"
          />
          <QuickPathCard
            label="02 / Projects"
            title="Shipped work"
            body="Polished projects across visualization, product engineering, algorithms, and ML systems."
            href="/projects"
          />
          <QuickPathCard
            label="03 / Lab"
            title="Active builds"
            body="Current experiments in developer tools, protocol safety, and calm productivity software."
            href="/lab"
          />
        </div>
      </section>

      <section id="experience" className="relative px-6 pb-6 pt-8 md:pb-8 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Experience"
            title="Where I worked on real systems."
            body="Professional work belongs here: current university web tools, previous co-op work, production constraints, internal users, and measurable impact."
            action={
              <PillLink href="/experience">
                View experience
                <ArrowRight className="h-4 w-4" />
              </PillLink>
            }
          />

          <div className="grid gap-5">
            {experienceItems.map((item, index) => (
              <ExperienceCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative px-6 pb-6 pt-6 md:pb-8 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Projects"
            title="Shipped pieces of how I think."
            body="A focused snapshot of my range: public-sector workflow products, data visualization, interactive CS tools, and polished frontend engineering. The full project archive stays one click away."
            action={
              <PillLink href="/projects">
                View projects
                <ArrowRight className="h-4 w-4" />
              </PillLink>
            }
          />

          <div className="grid gap-5 md:grid-cols-3">
            {homepageProjects.map((item, index) => (
              <ProjectCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="lab" className="relative px-6 pb-6 pt-6 md:pb-8 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Lab"
            title="What I’m still building."
            body="The lab is not meant to compete with finished work. It shows momentum, curiosity, and the technical problems I am actively trying to shape."
            action={
              <PillLink href="/lab">
                View lab
                <ArrowRight className="h-4 w-4" />
              </PillLink>
            }
          />

          <div className="grid gap-5 md:grid-cols-3">
            {labItems.map((item, index) => (
              <LabCard key={item.slug} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative px-6 pb-16 pt-6 md:pb-20 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border border-stone-800 bg-stone-950 p-8 text-stone-50 shadow-xl sm:p-12 md:p-16"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-140px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-400">
              Contact
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
              <div>
                <h2 className="text-5xl font-medium tracking-[-0.06em] sm:text-7xl">
                  I’m looking for software engineering opportunities.
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                  I am still applying for late internship opportunities, but I am
                  also building toward new-grad software roles where I can work
                  on full-stack products, internal tools, data-heavy interfaces,
                  and practical ML systems.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:dpatel48@emich.edu"
                  className="flex items-center justify-between rounded-full border border-stone-700 px-5 py-4 text-sm transition hover:bg-stone-800"
                >
                  Email <Mail className="h-4 w-4" />
                </a>

                <a
                  href="https://github.com/Dhyey-Patel28"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-full border border-stone-700 px-5 py-4 text-sm transition hover:bg-stone-800"
                >
                  GitHub <GitHubIcon className="h-4 w-4" />
                </a>

                <a
                  href="https://linkedin.com/in/dhyey-patel-page"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-full border border-stone-700 px-5 py-4 text-sm transition hover:bg-stone-800"
                >
                  LinkedIn <LinkedInIcon className="h-4 w-4" />
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-full border border-stone-700 px-5 py-4 text-sm transition hover:bg-stone-800"
                >
                  Resume <FileText className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
