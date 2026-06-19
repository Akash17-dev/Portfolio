"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

type ContributionCell = {
  date: string;
  count: number;
  level: number;
};

type DayCell = {
  date: Date;
  key: string;
  count: number;
  level: number;
  inRange: boolean;
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const levels = ["bg-[#161b22]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateFromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getLevel(count: number, level: number) {
  if (level > 0) {
    return Math.min(4, level);
  }

  if (count === 0) return 0;
  if (count < 2) return 1;
  if (count < 4) return 2;
  if (count < 7) return 3;
  return 4;
}

function buildCalendar(counts: Map<string, { count: number; level: number }>) {
  const contributionDates = Array.from(counts.keys()).sort();
  const latestContributionDate = contributionDates.at(-1);
  const earliestContributionDate = contributionDates.at(0);
  const end = latestContributionDate ? dateFromKey(latestContributionDate) : startOfDay(new Date());
  const start = earliestContributionDate ? dateFromKey(earliestContributionDate) : new Date(end);

  if (!earliestContributionDate) {
    start.setFullYear(start.getFullYear() - 1);
    start.setDate(start.getDate() + 1);
  }

  const gridStart = new Date(start);
  gridStart.setDate(gridStart.getDate() - ((gridStart.getDay() + 6) % 7));

  const gridEnd = new Date(end);
  gridEnd.setDate(gridEnd.getDate() + (6 - ((gridEnd.getDay() + 6) % 7)));

  const weeks: DayCell[][] = [];
  const cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    const week: DayCell[] = [];

    for (let index = 0; index < 7; index += 1) {
      const current = new Date(cursor);
      const key = dateKey(current);
      const contribution = counts.get(key);
      week.push({
        date: current,
        key,
        count: contribution?.count ?? 0,
        level: contribution?.level ?? 0,
        inRange: current >= start && current <= end,
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(week);
  }

  const monthLabels: { label: string; column: number }[] = [];
  let previousMonth = -1;

  weeks.forEach((week, column) => {
    const firstInRange = week.find((day) => day.inRange && day.date.getDate() <= 7);
    if (firstInRange && firstInRange.date.getMonth() !== previousMonth) {
      previousMonth = firstInRange.date.getMonth();
      monthLabels.push({ label: monthNames[previousMonth], column: column + 1 });
    }
  });

  return { weeks, monthLabels };
}

export function GitHubContributionGraph({
  username = "Akash17-dev",
  reloadKey = 0,
}: {
  username?: string;
  reloadKey?: number;
}) {
  const [counts, setCounts] = useState<Map<string, { count: number; level: number }>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [localReloadKey, setLocalReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadContributions() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/github-contributions?username=${username}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok || !Array.isArray(data.contributions)) {
          if (!cancelled) {
            setError("Contribution graph could not sync.");
          }
          return;
        }

        const nextCounts = new Map<string, { count: number; level: number }>();
        data.contributions.forEach((cell: ContributionCell) => {
          nextCounts.set(cell.date, { count: cell.count, level: cell.level });
        });

        if (!cancelled) {
          setCounts(nextCounts);
        }
      } catch {
        if (!cancelled) {
          setError("Contribution graph could not sync.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadContributions();

    return () => {
      cancelled = true;
    };
  }, [localReloadKey, reloadKey, username]);

  const { weeks, monthLabels } = useMemo(() => buildCalendar(counts), [counts]);
  const total = useMemo(() => Array.from(counts.values()).reduce((sum, value) => sum + value.count, 0), [counts]);

  return (
    <div className="mt-8 rounded-[1.35rem] border border-white/12 bg-[#0d1117]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Contribution Activity</h3>
          <p className="text-sm leading-6 text-white/50">
            {loading
              ? "Syncing public GitHub contributions..."
              : error || `${total}+ public activity signals in the last year`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {error ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-coral transition hover:text-white"
              onClick={() => setLocalReloadKey((key) => key + 1)}
            >
              Retry
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          ) : null}
          <a
            href={`https://github.com/${username}`}
            className="inline-flex items-center text-sm font-semibold text-cyan transition hover:text-white"
          >
            View GitHub
          </a>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-4 pb-3">
        <div className="inline-block min-w-max">
          <div className="ml-[3.75rem] grid auto-cols-[11px] grid-flow-col gap-[3px] text-sm font-semibold text-white/80">
            {monthLabels.map((month) => (
              <span key={`${month.label}-${month.column}`} style={{ gridColumnStart: month.column }}>
                {month.label}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-[3rem_1fr] gap-3">
            <div className="grid grid-rows-7 gap-[3px] text-sm font-semibold text-white/78">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div className="grid auto-cols-[11px] grid-flow-col gap-[3px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.key}
                      title={day.count > 0 ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.key}` : `No contributions on ${day.key}`}
                      className={`h-[11px] w-[11px] rounded-[3px] transition hover:ring-1 hover:ring-white/60 ${day.inRange ? levels[getLevel(day.count, day.level)] : "bg-transparent"}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-6 text-sm text-white/55">
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
              className="transition hover:text-cyan"
            >
              Learn how we count contributions
            </a>
            <div className="flex items-center gap-2">
              <span>Less</span>
              {levels.map((level, index) => (
                <span key={level} className={`h-[11px] w-[11px] rounded-[0.22rem] ${index === 0 ? "bg-[#161b22]" : level}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
