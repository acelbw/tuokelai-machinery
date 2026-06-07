import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

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

export async function GET() {
  const stored = await getStoredPassword();
  const defaultPw = process.env.ADMIN_PASSWORD || "tuokelai2024";
  return NextResponse.json({ password: stored || defaultPw });
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "密码至少6位" }, { status: 400 });
    }

    await put(SETTINGS_KEY, JSON.stringify({ password }), {
      contentType: "application/json",
      access: "public",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
