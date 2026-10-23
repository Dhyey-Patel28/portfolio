import type { Metadata } from "next";

export const SITE_URL = "https://dhyey-patel.vercel.app";
export const SITE_NAME = "Dhyey Patel";
export const socialImageAlt = "Dhyey Patel, software engineer building production web tools.";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

// Each page sets its own canonical and social URL; otherwise every page inherits
// the homepage's Open Graph URL and title from the root layout. A child openGraph
// object also drops the root preview image, so it is listed again here.
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
}: {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
}): Metadata {
  const fullTitle = socialTitle ?? `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: socialImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: "/twitter-image", width: 1200, height: 630, alt: socialImageAlt }],
    },
  };
}

// Contact details (email, phone) are deliberately left out of structured data.
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Dhyey Patel",
  url: SITE_URL,
  // No image: the social card is a text graphic, not a portrait.
  // Current official title; software engineering is the broader focus and target role.
  jobTitle: "Web Developer",
  description:
    "Web Developer at Eastern Michigan University focused on software engineering, with prior internships at Givaudan and accepted IEEE research in applied machine learning.",
  worksFor: {
    "@type": "CollegeOrUniversity",
    name: "Eastern Michigan University",
    url: "https://www.emich.edu",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Web Developer",
    occupationLocation: { "@type": "City", name: "Ypsilanti, Michigan" },
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Cincinnati",
    url: "https://www.uc.edu",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Eastern Michigan University",
    url: "https://www.emich.edu",
  },
  knowsAbout: [
    "Software Engineering",
    "Full-Stack Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Python",
    "Machine Learning",
    "Bioacoustics",
    "Prompt Injection Detection",
  ],
  sameAs: [
    "https://github.com/Dhyey-Patel28",
    "https://www.linkedin.com/in/dhyey-patel-page/",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: "Dhyey Patel — Software Engineer",
  description:
    "Portfolio of Dhyey Patel: software engineering experience, projects, research, and resume.",
  inLanguage: "en-US",
  publisher: { "@id": PERSON_ID },
  author: { "@id": PERSON_ID },
};

export const personRef = { "@id": PERSON_ID };
export const websiteRef = { "@id": WEBSITE_ID };

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  type = "WebPage",
  name,
  description,
  path,
  extra = {},
}: {
  type?: string;
  name: string;
  description: string;
  path: string;
  extra?: Record<string, unknown>;
}) {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-US",
    isPartOf: websiteRef,
    ...extra,
  };
}

// Stack entries that are programming languages; frameworks and tools stay in keywords.
const PROGRAMMING_LANGUAGES = new Set(["TypeScript", "JavaScript", "Python", "PHP", "Solidity", "Dart"]);

// Contributor rather than author: several projects were team efforts.
export function projectSchema(item: {
  title: string;
  summary: string;
  stack: string[];
  links?: { label: string; href: string }[];
}) {
  const repo = item.links?.find((link) => link.href.startsWith("https://github.com/"));
  const demo = item.links?.find((link) => link.label === "Live demo");
  const languages = item.stack.filter((entry) => PROGRAMMING_LANGUAGES.has(entry));
  return {
    "@type": repo ? "SoftwareSourceCode" : "CreativeWork",
    name: item.title,
    description: item.summary,
    contributor: personRef,
    keywords: item.stack.join(", "),
    ...(repo ? { codeRepository: repo.href } : {}),
    ...(repo && languages.length ? { programmingLanguage: languages } : {}),
    // The deployed demo is a realization of the work, not the same entity as the code.
    ...(demo ? { workExample: { "@type": "WebSite", name: `${item.title} demo`, url: demo.href } } : {}),
  };
}
