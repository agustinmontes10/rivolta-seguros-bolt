import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { email, name } = body;

    // Verifica si el email es válido
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Si no hay nombre y apellido, dejamos vacío en Google Sheets
    const nombreCompleto = name?.trim() || "Sin Nombre";

    const credentials = {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = "1GcY8Xz0rL-ACEQo8kXvmyso-Ta28-HncMYN3QZNzkyA";
    const range = "A:C"; // Guardamos en columnas A, B Y C

    // Insertar datos en la hoja en orden
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[email, nombreCompleto, "Pendiente"]],
      }, // Guardamos el email, dejando vacío nombre y apellido si no están
    });

    return NextResponse.json(
      { message: "Datos guardados correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al guardar los datos" },
      { status: 500 }
    );
  }
}

// export async function handler(req: NextRequest) {
//   if (req.method === "POST") {
//     return saveEmail(req);
//   } else {
//     return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
//   }
// }

// export { handler as GET, handler as PUT, handler as DELETE, saveEmail as POST };
