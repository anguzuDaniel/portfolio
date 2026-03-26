import { siteConfig } from '@/config/profile';
import { getGithubRepos, getRepoDescription } from '@/lib/github';
import ContactForm from './components/ContactForm';
import Credentials from './components/Credentials';
import Experience from './components/Experience';
import GithubRepos from './components/GithubRepos';
import Hero from './components/Hero';
import LiveProjects from './components/LiveProjects';

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
      <Experience />
      <LiveProjects />
      <GithubRepos repos={reposWithReadme} />
      <Credentials />
      <ContactForm />

      <footer className="border-t border-[rgba(122,65,23,0.12)] py-10 text-center text-slate-500 text-xs dark:border-white/6">
        © 2026 {siteConfig.name}
      </footer>
    </main>
  );
}
