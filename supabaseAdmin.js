import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config(); // 🔥 REQUIRED

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SECRET KEY EXISTS:", !!process.env.SUPABASE_SECRET_KEY);

export default supabaseAdmin;
