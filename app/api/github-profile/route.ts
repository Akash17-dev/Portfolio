import { NextResponse } from "next/server";

type GitHubUser = {
  public_repos: number;
  followers: number;
};

type GitHubRepo = {
  fork: boolean;
  language: string | null;
  stargazers_count: number;
};

const fallbackLanguages = [
  { name: "TypeScript", value: 42 },
  { name: "JavaScript", value: 28 },
  { name: "Python", value: 18 },
  { name: "SQL", value: 7 },
  { name: "Shell", value: 5 },
];

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "Akash-Aakula-Portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function normalizeLanguageStats(repos: GitHubRepo[]) {
  const languageCounts = new Map<string, number>();

  repos.forEach((repo) => {
    if (!repo.language) return;
    languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  });

  const total = Array.from(languageCounts.values()).reduce((sum, count) => sum + count, 0);

  if (total === 0) {
    return fallbackLanguages;
  }

  return Array.from(languageCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      value: Math.max(4, Math.round((count / total) * 100)),
    }));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username") || "Akash17-dev";

  const [userResponse, reposResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: githubHeaders(),
      next: { revalidate: 3600 },
    }),
  ]);

  if (!userResponse.ok || !reposResponse.ok) {
    return NextResponse.json({ error: "Unable to fetch GitHub profile data." }, { status: 502 });
  }

  const user = (await userResponse.json()) as GitHubUser;
  const repos = (await reposResponse.json()) as GitHubRepo[];
  const sourceRepos = repos.filter((repo) => !repo.fork);
  const stars = sourceRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const languages = normalizeLanguageStats(sourceRepos.length ? sourceRepos : repos);

  return NextResponse.json(
    {
      repositories: user.public_repos,
      followers: user.followers,
      stars,
      languages,
      languageCount: languages.length,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
