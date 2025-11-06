import { useQuery } from "@tanstack/react-query";
import { Zap, Award, Flame, Download, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { UserStats, Badge as BadgeType } from "@shared/schema";

const iconMap: Record<string, any> = {
  Zap,
  Music: Download,
  Star: Award,
  Crown: Award,
  Sparkles: Zap,
  Flame,
  Heart: Award,
};

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500",
};

export default function Profile() {
  const { data: stats } = useQuery<UserStats>({
    queryKey: ['/api/stats'],
  });

  const { data: allBadges } = useQuery<BadgeType[]>({
    queryKey: ['/api/badges'],
  });

  const unlockedBadges = allBadges?.filter(b => b.unlockedAt) || [];
  const lockedBadges = allBadges?.filter(b => !b.unlockedAt) || [];

  const nextLevelPoints = stats ? Math.pow(stats.level, 2) : 0;
  const currentLevelPoints = stats ? Math.pow(stats.level - 1, 2) : 0;
  const progressToNextLevel = stats 
    ? ((stats.totalAtomicPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading mb-2 flex items-center gap-2" data-testid="text-profile-title">
          <Zap className="w-8 h-8 text-primary animate-pulse" />
          Mon Profil Atomique
        </h1>
        <p className="text-muted-foreground">
          Vos statistiques et accomplissements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Niveau Atomique</CardDescription>
            <CardTitle className="text-3xl" data-testid="text-level">
              {stats?.level || 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressToNextLevel} className="h-2" data-testid="progress-level" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.totalAtomicPoints || 0} / {nextLevelPoints} ⚡
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Points Atomiques</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2" data-testid="text-points">
              <Zap className="w-6 h-6 text-primary" />
              {stats?.totalAtomicPoints || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Énergie atomique accumulée
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Série Actuelle</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2" data-testid="text-streak">
              <Flame className="w-6 h-6 text-orange-500" />
              {stats?.streak || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Jours consécutifs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Téléchargements</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2" data-testid="text-downloads">
              <Download className="w-6 h-6 text-primary" />
              {stats?.totalDownloads || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Musiques téléchargées
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Badges Débloqués ({unlockedBadges.length}/{allBadges?.length || 0})
          </CardTitle>
          <CardDescription>Vos accomplissements atomiques</CardDescription>
        </CardHeader>
        <CardContent>
          {unlockedBadges.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Continuez à télécharger pour débloquer des badges !
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {unlockedBadges.map((badge) => {
                const Icon = iconMap[badge.icon] || Award;
                return (
                  <div
                    key={badge.id}
                    className="p-4 rounded-md border bg-card hover-elevate transition-all text-center"
                    data-testid={`badge-unlocked-${badge.id}`}
                  >
                    <div className={`w-16 h-16 mx-auto mb-2 rounded-full ${rarityColors[badge.rarity]} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {badge.rarity}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-muted-foreground" />
            Badges à Débloquer ({lockedBadges.length})
          </CardTitle>
          <CardDescription>Continuez à progresser pour débloquer ces badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lockedBadges.map((badge) => {
              const Icon = iconMap[badge.icon] || Award;
              return (
                <div
                  key={badge.id}
                  className="p-4 rounded-md border bg-card opacity-50 text-center"
                  data-testid={`badge-locked-${badge.id}`}
                >
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {badge.requirement} requis
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
