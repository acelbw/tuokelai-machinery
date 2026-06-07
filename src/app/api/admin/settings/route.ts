import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import {
  blobErrorResponse,
  requireBlobCredentials,
} from "@/lib/blob";

const SETTINGS_KEY = "admin-settings/password.json";

async function getStoredPassword(): Promise<string | null> {
  requireBlobCredentials();
  const { blobs } = await list({ prefix: SETTINGS_KEY });
  const settingsBlob = blobs.find((blob) => blob.pathname === SETTINGS_KEY);
  if (!settingsBlob) return null;

  const response = await fetch(settingsBlob.url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Settings blob returned HTTP ${response.status}`);
  }

  const data: unknown = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("password" in data) ||
    typeof data.password !== "string"
  ) {
    throw new Error("Settings blob contains invalid data");
  }

  return data.password;
}

export async function GET() {
  try {
    const stored = await getStoredPassword();
    return NextResponse.json({ hasStoredPassword: Boolean(stored) });
  } catch (error) {
    const result = blobErrorResponse(error, "load admin settings");
    return NextResponse.json({ error: result.message }, { status: result.status });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireBlobCredentials();
    const { password } = await req.json();
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "密码至少6位" }, { status: 400 });
    }

    await put(SETTINGS_KEY, JSON.stringify({ password }), {
      contentType: "application/json",
      access: "public",
      allowOverwrite: true,
      cacheControlMaxAge: 60,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const result = blobErrorResponse(error, "save admin settings");
    return NextResponse.json({ error: result.message }, { status: result.status });
  }
}
