
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, UserRole } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  Loader2, 
  Mail, 
  Lock, 
  User as UserIcon,
  ArrowRight,
  Fingerprint,
  Zap,
  Globe,
  MoreVertical,
  Sun,
  Moon,
  Languages,
  Check
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const translations: Record<string, any> = {
  English: {
    brand: "Sahayam Sewa Connect",
    tagline: "When no one comes – we do.",
    citizenTitle: "Citizen / Volunteer",
    citizenDesc: "Empower your community through verified Seva missions and reputation building.",
    ngoTitle: "NGO / Organization",
    ngoDesc: "Mobilize national resources and manage social impact projects at scale.",
    initSession: "Initialize Session",
    returnIdentity: "Return to Identity Selection",
    authGateway: "Authenticated Gateway",
    login: "Login",
    register: "Register",
    emailLabel: "Registered Institutional Email",
    passLabel: "Access PIN",
    authButton: "AUTHENTICATE GATEWAY",
    biometric: "Biometric Verification Active",
    fullName: "Full Legal Name",
    verifyPin: "Verify PIN",
    provision: "PROVISION DIGITAL IDENTITY",
    adminAccess: "Institutional Administrative Access",
    langApplied: "Localization Applied",
    langDesc: "Interface successfully translated to English."
  },
  Telugu: {
    brand: "సహాయం సేవ కనెక్ట్",
    tagline: "ఎవరూ రానప్పుడు – మేము వస్తాము.",
    citizenTitle: "పౌరుడు / వాలంటీర్",
    citizenDesc: "ధృవీకరించబడిన సేవ మిషన్లు మరియు కీర్తి నిర్మాణం ద్వారా మీ సంఘాన్ని శక్తివంతం చేయండి.",
    ngoTitle: "NGO / సంస్థ",
    ngoDesc: "జాతీయ వనరులను సమీకరించండి మరియు సామాజిక ప్రభావ ప్రాజెక్టులను భారీ స్థాయిలో నిర్వహించండి.",
    initSession: "సెషన్‌ను ప్రారంభించండి",
    returnIdentity: "గుర్తింపు ఎంపికకు తిరిగి వెళ్లండి",
    authGateway: "ధృవీకరించబడిన గేట్‌వే",
    login: "లాగిన్",
    register: "నమోదు",
    emailLabel: "నమోదు చేయబడిన సంస్థాగత ఈమెయిల్",
    passLabel: "యాక్సెస్ పిన్",
    authButton: "గేట్‌వేని ధృవీకరించండి",
    biometric: "బయోమెట్రిక్ వెరిఫికేషన్ యాక్టివ్‌గా ఉంది",
    fullName: "పూర్తి చట్టపరమైన పేరు",
    verifyPin: "పిన్‌ని ధృవీకరించండి",
    provision: "డిజిటల్ గుర్తింపును అందించండి",
    adminAccess: "సంస్థాగత పరిపాలనా యాక్సెస్",
    langApplied: "స్థానికీకరణ వర్తించబడింది",
    langDesc: "ఇంటర్‌ఫేస్ విజయవంతంగా తెలుగులోకి అనువదించబడింది."
  },
  Hindi: {
    brand: "सहायम सेवा कनेक्ट",
    tagline: "जब कोई नहीं आता – हम आते हैं।",
    citizenTitle: "नागरिक / स्वयंसेवक",
    citizenDesc: "सत्यापित सेवा मिशनों और प्रतिष्ठा निर्माण के माध्यम से अपने समुदाय को सशक्त बनाएं।",
    ngoTitle: "एनजीओ / संगठन",
    ngoDesc: "राष्ट्रीय संसाधनों को जुटाएं और बड़े पैमाने पर सामाजिक प्रभाव परियोजनाओं का प्रबंधन करें।",
    initSession: "सत्र प्रारंभ करें",
    returnIdentity: "पहचान चयन पर लौटें",
    authGateway: "प्रमाणित गेटवे",
    login: "लॉगिन",
    register: "पंजीकरण",
    emailLabel: "पंजीकृत संस्थागत ईमेल",
    passLabel: "एक्सेस पिन",
    authButton: "गेटवे प्रमाणित करें",
    biometric: "बायोमेट्रिक सत्यापन सक्रिय है",
    fullName: "पूर्ण कानूनी नाम",
    verifyPin: "पिन सत्यापित करें",
    provision: "डिजिटल पहचान प्रदान करें",
    adminAccess: "संस्थागत प्रशासनिक पहुंच",
    langApplied: "स्थानीयकरण लागू",
    langDesc: "इंटरफ़ेस सफलतापूर्वक हिंदी में अनुवादित किया गया।"
  },
  Tamil: {
    brand: "சகாயம் சேவை கனெக்ட்",
    tagline: "யாரும் வராதபோது – நாங்கள் வருகிறோம்.",
    citizenTitle: "குடிமகன் / தன்னார்வலர்",
    citizenDesc: "சரிபார்க்கப்பட்ட சேவா பணிகள் மற்றும் நற்பெயர் கட்டமைப்பு மூலம் உங்கள் சமூகத்தை மேம்படுத்தவும்.",
    ngoTitle: "NGO / அமைப்பு",
    ngoDesc: "தேசிய வளங்களைத் திரட்டி, சமூக தாக்கத் திட்டங்களை அளவில் நிர்வகிக்கவும்.",
    initSession: "அமர்வைத் தொடங்கவும்",
    returnIdentity: "அடையாளத் தேர்வுக்குத் திரும்பு",
    authGateway: "அங்கீகரிக்கப்பட்ட நுழைவாயில்",
    login: "உள்நுழைய",
    register: "பதிவு",
    emailLabel: "பதிவுசெய்யப்பட்ட நிறுவன மின்னஞ்சல்",
    passLabel: "அணுகல் PIN",
    authButton: "நுழைவாயிலை அங்கீகரிக்கவும்",
    biometric: "பயோமெட்ரிக் சரிபார்ப்பு செயலில் உள்ளது",
    fullName: "முழு சட்டப்பூர்வ பெயர்",
    verifyPin: "PIN ஐ சரிபார்க்கவும்",
    provision: "டிஜிட்டல் அடையாளத்தை வழங்கவும்",
    adminAccess: "நிறுவன நிர்வாக அணுகல்",
    langApplied: "உள்ளூர்மயமாக்கல் பயன்படுத்தப்பட்டது",
    langDesc: "இடைமுகம் வெற்றிகரமாக தமிழில் மொழிபெயர்க்கப்பட்டது."
  },
  Malayalam: {
    brand: "സഹായം സേവ കണക്ട്",
    tagline: "ആരും വരാത്തപ്പോൾ – ഞങ്ങൾ വരുന്നു.",
    citizenTitle: "പൗരൻ / സന്നദ്ധപ്രവർത്തകൻ",
    citizenDesc: "പരിശോധിച്ചുറപ്പിച്ച സേവാ മിഷനുകളിലൂടെയും പ്രശസ്തി നിർമ്മാണത്തിലൂടെയും നിങ്ങളുടെ കമ്മ്യൂണിറ്റിയെ ശാക്തീകരിക്കുക.",
    ngoTitle: "എൻജിഒ / സംഘടന",
    ngoDesc: "ദേശീയ വിഭവങ്ങൾ സമാഹരിക്കുകയും സാമൂഹിക സ്വാധീന പദ്ധതികൾ വലിയ അളവിൽ കൈകാര്യം ചെയ്യുകയും ചെയ്യുക.",
    initSession: "സെഷൻ ആരംഭിക്കുക",
    returnIdentity: "തിരിച്ചറിയൽ തിരഞ്ഞെടുപ്പിലേക്ക് മടങ്ങുക",
    authGateway: "അംഗീകൃത ഗേറ്റ്‌വേ",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ",
    emailLabel: "രജിസ്റ്റർ ചെയ്ത ഇൻസ്റ്റിറ്റ്യൂഷണൽ ഇമെയിൽ",
    passLabel: "പ്രവേശന പിൻ",
    authButton: "ഗേറ്റ്‌വേ പ്രാമാണീകരിക്കുക",
    biometric: "ബയോമെട്രിക് പരിശോധന സജീവമാണ്",
    fullName: "പൂർണ്ണ നിയമപരമായ പേര്",
    verifyPin: "പിൻ പരിശോധിക്കുക",
    provision: "ഡിജിറ്റൽ ഐഡന്റിറ്റി നൽകുക",
    adminAccess: "ഇൻസ്റ്റിറ്റ്യൂഷണൽ അഡ്മിനിസ്ട്രേറ്റീവ് ആക്സസ്",
    langApplied: "പ്രാദേശികവൽക്കരണം പ്രയോഗിച്ചു",
    langDesc: "ഇന്റർഫേസ് വിജയകരമായി മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്തു."
  },
  Urdu: {
    brand: "سہایم سیوا کنیکٹ",
    tagline: "جب کوئی نہیں آتا - ہم آتے ہیں۔",
    citizenTitle: "شہری / رضاکار",
    citizenDesc: "تصدیق شدہ سیوا مشنوں اور ساکھ کی تعمیر کے ذریعے اپنی کمیونٹی کو بااختیار بنائیں۔",
    ngoTitle: "این جی او / تنظیم",
    ngoDesc: "قومی وسائل کو متحرک کریں اور سماجی اثرات کے منصوبوں کو بڑے پیمانے پر منظم کریں۔",
    initSession: "سیشن شروع کریں",
    returnIdentity: "شناخت کے انتخاب پر واپس جائیں",
    authGateway: "تصدیق شدہ گیٹ وے",
    login: "لاگ ان",
    register: "رجسٹر",
    emailLabel: "رجسٹرڈ ادارہ جاتی ای میل",
    passLabel: "ایکسیس پن",
    authButton: "گیٹ وے کی تصدیق کریں",
    biometric: "بایومیٹرک تصدیق فعال ہے",
    fullName: "مکمل قانونی نام",
    verifyPin: "پن کی تصدیق کریں",
    provision: "ڈیجیٹل شناخت فراہم کریں",
    adminAccess: "ادارہ جاتی انتظامی رسائی",
    langApplied: "لوکلائزیشن لاگو کر دی گئی",
    langDesc: "انٹرفیس کا کامیابی کے ساتھ اردو میں ترجمہ کر دیا گیا ہے۔"
  },
  Assamese: {
    brand: "সহায় সেৱা কানেক্ট",
    tagline: "যেতিয়া কোনো নাহে – তেতিয়া আমি আহোঁ।",
    citizenTitle: "নাগৰিক / স্বেচ্ছাসেৱক",
    citizenDesc: "পৰীক্ষিত সেৱা অভিযান আৰু সন্মান বৃদ্ধিৰ জৰিয়তে আপোনাৰ সমাজক শক্তিশালী কৰক।",
    ngoTitle: "এনজিঅ' / সংস্থা",
    ngoDesc: "ৰাষ্ট্ৰীয় সম্পদ একত্ৰিত কৰক আৰু বৃহৎ পৰিসৰত সামাজিক প্ৰভাৱ প্ৰকল্পসমূহ পৰিচালনা কৰক।",
    initSession: "অধিৱেশন আৰম্ভ কৰক",
    returnIdentity: "পৰিচয় নিৰ্বাচనলৈ ঘূৰি যাওక",
    authGateway: "প্ৰমাণিত গেটৱে",
    login: "লগইন",
    register: "পঞ্জীয়ন",
    emailLabel: "পঞ্জীয়নভুক্ত প্ৰতিষ্ঠানিক ইমেইল",
    passLabel: "প্ৰৱেশ পিন",
    authButton: "গেটৱে প্ৰমাণিত কৰক",
    biometric: "বায়োমেট্ৰিক পৰীক্ষা সক্ৰিয় হৈ আছে",
    fullName: "সম্পূৰ্ণ আইনী নাম",
    verifyPin: "পিন পৰীক্ষা কৰক",
    provision: "ডিজিটেল পৰিচয় প্ৰদান কৰক",
    adminAccess: "প্ৰতিষ্ঠানিক প্ৰশাসনিক প্ৰৱেশ",
    langApplied: "স্থানীয়কৰণ প্ৰয়োগ কৰা হৈছে",
    langDesc: "ইণ্টাৰফেচ সফলতাৰে অসমীয়ালৈ অনুবাদ কৰা হৈছে।"
  }
};

const indianLanguages = [
  { name: "English", native: "English", code: "en" },
  { name: "Hindi", native: "हिन्दी", code: "hi" },
  { name: "Telugu", native: "తెలుగు", code: "te" },
  { name: "Tamil", native: "தமிழ்", code: "ta" },
  { name: "Malayalam", native: "മലയാളം", code: "ml" },
  { name: "Urdu", native: "اردو", code: "ur" },
  { name: "Assamese", native: "অসমীয়া", code: "as" },
  { name: "Bengali", native: "বাংলা", code: "bn" },
  { name: "Marathi", native: "মরাঠি", code: "mr" },
  { name: "Gujarati", native: "ગુજરાતી", code: "gu" },
  { name: "Kannada", native: "ಕನ್ನಡ", code: "kn" },
  { name: "Punjabi", native: "ਪੰਜਾਬী", code: "pa" },
];

export default function EntryPortal() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup, user, language: globalLang, setLanguage, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [view, setView] = useState<'role' | 'auth'>('role');
  const [activeTab, setActiveTab] = useState("login");
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const t = translations[globalLang] || translations["English"];

  const roles: { id: UserRole; title: string; desc: string; icon: any; color: string; image: string }[] = [
    { 
      id: 'citizen', 
      title: t.citizenTitle, 
      desc: t.citizenDesc, 
      icon: Users, 
      color: 'bg-[#534AB7]',
      image: 'https://images.unsplash.com/photo-1559027615-cd7607c1f3cd?q=80&w=1200'
    },
    { 
      id: 'ngo', 
      title: t.ngoTitle, 
      desc: t.ngoDesc, 
      icon: Building2, 
      color: 'bg-[#D85A30]',
      image: 'https://images.unsplash.com/photo-1469571483332-945781a967f6?q=80&w=1200'
    },
  ];

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      // Redirect based on role
      const role = selectedRole || user?.user_metadata?.role || 'citizen';
      if (role === 'admin') {
        router.push("/admin");
      } else if (role === 'ngo') {
        router.push("/ngo");
      } else {
        router.push("/dashboard/volunteer");
      }
    }
  }, [user, authLoading, router, selectedRole]);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast({
      title: `${newTheme === 'dark' ? 'Dark' : 'Light'} Mode Active`,
      description: `The system UI has been optimized for ${newTheme} environments.`,
    });
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const newT = translations[lang] || translations["English"];
    toast({
      title: newT.langApplied || "Localization Applied",
      description: newT.langDesc || `Interface successfully translated to ${lang}.`,
    });
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setView('auth');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
      toast({ title: "Portal Secured", description: "Identity verified. Redirecting to Sahayam Gateway." });
    } catch (err) {
      toast({ title: "Authentication Failed", description: "Invalid credentials or session expired.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminQuickLogin = async () => {
    setIsLoading(true);
    try {
      await login("admin@sahayam.gov.in", "admin123", "admin");
      toast({ title: "System Administrator Access", description: "Authenticated via Ministry High-Level Gateway." });
    } catch (err) {
      toast({ title: "Gateway Error", description: "National Admin Gateway is temporarily unavailable.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    if (password !== confirmPassword) {
      toast({ title: "Integrity Error", description: "Passwords do not match. Integrity check failed.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      await signup(username, email, password, selectedRole);
      toast({ title: "Registry Updated", description: "Digital identity provisioned. You may now authenticate." });
      setActiveTab("login");
    } catch (err) {
      toast({ title: "System Error", description: "Could not provision identity. Please check your institutional email.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || authLoading) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden font-sans transition-colors duration-500">
      {/* System Configurations - Top Right Menu */}
      <div className="absolute top-8 right-8 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full hover:bg-muted/50 transition-all border border-border/50 backdrop-blur-md">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-3 rounded-3xl shadow-2xl border-none bg-popover/95 backdrop-blur-xl">
            <div className="px-2 py-1.5 mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Interface Control</div>
            
            <DropdownMenuItem 
              onClick={() => toggleTheme('light')}
              className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-muted/50 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Sun className="h-4 w-4 text-amber-600" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest">Light Theme</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={() => toggleTheme('dark')}
              className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-muted/50 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-[#534AB7]/20 flex items-center justify-center">
                <Moon className="h-4 w-4 text-[#534AB7]" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest">Dark Theme</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-border/50" />
            
            <div className="px-2 py-1.5 mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Localization</div>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer hover:bg-muted/50 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Languages className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs uppercase tracking-widest">Language</span>
                  <span className="text-[9px] text-muted-foreground font-bold">{globalLang}</span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="w-56 p-2 rounded-2xl shadow-2xl border-none bg-popover/95 backdrop-blur-xl">
                  <ScrollArea className="h-[350px]">
                    {indianLanguages.map((lang) => (
                      <DropdownMenuItem 
                        key={lang.code} 
                        onClick={() => handleLanguageChange(lang.name)}
                        className="flex flex-col items-start gap-1 p-3 rounded-xl cursor-pointer hover:bg-muted/50 relative"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-xs uppercase tracking-widest">{lang.name}</span>
                          {globalLang === lang.name && <Check className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium">{lang.native}</span>
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Production-Grade Ambient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#534AB7]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1D9E75]/10 blur-[150px] rounded-full" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#D85A30]/5 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 mb-16 text-center"
        >
          {/* Logo container removed, title remains prominent */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground uppercase italic">
              {t.brand}
            </h1>
            <p className="text-[14px] font-black uppercase tracking-[0.6em] text-primary animate-pulse">{t.tagline}</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'role' ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
            >
              {roles.map((role, idx) => (
                <Card 
                  key={role.id} 
                  className="group relative overflow-hidden border-none shadow-3xl rounded-[2.5rem] cursor-pointer hover:-translate-y-3 transition-all duration-700 active:scale-[0.98] bg-card border border-border backdrop-blur-md"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img src={role.image} alt={role.title} className="w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  </div>
                  <CardContent className="relative z-10 p-12 flex flex-col items-center text-center gap-6">
                    <div className={cn("p-6 rounded-[2rem] text-white shadow-2xl group-hover:rotate-6 transition-transform", role.color)}>
                      <role.icon className="w-10 h-10" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black">{role.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground max-w-[280px] leading-relaxed">{role.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-colors mt-4">
                      {t.initSession} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="auth-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="w-full max-w-md"
            >
              <Button 
                variant="ghost" 
                onClick={() => setView('role')} 
                className="mb-8 text-muted-foreground font-bold hover:bg-muted rounded-full px-6 transition-all"
              >
                ← {t.returnIdentity}
              </Button>

              <Card className="border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden bg-card border border-border backdrop-blur-3xl">
                <div className="bg-primary/5 p-10 flex items-center justify-between border-b border-border">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">{t.authGateway}</p>
                    <h2 className="text-3xl font-black tracking-tight">{roles.find(r => r.id === selectedRole)?.title}</h2>
                  </div>
                  <div className={cn("p-4 rounded-3xl shadow-2xl text-white", roles.find(r => r.id === selectedRole)?.color)}>
                    {selectedRole === 'citizen' ? <Users className="w-7 h-7" /> : <Building2 className="w-7 h-7" />}
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="px-10 pt-10">
                    <TabsList className="grid w-full grid-cols-2 h-14 rounded-2xl bg-muted p-1 border border-border">
                      <TabsTrigger value="login" className="rounded-xl text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-background data-[state=active]:text-primary">{t.login}</TabsTrigger>
                      <TabsTrigger value="signup" className="rounded-xl text-[10px] font-black uppercase tracking-[0.2em] data-[state=active]:bg-background data-[state=active]:text-primary">{t.register}</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="login" className="p-10 space-y-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">{t.emailLabel}</Label>
                        <div className="relative">
                          <Mail className="absolute left-5 top-5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="email" 
                            placeholder="identity@sahayam.gov.in" 
                            className="pl-14 h-16 rounded-[1.5rem] bg-muted/50 border-border focus:ring-primary/20" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">{t.passLabel}</Label>
                        <div className="relative">
                          <Lock className="absolute left-5 top-5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-14 h-16 rounded-[1.5rem] bg-muted/50 border-border" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black rounded-[1.5rem] shadow-3xl transition-all active:scale-[0.98] mt-4" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : t.authButton}
                      </Button>
                      <div className="flex items-center justify-center gap-3 text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] pt-4">
                        <Fingerprint className="w-4 h-4 text-[#1D9E75]" /> {t.biometric}
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup" className="p-10 space-y-8">
                    <form onSubmit={handleSignup} className="space-y-6">
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">{t.fullName}</Label>
                        <div className="relative">
                          <UserIcon className="absolute left-5 top-5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Ex: Rajesh Kumar" 
                            className="pl-14 h-16 rounded-[1.5rem] bg-muted/50 border-border" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Institutional Email</Label>
                        <Input 
                          type="email" 
                          placeholder="email@domain.com" 
                          className="h-16 rounded-[1.5rem] bg-muted/50 border-border" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">PIN</Label>
                          <Input 
                            type="password" 
                            placeholder="••••" 
                            className="h-16 rounded-[1.5rem] bg-muted/50 border-border" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-4">
                          <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">{t.verifyPin}</Label>
                          <Input 
                            type="password" 
                            placeholder="••••" 
                            className="h-16 rounded-[1.5rem] bg-muted/50 border-border" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <Button className="w-full h-16 bg-[#1D9E75] hover:bg-[#15805d] text-white font-black rounded-[1.5rem] shadow-3xl transition-all" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin mr-3" /> : t.provision}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center space-y-8"
        >
          <div className="flex items-center justify-center gap-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <ShieldCheck className="w-6 h-6" />
            <Globe className="w-6 h-6" />
            <Zap className="w-6 h-6" />
            <Fingerprint className="w-6 h-6" />
          </div>
          <Button 
            variant="ghost" 
            className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] hover:text-primary transition-all px-10 py-6 rounded-full border border-border hover:border-primary/30"
            onClick={handleAdminQuickLogin}
          >
            {t.adminAccess}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
