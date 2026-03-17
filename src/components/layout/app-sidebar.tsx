
"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  Home, 
  BarChart3, 
  MessageSquare, 
  Gift,
  Settings,
  LayoutDashboard,
  Zap,
  Award,
  Wallet,
  Activity,
  CalendarDays
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const role = user?.role || 'citizen';

  const navItems = {
    citizen: [
      { title: "National Hub", url: "/dashboard", icon: LayoutDashboard },
      { title: "Missions", url: "/dashboard/missions", icon: Users },
      { title: "Digital Wallet", url: "/dashboard/wallet", icon: Wallet },
      { title: "Reward Store", url: "/dashboard/rewards", icon: Gift },
      { title: "Civic AI", url: "/dashboard/assistant", icon: MessageSquare },
      { title: "Leaderboard", url: "/dashboard/leaderboard", icon: Award },
      { title: "Availability", url: "/dashboard/availability", icon: CalendarDays },
    ],
    ngo: [
      { title: "Impact Terminal", url: "/dashboard", icon: Home },
      { title: "Publish Mission", url: "/dashboard/post", icon: Building2 },
      { title: "Volunteer Fleet", url: "/dashboard/volunteers", icon: Users },
      { title: "Audit & Compliance", url: "/dashboard/admin", icon: ShieldCheck },
    ],
    admin: [
      { title: "Command Center", url: "/dashboard", icon: Home },
      { title: "Global Intelligence", url: "/dashboard/admin", icon: BarChart3 },
      { title: "Crisis Management", url: "/dashboard/crisis", icon: Activity },
      { title: "Audit Registry", url: "/dashboard/audit", icon: Settings },
    ]
  }[role] || [];

  const roleActiveColor = {
    citizen: 'bg-[#534AB7] text-white',
    ngo: 'bg-[#D85A30] text-white',
    admin: 'bg-blue-600 text-white',
  }[role] || 'bg-slate-600 text-white';

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-white/5 bg-[#0f172a]">
      <SidebarHeader className="h-20 flex items-center px-6 bg-[#0f172a] border-b border-white/5">
        <Link href="/dashboard" className="flex flex-col group w-full">
          <span className="font-black text-xl tracking-tighter text-white italic uppercase">
            SAHAYAM <span className="text-[#534AB7]">SEWA</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-data-[collapsible=icon]:hidden">
            National Grid
          </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#0f172a] text-slate-400 pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 mb-2">
            Core Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 h-12 group/btn",
                      pathname === item.url 
                        ? `${roleActiveColor} shadow-lg shadow-black/20` 
                        : "hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("w-5 h-5", pathname === item.url ? "text-white" : "text-slate-500 group-hover/btn:text-white")} />
                      <span className="font-semibold text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-[#0f172a] border-t border-white/5">
        <Link 
          href="/dashboard/profile" 
          className="flex items-center gap-4 p-2 group-data-[collapsible=icon]:p-0 hover:bg-white/5 rounded-xl transition-colors cursor-pointer w-full group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#534AB7] to-[#43399b] flex items-center justify-center text-sm font-black text-white shrink-0 shadow-xl group-hover:scale-105 transition-transform">
            {user?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-black text-white truncate uppercase tracking-tight group-hover:text-[#534AB7] transition-colors">
              {user?.fullName || "Sahayam User"}
            </span>
            <span className="text-[10px] font-bold uppercase text-[#534AB7] tracking-widest">
              {role} Node
            </span>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
