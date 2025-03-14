import { NextResponse } from "next/server";
import { getMeliToken, saveMeliToken } from "@/lib/meliToken";

export async function GET() {
  try {
    const clientId = process.env.NEXT_PUBLIC_MELI_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_MELI_CLIENT_SECRET!;
    const oldToken = await getMeliToken();

    if (!oldToken?.refresh_token) {
      return NextResponse.json({ error: "No se encontró un refresh_token válido" }, { status: 500 });
    }

    const response = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: oldToken.refresh_token,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }

    await saveMeliToken(data.access_token, data.refresh_token, data.expires_in);

    return NextResponse.json({ access_token: data.access_token, refresh_token: data.refresh_token }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "No se pudo refrescar el token" }, { status: 500 });
  }
}
