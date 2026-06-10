import { list, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { blobErrorResponse, requireBlobCredentials } from "@/lib/blob";
import type { TowerCrane } from "@/lib/products";
import { normalizeProductCategory } from "@/lib/productCategories";
import { prepareProductImages } from "@/lib/productImages";

const PRODUCTS_KEY = "products/data.json";

async function readProducts(): Promise<TowerCrane[]> {
  requireBlobCredentials();
  const { blobs } = await list({ prefix: PRODUCTS_KEY });
  const blob = blobs.find((item) => item.pathname === PRODUCTS_KEY);
  if (!blob) return [];

  const response = await fetch(blob.url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Product data returned HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Product data is invalid");
  }
  return (data as TowerCrane[]).map((product) => ({
    ...product,
    ...prepareProductImages(product.images, product.image),
    category: normalizeProductCategory(product.category),
  }));
}

async function writeProducts(products: TowerCrane[]): Promise<void> {
  requireBlobCredentials();
  await put(PRODUCTS_KEY, JSON.stringify(products, null, 2), {
    access: "public",
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    contentType: "application/json",
  });
}

function apiError(error: unknown, operation: string) {
  const result = blobErrorResponse(error, operation);
  return NextResponse.json({ error: result.message }, { status: result.status });
}

function numberOr(value: unknown, fallback: number): number {
  if (value === undefined || value === null || value === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export async function GET() {
  try {
    return NextResponse.json(await readProducts());
  } catch (error) {
    return apiError(error, "加载产品");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.model || typeof body.model !== "string") {
      return NextResponse.json({ error: "请填写产品型号。" }, { status: 400 });
    }

    const products = await readProducts();
    const description = body.descriptionZh || body.descriptionEn || body.desc || "";
    const productImages = prepareProductImages(body.images, body.image);
    const product: TowerCrane = {
      id: `tc-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
      model: body.model.trim(),
      brand: typeof body.brand === "string" ? body.brand.trim() : "XCMG",
      ...productImages,
      category: normalizeProductCategory(body.category),
      specs: {
        capacityTons: numberOr(body.capacityTons, 0),
        maxHeightM: numberOr(body.maxHeightM, 0),
        workingRadiusM: numberOr(body.workingRadiusM, 0),
        year: numberOr(body.year, new Date().getFullYear()),
        condition: "used",
      },
      description: {
        en: body.descriptionEn || description,
        zh: body.descriptionZh || description,
        vi: body.descriptionVi || description,
        ar: body.descriptionAr || description,
      },
    };

    products.push(product);
    await writeProducts(products);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return apiError(error, "保存产品");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const products = await readProducts();
    const index = products.findIndex((product) => product.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "未找到该产品。" }, { status: 404 });
    }

    const current = products[index];
    const description = body.descriptionZh || body.descriptionEn || body.desc;
    const productImages = prepareProductImages(
      body.images ?? current.images,
      body.image ?? current.image,
    );
    products[index] = {
      ...current,
      model: body.model ?? current.model,
      brand: body.brand ?? current.brand,
      ...productImages,
      category: normalizeProductCategory(body.category ?? current.category),
      specs: {
        capacityTons: numberOr(body.capacityTons, current.specs.capacityTons),
        maxHeightM: numberOr(body.maxHeightM, current.specs.maxHeightM),
        workingRadiusM: numberOr(
          body.workingRadiusM,
          current.specs.workingRadiusM,
        ),
        year: numberOr(body.year, current.specs.year),
        condition: "used",
      },
      description: {
        en: body.descriptionEn ?? description ?? current.description.en,
        zh: body.descriptionZh ?? description ?? current.description.zh,
        vi: body.descriptionVi ?? description ?? current.description.vi,
        ar: body.descriptionAr ?? description ?? current.description.ar,
      },
    };

    await writeProducts(products);
    return NextResponse.json(products[index]);
  } catch (error) {
    return apiError(error, "更新产品");
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "缺少产品 ID。" }, { status: 400 });
    }

    const products = await readProducts();
    const remaining = products.filter((product) => product.id !== id);
    if (remaining.length === products.length) {
      return NextResponse.json({ error: "未找到该产品。" }, { status: 404 });
    }

    await writeProducts(remaining);
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "删除产品");
  }
}
