export class BlobConfigurationError extends Error {
  constructor() {
    super(
      "Vercel Blob is not configured. Connect a Blob store and set BLOB_READ_WRITE_TOKEN.",
    );
    this.name = "BlobConfigurationError";
  }
}

export function requireBlobCredentials() {
  const hasReadWriteToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
  const hasOidcCredentials = Boolean(
    process.env.VERCEL_OIDC_TOKEN?.trim() &&
      process.env.BLOB_STORE_ID?.trim(),
  );

  if (!hasReadWriteToken && !hasOidcCredentials) {
    throw new BlobConfigurationError();
  }
}

export function blobErrorResponse(error: unknown, operation: string) {
  if (error instanceof BlobConfigurationError) {
    return {
      status: 503,
      message: error.message,
    };
  }

  console.error(`Vercel Blob ${operation} failed`, error);
  return {
    status: 500,
    message: `Unable to ${operation}. Check the Vercel function logs for details.`,
  };
}
