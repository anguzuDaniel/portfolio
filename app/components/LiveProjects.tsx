"use client";

import Image from "next/image";
import { siteConfig } from "@/config/profile";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/useHasMounted";

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
  adik:             "/project_screenshots/adik.png",
  clipar:           "/project_screenshots/clipar.png",
  dunam:            "/project_screenshots/dunam.png",
  excelschools:     "/project_screenshots/excel-schools.png",
  nooaenergies:     "/project_screenshots/nooaenergies.png",
  stoicpips:        "/project_screenshots/stoicpips.png",
};

const screenshotAliases: Record<string, string> = {
  dunamai:                 "dunam",
  dunamvelocity:           "dunam",
  excelinternationalschools: "excelschools",
  stoicpipslimited:        "stoicpips",
  velocity:                "dunam",
};

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getProjectScreenshot(project: LiveProject) {
  const candidates = [project.title, project.company];
  try {
    const hostname = new URL(project.liveUrl).hostname.replace(/^www\./, "");
    candidates.push(hostname, hostname.split(".")[0]);
  } catch { /* ignore */ }

  for (const candidate of candidates) {
    if (!candidate) continue;
    const key   = normalizeKey(candidate);
    const alias = screenshotAliases[key];
    const match =
      screenshotManifest[key] ??
      (alias ? screenshotManifest[alias] : undefined) ??
      Object.entries(screenshotManifest).find(
        ([k]) => key.includes(k) || k.includes(key)
      )?.[1];
    if (match) return match;
  }
  return null;
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 340, damping: 28 },
  },
};

export default function LiveProjects() {
  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const ink       = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted  = isDark ? "#8a7a64" : "#7a6a58";
  const inkFaint  = isDark ? "#5a4e3c" : "#c0afa0";
  const gold      = isDark ? "#c8923a" : "#a8721e";
  const ruleLine  = isDark ? "rgba(200,146,58,0.14)"  : "rgba(168,114,30,0.16)";

  // Card surface
  const cardBg     = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.72)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(168,114,30,0.14)";
  const cardShadow = isDark
    ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.22)"
    : "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)";

  // Image preview container
  const previewBg     = isDark ? "#0e0a06" : "#f0e8dc";
  const previewBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(168,114,30,0.14)";

  // Placeholder gradient (no screenshot)
  const placeholderGradient = isDark
    ? "radial-gradient(circle at top right, rgba(200,146,58,0.18), transparent 30%), linear-gradient(160deg, #1a1208, #2c1e12)"
    : "radial-gradient(circle at top right, rgba(218,176,90,0.24), transparent 30%), linear-gradient(160deg, #f0e8dc, #e0d0bc)";

  // Image vignette
  const vignetteGradient = isDark
    ? "linear-gradient(180deg, rgba(9,7,5,0.08), rgba(9,7,5,0.32))"
    : "linear-gradient(180deg, rgba(240,232,220,0.04), rgba(240,232,220,0.24))";

  // Tech chip
  const chipBg     = isDark ? "rgba(255,255,255,0.05)" : "rgba(168,114,30,0.07)";
  const chipBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(168,114,30,0.18)";
  const chipText   = isDark ? "#c8b99a"                : "#7a5a2e";

  // Status badge
  const badgeBg     = isDark ? "rgba(0,0,0,0.32)"           : "rgba(240,232,220,0.82)";
  const badgeBorder = isDark ? "rgba(255,255,255,0.10)"      : "rgba(168,114,30,0.20)";
  const badgeText   = isDark ? "rgba(255,255,255,0.80)"      : "#7a5a2e";

  if (!siteConfig.projects || siteConfig.projects.length === 0) return null;

  return (
    <section id="projects" className="section-padding container-max">

      {/* ── Section header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 max-w-3xl space-y-5"
      >
        {/* Kicker */}
        <div className="flex items-center gap-3">
          <span className="h-px w-6" style={{ background: gold }} />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: gold }}
          >
            Case Studies · Project Gallery
          </span>
        </div>

        <h2
          className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl"
          style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Case studies and projects gallery.
        </h2>

        <p className="text-base leading-[1.85]" style={{ color: inkMuted }}>
          Recent product work presented as a tighter visual gallery with screenshot-first
          cards, adapted to the portfolio&apos;s own color system.
        </p>
      </motion.div>

      {/* ── Card grid ───────────────────────────────────────────────────────── */}
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
            <motion.article
              key={project.title}
              variants={cardVariants}
              className="group relative"
            >
              {/* Ambient glow blobs */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem] opacity-60">
                <div
                  className="absolute -right-8 top-6 h-36 w-36 rounded-full blur-3xl"
                  style={{ background: isDark ? "rgba(200,146,58,0.10)" : "rgba(218,176,90,0.14)" }}
                />
                <div
                  className="absolute -left-8 bottom-0 h-36 w-36 rounded-full blur-3xl"
                  style={{ background: isDark ? "rgba(100,60,10,0.10)" : "rgba(180,140,80,0.10)" }}
                />
              </div>

              {/* Card surface */}
              <div
                className="relative rounded-[1.35rem] p-4 backdrop-blur-sm transition-shadow duration-300"
                style={{
                  background: cardBg,
                  border:     `1px solid ${cardBorder}`,
                  boxShadow:  cardShadow,
                }}
              >
                {/* ── Screenshot / preview ─────────────────────────────────── */}
                <div
                  className="mb-4 overflow-hidden rounded-[1rem]"
                  style={{
                    background: previewBg,
                    border:     `1px solid ${previewBorder}`,
                  }}
                >
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
                        <div className="absolute inset-0" style={{ background: vignetteGradient }} />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0" style={{ background: placeholderGradient }} />
                        {/* Dot grid texture */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(200,146,58,0.6)" : "rgba(168,114,30,0.5)"} 1px, transparent 1px)`,
                            backgroundSize: "20px 20px",
                          }}
                        />
                      </>
                    )}

                    {/* Browser chrome dots */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5">
                      {["rgba(237,224,200,0.6)", "rgba(200,146,58,0.7)", "rgba(168,114,30,0.7)"].map((c, i) => (
                        <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
                      ))}
                    </div>

                    {/* Status badge */}
                    {project.status && (
                      <div
                        className="absolute right-3 top-3 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm"
                        style={{
                          background: badgeBg,
                          border:     `1px solid ${badgeBorder}`,
                          color:      badgeText,
                        }}
                      >
                        {project.status}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Card body ────────────────────────────────────────────── */}
                <div className="space-y-4">
                  <div>
                    <h3
                      className="max-w-[18ch] text-[1.9rem] leading-[1.05] tracking-[-0.03em] md:text-[2.1rem]"
                      style={{
                        color:      ink,
                        fontFamily: "'DM Serif Display', Georgia, serif",
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.company && (
                      <p
                        className="mt-2 font-mono text-xs uppercase tracking-[0.14em]"
                        style={{ color: gold, opacity: 0.8 }}
                      >
                        {project.company}
                      </p>
                    )}
                  </div>

                  <p className="text-[15px] leading-[1.75]" style={{ color: inkMuted }}>
                    {project.description}
                  </p>

                  {/* Tech chips */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                          style={{
                            background: chipBg,
                            border:     `1px solid ${chipBorder}`,
                            color:      chipText,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: `1px solid ${ruleLine}` }}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      style={{ color: gold, fontFamily: "'Instrument Sans', sans-serif" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = isDark ? "#e8b86a" : "#7a5018";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = gold;
                      }}
                    >
                      Open Project
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>

                    {project.period && (
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.16em]"
                        style={{ color: inkFaint }}
                      >
                        {project.period}
                      </span>
                    )}
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