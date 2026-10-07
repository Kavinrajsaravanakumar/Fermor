import { NextResponse } from "next/server";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email } = body ?? {};

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!valid) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }
  console.log("[waitlist]", email.trim(), new Date().toISOString());

  return NextResponse.json({ ok: true }, { status: 200 });
}
