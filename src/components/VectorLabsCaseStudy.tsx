import { Fragment, useEffect, useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useInView,
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
  ArrowUpRight,
  Sparkles,
  Code2,
  Smartphone,
  Workflow,
  Bot,
  Users,
  TrendingUp,
  Megaphone,
  Palette,
  MousePointerClick,
  Rocket,
  Receipt,
  Search,
  Target,
  PenTool,
  HeartHandshake,
  Quote,
  Check,
  X,
  Star,
  CalendarCheck,
  Compass,
  Zap,
  Gauge,
  type LucideIcon,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TEAL = "#0FB5A8";
const TEAL_SOFT = "#35E6C7";
const SURFACE = "#10141D";
const MUTED = "#9AA6B2";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
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
}: {
  index: string;
  kicker: string;
  title: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`max-w-[760px] ${center ? "mx-auto text-center" : ""}`}
    >
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#35E6C7]">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-[#35E6C7]/60 to-transparent" />
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#5b6a78]">{kicker}</span>
      </div>
      <h2 className={`font-display text-[30px] md:text-[44px] font-bold text-white tracking-tight mt-6 leading-[1.08] ${center ? "mx-auto" : ""}`}>
        {title}
      </h2>
      {desc && (
        <p className={`text-[#9AA6B2] text-[15px] md:text-[16px] leading-[1.85] mt-5 ${center ? "mx-auto max-w-[620px]" : ""}`}>
          {desc}
        </p>
      )}
    </motion.div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function VectorMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-[#35E6C7] to-[#0FB5A8] shadow-[0_10px_28px_-10px_rgba(15,181,168,0.8)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-[#04110f]" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M5 19 19 5" strokeLinecap="round" />
        <circle cx="19" cy="5" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="5" cy="19" r="2.6" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

function GridOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.032) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.032) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        WebkitMaskImage: "radial-gradient(70% 62% at 50% 0%, black, transparent)",
        maskImage: "radial-gradient(70% 62% at 50% 0%, black, transparent)",
      }}
    />
  );
}

function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-44 left-1/2 h-[580px] w-[940px] -translate-x-1/2 rounded-full bg-[#0FB5A8]/[0.14] blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-0 h-[440px] w-[440px] rounded-full bg-[#7c3aed]/[0.11] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -left-24 h-[440px] w-[440px] rounded-full bg-[#0FB5A8]/[0.07] blur-[120px]"
      />
    </div>
  );
}

function Parallax({
  children,
  className = "",
  strength = 22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-strength, strength]), { stiffness: 120, damping: 18 });
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-strength, strength]), { stiffness: 120, damping: 18 });

  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({
  to,
  suffix = "",
  decimals = 0,
  duration = 1.9,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ───────────────────────────── Content data ───────────────────────────── */

const HERO_STATS = [
  { value: "120+", label: "Products shipped" },
  { value: "98%", label: "Client retention" },
  { value: "4.2x", label: "Avg. ROAS" },
];

const ABOUT_VALUES = ["Precision", "Craft", "AI", "Scale", "Design", "Engineering", "Outcomes", "Trust"];

type ServiceVisualId = "web" | "mobile" | "ai-auto" | "chatbots" | "crm" | "seo" | "ads" | "branding" | "uiux" | "bizauto";

const SERVICES: {
  icon: LucideIcon;
  title: string;
  desc: string;
  span: string;
  visual: ServiceVisualId;
}[] = [
  { icon: Code2, title: "Web Development", desc: "Fast, scalable web platforms engineered to convert — React, Next.js, and modern TypeScript.", span: "lg:col-span-2", visual: "web" },
  { icon: Smartphone, title: "Mobile Apps", desc: "Native-feeling iOS & Android apps in Flutter — launch on both stores from one codebase.", span: "lg:col-span-2", visual: "mobile" },
  { icon: Bot, title: "AI Chatbots", desc: "Support agents that sound human and resolve issues in seconds.", span: "lg:col-span-1", visual: "chatbots" },
  { icon: Users, title: "CRM Systems", desc: "Pipelines your team actually wants to use — not another tab to ignore.", span: "lg:col-span-2", visual: "crm" },
  { icon: TrendingUp, title: "SEO", desc: "Rank for what matters, then stay there as the market moves.", span: "lg:col-span-1", visual: "seo" },
  { icon: Megaphone, title: "Google Ads", desc: "Campaigns engineered for measurable ROAS, not vanity clicks.", span: "lg:col-span-2", visual: "ads" },
  { icon: Palette, title: "Branding", desc: "Identities with a point of view and a design system behind them.", span: "lg:col-span-2", visual: "branding" },
  { icon: MousePointerClick, title: "UI/UX", desc: "Interfaces that feel inevitable to use — intuitive on first touch.", span: "lg:col-span-2", visual: "uiux" },
  { icon: Rocket, title: "Business Automation", desc: "From lead to invoice, automated end-to-end with no fragile duct tape.", span: "lg:col-span-2", visual: "bizauto" },
];

const PROCESS = [
  { icon: Search, title: "Discovery", desc: "We start with your users, your market, and your goal — never with assumptions." },
  { icon: Target, title: "Strategy", desc: "A sharp plan: positioning, scope, roadmap, and the metrics that define success." },
  { icon: PenTool, title: "Design", desc: "Interfaces with intent — every screen has to earn its place in the product." },
  { icon: Code2, title: "Development", desc: "Clean, scalable engineering with weekly previews you can actually click." },
  { icon: Rocket, title: "Launch", desc: "A launch that's rehearsed, monitored, and measured — not a surprise." },
  { icon: HeartHandshake, title: "Support", desc: "We stay after launch — iterating, improving, and compounding your wins." },
];

const TECH = [
  { name: "React", icon: "logos:react", color: "#61DAFB", role: "Interfaces" },
  { name: "Next.js", icon: "devicon:nextjs", color: "#ffffff", role: "Web apps" },
  { name: "Flutter", icon: "logos:flutter", color: "#54C5F8", role: "Mobile" },
  { name: "Node.js", icon: "logos:nodejs-icon", color: "#8CC84B", role: "Backend" },
  { name: "Supabase", icon: "simple-icons:supabase", color: "#3ECF8E", role: "Backend" },
  { name: "Firebase", icon: "devicon:firebase", color: "#FFCA28", role: "Realtime" },
  { name: "OpenAI", icon: "simple-icons:openai", color: "#10A37F", role: "AI" },
  { name: "Docker", icon: "simple-icons:docker", color: "#2496ED", role: "Infra" },
  { name: "AWS", icon: "simple-icons:amazonwebservices", color: "#FF9900", role: "Cloud" },
  { name: "Figma", icon: "simple-icons:figma", color: "#A259FF", role: "Design" },
];

const TYPICAL = [
  "Promises and vague timelines",
  "Design without strategy",
  "Hand-offs between strangers",
  "Ship it and disappear",
  "Features that don't move metrics",
  "You manage the chaos",
];

const VECTOR_OUTCOMES = [
  "Clear scope, honest timelines",
  "Strategy that shapes the design",
  "One team from idea to launch",
  "Post-launch support and iteration",
  "Outcomes you can actually measure",
  "A partner — not a vendor",
];

const RESULTS = [
  { value: 120, suffix: "+", decimals: 0, label: "Products shipped", note: "web, mobile & AI" },
  { value: 98, suffix: "%", decimals: 0, label: "Client retention", note: "year over year" },
  { value: 4.2, suffix: "x", decimals: 1, label: "Average ROAS", note: "across paid campaigns" },
  { value: 40, suffix: "+", decimals: 0, label: "Countries served", note: "and counting" },
];

const TESTIMONIALS = [
  {
    quote:
      "Vector Labs didn't just build our website — they rebuilt how our business is found online. Leads doubled within the first quarter, and the quality of the work still turns heads.",
    name: "Ayesha Khan",
    role: "CEO, Skyline Marketing Group",
    initials: "AK",
    grad: "from-[#35E6C7] to-[#0FB5A8]",
    featured: true,
  },
  {
    quote:
      "From the first call to launch, every interaction felt senior. They understood the product deeply and shipped an app our users genuinely love.",
    name: "Daniel Reyes",
    role: "Founder, Proof",
    initials: "DR",
    grad: "from-[#38bdf8] to-[#818cf8]",
    featured: false,
  },
  {
    quote:
      "Rare team that sweats the details most agencies ignore. The AI features they engineered now save our operations hours every single day.",
    name: "Muhammad Usman",
    role: "CTO, WIOS",
    initials: "MU",
    grad: "from-[#f472b6] to-[#a78bfa]",
    featured: false,
  },
];

/* ───────────────────────────── Service illustrations ───────────────────────────── */

function MiniGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        WebkitMaskImage: "radial-gradient(80% 75% at 50% 32%, black, transparent 92%)",
        maskImage: "radial-gradient(80% 75% at 50% 32%, black, transparent 92%)",
      }}
    />
  );
}

function Particles({ count = 5, color = "#35E6C7" }: { count?: number; color?: string }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const left = 8 + ((i * 37 + 5) % 84);
        const top = 14 + ((i * 53 + 9) % 70);
        const size = 2 + (i % 3);
        const duration = 5 + (i % 4) * 1.2;
        const delay = (i * 0.8) % 3;
        return (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 8px ${color}`,
            }}
            animate={{ y: [0, -16, 0], opacity: [0.2, 0.85, 0.2] }}
            transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </>
  );
}

function FlowLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative my-2 h-9 w-px overflow-hidden bg-gradient-to-b from-[#0FB5A8]/50 via-[#6366f1]/40 to-[#0FB5A8]/50">
      <motion.span
        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#35E6C7] shadow-[0_0_10px_rgba(53,230,199,0.9)]"
        animate={{ top: ["-20%", "115%"], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
      />
    </div>
  );
}

function NodeChip({ icon: Icon, label, done = false }: { icon: LucideIcon; label: string; done?: boolean }) {
  return (
    <motion.div
      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur ${
        done
          ? "border-[#34d399]/40 bg-[#34d399]/10 text-[#34d399] shadow-[0_0_24px_-4px_rgba(52,211,153,0.55)]"
          : "border-white/[0.1] bg-[#0e1420] text-[#35E6C7] shadow-[0_12px_30px_-12px_rgba(15,181,168,0.55)]"
      }`}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon size={17} strokeWidth={1.8} />
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-px font-mono text-[5.5px] tracking-wider ${
          done
            ? "border border-[#34d399]/30 bg-[#34d399]/15 text-[#34d399]"
            : "border border-white/[0.08] bg-[#0e1420] text-[#35E6C7]/85"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}

const CRM_PIPELINE = [
  { label: "Lead", accent: "#22d3ee", cards: 1 },
  { label: "Deal", accent: "#0FB5A8", cards: 2 },
  { label: "Won", accent: "#34d399", cards: 1, won: true },
];

const SEO_RANKS = [{ w: "w-14", pos: 1 }, { w: "w-10", pos: 2 }, { w: "w-8", pos: 3 }];

const BIZ_STEPS = [
  { icon: Users, label: "Lead", color: "#35E6C7" },
  { icon: Gauge, label: "CRM", color: "#22d3ee" },
  { icon: Sparkles, label: "AI", color: "#a78bfa" },
  { icon: Receipt, label: "Invoice", color: "#fbbf24" },
  { icon: Check, label: "Success", color: "#34d399", done: true },
];

function renderServiceVisual(id: ServiceVisualId) {
  switch (id) {
    case "web":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <MiniGrid />
          <div className="absolute -top-10 left-[10%] h-48 w-72 rounded-full bg-[#0FB5A8]/[0.14] blur-3xl" />
          <div className="absolute -bottom-12 right-[6%] h-40 w-56 rounded-full bg-[#6366f1]/[0.14] blur-3xl" />
          <Particles count={5} color="#35E6C7" />

          <motion.div
            className="absolute inset-x-[7%] top-[8%] bottom-[6%] overflow-hidden rounded-xl border border-white/[0.1] bg-[#0a0f18] shadow-[0_34px_60px_-30px_rgba(0,0,0,0.95)]"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-[#0c1220] px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 h-2.5 w-36 rounded-full bg-white/[0.06]" />
              <span className="ml-auto h-2.5 w-8 rounded-full bg-[#0FB5A8]/30" />
            </div>
            <div className="flex" style={{ height: "calc(100% - 22px)" }}>
              <div className="w-[56%] border-r border-white/[0.06] px-3.5 py-2 font-mono text-[7.5px] leading-[1.7] text-white/40">
                <p>
                  <span className="text-[#22d3ee]">import</span>
                  <span className="text-[#a5b4fc]"> {"{ deploy }"}</span>
                  <span className="text-[#22d3ee]"> from</span>
                  <span className="text-[#f0abfc]"> "@vector/core"</span>
                </p>
                <p>
                  <span className="text-[#22d3ee]">export async function</span>
                  <span className="text-[#7dd3fc]"> ship</span>
                  <span className="text-white/60">() {"{"}</span>
                </p>
                <p className="pl-3">
                  <span className="text-[#22d3ee]">const</span>
                  <span className="text-white/75"> res</span>
                  <span className="text-[#4b5563]"> =</span>
                  <span className="text-[#22d3ee]"> await</span>
                  <span className="text-[#7dd3fc]"> api.deploy</span>
                  <span className="text-white/60">(</span>
                  <span className="text-[#f0abfc]">"prod"</span>
                  <span className="text-white/60">);</span>
                </p>
                <p>
                  <span className="text-white/60">{"}"}</span>
                </p>
                <p className="mt-1">
                  <span className="text-[#34d399]/80">✓ build</span>
                  <span className="text-white/25"> · </span>
                  <span className="text-[#34d399]/80">deploy ok</span>
                </p>
              </div>
              <div className="flex-1 px-3.5 py-1.5">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-2">
                  <div className="flex items-center justify-between">
                    <span className="h-1.5 w-10 rounded-full bg-white/25" />
                    <span className="rounded-md bg-[#0FB5A8]/15 px-1.5 py-px font-mono text-[5.5px] text-[#35E6C7]">LIVE</span>
                  </div>
                  <div className="mt-1.5 h-5 rounded-md bg-gradient-to-br from-[#0FB5A8]/25 to-[#0FB5A8]/5" />
                  <div className="mt-1 flex gap-1.5">
                    <span className="h-2.5 flex-1 rounded-sm bg-white/[0.06]" />
                    <span className="h-2.5 flex-1 rounded-sm bg-white/[0.06]" />
                    <span className="h-2.5 flex-1 rounded-sm bg-white/[0.06]" />
                  </div>
                </div>
                <div className="mt-1.5 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 items-center justify-center rounded-full bg-[#34d399]/20 text-[#34d399]">
                      <Check size={6} strokeWidth={4} />
                    </span>
                    <span className="h-1 w-12 rounded-full bg-white/30" />
                    <span className="ml-auto font-mono text-[5.5px] text-[#34d399]">passed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 items-center justify-center rounded-full bg-[#0FB5A8]/20 text-[#35E6C7]">
                      <Rocket size={6} strokeWidth={2.5} />
                    </span>
                    <span className="h-1 w-12 rounded-full bg-white/30" />
                    <span className="ml-auto font-mono text-[5.5px] text-[#35E6C7]">deploying…</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-0 top-[18%] flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-[#0e1420]/90 px-2.5 py-1.5 shadow-xl backdrop-blur"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="font-mono text-[6.5px] text-white/70">api.vectorlabs.dev</span>
          </motion.div>
          <motion.div
            className="absolute right-0 top-[36%] flex items-center gap-1 rounded-full border border-[#0FB5A8]/25 bg-[#0a0f18]/90 px-2.5 py-1.5 shadow-xl backdrop-blur"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Check size={8} strokeWidth={3} className="text-[#34d399]" />
            <span className="font-mono text-[6.5px] text-[#34d399]">Deployed</span>
          </motion.div>
        </div>
      );
    case "mobile":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(15,181,168,0.16),transparent_62%)]" />
          <MiniGrid />
          <Particles count={5} color="#22d3ee" />
          <div className="absolute left-1/2 top-[79%] h-8 w-44 -translate-x-1/2 rounded-[100%] bg-[#0FB5A8]/25 blur-2xl" />

          <motion.div
            className="absolute left-1/2 top-[4%] w-[92px] -translate-x-1/2"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative h-[146px] rounded-[19px] border border-white/[0.12] bg-[#0a0f18] p-1.5 shadow-[0_30px_60px_-20px_rgba(15,181,168,0.45)]">
              <div className="absolute left-1/2 top-1.5 z-10 h-1 w-9 -translate-x-1/2 rounded-full bg-white/15" />
              <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-gradient-to-b from-[#0e1830] to-[#0a101d] p-2">
                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="font-mono text-[6px] text-white/50">9:41</span>
                  <span className="h-1.5 w-4 rounded-full bg-white/25" />
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#35E6C7] to-[#0FB5A8]" />
                  <span>
                    <span className="block h-1 w-8 rounded-full bg-white/40" />
                    <span className="mt-1 block h-1 w-6 rounded-full bg-white/15" />
                  </span>
                </div>
                <div className="mt-2 rounded-lg bg-gradient-to-br from-[#0FB5A8] to-[#0b7c74] p-1 shadow-[0_8px_20px_-8px_rgba(15,181,168,0.8)]">
                  <span className="block h-1 w-6 rounded-full bg-white/50" />
                  <span className="mt-1 block h-2 w-full rounded bg-white/20" />
                  <span className="mt-1 block h-2 w-3/4 rounded bg-white/20" />
                </div>
                <div className="mt-1.5 flex items-end justify-between gap-1">
                  {[40, 70, 55, 85, 62, 95].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-full rounded-sm bg-[#35E6C7]/70"
                      style={{ height: `${h * 0.22}px` }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-around rounded-lg bg-white/[0.05] py-1">
                  <span className="h-1 w-3 rounded-full bg-[#35E6C7]" />
                  <span className="h-1 w-3 rounded-full bg-white/20" />
                  <span className="h-1 w-3 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-[10%] top-[15%] w-[34%] rounded-xl border border-white/[0.1] bg-[#0e1420]/90 p-2 shadow-2xl backdrop-blur"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#6366f1]" />
              <span>
                <span className="block h-1 w-10 rounded-full bg-white/35" />
                <span className="mt-0.5 block h-1 w-7 rounded-full bg-white/12" />
              </span>
              <TrendingUp size={10} className="ml-auto text-[#35E6C7]" />
            </div>
            <span className="mt-1.5 block font-mono text-[8px] text-white/70">+124%</span>
          </motion.div>
          <motion.div
            className="absolute bottom-[13%] right-[9%] w-[34%] rounded-xl border border-white/[0.1] bg-[#0e1420]/90 p-2 shadow-2xl backdrop-blur"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          >
            <span className="block font-mono text-[6px] text-[#9AA6B2]">Balance</span>
            <div className="mt-0.5 flex items-end gap-1">
              <span className="font-display text-[13px] font-bold leading-none text-white">$12.4k</span>
              <ArrowUp size={8} className="text-[#34d399]" />
            </div>
            <div className="mt-1 flex h-3 items-end gap-0.5">
              {[40, 70, 50, 85, 60, 95].map((h, j) => (
                <span key={j} className="flex-1 rounded-sm bg-[#35E6C7]/70" style={{ height: `${h * 0.3}px` }} />
              ))}
            </div>
          </motion.div>
        </div>
      );
    case "ai-auto":
      return (
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0FB5A8]/12 blur-3xl" />
          <MiniGrid />
          <Particles count={4} color="#6366f1" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <NodeChip icon={Sparkles} label="AI" />
            <FlowLine />
            <NodeChip icon={Workflow} label="Orchestrate" />
            <FlowLine delay={0.4} />
            <NodeChip icon={Check} label="Done" done />
          </div>
        </div>
      );
    case "chatbots":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute right-0 top-[8%] h-32 w-32 rounded-full bg-[#0FB5A8]/14 blur-3xl" />
          <MiniGrid />
          <Particles count={4} color="#35E6C7" />
          <div className="absolute inset-x-[12%] top-[8%] h-[86%] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f18]/90 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#35E6C7] to-[#0FB5A8]">
                <Bot size={10} className="text-[#04110f]" />
                <motion.span
                  className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#34d399]"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
              <span className="font-mono text-[8px] text-white/70">Assistant</span>
              <span className="ml-auto flex items-center gap-1">
                <Sparkles size={8} className="text-[#35E6C7]" />
                <span className="font-mono text-[7px] text-[#35E6C7]">GPT-4</span>
              </span>
            </div>
            <div className="space-y-1.5 px-3 py-2">
              <div className="ml-auto max-w-[80%] rounded-xl rounded-tr-sm bg-gradient-to-br from-[#0FB5A8] to-[#0b7c74] px-2.5 py-1.5 shadow-[0_8px_20px_-8px_rgba(15,181,168,0.6)]">
                <span className="block h-1.5 w-10 rounded-full bg-white/60" />
              </div>
              <div className="max-w-[82%] rounded-xl rounded-tl-sm border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5">
                <span className="block h-1.5 w-16 rounded-full bg-white/30" />
                <span className="mt-1.5 block h-1.5 w-11 rounded-full bg-white/20" />
              </div>
              <div className="max-w-[62%] rounded-xl rounded-tl-sm border border-[#0FB5A8]/25 bg-[#0FB5A8]/10 px-3 py-1.5">
                <span className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[#35E6C7]"
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    case "crm":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute -bottom-10 left-1/2 h-44 w-[80%] -translate-x-1/2 rounded-full bg-[#6366f1]/10 blur-3xl" />
          <MiniGrid />
          <Particles count={4} color="#22d3ee" />
          <div className="absolute inset-x-[9%] top-[13%] bottom-[8%] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f18]/95 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
              <span className="font-mono text-[8px] text-white/60">Pipeline</span>
              <span className="flex gap-1.5">
                <span className="h-1.5 w-6 rounded-full bg-[#0FB5A8]/60" />
                <span className="h-1.5 w-3 rounded-full bg-white/15" />
              </span>
            </div>
            <div className="flex gap-2 px-4 pt-2">
              {CRM_PIPELINE.map((col) => (
                <div key={col.label} className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.accent }} />
                    <span className="font-mono text-[6.5px] text-white/50">{col.label}</span>
                  </div>
                  <div className="mt-1.5 space-y-1">
                    {Array.from({ length: col.cards }, (_, j) => (
                      <div key={j} className="rounded-md border border-white/[0.07] bg-white/[0.03] p-1">
                        <div className="flex items-center justify-between">
                          <span className="h-1 w-6 rounded-full bg-white/30" />
                          {col.won && <Check size={6} strokeWidth={3} className="text-[#34d399]" />}
                        </div>
                        <span className="mt-1 block h-1 w-4 rounded-full bg-white/12" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-x-4 bottom-2 h-11 rounded-xl border border-white/[0.07] bg-white/[0.02] px-2 pt-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[6px] text-white/40">Revenue</span>
                <span className="font-mono text-[6px] text-[#35E6C7]">▲ 128%</span>
              </div>
              <svg viewBox="0 0 200 30" className="h-[22px] w-full">
                <defs>
                  <linearGradient id="crmArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#35E6C7" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#35E6C7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="crmLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#35E6C7" />
                  </linearGradient>
                </defs>
                <path d="M0 24 L25 19 L50 22 L75 13 L100 17 L125 9 L150 11 L175 5 L200 2 L200 30 L0 30 Z" fill="url(#crmArea)" />
                <motion.path
                  d="M0 24 L25 19 L50 22 L75 13 L100 17 L125 9 L150 11 L175 5 L200 2"
                  fill="none"
                  stroke="url(#crmLine)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE }}
                />
              </svg>
            </div>
          </div>
        </div>
      );
    case "seo":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute -top-6 left-1/2 h-32 w-40 -translate-x-1/2 rounded-full bg-[#34d399]/12 blur-3xl" />
          <MiniGrid />
          <Particles count={4} color="#34d399" />
          <div className="absolute inset-x-[12%] top-[12%] flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#0a0f18] px-3 py-2 shadow-xl">
            <Search size={10} className="text-[#34d399]" />
            <span className="font-mono text-[7.5px] text-white/60">vectorlabs.io</span>
            <span className="ml-auto h-1.5 w-6 rounded-full bg-[#0FB5A8]/40" />
          </div>
          <div className="absolute inset-x-[12%] top-[36%] space-y-1.5">
            {SEO_RANKS.map((r) => (
              <div key={r.pos} className="flex items-center gap-2">
                <span className={`${r.w} h-1.5 rounded-full bg-white/10`} />
                <span
                  className={`ml-auto flex items-center gap-0.5 rounded-full px-1.5 py-px font-mono text-[6px] ${
                    r.pos === 1
                      ? "bg-gradient-to-r from-[#35E6C7] to-[#0FB5A8] text-[#04110f]"
                      : "border border-white/[0.08] text-white/45"
                  }`}
                >
                  {r.pos === 1 && <ArrowUp size={5} strokeWidth={3} />}
                  #{r.pos}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-x-[12%] bottom-[10%] flex items-center gap-2.5">
            <svg viewBox="0 0 60 20" className="h-5 w-14">
              <motion.path
                d="M0 18 C 10 15, 14 16, 20 12 C 26 8, 30 10, 36 6 C 42 3, 48 4, 60 0"
                fill="none"
                stroke="#34d399"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </svg>
            <span className="rounded-md border border-[#34d399]/25 bg-[#34d399]/10 px-1.5 py-0.5 font-mono text-[6.5px] text-[#34d399]">
              ▲ +180% organic
            </span>
          </div>
        </div>
      );
    case "ads":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute -top-4 right-2 h-32 w-36 rounded-full bg-[#f59e0b]/10 blur-3xl" />
          <MiniGrid />
          <Particles count={4} color="#f59e0b" />
          <div className="absolute inset-x-[16%] top-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f18]/95 p-2.5 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[7.5px] text-white/55">Campaign · Q3</span>
              <span className="flex h-4 w-7 items-center rounded-full bg-[#0FB5A8] px-0.5">
                <span className="ml-auto h-2.5 w-2.5 rounded-full bg-white" />
              </span>
            </div>
            <div className="mt-1.5">
              <span className="font-mono text-[8px] text-[#9AA6B2]">ROAS</span>
              <div className="flex items-end gap-1">
                <span className="font-display text-[19px] font-bold leading-none text-white">4.2</span>
                <span className="mb-0.5 font-mono text-[9px] text-[#f59e0b]">×</span>
              </div>
            </div>
            <div className="mt-1.5 flex h-7 items-end gap-1">
              {[30, 55, 42, 70, 58, 85, 95].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#f59e0b]/25 to-[#f59e0b]"
                  style={{ height: `${h * 0.3}px` }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="rounded-md bg-[#34d399]/12 px-1.5 py-0.5 font-mono text-[6.5px] text-[#34d399]">▲ +32% conv</span>
              <span className="rounded-md bg-white/[0.05] px-1.5 py-0.5 font-mono text-[6.5px] text-white/55">CPA $2.4</span>
            </div>
          </div>
        </div>
      );
    case "branding":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute left-1/4 top-1/2 h-40 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a78bfa]/10 blur-3xl" />
          <MiniGrid />
          <Particles count={4} color="#a78bfa" />
          <div className="absolute left-[12%] top-1/2 -translate-y-1/2">
            <div className="relative h-24 w-24">
              <svg className="absolute inset-0 h-full w-full text-[#0FB5A8]/30">
                <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeDasharray="2 3" fill="none" />
                <circle cx="50%" cy="50%" r="27%" stroke="currentColor" strokeDasharray="2 3" fill="none" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeDasharray="2 3" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeDasharray="2 3" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <VectorMark className="h-10 w-10" />
              </div>
            </div>
          </div>
          <div className="absolute left-[46%] top-[24%]">
            <span className="font-serif text-[46px] leading-none text-white/90">Aa</span>
            <div className="mt-1 h-px w-16 bg-white/15" />
            <div className="mt-1.5 font-mono text-[6.5px] tracking-[0.3em] text-[#9AA6B2]">SORA · SEMI</div>
          </div>
          <div className="absolute left-[46%] top-[63%]">
            <span className="font-display text-[16px] font-bold tracking-[0.35em] text-white">VECTOR</span>
            <div className="mt-1 h-px w-24 bg-gradient-to-r from-[#35E6C7] to-transparent" />
          </div>
          <div className="absolute bottom-[12%] right-[9%] flex items-center gap-2">
            {["#35E6C7", "#0FB5A8", "#7c3aed", "#fbbf24", "#0f172a"].map((c, i) => (
              <motion.span
                key={c}
                className="h-5 w-5 rounded-md border border-white/15 shadow-lg"
                style={{ background: c }}
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
            <span className="ml-1 font-mono text-[6.5px] text-[#9AA6B2]">Palette</span>
          </div>
        </div>
      );
    case "uiux":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(162,89,255,0.1),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          />
          <Particles count={5} color="#a259ff" />
          <motion.div
            className="absolute left-[7%] top-[20%] w-[34%] rotate-[-2deg] overflow-hidden rounded-xl border border-white/[0.1] bg-[#0a0f18] shadow-2xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1 border-b border-white/[0.06] px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            </div>
            <div className="space-y-1.5 p-2.5">
              <span className="block h-2 w-12 rounded-full bg-white/20" />
              <div className="flex gap-1.5">
                <div className="h-9 flex-1 rounded-md bg-gradient-to-br from-[#0FB5A8]/30 to-[#0FB5A8]/5" />
                <div className="h-9 flex-1 rounded-md border border-white/[0.08]" />
              </div>
              <span className="block h-1.5 w-full rounded-full bg-white/[0.06]" />
              <span className="block h-1.5 w-4/5 rounded-full bg-white/[0.06]" />
            </div>
          </motion.div>
          <motion.div
            className="absolute right-[27%] top-[16%] w-[15%] rotate-[3deg] rounded-2xl border border-white/[0.12] bg-[#0a0f18] p-1 shadow-2xl"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <div className="flex h-20 flex-col gap-1 rounded-lg p-1.5">
              <span className="h-1.5 w-8 rounded-full bg-white/25" />
              <div className="h-6 w-full rounded bg-gradient-to-br from-[#a259ff]/40 to-[#7c3aed]/10" />
              <span className="h-1.5 w-10 rounded-full bg-white/[0.08]" />
              <span className="h-1.5 w-7 rounded-full bg-white/[0.08]" />
            </div>
          </motion.div>
          <motion.div
            className="absolute right-[7%] top-[38%] w-[26%] rounded-lg border border-[#0FB5A8]/60 p-0.5"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <div className="rounded-md border border-[#35E6C7]/25 bg-white/[0.03] p-2">
              <span className="block h-2 w-14 rounded-full bg-white/30" />
              <div className="mt-1.5 flex gap-1">
                <span className="h-4 flex-1 rounded bg-[#35E6C7]/20" />
                <span className="h-4 flex-1 rounded bg-white/[0.07]" />
              </div>
            </div>
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-sm border border-white bg-[#0FB5A8]" />
            <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-sm border border-white bg-[#0FB5A8]" />
          </motion.div>
          <motion.div
            className="absolute bottom-[13%] left-[40%] text-[#35E6C7] drop-shadow-[0_0_6px_rgba(53,230,199,0.6)]"
            animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <MousePointerClick size={15} strokeWidth={1.8} />
          </motion.div>
        </div>
      );
    case "bizauto":
      return (
        <div className="absolute inset-3 sm:inset-4">
          <div className="absolute bottom-0 left-1/2 h-32 w-[70%] -translate-x-1/2 rounded-full bg-[#0FB5A8]/10 blur-3xl" />
          <MiniGrid />
          <Particles count={5} color="#35E6C7" />
          <div className="absolute inset-x-[6%] top-[10%] flex items-center justify-between">
            <span className="font-mono text-[7px] tracking-widest text-white/40">WORKFLOW</span>
            <span className="flex items-center gap-1 rounded-full border border-[#34d399]/25 bg-[#34d399]/10 px-1.5 py-0.5 font-mono text-[6px] text-[#34d399]">
              <span className="h-1 w-1 rounded-full bg-[#34d399]" />
              24/7
            </span>
          </div>
          <div className="absolute inset-x-[3%] top-[55%] flex -translate-y-1/2 items-center">
            {BIZ_STEPS.map((step, i) => (
              <Fragment key={step.label}>
                <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                  <motion.span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur ${
                      step.done
                        ? "border-[#34d399]/40 bg-[#34d399]/10 shadow-[0_0_18px_-2px_rgba(52,211,153,0.6)]"
                        : "border-white/[0.1] bg-[#0e1420] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.8)]"
                    }`}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                  >
                    <step.icon size={14} strokeWidth={2} style={step.done ? undefined : { color: step.color }} className={step.done ? "text-[#34d399]" : ""} />
                  </motion.span>
                  <span className="font-mono text-[6.5px] text-white/50">{step.label}</span>
                </div>
                {i < BIZ_STEPS.length - 1 && (
                  <div className="relative mx-1 h-px min-w-0 flex-1">
                    <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#0FB5A8]/50 to-[#35E6C7]/50" />
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#35E6C7] shadow-[0_0_8px_rgba(53,230,199,0.9)]"
                      animate={{ left: ["-5%", "105%"], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.28, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      );
  }
}

/* ───────────────────────────── Hero visual ───────────────────────────── */

const HERO_CHART = [30, 44, 38, 52, 46, 64, 58, 74, 66, 84, 76, 92];

function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(15,181,168,0.16),transparent_62%)] blur-2xl" />

      <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#121724] to-[#0a0e16] p-6 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.09]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.09]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.09]" />
          </div>
          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-[#9AA6B2]">
            vectorlabs.studio
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#35E6C7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35E6C7] animate-pulse" />
            live
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[52px_1fr] gap-4">
          <div className="space-y-2">
            <div className="h-8 rounded-lg bg-gradient-to-br from-[#0FB5A8]/25 to-transparent" />
            <div className="h-8 rounded-lg bg-white/[0.04]" />
            <div className="h-8 rounded-lg bg-white/[0.04]" />
            <div className="h-8 rounded-lg bg-white/[0.04]" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-[#9AA6B2]">Revenue</p>
                <p className="font-display text-[22px] font-bold text-white">
                  $128.4k <span className="font-mono text-[11px] font-medium text-[#35E6C7]">+32%</span>
                </p>
              </div>
              <span className="rounded-full border border-[#35E6C7]/30 bg-[#35E6C7]/10 px-3 py-1 text-[10px] font-medium text-[#35E6C7]">
                AI · active
              </span>
            </div>

            <div className="mt-4 flex h-24 items-end gap-1.5">
              {HERO_CHART.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h}%`, `${Math.min(100, h + 16)}%`, `${h}%`] }}
                  transition={{
                    duration: 3 + ((i * 17) % 22) / 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: ((i * 13) % 16) / 10,
                  }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0FB5A8]/25 via-[#0FB5A8]/60 to-[#35E6C7]"
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[10px] text-[#9AA6B2]">Active users</p>
                <p className="mt-1 font-display text-[16px] font-bold text-white">24,812</p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <p className="text-[10px] text-[#9AA6B2]">Uptime</p>
                <p className="mt-1 font-display text-[16px] font-bold text-white">
                  99.99<span className="text-[#35E6C7]">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating card — automation */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 sm:-left-8 top-20 w-44 rounded-2xl border border-white/[0.1] bg-[#10141D]/90 p-4 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0FB5A8]/15 text-[#35E6C7]">
            <Zap size={13} strokeWidth={2} />
          </span>
          <span className="text-[11px] font-semibold text-white">AI Automation</span>
        </div>
        <p className="mt-2 font-mono text-[18px] font-bold text-[#35E6C7]">+38%</p>
        <p className="text-[10px] text-[#9AA6B2]">cycle time saved</p>
      </motion.div>

      {/* Floating card — conversion */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-3 sm:-right-6 bottom-10 w-40 rounded-2xl border border-white/[0.1] bg-[#10141D]/90 p-4 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0FB5A8]/15 text-[#35E6C7]">
            <Gauge size={13} strokeWidth={2} />
          </span>
          <span className="text-[11px] font-semibold text-white">Conversion</span>
        </div>
        <p className="mt-2 font-mono text-[18px] font-bold text-[#35E6C7]">4.2x</p>
        <p className="text-[10px] text-[#9AA6B2]">return on spend</p>
      </motion.div>
    </div>
  );
}

/* ───────────────────────────── The page ───────────────────────────── */

export default function VectorLabsCaseStudy() {
  return (
    <div className="bg-[#080B12] border border-white/[0.06] rounded-[20px] shadow-xl relative overflow-visible">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 rounded-t-[20px]">
        <div className="flex items-center justify-between gap-3 px-6 sm:px-10 lg:px-14 py-4 border-b border-white/[0.06] bg-[#080B12]/85 backdrop-blur-xl">
          <button
            onClick={() => navigateTo("/#portfolio")}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-zinc-300 transition-colors hover:border-[#0FB5A8]/50 hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>
          <div className="flex items-center gap-2.5">
            <VectorMark className="w-8 h-8" />
            <span className="font-display text-[15px] font-semibold text-white tracking-tight">Vector Labs</span>
          </div>
          <button
            onClick={() => navigateTo("/#contact")}
            className="rounded-full bg-gradient-to-r from-[#35E6C7] to-[#0FB5A8] text-[#04110f] px-4 py-2 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
          >
            Let's Talk
          </button>
        </div>
      </div>

      <div className="relative isolate">
        {/* Global backdrop (clipped to the card) */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-[20px]">
          <Aurora className="opacity-70" />
          <GridOverlay className="opacity-60" />
        </div>

        <div className="relative px-6 sm:px-10 lg:px-14">
          {/* ───────────── 01 · HERO ───────────── */}
          <section className="relative pt-16 md:pt-24 pb-20 md:pb-28">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(15,181,168,0.14),transparent_62%)] blur-2xl pointer-events-none" />

            <motion.div variants={stagger} initial="hidden" animate="visible">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] gap-14 lg:gap-12 items-center">
                {/* ── Left · content ── */}
                <div className="text-center lg:text-left">
                  <motion.div
                    variants={scaleIn}
                    className="inline-flex items-center gap-2.5 rounded-full border border-[#0FB5A8]/30 bg-[#0FB5A8]/[0.07] px-4 py-1.5 backdrop-blur"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#35E6C7] opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#35E6C7]" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.26em] uppercase text-[#9ff5e6]">Vector Labs · Product Studio</span>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    className="mt-8 font-display text-[46px] sm:text-[64px] lg:text-[76px] leading-[1.02] font-bold tracking-[-0.03em]"
                  >
                    <span className="text-white">We craft digital products that</span>{" "}
                    <span className="bg-gradient-to-r from-[#35E6C7] via-[#7DF3DE] to-[#0FB5A8] bg-clip-text text-transparent">
                      feel inevitable.
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={fadeUp}
                    className="mt-7 max-w-[540px] text-[15px] md:text-[17px] leading-[1.85] text-[#9AA6B2] mx-auto lg:mx-0"
                  >
                    Vector Labs is a product studio where strategy, design, and engineering meet. We ship premium
                    web, mobile, and AI products that earn trust — and move the metrics that matter.
                  </motion.p>

                  <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => scrollToId("work")}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#35E6C7] to-[#0FB5A8] text-[#04110f] px-7 py-3.5 text-[14px] font-semibold shadow-[0_20px_50px_-14px_rgba(15,181,168,0.7)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-14px_rgba(15,181,168,0.85)]"
                    >
                      Start a project
                      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => scrollToId("work")}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-[14px] font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      See our work
                      <ArrowRight size={15} />
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-6"
                  >
                    {HERO_STATS.map((s) => (
                      <div key={s.label} className="text-center lg:text-left">
                        <p className="font-display text-[26px] font-bold text-white">{s.value}</p>
                        <p className="mt-1 text-[11.5px] font-medium tracking-wide text-[#5b6a78]">{s.label}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* ── Right · product visual ── */}
                <motion.div variants={scaleIn} className="relative">
                  <Parallax>
                    <HeroVisual />
                  </Parallax>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ───────────── 02 · ABOUT ───────────── */}
          <Section id="about" className="relative pb-20 md:pb-28">
            <SectionHead
              index="02"
              kicker="About Vector Labs"
              title="A studio built on craft."
              desc="We're a small, senior team that takes full ownership — from the first strategy session to the final deployed release. No hand-offs, no surprises, no filler."
            />

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center">
              {/* Left · mission + who */}
              <div className="space-y-8">
                <Reveal>
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#35E6C7]">
                      <Compass size={20} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#35E6C7]">Who we are</p>
                      <p className="mt-3 text-[15px] leading-[1.85] text-[#c6cfd8]">
                        Engineers and designers who care about the last 10%. We've shipped products for startups
                        and established teams across 40+ countries — and we treat every launch like it's our own name.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#0FB5A8]/30 bg-[#0FB5A8]/10 text-[#35E6C7]">
                      <Target size={20} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#35E6C7]">Our mission</p>
                      <p className="mt-3 text-[15px] leading-[1.85] text-[#c6cfd8]">
                        To remove the gap between a great idea and a great product — by pairing strategy, design,
                        and engineering under one roof and obsessing over measurable outcomes.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex items-start gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#35E6C7]">
                      <Sparkles size={20} strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#35E6C7]">Our vision</p>
                      <p className="mt-3 text-[15px] leading-[1.85] text-[#c6cfd8]">
                        A world where ambitious teams don't settle for software that merely works — they get
                        software that feels inevitable to use and quietly compounds their growth.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Right · core visual */}
              <Reveal className="flex justify-center">
                <div className="relative flex h-[280px] w-[280px] items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-[#0FB5A8]/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-7 rounded-full border border-[#35E6C7]/15"
                  />
                  <div className="absolute inset-12 rounded-full bg-[radial-gradient(circle,rgba(15,181,168,0.24),transparent_66%)] blur-sm" />
                  <div className="absolute inset-16 flex items-center justify-center rounded-full border border-white/[0.08] bg-gradient-to-br from-[#121828] to-[#0a0e16] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
                    <span className="font-display text-[40px] font-bold bg-gradient-to-br from-[#35E6C7] to-[#0FB5A8] bg-clip-text text-transparent">
                      VL
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35E6C7] shadow-[0_0_14px_rgba(53,230,199,1)]" />
                    <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#7DF3DE]/80" />
                  </motion.span>
                </div>
              </Reveal>
            </div>

            {/* Value marquee */}
            <Reveal className="mt-20 md:mt-24">
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                  className="flex w-max items-center gap-12"
                >
                  {[...ABOUT_VALUES, ...ABOUT_VALUES].map((v, i) => (
                    <span key={i} className="flex items-center gap-12">
                      <span className="font-display text-[22px] font-semibold text-white/25">{v}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0FB5A8]/40" />
                    </span>
                  ))}
                </motion.div>
              </div>
            </Reveal>
          </Section>

          {/* ───────────── 03 · SERVICES ───────────── */}
          <Section id="services" className="relative pb-20 md:pb-28">
            <SectionHead
              index="03"
              kicker="Services"
              title="Every capability a product needs. One team."
              desc="No white-label chaos. Each discipline below is run by someone who has shipped it — and measured its impact."
              center
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#141b2b] via-[#10141d] to-[#0c1018] p-0 transition-[border-color,box-shadow] duration-500 hover:border-[#0FB5A8]/45 hover:shadow-[0_30px_70px_-30px_rgba(15,181,168,0.45),0_24px_50px_-24px_rgba(0,0,0,0.9)] ${s.span}`}
                >
                  {/* top light sweep */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#35E6C7]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  {/* corner glow */}
                  <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full bg-[#0FB5A8]/[0.1] blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Illustration */}
                  <div className="relative min-h-[176px] flex-1 overflow-hidden transition-transform duration-500 group-hover:scale-[1.015] sm:min-h-[184px]">
                    {renderServiceVisual(s.visual)}
                  </div>

                  {/* Content */}
                  <div className="relative flex items-start gap-3.5 border-t border-white/[0.06] bg-white/[0.015] px-5 py-3 backdrop-blur-sm">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0e1420] text-[#35E6C7] shadow-inner transition-all duration-500 group-hover:rotate-[8deg] group-hover:border-[#0FB5A8]/50 group-hover:bg-[#0FB5A8]/10 group-hover:shadow-[0_0_20px_rgba(15,181,168,0.35)]">
                      <s.icon size={16} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-[15px] font-semibold text-white tracking-tight">{s.title}</h3>
                        <span className="font-mono text-[9px] text-[#3c4650]">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-[1.65] text-[#9AA6B2]">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ───────────── 05 · PROCESS ───────────── */}
          <Section id="process" className="relative pb-20 md:pb-28">
            <SectionHead
              index="05"
              kicker="Process"
              title="A calm path from idea to launch."
              desc="Six deliberate phases. You always know where things stand — and what happens next."
              center
            />

            <div className="relative">
              <div className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/[0.06]" />
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.8, ease: EASE }}
                className="absolute left-5 md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#35E6C7] via-[#0FB5A8] to-[#0FB5A8]/10"
              />

              <div className="relative space-y-10 md:space-y-0">
                {PROCESS.map((s, i) => {
                  const left = i % 2 === 0;
                  return (
                    <div key={s.title} className="relative md:grid md:grid-cols-2 md:gap-16 md:py-8">
                      <motion.span
                        variants={fadeUp}
                        className="absolute left-5 md:left-1/2 top-0 md:top-8 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-[#0FB5A8]/40 bg-[#10141D] font-mono text-[11px] font-bold text-[#35E6C7] shadow-[0_0_28px_rgba(15,181,168,0.4)]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>

                      <div className={`ml-14 md:ml-0 ${left ? "md:col-start-1 md:pr-14" : "md:col-start-2 md:pl-14"}`}>
                        <motion.div
                          variants={fadeUp}
                          className="group rounded-3xl border border-white/[0.07] bg-[#10141D] p-6 transition-colors duration-300 hover:border-[#0FB5A8]/40"
                        >
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#35E6C7]">
                            <s.icon size={19} strokeWidth={1.7} />
                          </span>
                          <h3 className="mt-4 text-[17px] font-semibold text-white tracking-tight">{s.title}</h3>
                          <p className="mt-2 text-[13px] leading-[1.7] text-[#9AA6B2]">{s.desc}</p>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Section>

          {/* ───────────── 06 · TECHNOLOGIES ───────────── */}
          <Section id="tech" className="relative pb-20 md:pb-28">
            <SectionHead
              index="06"
              kicker="Technologies"
              title="A modern stack, chosen on purpose."
              desc="Not trendy for the sake of it — selected for reliability, performance, and what the product actually needs."
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {TECH.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  whileHover={{ y: -7 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#10141D] p-6 text-center transition-colors duration-300 hover:border-white/[0.16]"
                >
                  <div
                    className="pointer-events-none absolute -top-14 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `radial-gradient(circle, ${t.color}33, transparent 65%)` }}
                  />
                  <span
                    className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-transform duration-300 group-hover:scale-110"
                    style={{ color: t.color }}
                  >
                    <IconifyIcon icon={t.icon} className="h-7 w-7" />
                  </span>
                  <h4 className="mt-4 text-[15px] font-semibold text-white">{t.name}</h4>
                  <p className="mt-1 text-[12px] text-[#9AA6B2]">{t.role}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ───────────── 07 · WHY CHOOSE VECTOR LABS ───────────── */}
          <Section id="why" className="relative pb-20 md:pb-28">
            <SectionHead
              index="07"
              kicker="Why Vector Labs"
              title="Choose the team, not the pitch."
              desc="Any agency can promise. We'd rather be compared on what actually happens after the contract is signed."
            />

            <div className="relative">
              <span className="absolute left-1/2 top-1/2 z-10 hidden lg:flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0d131c] font-mono text-[12px] font-bold text-[#35E6C7] shadow-[0_0_40px_rgba(15,181,168,0.35)]">
                VS
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Typical */}
                <motion.div
                  variants={fadeUp}
                  className="rounded-3xl border border-white/[0.06] bg-white/[0.01] p-8 md:p-10"
                >
                  <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#5b6a78]">The typical experience</p>
                  <h3 className="mt-3 font-display text-[22px] md:text-[26px] font-bold text-white/80 tracking-tight">
                    What most teams settle for.
                  </h3>
                  <ul className="mt-8 space-y-4">
                    {TYPICAL.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#7b8794]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[#f87171]/70">
                          <X size={11} strokeWidth={2.2} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Vector Labs */}
                <motion.div
                  variants={fadeUp}
                  className="relative rounded-3xl bg-gradient-to-br from-[#35E6C7]/60 via-[#0FB5A8]/15 to-transparent p-[1px] shadow-[0_0_70px_-24px_rgba(15,181,168,0.55)]"
                >
                  <div className="h-full rounded-[calc(1.5rem-1px)] bg-[#0d131c] p-8 md:p-10">
                    <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] uppercase text-[#35E6C7]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#35E6C7]" />
                      The Vector Labs experience
                    </p>
                    <h3 className="mt-3 font-display text-[22px] md:text-[26px] font-bold text-white tracking-tight">
                      What you actually get.
                    </h3>
                    <ul className="mt-8 space-y-4">
                      {VECTOR_OUTCOMES.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.6] text-[#d7dee5]">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0FB5A8]/20 text-[#35E6C7]">
                            <Check size={11} strokeWidth={2.4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>

          {/* ───────────── 08 · CLIENT RESULTS ───────────── */}
          <Section id="results" className="relative pb-20 md:pb-28">
            <motion.div
              variants={scaleIn}
              className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#10141D] px-6 py-14 md:py-20"
            >
              <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[#0FB5A8]/[0.12] blur-[110px]" />
              <GridOverlay className="opacity-40" />

              <div className="relative">
                <Reveal className="text-center">
                  <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#35E6C7]">08 · Client results</p>
                  <h2 className="mx-auto mt-5 max-w-[560px] font-display text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-[1.1]">
                    Outcomes we're measured by.
                  </h2>
                </Reveal>

                <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-12">
                  {RESULTS.map((r, i) => (
                    <motion.div
                      key={r.label}
                      variants={fadeUp}
                      className={`flex flex-col items-center text-center lg:px-6 ${i > 0 ? "lg:border-l lg:border-white/[0.07]" : ""}`}
                    >
                      <p className="font-display text-[44px] md:text-[56px] font-bold leading-none bg-gradient-to-br from-[#7DF3DE] to-[#0FB5A8] bg-clip-text text-transparent">
                        <Counter to={r.value} suffix={r.suffix} decimals={r.decimals} />
                      </p>
                      <p className="mt-4 text-[14px] font-semibold text-white">{r.label}</p>
                      <p className="mt-1 text-[12px] text-[#9AA6B2]">{r.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Section>

          {/* ───────────── 09 · TESTIMONIALS ───────────── */}
          <Section id="testimonials" className="relative pb-20 md:pb-28">
            <SectionHead
              index="09"
              kicker="Testimonials"
              title="Trusted by people who ship."
              desc="We'd rather let the people we've worked with describe the experience."
              center
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className={`group relative overflow-hidden rounded-3xl border bg-[#10141D] p-8 transition-colors duration-300 hover:border-[#0FB5A8]/35 ${
                    t.featured ? "border-[#0FB5A8]/25" : "border-white/[0.07]"
                  }`}
                >
                  <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#0FB5A8]/[0.08] blur-3xl" />
                  {t.featured && (
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#35E6C7] to-transparent" />
                  )}
                  <span className="font-display text-[60px] leading-none text-[#0FB5A8]/35 select-none">"</span>
                  <p className="mt-1 text-[15px] leading-[1.85] text-[#d7dee5]">{t.quote}</p>
                  <div className="mt-6 flex items-center gap-1 text-[#35E6C7]">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={13} className="fill-current" />
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-3.5 border-t border-white/[0.06] pt-5">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.grad} font-display text-[14px] font-bold text-[#04110f]`}
                    >
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-white">{t.name}</p>
                      <p className="text-[12px] text-[#9AA6B2]">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ───────────── 10 · FINAL CTA ───────────── */}
          <Section className="pb-20 md:pb-28">
            <motion.div
              variants={scaleIn}
              className="relative overflow-hidden rounded-[32px] border border-[#0FB5A8]/25 px-6 py-20 md:py-28 text-center"
            >
              <Aurora />
              <GridOverlay className="opacity-50" />
              <div className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#0FB5A8]/[0.1] blur-[120px]" />

              <div className="relative mx-auto max-w-3xl">
                <Reveal className="flex justify-center">
                  <VectorMark className="h-14 w-14" />
                </Reveal>
                <Reveal>
                  <h2 className="mt-9 font-display text-[36px] sm:text-[52px] md:text-[64px] font-bold tracking-tight leading-[1.05]">
                    Let's build something{" "}
                    <span className="bg-gradient-to-r from-[#35E6C7] via-[#7DF3DE] to-[#0FB5A8] bg-clip-text text-transparent">
                      extraordinary.
                    </span>
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="mx-auto mt-6 max-w-[520px] text-[15px] md:text-[17px] leading-[1.8] text-[#9AA6B2]">
                    Tell us where you want to be in six months. We'll design and engineer the path to get there.
                  </p>
                </Reveal>
                <Reveal>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigateTo("/#contact")}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#35E6C7] to-[#0FB5A8] text-[#04110f] px-8 py-4 text-[15px] font-semibold shadow-[0_24px_60px_-14px_rgba(15,181,168,0.75)] transition-shadow duration-300 hover:shadow-[0_30px_80px_-14px_rgba(15,181,168,0.9)]"
                    >
                      <CalendarCheck size={17} strokeWidth={2} />
                      Book a meeting
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigateTo("/#portfolio")}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      View our work
                    </motion.button>
                  </div>
                </Reveal>
                <Reveal>
                  <p className="mt-7 text-[12px] tracking-wide text-[#4c5763]">
                    No obligations · Free strategy call · Reply within 24 hours
                  </p>
                </Reveal>
              </div>
            </motion.div>
          </Section>

          {/* Footer */}
          <motion.footer
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] py-8"
          >
            <div className="flex items-center gap-2.5">
              <VectorMark className="h-7 w-7" />
              <span className="font-display text-[13px] font-semibold text-white">Vector Labs</span>
              <span className="text-[12px] text-[#4c5763]">· Lahore, Pakistan</span>
            </div>
            <p className="font-mono text-[11px] text-[#4c5763]">© 2026 Vector Labs · Crafted with precision</p>
            <button
              onClick={() => scrollToId("top")}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-zinc-300 transition-colors hover:border-[#0FB5A8]/50 hover:text-white"
            >
              Back to top
              <ArrowUp size={13} />
            </button>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
