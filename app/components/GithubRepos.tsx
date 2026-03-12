"use client";

import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

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

export default function GithubRepos({ repos }: { repos: Repo[] }) {
  if (repos.length === 0) {
    return null;
  }

  return (
    <section id="github-projects" className="section-padding container-max">
      <motion.div
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
      >
        <div className="space-y-4">
          <span className="section-kicker">Repositories / Public Code</span>
          <h2 className="section-title">
            Featured repositories that show structure, range, and implementation taste.
          </h2>
        </div>
        <p className="section-copy max-w-3xl lg:justify-self-end">
          A smaller set of public work that reflects production thinking, experiments, and how I organize software beyond the UI layer.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {repos.map((repo: Repo, index: number) => (

          <motion.div
            key={repo.id}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
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
