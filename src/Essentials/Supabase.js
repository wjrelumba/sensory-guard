import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZnJneXVmaW1sbnRjZnhsZnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzc5NjIsImV4cCI6MjA0Nzc1Mzk2Mn0.-QmxCXFBIEc0JQjRl3YlgzHxEABzc_KV9v_YZAmPyEs';
const supabaseUrl = 'https://khfrgyufimlntcfxlftc.supabase.co';

export const supabase = createClient(supabaseUrl,supabaseKey);