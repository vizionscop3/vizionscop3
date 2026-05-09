import { NextResponse } from "next/server";

import { buildStatusStatic } from "@/lib/constants";

export const runtime = "edge";

export async function GET() {
  try {
    const { createSupabaseAnonServer } = await import(
      "@/lib/supabase/server-anon"
    );
    const sb = createSupabaseAnonServer();
    const { data, error } = await sb
      .from("build_status")
      .select("current_focus, messages, is_live, updated_at")
      .limit(1)
      .maybeSingle();
    if (!error && data) {
      return NextResponse.json(data);
    }
  } catch {
    /* fall through */
  }
  return NextResponse.json({
    current_focus: "VizionScop3 site",
    messages: buildStatusStatic.messages,
    is_live: buildStatusStatic.isLive,
    fallback: true,
  });
}
