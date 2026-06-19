import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

let clientPromise: Promise<MongoClient> | null = null;

function getMongoClient() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise;
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
    const database = client.db(process.env.MONGODB_DATABASE || "Portfolio");
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
    return NextResponse.json({ error: "Message could not be sent right now." }, { status: 500 });
  }
}
