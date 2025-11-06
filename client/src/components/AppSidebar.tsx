import { Home, History, Heart, TrendingUp, User, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { UserStats } from "@shared/schema";
import { Link, useLocation } from "wouter";
import videoFile from "@assets/PinDown.io_@Azizology_1762201393_1762202048928.mp4";

const menuItems = [
  {
    title: "Accueil",
    url: "/",
    icon: Home,
  },
  {
    title: "Tendances",
    url: "/trending",
    icon: TrendingUp,
  },
  {
    title: "Favoris",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "Historique",
    url: "/history",
    icon: History,
  },
  {
    title: "Profil",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  
  const { data: stats } = useQuery<UserStats>({
    queryKey: ['/api/stats'],
  });

  return (
    <Sidebar data-testid="app-sidebar" className="relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        data-testid="video-background-sidebar"
      >
        <source src={videoFile} type="video/mp4" />
      </video>
      
      <SidebarHeader className="p-4 relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary animate-pulse" />
          <div>
            <h2 className="font-bold text-lg">Atomic MusicDL</h2>
            <p className="text-xs text-muted-foreground">I AM ATOMIC</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="relative z-10">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-active={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.title.toLowerCase()}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {stats && (
          <SidebarGroup>
            <SidebarGroupLabel>Statistiques</SidebarGroupLabel>
            <SidebarGroupContent className="px-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Niveau</span>
                <Badge variant="default" data-testid="badge-level">
                  {stats.level}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Points ⚡</span>
                <Badge variant="secondary" data-testid="badge-points">
                  {stats.totalAtomicPoints}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Série</span>
                <Badge variant="outline" data-testid="badge-streak">
                  {stats.streak} 🔥
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Téléchargements</span>
                <Badge variant="outline" data-testid="badge-downloads">
                  {stats.totalDownloads}
                </Badge>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 relative z-10">
        <div className="text-xs text-center text-muted-foreground">
          Powered by Atomic Energy ⚡
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
