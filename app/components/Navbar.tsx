"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "py-4" : "py-6"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div
                    className={`rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled
                        ? "glass border-zinc-200/50 dark:border-zinc-800/50"
                        : "bg-transparent border-transparent"
                        }`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-xl shadow-brand-500/20">
                            <Code2 size={24} />
                        </div>
                        <span className="font-bold text-xl tracking-tighter hidden sm:block">
                            Anguzu<span className="text-brand-500">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800" />

                        <ModeToggle />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ModeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-zinc-600  dark:hover:bg-zinc-900 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 right-0 px-6 pt-2"
                    >
                        <div className="glass rounded-2xl p-6 flex flex-col gap-4 shadow-2xl border border-zinc-200/50">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-bold text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
