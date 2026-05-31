import { NextResponse } from "next/server";

type ContributionCell = {
  date: string;
  count: number;
  level: number;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get("username") || "Akash17-dev";

  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml",
      "User-Agent": "Next.js",
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to fetch GitHub contributions." }, { status: response.status });
  }

  const html = await response.text();
  const contributions: ContributionCell[] = [];

  const tdRegex = /<td[^>]+data-date="([^"]+)"[^>]+data-level="(\d+)"[^>]*>[\s\S]*?<\/td>/g;
  let match: RegExpExecArray | null = null;

  while ((match = tdRegex.exec(html)) !== null) {
    const date = match[1];
    const level = Number(match[2]);
    let count = 0;

    const rest = html.slice(match.index + match[0].length, match.index + match[0].length + 300);
    const tooltipMatch = rest.match(/<tool-tip[^>]*>([^<]+)<\/tool-tip>/);
    if (tooltipMatch) {
      const label = tooltipMatch[1].replace(/\s+/g, " ").trim();
      const countMatch = label.match(/(\d+) contribution/);
      count = countMatch ? Number(countMatch[1]) : 0;
    }

    if (count === 0 && level > 0) {
      count = 1;
    }

    contributions.push({ date, count, level });
  }

  if (contributions.length === 0) {
    const rectRegex = /<rect[^>]+data-date="([^"]+)"[^>]+data-count="(\d+)"[^>]+data-level="(\d+)"[^>]*>/g;
    while ((match = rectRegex.exec(html)) !== null) {
      contributions.push({
        date: match[1],
        count: Number(match[2]),
        level: Number(match[3]),
      });
    }
  }

  return NextResponse.json(
    { contributions },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
