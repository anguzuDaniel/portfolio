"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

export default function ProjectCard({ repo }: { repo: { name: string, description: string | null, readmeDescription?: string, html_url: string, language: string | null, stargazers_count: number, forks_count: number } }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group premium-card premium-card-hover relative p-8 flex flex-col h-full"
        >
            {/* Hover accent — top edge gradient stripe */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon & Stats */}
                <div className="flex justify-between items-start mb-6">
                    <div className="w-11 h-11 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 border border-zinc-200/60 dark:border-zinc-700/40">
                        <Github size={20} />
                    </div>
                    <div className="flex gap-1.5">
                        {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/40">
                                <Star size={11} className="text-amber-500 fill-amber-500" />
                                {repo.stargazers_count}
                            </div>
                        )}
                        {repo.forks_count > 0 && (
                            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/40">
                                <GitFork size={11} />
                                {repo.forks_count}
                            </div>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-tight leading-snug">
                    {repo.name.replace(/-/g, ' ')}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 mb-8 flex-grow line-clamp-3">
                    {repo.readmeDescription || repo.description || "Sophisticated technical implementation featuring modular architecture and modern patterns."}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        {repo.language && (
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-brand-500" />
                                {repo.language}
                            </span>
                        )}
                    </div>

                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group/link"
                    >
                        View Project
                        <ExternalLink size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}