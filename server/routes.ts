import type { Express } from "express";
import { createServer, type Server } from "http";
import { searchVideos, getVideoInfo } from "./youtube";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/youtube/search", async (req, res) => {
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
      const results = await searchVideos(query);
      
      if (results.length === 0) {
        console.warn(`No results found for query: "${query}"`);
      }
      
      res.json(results);
    } catch (error: any) {
      console.error("Error searching videos:", error);
      res.status(500).json({ 
        error: "Search failed",
        message: "Une erreur est survenue lors de la recherche. Veuillez réessayer.",
        details: error.message 
      });
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
