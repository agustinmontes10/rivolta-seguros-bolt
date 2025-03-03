import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Usa la clave de servicio para permisos de escritura
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const titulo = formData.get("titulo") as string;
    const descripcion = formData.get("descripcion") as string;
    const imagen = formData.get("imagen") as File | null;

    if (!titulo || !descripcion || !imagen) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // 📌 1️⃣ Subir imagen a Supabase Storage
    const fileExt = imagen.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data: imageData, error: imageError } = await supabase.storage
      .from("ofertas")
      .upload(fileName, imagen, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageError) {
      return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ofertas/${fileName}`;

    // 📌 2️⃣ Guardar oferta en la base de datos
    const { error: dbError } = await supabase.from("ofertas").insert([
      { titulo, descripcion, imagen: imageUrl },
    ]);

    if (dbError) {
      return NextResponse.json({ error: "Error al guardar la oferta" }, { status: 500 });
    }

    return NextResponse.json({ message: "Oferta guardada con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // 📌 1️⃣ Obtener todas las ofertas desde la base de datos
    const { data: ofertas, error } = await supabase
      .from("ofertas")
      .select("*") // Puedes seleccionar columnas específicas si quieres
      .order("id", { ascending: false });

    if (error) {
      return NextResponse.json({ error: "Error al obtener ofertas" }, { status: 500 });
    }

    return NextResponse.json({ ofertas }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
