"use client";

import Link from "next/link";
import { useEffect, useRef, useMemo, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  MotionConfig,
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
  PersonStanding,
} from "lucide-react";
import { experienceItems } from "@/lib/experience";
import { featuredProjects, moreProjects, type ProjectItem } from "@/lib/projects";
import { publications } from "@/lib/research";
import SiteNav from "@/components/site-nav";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const HOMEPAGE_PROJECT_SLUGS = [
  "job-fair-match",
  "atmosphere-atlas",
  "macon-banquet",
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

type JourneyMode = "off" | "still" | "animated";
type JourneyChoice = Exclude<JourneyMode, "off"> | null;

const JOURNEY_STORAGE_KEY = "journey-animation";

function readJourneyChoice(): JourneyChoice {
  try {
    const value = window.localStorage.getItem(JOURNEY_STORAGE_KEY);
    return value === "animated" || value === "still" ? value : null;
  } catch {
    return null;
  }
}

// A visitor's explicit toggle choice wins; without one, reduced-motion visitors
// get a figure that stands still on the path. Nothing renders until mounted.
function useJourney() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Read lazily so the stored choice is ready on the first client render.
  const [choice, setChoice] = useState<JourneyChoice>(() =>
    typeof window === "undefined" ? null : readJourneyChoice()
  );

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMounted(true);
      setReduceMotion(reduceQuery.matches);
    };

    update();
    reduceQuery.addEventListener("change", update);

    return () => reduceQuery.removeEventListener("change", update);
  }, []);

  const mode: JourneyMode = !mounted
    ? "off"
    : (choice ?? (reduceMotion ? "still" : "animated"));

  const toggle = () => {
    const next = mode === "animated" ? "still" : "animated";
    setChoice(next);
    try {
      window.localStorage.setItem(JOURNEY_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies now.
    }
  };

  return { mode, toggle };
}

function JourneyToggle({
  animated,
  onToggle,
}: {
  animated: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={animated}
      aria-label="Animate the stick figure"
      className="soft-pill soft-pill-sm gap-2 text-xs focus:outline-none focus:ring-2 focus:ring-stone-950/30"
    >
      <PersonStanding className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Stick figure</span>
      <span
        aria-hidden="true"
        className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] ${
          animated ? "bg-stone-950 text-[#fbf8f1]" : "bg-stone-200 text-stone-600"
        }`}
      >
        {animated ? "On" : "Off"}
      </span>
    </button>
  );
}

type Pose = {
  head: [number, number];
  body: string;
  leftArm: string;
  rightArm: string;
  leftLeg: string;
  rightLeg: string;
};

const STANDING_POSE: Pose = {
  head: [48, 18],
  body: "M 48 30 Q 48 44 48 60",
  leftArm: "M 48 32 Q 42 42 36 54",
  rightArm: "M 48 32 Q 54 42 60 54",
  leftLeg: "M 48 60 Q 42 78 39 98",
  rightLeg: "M 48 60 Q 54 78 57 98",
};

function FigureBody({ pose }: { pose: Pose }) {
  const limbs = [pose.body, pose.leftArm, pose.rightArm, pose.leftLeg, pose.rightLeg];

  return (
    <>
      <circle
        cx={pose.head[0]}
        cy={pose.head[1]}
        r="8"
        stroke="currentColor"
        strokeWidth="2.7"
      />
      {limbs.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke="currentColor"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </>
  );
}

function StickFigureStill() {
  return (
    <div
      className="pointer-events-none fixed bottom-4 left-[5vw] z-50 block origin-bottom-left scale-75 mix-blend-difference md:scale-100"
      aria-hidden="true"
    >
      <svg
        width="128"
        height="128"
        viewBox="0 0 96 110"
        fill="none"
        className="overflow-visible text-white"
      >
        <ellipse cx="48" cy="102" rx="18" ry="4" fill="currentColor" opacity="0.22" />
        <FigureBody pose={STANDING_POSE} />
      </svg>
    </div>
  );
}

function StickFigureJourney() {
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

  const idleFrames: Pose[] = useMemo(
    () => [
      STANDING_POSE,
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

        <FigureBody pose={pose} />
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
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-stone-500">
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
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-stone-500">
        {label}
      </p>
      <h2 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-stone-950">
        {title}
      </h2>
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
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
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
            <p className="rounded-full border border-stone-300 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
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
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
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
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
              {item.status}
            </p>
            <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-stone-950">
              {item.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-stone-500">{item.context}</p>
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
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
            Highlights
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

function ResearchCard({
  item,
  index,
}: {
  item: (typeof publications)[number];
  index: number;
}) {
  const paperLink = item.links?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
    >
      <Surface className="flex h-full flex-col">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-stone-500">
          {item.status}
        </p>
        <h3 className="mt-5 text-2xl font-medium tracking-[-0.04em] text-stone-950">
          {item.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-stone-500">{item.role}</p>
        <p className="mt-4 text-sm leading-7 text-stone-600">{item.summary}</p>

        <div className="mt-auto flex flex-wrap gap-3 border-t border-stone-200 pt-5">
          <Link
            href={`/research#${item.slug}`}
            aria-label={`Research details for ${item.title}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {paperLink && (
            <a
              href={paperLink.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
            >
              {paperLink.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
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
            Software engineer building production web tools.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/experience" className="transition hover:text-stone-950">
            Experience
          </Link>
          <Link href="/projects" className="transition hover:text-stone-950">
            Projects
          </Link>
          <Link href="/research" className="transition hover:text-stone-950">
            Research
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
  const journey = useJourney();

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>(".char");
      const introItems = gsap.utils.toArray<HTMLElement>(".intro-item");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".hero-line", { scaleX: 1 });
        return;
      }

      // Calmer scatter than before, and much calmer on phones.
      const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
      const spreadX = isSmallScreen ? 60 : 260;
      const spreadY = isSmallScreen ? 40 : 160;
      const spin = isSmallScreen ? 12 : 35;

      gsap.set(chars, {
        x: () => gsap.utils.random(-spreadX, spreadX),
        y: () => gsap.utils.random(-spreadY, spreadY),
        rotate: () => gsap.utils.random(-spin, spin),
        opacity: 0,
        scale: () => gsap.utils.random(0.8, 1.15),
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
          duration: isSmallScreen ? 0.8 : 1.1,
          stagger: {
            amount: isSmallScreen ? 0.3 : 0.5,
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
    <MotionConfig reducedMotion="user">
    <main
      id="main-content"
      tabIndex={-1}
      className="isolate min-h-screen overflow-hidden bg-[#f7f3ec] text-stone-950"
    >
      <SiteNav home />

      {journey.mode !== "off" && <JourneyGround />}
      {journey.mode === "animated" && (
        // An explicit opt-in should animate even when the OS prefers reduced motion.
        <MotionConfig reducedMotion="never">
          <StickFigureJourney />
        </MotionConfig>
      )}
      {journey.mode === "still" && <StickFigureStill />}

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
            aria-label="Software engineer building production web tools."
          >
            <span aria-hidden="true">
              <span className="block">
                <ExplodingWord text="Software" />
              </span>
              <span className="block">
                <ExplodingWord text="engineer" />
              </span>
              <span className="block">
                <ExplodingWord text="building" />
              </span>
              <span className="block">
                <ExplodingWord text="production" />
              </span>
              <span className="block">
                <ExplodingWord text="web" />{" "}
                <ExplodingWord text="tools." />
              </span>
            </span>
          </h1>

          <div className="hero-line mx-auto mt-10 h-px w-72 origin-center scale-x-0 bg-stone-300" />

          <div className="intro-item mx-auto mt-8 max-w-3xl text-stone-600">
            <p className="text-base leading-8 sm:hidden">
              Web Developer at Eastern Michigan University with two accepted IEEE papers. Seeking full-time software engineering roles after Spring 2027.
            </p>

            <p className="hidden text-base leading-8 sm:block sm:text-lg">
              I build production web applications at Eastern Michigan University, previously built internal tools at Givaudan, and have two accepted IEEE papers in applied machine learning. M.S. Computer Science, graduating Spring 2027 and seeking full-time software engineering roles.
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
            <span>Experience, projects, and research below</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>

          {journey.mode !== "off" && (
            <div className="mt-4 flex justify-center">
              <JourneyToggle
                animated={journey.mode === "animated"}
                onToggle={journey.toggle}
              />
            </div>
          )}
        </div>
      </section>

      <section id="paths" className="relative px-6 pb-6 pt-4 md:pb-8 md:pt-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <QuickPathCard
            label="01 / Experience"
            title="Real systems"
            body="Production web applications at EMU and internal tools at Givaudan, with measurable workflow and performance improvements."
            href="/experience"
          />
          <QuickPathCard
            label="02 / Projects"
            title="Shipped work"
            body="Deployed full-stack and frontend projects, plus the full archive of prototypes and course work."
            href="/projects"
          />
          <QuickPathCard
            label="03 / Research"
            title="Accepted papers"
            body="IEEE MLSP 2026 and IEEE ICTAI 2026 papers on bioacoustics and prompt-injection detection."
            href="/research"
          />
        </div>
      </section>

      <section id="experience" className="relative px-6 pb-6 pt-8 md:pb-8 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Experience"
            title="Production work, real users."
            body="Current web development at Eastern Michigan University and two co-op terms at Givaudan: API integrations, data workflows, reusable components, and measurable impact."
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
            title="Deployed projects."
            body="Three projects you can open and use today. The full archive covers hackathon, class, and in-progress work, each labelled with its status and my role."
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

      <section id="research" className="relative px-6 pb-6 pt-6 md:pb-8 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Research"
            title="Accepted IEEE research."
            body="Graduate research in applied machine learning and AI security. The Research page also covers audio and medical-imaging work."
            action={
              <PillLink href="/research">
                View research
                <ArrowRight className="h-4 w-4" />
              </PillLink>
            }
          />

          <div className="grid gap-5 md:grid-cols-2">
            {publications.map((item, index) => (
              <ResearchCard key={item.slug} item={item} index={index} />
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
                  Looking for full-time software engineering roles.
                </h2>

                <p className="mt-8 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                  I finish my M.S. in Computer Science in Spring 2027 and am
                  looking for Software Engineer, Software Developer, and
                  Full-Stack roles across the United States, working on product
                  engineering, internal tools, data-heavy applications, and
                  applied ML.
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
                  href="https://www.linkedin.com/in/dhyey-patel-page/"
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
    </MotionConfig>
  );
}
