import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Innertube, ClientType } from 'youtubei.js';

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

  try {
    const { videoId } = req.query;
    
    if (!videoId || typeof videoId !== 'string') {
      return res.status(400).json({ error: "Video ID is required" });
    }

    const youtube = await Innertube.create({
      client_type: ClientType.IOS
    });
    const info = await youtube.getInfo(videoId);

    const videoTitle = info.basic_info.title?.replace(/[^a-z0-9]/gi, '_') || videoId;
    
    res.setHeader('Content-Type', 'audio/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.m4a"`);

    const stream = await info.download({ 
      type: 'audio',
      quality: 'best',
      format: 'mp4'
    });

    const reader = stream.getReader();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } catch (streamError) {
      console.error('Stream error:', streamError);
      reader.releaseLock();
      throw streamError;
    }

  } catch (error) {
    console.error("Download error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to download video" });
    }
  }
}
