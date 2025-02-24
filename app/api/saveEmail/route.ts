import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();


export async function saveEmail(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    // console.log(process.env, '............................................')
    const credentials = {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    };

    // if (!fs.existsSync(credentialsPath)) {
    //   console.log(path.join(
    //     __dirname,
    //     "rivolta-seguros-d4ab3af6fc00.json"
    //   ), '............................................')
    //   return NextResponse.json({ error: "Credentials file not found" }, { status: 500 });
    // }
    console.log(credentials, ';;;;;;;;;;;;;;;;;')
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
 

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = "1KU9kqFc3IW_dvUnOsXWTXfxWWNrsCZ4j12yPMct6mt8"; // Reemplázalo con el ID de tu Google Sheet
    const range = "A:A"; // Se guardará en la columna A

    // Insertar email en la hoja
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: [[email]] },
    });

    return NextResponse.json({ message: "Email guardado correctamente" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al guardar el email" }, { status: 500 });
  }
}

export async function handler(req: NextRequest) {
  if (req.method === "POST") {
    return saveEmail(req);
  } else {
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
  }
}

export { handler as GET, handler as PUT, handler as DELETE, saveEmail as POST };