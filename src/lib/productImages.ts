const DEFAULT_PRODUCT_IMAGE = "/images/products/crane-01.jpg";

export function normalizeProductImages(images: unknown, legacyImage?: unknown): string[] {
  const normalized = (Array.isArray(images) ? images : [])
    .filter((image): image is string => typeof image === "string")
    .map((image) => image.trim())
    .filter(Boolean);

  if (normalized.length === 0 && typeof legacyImage === "string" && legacyImage.trim()) {
    normalized.push(legacyImage.trim());
  }

  return [...new Set(normalized)];
}

export function prepareProductImages(
  images: unknown,
  legacyImage?: unknown,
): { image: string; images: string[] } {
  const normalized = normalizeProductImages(images, legacyImage);
  const productImages = normalized.length > 0 ? normalized : [DEFAULT_PRODUCT_IMAGE];
  return { image: productImages[0], images: productImages };
}
