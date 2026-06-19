"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, RefreshCw } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { MotionDiv } from "@/components/motion";

type GitHubLanguage = {
  name: string;
  value: number;
};

type GitHubProfile = {
  repositories: number;
  followers: number;
  stars: number;
  languages: GitHubLanguage[];
  languageCount: number;
};

type ContributionCell = {
  count: number;
};

const fallbackProfile: GitHubProfile = {
  repositories: 32,
  followers: 58,
  stars: 86,
  languageCount: 5,
  languages: [
    { name: "TypeScript", value: 42 },
    { name: "JavaScript", value: 28 },
    { name: "Python", value: 18 },
    { name: "SQL", value: 7 },
    { name: "Shell", value: 5 },
  ],
};

const metricDescriptions = {
  repositories: "Public builds and experiments",
  contributions: "Activity from GitHub graph",
  stars: "Open-source traction",
  followers: "Developer network",
  languages: "Primary technical range",
};

export function GitHubDashboard({ username = "Akash17-dev" }: { username?: string }) {
  const [profile, setProfile] = useState<GitHubProfile>(fallbackProfile);
  const [contributions, setContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadGitHubData() {
      setLoading(true);
      setError("");

      try {
        const [profileResponse, contributionResponse] = await Promise.all([
          fetch(`/api/github-profile?username=${username}`, { cache: "no-store" }),
          fetch(`/api/github-contributions?username=${username}`, { cache: "no-store" }),
        ]);

        const [profileData, contributionData] = await Promise.all([
          profileResponse.json(),
          contributionResponse.json(),
        ]);

        if (!cancelled && profileResponse.ok) {
          setProfile({
            repositories: Number(profileData.repositories) || fallbackProfile.repositories,
            followers: Number(profileData.followers) || 0,
            stars: Number(profileData.stars) || 0,
            languageCount: Number(profileData.languageCount) || fallbackProfile.languageCount,
            languages: Array.isArray(profileData.languages) && profileData.languages.length
              ? profileData.languages
              : fallbackProfile.languages,
          });
        }

        if (!cancelled && contributionResponse.ok && Array.isArray(contributionData.contributions)) {
          const total = contributionData.contributions.reduce((sum: number, cell: ContributionCell) => sum + Number(cell.count || 0), 0);
          setContributions(total);
        }
        if (!cancelled && (!profileResponse.ok || !contributionResponse.ok)) {
          setError("Live GitHub data is temporarily unavailable. Showing cached portfolio defaults.");
        }
      } catch {
        if (!cancelled) {
          setError("Live GitHub data is temporarily unavailable. Showing cached portfolio defaults.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGitHubData();

    return () => {
      cancelled = true;
    };
  }, [reloadKey, username]);

  const metrics = useMemo(
    () => [
      ["Repositories", profile.repositories, metricDescriptions.repositories, true],
      ["Contributions", contributions, metricDescriptions.contributions, true],
      ["Stars", profile.stars, metricDescriptions.stars, true],
      ["Followers", profile.followers, metricDescriptions.followers, true],
      ["Languages", profile.languageCount, metricDescriptions.languages, false],
    ] as const,
    [contributions, profile.followers, profile.languageCount, profile.repositories, profile.stars],
  );

  return (
    <div className="calm-panel overflow-hidden rounded-[2rem] p-5 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
            <Github className="h-4 w-4" />
            {username}
          </div>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-white/[0.82]">
            Live public activity across full-stack systems, AI experiments, product prototypes, and security-focused learning.
          </p>
          <a href={`https://github.com/${username}`} className="liquid-button mt-5 min-h-10 bg-white/[0.04] px-4 py-2">
            <span className="relative z-10">View GitHub Activity</span>
            <Github className="relative z-10 h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Consistent commits", "Production repos", "Learning in public"].map((label) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm font-semibold text-white/[0.7]">
              {label}
            </div>
          ))}
        </div>
      </div>

      {error ? (
        <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral sm:flex-row sm:items-center sm:justify-between">
          <span>{error}</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 font-bold text-white transition hover:text-cyan"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Retry
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      ) : null}

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map(([label, value, description, showSuffix]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-black/15 p-4 transition duration-300 hover:border-cyan/30 hover:bg-white/[0.045]">
            <div className="text-3xl font-black text-white">
              {loading && value === 0 ? "..." : <AnimatedCounter value={value} suffix={showSuffix && value > 0 ? "+" : ""} />}
            </div>
            <p className="mt-2 text-sm font-semibold text-white/[0.78]">{label}</p>
            <p className="mt-1 text-xs leading-5 text-white/[0.45]">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-5">
        {profile.languages.map((language) => (
          <div key={language.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold text-white/[0.68]">
              <span>{language.name}</span>
              <span className="text-white/[0.4]">{language.value}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <MotionDiv
                className="h-full rounded-full bg-gradient-to-r from-cyan via-mint to-violet"
                initial={{ width: 0 }}
                whileInView={{ width: `${language.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>

      <GitHubContributionGraph username={username} reloadKey={reloadKey} />
    </div>
  );
}
