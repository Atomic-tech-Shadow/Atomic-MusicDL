import type { VercelRequest, VercelResponse } from '@vercel/node';

const mockFavorites: any[] = [];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method === 'GET') {
    return res.json(mockFavorites);
  }

  if (req.method === 'POST') {
    const { videoId, title, artist, thumbnail, duration } = req.body;
    
    const existingIndex = mockFavorites.findIndex(f => f.videoId === videoId);
    if (existingIndex !== -1) {
      return res.status(400).json({ error: 'Already in favorites' });
    }
    
    const favorite = {
      id: Math.random().toString(36).substring(7),
      videoId,
      title,
      artist,
      thumbnail,
      duration,
      addedAt: new Date().toISOString(),
    };
    
    mockFavorites.unshift(favorite);
    
    return res.json(favorite);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
