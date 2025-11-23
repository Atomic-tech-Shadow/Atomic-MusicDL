import type { VercelRequest, VercelResponse } from '@vercel/node';
import yts from 'yt-search';

interface YouTubeSearchResult {
  id: string;
  videoId: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const query = req.query.q as string;
    
    if (!query) {
      return res.status(400).json({ 
        error: "Query parameter 'q' is required",
        message: "Veuillez fournir un terme de recherche" 
      });
    }
    
    if (query.length < 2) {
      return res.status(400).json({ 
        error: "Query too short",
        message: "Le terme de recherche doit contenir au moins 2 caractères" 
      });
    }
    
    console.log(`Searching music for: "${query}"`);
    const searchResults = await yts(query);
    
    if (!searchResults.videos || searchResults.videos.length === 0) {
      console.warn('No results found in search');
      return res.json([]);
    }
    
    const videos = searchResults.videos.slice(0, 12);
    console.log(`Found ${videos.length} results`);
    
    const results: YouTubeSearchResult[] = videos.map((video) => ({
      id: video.videoId,
      videoId: video.videoId,
      title: video.title,
      artist: video.author.name,
      duration: video.timestamp,
      thumbnail: video.thumbnail || '',
      viewCount: video.views,
      publishedAt: video.ago,
    }));
    
    res.status(200).json(results);
  } catch (error: any) {
    console.error("Error searching videos:", error);
    res.status(500).json({ 
      error: "Search failed",
      message: "Une erreur est survenue lors de la recherche. Veuillez réessayer.",
      details: error.message 
    });
  }
}
