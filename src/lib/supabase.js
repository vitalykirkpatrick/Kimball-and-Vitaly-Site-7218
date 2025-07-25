import { createClient } from '@supabase/supabase-js'

// Project ID will be auto-injected during deployment
const SUPABASE_URL = 'https://qwnalqccqcdexazqroro.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3bmFscWNjcWNkZXhhenFyb3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODA2NzUsImV4cCI6MjA2ODk1NjY3NX0.TROvCHgGtWG7NSXN_ax0WSt75TynGbM3Z216EsUZiuc'

if(SUPABASE_URL == 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY == '<ANON_KEY>' ){
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})