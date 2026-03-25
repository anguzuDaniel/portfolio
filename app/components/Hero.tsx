"use client";

import Link from "next/link";
import { animate, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Download,
  FolderGit2,
  Github,
  MapPin,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/profile";
import { useHasMounted } from "@/lib/useHasMounted";

type HeroStatProps = {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
  isDarkMode: boolean;
  ink: string;
  inkMuted: string;
  gold: string;
};

function HeroStat({ label, value, suffix, icon: Icon, ink, inkMuted, gold }: HeroStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span
        style={{
          color: ink,
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: "2.4rem",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {displayValue}{suffix}
      </span>
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 shrink-0" style={{ color: gold }} />
        <span
          className="font-mono text-[9px] uppercase tracking-[0.22em]"
          style={{ color: inkMuted }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function ShippingTicker({ isDarkMode, bg, ruleLine, gold, ink, inkMuted }: {
  isDarkMode: boolean;
  bg: string;
  ruleLine: string;
  gold: string;
  ink: string;
  inkMuted: string;
}) {
  const items = [...siteConfig.projects, ...siteConfig.projects];

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 overflow-hidden"
      style={{ background: bg, borderTop: `1px solid ${ruleLine}` }}
    >
      <div className="flex h-14 items-center gap-6 overflow-hidden">
        <div
          className="shrink-0 pl-8 font-mono text-[9px] uppercase tracking-[0.32em]"
          style={{ color: gold }}
        >
          Live ●
        </div>
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex w-max items-center gap-12"
          >
            {items.map((project, i) => (
              <div key={`${project.title}-${i}`} className="flex items-center gap-3 whitespace-nowrap">
                <span className="h-px w-5" style={{ background: gold, opacity: 0.5 }} />
                <span className="text-sm font-semibold" style={{ color: ink, fontFamily: "'Instrument Sans', sans-serif" }}>
                  {project.title}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: inkMuted }}>
                  {project.status}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const nameParts = siteConfig.name.split(" ");
  const lastName  = nameParts.pop() ?? "";
  const firstName = nameParts.join(" ") || siteConfig.name;

  const { resolvedTheme } = useTheme();
  const hasMounted  = useHasMounted();
  const isDarkMode  = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  const bg       = isDarkMode ? "#110e09" : "#faf8f4";
  const ink      = isDarkMode ? "#ede0c8" : "#1a1208";
  const inkMuted = isDarkMode ? "#8a7a64" : "#7a6a58";
  const inkFaint = isDarkMode ? "#3a3020" : "#c8b8a8";
  const gold     = isDarkMode ? "#c8923a" : "#a8721e";
  const ruleLine = isDarkMode ? "rgba(200,146,58,0.14)" : "rgba(168,114,30,0.16)";
  const surface  = isDarkMode ? "#191208" : "#f0e8dc";

  const heroStats = [
    { label: "Years Exp.", value: 5,                          suffix: "+", icon: Briefcase  },
    { label: "Repos",      value: 50,                         suffix: "+", icon: FolderGit2 },
    { label: "Products",   value: siteConfig.projects.length, suffix: "",  icon: Rocket     },
  ];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden min-h-screen flex flex-col"
      style={{ background: bg, fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isDarkMode
            ? "radial-gradient(ellipse 65% 55% at 10% 0%, rgba(200,146,58,0.10) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 90% 85%, rgba(100,60,10,0.14) 0%, transparent 60%)"
            : "radial-gradient(ellipse 65% 55% at 10% 0%, rgba(218,176,90,0.16) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 90% 85%, rgba(180,140,80,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Vertical rule — desktop only */}
      <div
        className="pointer-events-none absolute inset-y-0 left-[57%] z-0 hidden w-px xl:block"
        style={{ background: ruleLine }}
      />

      {/* ── Main layout ─────────────────────────────────────────────────────── */}
      <div className="container-max relative z-10 flex flex-1 flex-col pt-24 pb-20 lg:pt-36">
        <div className="grid flex-1 grid-cols-1 items-center gap-16 xl:grid-cols-[1fr_300px] xl:gap-0">

          {/* ── LEFT col ──────────────────────────────────────────────────── */}
          <div className="flex flex-col xl:pr-20">


            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(4.2rem, 11.5vw, 9.5rem)",
                lineHeight: 0.87,
                letterSpacing: "-0.04em",
              }}
            >
              <span className="block" style={{ color: ink }}>
                {firstName}
              </span>
              <span className="relative block italic" style={{ color: gold }}>
                {lastName}
                {/* Animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-3 left-0 block h-[3px] w-full origin-left rounded-full"
                  style={{ background: `linear-gradient(90deg, ${gold} 0%, transparent 100%)` }}
                />
              </span>
            </motion.h1>

            {/* Role tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 max-w-[38ch] text-xl font-medium leading-[1.6] tracking-[-0.01em]"
              style={{ color: inkMuted }}
            >
              {siteConfig.hero.title}{" "}
              <span style={{ color: ink, fontWeight: 600 }}>
                {siteConfig.hero.titleAccent}
              </span>
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.68 }}
              className="mt-4 flex items-center gap-2"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: gold }} />
              <span
                className="font-mono text-xs tracking-[0.12em]"
                style={{ color: inkMuted }}
              >
                {siteConfig.location}
              </span>
            </motion.div>

            {/* ── CTA row ──────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.82 }}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              {/* Primary CTA */}
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-4 text-sm font-semibold tracking-[0.04em] transition-all"
                  style={{
                    background: gold,
                    color: "#faf8f4",
                    boxShadow: `0 8px 28px rgba(168,114,30,0.32)`,
                  }}
                >
                  Start a Project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* CV */}
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-4 text-sm font-medium tracking-[0.04em] transition-colors"
                  style={{
                    color: inkMuted,
                    border: `1px solid ${ruleLine}`,
                    background: "transparent",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = ink;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${gold}55`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = inkMuted;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = ruleLine;
                  }}
                >
                  <Download className="h-3.5 w-3.5" style={{ color: gold }} />
                  Download CV
                </a>
              </motion.div>

              {/* GitHub */}
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-[52px] w-[52px] items-center justify-center transition-all"
                style={{
                  border: `1px solid ${ruleLine}`,
                  color: inkMuted,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = gold;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${gold}66`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.color = inkMuted;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = ruleLine;
                }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </motion.div>

            {/* ── Inline stats row (mobile / mid) ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="mt-14 grid grid-cols-3 gap-6 xl:hidden"
            >
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05 + i * 0.09 }}
                >
                  <HeroStat {...stat} isDarkMode={isDarkMode} ink={ink} inkMuted={inkMuted} gold={gold} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT col — desktop sidebar ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:flex xl:flex-col xl:gap-8 xl:border-l xl:pl-12"
            style={{ borderColor: ruleLine }}
          >
            {/* Subtext */}
            <p className="text-sm leading-[1.95]" style={{ color: inkMuted }}>
              {siteConfig.hero.subtext}
            </p>

            {/* Rule */}
            <div className="h-px w-full" style={{ background: ruleLine }} />

            {/* Stats */}
            <div className="flex flex-col gap-7">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <HeroStat {...stat} isDarkMode={isDarkMode} ink={ink} inkMuted={inkMuted} gold={gold} />
                </motion.div>
              ))}
            </div>

            {/* Rule */}
            <div className="h-px w-full" style={{ background: ruleLine }} />

            {/* Projects list */}
            <div className="flex flex-col gap-3">
              <span
                className="font-mono text-[9px] uppercase tracking-[0.3em]"
                style={{ color: gold }}
              >
                Currently shipping
              </span>
              {siteConfig.projects.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.08 }}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className="h-1 w-1 shrink-0 rounded-full"
                      style={{ background: gold, opacity: 0.7 }}
                    />
                    <span
                      className="truncate text-xs font-medium"
                      style={{ color: ink }}
                    >
                      {p.title}
                    </span>
                  </div>
                  <span
                    className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{ color: inkFaint }}
                  >
                    {p.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Ticker ──────────────────────────────────────────────────────────── */}
      <ShippingTicker
        isDarkMode={isDarkMode}
        bg={bg}
        ruleLine={ruleLine}
        gold={gold}
        ink={ink}
        inkMuted={inkMuted}
      />
    </section>
  );
}