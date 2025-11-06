import type { VercelRequest, VercelResponse } from '@vercel/node';

const mockHistory: any[] = [];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method === 'GET') {
    return res.json(mockHistory);
  }

  if (req.method === 'POST') {
    const { videoId, title, artist, thumbnail, duration, quality } = req.body;
    
    const atomicPoints = quality === '320' ? 3 : quality === '192' ? 2 : 1;
    
    const historyItem = {
      id: Math.random().toString(36).substring(7),
      videoId,
      title,
      artist,
      thumbnail,
      duration,
      quality,
      atomicPoints,
      downloadedAt: new Date().toISOString(),
    };
    
    mockHistory.unshift(historyItem);
    
    if (mockHistory.length > 100) {
      mockHistory.pop();
    }
    
    return res.json(historyItem);
  }

  if (req.method === 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
