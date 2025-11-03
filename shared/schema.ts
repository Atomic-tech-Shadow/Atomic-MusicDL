import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
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
});

export type YouTubeSearchResult = z.infer<typeof youtubeSearchResultSchema>;
