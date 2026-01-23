// lib/github.ts
export async function getGithubRepos() {
  const username = "anguzuDaniel"; // Replace with your actual username
  
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
    next: { revalidate: 3600 } // This refreshes the data every hour
  });

  if (!res.ok) throw new Error('Failed to fetch repos');
  
  const repos = await res.json();
  
  // Filter for projects you actually want to show (optional)
  return repos.filter((repo: any) => !repo.fork);
}