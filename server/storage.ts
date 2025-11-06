import { 
  type User, 
  type InsertUser,
  type DownloadHistory,
  type InsertDownloadHistory,
  type Favorite,
  type InsertFavorite,
  type Playlist,
  type InsertPlaylist,
  type UserStats,
  type Badge,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDownloadHistory(): Promise<DownloadHistory[]>;
  addDownloadHistory(download: InsertDownloadHistory): Promise<DownloadHistory>;
  deleteDownloadHistory(id: string): Promise<void>;
  
  getFavorites(): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(id: string): Promise<void>;
  isFavorite(videoId: string): Promise<boolean>;
  
  getPlaylists(): Promise<Playlist[]>;
  getPlaylist(id: string): Promise<Playlist | undefined>;
  createPlaylist(playlist: InsertPlaylist): Promise<Playlist>;
  deletePlaylist(id: string): Promise<void>;
  updatePlaylist(id: string, data: Partial<Playlist>): Promise<Playlist | undefined>;
  
  getUserStats(): Promise<UserStats>;
  updateUserStats(stats: Partial<UserStats>): Promise<UserStats>;
  
  getAllBadges(): Promise<Badge[]>;
  getUnlockedBadges(): Promise<Badge[]>;
  unlockBadge(badgeId: string): Promise<Badge | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private downloadHistory: Map<string, DownloadHistory>;
  private favorites: Map<string, Favorite>;
  private playlists: Map<string, Playlist>;
  private userStats: UserStats;
  private badges: Map<string, Badge>;

  constructor() {
    this.users = new Map();
    this.downloadHistory = new Map();
    this.favorites = new Map();
    this.playlists = new Map();
    this.userStats = {
      totalDownloads: 0,
      totalAtomicPoints: 0,
      level: 1,
      badges: [],
      streak: 0,
    };
    this.badges = new Map();
    this.initializeBadges();
  }

  private initializeBadges() {
    const badgeDefinitions: Badge[] = [
      { id: 'first-download', name: 'Premier Pas Atomique', description: 'Premier téléchargement', icon: 'Zap', requirement: 1, category: 'downloads', rarity: 'common' },
      { id: 'anime-fan', name: 'Fan d\'Anime', description: 'Téléchargé 10 OST d\'anime', icon: 'Music', requirement: 10, category: 'downloads', rarity: 'common' },
      { id: 'power-user', name: 'Utilisateur Atomique', description: '50 téléchargements', icon: 'Star', requirement: 50, category: 'downloads', rarity: 'rare' },
      { id: 'atomic-master', name: 'Maître Atomique', description: '100 téléchargements', icon: 'Crown', requirement: 100, category: 'downloads', rarity: 'epic' },
      { id: 'eminence-shadow', name: 'Eminence in Shadow', description: '500 téléchargements', icon: 'Sparkles', requirement: 500, category: 'downloads', rarity: 'legendary' },
      { id: 'streak-3', name: 'Série de 3', description: '3 jours consécutifs', icon: 'Flame', requirement: 3, category: 'streak', rarity: 'common' },
      { id: 'streak-7', name: 'Série de 7', description: '7 jours consécutifs', icon: 'Flame', requirement: 7, category: 'streak', rarity: 'rare' },
      { id: 'streak-30', name: 'Série Atomique', description: '30 jours consécutifs', icon: 'Flame', requirement: 30, category: 'streak', rarity: 'epic' },
      { id: 'collector', name: 'Collectionneur', description: '20 favoris', icon: 'Heart', requirement: 20, category: 'collection', rarity: 'rare' },
      { id: 'i-am-atomic', name: 'I AM ATOMIC', description: 'Badge spécial des fondateurs', icon: 'Zap', requirement: 1, category: 'special', rarity: 'legendary' },
    ];

    badgeDefinitions.forEach(badge => this.badges.set(badge.id, badge));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDownloadHistory(): Promise<DownloadHistory[]> {
    return Array.from(this.downloadHistory.values()).sort((a, b) => 
      new Date(b.downloadedAt).getTime() - new Date(a.downloadedAt).getTime()
    );
  }

  async addDownloadHistory(download: InsertDownloadHistory): Promise<DownloadHistory> {
    const id = randomUUID();
    const qualityPoints = { '128': 1, '192': 2, '320': 3 }[download.quality];
    const newDownload: DownloadHistory = {
      ...download,
      id,
      downloadedAt: new Date().toISOString(),
      atomicPoints: qualityPoints,
    };
    this.downloadHistory.set(id, newDownload);
    
    const today = new Date().toDateString();
    const lastDownload = this.userStats.lastDownloadDate 
      ? new Date(this.userStats.lastDownloadDate).toDateString()
      : null;
    
    const newStreak = lastDownload === new Date(Date.now() - 86400000).toDateString() 
      ? this.userStats.streak + 1
      : lastDownload === today
        ? this.userStats.streak
        : 1;

    await this.updateUserStats({
      totalDownloads: this.userStats.totalDownloads + 1,
      totalAtomicPoints: this.userStats.totalAtomicPoints + qualityPoints,
      level: Math.floor(1 + Math.sqrt(this.userStats.totalAtomicPoints + qualityPoints)),
      streak: newStreak,
      lastDownloadDate: new Date().toISOString(),
    });

    await this.checkAndUnlockBadges();
    
    return newDownload;
  }

  async deleteDownloadHistory(id: string): Promise<void> {
    this.downloadHistory.delete(id);
  }

  async getFavorites(): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).sort((a, b) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  }

  async addFavorite(favorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const newFavorite: Favorite = {
      ...favorite,
      id,
      addedAt: new Date().toISOString(),
    };
    this.favorites.set(id, newFavorite);
    return newFavorite;
  }

  async removeFavorite(id: string): Promise<void> {
    this.favorites.delete(id);
  }

  async isFavorite(videoId: string): Promise<boolean> {
    return Array.from(this.favorites.values()).some(fav => fav.videoId === videoId);
  }

  async getPlaylists(): Promise<Playlist[]> {
    return Array.from(this.playlists.values());
  }

  async getPlaylist(id: string): Promise<Playlist | undefined> {
    return this.playlists.get(id);
  }

  async createPlaylist(playlist: InsertPlaylist): Promise<Playlist> {
    const id = randomUUID();
    const newPlaylist: Playlist = {
      ...playlist,
      id,
      createdAt: new Date().toISOString(),
      trackCount: 0,
    };
    this.playlists.set(id, newPlaylist);
    return newPlaylist;
  }

  async deletePlaylist(id: string): Promise<void> {
    this.playlists.delete(id);
  }

  async updatePlaylist(id: string, data: Partial<Playlist>): Promise<Playlist | undefined> {
    const playlist = this.playlists.get(id);
    if (!playlist) return undefined;
    
    const updated = { ...playlist, ...data };
    this.playlists.set(id, updated);
    return updated;
  }

  async getUserStats(): Promise<UserStats> {
    return this.userStats;
  }

  async updateUserStats(stats: Partial<UserStats>): Promise<UserStats> {
    this.userStats = { ...this.userStats, ...stats };
    return this.userStats;
  }

  async getAllBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }

  async getUnlockedBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values()).filter(badge => badge.unlockedAt);
  }

  async unlockBadge(badgeId: string): Promise<Badge | undefined> {
    const badge = this.badges.get(badgeId);
    if (!badge || badge.unlockedAt) return badge;
    
    const unlockedBadge = { ...badge, unlockedAt: new Date().toISOString() };
    this.badges.set(badgeId, unlockedBadge);
    
    if (!this.userStats.badges.includes(badgeId)) {
      this.userStats.badges.push(badgeId);
    }
    
    return unlockedBadge;
  }

  private async checkAndUnlockBadges(): Promise<void> {
    const allBadges = await this.getAllBadges();
    
    for (const badge of allBadges) {
      if (badge.unlockedAt) continue;
      
      let shouldUnlock = false;
      
      if (badge.category === 'downloads') {
        shouldUnlock = this.userStats.totalDownloads >= badge.requirement;
      } else if (badge.category === 'streak') {
        shouldUnlock = this.userStats.streak >= badge.requirement;
      } else if (badge.category === 'collection') {
        shouldUnlock = this.favorites.size >= badge.requirement;
      }
      
      if (shouldUnlock) {
        await this.unlockBadge(badge.id);
      }
    }
  }
}

export const storage = new MemStorage();
