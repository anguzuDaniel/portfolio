"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { ModeToggle } from "./ModeToggle";
import { siteConfig } from "@/config/profile";
import { useHasMounted } from "@/lib/useHasMounted";

const navLinks = [
  { name: "About",      href: "#about"      },
  { name: "Experience", href: "#experience" },
  { name: "Skills",     href: "#skills"     },
  { name: "Projects",   href: "#projects"   },
  { name: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection,    setActiveSection]    = useState("");

  const { resolvedTheme } = useTheme();
  const hasMounted         = useHasMounted();
  const isDark             = hasMounted ? (resolvedTheme ?? "light") === "dark" : false;

  // ── Design tokens (mirrors Hero) ─────────────────────────────────────────
  const bg       = isDark ? "#110e09"                      : "#faf8f4";
  const ink      = isDark ? "#ede0c8"                      : "#1a1208";
  const inkMuted = isDark ? "#8a7a64"                      : "#7a6a58";
  const gold     = isDark ? "#c8923a"                      : "#a8721e";
  const ruleLine = isDark ? "rgba(200,146,58,0.14)"        : "rgba(168,114,30,0.16)";

  // Scrolled pill background
  const scrolledBg     = isDark
    ? "rgba(17,14,9,0.88)"
    : "rgba(250,248,244,0.88)";
  const scrolledBorder = isDark
    ? "rgba(200,146,58,0.16)"
    : "rgba(168,114,30,0.18)";
  const scrolledShadow = isDark
    ? "0 16px 40px rgba(0,0,0,0.28)"
    : "0 8px 32px rgba(0,0,0,0.08)";

  // Active pill
  const activePillBg     = isDark ? "rgba(200,146,58,0.10)" : "rgba(168,114,30,0.08)";
  const activePillBorder = isDark ? "rgba(200,146,58,0.22)" : "rgba(168,114,30,0.24)";

  // Mobile menu
  const menuBg     = isDark
    ? "linear-gradient(180deg,rgba(22,16,10,0.97),rgba(14,10,6,0.99))"
    : "linear-gradient(180deg,rgba(250,248,244,0.97),rgba(240,232,220,0.99))";
  const menuBorder = isDark ? "rgba(200,146,58,0.14)" : "rgba(168,114,30,0.16)";
  const menuRule   = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Section observer ─────────────────────────────────────────────────────
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((s): s is HTMLElement => s instanceof HTMLElement);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(`#${visible[0].target.id}`);
      },
      { rootMargin: "-40% 0px -44% 0px", threshold: [0.2, 0.35, 0.55] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100]">
      {/* ── Pill bar ──────────────────────────────────────────────────────── */}
      <motion.div
        animate={{ y: isScrolled ? 0 : 4 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden transition-all duration-300"
        style={{
          background:   isScrolled ? scrolledBg     : "transparent",
          border:       isScrolled ? `1px solid ${scrolledBorder}` : "1px solid transparent",
          boxShadow:    isScrolled ? scrolledShadow  : "none",
          backdropFilter: isScrolled ? "blur(20px) saturate(1.4)" : "none",
        }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">

          {/* Logo + name ───────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[1rem]"
              style={{
                border:     `1px solid ${ruleLine}`,
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                boxShadow:  isDark
                  ? "inset 0 1px 0 rgba(255,255,255,0.06)"
                  : "inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <Image src="/logo.svg" alt="Logo" fill sizes="44px" className="object-cover" />
            </div>

            <div className="min-w-0">
              <div
                className="truncate font-display text-[1.1rem] leading-none tracking-[-0.04em]"
                style={{ color: ink, fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Anguzu Daniel
              </div>
              <div
                className="mt-1 hidden font-mono text-[9px] uppercase tracking-[0.24em] sm:block"
                style={{ color: gold, opacity: 0.75 }}
              >
                Full-Stack Product Engineer
              </div>
            </div>
          </Link>

          {/* Desktop nav links ─────────────────────────────────────────── */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveSection(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-[0.02em] transition-colors"
                  style={{
                    color: isActive ? (isDark ? "#ede0c8" : "#1a1208") : inkMuted,
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = ink;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = inkMuted;
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-link"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: activePillBg,
                        border: `1px solid ${activePillBorder}`,
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop actions ───────────────────────────────────────────── */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition-all"
              style={{
                color:  gold,
                border: `1px solid ${ruleLine}`,
                background: isDark ? "rgba(200,146,58,0.07)" : "rgba(168,114,30,0.06)",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = isDark
                  ? "rgba(200,146,58,0.14)"
                  : "rgba(168,114,30,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${gold}55`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = isDark
                  ? "rgba(200,146,58,0.07)"
                  : "rgba(168,114,30,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = ruleLine;
              }}
            >
              <Download size={13} />
              Resume
            </a>
            <ModeToggle />
          </div>

          {/* Mobile toggle ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 md:hidden">
            <ModeToggle />
            <button
              suppressHydrationWarning
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] transition-colors"
              style={{
                border:     `1px solid ${ruleLine}`,
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                color:      ink,
              }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Mobile dropdown ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 md:hidden"
          >
            <div
              className="overflow-hidden rounded-[1.4rem]"
              style={{
                background:    menuBg,
                border:        `1px solid ${menuBorder}`,
                boxShadow:     isDark
                  ? "0 20px 48px rgba(0,0,0,0.32)"
                  : "0 12px 40px rgba(0,0,0,0.10)",
                backdropFilter: "blur(24px) saturate(1.4)",
              }}
            >
              {/* Section label */}
              <div
                className="border-b px-4 py-3"
                style={{ borderColor: menuRule }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.3em]"
                  style={{ color: gold, opacity: 0.7 }}
                >
                  Navigate
                </span>
              </div>

              {/* Links */}
              <div className="grid gap-1 p-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveSection(link.href);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-between rounded-[1rem] px-4 py-3 text-sm font-semibold transition-colors"
                        style={{
                          background: isActive ? activePillBg : "transparent",
                          color:      isActive ? (isDark ? "#ede0c8" : "#1a1208") : inkMuted,
                          border:     isActive ? `1px solid ${activePillBorder}` : "1px solid transparent",
                          fontFamily: "'Instrument Sans', sans-serif",
                        }}
                      >
                        <span>{link.name}</span>
                        <ArrowUpRight
                          size={14}
                          style={{ color: isActive ? gold : inkMuted, opacity: isActive ? 1 : 0.5 }}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Resume CTA */}
              <div
                className="border-t p-2"
                style={{ borderColor: menuRule }}
              >
                <a
                  href={siteConfig.resumeUrl}
                  download
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-[1rem] px-4 py-3 text-sm font-semibold transition-colors"
                  style={{
                    background: isDark ? "rgba(200,146,58,0.08)" : "rgba(168,114,30,0.07)",
                    border:     `1px solid ${ruleLine}`,
                    color:      gold,
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                >
                  <span>Download Resume</span>
                  <Download size={14} style={{ color: gold }} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}