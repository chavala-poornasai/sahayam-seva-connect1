"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation, ExternalLink, Phone, Clock, Loader2, Hospital as HospitalIcon } from "lucide-react";

interface Hospital {
  name: string;
  address: string;
  distance: string;
  phone: string;
  status: string;
  link: string;
  type: string;
}

const initialHospitals: Hospital[] = [
  {
    name: "General Medical Center",
    address: "123 Healthcare Ave, Medical District",
    distance: "1.2 miles",
    phone: "(555) 012-3456",
    status: "Open 24/7",
    type: "Multi-specialty",
    link: "https://www.google.com/maps/search/hospitals+near+me"
  },
  {
    name: "St. Mary's Specialty Hospital",
    address: "456 Wellness Blvd, City South",
    distance: "2.8 miles",
    phone: "(555) 987-6543",
    status: "Open 24/7",
    type: "Critical Care",
    link: "https://www.google.com/maps/search/hospitals+near+me"
  }
];

export default function HospitalFinderPage() {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // Automatically trigger search when enough input is provided
  useEffect(() => {
    if (search.length >= 3) {
      const timer = setTimeout(() => {
        performAutomatedSearch(search);
      }, 600);
      return () => clearTimeout(timer);
    } else if (search.length === 0) {
      setHospitals(initialHospitals);
    }
  }, [search]);

  const performAutomatedSearch = (query: string) => {
    setIsSearching(true);
    
    // Simulate geographic API delay
    setTimeout(() => {
      const areaPrefix = query.charAt(0).toUpperCase() + query.slice(1, 4);
      const results: Hospital[] = [
        {
          name: `${areaPrefix} Memorial Hospital`,
          address: `Block ${Math.floor(Math.random() * 100)}, Sector 12, ${query}`,
          distance: `${(Math.random() * 5).toFixed(1)} miles`,
          phone: `(555) ${Math.floor(Math.random() * 900) + 100}-2222`,
          status: "Open 24/7",
          type: "Emergency Care",
          link: `https://www.google.com/maps/search/hospitals+near+${query}`
        },
        {
          name: `${query.toUpperCase()} Heart & Wellness Clinic`,
          address: `Suite ${Math.floor(Math.random() * 900) + 100}, Health Tower, ${query}`,
          distance: `${(Math.random() * 10).toFixed(1)} miles`,
          phone: `(555) ${Math.floor(Math.random() * 900) + 100}-4444`,
          status: "09:00 AM - 08:00 PM",
          type: "Specialist",
          link: `https://www.google.com/maps/search/hospitals+near+${query}`
        },
        {
          name: `${areaPrefix} Regional Diagnostics`,
          address: `G-Floor, Clinical Square, ${query}`,
          distance: `${(Math.random() * 15).toFixed(1)} miles`,
          phone: `(555) ${Math.floor(Math.random() * 900) + 100}-6666`,
          status: "Open 24/7",
          type: "Diagnostic Center",
          link: `https://www.google.com/maps/search/hospitals+near+${query}`
        }
      ];
      
      setHospitals(results);
      setIsSearching(false);
    }, 1200);
  };

  const handleUseLocation = () => {
    setIsSearching(true);
    // Simulate GPS detection
    setTimeout(() => {
      setSearch("Your Current Area");
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Geographic Hospital Finder</h1>
        <p className="text-muted-foreground">Automatically locate medical facilities and emergency rooms by PIN code or city.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Input Location
              </CardTitle>
              <CardDescription>Enter PIN code or City for real-time area mapping.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                {isSearching ? (
                  <Loader2 className="absolute left-3 top-3 h-4 w-4 text-primary animate-spin" />
                ) : (
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                )}
                <Input 
                  placeholder="e.g. 110001 or New York" 
                  className="pl-10 h-11 bg-white border-none shadow-sm focus-visible:ring-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2 h-11 bg-white"
                onClick={handleUseLocation}
                disabled={isSearching}
              >
                <Navigation className="w-4 h-4" /> Use Device GPS
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2 flex justify-between items-center">
              Nearby Facilities 
              {isSearching && <span className="text-[10px] text-primary animate-pulse italic">Searching Area...</span>}
            </h3>
            
            <div className="space-y-3">
              {hospitals.map((h, index) => (
                <Card 
                  key={index} 
                  className="border-none shadow-sm hover:shadow-md transition-all cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-sm font-bold group-hover:text-primary transition-colors">{h.name}</CardTitle>
                        <span className="text-[9px] bg-muted px-2 py-0.5 rounded font-bold uppercase tracking-tighter text-muted-foreground">
                          {h.type}
                        </span>
                      </div>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold shadow-sm">{h.distance}</span>
                    </div>
                    <CardDescription className="text-xs flex items-center gap-1 mt-2 font-medium">
                      <MapPin className="w-3 h-3 text-red-500" /> {h.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-primary" /> {h.phone}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-green-600" /> {h.status}</span>
                    </div>
                    <Button variant="secondary" asChild className="w-full h-8 text-[10px] font-bold uppercase tracking-wider">
                      <a href={h.link} target="_blank" rel="noopener noreferrer">
                        Navigation Route <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {hospitals.length === 0 && !isSearching && (
                <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed">
                  <HospitalIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-20" />
                  <p className="text-xs font-bold text-muted-foreground">Enter a location to find facilities.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 h-[650px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-muted/20 relative group">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border max-w-sm mx-4 animate-in zoom-in duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary animate-bounce" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dynamic Health Mapping</h3>
              <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                Enter your location details above. Our system will map specialized trauma centers and clinical facilities in your immediate vicinity.
              </p>
              <Button className="w-full font-bold" asChild disabled={!search}>
                <a href={`https://www.google.com/maps/search/hospitals+near+${search || 'me'}`} target="_blank" rel="noopener noreferrer">
                  View Full Satellite Map
                </a>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover grayscale" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
