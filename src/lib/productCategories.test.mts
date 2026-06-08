import assert from "node:assert/strict";
import test from "node:test";

import {
  filterProductsByCategory,
  normalizeProductCategory,
} from "./productCategories.ts";

test("products without a category default to tower cranes", () => {
  assert.equal(normalizeProductCategory(undefined), "tower-cranes");
});

test("valid product categories are preserved", () => {
  assert.equal(normalizeProductCategory("truck-cranes"), "truck-cranes");
  assert.equal(normalizeProductCategory("other-equipment"), "other-equipment");
});

test("unknown product categories default to tower cranes", () => {
  assert.equal(normalizeProductCategory("unknown"), "tower-cranes");
});

test("products are filtered using normalized categories", () => {
  const products = [
    { id: "legacy" },
    { id: "truck", category: "truck-cranes" },
    { id: "other", category: "other-equipment" },
  ];

  assert.deepEqual(
    filterProductsByCategory(products, "tower-cranes").map((product) => product.id),
    ["legacy"],
  );
  assert.deepEqual(
    filterProductsByCategory(products, "truck-cranes").map((product) => product.id),
    ["truck"],
  );
});
