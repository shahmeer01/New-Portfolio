import { motion, type Variants } from "motion/react";
import { Icon as IconifyIcon } from "@iconify/react";
import {
  type LucideIcon,
  Activity,
  Archive,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarClock,
  Camera,
  CheckCircle2,
  Clock,
  Coins,
  Eye,
  FilePlus2,
  FileSearch,
  FileText,
  HandCoins,
  Handshake,
  History,
  IdCard,
  ImageOff,
  Lock,
  Paperclip,
  RefreshCw,
  ScanFace,
  ScanLine,
  ScanText,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  UploadCloud,
  UserX,
  Users,
} from "lucide-react";
import proofLogo from "../assets/images/projects/proof.png";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function navigateTo(path: string) {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function IconTile({ icon: Icon, size = 20, className = "" }: { icon: LucideIcon; size?: number; className?: string }) {
  return (
    <div
      className={`w-11 h-11 shrink-0 rounded-xl bg-[#212123] border border-[#38383a]/40 flex items-center justify-center text-[#ffdb6e] shadow-inner ${className}`}
    >
      <Icon size={size} className="stroke-[1.5]" />
    </div>
  );
}

function SectionHeader({
  index,
  kicker,
  title,
  desc,
  desc2,
}: {
  index: string;
  kicker: string;
  title: string;
  desc?: string;
  desc2?: string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#ffdb6e]">
        {index} — {kicker}
      </span>
      <h2 className="font-display text-[26px] md:text-[34px] font-bold text-white tracking-tight mt-3">
        {title}
      </h2>
      <div className="w-[40px] h-[5px] bg-[#ffdb6e] rounded-full mt-4" />
      {desc && (
        <p className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-[1.9] mt-5 max-w-[640px]">
          {desc}
        </p>
      )}
      {desc2 && (
        <p className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-[1.9] mt-3 max-w-[640px]">
          {desc2}
        </p>
      )}
    </motion.div>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[13px] h-[13px]">
      <path d="M16.36 12.79c.03 3.36 2.94 4.48 2.98 4.5-.02.09-.47 1.6-1.54 3.17-.93 1.37-1.9 2.73-3.42 2.76-1.5.03-1.98-.89-3.69-.89-1.7 0-2.23.86-3.64.92-1.46.06-2.57-1.48-3.51-2.84C1.85 17.49.6 12.87 2.52 9.83c.95-1.5 2.63-2.44 4.46-2.47 1.38-.03 2.69.93 3.54.93.84 0 2.42-1.15 4.08-.98.7.03 2.65.28 3.9 2.11-.1.06-2.33 1.36-2.14 3.37zM13.5 4.3c.77-.93 1.29-2.23 1.15-3.52-1.11.05-2.46.74-3.26 1.67-.72.82-1.35 2.14-1.18 3.4 1.25.1 2.53-.63 3.29-1.55z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[12px] h-[12px]">
      <path d="M4 3.5v17l15-8.5-15-8.5z" />
    </svg>
  );
}

function StoreBadge({ type }: { type: "apple" | "play" }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/70 border border-[#38383a]/40 text-left hover:border-[#10b981]/40 transition-colors duration-300">
      <span className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white">
        {type === "apple" ? <AppleGlyph /> : <PlayGlyph />}
      </span>
      <span>
        <span className="block font-mono text-[7.5px] uppercase tracking-[0.18em] text-zinc-400">
          {type === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="block text-[12px] font-semibold text-white tracking-tight">
          {type === "apple" ? "App Store" : "Google Play"}
        </span>
      </span>
    </div>
  );
}

const BADGES: Array<{ label: string; tier: "primary" | "secondary" }> = [
  { label: "Identity Verification", tier: "primary" },
  { label: "Digital Evidence", tier: "primary" },
  { label: "Trust Timeline", tier: "primary" },
  { label: "Secure Agreements", tier: "secondary" },
  { label: "End-to-End Encryption", tier: "secondary" },
];

const TECH_PILLS = ["Flutter", "Dart", "Supabase", "Firebase", "ML Kit", "PostgreSQL"];

const HERO_META = [
  { label: "Role", value: "Product Design + Development" },
  { label: "Timeline", value: "12 weeks, end to end" },
  { label: "Platform", value: "Android · iOS" },
];

const PROBLEM_POINTS = [
  { icon: Clock, title: "Promises, not papers", desc: "A handshake or a chat thread leaves no record of what was actually agreed." },
  { icon: ShieldAlert, title: "He-said, she-said disputes", desc: "Terms get remembered differently — and nobody can prove what was agreed." },
  { icon: UserX, title: "No identity checks", desc: "You never really know who's on the other side of the deal." },
  { icon: FileSearch, title: "No evidence trail", desc: "Receipts and timelines vanish exactly when you need them." },
  { icon: Shield, title: "No recourse when it breaks", desc: "There's no neutral record — and nothing holding anyone to their word." },
];

const PROBLEM_EXAMPLES = [
  { icon: HandCoins, title: "Money Lending", desc: "Loans between friends, no note attached." },
  { icon: Briefcase, title: "Freelance Work", desc: "Scope, deadlines, and pay agreed over chat." },
  { icon: Smartphone, title: "Buying & Selling", desc: "Used goods traded on a handshake and a hope." },
  { icon: Users, title: "Family Agreements", desc: "Commitments too close to formalize — until they break." },
  { icon: Building2, title: "Business Commitments", desc: "Terms that matter, kept nowhere safe." },
];

const SOLUTION_PILLARS = [
  { icon: FileText, title: "Written, not whispered", desc: "Every deal in plain language, signed by a verified identity." },
  { icon: ScanFace, title: "Identity confirmed", desc: "CNIC OCR and a live face match prove who's on the other side." },
  { icon: History, title: "One living timeline", desc: "Every milestone recorded automatically — nothing quietly rewritten." },
  { icon: Archive, title: "Evidence kept forever", desc: "Files and receipts attached to the right step, preserved after close." },
];

const TRUST_FLOW: Array<{ icon: LucideIcon; role: string; title: string; desc: string }> = [
  { icon: FilePlus2, role: "Draft", title: "Create Deal", desc: "Terms written the way people actually talk." },
  { icon: Send, role: "Invite", title: "Invite Participant", desc: "The other side joins by phone number or secure link." },
  { icon: BadgeCheck, role: "Sign", title: "Accept Agreement", desc: "Acceptance tied to a verified identity and signature." },
  { icon: ScanFace, role: "Verify", title: "Identity Verified", desc: "Both parties pass CNIC and face checks before it moves." },
  { icon: History, role: "Track", title: "Timeline Updates", desc: "Each milestone is stamped into the shared timeline." },
  { icon: Paperclip, role: "Evidence", title: "Evidence Added", desc: "Receipts and files attach to the exact step they belong to." },
  { icon: CheckCircle2, role: "Close", title: "Completed", desc: "The deal closes only when both sides confirm." },
  { icon: Archive, role: "Seal", title: "Archived Forever", desc: "The record is stored immutable, always retrievable." },
];

const WALKTHROUGH_SCREENS: Array<{ screen: "home" | "create" | "details" | "notifications" | "profile" | "settings"; label: string; desc: string }> = [
  { screen: "home", label: "Home", desc: "Active deals and activity, at a glance" },
  { screen: "create", label: "Create Deal", desc: "Terms in plain language, verified automatically" },
  { screen: "details", label: "Deal Details", desc: "One timeline holds the entire deal history" },
  { screen: "notifications", label: "Notifications", desc: "Every step, surfaced the moment it happens" },
  { screen: "profile", label: "Profile", desc: "Verified identity, proven to everyone" },
  { screen: "settings", label: "Settings", desc: "Private by default, controlled by you" },
];

const VERIFY_JOURNEY: Array<{ icon: LucideIcon; role: string; title: string; desc: string }> = [
  { icon: ScanLine, role: "Capture", title: "Capture CNIC", desc: "Front and back photographed inside the app in seconds." },
  { icon: ScanText, role: "OCR", title: "OCR Extraction", desc: "On-device ML Kit reads name, number, and fields instantly." },
  { icon: Eye, role: "Review", title: "User Review", desc: "The user confirms what was read before it's saved." },
  { icon: Camera, role: "Liveness", title: "Selfie Verification", desc: "A live selfie proves the document's owner is present now." },
  { icon: ScanFace, role: "Match", title: "Face Detection", desc: "Facial comparison with liveness — not a static photo." },
  { icon: BadgeCheck, role: "Approved", title: "Identity Approved", desc: "The account is verified and unlocked for deals." },
  { icon: ShieldCheck, role: "Badge", title: "Verified Badge", desc: "A visible trust marker on every profile and deal." },
  { icon: Activity, role: "Monitor", title: "Continuous Monitoring", desc: "Expiry, tampering, and anomalies watched long after approval." },
];

const VERIFY_CAPABILITIES: Array<{ icon: LucideIcon; title: string; desc: string; fraud?: boolean }> = [
  { icon: ScanText, title: "Google ML Kit OCR", desc: "On-device text extraction — fast and fully private." },
  { icon: IdCard, title: "CNIC Validation", desc: "National ID fields checked against document rules." },
  { icon: ScanFace, title: "Face Detection", desc: "Facial landmarks matched against the document photo." },
  { icon: Camera, title: "Selfie Verification", desc: "A guided, live selfie confirms the owner is present." },
  { icon: ImageOff, title: "Blur Detection", desc: "Blurry frames are rejected before they reach the document." },
  { icon: Eye, title: "Image Quality Validation", desc: "Lighting, glare, and legibility are scored automatically." },
  { icon: History, title: "Verification History", desc: "Every check recorded, stamped, and stored for review." },
  { icon: CalendarClock, title: "Expiry Monitoring", desc: "IDs approaching expiry trigger alerts automatically." },
  { icon: RefreshCw, title: "Re-verification", desc: "Identity refreshed on schedule, without breaking the flow." },
  { icon: BadgeCheck, title: "Verified Badge", desc: "A trust marker visible on every profile and deal." },
  { icon: ShieldAlert, title: "Fraud Prevention", desc: "Liveness, tampering detection, and expired-ID blocks stop impersonation before it becomes a deal.", fraud: true },
];

const IDENTITY_FLOW: Array<{ icon: LucideIcon; label: string; approved?: boolean }> = [
  { icon: ScanText, label: "Capture CNIC" },
  { icon: ScanLine, label: "OCR Extraction" },
  { icon: ScanFace, label: "Face Match" },
  { icon: Eye, label: "Liveness Check" },
  { icon: BadgeCheck, label: "Identity Approved", approved: true },
];

const TRUST_CHECKS = [
  "Government ID Verified",
  "Face Matched",
  "OCR Validated",
  "Fraud Checked",
  "Expiry Monitored",
];

const TIMELINE_ENTRIES: Array<{ icon: LucideIcon; role: string; title: string; time: string; desc: string }> = [
  { icon: FilePlus2, role: "Draft", title: "Deal Created", time: "Mon · 9:41 AM", desc: "Car sale for Rs. 50,000 — terms written in plain language." },
  { icon: Send, role: "Invite", title: "Participant Invited", time: "Mon · 9:42 AM", desc: "Imran joins by secure link; the deal is visible to both sides." },
  { icon: BadgeCheck, role: "Sign", title: "Accepted & Signed", time: "Mon · 11:02 AM", desc: "Imran accepts with a verified identity and digital signature." },
  { icon: ScanFace, role: "Verify", title: "Identity Verified", time: "Mon · 11:04 AM", desc: "Both parties' CNIC and face checks pass and lock in." },
  { icon: UploadCloud, role: "Evidence", title: "Evidence Uploaded", time: "Tue · 4:18 PM", desc: "Two files attached — the payment receipt and transfer slip." },
  { icon: History, role: "Update", title: "Timeline Updated", time: "Tue · 4:19 PM", desc: "The change is stamped and pushed to both sides in realtime." },
  { icon: CheckCircle2, role: "Close", title: "Completed", time: "Wed · 2:00 PM", desc: "Both parties confirm the deal is done — paid in full." },
  { icon: Archive, role: "Seal", title: "Archived Forever", time: "Wed · 2:01 PM", desc: "The full record is sealed — immutable and retrievable anytime." },
];

const ARCHITECTURE: Array<{ role: string; name: string; why: string; iconify?: string; lucide?: LucideIcon }> = [
  { role: "Frontend", name: "Flutter", why: "One codebase ships Android and iOS together — no drift, no double the work.", iconify: "logos:flutter" },
  { role: "Backend & Auth", name: "Supabase", why: "Realtime, auth, and storage in one service — with row-level security built in.", iconify: "simple-icons:supabase" },
  { role: "Push", name: "Firebase", why: "Reliable notifications the instant a step changes — with zero backend weight.", iconify: "simple-icons:firebase" },
  { role: "Vision", name: "ML Kit", why: "OCR and face detection run on-device, so identity data never leaves the phone.", lucide: ScanFace },
  { role: "Database", name: "PostgreSQL", why: "A relational model that keeps deals, identities, and evidence consistent.", iconify: "simple-icons:postgresql" },
];

const STATS = [
  { value: "50+", label: "Mobile Screens", desc: "Every flow, onboarding to settings" },
  { value: "15+", label: "Core Features", desc: "Deals, verification, notifications & more" },
  { value: "100+", label: "Reusable Components", desc: "One design system, used everywhere" },
  { value: "100%", label: "Biometric Security", desc: "Face + fingerprint on every account" },
  { value: "KYC", label: "Identity Verification", desc: "CNIC OCR + face match on every user" },
  { value: "Live", label: "Realtime Sync", desc: "Supabase-backed, always up to date" },
  { value: "RLS", label: "Private Storage", desc: "Encrypted files behind row-level security" },
  { value: "FCM", label: "Push Notifications", desc: "Reliable alerts the moment a step changes" },
];

const PROOF_SCREENSHOTS: Record<string, string> = {
  home: "/images/projects/proof/home.png",
  create: "/images/projects/proof/create-deal.png",
  details: "/images/projects/proof/deal-details.png",
  notifications: "/images/projects/proof/notifications.png",
  profile: "/images/projects/proof/profile.png",
  settings: "/images/projects/proof/settings.png",
};

function ProofPhone({
  screen,
}: {
  screen: "home" | "create" | "details" | "notifications" | "profile" | "settings";
}) {
  return (
    <div className="relative w-full rounded-[2.4rem] border border-[#38383a]/40 bg-[#141416] p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.65)]">
      <div className="relative aspect-[9/19] rounded-[1.95rem] overflow-hidden bg-[#19191b]">
        <img
          src={PROOF_SCREENSHOTS[screen]}
          alt={`Proof ${screen} screen`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default function ProofCaseStudy() {
  return (
    <div className="bg-[#1e1e1f] border border-[#38383a]/30 rounded-[20px] shadow-xl relative overflow-visible">
      <div className="overflow-clip rounded-[20px]">
        <div className="relative isolate">
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:18px_18px]" />
            <div
              className="absolute inset-x-0 top-0 h-[460px] bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:44px_44px]"
              style={{ maskImage: "radial-gradient(60% 100% at 50% 0%, black, transparent)" }}
            />
            <svg
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[360px]"
              style={{ maskImage: "radial-gradient(60% 100% at 50% 0%, black, transparent)" }}
              viewBox="0 0 760 360"
              fill="none"
              aria-hidden="true"
            >
              <g stroke="white" strokeOpacity="0.05">
                <path d="M150 70 L340 140 L520 60 L620 150" />
                <path d="M340 140 L310 290 L500 330 L620 150" />
                <path d="M150 70 L110 230 L310 290" />
              </g>
              <g fill="white">
                <circle cx="150" cy="70" r="2.5" fillOpacity="0.08" />
                <circle cx="340" cy="140" r="2.5" fillOpacity="0.12" />
                <circle cx="520" cy="60" r="2.5" fillOpacity="0.08" />
                <circle cx="620" cy="150" r="2.5" fillOpacity="0.1" />
                <circle cx="110" cy="230" r="2.5" fillOpacity="0.08" />
                <circle cx="310" cy="290" r="2.5" fillOpacity="0.1" />
                <circle cx="500" cy="330" r="2.5" fillOpacity="0.08" />
              </g>
            </svg>
            <motion.div
              className="absolute -top-24 right-[-12%] w-[340px] h-[340px] rounded-full bg-[#ffdb6e]/[0.08] blur-[100px]"
              animate={{ x: [0, -26, 0], y: [0, 18, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/3 left-[-14%] w-[300px] h-[300px] rounded-full bg-[#10b981]/[0.08] blur-[110px]"
              animate={{ x: [0, 22, 0], y: [0, -18, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-[#10b981]/[0.05] blur-[120px]"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute top-[16%] left-[10%] w-1.5 h-1.5 rounded-full bg-[#ffdb6e]/50 blur-[1px]"
              animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -8, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute top-[38%] left-[85%] w-1 h-1 rounded-full bg-white/40 blur-[1px]"
              animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -10, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            <motion.span
              className="absolute top-[24%] left-[68%] w-2 h-2 rounded-full bg-[#10b981]/40 blur-[2px]"
              animate={{ opacity: [0.12, 0.45, 0.12], y: [0, 8, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />
            <motion.span
              className="absolute top-[58%] left-[16%] w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px]"
              animate={{ opacity: [0.1, 0.35, 0.1], y: [0, -6, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
            />
            <motion.span
              className="absolute top-[48%] left-[55%] w-1 h-1 rounded-full bg-[#ffdb6e]/40 blur-[1px]"
              animate={{ opacity: [0.12, 0.4, 0.12], y: [0, 10, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 8 }}
            />
            <motion.span
              className="absolute top-[70%] left-[76%] w-1.5 h-1.5 rounded-full bg-white/25 blur-[1px]"
              animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -8, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full border border-white/[0.03]" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full border border-white/[0.04]" />
          </div>

          <div className="relative px-6 sm:px-10 md:px-14 pt-8 md:pt-12 pb-14 md:pb-20">
            <motion.button
              onClick={() => navigateTo("/#portfolio")}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#212123]/60 border border-[#38383a]/40 text-zinc-300 hover:text-[#ffdb6e] hover:border-[#ffdb6e]/30 transition-all duration-300 text-[12.5px] font-medium cursor-pointer"
            >
              <ArrowLeft size={14} className="stroke-[1.8]" />
              Back to Portfolio
            </motion.button>

            <div className="flex flex-col items-center text-center mt-10 md:mt-14">
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b1220] to-[#123c5a] border border-[#10b981]/25 backdrop-blur-sm overflow-hidden p-2 shadow-lg mx-auto">
                  <img src={proofLogo} alt="Proof" className="w-full h-full object-contain" />
                </div>
              </motion.div>

              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#ffdb6e] mt-6"
              >
                Case Study — Trust-Based Digital Agreements
              </motion.span>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-[54px] sm:text-[74px] md:text-[92px] font-extrabold leading-none tracking-tight mt-4 bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent"
              >
                Proof
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-[15px] md:text-[17px] font-medium text-zinc-300 tracking-wide mt-3"
              >
                Digital agreements you can actually trust
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-[1.9] max-w-[640px] mt-6"
              >
                Proof turns informal agreements — money lent, freelance work, a sale between strangers — into
                verified, timestamped digital records. Identity checked before a deal begins, evidence kept after
                it ends.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-3 mt-7"
              >
                <StoreBadge type="apple" />
                <StoreBadge type="play" />
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8 w-full max-w-[720px] grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {HERO_META.map((m) => (
                  <div
                    key={m.label}
                    className="px-4 py-3.5 rounded-xl bg-[#212123]/60 border border-[#38383a]/25 text-left"
                  >
                    <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500">
                      {m.label}
                    </span>
                    <span className="block text-[13px] font-medium text-white tracking-tight mt-1">{m.value}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-2.5 mt-8">
                {BADGES.map((b) => (
                  <span
                    key={b.label}
                    className={
                      b.tier === "primary"
                        ? "px-4 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/35 text-[#10b981] text-[11.5px] font-semibold tracking-wide"
                        : "px-4 py-1.5 rounded-full bg-[#212123]/60 border border-[#38383a]/35 text-zinc-400 text-[11px] font-normal tracking-wide"
                    }
                  >
                    {b.label}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-2.5 mt-5">
                {TECH_PILLS.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-lg border border-[#38383a]/20 text-zinc-500 text-[11px] font-mono hover:text-zinc-300 hover:border-[#38383a]/30 transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-10 md:px-14 pb-12 md:pb-16 space-y-16 md:space-y-24">
          <section className="space-y-8">
            <SectionHeader
              index="01"
              kicker="Problem → Solution"
              title="Why trust breaks — and how Proof rebuilds it"
              desc="People lend money, hire freelancers, and sell to strangers every single day — and almost none of it is written down. The agreement lives in a chat thread, a handshake, or a memory. And when a promise breaks, that's all there is to fall back on."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-5"
            >
              <motion.div variants={fadeUp} className="p-8 rounded-2xl bg-[#19191b]/60 border border-[#38383a]/20 shadow-md">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#212123] border border-[#38383a]/40 flex items-center justify-center text-[#f87171] shadow-inner">
                    <ShieldAlert size={19} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">The gap</span>
                    <h3 className="text-[17px] font-semibold text-white tracking-tight">What's missing today</h3>
                  </div>
                </div>
                <ul className="mt-7 space-y-5">
                  {PROBLEM_POINTS.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <IconTile icon={item.icon} size={17} className="w-9 h-9 text-zinc-400" />
                      <div>
                        <h4 className="text-[13.5px] font-semibold text-zinc-300 tracking-tight">{item.title}</h4>
                        <p className="text-[12.5px] text-zinc-500 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-[#10b981]/15 bg-gradient-to-br from-[#26262a]/70 to-[#232326]/40 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#10b981]/[0.12] blur-3xl" />
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#212123] border border-[#10b981]/30 flex items-center justify-center text-[#10b981] shadow-inner">
                    <Handshake size={19} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">The stakes</span>
                    <h3 className="text-[17px] font-semibold text-white tracking-tight">Where Trust Matters</h3>
                  </div>
                </div>
                <ul className="mt-7 space-y-5">
                  {PROBLEM_EXAMPLES.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <IconTile icon={item.icon} size={17} className="w-9 h-9" />
                      <div>
                        <h4 className="text-[13.5px] font-semibold text-white tracking-tight">{item.title}</h4>
                        <p className="text-[12.5px] text-zinc-400 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mt-7 pt-6 border-t border-[#10b981]/15">
                  <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center text-[#10b981]">
                    <Coins size={17} className="stroke-[1.5]" />
                  </div>
                  <p className="text-[12.5px] text-zinc-300 leading-relaxed">
                    Trust shouldn't depend on memory.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {SOLUTION_PILLARS.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  variants={fadeUp}
                  className="group relative p-5 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#10b981]/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#10b981]/[0.06] blur-2xl" />
                  <IconTile
                    icon={pillar.icon}
                    size={17}
                    className="w-9 h-9 group-hover:bg-[#10b981] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300"
                  />
                  <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#10b981]/70 mt-4">
                    The fix · 0{i + 1}
                  </span>
                  <h4 className="text-[13.5px] font-semibold text-white tracking-tight mt-1">{pillar.title}</h4>
                  <p className="text-[11.5px] text-zinc-500 leading-relaxed mt-1">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              <motion.div
                variants={fadeUp}
                className="group relative p-6 rounded-2xl border border-[#10b981]/20 bg-[#10b981]/[0.04] overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#10b981]/[0.08] blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center text-[#10b981]">
                      <IdCard size={18} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#10b981]/70">
                        Proof guarantee
                      </span>
                      <h4 className="text-[15px] font-semibold text-white tracking-tight">Every participant is verified</h4>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-zinc-400 leading-relaxed mt-3">
                    Government-issued ID is confirmed before the first deal. No fake accounts, no anonymous parties —
                    real people, real agreements.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["Gov-issued ID", "Verified before deals", "No fake users"].map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[10.5px] font-medium tracking-wide"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="group relative p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#ffdb6e]/[0.06] blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#ffdb6e]/10 border border-[#ffdb6e]/25 flex items-center justify-center text-[#ffdb6e]">
                      <Lock size={18} className="stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-[#ffdb6e]/70">
                        Proof guarantee
                      </span>
                      <h4 className="text-[15px] font-semibold text-white tracking-tight">Evidence that outlives the chat</h4>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-zinc-400 leading-relaxed mt-3">
                    Every agreement becomes a signed digital record — a timestamped, immutable timeline with evidence
                    files attached to each step.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {["Digital agreement", "Timestamp", "Evidence files", "Activity timeline"].map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-lg bg-[#212123] border border-[#38383a]/25 text-zinc-400 text-[10.5px] font-medium tracking-wide"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="02"
              kicker="Trust Flow"
              title="Eight steps from promise to proof"
              desc="Every deal moves through the same engine. Each stage is recorded, verified, and preserved — so nothing can be skipped, edited, or quietly rewritten."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="lg:hidden"
            >
              {TRUST_FLOW.map((s, i) => (
                <motion.div key={s.title} variants={fadeUp} className="relative flex gap-3.5 pb-5 last:pb-0">
                  {i < TRUST_FLOW.length - 1 && (
                    <span className="absolute left-[15px] top-9 bottom-0 w-px bg-[#38383a]/40" />
                  )}
                  <div className="relative z-10 w-[30px] h-[30px] shrink-0 rounded-full bg-[#212123] border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
                    <s.icon size={13} className="stroke-[1.6]" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#10b981]/60">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="text-[13px] font-semibold text-white tracking-tight">{s.title}</h4>
                    </div>
                    <p className="text-[12px] text-zinc-500 leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute top-[17px] left-[4%] right-[4%] h-px bg-[repeating-linear-gradient(90deg,rgba(16,185,129,0.35)_0_6px,transparent_6px_12px)]" />
              <div className="grid grid-cols-8 gap-3">
                {TRUST_FLOW.map((s, i) => (
                  <motion.div key={s.title} variants={fadeUp} className="relative flex flex-col items-center text-center px-1">
                    <div
                      className={`relative z-10 w-9 h-9 rounded-full bg-[#212123] border flex items-center justify-center ${
                        i === TRUST_FLOW.length - 1
                          ? "border-[#ffdb6e]/50 text-[#ffdb6e]"
                          : "border-[#10b981]/40 text-[#10b981]"
                      }`}
                    >
                      <s.icon size={15} className="stroke-[1.6]" />
                    </div>
                    <span
                      className={`font-mono text-[8px] tracking-[0.18em] uppercase mt-3 ${
                        i === TRUST_FLOW.length - 1 ? "text-[#ffdb6e]/70" : "text-[#10b981]/60"
                      }`}
                    >
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[12px] font-semibold text-white tracking-tight mt-1 leading-snug">
                      {s.title}
                    </h4>
                    <p className="text-[10.5px] text-zinc-500 leading-relaxed mt-1">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="03"
              kicker="App Showcase"
              title="The app, screen by screen"
              desc="Six screens cover the complete journey — from the home dashboard to a settled, verified deal."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              {WALKTHROUGH_SCREENS.map((s, i) => (
                <motion.div key={s.screen} variants={fadeUp} className="flex flex-col items-center">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#10b981]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-[22px] font-bold text-white tracking-tight mt-2">
                      {s.label}
                    </h3>
                    <p className="mt-3 text-[12.5px] text-zinc-400 text-center leading-relaxed max-w-[220px] min-h-[52px] flex items-start justify-center">
                      {s.desc}
                    </p>
                  </div>
                  <motion.div
                    className="relative mt-6"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <motion.div
                      className="absolute -inset-5 rounded-full bg-[#10b981]/[0.06] blur-2xl"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                    <motion.div
                      className="relative w-[200px] will-change-transform"
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <ProofPhone screen={s.screen} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="04"
              kicker="Identity Verification"
              title="Know exactly who you're dealing with"
              desc="This is Proof's core. Every account passes a government-identity check before it can join a deal — captured, read by on-device ML Kit, and matched to a live selfie. And verification never stops: documents are watched for expiry and tampering long after they're approved."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-start"
            >
              <motion.div variants={fadeUp} className="lg:sticky lg:top-28">
                <div className="relative rounded-2xl bg-[#212123]/50 border border-[#38383a]/25 backdrop-blur-xl overflow-hidden shadow-xl">
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#10b981]/[0.1] blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-[#ffdb6e]/[0.05] blur-3xl pointer-events-none" />
                  <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:16px_16px] pointer-events-none" />

                  <div className="relative p-7 md:p-8 flex flex-col items-center">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative mt-1"
                    >
                      <div className="absolute -inset-5 rounded-full bg-[#10b981]/[0.14] blur-2xl pointer-events-none" />
                      <motion.span
                        className="absolute inset-0 rounded-2xl border border-[#10b981]/40 pointer-events-none"
                        animate={{ scale: [1, 1.22], opacity: [0.7, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                      />
                      <div className="relative w-[76px] h-[76px] rounded-2xl bg-gradient-to-br from-[#10b981]/30 to-[#10b981]/[0.05] border border-[#10b981]/40 flex items-center justify-center shadow-[0_0_32px_rgba(16,185,129,0.25)]">
                        <ShieldCheck size={36} className="stroke-[1.5] text-[#10b981]" />
                      </div>
                    </motion.div>

                    <h3 className="mt-6 font-display text-[19px] font-bold text-white tracking-tight">
                      Identity Trust Engine
                    </h3>
                    <p className="mt-2 text-[12px] text-zinc-400 leading-relaxed max-w-[300px] text-center">
                      Every account passes a complete verification pipeline before joining a deal.
                    </p>

                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      animate="visible"
                      className="relative mt-7 w-full max-w-[300px]"
                    >
                      <span className="absolute left-[17px] top-3 bottom-3 w-px bg-gradient-to-b from-[#10b981]/50 via-[#10b981]/20 to-transparent pointer-events-none" />
                      <motion.span
                        className="absolute left-[17px] top-3 bottom-3 w-px bg-[#10b981]/50 blur-[3px] pointer-events-none"
                        animate={{ opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <ul className="relative space-y-1">
                        {IDENTITY_FLOW.map((s) => (
                          <motion.li
                            key={s.label}
                            variants={fadeUp}
                            className="relative flex items-center gap-3.5 py-1.5"
                          >
                            {s.approved ? (
                              <motion.div
                                className="w-[34px] h-[34px] shrink-0 rounded-xl bg-[#10b981] text-zinc-950 flex items-center justify-center"
                                animate={{
                                  boxShadow: [
                                    "0 0 0px rgba(16,185,129,0.2)",
                                    "0 0 16px rgba(16,185,129,0.55)",
                                    "0 0 0px rgba(16,185,129,0.2)",
                                  ],
                                }}
                                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <s.icon size={15} className="stroke-[2]" />
                              </motion.div>
                            ) : (
                              <div className="w-[34px] h-[34px] shrink-0 rounded-xl bg-[#10b981]/10 border border-[#10b981]/25 flex items-center justify-center text-[#10b981]">
                                <s.icon size={15} className="stroke-[1.8]" />
                              </div>
                            )}
                            <span
                              className={`text-[13px] font-medium ${s.approved ? "text-[#10b981]" : "text-zinc-200"}`}
                            >
                              {s.label}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <div className="mt-6 w-full rounded-xl bg-[#10b981]/[0.06] border border-[#10b981]/20 p-4">
                      <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#10b981]/70">
                        Every account · every deal
                      </span>
                      <ul className="mt-3 space-y-2">
                        {TRUST_CHECKS.map((c) => (
                          <li key={c} className="flex items-center gap-2.5 text-[12px] text-zinc-300">
                            <CheckCircle2 size={13} className="shrink-0 text-[#10b981]" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={stagger} className="space-y-0">
                {VERIFY_JOURNEY.map((s, i) => (
                  <motion.div key={s.title} variants={fadeUp} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < VERIFY_JOURNEY.length - 1 && (
                      <span className="absolute left-[17px] top-10 bottom-0 w-px bg-[#38383a]/40" />
                    )}
                    <div className="relative z-10 mt-0.5 w-[34px] h-[34px] shrink-0 rounded-full bg-[#212123] border border-[#10b981]/40 flex items-center justify-center">
                      <span className="font-mono text-[10px] text-[#10b981]">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2.5">
                        <IconTile icon={s.icon} size={15} className="w-8 h-8" />
                        <div>
                          <span className="block font-mono text-[8px] tracking-[0.18em] uppercase text-[#10b981]/60">
                            {s.role}
                          </span>
                          <h4 className="text-[13.5px] font-semibold text-white tracking-tight -mt-0.5">
                            {s.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-zinc-500 leading-relaxed mt-1.5">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {VERIFY_CAPABILITIES.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={
                    item.fraud
                      ? "group p-6 rounded-2xl border border-[#f87171]/25 bg-[#f87171]/[0.04] hover:shadow-[0_12px_24px_-8px_rgba(248,113,113,0.15)] transition-all duration-300"
                      : "group p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#10b981]/30 hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.12)] transition-all duration-300"
                  }
                >
                  <IconTile
                    icon={item.icon}
                    className={
                      item.fraud
                        ? "group-hover:bg-[#f87171] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300"
                        : "group-hover:bg-[#10b981] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300"
                    }
                  />
                  <h4 className="text-[14.5px] font-semibold text-white tracking-tight mt-4">{item.title}</h4>
                  <p className="text-[12px] text-zinc-400 leading-relaxed mt-1.5">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="05"
              kicker="Trust Timeline"
              title="One deal, one unbreakable timeline"
              desc="Follow a single deal from first draft to sealed archive. Every action — accepted, evidenced, updated, completed — is stamped and visible to both sides. Nothing can be quietly changed."
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative p-7 md:p-8 rounded-2xl border border-[#10b981]/20 bg-gradient-to-br from-[#26262a]/70 to-[#232326]/40 overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#10b981]/[0.1] blur-3xl" />
              <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-zinc-500">
                      Deal #104 · Car sale
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#ffdb6e]/15 border border-[#ffdb6e]/30 text-[#ffdb6e] font-mono text-[8px] tracking-[0.15em] uppercase">
                      Settled
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="font-display text-[30px] md:text-[36px] font-bold text-white tracking-tight">
                      Rs. 50,000
                    </span>
                    <span className="text-[12.5px] text-zinc-400">paid in full</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#212123]/60 border border-[#38383a]/25">
                    <span className="w-7 h-7 rounded-full bg-[#10b981]/25 border border-[#10b981]/40" />
                    <div>
                      <span className="block text-[10.5px] font-semibold text-white">Ayesha Khan</span>
                      <span className="block text-[8px] text-zinc-500">You</span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="stroke-[1.8] text-zinc-600" />
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#212123]/60 border border-[#38383a]/25">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#10b981]/40 to-[#10b981]/10 border border-[#10b981]/40 flex items-center justify-center">
                      <BadgeCheck size={11} className="stroke-[1.8] text-[#10b981]" />
                    </span>
                    <div>
                      <span className="block text-[10.5px] font-semibold text-white">Imran Ali</span>
                      <span className="block text-[8px] text-zinc-500">Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {TIMELINE_ENTRIES.map((e, i) => (
                <motion.div key={e.title} variants={fadeUp} className="relative flex gap-4">
                  {i < TIMELINE_ENTRIES.length - 1 && (
                    <span className="absolute left-[19px] top-12 bottom-0 w-px bg-[#38383a]/40" />
                  )}
                  <div
                    className={`relative z-10 mt-1 w-10 h-10 shrink-0 rounded-full bg-[#212123] border flex items-center justify-center ${
                      i === TIMELINE_ENTRIES.length - 1
                        ? "border-[#ffdb6e]/50 text-[#ffdb6e]"
                        : "border-[#10b981]/40 text-[#10b981]"
                    }`}
                  >
                    <e.icon size={16} className="stroke-[1.6]" />
                  </div>
                  <div className="flex-1 pb-5 pt-1.5">
                    <div className="rounded-2xl border border-[#38383a]/25 bg-[#212123]/40 p-4 hover:border-[#10b981]/25 transition-colors duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-[#10b981]/60">
                            {e.role}
                          </span>
                          <h4 className="text-[13.5px] font-semibold text-white tracking-tight">{e.title}</h4>
                        </div>
                        <span className="font-mono text-[8.5px] tracking-[0.12em] text-zinc-500">{e.time}</span>
                      </div>
                      <p className="text-[12.5px] text-zinc-400 leading-relaxed mt-1.5">{e.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative p-8 rounded-2xl border border-[#ffdb6e]/25 bg-[#ffdb6e]/[0.05] overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#ffdb6e]/[0.08] blur-3xl" />
              <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#ffdb6e]/15 border border-[#ffdb6e]/30 flex items-center justify-center text-[#ffdb6e]">
                  <Lock size={26} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-display text-[19px] md:text-[22px] font-bold text-white tracking-tight">
                    Every action is permanent evidence
                  </h3>
                  <p className="text-[14px] text-zinc-300 leading-relaxed mt-2 max-w-[780px]">
                    Even after a deal closes, the record stays — receipts, timelines, and signatures preserved in
                    storage that can't be edited. Disputes end before they begin.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="06"
              kicker="Technical Architecture"
              title="A lean stack, chosen for trust"
              desc="Every piece of the stack was picked for one reason — to make verified, private agreements simple to build and hard to break."
            />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="p-7 md:p-9 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 shadow-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Stack & why</span>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#10b981]/60">
                  5 services · fully managed
                </span>
              </div>
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                {ARCHITECTURE.map((item) => (
                  <li key={item.name} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#212123] border border-[#38383a]/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {item.iconify ? (
                        <IconifyIcon icon={item.iconify} className="w-[22px] h-[22px]" />
                      ) : item.lucide ? (
                        <item.lucide size={18} className="stroke-[1.5] text-[#10b981]" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-[14px] font-semibold text-white tracking-tight">{item.name}</h4>
                        <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#10b981]/60">
                          {item.role}
                        </span>
                      </div>
                      <p className="text-[12px] text-zinc-500 leading-relaxed mt-1">{item.why}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-6 border-t border-[#38383a]/15 flex flex-wrap gap-2.5">
                {[
                  "One codebase · Android + iOS",
                  "Row-level security on every table",
                  "Identity processing on-device",
                  "Realtime sync for live updates",
                ].map((n) => (
                  <span
                    key={n}
                    className="px-3.5 py-1.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] text-[11px] font-medium tracking-wide"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="07"
              kicker="Project Scale"
              title="Built to cover real life"
              desc="From the first screen to the trust engine — the numbers behind the platform."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#10b981]/30 transition-all duration-300 text-center"
                >
                  <div className="font-display text-[30px] md:text-[36px] font-bold text-white tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <span className="block font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#10b981] mt-2">
                    {s.label}
                  </span>
                  <p className="text-[11.5px] text-zinc-500 leading-relaxed mt-2">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        <section className="relative overflow-hidden border-t border-[#38383a]/20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[280px] rounded-full bg-[#10b981]/[0.08] blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:16px_16px]" />
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative px-6 sm:px-10 md:px-14 py-16 md:py-24 text-center"
          >
            <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#ffdb6e]">
              Have a project in mind?
            </span>
            <h2 className="font-display text-[28px] md:text-[40px] font-bold text-white tracking-tight mt-4 max-w-[640px] mx-auto leading-tight">
              Interested in building something similar?
            </h2>
            <p className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-[1.9] max-w-[560px] mx-auto mt-5">
              Trust-based agreements are just the beginning. Let's build what's next for your product.
            </p>
            <motion.button
              onClick={() => navigateTo("/#contact")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 mt-9 px-8 py-4 bg-[#ffdb6e] text-zinc-950 text-[13.5px] font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_32px_rgba(255,219,110,0.4)]"
            >
              Contact Me
              <ArrowRight size={15} className="stroke-[1.8]" />
            </motion.button>
          </motion.div>
        </section>

        <footer className="px-6 sm:px-10 md:px-14 py-6 border-t border-[#38383a]/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-zinc-500">
              Proof — Trust-Based Digital Agreements
            </p>
            <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-zinc-500">
              Case Study / {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
