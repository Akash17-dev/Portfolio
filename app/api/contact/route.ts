import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

let clientPromise: Promise<MongoClient> | null = null;

function cleanEnvValue(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return "";

  return trimmed.replace(/^['"]|['"]$/g, "");
}

function getMongoUri() {
  const uri = cleanEnvValue(process.env.MONGODB_URI);

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://.");
  }

  return uri;
}

function getDatabaseName() {
  return cleanEnvValue(process.env.MONGODB_DATABASE) || "Portfolio";
}

function getMongoClient() {
  clientPromise ??= new MongoClient(getMongoUri(), {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  }).connect();

  return clientPromise;
}

function getContactErrorMessage(error: unknown) {
  const errorName = error instanceof Error ? error.name : "";
  const message = error instanceof Error ? error.message : "";
  const combined = `${errorName} ${message}`;

  if (combined.includes("MONGODB_URI")) {
    return "Database is not configured correctly.";
  }

  if (
    combined.includes("bad auth") ||
    combined.includes("Authentication failed") ||
    combined.includes("MongoServerError: bad auth")
  ) {
    return "Database authentication failed.";
  }

  if (
    combined.includes("MongoNetworkError") ||
    combined.includes("MongoServerSelectionError") ||
    combined.includes("querySrv") ||
    combined.includes("ENOTFOUND") ||
    combined.includes("ETIMEDOUT") ||
    combined.includes("ECONNREFUSED") ||
    combined.includes("Server selection timed out") ||
    combined.includes("Could not connect to any servers")
  ) {
    return "Database network access failed. Check MongoDB Atlas Network Access for Vercel.";
  }

  return "Message could not be sent right now.";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Please include a little more detail in your message." }, { status: 400 });
    }

    const client = await getMongoClient();
    const database = client.db(getDatabaseName());
    const collection = database.collection("contact_messages");

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
      source: "portfolio-contact-form",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: getContactErrorMessage(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await getMongoClient();
    await client.db(getDatabaseName()).command({ ping: 1 });

    return NextResponse.json({
      ok: true,
      database: getDatabaseName(),
      hasMongoUri: Boolean(cleanEnvValue(process.env.MONGODB_URI)),
      runtime: "nodejs",
    });
  } catch (error) {
    console.error("Contact health check error:", error);

    return NextResponse.json(
      {
        ok: false,
        database: getDatabaseName(),
        hasMongoUri: Boolean(cleanEnvValue(process.env.MONGODB_URI)),
        error: getContactErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
