import { Github } from "lucide-react";

export default function GithubRepos({ repos }: { repos: any }) {
    return (
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Open Source Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: any) => (
            <div key={repo.id} className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-cyan-500 transition-all flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{repo.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                    {repo.readmeDescription || repo.description || "Building impactful tools across various school branches."}                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-400/10 px-2 py-1 rounded">
                  {repo.language || 'Code'}
                </span>
                <a href={repo.html_url} target="_blank" className="text-slate-500 hover:text-cyan-500 transition">
                  <Github size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
}