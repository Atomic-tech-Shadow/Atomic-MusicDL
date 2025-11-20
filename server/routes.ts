import type { Express } from "express";
import { createServer, type Server } from "http";
import { searchVideos, getVideoInfo } from "./youtube";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/youtube/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      
      const results = await searchVideos(query);
      res.json(results);
    } catch (error: any) {
      console.error("Error searching videos:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/youtube/video/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      
      const info = await getVideoInfo(videoUrl);
      
      if (!info) {
        return res.status(404).json({ error: "Video not found" });
      }
      
      res.json(info);
    } catch (error: any) {
      console.error("Error fetching video info:", error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
