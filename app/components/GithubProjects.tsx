import { FaGithub } from 'react-icons/fa';

export default function GithubProjects({ repos, github }: { repos: any, github: any }) {
    return (
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white">Live Projects</h2>
            <p className="text-slate-500 mt-2">Fetched directly from my GitHub activity.</p>
          </div>
          <a href={github} className="text-cyan-500 hover:underline text-sm font-mono">view_all_repos()</a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: any) => (
            <div key={repo.id} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{repo.name}</h3>
                <p className="text-sm text-slate-400 mb-6">{repo.description || "Project developed for school branch optimization."}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">{repo.language}</span>
                <a href={repo.html_url} target="_blank"><FaGithub size={18} className="text-slate-500 hover:text-white transition" /></a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
}