# Dhyey Patel Portfolio

A Next.js portfolio for software engineering roles, organized around professional experience, shipped projects, and active lab work.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- Lucide React

## Information architecture

```text
/
  Homepage overview and navigation

/about
  Personal background, education, credentials, and interests

/experience
  Professional experience index

/experience/[slug]
  Role detail pages for EMU and Givaudan

/projects
  Shipped and recruiter-safe project index

/projects/[slug]
  Project case-study pages

/lab
  Active builds and experiments

/lab/[slug]
  Notebook-style pages for in-progress ideas
```

## Project structure

```text
src/app
src/components
src/lib
public
```

Key content models:

```text
src/lib/experience.ts
src/lib/projects.ts
src/lib/lab.ts
```

Shared UI:

```text
src/components/visual-gallery.tsx
```

## Local development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Quality checks

```bash
npm run lint
npm run build
```

## Notes

- The homepage is intentionally an overview, not a full resume.
- Experience, Projects, and Lab are separate on purpose because they represent different kinds of proof.
- Visual proof images are only used where they strengthen the story; decorative screenshots are intentionally avoided.