import ytdl from '@distube/ytdl-core';
import type { YouTubeSearchResult } from '@shared/schema';

export async function getVideoInfo(videoUrl: string): Promise<YouTubeSearchResult | null> {
  try {
    const info = await ytdl.getBasicInfo(videoUrl);
    const details = info.videoDetails;
    
    const result: YouTubeSearchResult = {
      id: details.videoId,
      videoId: details.videoId,
      title: details.title,
      artist: details.author.name,
      duration: formatDuration(parseInt(details.lengthSeconds)),
      thumbnail: details.thumbnails[details.thumbnails.length - 1]?.url || '',
      viewCount: parseInt(details.viewCount),
      publishedAt: details.publishDate || undefined,
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching video info:', error);
    return null;
  }
}

export async function searchVideos(query: string): Promise<YouTubeSearchResult[]> {
  try {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl);
    const html = await response.text();
    
    const videoIds = extractVideoIds(html);
    const results: YouTubeSearchResult[] = [];
    
    for (const videoId of videoIds.slice(0, 12)) {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const info = await getVideoInfo(videoUrl);
      if (info) {
        results.push(info);
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
}

function extractVideoIds(html: string): string[] {
  const videoIdRegex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  const matches = Array.from(html.matchAll(videoIdRegex));
  const ids = new Set<string>();
  
  for (const match of matches) {
    if (match[1]) {
      ids.add(match[1]);
    }
  }
  
  return Array.from(ids);
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
