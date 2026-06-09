import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { blobErrorResponse, requireBlobCredentials } from "@/lib/blob";

const SETTINGS_KEY = "admin-settings/password.json";

export async function GET() {
  try {
    requireBlobCredentials();
    const { blobs } = await list({ prefix: SETTINGS_KEY });
    return NextResponse.json({
      hasStoredPassword: blobs.some((blob) => blob.pathname === SETTINGS_KEY),
    });
  } catch (error) {
    const result = blobErrorResponse(error, "加载管理设置");
    return NextResponse.json({ error: result.message }, { status: result.status });
  }
}

export async function POST(req: NextRequest) {
  try {
    requireBlobCredentials();
    const { password } = await req.json();
    if (typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "密码至少需要 6 位。" }, { status: 400 });
    }

    await put(SETTINGS_KEY, JSON.stringify({ password }), {
      access: "public",
      allowOverwrite: true,
      cacheControlMaxAge: 0,
      contentType: "application/json",
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const result = blobErrorResponse(error, "保存管理设置");
    return NextResponse.json({ error: result.message }, { status: result.status });
  }
}
