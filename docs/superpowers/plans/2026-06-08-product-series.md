# Product Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add filterable product-series cards, admin category editing, backward-compatible persistence, and the WhatsApp contact correction.

**Architecture:** A shared product-category module defines the fixed categories, normalization, and filtering behavior. The product type, API, admin form, and public Products page consume that shared contract. Missing category values normalize to Tower Cranes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Node test runner

---

### Task 1: Product category contract

**Files:**
- Create: `src/lib/productCategories.ts`
- Create: `src/lib/productCategories.test.mts`
- Modify: `src/lib/products.ts`

- [ ] Write tests for missing-category fallback, valid-category preservation, invalid-category fallback, and filtering.
- [ ] Run `node --test src/lib/productCategories.test.mts` and confirm the module is missing.
- [ ] Implement the fixed category contract and add `category` to `TowerCrane`.
- [ ] Run the focused test and confirm it passes.

### Task 2: Persistence and admin editing

**Files:**
- Modify: `src/app/api/products/route.ts`
- Modify: `src/app/admin/page.tsx`

- [ ] Normalize categories returned from Blob storage.
- [ ] Persist normalized category values in POST and PUT.
- [ ] Add a required series selector to the product form and show the selected series in the admin list.

### Task 3: Public category cards and contact correction

**Files:**
- Modify: `src/app/products/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/lib/i18n.ts`

- [ ] Add three responsive category cards with counts and active styling.
- [ ] Filter the product grid and show a localized empty state.
- [ ] Add category and empty-state translations in all four languages.
- [ ] Rename the first QR card and alt text to WhatsApp.

### Task 4: Verification

- [ ] Run `node --test src/lib/productCategories.test.mts`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Review the final diff for unrelated changes.
