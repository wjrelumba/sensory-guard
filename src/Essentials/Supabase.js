import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpaGdibGN4ZWxjcWJ0YnpxYW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyODc4ODcsImV4cCI6MjA0MTg2Mzg4N30.nghkW09xXVAUPySlVP06ynWDaPS3MFHSEE4-C66a86o';
const supabaseUrl = 'https://gihgblcxelcqbtbzqaop.supabase.co';

export const supabase = createClient(supabaseUrl,supabaseKey);