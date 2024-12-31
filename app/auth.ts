import NextAuth from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const url = process.env.SUPABASE_URL || "";
const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  adapter: SupabaseAdapter({
    url: url,
    secret: secret,
  }),
});