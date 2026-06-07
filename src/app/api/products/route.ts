import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import {
  blobErrorResponse,
  requireBlobCredentials,
} from "@/lib/blob";
import type { TowerCrane } from "@/lib/products";

const PRODUCTS_KEY = "products/data.json";

async function readProducts(): Promise<TowerCrane[]> {
  requireBlobCredentials();
  const { blobs } = await list({ prefix: PRODUCTS_KEY });
  const productBlob = blobs.find((blob) => blob.pathname === PRODUCTS_KEY);

  if (!productBlob) {
    return [];
  }

  const response = await fetch(productBlob.url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Product blob returned HTTP ${response.status}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Product blob does not contain an array");
  }

  return data as TowerCrane[];
}

async function writeProducts(data: TowerCrane[]) {
  requireBlobCredentials();
  await put(PRODUCTS_KEY, JSON.stringify(data, null, 2), {
    contentType: "application/json",
    access: "public",
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

function apiError(error: unknown, operation: string) {
  const result = blobErrorResponse(error, operation);
  return NextResponse.json({ error: result.message }, { status: result.status });
}

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch (error) {
    return apiError(error, "load products");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const products = await readProducts();

    const newProduct: TowerCrane = {
      id: `tc-${Date.now()}`,
      model: body.model || "",
      brand: body.brand || "XCMG",
      image: body.image || "/images/products/crane-01.jpg",
      specs: {
        capacityTons: Number(body.capacityTons) || 0,
        maxHeightM: Number(body.maxHeightM) || 0,
        workingRadiusM: Number(body.workingRadiusM) || 0,
        year: Number(body.year) || new Date().getFullYear(),
        condition: "used",
      },
      description: (() => {
        const d = body.descriptionZh || body.descriptionEn || body.desc || "";
        return {
          en: body.descriptionEn || d,
          zh: body.descriptionZh || d,
          vi: body.descriptionVi || d,
          ar: body.descriptionAr || d,
        };
      })(),
    };

    products.push(newProduct);
    await writeProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return apiError(error, "save product");
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const products = await readProducts();
    const idx = products.findIndex((product) => product.id === body.id);

    if (idx === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const current = products[idx];
    const numberOrCurrent = (value: unknown, fallback: number) => {
      if (value === undefined || value === null || value === "") return fallback;
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    products[idx] = {
      ...current,
      model: body.model ?? current.model,
      brand: body.brand ?? current.brand,
      image: body.image ?? current.image,
      specs: {
        capacityTons: numberOrCurrent(body.capacityTons, current.specs.capacityTons),
        maxHeightM: numberOrCurrent(body.maxHeightM, current.specs.maxHeightM),
        workingRadiusM: numberOrCurrent(
          body.workingRadiusM,
          current.specs.workingRadiusM,
        ),
        year: numberOrCurrent(body.year, current.specs.year),
        condition: "used",
      },
      description: (() => {
        const d = body.descriptionZh || body.descriptionEn || body.desc;
        return {
          en: body.descriptionEn ?? d ?? current.description.en,
          zh: body.descriptionZh ?? d ?? current.description.zh,
          vi: body.descriptionVi ?? d ?? current.description.vi,
          ar: body.descriptionAr ?? d ?? current.description.ar,
        };
      })(),
    };

    await writeProducts(products);
    return NextResponse.json(products[idx]);
  } catch (error) {
    return apiError(error, "update product");
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const products = await readProducts();
    const filtered = products.filter((product) => product.id !== id);
    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await writeProducts(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "delete product");
  }
}
