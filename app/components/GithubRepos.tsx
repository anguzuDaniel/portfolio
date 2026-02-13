"use client";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  readmeDescription?: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export default function GithubRepos({ repos }: { repos: Repo[] }) {
  return (
    <section id="projects" className="section-padding px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-display font-black text-zinc-900 dark:text-white mb-4 tracking-tighter">
          Featured Projects
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
          A selection of my professional work and open-source contributions.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo: Repo, index: number) => (

          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard repo={repo} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
