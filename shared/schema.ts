import { z } from "zod";

export const youtubeSearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  duration: z.string(),
  thumbnail: z.string(),
  videoId: z.string(),
  viewCount: z.number().optional(),
  publishedAt: z.string().optional(),
});

export type YouTubeSearchResult = z.infer<typeof youtubeSearchResultSchema>;

export const audioQualitySchema = z.enum(['64', '128', '192', '256', '320']);
export type AudioQuality = z.infer<typeof audioQualitySchema>;

export const videoQualitySchema = z.enum(['240', '360', '480', '720', '1080']);
export type VideoQuality = z.infer<typeof videoQualitySchema>;

export const downloadTypeSchema = z.enum(['mp3', 'mp4']);
export type DownloadType = z.infer<typeof downloadTypeSchema>;
