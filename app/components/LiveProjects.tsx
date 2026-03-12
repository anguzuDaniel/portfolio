"use client";

import Image from 'next/image';
import { siteConfig } from '@/config/profile';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';

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

export default function LiveProjects() {
    if (!siteConfig.projects || siteConfig.projects.length === 0) {
        return null;
    }

    return (
        <section id="projects" className="section-padding container-max relative">
            <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
            >
                <div className="space-y-4">
                    <span className="section-kicker">Selected Work / Live Products</span>
                    <h2 className="section-title">
                        Case studies in trading, tooling, and digital product delivery.
                    </h2>
                </div>
                <p className="section-copy max-w-3xl lg:justify-self-end">
                    Live products built across fintech automation, creator workflows, and wellness. The emphasis here is on shipped systems, not speculative concepts.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {siteConfig.projects.map((project: LiveProject, index) => (
                    (() => {
                        const screenshot = getProjectScreenshot(project);

                        return (
                            <motion.div
                                key={project.title}
                                initial={{ y: 20 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative ${index === 0 ? "md:col-span-2" : ""}`}
                            >
                                <div className="premium-card premium-card-hover flex h-full cursor-default flex-col p-5 md:p-6">
                                    <div className={`relative mb-6 overflow-hidden rounded-[1.75rem] border border-brand-200/20 bg-brand-950 ${index === 0 ? "min-h-[260px]" : "min-h-[220px]"}`}>
                                        {screenshot ? (
                                            <>
                                                <div className="absolute inset-[14px] overflow-hidden rounded-[1.3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
                                                    <Image
                                                        src={screenshot}
                                                        alt={`${project.title} screenshot`}
                                                        fill
                                                        sizes={index === 0 ? "(max-width: 768px) 100vw, 900px" : "(max-width: 768px) 100vw, 460px"}
                                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                                                    />
                                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,9,7,0.1)_0%,rgba(12,9,7,0.18)_34%,rgba(12,9,7,0.78)_100%)]" />
                                                </div>
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,173,104,0.12),transparent_34%),linear-gradient(160deg,rgba(17,12,8,0.12),rgba(42,25,14,0.34))]" />
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,173,104,0.24),transparent_34%),linear-gradient(160deg,rgba(17,12,8,0.96),rgba(42,25,14,0.88))]" />
                                                <div className="absolute inset-0 opacity-40 hero-grid" />
                                            </>
                                        )}
                                        <div className="absolute left-5 top-5 flex gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-brand-300/80" />
                                            <span className="h-2.5 w-2.5 rounded-full bg-brand-500/80" />
                                        </div>
                                        <div className="absolute right-5 top-5 flex items-center gap-3">
                                            {screenshot && (
                                                <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/82 backdrop-blur-sm">
                                                    Screenshot
                                                </span>
                                            )}
                                            {project.status && (
                                                <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                                                    {project.status}
                                                </span>
                                            )}
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/80 backdrop-blur-sm">
                                                <Rocket size={20} />
                                            </div>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-6">
                                            {project.company && (
                                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-brand-100/75">
                                                    {project.company}
                                                </p>
                                            )}
                                            <h3 className="text-3xl font-display text-white md:text-4xl">
                                                {project.title}
                                            </h3>
                                            {(project.role || project.period) && (
                                                <p className="mt-3 text-sm text-white/70">
                                                    {[project.role, project.period].filter(Boolean).join(" / ")}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <p className="mb-6 leading-relaxed text-[#4c3524] dark:text-stone-300">
                                            {project.description}
                                        </p>

                                        {project.highlight && (
                                            <div className="mb-6 rounded-[1.4rem] border border-brand-200/30 bg-[rgba(255,248,240,0.92)] px-4 py-4 text-sm leading-relaxed text-[#4c3524] dark:border-brand-400/10 dark:bg-white/[0.03] dark:text-stone-300">
                                                {project.highlight}
                                            </div>
                                        )}

                                        {project.tech && project.tech.length > 0 && (
                                            <div className="mb-8 flex flex-wrap gap-2.5">
                                                {project.tech.map((item) => (
                                                    <span key={item} className="label-chip">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="mt-auto flex items-center justify-between border-t border-stone-200/80 pt-5 dark:border-stone-800/70">
                                            <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#6b4423] dark:text-stone-400">
                                                Live deployment
                                            </span>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"
                                            >
                                                Open Project
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })()
                ))}
            </div>
        </section>
    );
}
