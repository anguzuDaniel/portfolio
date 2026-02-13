import { getGithubRepos, getRepoDescription } from '@/lib/github';
import Hero from './components/Hero';
import About from './components/About';
import { siteConfig } from '@/config/profile';
import ContactForm from './components/ContactForm';
import GithubRepos from './components/GithubRepos';
import Skills from './components/Skills';

export default async function Page() {
  const repos = await getGithubRepos();

  // 1. Filter to only show the repos you chose in siteConfig
  const filteredRepos = repos.filter((repo: { name: string }) =>
    siteConfig.featuredRepos.includes(repo.name)
  );

  const reposWithReadme = await Promise.all(
    filteredRepos.map(async (repo: { name: string, id: number, description: string | null, html_url: string, language: string | null, stargazers_count: number, forks_count: number }) => {
      const readmeText = await getRepoDescription(repo.name);
      return {
        ...repo,
        readmeDescription: readmeText, // Adding the new field here
      };
    })
  );

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Hero />
      <About />


      {/* SKILLS SECTION */}
      <Skills siteConfig={siteConfig} />

      {/* GITHUB REPOS SECTION */}
      <GithubRepos repos={reposWithReadme} />

      {/* CONTACT SECTION */}
      <ContactForm />

      <footer className="py-10 text-center text-slate-500 text-xs">
        © 2026 {siteConfig.name} • Built with Next.js
      </footer>
    </main>
  );
}