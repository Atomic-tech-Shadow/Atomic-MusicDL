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

function extractVideoIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  } catch {
    return null;
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { videoId } = req.query;
    
    if (!videoId || typeof videoId !== 'string') {
      return res.status(400).json({ error: 'Invalid video ID' });
    }
    
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    
    const video = await yts({ videoId });
    
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    
    const result: YouTubeSearchResult = {
      id: video.videoId,
      videoId: video.videoId,
      title: video.title,
      artist: video.author.name,
      duration: video.timestamp,
      thumbnail: video.thumbnail,
      viewCount: video.views,
      publishedAt: video.ago,
    };
    
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error fetching video info:", error);
    res.status(500).json({ 
      error: error.message,
      message: "Erreur lors de la récupération des informations de la vidéo"
    });
  }
}
