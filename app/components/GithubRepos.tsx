"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  readmeDescription?: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

function formatStars(count: number) {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }

  return `${count}`;
}

export default function GithubRepos({ repos }: { repos: Repo[] }) {
  if (repos.length === 0) {
    return null;
  }

  return (
    <section id="github-projects" className="section-padding container-max">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 max-w-3xl space-y-4"
      >
        <span className="section-kicker">Featured Repositories</span>
        <p className="section-copy">
          Public code samples presented in the same compact visual language as the projects gallery.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((repo: Repo, index: number) => (
          <motion.article
            key={repo.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="group"
          >
            <div className="relative h-full overflow-hidden rounded-[1.15rem] border border-brand-200/12 bg-[linear-gradient(180deg,rgba(34,24,17,0.95),rgba(20,14,10,0.98))] px-5 py-4 shadow-[0_20px_48px_rgba(0,0,0,0.22)]">
              <div className="absolute inset-0 opacity-60">
                <div className="absolute -left-10 top-0 h-24 w-24 rounded-full bg-brand-500/10 blur-2xl" />
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-brand-300/8 blur-2xl" />
              </div>

              <div className="relative flex h-full flex-col">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[1.45rem] leading-none text-stone-100">
                      {repo.name}
                    </h3>
                    <p className="mt-2 text-xs text-stone-400">Built for shipping products and developer workflows.</p>
                  </div>

                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-stone-400 transition-colors hover:text-stone-100"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <Github size={18} />
                  </a>
                </div>

                <p className="mb-4 text-[13px] leading-[1.55] text-stone-400">
                  {repo.readmeDescription || repo.description || "Clean repository structure with focused implementation and production-oriented patterns."}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {repo.stargazers_count > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold text-stone-200">
                      <Star size={10} className="fill-brand-300 text-brand-300" />
                      {formatStars(repo.stargazers_count)}
                    </span>
                  )}

                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.05] px-2.5 py-1 text-[10px] font-bold text-stone-200">
                      <span className="h-2 w-2 rounded-full bg-brand-400" />
                      {repo.language}
                    </span>
                  )}
                </div>

                <div className="mt-auto">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-brand-400/35 bg-brand-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-brand-100 transition-colors hover:border-brand-300/55 hover:bg-brand-400/16"
                  >
                    View Project
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
