"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { siteConfig } from "@/config/profile";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: "-40% 0px -44% 0px",
        threshold: [0.2, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-[100]">
      <div className="container-max pt-4 md:pt-5">
        <motion.div
          animate={{
            opacity: 1,
            y: isScrolled ? 0 : 4,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-[1.4rem] border transition-all duration-300 ${
            isScrolled
              ? "border-[rgba(217,168,102,0.14)] bg-[rgba(20,15,11,0.86)] shadow-[0_18px_42px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              : "border-[rgba(217,168,102,0.1)] bg-[linear-gradient(90deg,rgba(24,17,13,0.88),rgba(17,13,10,0.8))] shadow-[0_16px_36px_rgba(0,0,0,0.16)] backdrop-blur-lg"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-40 bg-[radial-gradient(circle_at_left,rgba(184,109,40,0.18),transparent_68%)]" />
          <div className="absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_right,rgba(217,168,102,0.12),transparent_68%)]" />

          <div className="relative flex items-center justify-between gap-4 px-4 py-3 md:px-5">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-brand-300/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <Image src="/logo.svg" alt="Logo" fill sizes="44px" className="object-cover" />
              </div>

              <div className="min-w-0">
                <div className="truncate font-display text-[1.15rem] leading-none tracking-[-0.04em] text-stone-50">
                  Anguzu Daniel
                </div>
                <div className="mt-1 hidden text-[10px] font-black uppercase tracking-[0.22em] text-brand-100/60 sm:block">
                  Full-Stack Product Engineer
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveSection(link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative rounded-full px-4 py-2.5 text-[13px] font-bold tracking-[0.02em] transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-stone-300 hover:text-brand-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-link"
                        className="absolute inset-0 rounded-full border border-brand-300/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <a
                href={siteConfig.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-brand-300/20 bg-brand-400/10 px-4 py-2.5 text-[12px] font-black uppercase tracking-[0.14em] text-brand-100 transition-colors hover:border-brand-300/40 hover:bg-brand-400/16"
              >
                <Download size={15} />
                Resume
              </a>
              <ModeToggle />
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <ModeToggle />
              <button
                suppressHydrationWarning
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[1rem] border border-brand-300/18 bg-white/[0.06] text-stone-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:bg-white/[0.09]"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="mt-3 md:hidden"
            >
              <div className="overflow-hidden rounded-[1.4rem] border border-[rgba(217,168,102,0.14)] bg-[linear-gradient(180deg,rgba(24,17,13,0.96),rgba(16,12,9,0.98))] shadow-[0_18px_40px_rgba(0,0,0,0.26)] backdrop-blur-xl">
                <div className="border-b border-white/6 px-4 py-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.22em] text-brand-100/55">
                    Navigate
                  </div>
                </div>

                <div className="grid gap-1 p-3">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href;

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => {
                            setActiveSection(link.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between rounded-[1rem] px-4 py-3 text-sm font-bold transition-colors ${
                            isActive
                              ? "bg-brand-400/12 text-brand-100"
                              : "text-stone-200 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span>{link.name}</span>
                          <ArrowUpRight size={15} className={isActive ? "text-brand-200" : "text-stone-500"} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="border-t border-white/6 p-3">
                  <a
                    href={siteConfig.resumeUrl}
                    download
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-[1rem] border border-brand-300/18 bg-brand-400/10 px-4 py-3 text-sm font-bold text-brand-100"
                  >
                    <span>Download Resume</span>
                    <Download size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
