import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { blobErrorResponse, requireBlobCredentials } from "@/lib/blob";

export async function POST(req: NextRequest) {
  try {
    requireBlobCredentials();
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "请选择图片文件。" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "仅支持图片文件。" }, { status: 400 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json(
        { error: "图片不能超过 8 MB。" },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `products/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    const result = blobErrorResponse(error, "上传图片");
    return NextResponse.json({ error: result.message }, { status: result.status });
  }
}
