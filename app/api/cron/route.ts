import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const data2 = await supabase;
    console.log(data2);
    const { data, error } = await supabase
      .from("heartbeat_test")
      .upsert({ id: "test", last_ping: new Date().toISOString() });

    if (error) {
      console.error("Error in cron:", error.message, data);
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), { status: 500 });
  }
}
