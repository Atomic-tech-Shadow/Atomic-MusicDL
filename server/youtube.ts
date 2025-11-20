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
    
    if (!response.ok) {
      console.error('YouTube search failed:', response.status, response.statusText);
      throw new Error(`YouTube search returned ${response.status}`);
    }
    
    const html = await response.text();
    const videoIds = extractVideoIds(html);
    
    if (videoIds.length === 0) {
      console.warn('No video IDs found in YouTube search results');
      return [];
    }
    
    const selectedIds = videoIds.slice(0, 12);
    console.log(`Fetching info for ${selectedIds.length} videos in parallel...`);
    
    const videoPromises = selectedIds.map(async (videoId) => {
      try {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        return await getVideoInfo(videoUrl);
      } catch (error) {
        console.error(`Failed to fetch info for video ${videoId}:`, error);
        return null;
      }
    });
    
    const results = await Promise.all(videoPromises);
    const validResults = results.filter((r): r is YouTubeSearchResult => r !== null);
    
    console.log(`Successfully fetched ${validResults.length} out of ${selectedIds.length} videos`);
    return validResults;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
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
