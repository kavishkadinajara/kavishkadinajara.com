/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
// utils/githubData.ts
import axios from "axios";

export const fetchGitHubData = async (username: string) => {
  try {
    // Get user info for repo count
    const userUrl = `https://api.github.com/users/${username}`;
    const userRes = await axios.get(userUrl);
    const totalRepos = userRes.data.public_repos || 0;

    // Get all public repos (max 100 per page)
    const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    const reposRes = await axios.get(reposUrl);
    const repos = reposRes.data;

    // For each repo, get the commit count using the 'Get a repository' API
    // (the 'commits' API is rate-limited and not reliable for total count)
    const commitCounts = await Promise.all(
      repos.map(async (repo: { name: string }) => {
        try {
          const repoUrl = `https://api.github.com/repos/${username}/${repo.name}`;
          const repoRes = await axios.get(repoUrl);
          // Use 'repoRes.data' to get commit count from 'default_branch'
          const branch = repoRes.data.default_branch;
          const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?sha=${branch}&per_page=1`;
          const commitsRes = await axios.get(commitsUrl);
          // Get commit count from the 'Link' header if paginated
          const link = commitsRes.headers["link"];
          if (link) {
            const match = link.match(/&page=(\d+)>; rel="last"/);
            return match ? parseInt(match[1], 10) : 1;
          }
          return commitsRes.data.length || 1;
        } catch {
          return 0;
        }
      }),
    );

    const totalCommits = commitCounts.reduce((acc, curr) => acc + curr, 0);

    return { totalRepos, totalCommits };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return { totalRepos: 0, totalCommits: 0 };
  }
};
