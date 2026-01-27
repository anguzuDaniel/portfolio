import { Github, ExternalLink, Code2, Cpu, Globe, Mail } from 'lucide-react';
import { getGithubRepos, getRepoDescription } from '@/lib/github';
import Hero from './components/Hero';
import About from './components/About';
import { siteConfig } from '@/config/profile';
import { ModeToggle } from './components/ModeToggle';
import ContactForm from './components/ContactForm';
import GithubRepos from './components/GithubRepos';
import Skills from './components/Skills';
import { read } from 'fs';

export default async function Page() {
  const repos = await getGithubRepos();

  // 1. Filter to only show the repos you chose in siteConfig
  const filteredRepos = repos.filter((repo: any) => 
    siteConfig.featuredRepos.includes(repo.name)
  );
  
  const reposWithReadme = await Promise.all(
    filteredRepos.map(async (repo: any) => {
      const readmeText = await getRepoDescription(repo.name);
      return {
        ...repo,
        readmeDescription: readmeText, // Adding the new field here
      };
    })
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-300 transition-colors duration-300">
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <Hero />
      <About />

      {/* SKILLS SECTION */}
      <Skills siteConfig={siteConfig} />

      {/* GITHUB REPOS SECTION */}
      <GithubRepos repos={reposWithReadme} />

      {/* CONTACT SECTION */}
      <ContactForm siteConfig={siteConfig} />
      
      <footer className="py-10 text-center text-slate-500 text-xs">
        © 2026 {siteConfig.name} • Built with Next.js
      </footer>
    </main>
  );
}