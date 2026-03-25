"use client";

import Image from "next/image";
import { siteConfig } from "@/config/profile";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type LiveProject = {
  title: string;
  company?: string;
  role?: string;
  period?: string;
  status?: string;
  description: string;
  highlight?: string;
  tech?: string[];
  liveUrl: string;
};

const screenshotManifest: Record<string, string> = {
  adik: "/project_screenshots/adik.png",
  clipar: "/project_screenshots/clipar.png",
  dunam: "/project_screenshots/dunam.png",
  excelschools: "/project_screenshots/excel-schools.png",
  nooaenergies: "/project_screenshots/nooaenergies.png",
  stoicpips: "/project_screenshots/stoicpips.png",
};

const screenshotAliases: Record<string, string> = {
  dunamai: "dunam",
  dunamvelocity: "dunam",
  excelinternationalschools: "excelschools",
  stoicpipslimited: "stoicpips",
  velocity: "dunam",
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getProjectScreenshot(project: LiveProject) {
  const candidates = [project.title, project.company];

  try {
    const hostname = new URL(project.liveUrl).hostname.replace(/^www\./, "");
    candidates.push(hostname, hostname.split(".")[0]);
  } catch {
    // Ignore malformed URLs and fall back to title/company matching.
  }

  for (const candidate of candidates) {
    if (!candidate) continue;

    const normalizedCandidate = normalizeKey(candidate);
    const alias = screenshotAliases[normalizedCandidate];
    const match =
      screenshotManifest[normalizedCandidate] ??
      (alias ? screenshotManifest[alias] : undefined) ??
      Object.entries(screenshotManifest).find(([key]) =>
        normalizedCandidate.includes(key) || key.includes(normalizedCandidate)
      )?.[1];

    if (match) return match;
  }

  return null;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 28,
    },
  },
};

export default function LiveProjects() {
  if (!siteConfig.projects || siteConfig.projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="section-padding container-max">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-3xl space-y-5"
      >
        <span className="section-kicker">Case Studies / Project Gallery</span>
        <h2 className="section-title">Case studies and projects gallery.</h2>
        <p className="section-copy">
          Recent product work presented as a tighter visual gallery with screenshot-first cards, adapted to the portfolio&apos;s own color system.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {siteConfig.projects.map((project: LiveProject) => {
          const screenshot = getProjectScreenshot(project);

          return (
            <motion.article key={project.title} variants={cardVariants} className="group">
                <div className="absolute inset-0 opacity-70">
                  <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-brand-400/12 blur-3xl" />
                  <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-brand-700/12 blur-3xl" />
                </div>

                <div className="relative rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                  <div className="mb-4 overflow-hidden rounded-[1rem] border border-white/10 bg-[#120f0c]">
                    <div className="relative aspect-[16/10]">
                      {screenshot ? (
                        <>
                          <Image
                            src={screenshot}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(max-width: 768px) 100vw, 520px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,5,0.08),rgba(9,7,5,0.3))]" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,168,102,0.18),transparent_28%),linear-gradient(160deg,rgba(23,17,13,1),rgba(40,28,20,0.92))]" />
                          <div className="absolute inset-0 opacity-25 hero-grid" />
                        </>
                      )}

                      <div className="absolute left-3 top-3 flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-100/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-300/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-brand-500/80" />
                      </div>

                      {project.status && (
                        <div className="absolute right-3 top-3 rounded-full border border-white/12 bg-black/28 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/82 backdrop-blur-sm">
                          {project.status}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="max-w-[16ch] text-[2rem] leading-[1] text-white md:text-[2.2rem]">
                        {project.title}
                      </h3>
                      {project.company && (
                        <p className="mt-2 text-sm font-semibold text-stone-300">
                          {project.company}
                        </p>
                      )}
                    </div>

                    <p className="text-[15px] leading-[1.7] text-stone-300">
                      {project.description}
                    </p>

                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold tracking-[0.03em] text-stone-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-200 transition-colors hover:text-brand-100"
                      >
                        Open Project
                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </div>
                </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
