import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Usa la clave de servicio para permisos de escritura
);

export async function GET(req: NextRequest) {
    try {
        const { error } = await supabase.from("pg_tables").select("tablename").limit(1);

      if (error) {
        console.error("Error en cron:", error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
  
      return NextResponse.json({ success: true, message: "Ping ejecutado" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}