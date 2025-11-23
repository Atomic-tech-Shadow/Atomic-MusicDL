import yts from 'yt-search';
import type { YouTubeSearchResult } from '@shared/schema';

export async function getVideoInfo(videoUrl: string): Promise<YouTubeSearchResult | null> {
  try {
    const videoId = extractVideoIdFromUrl(videoUrl);
    if (!videoId) return null;
    
    const video = await yts({ videoId });
    
    const result: YouTubeSearchResult = {
      id: video.videoId,
      videoId: video.videoId,
      title: video.title,
      artist: video.author.name,
      duration: video.timestamp,
      thumbnail: video.thumbnail,
      viewCount: video.views,
      publishedAt: video.ago,
    };
    
    return result;
  } catch (error) {
    console.error('Error fetching video info:', error);
    return null;
  }
}

export async function searchVideos(query: string): Promise<YouTubeSearchResult[]> {
  try {
    console.log(`Searching for: "${query}"`);
    const searchResults = await yts(query);
    
    if (!searchResults.videos || searchResults.videos.length === 0) {
      console.warn('No results found in search');
      return [];
    }
    
    const videos = searchResults.videos.slice(0, 12);
    console.log(`Found ${videos.length} results`);
    
    const results: YouTubeSearchResult[] = videos.map((video) => ({
      id: video.videoId,
      videoId: video.videoId,
      title: video.title,
      artist: video.author.name,
      duration: video.timestamp,
      thumbnail: video.thumbnail || '',
      viewCount: video.views,
      publishedAt: video.ago,
    }));
    
    return results;
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error;
  }
}

function extractVideoIdFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  } catch {
    return null;
  }
}
