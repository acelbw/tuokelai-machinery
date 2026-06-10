import assert from "node:assert/strict";
import test from "node:test";

import { normalizeProductImages, prepareProductImages } from "./productImages.ts";

test("legacy single image becomes the product image list", () => {
  assert.deepEqual(normalizeProductImages(undefined, "/legacy.jpg"), ["/legacy.jpg"]);
});

test("image list keeps valid unique URLs in order", () => {
  assert.deepEqual(
    normalizeProductImages([" /one.jpg ", "", "/two.jpg", "/one.jpg", null], "/legacy.jpg"),
    ["/one.jpg", "/two.jpg"],
  );
});

test("first image is kept as the card cover", () => {
  assert.deepEqual(prepareProductImages(["/one.jpg", "/two.jpg"], "/legacy.jpg"), {
    image: "/one.jpg",
    images: ["/one.jpg", "/two.jpg"],
  });
});
