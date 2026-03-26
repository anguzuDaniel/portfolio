"use client";

import { useHasMounted } from "@/lib/useHasMounted";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";
import { useTheme } from "next-themes";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  readmeDescription?: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

function formatStars(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
}

export default function GithubRepos({ repos }: { repos: Repo[] }) {
  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const ink      = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted = isDark ? "#8a7a64" : "#7a6a58";
  const inkFaint = isDark ? "#5a4e3c" : "#b0a090";
  const gold     = isDark ? "#c8923a" : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.14)" : "rgba(168,114,30,0.16)";

  // Card surface
  const cardBg = isDark
    ? "linear-gradient(180deg, rgba(28,20,13,0.96), rgba(18,12,8,0.99))"
    : "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(245,238,228,0.92))";
  const cardBorder = isDark ? "rgba(200,146,58,0.12)" : "rgba(168,114,30,0.16)";
  const cardShadow = isDark
    ? "0 12px 40px rgba(0,0,0,0.28)"
    : "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)";

  // Chip (stars / language)
  const chipBg     = isDark ? "rgba(255,255,255,0.05)" : "rgba(168,114,30,0.07)";
  const chipBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(168,114,30,0.18)";
  const chipText   = isDark ? "#a89070"                : "#7a5a2e";

  // CTA button
  const ctaBg     = isDark ? "rgba(200,146,58,0.09)"  : "rgba(168,114,30,0.07)";
  const ctaBorder = isDark ? "rgba(200,146,58,0.28)"  : "rgba(168,114,30,0.28)";
  const ctaHoverBg     = isDark ? "rgba(200,146,58,0.16)" : "rgba(168,114,30,0.14)";
  const ctaHoverBorder = isDark ? "rgba(200,146,58,0.48)" : "rgba(168,114,30,0.44)";

  if (repos.length === 0) return null;

  return (
    <section id="github-repos" className="section-padding container-max">

      {/* ── Section header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 max-w-3xl space-y-4"
      >
        {/* Kicker */}
        <div className="flex items-center gap-3">
          <span className="h-px w-6" style={{ background: gold }} />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: gold }}
          >
            Featured Repositories
          </span>
        </div>
      </motion.div>

      {/* ── Grid ────────────────────────────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo, index) => (
          <motion.article
            key={repo.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <div
              className="relative h-full overflow-hidden rounded-[1.15rem] px-5 py-4 transition-shadow duration-300"
              style={{
                background: cardBg,
                border:     `1px solid ${cardBorder}`,
                boxShadow:  cardShadow,
              }}
            >
              {/* Ambient blobs */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
                <div
                  className="absolute -left-10 top-0 h-24 w-24 rounded-full blur-2xl"
                  style={{ background: isDark ? "rgba(200,146,58,0.09)" : "rgba(218,176,90,0.16)" }}
                />
                <div
                  className="absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl"
                  style={{ background: isDark ? "rgba(168,114,30,0.06)" : "rgba(200,160,100,0.12)" }}
                />
              </div>

              <div className="relative flex h-full flex-col">

                {/* ── Top row: name + GitHub link ─────────────────────────── */}
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3
                      className="truncate text-[1.4rem] leading-none tracking-[-0.03em]"
                      style={{
                        color:      ink,
                        fontFamily: "'DM Serif Display', Georgia, serif",
                      }}
                    >
                      {repo.name}
                    </h3>
                    <p
                      className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em]"
                      style={{ color: inkFaint }}
                    >
                      Built for shipping products and developer workflows.
                    </p>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${repo.name} on GitHub`}
                    className="shrink-0 transition-colors"
                    style={{ color: inkMuted }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = gold;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = inkMuted;
                    }}
                  >
                    <Github size={18} />
                  </a>
                </div>

                {/* ── Description ─────────────────────────────────────────── */}
                <p
                  className="mb-4 text-[13px] leading-[1.65]"
                  style={{ color: inkMuted }}
                >
                  {repo.readmeDescription ||
                    repo.description ||
                    "Clean repository structure with focused implementation and production-oriented patterns."}
                </p>

                {/* ── Chips: stars + language ──────────────────────────────── */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {repo.stargazers_count > 0 && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[10px]"
                      style={{
                        background: chipBg,
                        border:     `1px solid ${chipBorder}`,
                        color:      chipText,
                      }}
                    >
                      <Star size={10} style={{ fill: gold, color: gold }} />
                      {formatStars(repo.stargazers_count)}
                    </span>
                  )}

                  {repo.language && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px]"
                      style={{
                        background: chipBg,
                        border:     `1px solid ${chipBorder}`,
                        color:      chipText,
                      }}
                    >
                      <span className="h-2 w-2 rounded-full" style={{ background: gold }} />
                      {repo.language}
                    </span>
                  )}
                </div>

                {/* ── Divider ─────────────────────────────────────────────── */}
                <div className="mb-4 h-px w-full" style={{ background: ruleLine }} />

                {/* ── CTA ─────────────────────────────────────────────────── */}
                <div className="mt-auto">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all"
                    style={{
                      color:      gold,
                      background: ctaBg,
                      border:     `1px solid ${ctaBorder}`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background    = ctaHoverBg;
                      el.style.borderColor   = ctaHoverBorder;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background    = ctaBg;
                      el.style.borderColor   = ctaBorder;
                    }}
                  >
                    View Project
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}