import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import ytsearch from "yt-search";
import { YtDlp } from "ytdlp-nodejs";
import { 
  insertDownloadHistorySchema,
  insertFavoriteSchema,
  insertPlaylistSchema,
  audioQualitySchema,
} from "@shared/schema";

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

      const results = searchResults.videos.slice(0, 20).map((video: any) => ({
        id: video.videoId,
        videoId: video.videoId,
        title: video.title,
        artist: video.author?.name || video.author || "Unknown",
        duration: video.timestamp || "0:00",
        thumbnail: video.thumbnail || video.image || "",
        viewCount: video.views || 0,
        publishedAt: video.ago || "",
      }));

      res.json(results);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Failed to search videos" });
    }
  });

  app.get("/api/trending", async (req, res) => {
    try {
      const animeQueries = [
        "Eminence in Shadow OST",
        "Demon Slayer OST",
        "Attack on Titan OST",
        "Jujutsu Kaisen OST",
        "One Piece OST",
      ];
      
      const randomQuery = animeQueries[Math.floor(Math.random() * animeQueries.length)];
      const searchResults = await ytsearch(randomQuery);
      
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
        viewCount: video.views || 0,
        publishedAt: video.ago || "",
      }));

      res.json(results);
    } catch (error) {
      console.error("Trending error:", error);
      res.status(500).json({ error: "Failed to get trending" });
    }
  });

  app.get("/api/download/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const quality = (req.query.quality as string) || '320';
      
      if (!videoId) {
        return res.status(400).json({ error: "Video ID is required" });
      }

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const ytDlp = new YtDlp();

      const info = await ytDlp.getInfoAsync(videoUrl);
      const videoTitle = info.title?.replace(/[^a-z0-9]/gi, '_') || videoId;
      
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);

      ytDlp.stream(videoUrl, {
        format: { filter: 'audioonly', type: 'mp3' }
      }).pipe(res);

    } catch (error) {
      console.error("Download error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download video" });
      }
    }
  });

  app.get("/api/history", async (req, res) => {
    try {
      const history = await storage.getDownloadHistory();
      res.json(history);
    } catch (error) {
      console.error("History error:", error);
      res.status(500).json({ error: "Failed to get history" });
    }
  });

  app.post("/api/history", async (req, res) => {
    try {
      const validated = insertDownloadHistorySchema.parse(req.body);
      const history = await storage.addDownloadHistory(validated);
      res.json(history);
    } catch (error) {
      console.error("Add history error:", error);
      res.status(500).json({ error: "Failed to add to history" });
    }
  });

  app.delete("/api/history/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDownloadHistory(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete history error:", error);
      res.status(500).json({ error: "Failed to delete history" });
    }
  });

  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavorites();
      res.json(favorites);
    } catch (error) {
      console.error("Favorites error:", error);
      res.status(500).json({ error: "Failed to get favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const validated = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(validated);
      res.json(favorite);
    } catch (error) {
      console.error("Add favorite error:", error);
      res.status(500).json({ error: "Failed to add favorite" });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.removeFavorite(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete favorite error:", error);
      res.status(500).json({ error: "Failed to delete favorite" });
    }
  });

  app.delete("/api/favorites/by-video/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const favorites = await storage.getFavorites();
      const favorite = favorites.find(f => f.videoId === videoId);
      if (favorite) {
        await storage.removeFavorite(favorite.id);
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete favorite by videoId error:", error);
      res.status(500).json({ error: "Failed to delete favorite" });
    }
  });

  app.get("/api/favorites/check/:videoId", async (req, res) => {
    try {
      const { videoId } = req.params;
      const isFav = await storage.isFavorite(videoId);
      res.json({ isFavorite: isFav });
    } catch (error) {
      console.error("Check favorite error:", error);
      res.status(500).json({ error: "Failed to check favorite" });
    }
  });

  app.get("/api/playlists", async (req, res) => {
    try {
      const playlists = await storage.getPlaylists();
      res.json(playlists);
    } catch (error) {
      console.error("Playlists error:", error);
      res.status(500).json({ error: "Failed to get playlists" });
    }
  });

  app.post("/api/playlists", async (req, res) => {
    try {
      const validated = insertPlaylistSchema.parse(req.body);
      const playlist = await storage.createPlaylist(validated);
      res.json(playlist);
    } catch (error) {
      console.error("Create playlist error:", error);
      res.status(500).json({ error: "Failed to create playlist" });
    }
  });

  app.delete("/api/playlists/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePlaylist(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete playlist error:", error);
      res.status(500).json({ error: "Failed to delete playlist" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats();
      res.json(stats);
    } catch (error) {
      console.error("Stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  app.get("/api/badges", async (req, res) => {
    try {
      const badges = await storage.getAllBadges();
      res.json(badges);
    } catch (error) {
      console.error("Badges error:", error);
      res.status(500).json({ error: "Failed to get badges" });
    }
  });

  app.get("/api/badges/unlocked", async (req, res) => {
    try {
      const badges = await storage.getUnlockedBadges();
      res.json(badges);
    } catch (error) {
      console.error("Unlocked badges error:", error);
      res.status(500).json({ error: "Failed to get unlocked badges" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
