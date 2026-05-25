import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PromptSubmission {
  id?: string;
  original_prompt: string;
  enhanced_prompt?: string;
  rating?: number;
  target_ai?: string;
  feedback?: string;
  created_at?: string;
}
