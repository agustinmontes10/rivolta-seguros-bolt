import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientId = process.env.NEXT_PUBLIC_MELI_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_MELI_CLIENT_SECRET!;
    const refreshToken = process.env.NEXT_PUBLIC_MELI_REFRESH_TOKEN!;

    if (!clientId || !clientSecret || !refreshToken) {
      return NextResponse.json({ error: "Faltan variables de entorno" }, { status: 500 });
    }

    // Hacemos la petición a MercadoLibre para refrescar el token
    const response = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error al refrescar token: ${data.message}`);
    }

    // Mostramos la nueva información en consola
    console.log("Nuevo ACCESS_TOKEN:", data.access_token);
    console.log("Nuevo REFRESH_TOKEN:", data.refresh_token);

    // Guardamos el nuevo access_token en variables de entorno (esto hay que hacerlo manualmente en un backend real)
    process.env.NEXT_PUBLIC_MELI_ACCESS_TOKEN = data.access_token;
    process.env.NEXT_PUBLIC_MELI_REFRESH_TOKEN = data.refresh_token;

    return NextResponse.json({ access_token: data.access_token }, { status: 200 });

  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return NextResponse.json({ error: "No se pudo refrescar el token" }, { status: 500 });
  }
}
