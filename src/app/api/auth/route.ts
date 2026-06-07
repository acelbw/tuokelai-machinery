import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

const SETTINGS_KEY = "admin-settings/password.json";

async function getStoredPassword(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: "admin-settings/" });
    for (const blob of blobs) {
      if (blob.pathname === SETTINGS_KEY) {
        const res = await fetch(blob.url);
        const data = await res.json();
        return data.password;
      }
    }
  } catch {}
  return null;
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // Check stored password first, then env var
  const stored = await getStoredPassword();
  const expected = stored || process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  if (password === expected) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Wrong password" }, { status: 401 });
}
