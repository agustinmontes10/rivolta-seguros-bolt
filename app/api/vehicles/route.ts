import { NextResponse } from "next/server";

async function refreshTokenIfNeeded() {
  const accessToken = process.env.NEXT_PUBLIC_MELI_ACCESS_TOKEN;

  // Intentamos hacer una petición de prueba con el accessToken actual
  const testResponse = await fetch("https://api.mercadolibre.com/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // Si la petición falla, intentamos refrescar el token
  if (testResponse.status === 401) {
    console.log("El access_token ha expirado. Renovando...");

    const refreshResponse = await fetch("http://localhost:3000/api/refreshToken");

    if (!refreshResponse.ok) {
      console.error("Error al refrescar el token.");
      return null;
    }

    const newTokenData = await refreshResponse.json();
    return newTokenData.access_token;
  }

  return accessToken;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId");
    const modelId = searchParams.get("modelId");

    const accessToken = await refreshTokenIfNeeded();
    if (!accessToken) {
      return NextResponse.json({ error: "No se pudo actualizar el token" }, { status: 500 });
    }

    let url = "https://api.mercadolibre.com/sites/MLA/search?category=MLA1744";
    if (brandId) url += `&brand=${brandId}`;
    if (modelId) url += `&model=${modelId}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: "Error obteniendo datos" }, { status: 500 });
  }
}
