// File: /api/get-db-usage.js

export default async function handler(req, res) {
  const PROJECT_ID = process.env.SUPABASE_PROJECT_ID;
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // ✅ CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ✅ Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Must respond OK
  };

  // ✅ Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  };

  if (!PROJECT_ID || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Missing environment variables' });
  };

  const apiUrl = `https://api.supabase.io/v1/projects/${PROJECT_ID}/analytics`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    const dbSizeBytes = data.db_size;
    const freeTierLimit = 524288000; // 500 MB
    const remaining = freeTierLimit - dbSizeBytes;

    return res.status(200).json({
      used: dbSizeBytes,
      remaining,
      usedMB: (dbSizeBytes / 1024 / 1024).toFixed(2),
      remainingMB: (remaining / 1024 / 1024).toFixed(2)
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
