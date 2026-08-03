import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  type Variants,
} from "motion/react";
import { Icon as IconifyIcon } from "@iconify/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Box,
  Check,
  Gauge,
  LayoutGrid,
  Lock,
  Menu,
  Plug,
  Ruler,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import miniAuraLogo from "../assets/images/projects/mini-aura.png";
import heroImg from "../assets/images/projects/mini-aura/hero.png";
import desktopImg from "../assets/images/projects/mini-aura/second.png";
import mobileImg from "../assets/images/projects/mini-aura/third.png";

/* ───────────────────────────── Design tokens ───────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const GOLD = "#D4A76C";
const GOLD_SOFT = "#E9C88F";
const GOLD_DEEP = "#A97E4F";
const SURFACE = "#15120D";
const FOG = "#6b645b";
const MUTED = "#a6a096";
const IVORY = "#F7F1E4";
const CREAM = "#FBF6EC";
const INK = "#221D16";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
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
  hideLabel = false,
}: {
  index: string;
  kicker: string;
  title: string;
  desc?: string;
  center?: boolean;
  id?: string;
  titleClass?: string;
  descClass?: string;
  hideLabel?: boolean;
}) {
  return (
    <motion.div
      id={id}
      variants={fadeUp}
      className={`max-w-[740px] scroll-mt-24 ${center ? "mx-auto text-center" : ""}`}
    >
      {!hideLabel && (
        <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4A76C]">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-[#D4A76C]/70 to-transparent" />
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500">{kicker}</span>
        </div>
      )}
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

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "", decimals = 0, duration = 1.8 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
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

function GridOverlay({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        WebkitMaskImage: "radial-gradient(70% 62% at 50% 0%, black, transparent)",
        maskImage: "radial-gradient(70% 62% at 50% 0%, black, transparent)",
      }}
    />
  );
}

function MiniAuraMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#E9C88F] via-[#D4A76C] to-[#A97E4F] shadow-[0_8px_24px_-8px_rgba(212,167,108,0.8)] ${className}`}
    >
      <span className="font-serif text-[15px] font-semibold italic text-[#1b1510]">M</span>
    </span>
  );
}

function Grain({ opacity = 0.05, className = "" }: { opacity?: number; className?: string }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <filter id="maHeroGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#maHeroGrain)" opacity={opacity} />
    </svg>
  );
}

/* ───────────────────────────── Frames & storefront mockups ───────────────────────────── */

function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-10 rounded-full bg-[#D4A76C]/[0.07] blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0906] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-[#12100b] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[9px] tracking-[0.08em] text-zinc-500">
              <Lock size={9} className="text-[#D4A76C]" />
              {url}
            </span>
          </div>
          <span className="w-10" />
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-8 rounded-full bg-[#D4A76C]/[0.1] blur-3xl" />
      <div className="relative rounded-[3rem] bg-gradient-to-b from-[#2b2822] to-[#0a0907] p-[7px] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-[9/19.5] rounded-[2.55rem] overflow-hidden bg-[#F7F1E4] [filter:brightness(1.04)_saturate(1.02)]">
          {children}
          <div className="absolute inset-0 rounded-[2.55rem] ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── Content data ───────────────────────────── */

const HERO_META: Array<{ label: string; value: string }> = [
  { label: "Role", value: "Design · Development" },
  { label: "Timeline", value: "6 weeks · 2026" },
  { label: "Platform", value: "Shopify OS 2.0" },
  { label: "Deliverables", value: "Theme · Brand · CX" },
];

const TECH_CHIPS: Array<{ icon: string; label: string }> = [
  { icon: "simple-icons:shopify", label: "Shopify OS 2.0" },
  { icon: "lucide:braces", label: "Liquid" },
  { icon: "lucide:tags", label: "Metafields" },
  { icon: "lucide:gauge", label: "Core Web Vitals" },
];

const CHALLENGES: Array<{ no: string; title: string; desc: string }> = [
  {
    no: "01",
    title: "Premium positioning",
    desc: "The brand competes on craftsmanship, yet the old storefront read like a marketplace. It had to feel as expensive as the fabric — from the first pixel to the last fold of tissue paper.",
  },
  {
    no: "02",
    title: "Mobile-first shopping",
    desc: "Over 80% of orders come from phones. Every surface had to be designed thumb-first, without sacrificing a single ounce of editorial elegance.",
  },
  {
    no: "03",
    title: "Performance under pressure",
    desc: "Image-heavy fashion on shared hosting meant 6+ second loads. On mobile data, that's a lost customer before the homepage even resolves.",
  },
  {
    no: "04",
    title: "Elegant product discovery",
    desc: "Parents needed the right size, collection, and fabric without friction — filters, variants, and search that feel considered, not clunky.",
  },
  {
    no: "05",
    title: "Trust at checkout",
    desc: "COD and returns anxieties kill fashion carts. The experience had to remove doubt at every step — delivery promises, sizing confidence, and reassurance.",
  },
];

const FEATURES: Array<{ icon: LucideIcon; title: string; desc: string; tag: string }> = [
  {
    icon: LayoutGrid,
    title: "Custom sections",
    desc: "Eight bespoke Online Store 2.0 sections — editorial hero, collection doors, brand story, lookbook — built in Liquid with schema-driven settings.",
    tag: "Liquid · JSON templates",
  },
  {
    icon: Ruler,
    title: "Variant experience",
    desc: "A custom size-and-colour selector that swaps imagery, reflects live stock, and loads the size chart into the PDP without leaving the page.",
    tag: "Metafields · AJAX cart",
  },
  {
    icon: SlidersHorizontal,
    title: "Advanced filtering",
    desc: "Multi-facet collection filters — size, collection, fabric, price — with synced URLs so every result is shareable and back-button friendly.",
    tag: "Shopify filters · Liquid",
  },
  {
    icon: Search,
    title: "Search with memory",
    desc: "Search & Discovery tuned with synonyms, predictive results, and trending queries for the Pakistani market — built for how parents actually type.",
    tag: "Search & Discovery",
  },
  {
    icon: Gauge,
    title: "Performance engineering",
    desc: "Core Web Vitals hand-tuned — preloaded fonts, a responsive image pipeline, lazy-loaded below-fold media, and edge caching at the theme level.",
    tag: "LCP 6.2s → 1.1s",
  },
  {
    icon: Smartphone,
    title: "Mobile-first, literally",
    desc: "Every section designed thumb-first and audited at 320px before the desktop layout was allowed to exist.",
    tag: "320px minimum",
  },
  {
    icon: Workflow,
    title: "Automation flows",
    desc: "Klaviyo flows — abandoned cart, browse recovery, post-purchase — wired to native Shopify events, with branded emails in the same design system.",
    tag: "Klaviyo · Shopify API",
  },
  {
    icon: Plug,
    title: "Integrations & ops",
    desc: "COD reconciliation, live tracking, a WhatsApp concierge, and analytics stitched into one order pipeline the team actually trusts.",
    tag: "APIs · Webhooks",
  },
];

const RESULTS: Array<{ value: number; suffix: string; decimals: number; label: string; note: string }> = [
  { value: 82, suffix: "%", decimals: 0, label: "Faster page loads", note: "LCP 6.2s → 1.1s" },
  { value: 97, suffix: "", decimals: 0, label: "Mobile PageSpeed", note: "Lighthouse · performance" },
  { value: 68, suffix: "%", decimals: 0, label: "Mobile conversion lift", note: "vs. previous storefront" },
  { value: 41, suffix: "%", decimals: 0, label: "Longer sessions", note: "avg. session duration" },
];

const PERFORMANCE: Array<{ label: string; before: string; after: string; beforeW: number; afterW: number }> = [
  { label: "Largest Contentful Paint", before: "6.2s", after: "1.1s", beforeW: 78, afterW: 13 },
  { label: "Speed Index", before: "5.4s", after: "0.9s", beforeW: 70, afterW: 11 },
  { label: "Cumulative Layout Shift", before: "0.32", after: "0.04", beforeW: 82, afterW: 10 },
  { label: "First Input Delay", before: "220ms", after: "24ms", beforeW: 68, afterW: 8 },
];

const OUTCOMES = [
  "An elegant UX that finally matches the brand — not just a template with a logo on it.",
  "A storefront that feels instant on 4G, even mid-campaign with thousands of images.",
  "Sharper engagement on every page — collections, products, and checkout alike.",
  "A mobile experience parents actually enjoy completing on a phone.",
  "A premium brand system applied consistently across web, email, and packaging.",
];

/* ───────────────────────────── The page ───────────────────────────── */

export default function MiniAuraCaseStudy() {
  return (
    <div id="top" className="bg-[#0D0B08] border border-white/[0.06] rounded-[20px] shadow-xl relative overflow-visible">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 rounded-t-[20px]">
        <div className="flex items-center justify-between gap-3 px-6 sm:px-10 lg:px-14 py-4 border-b border-white/[0.06] bg-[#0D0B08]/85 backdrop-blur-xl">
          <button
            onClick={() => navigateTo("/#portfolio")}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-zinc-300 transition-colors hover:border-[#D4A76C]/50 hover:text-white"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>
          <div className="flex items-center gap-2.5">
            <img src={miniAuraLogo} alt="Mini Aura" className="h-8 w-8 rounded-full border border-[#D4A76C]/40 object-cover" />
            <span className="font-display text-[15px] font-semibold text-white tracking-tight">Mini Aura</span>
          </div>
          <button
            onClick={() => navigateTo("/#contact")}
            className="rounded-full bg-gradient-to-r from-[#E9C88F] to-[#C9A35F] text-[#1b1510] px-4 py-2 text-[12px] font-semibold transition-transform hover:scale-[1.03]"
          >
            Let's Talk
          </button>
        </div>
      </div>

      <div className="relative isolate">
        {/* Global backdrop (clipped to the card) */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-[20px]">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[620px] rounded-full bg-[#D4A76C]/[0.09] blur-[130px]" />
          <div className="absolute top-0 right-[-12%] w-[420px] h-[420px] rounded-full bg-[#E9C88F]/[0.04] blur-[110px]" />
          <div className="absolute top-0 left-[-12%] w-[420px] h-[420px] rounded-full bg-[#C9A35F]/[0.04] blur-[110px]" />
          <div className="absolute inset-x-0 top-0 h-[620px] [background:linear-gradient(to_right,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(72%_62%_at_50%_0%,black,transparent)]" />
        </div>

        <div className="relative px-6 sm:px-10 lg:px-14">
          {/* ───────────── 01 · HERO ───────────── */}
          <section className="relative pt-16 md:pt-24 pb-10 md:pb-14">
            <div className="absolute -top-32 -left-12 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,167,108,0.14),transparent_62%)] blur-2xl pointer-events-none" />
            <div className="absolute top-16 -right-12 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(233,200,143,0.09),transparent_62%)] blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 left-1/3 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(201,163,95,0.06),transparent_65%)] blur-2xl pointer-events-none" />
            <Grain opacity={0.045} />

            <motion.div variants={stagger} initial="hidden" animate="visible">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-16 lg:gap-12 items-center">
                {/* ── Left · content ── */}
                <div className="text-center lg:text-left">
                  <motion.div
                    variants={scaleIn}
                    className="inline-flex items-center gap-3 rounded-full border border-[#D4A76C]/25 bg-[#D4A76C]/[0.06] backdrop-blur px-4 py-2"
                  >
                    <img src={miniAuraLogo} alt="Mini Aura" className="h-5 w-5 rounded-full object-cover" />
                    <span className="h-3.5 w-px bg-[#D4A76C]/30" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#EFE0C4]">Shopify Case Study</span>
                  </motion.div>

                  <motion.h1
                    variants={fadeUp}
                    className="mt-10 font-display text-[52px] sm:text-[68px] lg:text-[84px] leading-[0.95] font-bold tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#E9C88F]"
                  >
                    Mini Aura
                  </motion.h1>

                  <motion.div variants={fadeUp} className="mt-7">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[13px] font-medium text-zinc-300">
                      <Sparkles size={14} className="stroke-[1.8] text-[#D4A76C]" />
                      Luxury Kids&apos; Fashion · Lahore
                    </span>
                  </motion.div>

                  <motion.p
                    variants={fadeUp}
                    className="mt-8 max-w-[520px] text-zinc-400 text-[15px] md:text-[16px] leading-[1.85] mx-auto lg:mx-0"
                  >
                    Flagship Shopify build for a Lahore fashion house — custom Liquid
                    sections, mobile-first storefront, and Core Web Vitals tuned to the
                    millisecond. Engineered for conversion.
                  </motion.p>

                  <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => scrollToId("features")}
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E9C88F] to-[#C9A35F] text-[#1b1510] px-7 py-3.5 text-[13.5px] font-semibold shadow-[0_16px_40px_-12px_rgba(212,167,108,0.55)] transition-shadow duration-300 hover:shadow-[0_22px_55px_-12px_rgba(212,167,108,0.8)]"
                    >
                      Explore the experience
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => scrollToId("results")}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 text-[13.5px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.09] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_50px_-20px_rgba(0,0,0,0.9)]"
                    >
                      View results
                    </motion.button>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-7 border-t border-white/[0.06] pt-9">
                    {HERO_META.map((m) => (
                      <div key={m.label} className="text-center lg:text-left">
                        <p className="font-mono text-[9px] tracking-[0.24em] uppercase text-zinc-500">{m.label}</p>
                        <p className="mt-2.5 text-[13px] font-semibold text-white">{m.value}</p>
                      </div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                    {TECH_CHIPS.map((t) => (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11.5px] text-zinc-300 backdrop-blur-sm"
                      >
                        <IconifyIcon icon={t.icon} className="h-3 w-3 text-[#D4A76C]" />
                        {t.label}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* ── Right · phone visual ── */}
                <motion.div variants={scaleIn} className="relative flex justify-center">
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,167,108,0.10),transparent_62%)] blur-2xl" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A76C]/10" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A76C]/[0.05]" />

                  <div className="relative -mb-12 md:-mb-16">
                    <PhoneFrame className="w-[255px]">
                      <img
                        src={heroImg}
                        alt="Mini Aura storefront hero"
                        className="h-full w-full object-cover"
                      />
                    </PhoneFrame>

                    {/* Floating metrics */}
                    <div className="pointer-events-none absolute -left-24 top-16 hidden lg:block">
                      <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(18,16,11,0.55))] px-4 py-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl -rotate-2">
                        <div>
                          <p className="font-display text-[24px] font-bold leading-none bg-gradient-to-br from-[#E9C88F] to-[#C9A35F] bg-clip-text text-transparent">98</p>
                          <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-500">Lighthouse</p>
                        </div>
                        <span className="h-9 w-px bg-white/10" />
                        <div>
                          <p className="font-display text-[24px] font-bold leading-none text-white">1.1s</p>
                          <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-500">LCP</p>
                        </div>
                      </div>
                    </div>
                    <div className="pointer-events-none absolute -right-24 bottom-40 hidden lg:block">
                      <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(18,16,11,0.55))] px-4 py-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl rotate-2">
                        <div>
                          <p className="font-display text-[24px] font-bold leading-none bg-gradient-to-br from-[#E9C88F] to-[#C9A35F] bg-clip-text text-transparent">+38%</p>
                          <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-500">Conversion</p>
                        </div>
                        <span className="h-9 w-px bg-white/10" />
                        <div>
                          <p className="font-display text-[24px] font-bold leading-none text-white">{"<2s"}</p>
                          <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-500">Load time</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* ───────────── 02 · THE CHALLENGE ───────────── */}
          <Section id="challenge" className="relative pb-20 md:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-12 lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHead
                  index="02"
                  kicker="The Challenge"
                  title="A premium brand was being sold like a bazaar post."
                  desc="Mini Aura's product had outgrown its storefront. The brief was simple and exacting: make the digital experience feel as expensive as the fabric."
                />
                <div className="mt-8 border-l-2 border-[#D4A76C]/60 pl-6">
                  <p className="font-serif text-[20px] italic leading-[1.5] text-zinc-200">
                    “We are selling quiet luxury. The site must whisper it on the first scroll.”
                  </p>
                  <p className="mt-3 font-mono text-[9px] tracking-[0.24em] uppercase text-zinc-500">— The brief · 2026</p>
                </div>
              </div>

              <div>
                {CHALLENGES.map((c) => (
                  <motion.div
                    key={c.no}
                    variants={fadeUp}
                    className="group grid grid-cols-[auto_1fr] gap-6 border-t border-white/[0.07] py-7 transition-colors last:border-b"
                  >
                    <span className="font-mono text-[13px] font-medium text-[#D4A76C]/70 transition-colors group-hover:text-[#E9C88F]">
                      {c.no}
                    </span>
                    <div>
                      <h3 className="font-display text-[19px] md:text-[21px] font-bold text-white tracking-tight">{c.title}</h3>
                      <p className="mt-2.5 max-w-[520px] text-[14px] leading-[1.85] text-zinc-400">{c.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          {/* ───────────── 03 · CUSTOM FEATURES ───────────── */}
          <Section id="features" className="relative pb-20 md:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-12 lg:gap-16">
              <div>
                <motion.div variants={fadeUp} className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4A76C]">03</span>
                  <span className="h-px w-10 bg-gradient-to-r from-[#D4A76C]/70 to-transparent" />
                  <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-zinc-500">Custom Features</span>
                </motion.div>

                {FEATURES.map((f) => (
                  <motion.div
                    key={f.title}
                    variants={fadeUp}
                    className="group grid grid-cols-[auto_1fr] gap-6 border-t border-white/[0.07] py-7 transition-colors last:border-b"
                  >
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#D4A76C] transition-colors duration-300 group-hover:border-[#D4A76C]/40 group-hover:bg-[#D4A76C]/[0.08]">
                      <f.icon size={19} className="stroke-[1.7]" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-[19px] md:text-[21px] font-bold text-white tracking-tight">{f.title}</h3>
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-[#D4A76C]/70">{f.tag}</span>
                      </div>
                      <p className="mt-2.5 max-w-[560px] text-[14px] leading-[1.85] text-zinc-400">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHead
                  index="03"
                  kicker="Custom Features"
                  title="Nothing from the app store. Everything in service of the brand."
                  desc="Eight custom pieces of the build — Liquid, metafields, and integrations — each chosen to raise the storefront's ceiling, not to add bells."
                  hideLabel
                />
                <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#15120D] p-6">
                  <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.22em] uppercase text-zinc-500">
                    <span>Theme architecture</span>
                    <span className="flex items-center gap-1 text-[#D4A76C]"><Box size={10} /> sections</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    {["Header / announcement", "Hero · editorial", "Collection doors", "Brand story", "Product grid", "Cart drawer", "Footer / trust"].map((s, i) => (
                      <div key={s} className="flex items-center gap-3">
                        <span className="w-4 font-mono text-[8px] text-zinc-600">{i + 1}</span>
                        <span className="h-7 flex-1 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 text-[11px] leading-7 text-zinc-300">
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ───────────── 04 · RESULTS ───────────── */}
          <Section id="results" className="relative pb-20 md:pb-28">
            <motion.div
              variants={scaleIn}
              className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#15120D] px-6 py-14 md:py-20"
            >
              <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[#D4A76C]/[0.1] blur-[110px]" />
              <GridOverlay className="opacity-40" />

              <div className="relative">
                <Reveal className="text-center">
                  <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#D4A76C]">04 · Results</p>
                  <h2 className="mx-auto mt-5 max-w-[600px] font-display text-[28px] md:text-[40px] font-bold text-white tracking-tight leading-[1.1]">
                    Measured after launch, not promised before it.
                  </h2>
                </Reveal>

                <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-y-12">
                  {RESULTS.map((r, i) => (
                    <motion.div
                      key={r.label}
                      variants={fadeUp}
                      className={`flex flex-col items-center text-center lg:px-6 ${i > 0 ? "lg:border-l lg:border-white/[0.07]" : ""}`}
                    >
                      <p className="font-display text-[44px] md:text-[54px] font-bold leading-none bg-gradient-to-br from-[#E9C88F] to-[#C9A35F] bg-clip-text text-transparent">
                        <Counter to={r.value} suffix={r.suffix} decimals={r.decimals} />
                      </p>
                      <p className="mt-4 text-[14px] font-semibold text-white">{r.label}</p>
                      <p className="mt-1 text-[12px] text-zinc-500">{r.note}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Performance bars */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0D0B08] p-7">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9px] tracking-[0.26em] uppercase text-zinc-500">Core Web Vitals</p>
                      <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#E9C88F]">
                        <Zap size={11} /> passed
                      </span>
                    </div>
                    <div className="mt-6 space-y-5">
                      {PERFORMANCE.map((p) => (
                        <div key={p.label}>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-400">{p.label}</span>
                            <span className="font-mono text-[10px] text-zinc-600">{p.before}</span>
                            <span className="font-mono text-[10px] font-semibold text-[#E9C88F]">{p.after}</span>
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${p.beforeW}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                                className="absolute inset-y-0 left-0 rounded-full bg-[#f87171]/40"
                              />
                            </div>
                            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${p.afterW}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
                                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#E9C88F] to-[#C9A35F]"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-[20px] md:text-[24px] font-bold text-white tracking-tight">
                      What actually moved.
                    </h3>
                    <ul className="mt-7 space-y-4">
                      {OUTCOMES.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14.5px] leading-[1.7] text-zinc-300">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D4A76C]/20 text-[#E9C88F]">
                            <Check size={11} strokeWidth={2.4} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </Section>

          {/* ───────────── 05 · FINAL SHOWCASE ───────────── */}
          <Section id="showcase" className="relative pb-20 md:pb-28">
            <SectionHead
              index="05"
              kicker="Final Showcase"
              title="One storefront, end to end."
              desc="Desktop, tablet, and phone — the same calm, premium voice across every viewport."
              center
            />

            <div className="relative mx-auto mt-16 md:mt-24 w-full max-w-[900px]">
              {/* Warm golden glow behind the composition */}
              <div className="pointer-events-none absolute -top-32 left-1/2 h-[540px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,167,108,0.14),transparent_62%)] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[360px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,163,95,0.08),transparent_65%)] blur-3xl" />

              {/* Desktop — fades up first */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: EASE }}
                className="relative"
              >
                <BrowserFrame url="miniaura.com/">
                  <img
                    src={desktopImg}
                    alt="Mini Aura desktop storefront"
                    className="h-full w-full object-cover"
                  />
                </BrowserFrame>
                {/* Soft shadow beneath the desktop */}
                <div className="pointer-events-none absolute -bottom-10 left-[8%] right-[8%] h-14 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_70%)] blur-2xl" />
              </motion.div>

              {/* Mobile — slides in from the right, slight delay, tucked into the bottom-right corner */}
              <motion.div
                initial={{ opacity: 0, x: 56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
                className="absolute right-[2%] -bottom-14 md:-bottom-20 z-10"
              >
                <PhoneFrame className="w-[150px] md:w-[165px]">
                  <img
                    src={mobileImg}
                    alt="Mini Aura mobile storefront"
                    className="h-full w-full object-cover"
                  />
                </PhoneFrame>
                {/* Soft shadow beneath the mobile */}
                <div className="pointer-events-none absolute -bottom-5 left-1/2 h-7 w-28 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5),transparent_70%)] blur-lg" />
              </motion.div>
            </div>
          </Section>

          {/* ───────────── FINAL CTA ───────────── */}
          <Section className="pb-20 md:pb-28">
            <motion.div
              variants={scaleIn}
              className="relative overflow-hidden rounded-[32px] border border-[#D4A76C]/25 px-6 py-20 md:py-28 text-center"
            >
              <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#D4A76C]/[0.12] blur-[120px]" />
              <GridOverlay className="opacity-50" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E9C88F] to-transparent" />

              <div className="relative mx-auto max-w-3xl">
                <Reveal className="flex justify-center">
                  <MiniAuraMark className="h-14 w-14" />
                </Reveal>
                <Reveal>
                  <h2 className="mt-9 font-display text-[36px] sm:text-[52px] md:text-[62px] font-bold tracking-tight leading-[1.05]">
                    Your storefront should feel as premium{" "}
                    <span className="bg-gradient-to-r from-[#E9C88F] via-[#D4A76C] to-[#A97E4F] bg-clip-text text-transparent">
                      as your product.
                    </span>
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="mx-auto mt-6 max-w-[540px] text-[15px] md:text-[17px] leading-[1.8] text-zinc-400">
                    Design, theme architecture, performance, and conversion — a Shopify build that feels like a luxury label, engineered to sell.
                  </p>
                </Reveal>
                <Reveal>
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigateTo("/#contact")}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E9C88F] to-[#C9A35F] text-[#1b1510] px-8 py-4 text-[15px] font-semibold shadow-[0_24px_60px_-14px_rgba(212,167,108,0.7)] transition-shadow duration-300 hover:shadow-[0_30px_80px_-14px_rgba(212,167,108,0.9)]"
                    >
                      Start your storefront project
                      <ArrowUpRight size={17} strokeWidth={2} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigateTo("/#portfolio")}
                      className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-8 py-4 text-[15px] font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                    >
                      View all work
                    </motion.button>
                  </div>
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
            <div className="flex items-center gap-3">
              <MiniAuraMark className="h-8 w-8" />
              <span className="font-display text-[15px] font-semibold text-white tracking-tight">Mini Aura</span>
              <span className="text-[12px] text-zinc-500">· Shopify Case Study</span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-600">
              © 2026 Mini Aura · Design & Development
            </p>
            <button
              onClick={() => scrollToId("top")}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] font-medium text-zinc-300 transition-colors hover:border-[#D4A76C]/50 hover:text-white"
            >
              Back to top
              <ArrowUp size={13} className="stroke-[2.2]" />
            </button>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
