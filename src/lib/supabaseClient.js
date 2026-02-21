import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL_HERE' || !supabaseUrl.startsWith('http')) {
    console.warn('Supabase URL or Anon Key is missing. Check your .env file.');
    // Provide a mock client so the app doesn't crash on load
    supabase = {
        auth: {
            signInWithPassword: async ({ email, password }) => {
                if (email === 'admin@gmail.com') { // Allow demo login
                    return { data: { user: { id: 'demo-user', email } }, error: null };
                }
                return { data: { user: null }, error: new Error('Supabase not configured') };
            },
            signUp: async () => {
                return { data: { user: null }, error: new Error('Supabase not configured') };
            },
        },
        from: () => ({
            select: () => ({ data: [], error: null })
        })
    };
} else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
