import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import ytsearch from "yt-search";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath.path);

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
    let audioStream: any = null;
    let ffmpegProcess: any = null;

    try {
      const { videoId } = req.params;
      
      if (!videoId) {
        return res.status(400).json({ error: "Video ID is required" });
      }

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const info = await ytdl.getInfo(videoUrl);

      const videoTitle = info.videoDetails.title.replace(/[^a-z0-9]/gi, '_') || videoId;
      
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      
      if (audioFormats.length === 0) {
        return res.status(500).json({ error: "No audio format available" });
      }

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);

      audioStream = ytdl(videoUrl, { 
        quality: 'highestaudio',
        filter: 'audioonly'
      });

      audioStream.on('error', (error: Error) => {
        console.error('Audio stream error:', error);
        if (ffmpegProcess) {
          ffmpegProcess.kill('SIGKILL');
        }
        if (!res.headersSent) {
          res.status(500).json({ error: "Failed to stream audio" });
        } else {
          res.end();
        }
      });

      ffmpegProcess = ffmpeg(audioStream)
        .audioBitrate(128)
        .format('mp3')
        .on('error', (error: Error) => {
          console.error('FFmpeg error:', error);
          if (audioStream) {
            audioStream.destroy();
          }
          if (!res.headersSent) {
            res.status(500).json({ error: "Failed to convert audio" });
          } else {
            res.end();
          }
        })
        .on('end', () => {
          console.log('FFmpeg conversion completed');
        });

      ffmpegProcess.pipe(res, { end: true });

      res.on('close', () => {
        if (audioStream) {
          audioStream.destroy();
        }
        if (ffmpegProcess) {
          ffmpegProcess.kill('SIGKILL');
        }
      });

    } catch (error) {
      console.error("Download error:", error);
      if (audioStream) {
        audioStream.destroy();
      }
      if (ffmpegProcess) {
        ffmpegProcess.kill('SIGKILL');
      }
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download video" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
