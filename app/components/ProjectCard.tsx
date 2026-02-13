"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";

export default function ProjectCard({ repo }: { repo: { name: string, description: string | null, readmeDescription?: string, html_url: string, language: string | null, stargazers_count: number, forks_count: number } }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="group premium-card premium-card-hover p-8 flex flex-col h-full"
        >

            <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    <Github size={28} />
                </div>
                <div className="flex gap-3">
                    {repo.stargazers_count > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            {repo.stargazers_count}
                        </div>
                    )}
                    {repo.forks_count > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50">
                            <GitFork size={14} />
                            {repo.forks_count}
                        </div>
                    )}
                </div>
            </div>

            <h3 className="text-2xl font-display font-black text-zinc-900 dark:text-white mb-4 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors tracking-tight">
                {repo.name.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h3>

            <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 flex-grow line-clamp-3 leading-relaxed font-medium">
                {repo.readmeDescription || repo.description || "A sophisticated technical implementation showcasing advanced development patterns and modular architecture."}
            </p>

            <div className="flex items-center justify-between mt-auto pt-8 border-t border-zinc-100 dark:border-zinc-800/50">
                <div className="flex items-center gap-3">
                    {repo.language && (
                        <span className="flex items-center gap-2 text-xs font-black text-zinc-500 uppercase tracking-widest">
                            <span className="w-2.5 h-2.5 rounded-full bg-brand-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                            {repo.language}
                        </span>
                    )}
                </div>

                <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-500/10 transition-all border border-zinc-200/50 dark:border-zinc-800/50"
                >
                    <ExternalLink size={20} />
                </a>
            </div>
        </motion.div>

    );
}
