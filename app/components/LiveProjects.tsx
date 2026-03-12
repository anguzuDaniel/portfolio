"use client";

import Image from 'next/image';
import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket, ArrowUpRight } from 'lucide-react';

type LiveProject = {
    title: string;
    company?: string;
    role?: string;
    period?: string;
    status?: string;
    description: string;
    highlight?: string;
    tech?: string[];
    liveUrl: string;
};

const screenshotManifest: Record<string, string> = {
    adik: '/project_screenshots/adik.png',
    clipar: '/project_screenshots/clipar.png',
    dunam: '/project_screenshots/dunam.png',
    excelschools: '/project_screenshots/excel-schools.png',
    nooaenergies: '/project_screenshots/nooaenergies.png',
    stoicpips: '/project_screenshots/stoicpips.png',
};

const screenshotAliases: Record<string, string> = {
    dunamai: 'dunam',
    dunamvelocity: 'dunam',
    excelinternationalschools: 'excelschools',
    stoicpipslimited: 'stoicpips',
    velocity: 'dunam',
};

function normalizeKey(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getProjectScreenshot(project: LiveProject) {
    const candidates = [project.title, project.company];

    try {
        const hostname = new URL(project.liveUrl).hostname.replace(/^www\./, '');
        candidates.push(hostname, hostname.split('.')[0]);
    } catch {
        // Ignore malformed URLs and fall back to title/company matching.
    }

    for (const candidate of candidates) {
        if (!candidate) continue;

        const normalizedCandidate = normalizeKey(candidate);
        const alias = screenshotAliases[normalizedCandidate];
        const match =
            screenshotManifest[normalizedCandidate] ??
            (alias ? screenshotManifest[alias] : undefined) ??
            Object.entries(screenshotManifest).find(([key]) =>
                normalizedCandidate.includes(key) || key.includes(normalizedCandidate)
            )?.[1];

        if (match) return match;
    }

    return null;
}

// Stagger container for child animations
const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function LiveProjects() {
    if (!siteConfig.projects || siteConfig.projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="section-padding container-max relative">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mb-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
            >
                <div className="space-y-4">
                    <span className="section-kicker">Selected Work / Live Products</span>
                    <h2 className="section-title">
                        Case studies in trading, tooling, and digital product delivery.
                    </h2>
                </div>
                <p className="section-copy max-w-3xl lg:justify-self-end">
                    Live products built across fintech automation, creator workflows, and wellness.
                    The emphasis here is on shipped systems, not speculative concepts.
                </p>
            </motion.div>

            {/* Cards grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
                {siteConfig.projects.map((project: LiveProject, index: number) => {
                    const screenshot = getProjectScreenshot(project);
                    const isFeatured = index === 0;

                    return (
                        <motion.div
                            key={project.title}
                            variants={cardVariants}
                            className={`group relative ${isFeatured ? "md:col-span-2" : ""}`}
                        >
                            <div className="premium-card premium-card-hover flex h-full cursor-default flex-col overflow-hidden p-5 md:p-6 transition-shadow duration-300">

                                {/* ── Screenshot / hero area ── */}
                                <div
                                    className={`relative mb-6 overflow-hidden rounded-[1.75rem] border border-brand-200/20 bg-brand-950 ${
                                        isFeatured ? "min-h-[300px] md:min-h-[360px]" : "min-h-[240px]"
                                    }`}
                                >
                                    {screenshot ? (
                                        <>
                                            {/* Inner browser frame */}
                                            <div className="absolute inset-[16px] overflow-hidden rounded-[1.3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.32)]">
                                                <Image
                                                    src={screenshot}
                                                    alt={`${project.title} screenshot`}
                                                    fill
                                                    sizes={
                                                        isFeatured
                                                            ? "(max-width: 768px) 100vw, 900px"
                                                            : "(max-width: 768px) 100vw, 460px"
                                                    }
                                                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                />
                                                {/* Bottom fade so screenshot bleeds into card */}
                                                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(12,9,7,0.18)_100%)]" />
                                            </div>
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,173,104,0.12),transparent_32%),linear-gradient(160deg,rgba(17,12,8,0.04),rgba(42,25,14,0.14))]" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,173,104,0.24),transparent_34%),linear-gradient(160deg,rgba(17,12,8,0.96),rgba(42,25,14,0.88))]" />
                                            <div className="absolute inset-0 opacity-40 hero-grid" />
                                            {/* Centered fallback label */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[13px] font-black uppercase tracking-[0.22em] text-white/30">
                                                    {project.title}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {/* Traffic-light dots */}
                                    <div className="absolute left-5 top-5 flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-brand-300/80" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-brand-500/80" />
                                    </div>

                                    {/* Top-right badges */}
                                    <div className="absolute right-5 top-5 flex items-center gap-2.5">
                                        {screenshot && (
                                            <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/82 backdrop-blur-sm">
                                                Screenshot
                                            </span>
                                        )}
                                        {project.status && (
                                            <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/88 backdrop-blur-sm">
                                                {project.status}
                                            </span>
                                        )}
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/80 backdrop-blur-sm transition-colors duration-200 group-hover:bg-white/14">
                                            <Rocket size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* ── Content ── */}
                                <div className="flex flex-1 flex-col">

                                    {/* Title block */}
                                    <div className="mb-5">
                                        {project.company && (
                                            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#6b4423] dark:text-stone-400">
                                                {project.company}
                                            </p>
                                        )}
                                        <h3
                                            className={`font-display leading-[0.95] text-[#140e09] dark:text-stone-100 ${
                                                isFeatured
                                                    ? "text-[2.4rem] md:text-[2.8rem]"
                                                    : "text-[1.9rem] md:text-[2.2rem]"
                                            }`}
                                        >
                                            {project.title}
                                        </h3>
                                        {(project.role || project.period) && (
                                            <p className="mt-2.5 text-[14px] text-[#5b4331] dark:text-stone-400">
                                                {[project.role, project.period].filter(Boolean).join(" · ")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="mb-5 text-[15px] leading-[1.7] text-[#4c3524] dark:text-stone-300">
                                        {project.description}
                                    </p>

                                    {/* Highlight callout */}
                                    {project.highlight && (
                                        <div className="mb-6 flex gap-3 rounded-[1.4rem] border border-brand-200/30 bg-[rgba(255,248,240,0.92)] px-4 py-4 dark:border-brand-400/10 dark:bg-white/[0.03]">
                                            <span className="mt-[3px] flex-shrink-0 text-brand-500 dark:text-brand-400">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                                    <circle cx="7" cy="7" r="7" opacity="0.18" />
                                                    <circle cx="7" cy="7" r="3.5" />
                                                </svg>
                                            </span>
                                            <p className="text-[14px] leading-[1.65] text-[#4c3524] dark:text-stone-300">
                                                {project.highlight}
                                            </p>
                                        </div>
                                    )}

                                    {/* Tech chips */}
                                    {project.tech && project.tech.length > 0 && (
                                        <div className="mb-8 flex flex-wrap gap-2">
                                            {project.tech.map((item) => (
                                                <span key={item} className="label-chip">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="mt-auto flex items-center justify-between border-t border-stone-200/80 pt-5 dark:border-stone-800/70">
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#6b4423] dark:text-stone-400">
                                            Live deployment
                                        </span>
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/link inline-flex items-center gap-1.5 rounded-full border border-brand-200/40 bg-brand-50/60 px-4 py-2 text-[13px] font-bold text-brand-600 transition-all duration-200 hover:border-brand-300/60 hover:bg-brand-100/80 hover:text-brand-700 dark:border-brand-400/10 dark:bg-brand-400/5 dark:text-brand-300 dark:hover:bg-brand-400/10 dark:hover:text-brand-200"
                                        >
                                            Open Project
                                            <ArrowUpRight
                                                size={14}
                                                className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}