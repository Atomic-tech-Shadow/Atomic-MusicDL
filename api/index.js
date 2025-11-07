import express from "express";
import ytdl from '@distube/ytdl-core';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({ error: "YouTube API key not configured" });
    }

    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=12&key=${YOUTUBE_API_KEY}`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error("YouTube API error:", data);
      return res.status(response.status).json({ error: data.error?.message || "YouTube API error" });
    }

    if (!data.items || data.items.length === 0) {
      return res.json([]);
    }

    const videoIds = data.items.map((item) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    if (!detailsResponse.ok) {
      console.error("YouTube Videos API error:", detailsData);
      return res.status(detailsResponse.status).json({ error: detailsData.error?.message || "YouTube Videos API error" });
    }

    const durationMap = new Map(
      (detailsData.items || []).map((item) => [
        item.id,
        parseDuration(item.contentDetails.duration)
      ])
    );

    const results = data.items.map((item) => ({
      id: item.id.videoId,
      videoId: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      duration: durationMap.get(item.id.videoId) || "0:00",
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search videos" });
  }
});

app.get("/api/download/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    
    if (!videoId) {
      return res.status(400).json({ error: "Video ID is required" });
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log('[Download] Fetching video info for:', videoUrl);

    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title || 'download';
    const sanitizedTitle = title
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 100);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.mp3"`);
    res.setHeader('Access-Control-Allow-Origin', '*');

    console.log('[Download] Starting stream...');
    const audioStream = ytdl(videoUrl, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    audioStream.on('error', (error) => {
      console.error('[Download] Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({ 
          error: "Stream failed",
          details: error.message 
        });
      }
    });

    audioStream.pipe(res);

  } catch (error) {
    console.error("Download error:", error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: "Failed to download video",
        details: error.message 
      });
    }
  }
});

export default app;
