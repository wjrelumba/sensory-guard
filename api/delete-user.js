import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ Never expose this in client-side code
);

export default async function handler(req, res) {
  // ✅ CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Must respond OK
  }

  // ✅ Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'Missing user_id in request body' });
  }

  try {
    // ✅ Delete from Supabase Auth
    const { error: authError } = await supabase.auth.admin.deleteUser(user_id);
    if (authError) {
      return res.status(500).json({ error: 'Failed to delete user from auth', details: authError.message });
    }

    // ✅ Delete from 'accounts' table
    const { error: dbError } = await supabase
      .from('accounts')
      .delete()
      .eq('user_id', user_id);

    if (dbError) {
      return res.status(500).json({ error: 'Failed to delete user data', details: dbError.message });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error', details: err.message });
  }
}
