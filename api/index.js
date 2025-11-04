import express from "express";
import { Innertube } from 'youtubei.js';

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

    const youtube = await Innertube.create();
    const info = await youtube.getInfo(videoId);

    const title = info.basic_info.title || 'download';
    const sanitizedTitle = title
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 100);

    res.setHeader('Content-Type', 'audio/mp4');
    res.setHeader('Content-Disposition', `attachment; filename="${sanitizedTitle}.m4a"`);

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
});

export default app;
