"use client";

import { FaGithub } from 'react-icons/fa';
import ProjectCard from './ProjectCard'; // Ensure you import the card we just fixed

export default function GithubProjects({ repos, github }: { repos: any, github: any }) {
    return (
      <section id="projects" className="section-padding px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            {/* Using the text-gradient class from your CSS for the heading */}
            <h2 className="text-4xl md:text-5xl font-display font-black text-zinc-900 dark:text-white tracking-tight">
              Live Projects
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-lg font-medium">
              A curated selection of my latest open-source contributions and systems.
            </p>
          </div>
          
          <a 
            href={github} 
            target="_blank"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-bold border border-zinc-200 dark:border-zinc-700 hover:border-brand-500 transition-all shadow-sm"
          >
            <FaGithub className="group-hover:rotate-12 transition-transform" />
            view_all_repos()
          </a>
        </div>
        
        {/* MODERN GRID: Staggered Bento-like columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo: any) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      </section>
    );
}