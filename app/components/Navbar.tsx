"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
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
            setIsScrolled(window.scrollY > 20);
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
                rootMargin: "-42% 0px -42% 0px",
                threshold: [0.2, 0.35, 0.5, 0.7],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "py-3" : "py-5"
                }`}
        >
            <div className="container-max">
                <motion.div
                    animate={{
                        y: isScrolled ? 0 : 6,
                        scale: isScrolled ? 1 : 0.985,
                    }}
                    className={`relative flex items-center justify-between rounded-[1.75rem] border px-4 py-3 transition-all duration-500 md:px-6 ${isScrolled
                        ? "glass shadow-2xl shadow-zinc-950/10 ring-1 ring-white/40 dark:ring-white/8"
                        : "border border-[rgba(122,65,23,0.12)] bg-[rgba(255,250,244,0.94)] shadow-[0_16px_40px_rgba(61,43,24,0.08)] backdrop-blur-md dark:border-transparent dark:bg-zinc-950/15"
                        }`}
                >
                    <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />

                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-xl">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                fill
                                sizes="40px"
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-xl tracking-tighter">
                                Anguzu<span className="text-brand-500">.</span>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-700 dark:text-zinc-400">
                                Full-Stack Software Developer
                            </div>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-2 rounded-full border border-[rgba(97,52,21,0.18)] bg-[rgba(255,248,240,0.96)] px-2 py-2 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/35">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveSection(link.href)}
                                aria-current={activeSection === link.href ? "page" : undefined}
                                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeSection === link.href
                                    ? "text-[#1f140d] dark:text-white"
                                    : "text-[#4c2914] hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-400"
                                    }`}
                            >
                                {activeSection === link.href && (
                                    <motion.span
                                        layoutId="active-section-pill"
                                        className="absolute inset-0 rounded-full border border-brand-400/20 bg-brand-500/10 shadow-[0_0_0_1px_rgba(59,130,246,0.08)] dark:bg-brand-500/15"
                                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href={siteConfig.resumeUrl}
                            download
                            className="inline-flex items-center gap-2 rounded-full border border-[rgba(97,52,21,0.18)] bg-[rgba(255,248,240,0.96)] px-4 py-2 text-sm font-bold text-[#3b2819] shadow-sm backdrop-blur-xl transition-colors hover:border-brand-500 hover:text-brand-700 dark:border-zinc-800 dark:bg-zinc-950/35 dark:text-zinc-300 dark:hover:text-brand-400"
                        >
                            <Download size={16} />
                            Download CV
                        </a>
                        <ModeToggle />
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <ModeToggle />
                        <button
                            suppressHydrationWarning
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="rounded-xl border border-[rgba(97,52,21,0.18)] bg-[rgba(255,248,240,0.96)] p-2 text-[#3b2819] shadow-sm backdrop-blur-xl transition-colors dark:border-zinc-800 dark:bg-zinc-950/35 dark:text-zinc-300"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute left-0 right-0 top-full px-4 pt-2 md:hidden"
                    >
                        <div className="glass rounded-[1.75rem] border border-[rgba(97,52,21,0.14)] p-5 shadow-2xl">
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => {
                                            setActiveSection(link.href);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`rounded-2xl px-4 py-3 text-base font-bold transition-colors ${activeSection === link.href
                                            ? "bg-brand-500/10 text-brand-700 dark:text-brand-400"
                                            : "text-[#3b2819] hover:bg-[rgba(97,52,21,0.06)] dark:text-zinc-300 dark:hover:bg-zinc-900/70"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[rgba(97,52,21,0.14)] bg-[rgba(255,248,240,0.92)] px-4 py-3 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/30">
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-700 dark:text-zinc-400">
                                        Resume
                                    </div>
                                    <div className="text-sm font-bold text-zinc-900 dark:text-white">
                                        Download CV
                                    </div>
                                </div>
                                <a
                                    href={siteConfig.resumeUrl}
                                    download
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-colors hover:bg-brand-700"
                                >
                                    <Download size={16} />
                                    Get It
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
