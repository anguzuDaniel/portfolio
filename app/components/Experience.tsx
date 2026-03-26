"use client";

import { siteConfig } from "@/config/profile";
import { useHasMounted } from "@/lib/useHasMounted";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarRange, MapPin } from "lucide-react";
import { useTheme } from "next-themes";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary?: string;
  highlights?: string[];
  stack?: string[];
  link?: { label: string; url: string };
};

const companyMonograms: Record<string, string> = {
  "Dunam AI":           "A",
  "Stoic Pips Limited": "F",
  nooaenergies:         "N",
  Turing:               "T",
  Holvada:              "H",
  Rinfo:                "R",
  CodeImpact:           "C",
};

export default function Experience() {
  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const ink      = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted = isDark ? "#8a7a64" : "#7a6a58";
  const gold     = isDark ? "#c8923a" : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.13)" : "rgba(168,114,30,0.15)";

  // Timeline line
  const timelineLine = isDark
    ? "linear-gradient(to bottom, rgba(200,146,58,0.55) 0%, rgba(200,146,58,0.18) 60%, transparent 100%)"
    : "linear-gradient(to bottom, rgba(168,114,30,0.45) 0%, rgba(168,114,30,0.14) 60%, transparent 100%)";

  // Monogram avatar
  const avatarBg = isDark
    ? "radial-gradient(circle at 35% 35%, rgba(60,40,20,0.95), rgba(20,14,8,0.99) 55%, rgba(200,146,58,0.08) 100%)"
    : "radial-gradient(circle at 35% 35%, rgba(255,252,246,0.99), rgba(236,218,192,0.94) 50%, rgba(168,114,30,0.12) 100%)";
  const avatarBorder = isDark ? "rgba(200,146,58,0.22)" : "rgba(168,114,30,0.30)";
  const avatarGlow   = isDark
    ? "0 0 0 5px rgba(18,14,8,0.55), 0 0 24px rgba(168,114,30,0.20)"
    : "0 0 0 5px rgba(250,248,244,0.65), 0 0 20px rgba(168,114,30,0.14)";

  // Card
  const cardBg     = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.70)";
  const cardBorder = isDark ? "rgba(200,146,58,0.10)"   : "rgba(168,114,30,0.14)";
  const cardShadow = isDark
    ? "0 4px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)"
    : "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)";

  // Chips
  const chipBg     = isDark ? "rgba(255,255,255,0.05)" : "rgba(168,114,30,0.07)";
  const chipBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(168,114,30,0.18)";
  const chipText   = isDark ? "#a89070"                : "#7a5a2e";

  // Link button
  const linkBg         = isDark ? "rgba(200,146,58,0.08)"  : "rgba(255,255,255,0.85)";
  const linkBorder      = isDark ? "rgba(200,146,58,0.25)"  : "rgba(168,114,30,0.30)";
  const linkHoverBg     = isDark ? "rgba(200,146,58,0.14)"  : "rgba(255,255,255,1)";
  const linkHoverBorder = isDark ? "rgba(200,146,58,0.45)"  : "rgba(168,114,30,0.50)";

  if (!siteConfig.experience || siteConfig.experience.length === 0) return null;

  return (
    <section id="experience" className="section-padding container-max">

      {/* ── Section header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 max-w-3xl space-y-5"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-6" style={{ background: gold }} />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: gold }}
          >
            Professional Timeline
          </span>
        </div>

        <h2
          className="text-4xl leading-tight tracking-[-0.04em] sm:text-5xl"
          style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Professional timeline built around product execution.
        </h2>
      </motion.div>

      {/* ── Timeline ────────────────────────────────────────────────────────── */}
      <div className="relative">

        {/* Vertical rule */}
        <div
          className="absolute bottom-6 left-7 top-6 hidden w-px md:block"
          style={{ background: timelineLine }}
        />

        <div className="space-y-8">
          {siteConfig.experience.map((item: ExperienceItem, index) => {
            const mark = companyMonograms[item.company] ?? item.company.charAt(0).toUpperCase();

            return (
              <motion.article
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative grid gap-5 md:grid-cols-[92px_minmax(0,1fr)] md:gap-6"
              >
                {/* ── Avatar column ────────────────────────────────────────── */}
                <div className="relative hidden md:flex md:justify-center">
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{
                      background: avatarBg,
                      border:     `1px solid ${avatarBorder}`,
                      boxShadow:  avatarGlow,
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize:   "1.5rem",
                      fontWeight: 900,
                      color:      gold,
                    }}
                  >
                    {mark}
                  </div>
                </div>

                {/* ── Card ─────────────────────────────────────────────────── */}
                <div
                  className="rounded-[1.25rem] p-6 backdrop-blur-sm transition-shadow duration-300 md:p-7"
                  style={{
                    background: cardBg,
                    border:     `1px solid ${cardBorder}`,
                    boxShadow:  cardShadow,
                  }}
                >
                  {/* Mobile avatar + name row */}
                  <div className="mb-5 flex items-start gap-4 md:hidden">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl font-black"
                      style={{
                        background: avatarBg,
                        border:     `1px solid ${avatarBorder}`,
                        color:      gold,
                        fontFamily: "'DM Serif Display', Georgia, serif",
                      }}
                    >
                      {mark}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-2xl leading-tight tracking-[-0.03em]"
                        style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        {item.role}
                      </h3>
                      <p
                        className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: gold, opacity: 0.8 }}
                      >
                        {item.company}
                      </p>
                    </div>
                  </div>

                  {/* Desktop two-column inner grid */}
                  <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">

                    {/* Left: company / role / meta */}
                    <div>
                      {/* Company + role — desktop only */}
                      <p
                        className="mb-2 hidden font-mono text-[10px] uppercase tracking-[0.24em] md:block"
                        style={{ color: gold, opacity: 0.8 }}
                      >
                        {item.company}
                      </p>
                      <h3
                        className="mb-5 hidden text-[1.9rem] leading-[1.05] tracking-[-0.03em] md:block"
                        style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        {item.role}
                      </h3>

                      {/* Meta */}
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-2.5">
                          <CalendarRange
                            size={15}
                            className="mt-0.5 shrink-0"
                            style={{ color: gold }}
                          />
                          <span
                            className="font-mono text-[12px] tracking-[0.04em]"
                            style={{ color: inkMuted }}
                          >
                            {item.period}
                          </span>
                        </div>

                        {item.location && (
                          <div className="flex items-start gap-2.5">
                            <MapPin
                              size={15}
                              className="mt-0.5 shrink-0"
                              style={{ color: gold }}
                            />
                            <span
                              className="font-mono text-[12px] tracking-[0.04em]"
                              style={{ color: inkMuted }}
                            >
                              {item.location}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: content */}
                    <div className="space-y-5">
                      {item.summary && (
                        <p
                          className="text-[15px] leading-[1.8]"
                          style={{ color: inkMuted }}
                        >
                          {item.summary}
                        </p>
                      )}

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-3">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex gap-3 text-[14px] leading-[1.75]"
                              style={{ color: inkMuted }}
                            >
                              {/* Dash accent */}
                              <span
                                className="mt-[0.65em] h-px w-6 shrink-0"
                                style={{
                                  background: `linear-gradient(90deg, ${gold}, ${isDark ? "rgba(200,146,58,0.2)" : "rgba(168,114,30,0.15)"})`,
                                }}
                              />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {(item.stack || item.link) && (
                        <div
                          className="flex flex-col gap-4 pt-4"
                          style={{ borderTop: `1px solid ${ruleLine}` }}
                        >
                          {/* Stack chips */}
                          {item.stack && item.stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {item.stack.map((entry) => (
                                <span
                                  key={entry}
                                  className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                                  style={{
                                    background: chipBg,
                                    border:     `1px solid ${chipBorder}`,
                                    color:      chipText,
                                  }}
                                >
                                  {entry}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* External link */}
                          {item.link && (
                            <div>
                              <a
                                href={item.link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-[0.65rem] px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                  color:      gold,
                                  background: linkBg,
                                  border:     `1px solid ${linkBorder}`,
                                  boxShadow:  isDark
                                    ? "0 4px 16px rgba(0,0,0,0.18)"
                                    : "0 4px 14px rgba(168,114,30,0.08)",
                                  fontFamily: "'Instrument Sans', sans-serif",
                                }}
                                onMouseEnter={(e) => {
                                  const el = e.currentTarget as HTMLAnchorElement;
                                  el.style.background   = linkHoverBg;
                                  el.style.borderColor  = linkHoverBorder;
                                }}
                                onMouseLeave={(e) => {
                                  const el = e.currentTarget as HTMLAnchorElement;
                                  el.style.background   = linkBg;
                                  el.style.borderColor  = linkBorder;
                                }}
                              >
                                {item.link.label}
                                <ArrowUpRight size={14} />
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}