import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Usa la clave de servicio para permisos de escritura
);

export async function POST(req: NextRequest) {
  try {
    // Verificar variables de entorno
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("❌ Variables de entorno de Supabase no configuradas");
      return NextResponse.json({ 
        error: "Configuración de Supabase incompleta",
        details: "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY"
      }, { status: 500 });
    }

    const formData = await req.formData();
    const titulo = formData.get("titulo") as string;
    const descripcion = formData.get("descripcion") as string;
    const imagen = formData.get("imagen") as File | null;

    if (!titulo || !descripcion || !imagen) {
      return NextResponse.json({ 
        error: "Faltan datos requeridos",
        details: { titulo: !!titulo, descripcion: !!descripcion, imagen: !!imagen }
      }, { status: 400 });
    }

    console.log("📤 Subiendo imagen a Supabase Storage...");
    
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
      console.error("❌ Error al subir imagen:", imageError);
      return NextResponse.json({ 
        error: "Error al subir imagen",
        details: imageError.message
      }, { status: 500 });
    }

    console.log("✅ Imagen subida exitosamente:", fileName);
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ofertas/${fileName}`;

    console.log("💾 Guardando oferta en la base de datos...");
    
    // 📌 2️⃣ Guardar oferta en la base de datos
    const { data, error: dbError } = await supabase.from("ofertas").insert([
      { titulo, descripcion, imagen: imageUrl },
    ]).select();

    if (dbError) {
      console.error("❌ Error al guardar en BD:", dbError);
      return NextResponse.json({ 
        error: "Error al guardar la oferta en la base de datos",
        details: dbError.message,
        code: dbError.code
      }, { status: 500 });
    }

    console.log("✅ Oferta guardada exitosamente:", data);
    return NextResponse.json({ 
      message: "Oferta guardada con éxito",
      data: data[0]
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error inesperado:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : "Error desconocido"
    }, { status: 500 });
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

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const titulo = formData.get("titulo") as string;
    const descripcion = formData.get("descripcion") as string;
    const imagen = formData.get("imagen") as File | null;
    const update: any = { titulo, descripcion }

    if (!id || !titulo || !descripcion || !imagen) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // 📌 1️⃣ Subir imagen a Supabase Storage
    if (typeof imagen === 'object') {
      //@ts-ignore
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
      update.imagen = imageUrl;
    }

    // 📌 2️⃣ Actualizar oferta en la base de datos
    const { data, error } = await supabase
      .from("ofertas")
      .update(update)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: "Error al actualizar la oferta" }, { status: 500 });
    }

    return NextResponse.json({ message: "Oferta actualizada con éxito" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("🗑️ Iniciando eliminación de oferta...");
    
    const formData = await req.formData()
    const id = formData.get("id");

    if (!id) {
      console.error("❌ ID de oferta no proporcionado");
      return NextResponse.json({ error: "Falta el ID de la oferta" }, { status: 400 });
    }

    console.log("🔍 Buscando oferta con ID:", id);

    // 📌 1️⃣ Primero verificar si la oferta existe y obtener la URL de la imagen
    const { data: existingOffer, error: fetchError } = await supabase
      .from("ofertas")
      .select("id, imagen")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("❌ Error al buscar la oferta:", fetchError);
      return NextResponse.json({ 
        error: "Error al buscar la oferta",
        details: fetchError.message
      }, { status: 500 });
    }

    if (!existingOffer) {
      console.error("❌ Oferta no encontrada con ID:", id);
      return NextResponse.json({ 
        error: "Oferta no encontrada",
        details: `No existe una oferta con el ID: ${id}`
      }, { status: 404 });
    }

    console.log("✅ Oferta encontrada, procediendo a eliminar...");

    // 📌 2️⃣ Eliminar la oferta de la base de datos
    const { data, error: deleteError } = await supabase
      .from("ofertas")
      .delete()
      .eq("id", id)
      .select();

    if (deleteError) {
      console.error("❌ Error al eliminar de la BD:", deleteError);
      return NextResponse.json({ 
        error: "Error al eliminar la oferta de la base de datos",
        details: deleteError.message,
        code: deleteError.code
      }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.error("❌ No se eliminó ningún registro");
      return NextResponse.json({ 
        error: "No se pudo eliminar la oferta",
        details: "La operación de eliminación no afectó ningún registro"
      }, { status: 500 });
    }

    console.log("✅ Oferta eliminada de la BD:", data[0]);

    // 📌 3️⃣ Intentar eliminar la imagen del storage (opcional)
    if (existingOffer.imagen) {
      try {
        // Extraer el nombre del archivo de la URL
        const imageUrl = existingOffer.imagen;
        const fileName = imageUrl.split('/').pop();
        
        if (fileName) {
          console.log("🗑️ Eliminando imagen del storage:", fileName);
          
          const { error: storageError } = await supabase.storage
            .from("ofertas")
            .remove([fileName]);

          if (storageError) {
            console.warn("⚠️ No se pudo eliminar la imagen del storage:", storageError.message);
            // No fallamos la operación si no se puede eliminar la imagen
          } else {
            console.log("✅ Imagen eliminada del storage:", fileName);
          }
        }
      } catch (storageError) {
        console.warn("⚠️ Error al eliminar imagen del storage:", storageError);
        // No fallamos la operación si no se puede eliminar la imagen
      }
    }

    console.log("✅ Eliminación completada exitosamente");
    return NextResponse.json({ 
      message: "Oferta eliminada con éxito",
      deletedOffer: data[0]
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ Error inesperado en DELETE:", error);
    return NextResponse.json({ 
      error: "Error interno del servidor",
      details: error instanceof Error ? error.message : "Error desconocido"
    }, { status: 500 });
  }
}