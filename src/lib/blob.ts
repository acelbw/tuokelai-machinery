export function requireBlobCredentials(): void {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN environment variable is not configured.",
    );
  }
}

export function blobErrorResponse(
  error: unknown,
  operation: string,
): { message: string; status: number } {
  if (error instanceof Error && error.message.includes("BLOB_READ_WRITE_TOKEN")) {
    return { message: "云端存储尚未配置。", status: 500 };
  }
  const detail = error instanceof Error ? `：${error.message}` : "。";
  return { message: `${operation}失败${detail}`, status: 500 };
}
