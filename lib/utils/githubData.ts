/* eslint-disable no-console */
// utils/githubData.ts
import axios from "axios";

export const fetchGitHubData = async (username: string) => {
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const repos = await axios.get(reposUrl);
    const totalRepos = repos.data.length;

    // Fetch total commits for each repository
    const commitCounts = await Promise.all(
      repos.data.map(async (repo: { name: string }) => {
        const commitsUrl = `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`; // Fetch just one commit to get commit count
        const commitsResponse = await axios.get(commitsUrl);
        const totalCommits = parseInt(
          commitsResponse.headers["link"]?.match(
            /&page=(\d+)>; rel="last"/,
          )?.[1] || "1",
        );

        return totalCommits;
      }),
    );

    const totalCommits = commitCounts.reduce((acc, curr) => acc + curr, 0);

    return { totalRepos, totalCommits };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);

    return { totalRepos: 0, totalCommits: 0 };
  }
};
