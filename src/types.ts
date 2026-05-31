export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  techStack: string[];
  keyFeatures: string[];
  results: string;
  image: string; // Dynamic Canvas or Gradient-based abstract visual key
  url?: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  skills: string[];
  color: string;
  iconName: string;
}

export interface Milestone {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  iconName: string;
  category: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  url: string;
}

export interface GithubMetrics {
  totalContributions: number;
  streakDays: number;
  publicRepos: number;
  activityRate: string;
}
