// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pnvniyoqtgxakmjfxorj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudm5peW9xdGd4YWttamZ4b3JqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDQzOTQxOSwiZXhwIjoyMDUwMDE1NDE5fQ.I7gs5wjt3mGgIlMyvbY5dOgZKk823SkVhcLXBxRNm-U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);