import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

let clientPromise: Promise<MongoClient> | null = null;

function cleanEnvValue(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return "";

  return trimmed.replace(/^['"]|['"]$/g, "");
}

function getMongoClient() {
  const uri = cleanEnvValue(process.env.MONGODB_URI);

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  clientPromise ??= new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  }).connect();

  return clientPromise;
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
}

function formatTelegramMessage({
  path,
  referrer,
  timezone,
  language,
}: {
  path: string;
  referrer: string;
  timezone: string;
  language: string;
}) {
  const lines = [
    "Portfolio opened",
    `Path: ${path || "/"}`,
    referrer ? `Referrer: ${referrer}` : "Referrer: direct",
    timezone ? `Timezone: ${timezone}` : "",
    language ? `Language: ${language}` : "",
    `Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ].filter(Boolean);

  return lines.join("\n");
}

async function sendTelegramNotification(message: string) {
  const token = cleanEnvValue(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = cleanEnvValue(process.env.TELEGRAM_CHAT_ID);

  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
      }),
    });
  } catch (error) {
    console.error("Telegram visit notification error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = String(body.path || "/").slice(0, 240);
    const referrer = String(body.referrer || "").slice(0, 500);
    const timezone = String(body.timezone || "").slice(0, 120);
    const language = String(body.language || "").slice(0, 80);
    const userAgent = request.headers.get("user-agent") || "";
    const ip = getClientIp(request);
    const visitedAt = new Date();

    const client = await getMongoClient();
    const database = client.db(cleanEnvValue(process.env.MONGODB_DATABASE) || "Portfolio");

    await database.collection("portfolio_visits").insertOne({
      path,
      referrer,
      timezone,
      language,
      userAgent,
      ip,
      visitedAt,
    });

    await sendTelegramNotification(formatTelegramMessage({ path, referrer, timezone, language }));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Visit tracking error:", error);
    return NextResponse.json({ ok: false }, { status: 202 });
  }
}
