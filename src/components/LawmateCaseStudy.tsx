import { useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { Icon as IconifyIcon } from "@iconify/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  AudioLines,
  BookOpen,
  Bot,
  Braces,
  Briefcase,
  CircleHelp,
  Database,
  Gavel,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  LayoutGrid,
  MessageCircle,
  MessageSquareOff,
  MessageSquareText,
  Mic,
  MonitorSmartphone,
  Palette,
  PenTool,
  Phone,
  PhoneMissed,
  Puzzle,
  Rocket,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Square,
  Users,
} from "lucide-react";
import lawMateLogo from "../assets/images/projects/law-mate.png";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const IMG = "/images/projects/law-mate";

const BLUE = "#60a5fa";
const BLUE_SOFT = "#93c5fd";
const AMBER = "#fbbf24";
const EMERALD = "#34d399";
const VIOLET = "#a78bfa";
const ROSE = "#fb7185";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const journeyUp: Variants = {
  hidden: { opacity: 0, x: -18, y: 10 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function navigateTo(path: string) {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ───────────────────────────── Primitives ───────────────────────────── */

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={`space-y-10 md:space-y-14 scroll-mt-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionHead({
  index,
  kicker,
  title,
  desc,
  center = false,
  id,
  titleClass = "",
  descClass = "",
}: {
  index: string;
  kicker: string;
  title: string;
  desc?: string;
  center?: boolean;
  id?: string;
  titleClass?: string;
  descClass?: string;
}) {
  return (
    <motion.div
      id={id}
      variants={fadeUp}
      className={`max-w-[720px] scroll-mt-24 ${center ? "mx-auto text-center" : ""}`}
    >
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#93c5fd]">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-[#93c5fd]/70 to-transparent" />
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500">{kicker}</span>
      </div>
      <h2 className={`font-display text-[28px] md:text-[40px] font-bold text-white tracking-tight mt-5 leading-[1.1] ${titleClass}`}>
        {title}
      </h2>
      {desc && (
        <p className={`text-zinc-400 text-[15px] md:text-[16px] leading-[1.85] mt-4 ${center ? "mx-auto max-w-[620px]" : ""} ${descClass}`}>
          {desc}
        </p>
      )}
    </motion.div>
  );
}

function AppImage({ src, alt, file, className = "" }: { src: string; alt: string; file: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative ${className}`}>
      {failed ? (
        <Placeholder file={file} alt={alt} />
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-contain" />
      )}
    </div>
  );
}

function Placeholder({ file, alt }: { file: string; alt: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#101016] border border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(96,165,250,0.08),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-3.5 px-8 text-center">
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.04] text-[#93c5fd]">
          <MonitorSmartphone size={20} className="stroke-[1.5]" />
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">{file}</p>
          <p className="text-[12px] text-zinc-400 mt-1.5 max-w-[220px]">{alt}</p>
        </div>
        <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
          Screenshot placeholder
        </span>
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt, file, className = "", children }: { src?: string; alt?: string; file?: string; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-8 rounded-full bg-[#60a5fa]/[0.1] blur-3xl" />
      <div className="relative rounded-[3rem] bg-gradient-to-b from-[#31313c] to-[#0b0b0f] p-[7px] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-[9/19.5] rounded-[2.55rem] overflow-hidden bg-[#050506] [filter:brightness(1.08)_saturate(1.05)]">
          {children ? (
            children
          ) : (
            <AppImage src={src} alt={alt} file={file} className="w-full h-full object-contain" />
          )}
          <div className="absolute inset-0 rounded-[2.55rem] ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

const VOICE_TRANSCRIPT = "Can I file for divorce without my husband's consent?";

function VoiceAppScreen() {
  const [listening, setListening] = useState(true);
  const [typed, setTyped] = useState(0);
  const [secs, setSecs] = useState(0);

  const complete = typed >= VOICE_TRANSCRIPT.length;

  useEffect(() => {
    if (!listening || complete) return;
    const id = setTimeout(() => setTyped((t) => t + 1), 90);
    return () => clearTimeout(id);
  }, [typed, listening, complete]);

  useEffect(() => {
    if (!complete) return;
    const id = setTimeout(() => setTyped(0), 5400);
    return () => clearTimeout(id);
  }, [complete]);

  useEffect(() => {
    if (!listening) return;
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [listening]);

  const fmt = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const status = !listening ? "Tap the mic to speak" : complete ? "Preparing response" : "Listening";

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#0a0c14]">
      {/* Soft blue ambient glow */}
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(130%_110%_at_50%_0%,rgba(59,130,246,0.2),transparent_62%)] pointer-events-none" />
      <div className="absolute left-1/2 top-[46%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_62%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(100%_100%_at_50%_100%,rgba(59,130,246,0.1),transparent_60%)] pointer-events-none" />

      {/* Status bar */}
      <div className="relative flex items-center justify-between px-5 pt-3">
        <span className="text-[12px] font-semibold text-white">9:41</span>
        <span className="w-14 h-4 rounded-full bg-black/50 ring-1 ring-white/[0.06]" />
        <span className="flex items-center gap-[3px]">
          <span className="w-1 h-1.5 rounded-[1px] bg-white/80" />
          <span className="w-1 h-1.5 rounded-[1px] bg-white/80" />
          <span className="w-1 h-1.5 rounded-[1px] bg-white/80" />
          <span className="w-1 h-1.5 rounded-[1px] bg-white/40" />
          <span className="relative w-4 h-2 rounded-[2px] border border-white/50">
            <span className="absolute inset-[1px] right-[2px] rounded-[1px] bg-white/80" />
          </span>
        </span>
      </div>

      {/* App navbar */}
      <div className="relative mt-2.5 flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#93c5fd] shadow-[0_6px_18px_-6px_rgba(59,130,246,0.8)]">
            <Shield size={14} className="text-white stroke-[2]" />
          </span>
          <span className="text-[15px] font-bold text-white tracking-tight">LawMate</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.06]">
            <Search size={13} className="text-zinc-200 stroke-[1.8]" />
          </span>
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.06]">
            <Siren size={13} className="text-zinc-200 stroke-[1.8]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#60a5fa] ring-2 ring-[#0a0c14]" />
          </span>
        </div>
      </div>

      {/* Conversation area */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pb-7">
        {/* Voice orb */}
        <div className="relative flex items-center justify-center">
          {/* Ring waveform */}
          <div className="absolute h-[232px] w-[232px]">
            {RING_WAVE.map((b, i) => {
              const angle = (i / RING_WAVE.length) * 360;
              return (
                <span
                  key={i}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translateY(-106px)`, transformOrigin: "0 0" }}
                >
                  <motion.span
                    animate={{ height: b.h, opacity: b.o }}
                    transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
                    className="block w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#93c5fd] to-transparent"
                  />
                </span>
              );
            })}
          </div>
          {/* Core orb */}
          <motion.button
            onClick={() => setListening((l) => !l)}
            aria-label="Toggle listening"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-[132px] w-[132px] items-center justify-center rounded-full ring-1 ring-white/25"
            style={{
              background: "radial-gradient(circle at 34% 26%, #bfdbfe, #60a5fa 30%, #3b82f6 55%, #1e40af 80%, #0f2a6b 100%)",
              boxShadow: "0 0 90px 18px rgba(59,130,246,0.45), inset 0 -16px 34px rgba(2,6,23,0.55), inset 0 8px 18px rgba(255,255,255,0.22)",
            }}
          >
            <span className="absolute top-4 left-5 h-6 w-10 rounded-full bg-white/25 blur-[5px] pointer-events-none" />
            <span className="absolute bottom-7 right-7 h-5 w-5 rounded-full bg-white/10 blur-[4px] pointer-events-none" />
          </motion.button>
        </div>

        {/* Live listening state */}
        <div className="mt-12 flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${listening ? "bg-[#60a5fa] animate-pulse" : "bg-white/30"}`} />
          <span className="text-[13px] font-medium tracking-wide text-white/90">{listening ? "Listening" : "Paused"}</span>
        </div>

        {/* Live transcript */}
        <div className="mt-3 flex h-10 max-w-[252px] items-start justify-center">
          <p className="text-center text-[13px] font-medium leading-snug text-white/85">
            {VOICE_TRANSCRIPT.slice(0, typed)}
            {listening && <span className="ml-px inline-block h-[13px] w-[2px] translate-y-[1px] bg-[#93c5fd] animate-pulse" />}
          </p>
        </div>

        {/* Duration timer + AI response status */}
        <div className="mt-3 flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-zinc-400">{fmt}</span>
          <span className="h-3 w-px bg-white/15" />
          <span className="text-[10px] font-medium tracking-wide text-[#93c5fd]">{status}</span>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-6">
          <button
            onClick={() => setListening(false)}
            aria-label="Stop listening"
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
              listening ? "border-white/[0.12] bg-white/[0.06] text-white" : "border-white/[0.06] bg-white/[0.02] text-zinc-600"
            }`}
          >
            <Square size={16} className="fill-current" />
          </button>
          <button
            onClick={() => setListening(true)}
            aria-label="Microphone"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-[#93c5fd] to-[#3b82f6] shadow-[0_18px_44px_-14px_rgba(96,165,250,0.8)] ring-1 ring-white/25 transition-transform active:scale-95"
          >
            <Mic size={26} className="text-white stroke-[1.8]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-[#0e0e12] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="ml-3 flex-1 max-w-[280px] rounded-md bg-white/[0.04] border border-white/[0.06] px-3 py-1 font-mono text-[10px] text-zinc-400 truncate">
          {url}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ───────────────────────────── Content data ───────────────────────────── */

const HERO_HIGHLIGHTS = [
  { icon: Bot, label: "AI Powered" },
  { icon: Languages, label: "Urdu + English" },
  { icon: HeartHandshake, label: "Women Rights" },
  { icon: Siren, label: "Emergency Support" },
];

const PROBLEMS = [
  {
    icon: Gavel,
    title: "The law feels untouchable",
    desc: "Legal information is scattered across statutes, offices, and websites — and reads like a foreign language to most people.",
  },
  {
    icon: CircleHelp,
    title: "Help stays hidden",
    desc: "Women in difficult situations often don't know who to call, where to go, or that support even exists.",
  },
  {
    icon: Puzzle,
    title: "Knowledge is fragmented",
    desc: "Rights, protections, and procedures live in separate documents that were never designed to be understood together.",
  },
  {
    icon: PhoneMissed,
    title: "Helplines are hard to find",
    desc: "The numbers that matter most are buried in booklets and old posts — exactly when you need them in a crisis.",
  },
  {
    icon: MessageSquareOff,
    title: "Language is a barrier",
    desc: "Most legal material is in English, while millions speak and think in Urdu — so guidance simply doesn't reach them.",
  },
];

const SOLUTION_FLOW = [
  { icon: Bot, title: "AI Chatbot", desc: "Ask anything in plain language — English or Urdu — and get a calm, accurate answer about your rights." },
  { icon: BookOpen, title: "Legal Articles", desc: "A growing library of plain-language guides on the laws that matter to everyday life." },
  { icon: LayoutGrid, title: "Case Categories", desc: "Every legal area organised, so users are guided to the right information without guessing." },
  { icon: Siren, title: "Emergency Helplines", desc: "Police, rescue, and women's helplines always one tap away — visible exactly when needed." },
  { icon: Mic, title: "Voice Support", desc: "A voice assistant prototype for users who prefer speaking over reading, or read with difficulty." },
  { icon: Languages, title: "Bilingual Guidance", desc: "The whole experience speaks both English and Urdu, with a one-tap language switch." },
];

const AI_FEATURES = [
  { icon: MessageSquareText, title: "Natural conversation", desc: "Users explain a situation in their own words; the AI responds with clear, sourced guidance." },
  { icon: Languages, title: "English · Urdu modes", desc: "The same question, answered in either language — switching takes one tap." },
  { icon: Mic, title: "Voice questions", desc: "Speak instead of type; the assistant understands and replies." },
  { icon: LayoutGrid, title: "Case selection", desc: "Pick the area of law that fits, and the conversation steers to the right guidance." },
  { icon: MessageCircle, title: "Helpful, not alarming", desc: "Responses are warm, direct, and actionable — never cold or intimidating." },
];

const ARTICLE_TOPICS = [
  { icon: GraduationCap, title: "Know your rights", desc: "Educational content that explains the law in plain, human language." },
  { icon: HeartHandshake, title: "Women's rights", desc: "Protections, processes, and support around women's legal rights." },
  { icon: Users, title: "Family & marriage", desc: "Marriage, divorce, custody, and maintenance — explained simply." },
  { icon: Briefcase, title: "Workplace harassment", desc: "What counts as harassment and how to report it." },
  { icon: ShieldAlert, title: "Cyber crime", desc: "Online abuse, threats, and fraud — and where to complain." },
  { icon: Home, title: "Property & inheritance", desc: "Rights to property, inheritance, and ownership." },
];

const HELPLINES = [
  { number: "15", title: "Police", icon: Shield, note: "Emergency response" },
  { number: "1122", title: "Rescue", icon: Siren, note: "Medical & rescue services" },
  { number: "1099", title: "Women's Helpline", icon: HeartHandshake, note: "Counselling & support" },
  { number: "1991", title: "Cyber Crime", icon: ShieldAlert, note: "Online abuse & fraud" },
];

const VOICE_STEPS = [
  { icon: Mic, title: "Voice", desc: "User speaks a question in English or Urdu." },
  { icon: AudioLines, title: "Speech", desc: "Speech is converted into text." },
  { icon: Bot, title: "AI", desc: "The assistant reasons about the answer." },
  { icon: MessageSquareText, title: "Guidance", desc: "A clear answer is spoken and shown back." },
];

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const LIVE_WAVE = Array.from({ length: 36 }, (_, i) => {
  const rand = seededRandom(i * 37 + 7);
  const seq = Array.from({ length: 8 }, () => 14 + Math.round(rand() * rand() * 78));
  const oseq = Array.from({ length: 8 }, () => 0.3 + rand() * 0.7);
  return {
    h: [...seq, seq[0]].map((v) => `${v}%`),
    o: [...oseq, oseq[0]],
    dur: 1.55 + rand() * 0.45,
    delay: rand() * 0.9,
  };
});

const RING_WAVE = Array.from({ length: 28 }, (_, i) => {
  const rand = seededRandom(i * 53 + 11);
  const seq = Array.from({ length: 8 }, () => 5 + Math.round(rand() * rand() * 15));
  const oseq = Array.from({ length: 8 }, () => 0.3 + rand() * 0.6);
  return {
    h: [...seq, seq[0]],
    o: [...oseq, oseq[0]],
    dur: 1.55 + rand() * 0.45,
    delay: rand() * 0.9,
  };
});

const DEV_STEPS = [
  { icon: Search, title: "Research", desc: "Studied how people actually try to find legal help." },
  { icon: PenTool, title: "Wireframes", desc: "Mapped the journey from question to answer." },
  { icon: Palette, title: "UI Design", desc: "A calm, trustworthy interface in both scripts." },
  { icon: Braces, title: "Frontend", desc: "React + TypeScript + Tailwind, responsive to the core." },
  { icon: Database, title: "Backend", desc: "A Flask API serving guidance and content." },
  { icon: Bot, title: "AI Integration", desc: "OpenAI wired into the assistant's reasoning." },
  { icon: ShieldCheck, title: "Testing", desc: "Accessibility, languages, and edge cases verified." },
  { icon: Rocket, title: "Deployment", desc: "Shipped on Vercel for fast, global delivery." },
];

const STACK = [
  { icon: "simple-icons:react", name: "React", color: "#61DAFB", role: "Component UI" },
  { icon: "simple-icons:typescript", name: "TypeScript", color: "#3178C6", role: "Type-safe frontend" },
  { icon: "simple-icons:tailwindcss", name: "Tailwind CSS", color: "#38BDF8", role: "Design system styling" },
  { icon: "simple-icons:flask", name: "Flask", color: "#ffffff", role: "Python backend" },
  { icon: "simple-icons:openai", name: "OpenAI", color: "#10A37F", role: "AI reasoning engine" },
  { icon: "simple-icons:vercel", name: "Vercel", color: "#ffffff", role: "Hosting & delivery" },
];

/* ───────────────────────────── Icons ───────────────────────────── */

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] via-[#60a5fa] to-[#93c5fd] text-white shadow-lg shadow-[#60a5fa]/30 ${className}`}>
      <Shield size={16} strokeWidth={2} />
    </span>
  );
}

function IconTile({ icon: Icon, tint = BLUE_SOFT, className = "" }: { icon: typeof Bot; tint?: string; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] ${className}`}
      style={{ color: tint }}
    >
      <Icon size={18} className="stroke-[1.6]" />
    </span>
  );
}

/* ───────────────────────────── The page ───────────────────────────── */

export default function LawmateCaseStudy() {
  return (
    <div className="bg-[#0b0b0f] border border-white/[0.06] rounded-[20px] shadow-xl relative overflow-visible">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 rounded-t-[20px]">
        <div className="flex items-center justify-between gap-3 px-6 sm:px-10 lg:px-14 py-4 border-b border-white/[0.06] bg-[#0b0b0f]/85 backdrop-blur-xl">
          <button
            onClick={() => navigateTo("/#portfolio")}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-zinc-300 transition-colors hover:border-[#60a5fa]/50 hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-8 h-8" />
            <span className="font-display text-[15px] font-semibold text-white tracking-tight">LawMate</span>
          </div>
          <button
            onClick={() => navigateTo("/#contact")}
            className="rounded-full bg-white text-zinc-950 px-4 py-2 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
          >
            Let's Talk
          </button>
        </div>
      </div>

      <div className="relative isolate">
        {/* Global backdrop (clipped to the card) */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-[20px]">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[620px] rounded-full bg-[#3b82f6]/[0.12] blur-[130px]" />
          <div className="absolute top-0 right-[-12%] w-[420px] h-[420px] rounded-full bg-[#60a5fa]/[0.05] blur-[110px]" />
          <div className="absolute top-0 left-[-12%] w-[420px] h-[420px] rounded-full bg-[#fbbf24]/[0.04] blur-[110px]" />
          <div className="absolute inset-x-0 top-0 h-[620px] [background:linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(72%_62%_at_50%_0%,black,transparent)]" />
        </div>

          <div className="relative px-6 sm:px-10 lg:px-14">
            {/* ───────────── 01 · HERO ───────────── */}
            <section className="relative pt-14 md:pt-20 pb-16 md:pb-24">
              {/* Subtle radial blue gradient behind the hero content */}
              <div className="absolute -top-24 -left-24 w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_65%)] blur-2xl pointer-events-none" />
              <div className="absolute top-10 -right-16 w-[460px] h-[460px] rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.1),transparent_65%)] blur-2xl pointer-events-none" />

              <motion.div variants={stagger} initial="hidden" animate="visible">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-14 lg:gap-12 items-center">
                  {/* ── Left · content ── */}
                  <div className="text-center lg:text-left">
                    <motion.div
                      variants={scaleIn}
                      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-4 py-1.5"
                    >
                      <img src={lawMateLogo} alt="LawMate" className="w-5 h-5 rounded" />
                      <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-zinc-300">Case Study · Academic Project</span>
                    </motion.div>

                    <motion.h1
                      variants={fadeUp}
                      className="mt-8 font-display text-[52px] sm:text-[68px] lg:text-[84px] leading-[0.95] font-bold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#93c5fd]"
                    >
                      LawMate
                    </motion.h1>

                    <motion.div variants={fadeUp} className="mt-6">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#60a5fa]/25 bg-[#60a5fa]/[0.08] px-5 py-2 text-[13px] font-medium text-[#bfdbfe]">
                        <Sparkles size={14} className="stroke-[1.8]" />
                        AI-Powered Legal Awareness
                      </span>
                    </motion.div>

                    <motion.p
                      variants={fadeUp}
                      className="mt-7 max-w-[520px] text-zinc-400 text-[15px] md:text-[16px] leading-[1.85] mx-auto lg:mx-0"
                    >
                      LawMate is an academic AI platform that makes the law approachable. Ask about your
                      rights in plain language — English or Urdu — and get clear guidance and the right
                      helpline in seconds.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => scrollToId("ai-assistant")}
                        className="group inline-flex items-center gap-2 rounded-full bg-white text-zinc-950 px-6 py-3 text-[13.5px] font-semibold shadow-[0_16px_40px_-12px_rgba(96,165,250,0.55)] transition-shadow duration-300 hover:shadow-[0_22px_55px_-12px_rgba(96,165,250,0.75)]"
                      >
                        Live Demo
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[13.5px] font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                      >
                        <IconifyIcon icon="simple-icons:github" className="w-3.5 h-3.5" />
                        GitHub
                      </motion.a>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                      {HERO_HIGHLIGHTS.map((h) => (
                        <motion.span
                          key={h.label}
                          whileHover={{ y: -2 }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur px-4 py-2 text-[12.5px] text-zinc-300 transition-colors duration-300 hover:border-[#60a5fa]/40 hover:text-white"
                        >
                          <h.icon size={13} className="text-[#60a5fa]" />
                          {h.label}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* ── Right · product visual ── */}
                  <motion.div variants={scaleIn} className="relative">
                    <HeroChatMockup />
                  </motion.div>
                </div>
              </motion.div>
            </section>

            {/* ───────────── 02 · THE PROBLEM ───────────── */}
            <Section id="problem" className="relative pb-20 md:pb-24">
              {/* Legal paper / document texture */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 44px), repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 44px), radial-gradient(circle at 1px 1px, rgba(255,255,255,0.22) 1px, transparent 0)",
                    backgroundSize: "auto, auto, 16px 16px",
                    WebkitMaskImage: "radial-gradient(85% 85% at 50% 38%, black, transparent)",
                    maskImage: "radial-gradient(85% 85% at 50% 38%, black, transparent)",
                  }}
                />
              </div>

              <SectionHead
                index="02"
                kicker="The Problem"
                title="The law should protect everyone. It confuses most of them."
                desc="The law was never written for the people it protects — scattered, technical, and almost always in a language they don't speak."
              />
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {PROBLEMS.map((p, i) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7 transition-all duration-300 hover:border-[#f87171]/30 hover:shadow-[0_24px_70px_-28px_rgba(248,113,113,0.25)] ${
                      i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                    }`}
                  >
                    {/* Hover glows */}
                    <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#f87171]/[0.07] blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#a78bfa]/[0.06] blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Index */}
                    <span className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.15em] text-zinc-600 transition-colors duration-300 group-hover:text-[#f87171]/70">
                      0{i + 1}
                    </span>

                    {/* Icon */}
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl border border-[#f87171]/20 bg-[#f87171]/[0.06] text-[#f87171] transition-all duration-500 group-hover:scale-[1.08] group-hover:bg-[#f87171]/10 group-hover:shadow-[0_0_34px_-8px_rgba(248,113,113,0.45)]">
                      <p.icon size={20} className="stroke-[1.5] transition-transform duration-500 group-hover:-rotate-6" />
                    </div>

                    <h3 className="relative mt-5 text-[15.5px] font-semibold text-white tracking-tight">{p.title}</h3>
                    <p className="relative mt-2 text-[13px] text-zinc-500 leading-[1.75]">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ───────────── 03 · THE SOLUTION ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                index="03"
                kicker="The Solution"
                title="A clear path from question to answer."
                desc="Instead of adding one more source of confusion, LawMate connects the pieces into one calm journey — so a person goes from 'I don't know my rights' to 'now I do'."
              />
              <div className="relative">
                <div className="absolute left-5 lg:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#60a5fa]/30 to-transparent" />
                <div className="space-y-10 lg:space-y-14">
                  {SOLUTION_FLOW.map((s, i) => (
                    <motion.div
                      key={s.title}
                      variants={fadeUp}
                      className={`relative flex items-start ${i % 2 ? "lg:flex-row-reverse" : ""}`}
                    >
                      <div className="absolute left-5 lg:left-1/2 top-5 -translate-x-1/2 w-10 h-10 rounded-full border border-[#60a5fa]/40 bg-[#0b0b10] flex items-center justify-center text-[#93c5fd] z-10">
                        <s.icon size={16} className="stroke-[1.7]" />
                      </div>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className={`ml-16 lg:ml-0 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#60a5fa]/35 lg:w-[calc(50%-4rem)] ${
                          i % 2 ? "lg:mr-[calc(50%+4rem)] lg:ml-0" : "lg:ml-[calc(50%+4rem)]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[10px] tracking-[0.2em] text-[#60a5fa]">0{i + 1}</span>
                          <h3 className="text-[15.5px] font-semibold text-white tracking-tight">{s.title}</h3>
                        </div>
                        <p className="mt-2 text-[13px] text-zinc-500 leading-[1.7]">{s.desc}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ───────────── 04 · AI LEGAL ASSISTANT ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                id="ai-assistant"
                index="04"
                kicker="AI Legal Assistant"
                title="The flagship — a rights assistant that speaks your language."
                desc="LawMate's AI is the heart of the platform. It listens to a situation in plain words and answers with the rights, the procedure, and the next step — in the language the user thinks in."
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Sticky phone showcase */}
                <div className="lg:sticky lg:top-24">
                  <ChatShowcase />
                </div>
                {/* Features — connected vertical journey */}
                <div className="relative">
                  <div className="absolute left-[13px] top-4 bottom-4 w-px bg-gradient-to-b from-[#60a5fa]/40 via-[#60a5fa]/10 to-transparent" />
                  <div className="space-y-4">
                    {AI_FEATURES.map((f, i) => (
                      <motion.div
                        key={f.title}
                        variants={journeyUp}
                        className="group relative pl-12"
                      >
                        <span className="absolute left-[13px] top-[40px] -translate-x-1/2 w-4 h-4 rounded-full bg-[#0b0b10] ring-1 ring-[#60a5fa]/40 transition-all duration-300 group-hover:ring-[#60a5fa] group-hover:shadow-[0_0_16px_rgba(96,165,250,0.6)]">
                          <span className="absolute inset-[5px] rounded-full bg-[#60a5fa]/80 transition-opacity duration-300 group-hover:opacity-100" />
                        </span>
                        <div className="flex gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 group-hover:border-[#60a5fa]/35 group-hover:bg-white/[0.03] group-hover:shadow-[0_24px_60px_-24px_rgba(59,130,246,0.3)]">
                          <IconTile icon={f.icon} tint={i % 2 === 0 ? BLUE_SOFT : EMERALD} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] tracking-[0.2em] text-[#60a5fa]/70">0{i + 1}</span>
                              <h4 className="text-[15px] font-semibold text-white tracking-tight">{f.title}</h4>
                            </div>
                            <p className="mt-1.5 text-[13px] text-zinc-500 leading-[1.7]">{f.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* ───────────── 05 · LEGAL AWARENESS LIBRARY ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                index="05"
                kicker="Legal Awareness Library"
                title="The law, written for people."
                desc="A library of plain-language articles that turn complicated statutes into guidance anyone can act on."
              />
              <motion.div variants={scaleIn}>
                <BrowserFrame url="lawmate.app/library">
                  <div className="relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden">
                    <img
                      src={`${IMG}/articles.png`}
                      alt="Legal awareness library"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ARTICLE_TOPICS.map((a) => (
                  <motion.div
                    key={a.title}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[#60a5fa]/35"
                  >
                    <IconTile icon={a.icon} tint={BLUE_SOFT} />
                    <h3 className="mt-4 text-[15px] font-semibold text-white tracking-tight">{a.title}</h3>
                    <p className="mt-2 text-[13px] text-zinc-500 leading-[1.7]">{a.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ───────────── 06 · EMERGENCY HELP ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                index="06"
                kicker="Emergency Help"
                title="Help, always within reach."
                desc="In a crisis there is no time to search. LawMate keeps the numbers that matter visible and one tap away — designed with urgency, built on trust."
              />
              <motion.div variants={scaleIn}>
                <BrowserFrame url="lawmate.app/helplines">
                  <div className="relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden">
                    <img
                      src={`${IMG}/emergency.png`}
                      alt="LawMate helplines"
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </BrowserFrame>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {HELPLINES.map((h) => (
                  <motion.div
                    key={h.number}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl border border-[#fbbf24]/25 bg-gradient-to-b from-[#fbbf24]/[0.08] to-white/[0.02] p-6 transition-colors duration-300 hover:border-[#fbbf24]/50 hover:shadow-[0_24px_60px_-28px_rgba(251,191,36,0.35)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-[#fbbf24]/15 text-[#fbbf24] transition-transform duration-300 group-hover:scale-[1.06]">
                        <h.icon size={20} className="stroke-[1.7]" />
                      </span>
                      <span className="font-mono text-[22px] font-semibold text-white tracking-tight leading-none">{h.number}</span>
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-white tracking-tight">{h.title}</h3>
                    <p className="mt-1.5 text-[13px] text-zinc-500 leading-[1.7]">{h.note}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/[0.1] px-3 py-1 text-[11px] font-semibold text-[#fbbf24]">
                      <Phone size={11} className="stroke-[2]" />
                      Tap to Call
                    </span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ───────────── 07 · VOICE ASSISTANT ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                index="07"
                kicker="Voice Assistant"
                title="Speak the question. Hear the answer."
                desc="Reading legal text is hard — speaking is easy. LawMate includes a voice assistant prototype that lets users ask and listen instead of reading."
                descClass="mt-6 max-w-[600px]"
              />
              <div className="pt-2 md:pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Voice input</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-3 py-1 text-[11px] text-[#bfdbfe]">
                          <span className="relative flex w-1.5 h-1.5">
                            <span className="absolute inline-flex w-full h-full rounded-full bg-[#60a5fa] opacity-60 animate-ping" />
                            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
                          </span>
                          Listening
                        </span>
                      </div>
                      <div className="mt-6 flex items-end justify-center gap-[3px] h-14">
                        {LIVE_WAVE.map((b, i) => (
                          <motion.span
                            key={i}
                            animate={{ height: b.h, opacity: b.o }}
                            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
                            className="w-[5px] rounded-full bg-gradient-to-t from-[#60a5fa]/40 via-[#60a5fa]/80 to-[#bfdbfe]"
                          />
                        ))}
                      </div>
                      <div className="mt-6 flex items-center justify-center gap-3 text-[12.5px] text-zinc-400">
                        <Mic size={15} className="text-[#60a5fa]" />
                        Try: "What should I do if someone is threatening me online?"
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4">
                      {VOICE_STEPS.map((v, i) => (
                        <motion.div
                          key={v.title}
                          variants={fadeUp}
                          className="flex h-full items-start gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5"
                        >
                          <span className="font-mono text-[10px] text-[#60a5fa] pt-0.5">0{i + 1}</span>
                          <div>
                            <h4 className="flex items-center gap-2 text-[13.5px] font-semibold text-white tracking-tight">
                              <v.icon size={14} className="text-[#60a5fa]" />
                              {v.title}
                            </h4>
                            <p className="mt-1.5 text-[12.5px] text-zinc-500 leading-[1.65]">{v.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="order-1 lg:order-2 relative flex justify-center lg:-translate-y-8">
                    <motion.div
                      animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(96,165,250,0.22),rgba(96,165,250,0.06)_46%,transparent_72%)] blur-2xl pointer-events-none"
                    />
                    <PhoneFrame className="w-[255px] sm:w-[295px]">
                      <VoiceAppScreen />
                    </PhoneFrame>
                  </div>
                </div>
              </div>
            </Section>

            {/* ───────────── 08 · DEVELOPMENT JOURNEY ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                index="08"
                kicker="Development Journey"
                title="From research to a shipped platform."
                desc="A deliberately iterative build — every phase informed the next, from understanding the user to deploying on Vercel."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {DEV_STEPS.map((s, i) => (
                  <motion.div key={s.title} variants={fadeUp} className="relative pt-8">
                    <div className="absolute top-0 left-6 w-px h-8 bg-gradient-to-b from-[#60a5fa]/50 to-transparent" />
                    <div className="flex items-center gap-3">
                      <span className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-[#101016] text-[#93c5fd]">
                        <s.icon size={18} className="stroke-[1.6]" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#60a5fa]">STEP 0{i + 1}</span>
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold text-white tracking-tight">{s.title}</h3>
                    <p className="mt-1.5 text-[12.5px] text-zinc-500 leading-[1.65]">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* ───────────── 09 · TECH STACK ───────────── */}
            <Section className="pb-20 md:pb-24">
              <SectionHead
                index="09"
                kicker="Tech Stack"
                title="Simple, capable, real."
                desc="A deliberately small stack — chosen so an academic project could ship production-quality work and stay easy to extend."
              />
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {STACK.map((s) => (
                  <motion.div
                    key={s.name}
                    variants={fadeUp}
                    whileHover={{ y: -6 }}
                    className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.14]"
                  >
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03]"
                      style={{ color: s.color }}
                    >
                      <IconifyIcon icon={s.icon} className="w-6 h-6" />
                    </span>
                    <h4 className="mt-4 text-[15px] font-semibold text-white tracking-tight">{s.name}</h4>
                    <p className="mt-1 text-[12.5px] text-zinc-500">{s.role}</p>
                  </motion.div>
                ))}
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/[0.14]"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#60a5fa]">
                    <MonitorSmartphone size={24} className="stroke-[1.5]" />
                  </span>
                  <h4 className="mt-4 text-[15px] font-semibold text-white tracking-tight">Responsive Design</h4>
                  <p className="mt-1 text-[12.5px] text-zinc-500">Mobile-first, all sizes</p>
                </motion.div>
              </div>
            </Section>

            {/* ───────────── 10 · CTA ───────────── */}
            <Section className="pb-20 md:pb-28">
              <motion.div
                variants={scaleIn}
                className="relative overflow-hidden rounded-[24px] border border-[#60a5fa]/20 bg-gradient-to-b from-[#60a5fa]/[0.1] to-transparent px-6 py-16 md:py-24 text-center"
              >
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[560px] h-[320px] rounded-full bg-[#3b82f6]/20 blur-[110px]" />
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[480px] h-[280px] rounded-full bg-[#fbbf24]/[0.06] blur-[110px]" />
                <motion.div variants={fadeUp} className="relative">
                  <LogoMark className="w-14 h-14 mx-auto" />
                  <h2 className="mt-7 font-display text-[30px] md:text-[48px] font-bold tracking-tight leading-[1.08] text-white max-w-[760px] mx-auto">
                    Building technology that makes legal knowledge accessible.
                  </h2>
                  <p className="mt-5 text-zinc-400 text-[15px] md:text-[16px] max-w-[560px] mx-auto leading-[1.8]">
                    Every woman deserves to understand her rights. LawMate is how that becomes a product.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => scrollToId("ai-assistant")}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-white text-zinc-950 px-8 py-4 text-[15px] font-semibold shadow-[0_20px_50px_-12px_rgba(96,165,250,0.5)] transition-transform hover:scale-[1.03]"
                    >
                      Try the Assistant
                      <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                    <button
                      onClick={() => navigateTo("/#contact")}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      Let's Build Together
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </Section>
          </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Sub-components ───────────────────────────── */

const SHOWCASE_PARTICLES = [
  { top: "10%", left: "16%", size: 3, delay: 0 },
  { top: "18%", left: "86%", size: 2, delay: 0.7 },
  { top: "30%", left: "6%", size: 2, delay: 1.3 },
  { top: "42%", left: "92%", size: 3, delay: 0.3 },
  { top: "55%", left: "8%", size: 2, delay: 1.8 },
  { top: "64%", left: "90%", size: 2, delay: 0.9 },
  { top: "74%", left: "22%", size: 2, delay: 2.2 },
  { top: "82%", left: "78%", size: 3, delay: 1.1 },
  { top: "90%", left: "46%", size: 2, delay: 2.6 },
];

function ShowcaseCard({
  icon: Icon,
  tint,
  glow,
  label,
  sub,
  pulse = 0,
  className = "",
}: {
  icon: typeof Bot;
  tint: string;
  glow: string;
  label: string;
  sub: string;
  pulse?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      whileHover={{ scale: 1.06 }}
      transition={{
        y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 0.3, ease: EASE },
      }}
      className={`relative flex items-center gap-3 rounded-2xl rounded-bl-md border border-white/[0.12] bg-[#11131a]/65 backdrop-blur-xl px-4 py-3 ${className}`}
      style={{ boxShadow: `0 28px 60px -20px ${glow}59, inset 0 1px 0 rgba(255,255,255,0.1)` }}
    >
      <motion.span
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: pulse }}
        className="absolute -inset-2 rounded-3xl blur-lg pointer-events-none"
        style={{ background: `${glow}2e` }}
      />
      <span
        className="relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${tint}24`, color: tint, boxShadow: `inset 0 0 14px ${tint}14, inset 0 1px 0 rgba(255,255,255,0.08)` }}
      >
        <Icon size={15} className="stroke-[1.8]" />
      </span>
      <div className="relative">
        <div className="text-[12px] font-semibold text-white tracking-tight leading-none">{label}</div>
        <div className="text-[10px] text-zinc-400 mt-1.5">{sub}</div>
      </div>
    </motion.div>
  );
}

function ChatShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const driftX = useTransform(mx, [-0.5, 0.5], [-10, 10]);
  const driftY = useTransform(my, [-0.5, 0.5], [-10, 10]);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 16, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 16, mass: 0.6 });

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto flex h-[600px] sm:h-[680px] w-full max-w-[460px] items-center justify-center"
    >
      {/* Layered blue radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 62% 55% at 50% 42%, rgba(37,99,235,0.22), transparent 70%), radial-gradient(ellipse 45% 40% at 18% 22%, rgba(59,130,246,0.12), transparent 70%), radial-gradient(ellipse 45% 40% at 82% 78%, rgba(96,165,250,0.12), transparent 70%)",
        }}
      />
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.11) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
          maskImage: "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.26),transparent_62%)] blur-2xl pointer-events-none"
      />

      {/* Faint AI network lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
        viewBox="0 0 460 680"
        fill="none"
      >
        <path d="M25,150 C120,90 170,220 250,170 S390,300 445,250" stroke="#93c5fd" strokeWidth="1" />
        <path d="M15,520 C140,470 200,610 330,560 S420,470 450,495" stroke="#93c5fd" strokeWidth="1" />
        <circle cx="250" cy="170" r="2" fill="#93c5fd" />
        <circle cx="330" cy="560" r="2" fill="#93c5fd" />
      </svg>

      {/* Abstract AI rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[470px] h-[470px] rounded-full border border-dashed border-[#60a5fa]/[0.14] pointer-events-none"
      >
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#60a5fa]/80 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#60a5fa]/[0.08] pointer-events-none"
      >
        <span className="absolute bottom-6 right-8 w-1 h-1 rounded-full bg-[#93c5fd]/60" />
      </motion.div>

      {/* Particles */}
      {SHOWCASE_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -18, 0], opacity: [0.1, 0.7, 0.1], scale: [1, 1.25, 1] }}
          transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          className="absolute rounded-full bg-[#60a5fa]/60 pointer-events-none"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
        />
      ))}

      {/* Glowing connector lines with flowing energy */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 460 680"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="showLineL" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="showLineR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="showLineB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {[
          { x1: 150, y1: 118, x2: 96, y2: 60, id: "showLineL", d: 0 },
          { x1: 338, y1: 140, x2: 398, y2: 92, id: "showLineR", d: 0.4 },
          { x1: 90, y1: 300, x2: 70, y2: 300, id: "showLineL", d: 0.8 },
          { x1: 370, y1: 218, x2: 415, y2: 212, id: "showLineR", d: 1.2 },
          { x1: 230, y1: 646, x2: 230, y2: 620, id: "showLineB", d: 1.6 },
        ].map((ln, i) => (
          <motion.line
            key={i}
            x1={ln.x1}
            y1={ln.y1}
            x2={ln.x2}
            y2={ln.y2}
            stroke={`url(#${ln.id})`}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="3 7"
            vectorEffect="non-scaling-stroke"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: ln.d }}
          />
        ))}
      </svg>

      {/* Phone */}
      <motion.div
        style={{ rotateX: springRotateX, rotateY: springRotateY, rotate: 7, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 46 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative z-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[260px] sm:w-[285px]"
        >
          <div className="relative rounded-[2.9rem] bg-gradient-to-b from-[#3a3a45] via-[#23232c] to-[#0b0b0f] p-[8px] shadow-[0_70px_150px_-30px_rgba(0,0,0,0.95),0_35px_90px_-35px_rgba(37,99,235,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="absolute inset-x-6 top-[4px] h-px rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30" />
            <div className="absolute inset-0 rounded-[2.9rem] ring-1 ring-inset ring-white/[0.1] pointer-events-none z-30" />
            <div className="absolute -inset-2 rounded-[3.2rem] bg-[linear-gradient(115deg,transparent_42%,rgba(255,255,255,0.07)_50%,transparent_58%)] pointer-events-none z-30" />
            <div className="relative aspect-[9/19.5] rounded-[2.2rem] overflow-hidden bg-[#0a0a12]">
              {/* Screen reflections */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_38%,rgba(255,255,255,0.05)_48%,transparent_58%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_0%,rgba(96,165,250,0.14),transparent_55%)] pointer-events-none" />

              {/* Status bar */}
              <div className="relative z-10 flex items-center justify-between px-6 pt-3">
                <span className="font-mono text-[8px] text-zinc-400">9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="relative h-[7px] w-[14px] rounded-[3px] border border-zinc-600 overflow-hidden">
                    <span className="absolute inset-y-[1px] left-[1px] w-[9px] rounded-[2px] bg-[#34d399]" />
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.15em] text-zinc-400">5G</span>
                </div>
              </div>

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between px-4 pt-2.5">
                <div className="flex items-center gap-2.5">
                  <LogoMark className="w-7 h-7" />
                  <div>
                    <div className="text-[11px] font-semibold text-white tracking-tight leading-none">LawMate Assistant</div>
                    <div className="flex items-center gap-1.5 text-[8px] text-[#34d399] mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                      Online · bilingual
                    </div>
                  </div>
                </div>
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className="flex items-center gap-1.5 rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-2.5 py-1.5 text-[9px] font-medium text-[#bfdbfe] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  <Mic size={10} className="stroke-[2]" />
                  Voice
                </motion.span>
              </div>

              {/* Language toggle */}
              <div className="relative z-10 flex items-center gap-1.5 px-4 pt-3">
                <span className="rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/15 px-3 py-1 text-[8.5px] font-semibold text-[#bfdbfe]">English</span>
                <span dir="rtl" className="rounded-full px-3 py-1 text-[8.5px] text-zinc-500">اردو</span>
                <span className="ml-auto font-mono text-[6.5px] uppercase tracking-[0.16em] text-zinc-600">AI Chat</span>
              </div>

              {/* Category selector */}
              <div className="relative z-10 mt-2.5 px-4 flex items-center gap-1.5">
                {["Harassment", "Property", "Family", "Cyber"].map((c, i) => (
                  <span
                    key={c}
                    className={`rounded-full px-2.5 py-1 text-[8px] font-medium ${
                      i === 0
                        ? "bg-[#60a5fa]/20 text-[#bfdbfe] border border-[#60a5fa]/40"
                        : "border border-white/[0.08] text-zinc-500"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Conversation */}
              <div className="relative z-10 px-3.5 pt-3.5 space-y-3 pb-[4.75rem]">
                <div className="flex justify-end">
                  <div className="max-w-[84%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#3b82f6] to-[#2563eb] px-3.5 py-2.5 text-[10px] font-medium text-white leading-snug shadow-[0_10px_28px_-8px_rgba(59,130,246,0.6)]">
                    What are my rights if I face harassment at work?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-3 py-2.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -2, 0] }}
                        transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]"
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-white/10 bg-[#12141c]/80 px-3.5 py-3 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.85)]">
                    <p className="text-[9.5px] text-zinc-200 leading-[1.65]">
                      The law protects your right to a safe workplace. Here's what to do — step by step.
                    </p>
                    <div className="mt-2.5 rounded-xl border border-[#93c5fd]/25 bg-[#93c5fd]/[0.07] p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck size={10} className="text-[#93c5fd]" />
                          <span className="text-[8.5px] font-semibold text-[#bfdbfe]">Your rights · workplace</span>
                        </div>
                        <span className="rounded-md bg-[#93c5fd]/15 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.1em] text-[#93c5fd]">
                          Step 1
                        </span>
                      </div>
                      <p className="mt-1.5 text-[8.5px] text-zinc-400 leading-snug">
                        Harassment at work is unlawful. You can report it confidentially and get support.
                      </p>
                      <div className="mt-2 border-t border-white/[0.06] pt-1.5 text-[7px] text-zinc-600">
                        Source: workplace law · plain language
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#fbbf24]/25 bg-[#fbbf24]/[0.07] px-2.5 py-2 shadow-[0_0_24px_-8px_rgba(251,191,36,0.5)]">
                      <motion.span
                        animate={{ scale: [1, 1.18, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        className="flex"
                      >
                        <Siren size={10} className="text-[#fbbf24]" />
                      </motion.span>
                      <span className="text-[9px] text-zinc-300">
                        Women's Helpline <span className="font-mono text-[#fbbf24] font-semibold">1099</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 px-3.5 pb-4 pt-5 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/85 to-transparent">
                <div className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] pl-4 pr-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="flex-1 text-[9px] text-zinc-500">Ask about your rights…</span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] text-[#0b0b0f] flex items-center justify-center shadow-[0_6px_18px_rgba(96,165,250,0.45)]"
                  >
                    <ArrowUp size={11} className="stroke-[2.2]" />
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating cards */}
      <div className="absolute top-0 left-1 sm:left-2">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
        >
          <motion.div style={{ x: driftX, y: driftY }}>
            <ShowcaseCard icon={Sparkles} tint={VIOLET} glow={VIOLET} label="AI Guidance" sub="rights, step by step" pulse={0} />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute top-10 right-1 sm:right-2">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
        >
          <motion.div style={{ x: driftX, y: driftY }}>
            <ShowcaseCard icon={Languages} tint={BLUE_SOFT} glow={BLUE} label="Urdu + English" sub="one-tap switch" pulse={0.4} />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute top-[42%] -left-2 sm:-left-3 hidden sm:block">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          <motion.div style={{ x: driftX, y: driftY }}>
            <ShowcaseCard icon={Mic} tint={EMERALD} glow={EMERALD} label="Voice questions" sub="ask · listen" pulse={0.8} />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute top-[27%] -right-2 sm:-right-3 hidden sm:block">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
        >
          <motion.div style={{ x: driftX, y: driftY }}>
            <ShowcaseCard icon={HeartHandshake} tint={ROSE} glow={ROSE} label="Women's rights" sub="know your power" pulse={1.2} />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
        >
          <motion.div style={{ x: driftX, y: driftY }}>
            <ShowcaseCard icon={Siren} tint={AMBER} glow={AMBER} label="Emergency Help" sub="helpline · 1099" pulse={1.6} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Hero product visual ───────────────────────────── */

function HeroChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] px-6 py-10 sm:py-12">
      {/* Soft blue radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_40%,rgba(96,165,250,0.22),transparent_62%)] blur-2xl pointer-events-none" />
      {/* Orbit ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-[#60a5fa]/[0.08] pointer-events-none" />

      {/* Layered glassmorphism cards behind */}
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [1.5, 0, 1.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-6 -right-2 sm:right-2 w-44 h-32 rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl shadow-2xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [-1.5, 0, -1.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-8 -left-2 sm:left-4 w-52 h-32 rounded-3xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl shadow-2xl pointer-events-none"
      />

      {/* Main chat window */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.015 }}
        className="group relative rounded-[28px] border border-white/[0.1] bg-[#101016]/80 backdrop-blur-2xl shadow-[0_50px_140px_-28px_rgba(59,130,246,0.45)] transition-shadow duration-500 hover:shadow-[0_60px_160px_-28px_rgba(59,130,246,0.6)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-7 h-7" />
            <div>
              <div className="text-[13px] font-semibold text-white tracking-tight">LawMate Assistant</div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#34d399] mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                Online · bilingual
              </div>
            </div>
          </div>
          <motion.span
            whileHover={{ scale: 1.06 }}
            className="flex items-center gap-1.5 rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-3 py-1.5 text-[10.5px] font-medium text-[#bfdbfe] cursor-pointer"
          >
            <Mic size={11} className="stroke-[2]" />
            Voice
          </motion.span>
        </div>

        {/* Language toggle */}
        <div className="flex items-center gap-1.5 px-5 pt-4">
          <span className="rounded-full bg-white/10 px-3.5 py-1 text-[10.5px] font-semibold text-white">English</span>
          <span dir="rtl" className="rounded-full px-3.5 py-1 text-[10.5px] text-zinc-500">اردو</span>
          <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500">AI Conversation</span>
        </div>

        {/* Conversation */}
        <div className="px-5 py-4 space-y-3">
          <div className="flex justify-end">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
              className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-br from-[#3b82f6] to-[#2563eb] px-4 py-2.5 text-[12px] text-white shadow-lg shadow-[#3b82f6]/25"
            >
              "What are my rights if I face harassment at work?"
            </motion.div>
          </div>
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-start">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
              className="max-w-[82%] rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] backdrop-blur px-4 py-3"
            >
              <p className="text-[12px] text-zinc-200 leading-snug">
                You have the right to a safe workplace. I can guide you through reporting it step by step.
              </p>
              <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-[#fbbf24]/25 bg-[#fbbf24]/[0.08] px-3 py-2">
                <Siren size={12} className="text-[#fbbf24]" />
                <span className="text-[10.5px] text-zinc-300">
                  Women's Helpline <span className="font-mono text-[#fbbf24] font-semibold">1099</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] pl-4 pr-1.5 py-1.5">
            <span className="flex-1 text-[11.5px] text-zinc-500">Ask about your rights…</span>
            <motion.span
              whileHover={{ scale: 1.08 }}
              className="w-7 h-7 rounded-full bg-[#60a5fa] text-[#0b0b0f] flex items-center justify-center cursor-pointer"
            >
              <ArrowUp size={13} className="stroke-[2.2]" />
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Floating message bubble — top left */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 -left-1 sm:left-0 hidden sm:flex items-center gap-2.5 rounded-2xl rounded-bl-sm border border-white/10 bg-[#101016]/85 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
      >
        <span className="w-7 h-7 rounded-xl bg-[#60a5fa]/15 text-[#60a5fa] flex items-center justify-center">
          <BookOpen size={13} className="stroke-[1.8]" />
        </span>
        <div>
          <div className="text-[11px] font-medium text-white leading-none">Legal rights</div>
          <div className="text-[9.5px] text-zinc-500 mt-1">explained simply</div>
        </div>
      </motion.div>

      {/* Floating message bubble — mid right (voice) */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-1/2 -right-3 sm:right-0 hidden sm:flex items-center gap-2.5 rounded-2xl rounded-br-sm border border-[#60a5fa]/25 bg-[#101016]/85 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
      >
        <span className="w-7 h-7 rounded-xl bg-[#34d399]/15 text-[#34d399] flex items-center justify-center">
          <Mic size={13} className="stroke-[1.8]" />
        </span>
        <div>
          <div className="text-[11px] font-medium text-white leading-none">Voice questions</div>
          <div className="text-[9.5px] text-zinc-500 mt-1">ask · listen</div>
        </div>
      </motion.div>

      {/* Floating emergency chip — bottom right */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-4 -right-2 sm:right-2 hidden sm:flex items-center gap-2.5 rounded-2xl rounded-br-sm border border-[#fbbf24]/30 bg-[#101016]/85 backdrop-blur-xl px-4 py-2.5 shadow-2xl"
      >
        <span className="w-7 h-7 rounded-xl bg-[#fbbf24]/15 text-[#fbbf24] flex items-center justify-center">
          <Siren size={13} className="stroke-[1.8]" />
        </span>
        <div>
          <div className="text-[11px] font-medium text-white leading-none">Emergency Support</div>
          <div className="text-[9.5px] text-[#fbbf24] mt-1 font-mono">Helpline · 1099</div>
        </div>
      </motion.div>
    </div>
  );
}
