"use client";

import { siteConfig } from "@/config/profile";
import { useHasMounted } from "@/lib/useHasMounted";
import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { useTheme } from "next-themes";

type EducationItem = {
  school: string;
  award: string;
  focus: string;
  period: string;
};

export default function Credentials() {
  const { resolvedTheme } = useTheme();
  const hasMounted        = useHasMounted();
  const isDark            = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens ──────────────────────────────────────────────────────────
  const ink      = isDark ? "#ede0c8" : "#1a1208";
  const inkMuted = isDark ? "#8a7a64" : "#7a6a58";
  const gold     = isDark ? "#c8923a" : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.13)" : "rgba(168,114,30,0.15)";

  // Panel (outer card)
  const panelBg     = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.70)";
  const panelBorder = isDark ? "rgba(200,146,58,0.10)"   : "rgba(168,114,30,0.14)";
  const panelShadow = isDark
    ? "0 4px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)"
    : "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.90)";

  // Inner item card
  const itemBg     = isDark ? "rgba(255,255,255,0.03)"  : "rgba(255,250,244,0.88)";
  const itemBorder = isDark ? "rgba(200,146,58,0.09)"   : "rgba(168,114,30,0.16)";

  // Icon container
  const iconBg     = isDark ? "rgba(200,146,58,0.08)" : "rgba(168,114,30,0.07)";
  const iconBorder = isDark ? "rgba(200,146,58,0.20)" : "rgba(168,114,30,0.24)";

  return (
    <section id="credentials" className="section-padding container-max">

      {/* ── Section header ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: gold }} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: gold }}
            >
              Foundations · Continuous Learning
            </span>
          </div>

          <h2
            className="text-4xl leading-tight tracking-[-0.04em] sm:text-5xl"
            style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            Education and certifications that reinforce the practice.
          </h2>
        </div>

        <p
          className="max-w-prose text-base leading-[1.85] lg:justify-self-end"
          style={{ color: inkMuted }}
        >
          Formal study plus practical upskilling across Android, developer tooling, automation, and teaching.
        </p>
      </motion.div>

      {/* ── Two-column grid ─────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

        {/* ── Education panel ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.35rem] p-7 backdrop-blur-sm md:p-9"
          style={{
            background: panelBg,
            border:     `1px solid ${panelBorder}`,
            boxShadow:  panelShadow,
          }}
        >
          {/* Panel header */}
          <div className="mb-7 flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem]"
              style={{
                background: iconBg,
                border:     `1px solid ${iconBorder}`,
                color:      gold,
              }}
            >
              <GraduationCap size={21} />
            </div>
            <div>
              <h3
                className="text-2xl leading-tight tracking-[-0.03em]"
                style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Education
              </h3>
              <p
                className="mt-0.5 text-sm"
                style={{ color: inkMuted }}
              >
                Academic grounding across software and business.
              </p>
            </div>
          </div>

          {/* Rule */}
          <div className="mb-6 h-px w-full" style={{ background: ruleLine }} />

          {/* Education items */}
          <div className="space-y-4">
            {siteConfig.education.map((item: EducationItem) => (
              <div
                key={`${item.school}-${item.period}`}
                className="rounded-[1rem] p-5"
                style={{
                  background: itemBg,
                  border:     `1px solid ${itemBorder}`,
                }}
              >
                <p
                  className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em]"
                  style={{ color: gold, opacity: 0.8 }}
                >
                  {item.period}
                </p>
                <h4
                  className="mb-1 text-lg leading-snug tracking-[-0.02em]"
                  style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  {item.school}
                </h4>
                <p className="text-[14px] leading-relaxed" style={{ color: inkMuted }}>
                  {item.award} in {item.focus}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications panel ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[1.35rem] p-7 backdrop-blur-sm md:p-9"
          style={{
            background: panelBg,
            border:     `1px solid ${panelBorder}`,
            boxShadow:  panelShadow,
          }}
        >
          {/* Panel header */}
          <div className="mb-7 flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem]"
              style={{
                background: iconBg,
                border:     `1px solid ${iconBorder}`,
                color:      gold,
              }}
            >
              <Award size={21} />
            </div>
            <div>
              <h3
                className="text-2xl leading-tight tracking-[-0.03em]"
                style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Certifications
              </h3>
              <p
                className="mt-0.5 text-sm"
                style={{ color: inkMuted }}
              >
                Courses and recognition that reinforce current practice.
              </p>
            </div>
          </div>

          {/* Rule */}
          <div className="mb-6 h-px w-full" style={{ background: ruleLine }} />

          {/* Certification items */}
          <div className="space-y-2.5">
            {siteConfig.certifications.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[1rem] px-4 py-3.5"
                style={{
                  background: itemBg,
                  border:     `1px solid ${itemBorder}`,
                }}
              >
                {/* Dash accent */}
                <span
                  className="mt-[0.6em] h-px w-5 shrink-0"
                  style={{
                    background: `linear-gradient(90deg, ${gold}, ${
                      isDark ? "rgba(200,146,58,0.2)" : "rgba(168,114,30,0.15)"
                    })`,
                  }}
                />
                <span
                  className="text-[14px] leading-[1.7]"
                  style={{ color: inkMuted }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}