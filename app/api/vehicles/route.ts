import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId");
    const modelId = searchParams.get("modelId");

    const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MELI_ACCESS_TOKEN;
    if (!ACCESS_TOKEN) {
      return NextResponse.json({ error: "Falta ACCESS_TOKEN" }, { status: 500 });
    }

    let url = "https://api.mercadolibre.com/sites/MLA/search?category=MLA1744";
    if (brandId) url += `&brand=${brandId}`;
    if (modelId) url += `&model=${modelId}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: "Error obteniendo datos" }, { status: 500 });
  }
}
