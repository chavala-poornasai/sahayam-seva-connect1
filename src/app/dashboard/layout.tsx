
"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useCivic } from "@/context/civic-context";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const mockNotifications = [
  { id: 1, title: "New Mission Near You", desc: "Flood relief in Hyderabad needs volunteers.", type: "mission" },
  { id: 2, title: "Emergency Alert", desc: "Heavy rain warning in your district.", type: "emergency" },
  { id: 3, title: "Reward Earned!", desc: "You achieved 'Silver Volunteer' rank.", type: "reward" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const { clearSession } = useCivic();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    clearSession();
    logout();
  };

  if (!mounted) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between px-6 bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden lg:flex relative">
                <Search className="absolute left-4 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search national grid..."
                  className="pl-11 pr-6 py-2 rounded-xl border-none bg-slate-100 focus:ring-2 focus:ring-primary/10 w-72 text-sm font-medium transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">
                  248 Active Missions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl bg-slate-100 border-none">
                      <Bell className="h-5 w-5 text-slate-600" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-3 rounded-2xl shadow-2xl border-none">
                    <div className="p-3">
                      <h4 className="font-bold text-sm">Notifications</h4>
                    </div>
                    <DropdownMenuSeparator />
                    {mockNotifications.map((n) => (
                      <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 rounded-xl cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs">{n.title}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-tight">{n.desc}</p>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-8 w-px bg-slate-200 mx-2" />
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-10 px-4 rounded-xl text-slate-600 font-bold text-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1400px] p-6">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
