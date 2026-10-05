# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio for Ain Mutaqorrobin: a multi-page Next.js 16 (App Router) site, dark-only, styled with Tailwind CSS v4, deployed as a standalone Docker image to a VPS.

## Commands

```bash
npm run dev          # next dev --webpack (the --webpack flag is deliberate; keep it)
npm run build        # next build --webpack, also regenerates typed routes (PageProps<'/work/[slug]'>)
npm start            # serve the production build
npm test             # node:test on tests/projects.test.mjs (validates the content JSON)
npx tsc --noEmit     # type-check
npm run fmt          # prettier --write .   (fmt:check to verify)
```

Run a single test by name:

```bash
node --test --test-name-pattern="resume download" tests/projects.test.mjs
```

`npx tsc --noEmit` can report stale route-type errors for `/work/[slug]` until `npm run build` has regenerated `.next/types`.

A pre-commit hook (`.githooks/pre-commit`, installed by `npm install` via the `prepare` script) runs Prettier on staged files only. Prettier: 4-space indent, no semicolons, single quotes, ES5 trailing commas.

`next-env.d.ts` and `tsconfig.tsbuildinfo` are tracked and get rewritten by builds; that diff is noise.

## Architecture

### Content is data, pages are views

All copy lives in `src/data/profile.json` (bio, work history, education, certifications, skills, contact, résumé path) and `src/data/projects.json` (projects and their case studies). `src/lib/content.ts` imports both and **casts** them to TypeScript types without runtime validation, so `tests/projects.test.mjs` is the real schema guard: it reads the JSON directly (plain `.mjs`, it cannot import the TS) and checks things the type system can't, such as case-study diagram integrity, that image and résumé files exist in `public/`, and certification URLs. When you change the data shape, update the type in `content.ts`, the page that renders it, and the test together.

Routes: `/`, `/work`, `/work/[slug]`, `/experience`, `/about`, `/contact`, plus `not-found.tsx`. `/work/[slug]` is statically generated from every project with a `caseStudy` (`dynamicParams = false`), and the test suite requires every project to have one.

### Page transitions

Route changes animate with React's `<ViewTransition>`, enabled by `experimental.viewTransition` in `next.config.ts`. The types come from `react/canary` via `src/types/react-canary.d.ts`. The chain:

1. Internal links must use `NavLink` (`src/components/site/nav-link.tsx`), not `next/link` directly. It tags each navigation as `nav-forward` or `nav-back` using `navDirection()` in `src/lib/navigation.ts`, based on nav order and URL depth.
2. Every page wraps its content in `PageTransition`, which maps those types to `page-forward` / `page-back` / `page-fade` view-transition classes.
3. The keyframes live in `src/app/globals.css`. Project screenshots also morph between the work list and the detail page through a shared `ViewTransition` name in `project-shot.tsx`.

Elements inside a page cascade in with the `.reveal` class plus a `--i` index (see `reveal()` in `src/components/ui.tsx`).

`globals.css` has a `prefers-reduced-motion` block at the bottom; **any new animated class must be added there**. Rules scoped under `[data-diagram]` win on specificity, which is why that block uses `!important` for the diagram classes.

### Header and mobile menu

`SiteHeader` is a client component. The inline nav shows from the `lg` breakpoint; below it a `MenuButton` opens `MobileMenu`. Two non-obvious constraints:

- The menu's open state stores the pathname it was opened on (`menuOpenOn === pathname`), so any navigation, including the browser back button, closes it without an effect.
- `MobileMenu` is rendered as a **sibling** of `<header>`, not inside it: the header's `backdrop-filter` would otherwise become the containing block for the menu's `position: fixed` panel.

`.type-path` (the typed breadcrumb) is plain CSS in `globals.css`, and unlayered CSS beats Tailwind utilities, so responsive overrides for it must also be written in that CSS (e.g. the `width < 40rem` rule that hides it on phones), not as Tailwind classes on the element.

### Architecture diagrams (`src/components/work/architecture-diagram.tsx`)

Each case study's `diagram` in `projects.json` is laid out on a `cols × rows` grid. Node `col` may be fractional (`1.5` centres a box between columns). The component renders SVG with boxes as `foreignObject` HTML:

- `kind: "external"` draws a dashed box, `kind: "store"` draws a database cylinder, and `highlight` draws an amber border.
- Edges are routed automatically: vertical curves between rows, a straight line between same-row boxes when the gap is wide enough (`STRAIGHT_MIN_GAP`), otherwise an over/under loop. `async: true` edges are amber animated dashes, and `both: true` adds a second arrowhead.
- `zones` draw labelled dashed boundaries (a host, a cluster, a subnet), and `inset` nests one zone inside another.

Labels have no collision detection; positions in the data are tuned by hand so labels don't overlap. Check a diagram visually after editing it. The test enforces that no two nodes share a grid cell and that every edge references an existing node id. `DiagramReveal` holds the diagram hidden until it scrolls into view (IntersectionObserver) and renders it fully drawn when JS is unavailable.

### Icons

- `contact-icon.tsx` inlines a handful of SVG paths (copied from Simple Icons, CC0, plus a hand-drawn envelope and document).
- `stack-icon.tsx` maps **exact skill labels from `profile.json`** to `simple-icons` exports. Renaming a skill silently turns its icon into the neutral fallback dot until the map is updated. Some brands (AWS, OpenAI, Microsoft) were removed from Simple Icons at their owners' request; they intentionally use the fallback rather than hand-copied logos.

### Theme

Colour tokens (`ink`, `fg`, `body`, `dim`, `faint`, `line`, `accent`, `ok`, `err`, …) and fonts (Martian Mono, Geist via `next/font`) are defined in the `@theme` block of `globals.css`. There is no `tailwind.config`. The site is dark-only, with no theme toggle.

## Content conventions

- Visible copy uses plain language. The look is terminal-inspired, but recruiters read it, so don't put shell jargon (`cd`, `cat`, `$ whoami`, version numbers for jobs) in labels or headings. Real commands shown as commands (e.g. `bun create bunship` in a code block) are fine.
- Prose avoids em dashes and semicolons; prefer full stops, commas or "and".

## Assets

- `public/og-image.png` (1200×630) is the Open Graph / Twitter card image referenced in `src/app/layout.tsx`. It's a static file, so regenerate it by hand if the name, role or tagline change.
- `public/resume/Ain-Mutaqorrobin-Resume.pdf` is the downloadable résumé (`profile.json → resume.pdf`). The editable `.docx` source is kept at the repo root and gitignored (`/*.docx`) because it contains personal contact details.
- `public/work/*.png` are real screenshots of the live apps, referenced by a project's `image`.

## Deployment

`next.config.ts` sets `output: 'standalone'`; the multi-stage `Dockerfile` copies `.next/standalone`, `.next/static` and `public`. On every push to `main`, `.github/workflows/ci-cd.yml` runs `npm test`, `npm run build`, pushes the image to Docker Hub, then SSHes to the VPS and runs `docker compose pull && up -d` with `compose.yml` (image name and port come from the server's `.env`; see `.env.example`). The README has the full VPS and secrets setup.
