import { NextResponse } from "next/server";
import { getMeliToken } from "@/lib/meliToken";

// Función para refrescar el token si es necesario
async function refreshTokenIfNeeded() {
  const token = await getMeliToken();

  if (!token) return null;
  if (new Date(token.expires_at).getTime() > Date.now()) return token.access_token;

  const response = await fetch("http://localhost:3000/api/refreshToken");
  if (!response.ok) return null;

  const newTokenData = await response.json();
  return newTokenData.access_token;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const brandId = searchParams.get("brandId");
    const modelId = searchParams.get("modelId");
    const accessToken = await getMeliToken();
    console.log('accessToken', accessToken)
    // const accessToken = await refreshTokenIfNeeded();
    // if (!accessToken) {
    //   return NextResponse.json({ error: "No se pudo actualizar el token" }, { status: 500 });
    // }

    let url = "https://api.mercadolibre.com/sites/MLA/search?category=MLA1744";
    if (brandId) url += `&brand=${brandId}`;
    if (modelId) url += `&model=${modelId}`;

    const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken.access_token}` } });
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error obteniendo datos" }, { status: 500 });
  }
}
