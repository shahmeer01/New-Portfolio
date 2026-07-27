import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Smartphone, 
  Sparkles, 
  ShoppingBag, 
  Globe, 
  Database, 
  Terminal, 
  Code2,
  BookOpen,
  Award,
  Calendar,
  Send,
  Eye,
  Github,
  ExternalLink,
  Atom,
  Flame,
  Rocket,
  Zap,
  Heart,
  Activity,
  RefreshCw,
  Layers,
  Workflow,
  Download
} from "lucide-react";

type Tab = "about" | "resume" | "portfolio" | "blog" | "contact";

interface Project {
  id: number;
  title: string;
  category: "Mobile Apps" | "Web Development" | "AI & Automation";
  description: string;
  tags: string[];
  link: string;
  thumbnailStyle: {
    bg: string;
    icon: any;
    iconColor: string;
    illustrationType: "breathing" | "social-proof" | "commerce" | "mobile-dashboard" | "ai-workflow" | "enterprise-charts" | "sync-arrows" | "terminal" | "pulse";
  };
}

function ProjectThumbnail({ project }: { project: Project }) {
  const type = project.thumbnailStyle.illustrationType;
  
  if (type === "social-proof") {
    return (
      <div className="w-full h-full bg-[#151516] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Code dots decoration */}
        <div className="absolute top-3 left-4 flex gap-1.5 opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffdb6e]" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        </div>
        
        {/* Social Proof Widget Mockup */}
        <div className="w-[88%] bg-[#1e1e1f] border border-[#38383a]/60 rounded-xl p-3 shadow-xl flex items-center gap-2.5 relative">
          <div className="absolute top-1.5 right-2 flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[7px] text-zinc-500 font-mono">Live</span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffdb6e] to-amber-500 flex items-center justify-center text-[11px] font-semibold text-zinc-950 shrink-0">
            MT
          </div>
          
          <div className="space-y-0.5 overflow-hidden text-left">
            <h4 className="text-[9.5px] font-medium text-white truncate flex items-center gap-1">
              Shahmeer Talib
              <span className="text-[7.5px] text-[#ffdb6e]">✓</span>
            </h4>
            <p className="text-[8px] text-zinc-400 font-light truncate">Booked a private consultation</p>
            <p className="text-[6.5px] text-zinc-500 font-mono">2 mins ago • via Proof</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "breathing") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-[#1e1b4b] via-[#311042] to-[#4c1d95] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-500/10 blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl" />
        
        <div className="relative flex flex-col items-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <div className="absolute inset-0 border border-purple-300/10 rounded-full animate-ping [animation-duration:3s]" />
            <div className="absolute inset-2 border border-purple-400/20 rounded-full animate-pulse [animation-duration:2s]" />
            <div className="absolute inset-4 border border-pink-400/30 rounded-full" />
            <div className="w-5 h-5 rounded-full bg-[#ffdb6e] flex items-center justify-center shadow-md">
              <Heart size={10} className="text-zinc-950 fill-zinc-950" />
            </div>
          </div>
          <span className="text-[8px] text-purple-200/50 tracking-widest uppercase font-mono mt-2">MINI AURA</span>
        </div>
      </div>
    );
  }
  
  if (type === "commerce") {
    return (
      <div className="w-full h-full bg-[#003b2c] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-emerald-800/20 transform rotate-12 scale-100">
          <ShoppingBag size={100} />
        </div>
        
        <div className="w-[85%] bg-[#1e1e1f]/95 border border-emerald-900/40 rounded-xl p-3 flex flex-col gap-1.5 shadow-2xl relative text-left">
          <div className="flex justify-between items-center pb-1 border-b border-zinc-800/50">
            <span className="text-[8px] text-zinc-400 font-mono uppercase tracking-wide">Shopify Core</span>
            <span className="text-[9px] text-[#ffdb6e] font-semibold">$129.00</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded bg-emerald-950 flex items-center justify-center text-[#ffdb6e]">
              <ShoppingBag size={12} />
            </div>
            <div className="space-y-0.5 overflow-hidden">
              <h5 className="text-[9px] font-medium text-white truncate">Premium Checkout</h5>
              <p className="text-[7px] text-zinc-400 font-light truncate">Liquid API integration</p>
            </div>
          </div>
          <div className="w-full py-1 rounded bg-emerald-600 text-white text-[7.5px] font-medium text-center">
            Quick Pay — 0.4s Checkout
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "mobile-dashboard") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-[#014073] to-[#01579b] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-[85%] h-[90%] bg-[#1e1e1f] border border-sky-900/40 rounded-xl p-2.5 shadow-2xl flex flex-col justify-between text-left">
          <div className="flex justify-between items-center text-[6.5px] text-zinc-500 font-mono border-b border-zinc-800 pb-1">
            <span>FLUTTER FRAMEWORK</span>
            <span>92% FPS</span>
          </div>
          
          <div className="flex items-center gap-2.5 py-0.5">
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="13" stroke="#2a2a2c" strokeWidth="2.5" fill="transparent" />
                <circle cx="16" cy="16" r="13" stroke="#ffdb6e" strokeWidth="2.5" fill="transparent" strokeDasharray="81" strokeDashoffset="14" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[6.5px] text-white font-semibold font-mono">82%</span>
            </div>
            <div className="space-y-0.5 overflow-hidden">
              <h6 className="text-[8px] font-medium text-white truncate">Dart BLoC Engine</h6>
              <p className="text-[7px] text-zinc-400 font-light truncate">Offline secure sync</p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <div className="flex-1 h-2 rounded bg-zinc-850" />
            <div className="flex-1 h-2 rounded bg-[#ffdb6e] text-zinc-950 flex items-center justify-center text-[5.5px] font-bold">ACTIVE</div>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "ai-workflow") {
    return (
      <div className="w-full h-full bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:8px_8px]" />
        
        <div className="relative w-full h-full flex items-center justify-between px-3 z-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sky-400 shadow-md">
              <Terminal size={12} />
            </div>
            <span className="text-[6.5px] text-zinc-500 font-mono">Cron Pipe</span>
          </div>
          
          <div className="flex-1 relative h-6 flex items-center justify-center">
            <svg className="w-full h-2">
              <path d="M 0,4 H 100" stroke="#2a2a2c" strokeWidth="1" strokeDasharray="2,2" />
              <path d="M 0,4 H 50" stroke="#ffdb6e" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
            <div className="absolute w-3.5 h-3.5 rounded-full bg-amber-500/10 border border-amber-400/50 flex items-center justify-center">
              <Sparkles size={8} className="text-[#ffdb6e]" />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400 shadow-md">
              <Workflow size={12} />
            </div>
            <span className="text-[6.5px] text-zinc-500 font-mono">Multi-Agent</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "enterprise-charts") {
    return (
      <div className="w-full h-full bg-[#18181b] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full flex justify-between items-center border-b border-zinc-800 pb-1 mb-2">
          <span className="text-[6.5px] text-zinc-400 font-mono uppercase tracking-wider">Enterprise Web Portal</span>
          <span className="text-[6.5px] text-zinc-500 font-mono">NEXT.JS • REACT</span>
        </div>
        
        <div className="w-full flex-1 flex flex-col justify-end text-left">
          <div className="relative w-full h-[28px] border-l border-b border-zinc-800 flex items-end">
            <div className="absolute top-[9px] left-0 right-0 h-[1px] bg-zinc-900" />
            <div className="absolute top-[18px] left-0 right-0 h-[1px] bg-zinc-900" />
            
            <svg className="w-full h-full absolute inset-0">
              <path d="M 0,25 L 15,18 L 30,22 L 50,8 L 70,14 L 90,4 L 110,12 L 130,2 L 150,10 V 28 H 0 Z" fill="url(#chart-grad-p)" />
              <path d="M 0,25 L 15,18 L 30,22 L 50,8 L 70,14 L 90,4 L 110,12 L 130,2 L 150,10" fill="none" stroke="#ffdb6e" strokeWidth="1" />
              <defs>
                <linearGradient id="chart-grad-p" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffdb6e" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#ffdb6e" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-between text-[6px] text-zinc-500 font-mono mt-0.5">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
            <span>Sun</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "sync-arrows") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-[#01241a] via-[#022c22] to-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="relative flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-teal-950 border border-[#ffdb6e]/20 flex items-center justify-center shadow-lg relative z-10">
            <Database size={12} className="text-[#ffdb6e]" />
          </div>
          
          <div className="absolute w-12 h-12 border border-dashed border-teal-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
          
          <div className="absolute -top-1 w-4 h-4 rounded-full bg-teal-900/80 border border-teal-400/30 flex items-center justify-center">
            <RefreshCw size={8} className="text-teal-300 animate-spin [animation-duration:5s]" />
          </div>
          <div className="absolute -bottom-1 w-4 h-4 rounded-full bg-teal-900/80 border border-teal-400/30 flex items-center justify-center">
            <ShoppingBag size={8} className="text-teal-300" />
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "terminal") {
    return (
      <div className="w-full h-full bg-[#09090b] border border-zinc-900 flex flex-col p-2.5 font-mono relative overflow-hidden">
        <div className="flex justify-between items-center pb-1.5 border-b border-zinc-900 mb-1.5">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[6.5px] text-zinc-500">agent_node.sh</span>
        </div>
        
        <div className="flex-1 space-y-1 text-left text-[7.5px] leading-snug">
          <div className="flex gap-1">
            <span className="text-zinc-600">~</span>
            <span className="text-emerald-400">node init_agent.js</span>
          </div>
          <div className="text-zinc-400 text-[7px] pl-2">
            <span className="text-[#ffdb6e]">➔</span> Pinecone Index Ready
          </div>
          <div className="text-zinc-500 text-[7px] pl-2">
            <span className="text-blue-400">✓</span> Index Swarm initialized
          </div>
          <div className="text-[#ffdb6e] text-[7px] pl-2 animate-pulse">
            █ Processing pipelines...
          </div>
        </div>
      </div>
    );
  }
  
  if (type === "pulse") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-[#2d0014] via-[#4c0519] to-[#0c0c0e] flex flex-col justify-between p-3 relative overflow-hidden">
        <div className="flex justify-between items-center text-[6px] text-zinc-500 font-mono text-left">
          <span>PULSE CARDIO MONITOR</span>
          <span>124 BPM</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center relative">
          <svg className="w-full h-[28px] opacity-90">
            <path d="M 0,14 H 30 L 33,2 L 36,26 L 39,10 L 42,14 H 90 L 93,2 L 96,26 L 99,10 L 102,14 H 140" fill="none" stroke="#ef4444" strokeWidth="1" />
            <path d="M 0,14 H 30 L 33,2 L 36,26 L 39,10 L 42,14 H 90 L 93,2 L 96,26 L 99,10 L 102,14 H 140" fill="none" stroke="#ffdb6e" strokeWidth="1" className="opacity-80 blur-[0.5px]" />
          </svg>
          <div className="absolute right-12 top-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        </div>
        
        <div className="flex justify-between items-center text-[6.5px] text-zinc-400 font-mono text-left">
          <span>Apple Health Sync</span>
          <span className="text-emerald-400">SYNCED</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full bg-[#18181b] flex items-center justify-center p-6 text-[#ffdb6e]">
      <Smartphone size={24} className="stroke-[1.5]" />
    </div>
  );
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageGradient: string;
  tags: string[];
  illustrationType: "ai-flutter" | "shopify-core" | "react-websockets" | "docker-automation";
}

function BlogThumbnail({ post }: { post: BlogPost }) {
  const type = post.illustrationType;
  
  if (type === "ai-flutter") {
    return (
      <div className="w-full h-full bg-gradient-to-tr from-[#140f3b] via-[#24143a] to-[#0c0c0e] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        {/* Animated glowing bubbles */}
        <div className="absolute top-1/4 left-1/3 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-purple-500/10 blur-xl animate-pulse [animation-delay:1.5s]" />

        {/* Floating Mobile Device mockup */}
        <div className="relative w-[70px] h-[120px] bg-[#1e1e1f] border border-zinc-800 rounded-xl p-2 shadow-2xl flex flex-col justify-between shrink-0 transform -rotate-6 transition-transform duration-500 group-hover:rotate-0">
          <div className="flex justify-between items-center text-[5.5px] text-zinc-500 font-mono">
            <span>FLUTTER</span>
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
          </div>
          
          <div className="flex-1 my-1.5 flex flex-col gap-1 justify-center">
            {/* Stream elements */}
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 rounded-full bg-[#ffdb6e]/20 flex items-center justify-center text-[#ffdb6e] text-[5px]">
                ✦
              </div>
              <div className="flex-1 h-1.5 rounded bg-zinc-800" />
            </div>
            <div className="space-y-0.5 pl-3">
              <div className="w-[85%] h-1 rounded bg-indigo-500/20" />
              <div className="w-[65%] h-1 rounded bg-[#ffdb6e]/20" />
            </div>
          </div>
          
          <div className="h-2 rounded bg-zinc-850 flex items-center justify-center text-[4.5px] font-bold text-[#ffdb6e] font-mono">
            BLoC ENGINE
          </div>
        </div>

        {/* Multi-Agent nodes in background */}
        <div className="absolute right-6 top-6 flex flex-col items-center gap-1 opacity-80 scale-90">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ffdb6e] shadow-md">
            <Sparkles size={11} />
          </div>
          <span className="text-[6.5px] text-zinc-500 font-mono">OpenAI agent</span>
        </div>

        <div className="absolute left-6 bottom-5 flex flex-col items-center gap-1 opacity-80 scale-90">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-indigo-400 shadow-md">
            <Code2 size={11} />
          </div>
          <span className="text-[6.5px] text-zinc-500 font-mono">Dart Stream</span>
        </div>
      </div>
    );
  }

  if (type === "shopify-core") {
    return (
      <div className="w-full h-full bg-[#003124] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:12px_12px]" />
        
        <div className="absolute right-4 bottom-4 text-emerald-800/10 transform rotate-12 scale-110">
          <ShoppingBag size={80} />
        </div>

        {/* Floating Transaction UI Card */}
        <div className="w-[85%] bg-[#1e1e1f] border border-emerald-900/40 rounded-xl p-3 flex flex-col gap-2.5 shadow-2xl relative text-left transform rotate-1 transition-transform duration-500 group-hover:rotate-0">
          <div className="flex justify-between items-center pb-1.5 border-b border-zinc-800/60">
            <span className="text-[7.5px] text-zinc-400 font-mono uppercase tracking-wider">Shopify Custom Checkout</span>
            <span className="text-[8.5px] text-[#ffdb6e] font-semibold font-mono">$129.00</span>
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded bg-emerald-950/80 border border-emerald-800/30 flex items-center justify-center text-emerald-400">
              <ShoppingBag size={11} />
            </div>
            <div className="space-y-0.5 overflow-hidden flex-1">
              <h5 className="text-[8.5px] font-medium text-white truncate">Liquid Custom Hook</h5>
              <p className="text-[6.5px] text-zinc-500 font-light truncate">REST Admin Sync Active</p>
            </div>
            <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[6px] font-mono">
              0.4s FAST
            </div>
          </div>
          
          <div className="flex gap-1">
            <div className="flex-1 h-1.5 rounded bg-zinc-850" />
            <div className="w-12 h-1.5 rounded bg-[#ffdb6e]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "react-websockets") {
    return (
      <div className="w-full h-full bg-[#0a101d] flex flex-col justify-between p-3.5 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:10px_10px]" />
        
        <div className="flex justify-between items-center text-[7px] text-zinc-500 font-mono relative z-10">
          <span>HIGH-FREQUENCY DATA PORTAL</span>
          <span className="text-[#ffdb6e] animate-pulse">WS_CONNECTED</span>
        </div>

        {/* WebSocket Signal Waves */}
        <div className="flex-1 flex items-center justify-center relative">
          <svg className="w-full h-[40px] opacity-90">
            <path d="M 0,20 Q 20,40 40,20 T 80,20 T 120,20 T 160,20 T 200,20 T 240,20" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,3" />
            <path d="M 0,20 Q 20,2 40,20 T 80,20 T 120,20 T 160,20 T 200,20 T 240,20" fill="none" stroke="#ffdb6e" strokeWidth="1.2" />
            <path d="M 0,20 Q 20,2 40,20 T 80,20 T 120,20 T 160,20 T 200,20 T 240,20" fill="none" stroke="#ffdb6e" strokeWidth="2.5" className="opacity-45 blur-[1px]" />
          </svg>
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border border-zinc-950 left-1/3 animate-ping" />
          <div className="absolute w-1.5 h-1.5 rounded-full bg-sky-400 right-1/3 animate-pulse" />
        </div>

        <div className="flex justify-between items-center text-[7px] text-zinc-400 font-mono relative z-10 pt-1 border-t border-zinc-900/60">
          <span>React 19 Concurrent Scheduler</span>
          <span className="text-sky-400 font-semibold">99.8% ACC</span>
        </div>
      </div>
    );
  }

  if (type === "docker-automation") {
    return (
      <div className="w-full h-full bg-[#08080a] flex flex-col p-3 font-mono relative overflow-hidden">
        {/* Top Header */}
        <div className="flex justify-between items-center pb-1.5 border-b border-zinc-900 mb-2">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[6.5px] text-zinc-500">docker_daemon_diagnostics.sh</span>
        </div>

        {/* Monospace Code Loglines */}
        <div className="flex-1 space-y-1.5 text-left text-[7.5px] leading-snug">
          <div className="flex gap-1 items-center">
            <span className="text-zinc-600">$</span>
            <span className="text-sky-400">docker-compose up -d --build</span>
          </div>
          <div className="text-zinc-400 text-[7px] pl-2.5 flex items-center gap-1">
            <span className="text-[#ffdb6e]">➔</span>
            <span>Container (cron_pipe_agent) booted</span>
          </div>
          <div className="text-zinc-500 text-[7px] pl-2.5 flex items-center gap-1">
            <span className="text-emerald-400">✓</span>
            <span>Pinecone index memory verified (1536-dim)</span>
          </div>
          <div className="text-[#ffdb6e] text-[7px] pl-2.5 animate-pulse">
            █ Diagnostics complete: all loops synchronized.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-[#ffdb6e]">
      <BookOpen size={24} />
    </div>
  );
}

export default function MainContent() {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const tabs = [
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Portfolio" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  const services = [
    {
      icon: Smartphone,
      title: "Mobile Apps",
      desc: "Professional development of high-performance iOS and Android applications utilizing Flutter.",
    },
    {
      icon: Sparkles,
      title: "AI Integrations",
      desc: "Connecting large language models and cognitive agents directly into digital interfaces.",
    },
    {
      icon: ShoppingBag,
      title: "E-Commerce Systems",
      desc: "Tailored Shopify pipelines, liquid developments, and custom API checkout architectures.",
    },
    {
      icon: Globe,
      title: "Web Engineering",
      desc: "High-quality, responsive web portals crafted using React, Next.js, and modern TypeScript.",
    },
  ];

  const coreTech = [
    { 
      name: "Flutter", 
      icon: Smartphone, 
      color: "#02569B", 
      bg: "bg-[#02569b]/15", 
      hoverBorder: "hover:border-[#02569b]/50",
      logo: () => (
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none">
          <path d="M14.314 0L2.3 12l3.6 3.6 12.014-12h-3.6z" fill="#54C5F8"/>
          <path d="M14.314 24l-8.414-8.4 3.6-3.6 8.414 8.4h-3.6z" fill="#01579B"/>
          <path d="M20.314 12l-6-6-3.6 3.6 6 6-6 6 3.6 3.6 6-6z" fill="#29B6F6"/>
        </svg>
      )
    },
    { 
      name: "React", 
      icon: Atom, 
      color: "#61DAFB", 
      bg: "bg-[#61daf2]/15", 
      hoverBorder: "hover:border-[#61daf2]/50",
      logo: () => (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-[28px] h-[28px]" fill="none">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    { 
      name: "Firebase", 
      icon: Flame, 
      color: "#FFCA28", 
      bg: "bg-[#ffca28]/15", 
      hoverBorder: "hover:border-[#ffca28]/50",
      logo: () => (
        <svg viewBox="0 0 32 32" className="w-[26px] h-[26px]" fill="none">
          <path d="M5.8 24.6l9.6-18c.3-.5 1.1-.5 1.4 0l2.7 5.1 1.9-3.6c.3-.5 1.1-.5 1.4 0l5.4 10.2c.2.4-.1 1-.6 1H5.8c-.5 0-.8-.6-.6-1z" fill="#FFCA28"/>
          <path d="M19.4 4.5c-.3-.5-1.1-.5-1.4 0L15.4 9.6 5.8 24.6l.2.2L15.6 19l3.8-14.5z" fill="#F57C00"/>
          <path d="M5.8 24.6l.2.2 20.2.2.2-.2-1.9-3.6-4.5-8.5c-.3-.5-1.1-.5-1.4 0l-2 3.8-5.4 10.1H5.8z" fill="#E65100"/>
        </svg>
      )
    },
    { 
      name: "Postman", 
      icon: Rocket, 
      color: "#FF6C37", 
      bg: "bg-[#ff6c37]/15", 
      hoverBorder: "hover:border-[#ff6c37]/50",
      logo: () => (
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm2.03-17.583c.433-.424 1.115-.41 1.524.032l.745.807c.41.442.395 1.138-.037 1.562l-7.796 7.643a1.055 1.055 0 01-1.524-.032l-.746-.807a1.127 1.127 0 01.038-1.562l7.796-7.643zm-4.708 6.55c.433-.424 1.115-.41 1.524.032l.745.808c.41.442.396 1.137-.037 1.562l-4.548 4.458a1.055 1.055 0 01-1.524-.031l-.745-.808a1.127 1.127 0 01.037-1.562l4.548-4.458z" fill="#FF6C37"/>
        </svg>
      )
    },
    { 
      name: "Next.js", 
      icon: Globe, 
      color: "#FFFFFF", 
      bg: "bg-white/15", 
      hoverBorder: "hover:border-white/40",
      logo: () => (
        <svg viewBox="0 0 100 100" className="w-[26px] h-[26px]" fill="none">
          <circle cx="50" cy="50" r="48" fill="black" stroke="#333" strokeWidth="2"/>
          <path d="M35 70V30L65 70M65 30V58" stroke="url(#nextjs-grad-skills)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="nextjs-grad-skills" x1="50" y1="30" x2="65" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="#888" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    { 
      name: "Supabase", 
      icon: Zap, 
      color: "#3ECF8E", 
      bg: "bg-[#3ecf8e]/15", 
      hoverBorder: "hover:border-[#3ecf8e]/50",
      logo: () => (
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none">
          <path d="M12.923 2.11a.75.75 0 00-1.077.067L3.433 12.871A.75.75 0 004.02 14.12h6.81l-1.753 7.77a.75.75 0 001.077-.067l8.413-10.694A.75.75 0 0017.98 10h-6.81l1.753-7.77a.75.75 0 000-1.12z" fill="#3ECF8E" />
        </svg>
      )
    },
    { 
      name: "OpenAI", 
      icon: Sparkles, 
      color: "#10A37F", 
      bg: "bg-[#10a37f]/15", 
      hoverBorder: "hover:border-[#10a37f]/50",
      logo: () => (
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none">
          <path d="M19.18 10.22A3.87 3.87 0 0018 7.42l.33-.2a1.32 1.32 0 00-.66-2.42 1.3 1.3 0 00-1.3 1.31v.61a3.86 3.86 0 00-3.33-1.92l-.18-.32a1.32 1.32 0 00-2.27 1.32l.16.29a3.86 3.86 0 00-3.15 2.21l-.3-.17a1.32 1.32 0 00-1.8 1.8l.27.16a3.87 3.87 0 00.17 3.83l-.32.19a1.32 1.32 0 00.66 2.42c.42 0 .82-.2 1.07-.56l.23-.4a3.86 3.86 0 003.33 1.92h.14a1.32 1.32 0 002.27-1.32l-.12-.21a3.86 3.86 0 003.15-2.21l.3.17c.18.1.38.16.59.16a1.32 1.32 0 001.21-1.85l-.27-.16a3.87 3.87 0 00-.17-3.83zm-1.87 2.37l-1.37.79a1 1 0 01-1.37-.36 1 1 0 01.37-1.37l1.37-.79a1 1 0 011.37.36 1 1 0 01-.37 1.37z" fill="#10A37F" />
        </svg>
      )
    },
    { 
      name: "TypeScript", 
      icon: Terminal, 
      color: "#3178C6", 
      bg: "bg-[#3178c6]/15", 
      hoverBorder: "hover:border-[#3178c6]/50",
      logo: () => (
        <svg viewBox="0 0 24 24" className="w-[26px] h-[26px]" fill="none">
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M14.5 17.5c-1.2 0-2.1-.4-2.7-1.1l1-1.2c.4.5.9.8 1.6.8.6 0 .9-.3.9-.7 0-.4-.3-.6-1.1-.9-.9-.3-1.9-.7-1.9-2.1 0-1.2.9-2 2.2-2 .9 0 1.7.3 2.3.8l-.9 1.2c-.5-.4-.9-.6-1.4-.6-.4 0-.7.2-.7.5s.3.4 1 .7c1.1.4 2 .8 2 2.2 0 1.3-.9 2.1-2.2 2.1zm-7.6-1.1V9.5H5v-1.4h6.5v1.4h-1.9v6.9H6.9z" fill="white" />
        </svg>
      )
    },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Proof Engine",
      category: "AI & Automation",
      description: "Automated conversion-rate booster orchestrating dynamic user notifications and behavioral triggers.",
      tags: ["OpenAI", "Next.js", "TypeScript"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#151516]",
        icon: Sparkles,
        iconColor: "#ffdb6e",
        illustrationType: "social-proof"
      }
    },
    {
      id: 2,
      title: "Mini Aura Wellness",
      category: "Mobile Apps",
      description: "Clean cross-platform mobile mindfulness assistant with offline-first state and guided breath patterns.",
      tags: ["Flutter", "Dart", "BLoC"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#1d1b4c]",
        icon: Heart,
        iconColor: "#ef4444",
        illustrationType: "breathing"
      }
    },
    {
      id: 3,
      title: "Shopify Custom Core",
      category: "Web Development",
      description: "High-conversion storefronts utilizing modular Liquid components and fast transaction endpoints.",
      tags: ["Liquid", "Shopify API", "Tailwind"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#003b2c]",
        icon: ShoppingBag,
        iconColor: "#10b981",
        illustrationType: "commerce"
      }
    },
    {
      id: 4,
      title: "Flutter Mobile Framework",
      category: "Mobile Apps",
      description: "Enterprise cross-platform design layout featuring reactive analytical components and secure local cache.",
      tags: ["Flutter", "Dart", "SQLite"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#014073]",
        icon: Smartphone,
        iconColor: "#0288d1",
        illustrationType: "mobile-dashboard"
      }
    },
    {
      id: 5,
      title: "Multi-Agent Token Streamer",
      category: "AI & Automation",
      description: "Low-latency cron automation managing autonomous workflows and semantic retrieval agents.",
      tags: ["Gemini API", "Python", "Pinecone"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#09090b]",
        icon: Workflow,
        iconColor: "#a855f7",
        illustrationType: "ai-workflow"
      }
    },
    {
      id: 6,
      title: "Enterprise Web Dashboard",
      category: "Web Development",
      description: "Next-gen bento layout featuring high-performance real-time WebSocket state management.",
      tags: ["React", "WebSockets", "Node.js"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#18181b]",
        icon: Globe,
        iconColor: "#ffdb6e",
        illustrationType: "enterprise-charts"
      }
    },
    {
      id: 7,
      title: "AuraSync Real-time Gateway",
      category: "Web Development",
      description: "Automated webhook queueing pipeline optimizing e-commerce inventories and synchronized server caches.",
      tags: ["Shopify", "Redis", "Node.js"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#022c22]",
        icon: RefreshCw,
        iconColor: "#059669",
        illustrationType: "sync-arrows"
      }
    },
    {
      id: 8,
      title: "Automated Developer Terminal",
      category: "AI & Automation",
      description: "Monospace CLI platform for scheduling background agent tasks and processing index diagnostics.",
      tags: ["Docker", "Terminal", "GPT-4"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#09090b]",
        icon: Terminal,
        iconColor: "#10b981",
        illustrationType: "terminal"
      }
    },
    {
      id: 9,
      title: "Pulse Cardio Track",
      category: "Mobile Apps",
      description: "iOS/Android fitness companion with beautiful cardiac-wave animations and Apple Health integrations.",
      tags: ["Flutter", "Dart", "CoreHealth"],
      link: "#",
      thumbnailStyle: {
        bg: "bg-[#4c0519]",
        icon: Activity,
        iconColor: "#f43f5e",
        illustrationType: "pulse"
      }
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Bridging AI Agents with State-Driven Flutter Apps",
      category: "AI & Flutter",
      date: "July 12, 2026",
      readTime: "5 min read",
      excerpt: "Architecting low-latency BLoC stream patterns to pipe autonomous multi-agent conversational tokens into Flutter views.",
      imageGradient: "from-zinc-900 to-zinc-950",
      tags: ["Flutter", "OpenAI", "Dart", "AI"],
      illustrationType: "ai-flutter"
    },
    {
      id: 2,
      title: "Shopify Custom Core: Building 0.4s Headless Checkouts",
      category: "E-Commerce",
      date: "June 20, 2026",
      readTime: "4 min read",
      excerpt: "How we optimized Liquid rendering and routed middleware webhooks to bypass standard database synchronization bottlenecks.",
      imageGradient: "from-zinc-950 to-zinc-900",
      tags: ["Shopify", "Liquid", "React", "Next.js"],
      illustrationType: "shopify-core"
    },
    {
      id: 3,
      title: "Real-Time State Syncing with React and WebSockets",
      category: "Web Dev",
      date: "May 15, 2026",
      readTime: "6 min read",
      excerpt: "A deep dive into managing high-frequency live state updates in React 19 without triggering concurrent rendering thread lockups.",
      imageGradient: "from-zinc-900 to-zinc-950",
      tags: ["React", "TypeScript", "WebSockets"],
      illustrationType: "react-websockets"
    },
    {
      id: 4,
      title: "Monospace Diagnostics: Automated Cron Agents on Docker",
      category: "Automation",
      date: "April 02, 2026",
      readTime: "7 min read",
      excerpt: "Configuring containerized worker nodes to execute autonomous diagnostic script runs and sync Pinecone semantic index clusters.",
      imageGradient: "from-zinc-950 to-zinc-900",
      tags: ["AI", "Docker", "Terminal", "Python"],
      illustrationType: "docker-automation"
    }
  ];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="flex-1 bg-[#1e1e1f] border border-[#38383a]/30 rounded-[20px] flex flex-col relative min-h-[500px] shadow-xl">
      
      {/* Tab Navigation Menu (compact, self-contained top-right design) */}
      <nav className="absolute top-0 right-0 z-20 bg-[#2b2b2c] border-b border-l border-[#38383a]/30 rounded-bl-[20px] rounded-tr-[20px] hidden md:flex overflow-hidden h-[50px] items-center">
        <ul className="flex items-center px-6 py-0 gap-[20px] h-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="flex items-center h-full">
                <button
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`text-[12.5px] font-normal transition-all duration-200 cursor-pointer h-full flex items-center ${
                    isActive ? "text-[#ffdb6e] font-medium" : "text-[#d6d6d6] hover:text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Tab Navigation (Horizontal Scrollable Menu) */}
      <nav className="md:hidden w-full bg-[#2b2b2c] border-b border-[#38383a]/30 rounded-t-[20px] flex overflow-x-auto scrollbar-none py-3 px-4 shrink-0">
        <ul className="flex items-center gap-4 mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="shrink-0">
                <button
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`px-3 py-1.5 text-xs font-normal rounded-lg transition-all ${
                    isActive ? "text-[#ffdb6e] bg-[#1e1e1f]" : "text-[#d6d6d6] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-[48px] pt-7 md:pt-8 overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-9"
          >
            
            {/* Header / Page Title with exact yellow underline spacing */}
            <div className="flex justify-between items-start pb-2">
              <div className="space-y-2">
                <h2 className="text-[28px] md:text-[34px] font-bold text-white tracking-tight capitalize">
                  {activeTab === "about" ? "About Me" : activeTab === "portfolio" ? "Portfolio" : activeTab === "blog" ? "Blog" : activeTab}
                </h2>
                <div className="w-[40px] h-[5px] bg-[#ffdb6e] rounded-full" />
              </div>

              {activeTab === "resume" && (
                <motion.a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#2b2b2c] border border-[#38383a]/50 text-[#ffdb6e] hover:text-zinc-950 hover:bg-[#ffdb6e] hover:border-transparent text-[13px] sm:text-[13.5px] font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-md shrink-0 mt-6 md:mt-8"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={14} className="stroke-[1.8]" />
                  <span className="hidden sm:inline">Download Resume</span>
                  <span className="sm:hidden">Download</span>
                </motion.a>
              )}
            </div>

            {/* TAB CONTENT: ABOUT */}
            {activeTab === "about" && (
              <div className="space-y-9">
                
                {/* Paragraphs with increased vertical spacing and restricted width (reduced by ~10% to 550px for perfect readability) */}
                <div className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-[1.95] font-normal space-y-7 max-w-none">
                  <p>
                    I am a dedicated Product Engineer and AI Builder based in Lahore, Pakistan. I specialize in bridging the gap between design philosophy and high-performance software engineering to turn complex requirements into clean, scalable, and intuitive digital products.
                  </p>
                  <p>
                    With over 5 years of professional focus on user experience and robust system design, my primary goal is to build automated workflows, next-generation mobile applications, and reliable web platforms that deliver exceptional performance and measurable business value.
                  </p>
                </div>

                {/* What I'm Doing (Height reduced by 15%, horizontal padding increased, icon & text size reduced slightly) */}
                <div className="space-y-3.5">
                  <h3 className="text-[20px] md:text-[23px] font-bold text-white tracking-tight">What I'm Doing</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {services.map((service, idx) => (
                      <div 
                        key={idx} 
                        className="p-[20px] rounded-[16px] bg-[#222224]/70 border border-[#38383a]/25 flex items-center gap-[12px] hover:border-[#38383a]/40 transition-all duration-300"
                      >
                        <div className="text-[#ffdb6e] bg-[#2d2d30] border border-[#38383a]/40 rounded-[12px] shrink-0 w-[44px] h-[44px] flex items-center justify-center shadow-inner">
                          <service.icon size={22} className="stroke-[1.5]" />
                        </div>
                        <div className="flex flex-col gap-[6px]">
                          <h4 className="text-[18px] font-semibold text-white tracking-wide">{service.title}</h4>
                          <p className="text-[14px] text-[#B0B0B0] leading-relaxed font-normal">{service.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core Technologies / Skills (Reduced height to 102px while keeping width unchanged, renamed to match reference exactly) */}
                <div className="space-y-3.5 pt-1">
                  <h3 className="text-[20px] md:text-[23px] font-bold text-white tracking-tight">Skills</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {coreTech.map((tech, idx) => (
                      <div 
                        key={idx} 
                        className={`flex flex-col items-center justify-center p-4 h-[102px] rounded-[18px] bg-[#212123]/40 border border-[#38383a]/25 ${tech.hoverBorder} transition-all duration-300 group shadow-md`}
                      >
                        <div 
                          className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center ${tech.bg} mb-2 transition-all duration-300 group-hover:scale-105`}
                        >
                          {tech.logo ? (
                            <tech.logo />
                          ) : (
                            <tech.icon size={25} color={tech.color} className="stroke-[1.5]" />
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-300 group-hover:text-[#ffdb6e] font-normal tracking-wide text-center transition-colors">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: RESUME */}
            {activeTab === "resume" && (
              <div className="space-y-10">
                
                {/* Education Timeline */}
                <div className="space-y-5">
                  <div className="flex items-center gap-4.5">
                    <div className="w-11 h-11 rounded-xl bg-[#212123]/80 border border-[#38383a]/30 flex items-center justify-center text-[#ffdb6e]">
                      <BookOpen size={16} className="stroke-[1.5]" />
                    </div>
                    <h3 className="text-[20px] md:text-[23px] font-bold text-white tracking-tight">Education</h3>
                  </div>

                  <div className="space-y-[44px]">
                    {/* Education Item 1 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Vertical line going up to icon box */}
                      <div className="absolute left-[21.5px] top-[-28px] h-[35px] w-[1px] bg-[#38383a]/40" />
                      {/* Dot */}
                      <div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">FAST NUCES</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">Bachelor of Science in Computer Science</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2016 — 2020</span>
                      <p className="text-[13px] text-zinc-400 leading-relaxed font-normal mt-3.5">
                        Focused on robust software engineering architectures, database management systems, algorithms, and human-computer interaction.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience Timeline */}
                <div className="space-y-5">
                  <div className="flex items-center gap-4.5">
                    <div className="w-11 h-11 rounded-xl bg-[#212123]/80 border border-[#38383a]/30 flex items-center justify-center text-[#ffdb6e]">
                      <Award size={16} className="stroke-[1.5]" />
                    </div>
                    <h3 className="text-[20px] md:text-[23px] font-bold text-white tracking-tight">Experience</h3>
                  </div>

                  <div className="space-y-[44px]">
                    {/* Experience Item 1 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Vertical line going up to icon box and down to next item */}
                      <div className="absolute left-[21.5px] top-[-28px] bottom-[-51px] w-[1px] bg-[#38383a]/40" />
                      {/* Dot */}
                      <div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Senior Product Engineer &amp; AI Builder</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">TechFlow Dynamics</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2022 — Present</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Architected and deployed high-performance web products and multi-agent LLM workflows.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Designed responsive, accessible layouts using modern React, Tailwind CSS, and Framer Motion.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Implemented scalable API pathways, fast caching layers, and robust client session security.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Collaborated directly with designers and stakeholders to translate abstract ideas into polished software.
                        </li>
                      </ul>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Dot */}
                      <div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Flutter Developer &amp; Full-Stack Engineer</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">ByteLabs Solutions</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2020 — 2022</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Led cross-platform mobile development using Flutter, Dart, and standard state management.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Integrated payment gateways, real-time push notifications, and offline data synchronization.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Managed headless commerce transitions and custom serverless backends for high availability.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Identified bottlenecks and optimized runtime performance, leading to substantial app load time reduction.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: PORTFOLIO */}
            {activeTab === "portfolio" && (
              <div className="space-y-6">
                
                {/* Desktop Filter Navigation */}
                <div className="hidden md:flex items-center gap-[25px] pl-[5px] mb-[30px]">
                  {["All", "Mobile Apps", "Web Development", "AI & Automation"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[14px] transition-all cursor-pointer ${
                        selectedCategory === cat 
                          ? "text-[#ffdb6e] font-medium" 
                          : "text-zinc-400 hover:text-zinc-300 font-light"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Mobile Filter Dropdown */}
                <div className="md:hidden relative mb-[25px] z-30">
                  <button
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 bg-[#1e1e1f] border border-[#38383a]/40 rounded-[14px] text-zinc-300 text-[13px] font-light transition-all cursor-pointer"
                  >
                    <span>{selectedCategory === "All" ? "Select category" : selectedCategory}</span>
                    <div className={`text-zinc-400 transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180" : ""}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {isFilterDropdownOpen && (
                    <ul className="absolute top-[calc(100%+6px)] left-0 w-full bg-[#1e1e1f] border border-[#38383a]/40 rounded-[14px] p-1.5 z-40 shadow-lg">
                      {["All", "Mobile Apps", "Web Development", "AI & Automation"].map((cat) => (
                        <li key={cat} className="w-full">
                          <button
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsFilterDropdownOpen(false);
                            }}
                            className={`w-full px-[10px] py-2 text-left text-[13px] rounded-lg transition-all ${
                              selectedCategory === cat
                                ? "text-[#ffdb6e] bg-[#2b2b2c]/40 font-medium"
                                : "text-zinc-400 hover:text-zinc-200 hover:bg-[#2b2b2c]/20 font-light"
                            }`}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[30px]">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((p) => (
                      <motion.div
                        layout
                        key={p.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group w-full flex flex-col cursor-pointer"
                      >
                        {/* Thumbnail card with aspect 4/3 and lift hover effects */}
                        <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-4 bg-[#2b2b2c]/30 border border-[#38383a]/25 shadow-md transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_24px_-8px_rgba(255,219,110,0.15)] group-hover:border-[#ffdb6e]/40">
                          {/* Rich interactive vector mockup rendering */}
                          <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-[1.03]">
                            <ProjectThumbnail project={p} />
                          </div>
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                            <div className="w-12 h-12 rounded-xl bg-[#212123]/90 text-[#ffdb6e] flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100 border border-[#38383a]/40 shadow-lg">
                              <Eye size={18} className="stroke-[1.5]" />
                            </div>
                          </div>
                        </div>

                        {/* Title, Category and Description */}
                        <div className="px-1.5 space-y-1 text-left">
                          <h3 className="text-[15px] font-medium text-white tracking-wide capitalize leading-snug group-hover:text-[#ffdb6e] transition-colors duration-300">
                            {p.title}
                          </h3>
                          <p className="text-[11px] text-[#ffdb6e]/85 font-medium">
                            {p.category}
                          </p>
                          <p className="text-[12px] text-zinc-400 leading-relaxed font-normal pt-1 text-zinc-400/90 line-clamp-2">
                            {p.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

              </div>
            )}

            {/* TAB CONTENT: BLOG */}
            {activeTab === "blog" && (
              <div className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="group rounded-2xl border border-[#38383a]/40 bg-[#212123]/20 overflow-hidden flex flex-col hover:border-[#38383a]/70 hover:shadow-[0_12px_24px_-8px_rgba(255,219,110,0.06)] transition-all duration-300 cursor-pointer shadow-md text-left"
                    >
                      {/* Featured Image */}
                      <div className="relative h-44 w-full bg-[#1e1e1f] border-b border-[#38383a]/30 overflow-hidden">
                        <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-[1.03]">
                          <BlogThumbnail post={post} />
                        </div>
                        {/* Overlay to dim slightly on hover */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Info block */}
                      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                        <div className="space-y-2">
                          {/* Metadata Row */}
                          <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                            <span className="text-[#ffdb6e] font-medium uppercase tracking-wider">{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span className="text-zinc-400">{post.readTime}</span>
                          </div>

                          {/* Title */}
                          <h4 className="text-[15px] font-semibold text-white tracking-wide group-hover:text-[#ffdb6e] transition-colors duration-300 leading-snug">
                            {post.title}
                          </h4>

                          {/* Excerpt */}
                          <p className="text-[12px] text-zinc-400 leading-relaxed font-normal line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer Section with tags and CTA */}
                        <div className="space-y-4 pt-3 border-t border-[#38383a]/25">
                          {/* Technology Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {post.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="px-2 py-0.5 rounded bg-[#2b2b2c]/60 border border-[#38383a]/20 text-zinc-400 text-[10px] font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Read Link */}
                          <div className="flex items-center text-[12.5px] font-medium text-[#ffdb6e]/85 group-hover:text-[#ffdb6e] transition-colors duration-300 pt-0.5">
                            <span>Read Article</span>
                            <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1 ml-1 text-[#ffdb6e]">
                              →
                            </span>
                          </div>
                        </div>
                      </div>

                    </article>
                  ))}
                </div>

              </div>
            )}

            {/* TAB CONTENT: CONTACT */}
            {activeTab === "contact" && (
              <div className="space-y-8 md:space-y-9">
                
                {/* 1. Large embedded Google Map showing Lahore, Pakistan */}
                <div className="w-full h-[280px] md:h-[300px] rounded-[24px] overflow-hidden border border-[#38383a]/30 relative group shadow-md bg-[#212123]/20">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108841.31976073167!2d74.30889218698188!3d31.52036959957778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901b4e019a167%3A0x83cf3162c0e9420f!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lahore, Pakistan Map"
                    className="w-full h-full grayscale invert-[0.9] contrast-[1.2] brightness-[0.85] opacity-75 group-hover:opacity-95 transition-all duration-500"
                  />
                  {/* Subtle decorative border overlay */}
                  <div className="absolute inset-0 pointer-events-none rounded-[24px] border border-white/5" />
                </div>

                {/* 2. Heading and Description */}
                <div className="space-y-2 text-left">
                  <h3 className="text-[22px] md:text-[25px] font-bold text-white tracking-tight">
                    Get In Touch
                  </h3>
                  <p className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-relaxed max-w-none font-normal">
                    I'm always open to discussing new projects, collaborations, AI products, Shopify development, and software engineering opportunities.
                  </p>
                </div>

                {/* 3. Contact Form */}
                <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                  
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Full Name</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          required 
                          placeholder="John Doe"
                          className="w-full px-5 py-3.5 text-[13px] bg-[#212123]/20 border border-[#38383a]/40 text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:border-[#ffdb6e] focus:bg-[#212123]/40 focus:ring-1 focus:ring-[#ffdb6e]/10 transition-all duration-300 font-normal shadow-sm hover:border-[#38383a]/70"
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Email Address</label>
                      <div className="relative group">
                        <input 
                          type="email" 
                          required 
                          placeholder="johndoe@gmail.com"
                          className="w-full px-5 py-3.5 text-[13px] bg-[#212123]/20 border border-[#38383a]/40 text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:border-[#ffdb6e] focus:bg-[#212123]/40 focus:ring-1 focus:ring-[#ffdb6e]/10 transition-all duration-300 font-normal shadow-sm hover:border-[#38383a]/70"
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div className="space-y-2">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Subject</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        required 
                        placeholder="How can I help you?"
                        className="w-full px-5 py-3.5 text-[13px] bg-[#212123]/20 border border-[#38383a]/40 text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:border-[#ffdb6e] focus:bg-[#212123]/40 focus:ring-1 focus:ring-[#ffdb6e]/10 transition-all duration-300 font-normal shadow-sm hover:border-[#38383a]/70"
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div className="space-y-2">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Message</label>
                    <div className="relative group">
                      <textarea 
                        required 
                        rows={5}
                        placeholder="Type your message here..."
                        className="w-full px-5 py-4 text-[13px] bg-[#212123]/20 border border-[#38383a]/40 text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:border-[#ffdb6e] focus:bg-[#212123]/40 focus:ring-1 focus:ring-[#ffdb6e]/10 transition-all duration-300 font-normal resize-none shadow-sm hover:border-[#38383a]/70"
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-3">
                    <motion.button
                      type="submit"
                      className="flex items-center gap-2.5 px-8 py-3.5 bg-[#2b2b2c] border border-[#38383a]/50 text-[#ffdb6e] hover:text-zinc-950 hover:bg-[#ffdb6e] hover:border-transparent text-[13px] font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-md"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Send size={13} className="stroke-[1.5]" />
                      <span>Send Message</span>
                    </motion.button>
                  </div>

                </form>

              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
