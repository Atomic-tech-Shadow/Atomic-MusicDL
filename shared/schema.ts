import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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

export const downloadHistorySchema = z.object({
  id: z.string(),
  videoId: z.string(),
  title: z.string(),
  artist: z.string(),
  thumbnail: z.string(),
  duration: z.string(),
  quality: z.enum(['128', '192', '320']),
  downloadedAt: z.string(),
  atomicPoints: z.number(),
});

export const insertDownloadHistorySchema = downloadHistorySchema.omit({ id: true, downloadedAt: true });

export type DownloadHistory = z.infer<typeof downloadHistorySchema>;
export type InsertDownloadHistory = z.infer<typeof insertDownloadHistorySchema>;

export const favoriteSchema = z.object({
  id: z.string(),
  videoId: z.string(),
  title: z.string(),
  artist: z.string(),
  thumbnail: z.string(),
  duration: z.string(),
  addedAt: z.string(),
  playlistId: z.string().optional(),
});

export const insertFavoriteSchema = favoriteSchema.omit({ id: true, addedAt: true });

export type Favorite = z.infer<typeof favoriteSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;

export const playlistSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  trackCount: z.number(),
});

export const insertPlaylistSchema = playlistSchema.omit({ id: true, createdAt: true, trackCount: true });

export type Playlist = z.infer<typeof playlistSchema>;
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;

export const userStatsSchema = z.object({
  totalDownloads: z.number(),
  totalAtomicPoints: z.number(),
  level: z.number(),
  badges: z.array(z.string()),
  streak: z.number(),
  lastDownloadDate: z.string().optional(),
});

export type UserStats = z.infer<typeof userStatsSchema>;

export const badgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  requirement: z.number(),
  category: z.enum(['downloads', 'streak', 'collection', 'special']),
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  unlockedAt: z.string().optional(),
});

export type Badge = z.infer<typeof badgeSchema>;

export const audioQualitySchema = z.enum(['128', '192', '320']);
export type AudioQuality = z.infer<typeof audioQualitySchema>;

export const viewModeSchema = z.enum(['grid', 'list']);
export type ViewMode = z.infer<typeof viewModeSchema>;

export const sortBySchema = z.enum(['relevance', 'date', 'viewCount', 'duration']);
export type SortBy = z.infer<typeof sortBySchema>;

export const filterSchema = z.object({
  minDuration: z.number().optional(),
  maxDuration: z.number().optional(),
  sortBy: sortBySchema,
});

export type Filter = z.infer<typeof filterSchema>;
