import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

const PRODUCTS_KEY = "products/data.json";

async function readProducts() {
  try {
    const { blobs } = await list({ prefix: "products/" });
    for (const blob of blobs) {
      if (blob.pathname === PRODUCTS_KEY) {
        const res = await fetch(blob.url);
        return await res.json();
      }
    }
  } catch {}
  return [];
}

async function writeProducts(data: unknown) {
  await put(PRODUCTS_KEY, JSON.stringify(data, null, 2), {
    contentType: "application/json",
    access: "public",
  });
}

export async function GET() {
  const products = await readProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const products = await readProducts();

  const newProduct = {
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
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const products = await readProducts();
  const idx = products.findIndex((p: { id: string }) => p.id === body.id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  products[idx] = {
    ...products[idx],
    model: body.model ?? products[idx].model,
    brand: body.brand ?? products[idx].brand,
    image: body.image ?? products[idx].image,
    specs: {
      capacityTons: Number(body.capacityTons) ?? products[idx].specs.capacityTons,
      maxHeightM: Number(body.maxHeightM) ?? products[idx].specs.maxHeightM,
      workingRadiusM: Number(body.workingRadiusM) ?? products[idx].specs.workingRadiusM,
      year: Number(body.year) ?? products[idx].specs.year,
      condition: "used",
    },
    description: (() => {
      const d = body.descriptionZh || body.descriptionEn || body.desc;
      return {
        en: body.descriptionEn ?? d ?? products[idx].description.en,
        zh: body.descriptionZh ?? d ?? products[idx].description.zh,
        vi: body.descriptionVi ?? d ?? products[idx].description.vi,
        ar: body.descriptionAr ?? d ?? products[idx].description.ar,
      };
    })(),
  };

  await writeProducts(products);
  return NextResponse.json(products[idx]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  let products = await readProducts();
  products = products.filter((p: { id: string }) => p.id !== id);
  await writeProducts(products);
  return NextResponse.json({ success: true });
}
