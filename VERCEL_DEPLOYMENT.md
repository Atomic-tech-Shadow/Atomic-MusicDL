# Vercel Deployment Guide

## Prerequisites

1. A Vercel account
2. A YouTube Data API v3 key from Google Cloud Console

## Getting a YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "YouTube Data API v3"
4. Go to "Credentials" and create an API key
5. Copy the API key for the next step

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`

### 2. Configure Environment Variables

Before deploying, add your YouTube API key:

1. In the project settings on Vercel, go to "Settings" → "Environment Variables"
2. Add the following environment variable:
   - **Name**: `YOUTUBE_API_KEY`
   - **Value**: Your YouTube API key from Google Cloud Console
   - **Environments**: Select all (Production, Preview, Development)

### 3. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application

## Important Limitations

⚠️ **Download Functionality**: The `/api/download/:videoId` endpoint streams large audio files. On Vercel's free/hobby tier, you may encounter:

- **10-second timeout** - Downloads may fail for longer videos
- **50MB response limit** - Large files may fail to download
- **Execution time limits** - Serverless functions have strict time limits

### Recommended Solutions

If downloads fail:

1. **Upgrade to Vercel Pro** - Increases timeout to 60 seconds (set in function config)
2. **Use a different platform** - Consider Railway, Render, or Fly.io for long-running processes
3. **Alternative approach** - Return a direct YouTube download URL instead of proxying the stream

## API Endpoints

- `GET /api/search?q=query` - Search for music on YouTube
- `GET /api/download/:videoId` - Download audio from YouTube video

## Local Development

To run locally:

```bash
npm run dev
```

This will start the Express server (not used in Vercel deployment).

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify the build logs in Vercel dashboard

### API Errors

- Verify `YOUTUBE_API_KEY` is set in environment variables
- Check API quota limits in Google Cloud Console
- Review function logs in Vercel dashboard

### Download Timeouts

- Videos longer than 3-5 minutes may timeout on hobby tier
- Consider upgrading to Pro tier or using an alternative hosting platform
