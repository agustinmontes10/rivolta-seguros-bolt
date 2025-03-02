import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configura el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""; 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""; 
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Subir la imagen al bucket de Supabase
    const { data, error: uploadError } = await supabase.storage
      .from("ofertas")
      .upload(`uploads/${file.name}`, fileBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Error al subir la imagen al bucket:", uploadError);
      return NextResponse.json({ error: "Error al subir la imagen al bucket de Supabase" }, { status: 500 });
    }

    // Obtener la URL pública de la imagen
    const { data: publicUrlData } = supabase.storage.from("ofertas").getPublicUrl(`uploads/${file.name}`);

    if (!publicUrlData) {
      console.error("Error al obtener la URL pública");
      return NextResponse.json({ error: "Error al obtener la URL pública" }, { status: 500 });
    }

    const publicUrl = publicUrlData.publicUrl;

    return NextResponse.json({ message: "Imagen subida con éxito", publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
