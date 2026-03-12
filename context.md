# Portfolio Codebase Context

## Overview

This repository is a personal portfolio site built with Next.js App Router, React 19, TypeScript, and Tailwind CSS v4. The site is a single-page experience that renders a sequence of portfolio sections from structured content in `config/profile.ts`, plus live GitHub repository data fetched on the server.

The current visual direction is premium/editorial: warm brand tones, glass panels, serif display typography, Framer Motion transitions, and optional light/dark theme support via `next-themes`.

## Stack

- Framework: Next.js `16.1.4`
- UI: React `19.2.3`
- Language: TypeScript
- Styling: Tailwind CSS v4 with theme tokens defined in `app/globals.css`
- Animation: Framer Motion
- Icons: `lucide-react`, `react-icons`
- Theme handling: `next-themes`
- Email: `nodemailer` through a server action
- 3D/experimental modules present: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`

## App Structure

- `app/layout.tsx`
  - Defines metadata.
  - Wraps the app in `ThemeProvider`.
  - Mounts the global `Navbar` and `sonner` toaster.

- `app/page.tsx`
  - Main page entry.
  - Fetches GitHub repos with `getGithubRepos()`.
  - Filters them using `siteConfig.featuredRepos`.
  - Enriches each selected repo with a README-derived summary from `getRepoDescription()`.
  - Renders the portfolio sections in order:
    - `Hero`
    - `About`
    - `Experience`
    - `Skills`
    - `LiveProjects`
    - `GithubRepos`
    - `Credentials`
    - `ContactForm`

## Primary Content Source

- `config/profile.ts`
  - Central content/config file for the site.
  - Stores:
    - personal identity and links
    - hero copy and metrics
    - about copy
    - grouped skills
    - featured GitHub repo names
    - live projects
    - work experience
    - education
    - certifications

Most content edits should start here before touching components.

## Key Components

- `app/components/Hero.tsx`
  - Large animated landing section.
  - Reads from `siteConfig.hero` and `siteConfig.projects`.
  - Contains animated counters and a shipping ticker.

- `app/components/Navbar.tsx`
  - Fixed nav with section highlighting via `IntersectionObserver`.
  - Includes `ModeToggle`.
  - Links to in-page anchors such as `#about`, `#projects`, `#contact`.

- `app/components/About.tsx`
- `app/components/Experience.tsx`
- `app/components/Skills.tsx`
- `app/components/Credentials.tsx`
  - Section renderers for structured profile data.

- `app/components/LiveProjects.tsx`
  - Renders cards from `siteConfig.projects`.
  - Tries to map each project to a screenshot in `public/project_screenshots/`.
  - Screenshot matching uses normalized title/company/url aliases.

- `app/components/GithubRepos.tsx`
  - Displays filtered GitHub repositories.
  - Uses `ProjectCard` for each repo.
  - Returns `null` if no repos are available.

- `app/components/ContactForm.tsx`
  - Client component.
  - Submits to the `sendEmail` server action.
  - Uses `sonner` for success/error feedback.

## Data Flow

### Static profile data

1. Content lives in `config/profile.ts`.
2. Section components import `siteConfig`.
3. UI renders directly from that config.

### GitHub data

1. `app/page.tsx` calls `lib/github.ts`.
2. `getGithubRepos()` fetches public repos for `anguzuDaniel`.
3. Repos are filtered against `siteConfig.featuredRepos`.
4. `getRepoDescription()` fetches each repo README and extracts a short plain-text summary.
5. The processed list is passed to `GithubRepos`.

### Contact form

1. User submits `ContactForm`.
2. Form posts to `app/actions/sendEmail.ts`.
3. `nodemailer` sends the message to `EMAIL_USER`.
4. UI shows a toast based on the returned result.

## External Integrations

### GitHub API

- File: `lib/github.ts`
- Uses `fetch()` with `next: { revalidate: 3600 }`
- Timeout: 5 seconds
- Failure behavior: returns empty data or `null` rather than throwing

This means the page is resilient if GitHub is slow or unavailable, but the GitHub section may silently disappear.

### Email

- File: `app/actions/sendEmail.ts`
- Uses Gmail transport via `nodemailer`

Expected environment variables:

- `EMAIL_USER`
- `EMAIL_PASS`

Without those values, contact form submissions will fail at runtime.

## Styling System

- Global styles live in `app/globals.css`.
- Tailwind v4 theme tokens are declared with `@theme inline`.
- Brand palette is a gold/brown range under `--color-brand-*`.
- Reusable utility classes include:
  - `.premium-card`
  - `.glass`
  - `.section-padding`
  - `.container-max`
  - `.section-kicker`
  - `.section-title`
  - `.section-copy`
  - `.label-chip`
  - `.field-input` (used by form inputs farther down the stylesheet)

The site defaults to dark theme in `ThemeProvider`, with system theme enabled.

## Assets

- Main public assets live under `public/`
- Resume file:
  - `public/anguzu-daniel-resume.pdf`
- Project screenshots:
  - `public/project_screenshots/`
- Profile images:
  - `public/profile.jpg`
  - `public/profile.jfif`

## Secondary / Currently Unused Modules

These files exist but are not currently mounted from `app/page.tsx`:

- `components/canvas/Scene.tsx`
- `components/canvas/FloatingParticles.tsx`
- `components/canvas/WaveMaterial.ts`
- `app/components/GithubProjects.tsx`
- `app/constants/projects.ts`

They appear to be either older experiments or optional/alternate UI paths.

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Start production build: `npm run start`
- Lint: `npm run lint`

## Working Notes For Future Edits

- Prefer changing `config/profile.ts` for content updates.
- Edit `app/page.tsx` only if section order or server-side data loading changes.
- Edit `lib/github.ts` for GitHub fetching behavior, caching, or repo selection logic.
- Edit `app/actions/sendEmail.ts` and `app/components/ContactForm.tsx` together for contact-flow changes.
- Edit `app/globals.css` for brand tokens, shared utility classes, and theme-level styling.
- Be aware that some files already have local user edits in progress; avoid reverting unrelated changes.

## Known Risks / Observations

- GitHub fetching is unauthenticated, so rate limits may affect repo display.
- `ContactForm` marks `subject` as required in the UI, but the server action still treats it as optional.
- The repo contains generated/build artifacts such as `.next/` and many user-local files outside the project root; keep work scoped to the portfolio directory.
