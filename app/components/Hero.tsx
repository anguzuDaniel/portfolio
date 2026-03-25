"use client";

import Link from "next/link";
import { animate, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Database,
  Download,
  FolderGit2,
  Gauge,
  Github,
  MapPin,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/profile";

const statusCards = [
  {
    icon: ShieldCheck,
    label: "Risk Guard",
    value: "Active",
    detail: "Execution discipline and drawdown checks stay online.",
  },
  {
    icon: Gauge,
    label: "Latency",
    value: "42ms",
    detail: "Lean request paths for faster fintech feedback loops.",
  },
  {
    icon: Database,
    label: "Data Flow",
    value: "Stable",
    detail: "APIs, persistence, and automation signals stay in sync.",
  },
];

type HeroStatProps = {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
};

function HeroStat({ label, value, suffix, icon: Icon }: HeroStatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.1,
      delay: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex items-center gap-3 whitespace-nowrap">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-300/20 bg-white/[0.03] text-brand-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-2xl leading-none tracking-[-0.04em] text-white sm:text-[1.75rem]">
          {displayValue}
          {suffix}
        </span>
        <span className="pb-0.5 text-[10px] font-black uppercase tracking-[0.24em] text-stone-400">
          {label}
        </span>
      </div>
    </div>
  );
}

function ShippingTicker() {
  const items = [...siteConfig.projects, ...siteConfig.projects];

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/8 bg-[#120f0c]/85 backdrop-blur-xl">
      <div className="container-max flex h-16 items-center gap-4 overflow-hidden">
        <div className="shrink-0 rounded-r-full border-l-4 border-brand-400 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.26em] text-brand-100/75 shadow-[0_0_24px_rgba(217,168,102,0.08)]">
          Currently Shipping
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#120f0c] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#120f0c] to-transparent" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            className="flex w-max min-w-full items-center gap-8 pr-8"
          >
            {items.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                className="flex items-center gap-3 whitespace-nowrap text-sm text-stone-300"
              >
                <span className="h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_12px_rgba(217,168,102,0.65)]" />
                <span className="font-semibold text-stone-100">{project.title}</span>
                <span className="rounded-full border border-brand-300/20 bg-brand-400/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.22em] text-brand-100/70">
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
  const accentName = nameParts.pop() ?? "";
  const primaryName = nameParts.join(" ") || siteConfig.name;
  const tagline = `${siteConfig.hero.title} ${siteConfig.hero.titleAccent}`;
  const taglineWords = tagline.split(" ");
  const heroStats = [
    { label: "Years", value: 5, suffix: "+", icon: Briefcase },
    { label: "Repos", value: 50, suffix: "+", icon: FolderGit2 },
    {
      label: "Live Projects",
      value: siteConfig.projects.length,
      suffix: "",
      icon: Rocket,
    },
  ];

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#120f0c] pt-10 text-theme-foreground md:pt-28"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,15,12,0.98) 0%, rgba(16,13,10,1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-75"
        style={{
          backgroundImage:
            "radial-gradient(circle at 24% 24%, rgba(202,136,62,0.26), transparent 22%), radial-gradient(circle at 70% 18%, rgba(76,41,20,0.42), transparent 28%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,241,224,0.12) 0 1px, transparent 1px 22px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.1] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0.8px, transparent 1px), radial-gradient(circle at 70% 35%, rgba(255,255,255,0.08) 0.6px, transparent 1px)",
          backgroundSize: "18px 18px, 26px 26px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,241,224,0.9) 0.9px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="container-max relative z-10 pb-28 pt-8 sm:pt-14">
        <div className="min-h-[calc(100vh-12rem)] max-w-[46rem] items-center">
          <div className="max-w-[42rem]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <div className="mb-4 flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.28em] text-brand-100/55">
                <span className="h-px w-14 bg-gradient-to-r from-brand-300 to-transparent" />
                <span>{siteConfig.role}</span>
              </div>

              <h1
                className="max-w-[14ch] font-display text-[clamp(4rem,11vw,6.8rem)] leading-[0.92] tracking-[-0.065em]"
                style={{
                  textShadow: "0 12px 34px rgba(0, 0, 0, 0.32)",
                }}
              >
                <span className="block text-white">{primaryName}</span>
                {accentName ? (
                  <span className="block text-brand-300">{accentName}</span>
                ) : null}
              </h1>
            </motion.div>

            <div className="mt-7 max-w-[34rem]">
              <motion.p
                initial="hidden"
                animate="visible"
                className="text-left text-xl font-semibold leading-snug tracking-[-0.03em] text-stone-100 sm:text-[1.6rem]"
                aria-label={tagline}
              >
                <span className="sr-only">{tagline}</span>
                <span aria-hidden="true" className="flex flex-wrap gap-x-3 gap-y-2">
                  {taglineWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{
                        duration: 0.38,
                        delay: 0.4 + index * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={
                        word === "products."
                          ? "text-brand-200"
                          : "text-stone-100"
                      }
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.84 }}
                className="mt-6 max-w-[35rem] text-base leading-8 text-stone-300 sm:text-lg"
              >
                {siteConfig.hero.subtext}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.98 }}
              className="mt-7 flex flex-wrap items-center gap-5 text-sm text-stone-400"
            >
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-300" />
                <span>{siteConfig.location}</span>
              </div>
              <span className="hidden h-5 w-px bg-white/10 sm:block" />
              <div className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-100/50">
                Full-stack systems / mobile / trading tools
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.02 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3.5 text-sm font-bold text-stone-950 shadow-[0_18px_40px_rgba(202,136,62,0.28)] transition-colors hover:bg-brand-300"
                >
                  Start a Project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-brand-300/24 bg-white/[0.03] px-5 py-3.5 text-sm font-bold text-stone-100 transition-colors hover:border-brand-300/40 hover:bg-white/[0.06]"
                >
                  <Download className="h-4 w-4 text-brand-200" />
                  Download CV
                </a>
              </motion.div>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub profile"
                title="GitHub"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-transparent text-stone-300 transition-colors hover:border-brand-300/35 hover:text-brand-200"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.12 }}
              className="mt-10 flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-5 py-4 text-sm text-stone-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <HeroStat {...stat} />
                  {index !== heroStats.length - 1 ? (
                    <span className="hidden h-8 w-px bg-white/10 sm:block" />
                  ) : null}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <ShippingTicker />
    </section>
  );
}
