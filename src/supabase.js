import { createClient } from '@supabase/supabase-js'

const e = import.meta.env
// Read before createClient strips the auth tokens from the URL.
export const arrivedViaInvite = /type=(invite|recovery)/.test(window.location.hash)
// The anon key is public by design; row-level security protects writes.
export const supabase = createClient(
  e.VITE_SUPABASE_URL || 'https://jytninegbyjqglowlfai.supabase.co',
  e.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dG5pbmVnYnlqcWdsb3dsZmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1NTE0NDIsImV4cCI6MjEwODEyNzQ0Mn0.heb8ZWJNsCsfakOdErofa4bk_Nu8quYdOFNZAiguvjg'
)
