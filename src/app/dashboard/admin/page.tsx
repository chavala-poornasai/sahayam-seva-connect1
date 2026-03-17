"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth, User } from "@/context/auth-context";
import { useCivic, Feedback } from "@/context/civic-context";
import { 
  Users, 
  Star, 
  ShieldCheck, 
  Search, 
  Mail, 
  MapPin, 
  Target
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function AdminPortal() {
  const { user, getAllUsers } = useAuth();
  const { getAllFeedback } = useCivic();
  const [users, setUsers] = useState<User[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    setUsers(getAllUsers());
    setFeedback(getAllFeedback());
  }, [user, getAllUsers, getAllFeedback, router]);

  const filteredUsers = users.filter(u => 
    (u.fullName || "").toLowerCase().includes(search.toLowerCase()) || 
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-widest text-[10px]">
            <ShieldCheck className="w-3 h-3" /> Administrative Dashboard
          </div>
          <h1 className="text-3xl font-bold tracking-tight">System Intelligence Portal</h1>
          <p className="text-muted-foreground">Monitor platform engagement, user civic profiles, and citizen feedback.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-9 px-4 border-amber-200 bg-amber-50 text-amber-700 font-bold">
            <Users className="w-3 h-3 mr-2" /> {users.length} Active Users
          </Badge>
          <Badge variant="outline" className="h-9 px-4 border-blue-200 bg-blue-50 text-blue-700 font-bold">
            <Star className="w-3 h-3 mr-2" /> {feedback.length} Reviews
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md h-12 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="users" className="rounded-lg data-[state=active]:shadow-sm">Volunteer Directory</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:shadow-sm">Platform Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search volunteers by name or email..." 
                className="pl-10 h-11 bg-white border-none shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.map((u) => (
              <Card key={u.email} className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r bg-muted/5 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {(u.fullName || "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg leading-tight">{u.fullName}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" /> {u.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                            <Target className="w-3 h-3" /> Seva Score
                          </h5>
                          <p className="text-sm font-black">{u.sevaScore}</p>
                        </div>
                        <div className="space-y-3">
                          <h5 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> Location
                          </h5>
                          <p className="text-xs font-medium text-muted-foreground">
                            {u.location || "Verified Indian Citizen"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((f) => (
              <Card key={f.id} className="border-none shadow-sm bg-white overflow-hidden flex flex-col">
                <CardHeader className="bg-muted/10 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm">
                        {(f.userName || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm leading-tight">{f.userName}</h4>
                        <p className="text-[10px] text-muted-foreground">{new Date(f.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < f.rating ? "text-amber-400 fill-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    "{f.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}