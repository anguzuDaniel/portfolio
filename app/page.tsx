import { Github, ExternalLink, Code2, Cpu, Globe, Mail } from 'lucide-react';
import { getGithubRepos } from '@/lib/github';
import Hero from './components/Hero';
import About from './components/About';
import { siteConfig } from '@/config/profile';
import { ModeToggle } from './components/ModeToggle';

export default async function Page() {
  const repos = await getGithubRepos();

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-300 transition-colors duration-300">
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <Hero />
      <About />

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 bg-slate-50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* These now match the keys in your profile.ts */}
            <SkillCard 
              icon={<Code2 className="text-cyan-600 dark:text-cyan-500" />} 
              title="Frontend" 
              list={siteConfig.skills.frontend.join(", ")} 
            />
            <SkillCard 
              icon={<Cpu className="text-cyan-600 dark:text-cyan-500" />} 
              title="Backend" 
              list={siteConfig.skills.backend.join(", ")} 
            />
            <SkillCard 
              icon={<Globe className="text-cyan-600 dark:text-cyan-500" />} 
              title="Tools & Branches" 
              list={siteConfig.skills.tools.join(", ")} 
            />
          </div>
        </div>
      </section>

      {/* GITHUB REPOS SECTION */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Open Source Work</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo: any) => (
            <div key={repo.id} className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 hover:border-cyan-500 transition-all flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{repo.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                  {repo.description || "Software solution developed for regional impact."}
                </p>
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

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 text-center">
        <div className="max-w-xl mx-auto bg-slate-100 dark:bg-gradient-to-b dark:from-cyan-900/20 dark:to-transparent p-12 rounded-3xl border border-slate-200 dark:border-cyan-500/10 shadow-lg">
          <Mail className="mx-auto mb-6 text-cyan-600 dark:text-cyan-500" size={40} />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Let's work together</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Currently looking for new opportunities in software development.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-xl font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition inline-block">
            Send me an Email
          </a>
        </div>
      </section>
      
      <footer className="py-10 text-center text-slate-500 text-xs">
        © 2026 {siteConfig.name} • Built with Next.js
      </footer>
    </main>
  );
}

function SkillCard({ icon, title, list }: { icon: any, title: string, list: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 group">
      <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed">{list}</p>
    </div>
  );
}