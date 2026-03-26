"use client";

import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/useHasMounted";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  readmeDescription?: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

export default function GithubProjects({
  repos,
  github,
}: {
  repos: Repo[];
  github: string;
}) {
  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const ink      = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted = isDark ? "#8a7a64" : "#7a6a58";
  const gold     = isDark ? "#c8923a" : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.14)" : "rgba(168,114,30,0.16)";

  // GitHub button
  const btnBg     = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.72)";
  const btnBorder = isDark ? "rgba(200,146,58,0.18)"  : "rgba(168,114,30,0.22)";
  const btnShadow = isDark
    ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 12px rgba(0,0,0,0.18)"
    : "inset 0 1px 0 rgba(255,255,255,0.9),  0 2px 10px rgba(0,0,0,0.06)";

  return (
    <section id="github-projects" className="section-padding px-6 max-w-7xl mx-auto">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
      >
        <div className="space-y-4">
          {/* Kicker */}
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: gold }} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: gold }}
            >
              Open Source · GitHub
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-4xl leading-tight tracking-[-0.04em] md:text-5xl"
            style={{
              color:      ink,
              fontFamily: "'DM Serif Display', Georgia, serif",
            }}
          >
            Live Projects
          </h2>

          {/* Subtext */}
          <p
            className="max-w-[42ch] text-base leading-[1.8]"
            style={{ color: inkMuted }}
          >
            A curated selection of my latest open-source contributions and systems.
          </p>
        </div>

        {/* GitHub CTA */}
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all"
          style={{
            background: btnBg,
            border:     `1px solid ${btnBorder}`,
            boxShadow:  btnShadow,
            color:      gold,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = gold;
            (e.currentTarget as HTMLAnchorElement).style.background  = isDark
              ? "rgba(200,146,58,0.10)"
              : "rgba(168,114,30,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = btnBorder;
            (e.currentTarget as HTMLAnchorElement).style.background  = btnBg;
          }}
        >
          <FaGithub
            size={14}
            className="transition-transform group-hover:rotate-12"
          />
          view_all_repos()
        </motion.a>
      </motion.div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="mb-12 h-px w-full" style={{ background: ruleLine }} />

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {repos.map((repo, i) => (
          <motion.div
            key={repo.id}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 340, damping: 28 },
              },
            }}
          >
            <ProjectCard repo={repo} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}