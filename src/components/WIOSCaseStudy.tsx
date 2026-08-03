import { motion, type Variants } from "motion/react";
import { Icon as IconifyIcon } from "@iconify/react";
import {
  type LucideIcon,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Brain,
  Building2,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Database,
  FileSearch,
  FileText,
  Fingerprint,
  Layers,
  Lock,
  MapPin,
  MessageSquare,
  MonitorSmartphone,
  PieChart,
  Rocket,
  ShieldCheck,
  Timer,
  User,
  Users,
  Wifi,
  Workflow,
} from "lucide-react";
import wiosLogo from "../assets/images/projects/WIOS.png";
import wiosDashboard from "../assets/images/projects/wios/dashboard.png";
import wiosEmployees from "../assets/images/projects/wios/employees.png";
import wiosAttendance from "../assets/images/projects/wios/attendance.png";

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

const BADGES: Array<{ label: string; tier: "primary" | "secondary" }> = [
  { label: "Private LLM", tier: "primary" },
  { label: "AI Assistant", tier: "primary" },
  { label: "Business Automation", tier: "primary" },
  { label: "Enterprise Software", tier: "secondary" },
  { label: "Enterprise Dashboard", tier: "secondary" },
];

const TECH_PILLS = ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Charts", "Web + Mobile"];

const PROBLEMS = [
  { icon: Database, title: "Information scattered across systems", desc: "No single source of truth — data lives in separate tools, spreadsheets, and files." },
  { icon: Layers, title: "Siloed departments", desc: "Teams work in isolation, ownership blurs, and the bigger picture stays out of reach." },
  { icon: ClipboardList, title: "Manual, repetitive work", desc: "Approvals, updates, and reporting done by hand — slow, tedious, and error-prone." },
  { icon: Timer, title: "Reactive decision-making", desc: "By the time reports land, the moment to act has already passed." },
];

const SOLUTIONS = [
  { icon: Brain, title: "Private Company AI", desc: "A dedicated assistant that knows your organization from the inside." },
  { icon: MessageSquare, title: "Natural-language operations", desc: "Ask in plain language and get grounded, instant answers." },
  { icon: Workflow, title: "Automated workflows", desc: "Repetitive work handled in the background, freeing teams to focus." },
  { icon: BarChart3, title: "Live business intelligence", desc: "The state of the organization, updated in real time." },
  { icon: Users, title: "Cross-department clarity", desc: "One connected view that brings every team onto the same page." },
];

const FEATURES = [
  { icon: Users, title: "Employee Management", desc: "Structured profiles, roles, and records for every person." },
  { icon: CalendarClock, title: "Attendance Management", desc: "Reliable daily tracking that keeps itself accurate." },
  { icon: Building2, title: "Department Management", desc: "Clear structure, hierarchy, and ownership for every team." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Real-time workforce health, readable in seconds." },
  { icon: ShieldCheck, title: "Roles & Permissions", desc: "Granular access, applied across every module." },
  { icon: Brain, title: "Private Company AI", desc: "An assistant that knows your business from the inside." },
  { icon: Lock, title: "Secure by Design", desc: "Tenant isolation and encryption built in at every layer." },
  { icon: MonitorSmartphone, title: "Web + Mobile Apps", desc: "A premium experience on every screen and pocket." },
];

const DATA_SOURCES = [
  "Employees",
  "Departments",
  "Attendance",
  "Policies & SOPs",
  "Internal Documents",
  "Reports",
  "Knowledge Base",
];

const PROMPTS = [
  "Who is absent today?",
  "Generate the attendance report.",
  "Summarize the leave policy.",
  "Create an onboarding checklist.",
  "Show this quarter's hiring progress.",
  "Prepare the department report.",
];

const AI_FEATURES = [
  { icon: Brain, title: "Private Company LLM", desc: "An isolated model that knows only your business." },
  { icon: MessageSquare, title: "AI Chat Assistant", desc: "A teammate you can ask anything, in plain language." },
  { icon: Workflow, title: "AI Workflow Automation", desc: "Routine operations that run themselves, end to end." },
  { icon: FileSearch, title: "Document Intelligence", desc: "Understands your SOPs, policies, and documents." },
  { icon: BarChart3, title: "AI Business Analytics", desc: "Business answers, drawn from your own data." },
  { icon: FileText, title: "AI Report Generation", desc: "Complete reports created from a single request." },
];

const USE_CASES = [
  {
    dept: "HR",
    q: "Who is absent today?",
    a: "3 employees are absent — Ahmed Khan (Engineering), Sara Malik (Marketing), and Omar Farooq (Finance). Today's attendance report is already updated.",
  },
  {
    dept: "Finance",
    q: "Show unpaid invoices above $5,000.",
    a: "4 open invoices exceed $5,000, totaling $24,800. The oldest is 23 days overdue — I can draft the payment reminders.",
  },
  {
    dept: "Operations",
    q: "Create an onboarding checklist.",
    a: "Done — a 14-step checklist built from your SOPs: access, training, compliance, and first-week goals. Assigned to the next new hire.",
  },
  {
    dept: "Management",
    q: "Generate the monthly company summary.",
    a: "June summary is ready — 94% attendance, 3 new hires, and a 6% headcount increase. Saved to Reports and scheduled to refresh monthly.",
  },
  {
    dept: "CEO",
    q: "What should I focus on this week?",
    a: "Three priorities: 8 open leave requests awaiting approval, a 6% headcount increase to review, and 2 attendance anomalies in Operations worth investigating.",
  },
  {
    dept: "Admin",
    q: "Which employees haven't completed profile verification?",
    a: "7 employees still need verification — 4 in Sales, 2 in Support, 1 in Engineering. Automated reminders are already queued.",
  },
];

const TECH_STACK: Array<{ role: string; name: string; why: string; iconify?: string; lucide?: LucideIcon }> = [
  { role: "Frontend", name: "React", why: "Component architecture built for reusable enterprise modules.", iconify: "logos:react" },
  { role: "Language", name: "TypeScript", why: "Type safety across the entire application — errors caught before they reach users.", iconify: "devicon:typescript" },
  { role: "Design System", name: "Tailwind CSS", why: "A single, consistent design language shipped across every module.", iconify: "devicon:tailwindcss" },
  { role: "Backend", name: "Node.js", why: "Reliable services powering secure, always-on business operations.", iconify: "logos:nodejs-icon" },
  { role: "API", name: "Express", why: "A lightweight gateway connecting every module to one shared API.", iconify: "simple-icons:express" },
  { role: "Visuals", name: "Charts", why: "Operational metrics become decisions leaders can act on.", lucide: BarChart3 },
  { role: "Experience", name: "Responsive Design", why: "A premium, dependable experience on every screen.", lucide: MonitorSmartphone },
];

const STATS = [
  { value: "40+", label: "Screens", desc: "Every workflow, from dashboard to settings" },
  { value: "15+", label: "Enterprise Modules", desc: "Purpose-built for real business operations" },
  { value: "100+", label: "Reusable Components", desc: "One design system, used everywhere" },
  { value: "20+", label: "AI Automations", desc: "Routine work running on its own" },
  { value: "2", label: "Platforms", desc: "Web dashboard + employee mobile app" },
  { value: "1", label: "Private Enterprise LLM", desc: "One isolated AI per organization" },
];

const MOBILE_FEATURES = [
  { icon: MapPin, title: "GPS Attendance", desc: "One-tap check-in with location verified against your office." },
  { icon: Wifi, title: "WiFi Attendance", desc: "Automatic check-in the moment you join the office network." },
  { icon: Fingerprint, title: "Face & Fingerprint Verification", desc: "Your face or fingerprint confirms identity — no proxy punches." },
  { icon: CalendarDays, title: "Shift Schedule", desc: "Today's shifts, rotations, and reminders in one view." },
  { icon: ClipboardList, title: "Leave Requests", desc: "Request time off and track approvals from anywhere." },
  { icon: Bell, title: "Announcements & Notifications", desc: "Company news and updates reach every employee instantly." },
  { icon: Brain, title: "AI Assistant in Your Pocket", desc: "The same private company AI, available on the go." },
  { icon: ShieldCheck, title: "Digital Identity", desc: "Secure employee profiles, documents, and credentials." },
];

const SCREEN_SMALL: Array<{ image: string; label: string; desc: string }> = [
  { image: wiosEmployees, label: "Employees", desc: "The whole team, in one clean list" },
  { image: wiosAttendance, label: "AI Command Center", desc: "Your AI operations assistant." },
];

function FlowConnector() {
  return (
    <div className="flex flex-col items-center py-0.5">
      <span className="w-px h-3 bg-[#38383a]/40" />
      <ChevronDown size={14} className="stroke-[1.8] text-[#ffdb6e]/70 -mt-0.5" />
    </div>
  );
}

function ScreenshotCard({ image, label, desc }: { image: string; label: string; desc: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl bg-[#141416] border border-[#38383a]/25 shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#38383a]/45 hover:shadow-[0_24px_56px_-20px_rgba(0,0,0,0.8)]"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-white">
        <img
          src={image}
          alt={label}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-zinc-950/60 backdrop-blur-md border border-white/10 font-mono text-[9px] tracking-[0.18em] uppercase text-white/85">
          {label}
        </span>
      </div>
      <div className="p-4 md:p-5 border-t border-[#38383a]/25 bg-[#1a1a1c]/80">
        <h4 className="text-[24px] md:text-[26px] font-bold text-white tracking-tight">{label}</h4>
        <p className="text-[15px] md:text-[16px] text-zinc-400 leading-snug mt-2.5 whitespace-nowrap">{desc}</p>
      </div>
    </motion.div>
  );
}

function AttendanceScreen() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-4 pt-9">
        <div>
          <span className="block font-mono text-[7px] tracking-[0.2em] uppercase text-zinc-500">Tuesday</span>
          <span className="block text-[13px] font-semibold text-white tracking-tight mt-0.5">Check In</span>
        </div>
        <span className="w-7 h-7 rounded-full bg-[#ffdb6e]/15 border border-[#ffdb6e]/25 flex items-center justify-center text-[#ffdb6e]">
          <Bell size={11} className="stroke-[1.6]" />
        </span>
      </div>
      <div className="flex-1 relative mx-3 mt-3 rounded-2xl border border-[#38383a]/25 bg-[#1e1e1f] overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:18px_18px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <span className="w-8 h-8 rounded-full bg-[#ffdb6e]/20 border border-[#ffdb6e]/40 flex items-center justify-center text-[#ffdb6e]">
            <MapPin size={14} className="stroke-[1.6]" />
          </span>
          <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/[0.08] font-mono text-[7px] tracking-[0.1em] uppercase text-zinc-300">
            Office HQ · GPS locked
          </span>
        </div>
      </div>
      <div className="px-3 mt-3">
        <button className="w-full py-3 rounded-xl bg-[#ffdb6e] text-zinc-950 text-[11px] font-semibold shadow-lg">
          Check In
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
          <Fingerprint size={12} className="stroke-[1.6] text-[#ffdb6e]" />
          <div>
            <span className="block text-[8px] font-medium text-white">Face Verified</span>
            <span className="block font-mono text-[6.5px] uppercase tracking-wider text-zinc-500 mt-0.5">Ready</span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
          <Wifi size={12} className="stroke-[1.6] text-[#ffdb6e]" />
          <div>
            <span className="block text-[8px] font-medium text-white">Office WiFi</span>
            <span className="block font-mono text-[6.5px] uppercase tracking-wider text-zinc-500 mt-0.5">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantScreen() {
  return (
    <div className="absolute inset-0 flex flex-col px-3 pt-9">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-[#ffdb6e]/15 border border-[#ffdb6e]/25 flex items-center justify-center text-[#ffdb6e]">
            <Brain size={12} className="stroke-[1.6]" />
          </span>
          <div>
            <span className="block text-[10px] font-semibold text-white tracking-tight leading-none">WIOS AI</span>
            <span className="block font-mono text-[6.5px] uppercase tracking-wider text-[#ffdb6e]/70 mt-0.5">
              Private assistant
            </span>
          </div>
        </div>
        <CheckCircle2 size={12} className="stroke-[1.6] text-[#ffdb6e]" />
      </div>
      <div className="mt-4 px-1">
        <span className="block text-[8px] text-zinc-500">Good morning, Ayesha</span>
        <span className="block text-[11px] font-medium text-white tracking-tight mt-0.5">
          What would you like to do?
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {["Who's absent today?", "My shift schedule", "Request a leave"].map((q, i) => (
          <div
            key={q}
            className={`rounded-xl border px-2.5 py-1.5 text-[8px] ${
              i === 0
                ? "bg-[#ffdb6e]/10 border-[#ffdb6e]/25 text-[#ffdb6e]"
                : "bg-white/[0.02] border-white/[0.06] text-zinc-300"
            }`}
          >
            {q}
          </div>
        ))}
      </div>
      <div className="mt-auto px-1 pb-3">
        <div className="flex items-start gap-1.5">
          <MessageSquare size={11} className="stroke-[1.6] text-[#ffdb6e] shrink-0 mt-[1px]" />
          <span className="text-[8px] text-zinc-400 leading-snug">
            3 employees are absent today — full list ready.
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#ffdb6e]/25 bg-[#ffdb6e]/[0.08] px-2.5 py-2">
          <span className="text-[8px] text-zinc-300 flex-1">Ask anything about work…</span>
          <span className="w-5 h-5 rounded-lg bg-[#ffdb6e] text-zinc-950 flex items-center justify-center">
            <ArrowRight size={9} className="stroke-[2]" />
          </span>
        </div>
      </div>
    </div>
  );
}

function PhoneMock({ screen }: { screen: "attendance" | "assistant" }) {
  return (
    <div className="relative w-full rounded-[2.4rem] border border-[#38383a]/40 bg-[#141416] p-2 shadow-2xl">
      <div className="relative aspect-[9/19] rounded-[1.95rem] overflow-hidden bg-[#19191b]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-16 h-3.5 rounded-full bg-black" />
        <div className="absolute inset-x-0 top-0 z-[5] flex items-center justify-between px-5 pt-3 font-mono text-[8px] text-zinc-400">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <Wifi size={8} className="stroke-[1.8]" />
            <span>100%</span>
          </div>
        </div>
        {screen === "attendance" ? <AttendanceScreen /> : <AssistantScreen />}
      </div>
    </div>
  );
}

export default function WIOSCaseStudy() {
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
              className="absolute top-1/3 left-[-14%] w-[300px] h-[300px] rounded-full bg-[#60a5fa]/[0.07] blur-[110px]"
              animate={{ x: [0, 22, 0], y: [0, -18, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-[#ffdb6e]/[0.05] blur-[120px]"
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
              className="absolute top-[24%] left-[68%] w-2 h-2 rounded-full bg-[#60a5fa]/40 blur-[2px]"
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/10 backdrop-blur-sm overflow-hidden p-2 shadow-lg mx-auto">
                  <img src={wiosLogo} alt="WIOS" className="w-full h-full object-contain" />
                </div>
              </motion.div>

              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#ffdb6e] mt-6"
              >
                Case Study — Enterprise AI Platform
              </motion.span>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-[54px] sm:text-[74px] md:text-[92px] font-extrabold leading-none tracking-tight mt-4 bg-gradient-to-br from-white via-white to-zinc-400 bg-clip-text text-transparent"
              >
                WIOS
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display text-[15px] md:text-[17px] font-medium text-zinc-300 tracking-wide mt-3"
              >
                AI-Powered Workforce Intelligence &amp; Operations Platform
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-zinc-400 text-[14.5px] md:text-[15.5px] leading-[1.9] max-w-[640px] mt-6"
              >
                WIOS gives every organization its own private AI — trained exclusively on its workforce, policies, and
                operations. Employees ask questions in plain language and automate routine work, while leaders act on
                real-time intelligence.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-5 flex items-start justify-center gap-2"
              >
                <span className="mt-[6px] w-1 h-1 rounded-full bg-[#ffdb6e] shrink-0" />
                <p className="text-[12px] text-zinc-500 leading-relaxed max-w-[540px] tracking-wide">
                  Every organization gets its own isolated AI assistant, trained exclusively on its own data.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-2.5 mt-8">
                {BADGES.map((b) => (
                  <span
                    key={b.label}
                    className={
                      b.tier === "primary"
                        ? "px-4 py-1.5 rounded-full bg-[#ffdb6e]/15 border border-[#ffdb6e]/35 text-[#ffdb6e] text-[11.5px] font-semibold tracking-wide"
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
              kicker="Project Overview"
              title="From scattered tools to one intelligent platform"
              desc="Companies rarely run on one system. Work spreads across disconnected tools, manual processes, and personal files — and everyone pays the cost in time and clarity."
              desc2="WIOS changes that. It brings employees, departments, operations, and analytics together in one intelligent platform — with a private AI that understands the business from the inside."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
              <motion.div
                variants={fadeUp}
                className="p-8 rounded-2xl bg-[#19191b]/60 border border-[#38383a]/20 shadow-md"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#212123] border border-[#38383a]/40 flex items-center justify-center text-[#f87171] shadow-inner">
                    <PieChart size={19} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Before</span>
                    <h3 className="text-[17px] font-semibold text-white tracking-tight">The Problem</h3>
                  </div>
                </div>
                <ul className="mt-7 space-y-5">
                  {PROBLEMS.map((item) => (
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

              <motion.div
                variants={fadeUp}
                className="p-8 rounded-2xl border border-[#ffdb6e]/15 bg-gradient-to-br from-[#26262a]/70 to-[#232326]/40 relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#ffdb6e]/[0.1] blur-3xl" />
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#212123] border border-[#ffdb6e]/30 flex items-center justify-center text-[#ffdb6e] shadow-inner">
                    <CheckCircle2 size={19} className="stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">After</span>
                    <h3 className="text-[17px] font-semibold text-white tracking-tight">The Solution</h3>
                  </div>
                </div>
                <ul className="mt-7 space-y-5">
                  {SOLUTIONS.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <IconTile icon={item.icon} size={17} className="w-9 h-9" />
                      <div>
                        <h4 className="text-[13.5px] font-semibold text-white tracking-tight">{item.title}</h4>
                        <p className="text-[12.5px] text-zinc-300 leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 mt-7 pt-6 border-t border-[#ffdb6e]/15">
                  <div className="w-10 h-10 rounded-xl bg-[#ffdb6e]/10 border border-[#ffdb6e]/25 flex items-center justify-center text-[#ffdb6e]">
                    <Rocket size={17} className="stroke-[1.5]" />
                  </div>
                  <p className="text-[12.5px] text-zinc-300 leading-relaxed">
                    One platform. One source of truth. One AI that understands your business.
                  </p>
                </div>
              </motion.div>
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
                  <Brain size={26} className="stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-display text-[19px] md:text-[22px] font-bold text-white tracking-tight">
                    Every company gets its own private AI
                  </h3>
                  <p className="text-[14px] text-zinc-300 leading-relaxed mt-2 max-w-[780px]">
                    Trained exclusively on that company's own data — it feels less like software and more like
                    giving the organization its own ChatGPT, grounded in how it actually works.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="02"
              kicker="Enterprise Platform"
              title="The operational core of every company"
              desc="Eight focused capabilities keep day-to-day operations running — with the private AI layer beneath handling the rest."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {FEATURES.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="group p-7 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#ffdb6e]/30 hover:shadow-[0_12px_24px_-8px_rgba(255,219,110,0.12)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <IconTile icon={item.icon} className="group-hover:bg-[#ffdb6e] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300" />
                    <h3 className="text-[16px] font-semibold text-white tracking-tight group-hover:text-[#ffdb6e] transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[13.5px] text-zinc-400 leading-relaxed mt-4 pl-[60px]">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="03"
              kicker="Platform Preview"
              title="Work happens here"
              desc="Three screens capture the everyday reality of the platform — the command center, the people, and the daily rhythm of attendance."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-5"
            >
              <ScreenshotCard image={wiosDashboard} label="Dashboard" desc="The command center" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SCREEN_SMALL.map((s) => (
                  <div key={s.label} className="contents">
                    <ScreenshotCard image={s.image} label={s.label} desc={s.desc} />
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="04"
              kicker="Private Enterprise AI"
              title="Your Company's Private AI Brain"
              desc="Every organization gets its own secure AI assistant trained exclusively on its own data, documents, employees, workflows, departments, and business knowledge."
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="p-8 md:p-10 rounded-2xl border border-[#38383a]/25 bg-gradient-to-br from-[#222224]/60 to-[#212123]/30 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#ffdb6e]/[0.06] blur-3xl" />
              <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-center">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#ffdb6e]">Isolated by Design</span>
                  <h3 className="font-display text-[22px] md:text-[27px] font-bold text-white tracking-tight mt-3 leading-snug">
                    Not another chatbot. Your company's own private AI.
                  </h3>
                  <p className="text-[14px] text-zinc-400 leading-[1.9] mt-4">
                    Unlike general-purpose assistants, WIOS provides an isolated AI environment dedicated to a single
                    organization — the AI understands company-specific information only.
                  </p>
                  <p className="text-[14px] text-zinc-400 leading-[1.9] mt-3">
                    The AI never mixes data between organizations. Every company has its own private knowledge
                    environment.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                    Knows only your organization's data
                  </span>
                  <div className="flex flex-wrap gap-2.5 mt-4">
                    {DATA_SOURCES.map((s) => (
                      <span
                        key={s}
                        className="px-3.5 py-1.5 rounded-lg bg-[#ffdb6e]/10 border border-[#ffdb6e]/25 text-[#ffdb6e] text-[11px] font-medium tracking-wide"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-5 items-start"
            >
              <motion.div
                variants={fadeUp}
                className="p-8 md:p-10 rounded-2xl border border-[#38383a]/25 bg-gradient-to-br from-[#222224]/50 to-[#212123]/25 relative overflow-hidden lg:sticky lg:top-24 self-start"
              >
                <div className="absolute -top-16 -left-16 w-44 h-44 rounded-full bg-[#60a5fa]/[0.05] blur-3xl" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#ffdb6e]">Why it matters</span>
                <h3 className="font-display text-[23px] md:text-[28px] font-bold text-white tracking-tight mt-3 leading-snug">
                  Traditional software stores information.
                  <span className="block text-[#ffdb6e]">WIOS understands it.</span>
                </h3>
                <p className="text-[14px] text-zinc-400 leading-[1.9] mt-4">
                  Instead of searching through dashboards and reports, employees simply ask the AI — in plain language.
                </p>
                <p className="text-[14px] text-zinc-400 leading-[1.9] mt-3">
                  It's the difference between a database and a knowledgeable teammate.
                </p>
                <div className="mt-8 pt-7 border-t border-[#38383a]/20">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                    Ask your workforce AI
                  </span>
                  <div className="mt-4 space-y-2.5">
                    {PROMPTS.map((p) => (
                      <div
                        key={p}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#ffdb6e]/30 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <MessageSquare size={13} className="stroke-[1.6] text-[#ffdb6e] shrink-0" />
                        <span className="text-[12.5px] text-zinc-300 leading-relaxed">"{p}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {AI_FEATURES.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#ffdb6e]/30 hover:shadow-[0_12px_24px_-8px_rgba(255,219,110,0.12)] transition-all duration-300"
                  >
                    <IconTile icon={item.icon} className="group-hover:bg-[#ffdb6e] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300" />
                    <h4 className="text-[14.5px] font-semibold text-white tracking-tight mt-4">{item.title}</h4>
                    <p className="text-[12px] text-zinc-400 leading-relaxed mt-1.5">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[#38383a]/20" />
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                  Conversations, across departments
                </span>
                <div className="h-px flex-1 bg-[#38383a]/20" />
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {USE_CASES.map((c, i) => (
                  <motion.div
                    key={c.q}
                    variants={fadeUp}
                    className="p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#ffdb6e]/25 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#ffdb6e]/70">{c.dept}</span>
                      <span className="font-mono text-[10px] text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="mt-5 space-y-5">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">You</span>
                          <span className="w-5 h-5 rounded-lg bg-[#212123] border border-[#38383a]/40 flex items-center justify-center text-zinc-400">
                            <User size={11} className="stroke-[1.6]" />
                          </span>
                        </div>
                        <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-br-md bg-[#2b2b2c] border border-[#38383a]/40 text-[12.5px] text-zinc-200 leading-relaxed">
                          "{c.q}"
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="w-5 h-5 rounded-lg bg-[#ffdb6e]/15 border border-[#ffdb6e]/25 flex items-center justify-center text-[#ffdb6e]">
                            <Brain size={11} className="stroke-[1.6]" />
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#ffdb6e]/80">WIOS AI</span>
                        </div>
                        <div className="max-w-[88%] px-4 py-3 rounded-2xl rounded-bl-md bg-[#ffdb6e]/10 border border-[#ffdb6e]/25 text-[12.5px] text-zinc-200 leading-relaxed">
                          {c.a}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="05"
              kicker="Employee Mobile App"
              title="The whole office, in every pocket"
              desc="Attendance, shifts, leave, and the company AI — everything the workforce needs, now on a phone."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-10 lg:gap-12 items-start"
            >
              <motion.div variants={fadeUp} className="lg:sticky lg:top-24">
                <div className="grid grid-cols-2 gap-5 items-center justify-items-center">
                  <div className="w-full max-w-[230px]">
                    <PhoneMock screen="attendance" />
                    <p className="mt-3 text-center font-mono text-[9px] tracking-[0.18em] uppercase text-zinc-500">
                      Check-in, verified
                    </p>
                  </div>
                  <div className="w-full max-w-[230px]">
                    <PhoneMock screen="assistant" />
                    <p className="mt-3 text-center font-mono text-[9px] tracking-[0.18em] uppercase text-zinc-500">
                      The AI, everywhere
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-[12px] text-zinc-500 leading-relaxed text-center max-w-[440px] mx-auto">
                  Location, WiFi, and biometrics confirm every clock-in — while the company AI answers questions from
                  anywhere.
                </p>
              </motion.div>

              <div className="flex flex-col gap-8 md:gap-10">
                {MOBILE_FEATURES.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#ffdb6e]/30 hover:shadow-[0_12px_24px_-8px_rgba(255,219,110,0.12)] transition-all duration-300"
                  >
                    <IconTile icon={item.icon} className="group-hover:bg-[#ffdb6e] group-hover:text-zinc-950 group-hover:border-transparent transition-all duration-300" />
                    <h4 className="text-[14.5px] font-semibold text-white tracking-tight mt-4">{item.title}</h4>
                    <p className="text-[12px] text-zinc-400 leading-relaxed mt-1.5">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="06"
              kicker="Technology"
              title="Built to perform, structured to scale"
              desc="A modular React + Node architecture with a private LLM at the core — technologies chosen for speed, security, and longevity."
            />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="p-7 md:p-9 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 shadow-md"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">Technologies</span>
              <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {TECH_STACK.map((item) => (
                  <li key={item.name} className="flex items-center gap-3.5 group">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#212123] border border-[#38383a]/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {item.iconify ? (
                        <IconifyIcon icon={item.iconify} className="w-[22px] h-[22px]" />
                      ) : item.lucide ? (
                        <item.lucide size={18} className="stroke-[1.5] text-[#ffdb6e]" />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="text-[13.5px] font-semibold text-white tracking-tight">{item.name}</h4>
                        <span className="font-mono text-[8.5px] tracking-[0.2em] uppercase text-[#ffdb6e]/60">
                          {item.role}
                        </span>
                      </div>
                      <p className="text-[12px] text-zinc-500 leading-relaxed mt-0.5">{item.why}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          <section className="space-y-8">
            <SectionHeader
              index="07"
              kicker="Project Scale"
              title="A system built for the entire organization"
              desc="From the first dashboard to the automation engine — the numbers behind the platform."
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
            >
              {STATS.map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-[#212123]/40 border border-[#38383a]/25 hover:border-[#ffdb6e]/30 transition-all duration-300 text-center"
                >
                  <div className="font-display text-[30px] md:text-[36px] font-bold text-white tracking-tight bg-gradient-to-br from-white via-white to-zinc-500 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <span className="block font-mono text-[9.5px] tracking-[0.2em] uppercase text-[#ffdb6e] mt-2">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[280px] rounded-full bg-[#ffdb6e]/[0.08] blur-[100px]" />
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
              Private AI platforms like WIOS are just the beginning. Let's build what's next for your company.
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
              WIOS — Workforce Intelligence &amp; Operations System
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
