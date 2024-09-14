import { createClient } from "@supabase/supabase-js";

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpdWZjZ2J1eWZueGRkb2l3amlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNTU0MDAsImV4cCI6MjAzOTYzMTQwMH0.92Hz25HAT9ZCwOHxlxVbmR_YdD0K2dTsFtwv8V9ghyU';
const supabaseUrl = 'https://aiufcgbuyfnxddoiwjio.supabase.co';

export const supabase = createClient(supabaseUrl,supabaseKey);