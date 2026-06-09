import { list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const SETTINGS_KEY = "admin-settings/password.json";

async function getStoredPassword(): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const { blobs } = await list({ prefix: SETTINGS_KEY });
  const blob = blobs.find((item) => item.pathname === SETTINGS_KEY);
  if (!blob) return null;

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) return null;
  const data: unknown = await response.json();
  if (
    typeof data === "object" &&
    data !== null &&
    "password" in data &&
    typeof data.password === "string"
  ) {
    return data.password;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const storedPassword = await getStoredPassword();
    const expectedPassword =
      storedPassword ?? process.env.ADMIN_PASSWORD ?? "tuokelai2024";

    if (password === expectedPassword) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "密码错误。" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "登录失败，请重试。" }, { status: 500 });
  }
}
