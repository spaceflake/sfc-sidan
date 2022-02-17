import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vnvluxuxitesbmbihjvq.supabase.co"
const supabaseAnonKey = "2dda2f21-7705-4191-8716-0f3142a12cc9"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
