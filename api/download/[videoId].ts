import type { VercelRequest, VercelResponse } from '@vercel/node';
import { stream, video_basic_info } from 'play-dl';

export const config = {
  maxDuration: 60,
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { videoId, quality } = req.query;
  console.log('[Vercel Download] Request received:', { videoId, quality });

  try {
    if (!videoId || typeof videoId !== 'string') {
      console.error('[Vercel Download] Invalid videoId');
      return res.status(400).json({ error: "Video ID is required" });
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log('[Vercel Download] Fetching video info for:', videoUrl);

    const info = await video_basic_info(videoUrl);
    const videoTitle = info.video_details.title?.replace(/[^a-z0-9]/gi, '_') || videoId;
    console.log('[Vercel Download] Video title:', videoTitle);
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');

    console.log('[Vercel Download] Starting download stream...');
    
    const audioStream = await stream(videoUrl, {
      quality: 2,
      discordPlayerCompatibility: false
    });

    let bytesWritten = 0;

    audioStream.stream.on('data', (chunk) => {
      bytesWritten += chunk.length;
    });

    audioStream.stream.on('error', (error) => {
      console.error('[Vercel Download] Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: "Stream failed",
          details: error.message 
        });
      }
    });

    audioStream.stream.on('end', () => {
      console.log('[Vercel Download] Stream complete, bytes written:', bytesWritten);
    });

    audioStream.stream.pipe(res);

  } catch (error: any) {
    console.error('[Vercel Download] Error details:', {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
      videoId
    });
    
    if (!res.headersSent) {
      const errorMessage = error?.message || 'Unknown error';
      res.status(500).json({ 
        error: "Failed to download video",
        details: errorMessage,
        videoId 
      });
    }
  }
}
