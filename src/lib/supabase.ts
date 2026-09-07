import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// For client-side operations (if any)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// For server-side operations (bypassing RLS for admin tasks, or inserting from a server action without a user session)
export const getServiceSupabase = () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn("Supabase Service Role Key or URL is missing. Operations may fail.");
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};
