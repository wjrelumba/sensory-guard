import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
    // ✅ CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Must respond OK
  }

  // Only Allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { data, error } = await supabase.rpc('get_total_tables_size');

    if (error) throw error;

    const totalSizeBytes = data;
    const freeTierLimit = 524288000; // 500MB
    const remaining = freeTierLimit - totalSizeBytes;

    return res.status(200).json({
      used: totalSizeBytes,
      remaining,
      usedMB: (totalSizeBytes / 1024 / 1024).toFixed(2),
      remainingMB: (remaining / 1024 / 1024).toFixed(2),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
