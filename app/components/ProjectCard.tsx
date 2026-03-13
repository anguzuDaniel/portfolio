"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

export default function ProjectCard({ repo }: { repo: { name: string, description: string | null, readmeDescription?: string | null, html_url: string, language: string | null, stargazers_count: number, forks_count: number } }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group premium-card premium-card-hover relative flex h-full flex-col p-7"
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-7 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-200/45 bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-500 group-hover:text-white dark:border-brand-400/15 dark:bg-brand-950/60 dark:text-brand-300 dark:group-hover:bg-brand-500">
                        <Github size={20} />
                    </div>
                    <div className="flex gap-1.5">
                        {repo.stargazers_count > 0 && (
                            <div className="label-chip flex items-center gap-1">
                                <Star size={11} className="text-amber-500 fill-amber-500" />
                                {repo.stargazers_count}
                            </div>
                        )}
                        {repo.forks_count > 0 && (
                            <div className="label-chip flex items-center gap-1">
                                <GitFork size={11} />
                                {repo.forks_count}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#6b4423] dark:text-stone-400">
                    Repository
                </div>
                <h3 className="mb-3 text-2xl font-display leading-snug tracking-tight dark:text-[#140e09] transition-colors group-hover:text-brand-800 dark:text-stone-50 dark:group-hover:text-brand-300">
                    {repo.name.replace(/-/g, ' ')}
                </h3>

                <p className="mb-8 flex-grow text-[15px] leading-relaxed text-[#4c3524] dark:text-stone-400">
                    {repo.readmeDescription || repo.description || "Sophisticated technical implementation featuring modular architecture and modern patterns."}
                </p>

                <div className="flex items-center justify-between border-t border-stone-200/80 pt-5 dark:border-stone-800/70">
                    <div className="flex items-center gap-3">
                        {repo.language && (
                            <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#6b4423] dark:text-stone-400">
                                <span className="w-2 h-2 rounded-full bg-brand-500" />
                                {repo.language}
                            </span>
                        )}
                    </div>

                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                    >
                        View Project
                        <ExternalLink size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
