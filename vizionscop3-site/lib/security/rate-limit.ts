import { HttpError } from "@/lib/http";
import { createServiceClient } from "@/lib/supabase/service";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

export async function assertContactRateLimit(ip: string): Promise<void> {
  const supabase = createServiceClient();
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count, error } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);

  if (error) {
    throw new Error("Rate limit check failed");
  }
  if ((count ?? 0) >= MAX_PER_WINDOW) {
    throw new HttpError(429, "Too many submissions from this IP");
  }
}
