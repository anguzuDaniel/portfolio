"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/useHasMounted";

type Repo = {
  name: string;
  description: string | null;
  readmeDescription?: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

export default function ProjectCard({ repo }: { repo: Repo }) {
  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens (matches Hero / Navbar / LiveProjects) ─────────────────
  const ink      = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted = isDark ? "#8a7a64" : "#7a6a58";
  const inkFaint = isDark ? "#5a4e3c" : "#b0a090";
  const gold     = isDark ? "#c8923a" : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.14)" : "rgba(168,114,30,0.16)";

  // Card surface
  const cardBg     = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.72)";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(168,114,30,0.14)";
  const cardShadow = isDark
    ? "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.20)"
    : "inset 0 1px 0 rgba(255,255,255,0.9),  0 4px 20px rgba(0,0,0,0.06)";

  // Icon container
  const iconBg     = isDark ? "rgba(200,146,58,0.08)"  : "rgba(168,114,30,0.07)";
  const iconBorder = isDark ? "rgba(200,146,58,0.18)"  : "rgba(168,114,30,0.22)";
  const iconColor  = isDark ? "#c8923a"                : "#a8721e";

  // Chip (stars / forks / language)
  const chipBg     = isDark ? "rgba(255,255,255,0.05)" : "rgba(168,114,30,0.07)";
  const chipBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(168,114,30,0.18)";
  const chipText   = isDark ? "#a89070"                : "#7a5a2e";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group relative flex h-full flex-col rounded-[1.35rem] p-6 backdrop-blur-sm transition-shadow duration-300"
      style={{
        background: cardBg,
        border:     `1px solid ${cardBorder}`,
        boxShadow:  cardShadow,
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem] opacity-50">
        <div
          className="absolute -right-6 -top-4 h-28 w-28 rounded-full blur-3xl"
          style={{ background: isDark ? "rgba(200,146,58,0.09)" : "rgba(218,176,90,0.14)" }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">

        {/* ── Header row ──────────────────────────────────────────────────── */}
        <div className="mb-6 flex items-start justify-between">
          {/* GitHub icon */}
          <div
            className="flex h-11 w-11 items-center justify-center rounded-[0.9rem] transition-all duration-300 group-hover:scale-105"
            style={{
              background: iconBg,
              border:     `1px solid ${iconBorder}`,
              color:      iconColor,
            }}
          >
            <Github size={19} />
          </div>

          {/* Stars + forks */}
          <div className="flex gap-1.5">
            {repo.stargazers_count > 0 && (
              <div
                className="flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.1em]"
                style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: chipText }}
              >
                <Star size={10} className="fill-amber-500 text-amber-500" />
                {repo.stargazers_count}
              </div>
            )}
            {repo.forks_count > 0 && (
              <div
                className="flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.1em]"
                style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: chipText }}
              >
                <GitFork size={10} />
                {repo.forks_count}
              </div>
            )}
          </div>
        </div>

        {/* ── Kicker ──────────────────────────────────────────────────────── */}
        <div
          className="mb-3 font-mono text-[9px] uppercase tracking-[0.26em]"
          style={{ color: gold, opacity: 0.75 }}
        >
          Repository
        </div>

        {/* ── Name ────────────────────────────────────────────────────────── */}
        <h3
          className="mb-3 text-2xl leading-snug tracking-[-0.03em] transition-colors"
          style={{
            color:      ink,
            fontFamily: "'DM Serif Display', Georgia, serif",
          }}
        >
          {repo.name.replace(/-/g, " ")}
        </h3>

        {/* ── Description ─────────────────────────────────────────────────── */}
        <p
          className="mb-8 flex-grow text-[15px] leading-[1.8]"
          style={{ color: inkMuted }}
        >
          {repo.readmeDescription ||
            repo.description ||
            "Sophisticated technical implementation featuring modular architecture and modern patterns."}
        </p>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: `1px solid ${ruleLine}` }}
        >
          {/* Language */}
          <div>
            {repo.language && (
              <span
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: inkFaint }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: gold }}
                />
                {repo.language}
              </span>
            )}
          </div>

          {/* CTA */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: gold, fontFamily: "'Instrument Sans', sans-serif" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = isDark ? "#e8b86a" : "#7a5018";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = gold;
            }}
          >
            View Project
            <ExternalLink
              size={13}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}