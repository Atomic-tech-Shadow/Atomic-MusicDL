import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stats = {
    totalDownloads: 0,
    totalAtomicPoints: 0,
    level: 1,
    badges: [],
    streak: 0,
  };

  return res.json(stats);
}
