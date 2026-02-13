// lib/github.ts
export async function getGithubRepos() {
  const username = "anguzuDaniel"; // Replace with your actual username

  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
    next: { revalidate: 3600 } // This refreshes the data every hour
  });

  if (!res.ok) throw new Error('Failed to fetch repos');

  const repos = await res.json();

  return repos.filter((repo: { fork: boolean }) => !repo.fork);
}

export async function getRepoDescription(repoName: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/anguzuDaniel/${repoName}/readme`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    // GitHub sends README as Base64. We need to decode it.
    const decodedContent = Buffer.from(data.content, 'base64').toString('utf-8');

    // Clean up the text: Take the first 150 characters and remove Markdown symbols
    return decodedContent
      .replace(/[#*`]/g, '')
      .split('\n')
      .find(line => line.trim().length > 10)
      ?.substring(0, 160) + "...";

  } catch {
    return null;
  }
}
