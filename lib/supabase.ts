import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE KEY LOADED:", !!supabaseKey);
console.log("SUPABASE KEY START:", supabaseKey?.slice(0, 15));

export const supabase = createClient(
  supabaseUrl!,
  supabaseKey!
);