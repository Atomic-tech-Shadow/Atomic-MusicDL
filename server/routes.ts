import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import ytsearch from "yt-search";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { ytmp3 } = require("@dark-yasiya/yt-dl.js");

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }

      const searchResults = await ytsearch(query);
      
      if (!searchResults.videos || searchResults.videos.length === 0) {
        return res.json([]);
      }

      const results = searchResults.videos.slice(0, 12).map((video: any) => ({
        id: video.videoId,
        videoId: video.videoId,
        title: video.title,
        artist: video.author?.name || video.author || "Unknown",
        duration: video.timestamp || "0:00",
        thumbnail: video.thumbnail || video.image || "",
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
      const downloadData: any = await ytmp3(videoUrl);

      if (!downloadData.status || !downloadData.download?.url) {
        return res.status(500).json({ error: "Failed to get download URL" });
      }

      const videoTitle = downloadData.result?.title?.replace(/[^a-z0-9]/gi, '_') || videoId;
      
      const downloadResponse = await fetch(downloadData.download.url);
      
      if (!downloadResponse.ok) {
        return res.status(500).json({ error: "Failed to fetch audio file" });
      }

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);

      if (downloadResponse.body) {
        const reader = downloadResponse.body.getReader();
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
      } else {
        throw new Error("No response body");
      }

    } catch (error) {
      console.error("Download error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download video" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
