import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request:", req);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Email inválido" });
  }

  try {
    // Autenticación con Google Sheets
    const credentialsPath = path.join(
      process.cwd(),
      "rivolta-seguros-d4ab3af6fc00.json"
    );
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsPath,
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

    res.status(200).json({ message: "Email guardado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar el email" });
  }
}
