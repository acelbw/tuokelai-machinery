import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
  blobErrorResponse,
  requireBlobCredentials,
} from "@/lib/blob";

export async function POST(req: NextRequest) {
  try {
    requireBlobCredentials();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const blob = await put(filename, file, {
      contentType: file.type,
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: unknown) {
    const result = blobErrorResponse(error, "upload image");
    return NextResponse.json({ error: result.message }, { status: result.status });
  }
}
