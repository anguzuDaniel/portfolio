"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

export default function ProjectCard({ repo }: { repo: { name: string, description: string | null, readmeDescription?: string, html_url: string, language: string | null, stargazers_count: number, forks_count: number } }) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group premium-card premium-card-hover relative p-8 flex flex-col h-full overflow-hidden"
        >
            {/* 1. Subtle Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header: Icon & Stats */}
                <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-900 dark:text-zinc-100 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                        <Github size={24} />
                    </div>
                    <div className="flex gap-2">
                        {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100/50 dark:bg-zinc-800/50 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                {repo.stargazers_count}
                            </div>
                        )}
                        {repo.forks_count > 0 && (
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-100/50 dark:bg-zinc-800/50 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                                <GitFork size={12} />
                                {repo.forks_count}
                            </div>
                        )}
                    </div>
                </div>

                {/* Title: Using the text-gradient class from your CSS */}
                <h3 className="text-xl font-display font-bold text-zinc-950 dark:text-zinc-100 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-tight">
                    {repo.name.replace(/-/g, ' ')}
                </h3>

                {/* Description: Improved line-height and color contrast */}
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8 flex-grow line-clamp-3">
                    {repo.readmeDescription || repo.description || "Sophisticated technical implementation featuring modular architecture and modern patterns."}
                </p>

                {/* Footer: Border and Links */}
                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        {repo.language && (
                            <span className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-brand-500" />
                                {repo.language}
                            </span>
                        )}
                    </div>

                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group/link"
                    >
                        View Project
                        <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}