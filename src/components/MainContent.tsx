import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import wiosLogo from "../assets/images/projects/WIOS.png";
import proofLogo from "../assets/images/projects/proof.png";
import lawMateLogo from "../assets/images/projects/law-mate.png";
import vectorLabsLogo from "../assets/images/projects/vector-labs.png";
import miniAuraLogo from "../assets/images/projects/mini-aura.png";
import fizLogo from "../assets/images/projects/fiz-business-solutions.png";
import skylineLogo from "../assets/images/projects/skyline-marketing-group.png";
import angelLogo from "../assets/images/projects/angel-bail-bonds.png";
import { Icon } from "@iconify/react";
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
  Loader2,
  CheckCircle2,
  AlertCircle,
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

type Tab = "about" | "resume" | "portfolio" | "contact";

export type { Tab };

interface Project {
  id: number;
  slug: string;
  title: string;
  category: "AI & Automation" | "Mobile Apps" | "Web Development" | "E-Commerce" | "AI & Legal Tech";
  description: string;
  tags: string[];
  gradient: string;
  initials: string;
  logo: string;
}

function ProjectThumbnail({ project }: { project: Project }) {
  return (
    <div className={`w-full h-full ${project.gradient} flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_50%_50%,_white_1px,_transparent_1px)] bg-[length:16px_16px]" />
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-34 h-34 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm overflow-hidden p-2">
  <img
    src={project.logo}
    alt={project.title}
    className="w-full h-full object-contain"
  />
</div>
      </div>
    </div>
  );
}



export default function MainContent({ initialTab = "about" }: { initialTab?: Tab } = {}) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Portfolio" },
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
  icon: "logos:flutter",
  color: "#02569B",
  bg: "bg-[#02569b]/15",
  hoverBorder: "hover:border-[#02569b]/50",
},
    {
  name: "React",
  icon: "logos:react",
  color: "#61DAFB",
  bg: "bg-[#61daf2]/15",
  hoverBorder: "hover:border-[#61daf2]/50",
},
    {
  name: "Firebase",
  icon: "devicon:firebase",
  color: "#FFC928",
  bg: "bg-[#ffca28]/15",
  hoverBorder: "hover:border-[#ffca28]/50",
},
    {
  name: "GitHub",
  icon: "logos:github-icon",
  color: "#FFFFFF",
  bg: "bg-white/70",
  hoverBorder: "hover:border-white/40",
},
    {
  name: "Next.js",
  icon: "devicon:nextjs",
  color: "#FFFFFF",
  bg: "bg-white/15",
  hoverBorder: "hover:border-white/40",
},
    {
  name: "Supabase",
  icon: "devicon:supabase",
  color: "#3ECF8E",
  bg: "bg-[#3ecf8e]/15",
  hoverBorder: "hover:border-[#3ecf8e]/50",
},
    {
  name: "OpenAI",
  icon: "simple-icons:openai",
  color: "#10A37F",
  bg: "bg-[#10a37f]/15",
  hoverBorder: "hover:border-[#10a37f]/50",
},
    {
  name: "TypeScript",
  icon: "devicon:typescript",
  color: "#3178C6",
  bg: "bg-[#3178c6]/15",
  hoverBorder: "hover:border-[#3178c6]/50",
},
  ];
  const projects: Project[] = [
    {
      id: 1,
      slug: "wios",
      title: "WIOS",
      category: "AI & Automation",
      description: "AI-powered workforce management platform with GPS attendance, employee tracking, analytics, WiFi verification, and intelligent business automation.",
      tags: ["Flutter", "Supabase", "Firebase", "Google Maps"],
      gradient: "bg-gradient-to-br from-[#0f172a] to-[#1e293b]",
      initials: "WIOS",
      logo: wiosLogo,
    },
    {
      id: 2,
      slug: "proof",
      title: "Proof",
      category: "Mobile Apps",
      description: "Secure agreement platform for creating trusted digital contracts with identity verification, document management, real-time notifications, and dispute-proof deal tracking.",
      tags: ["Flutter", "Supabase", "Firebase", "AI", "OCR", "FCM"],
      gradient: "bg-gradient-to-br from-[#0b1220] via-[#123c5a] to-[#10b981]",
      initials: "PF",
      logo: proofLogo,
    },
    {
      id: 3,
      slug: "law-mate",
      title: "LawMate",
      category: "AI & Legal Tech",
      description: "Academic AI-powered legal awareness platform that makes the law approachable — a bilingual English & Urdu assistant answering rights questions, plain-language articles, case categories, and one-tap emergency helplines.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Flask", "OpenAI"],
      gradient: "bg-gradient-to-br from-[#0c1023] to-[#1e3a5f]",
      initials: "LM",
      logo: lawMateLogo,
    },
    {
      id: 4,
      slug: "vector-labs",
      title: "Vector Labs",
      category: "Web Development",
      description: "Premium digital agency website built with modern animations, responsive UI, and conversion-focused user experience.",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
      gradient: "bg-gradient-to-br from-[#1c1917] to-[#292524]",
      initials: "VL",
      logo: vectorLabsLogo,
    },
    {
      id: 5,
      slug: "mini-aura",
      title: "Mini Aura",
      category: "E-Commerce",
      description: "Premium Shopify e-commerce store for children's fashion with optimized shopping experience and high-performance storefront.",
      tags: ["Shopify", "Liquid", "JavaScript"],
      gradient: "bg-gradient-to-br from-[#2d0a1e] to-[#4a1942]",
      initials: "MA",
      logo: miniAuraLogo,
    },
    {
      id: 6,
      slug: "fiz-business-solutions",
      title: "FIZ Business Solutions",
      category: "Web Development",
      description: "Professional corporate website focused on business growth, lead generation, and modern digital presence.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      gradient: "bg-gradient-to-br from-[#0a1628] to-[#1a2332]",
      initials: "FIZ",
      logo: fizLogo,
    },
    {
      id: 7,
      slug: "skyline-marketing-group",
      title: "Skyline Marketing Group",
      category: "Web Development",
      description: "Premium marketing agency website showcasing digital marketing, branding, AI automation, and business growth services.",
      tags: ["WordPress", "Elementor", "GSAP"],
      gradient: "bg-gradient-to-br from-[#0a1a0f] to-[#1a2e1a]",
      initials: "SMG",
      logo: skylineLogo,
    },
    {
      id: 8,
      slug: "angel-bail-bonds",
      title: "Angel Bail Bonds",
      category: "Web Development",
      description: "Professional legal services website designed for maximum trust, fast conversions, and excellent user experience.",
      tags: ["WordPress", "Elementor", "PHP"],
      gradient: "bg-gradient-to-br from-[#1a120a] to-[#2d1f14]",
      initials: "ABB",
      logo: angelLogo,
    }
  ];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleContactChange = (field: "name" | "email" | "subject" | "message") => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
    if (!formData.email.trim()) newErrors.email = "Please enter a valid email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) newErrors.message = "Please enter your message.";
    setFormErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus("idle");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.errors) setFormErrors(data.errors);
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {/* Header / Page Title */}
            <div className="flex justify-between items-start pb-2">
              <div className="space-y-2">
                <h2 className="text-[28px] md:text-[34px] font-bold text-white tracking-tight capitalize">
                  {activeTab === "about" ? "About Me" : activeTab === "portfolio" ? "Portfolio" : activeTab}
                </h2>
                <div className="w-[40px] h-[5px] bg-[#ffdb6e] rounded-full" />
              </div>

              {activeTab === "resume" && (
                <motion.a
                  href="/Muhammad_Shahmeer_Talib_Resume.pdf"
                  download="/Shahmeer_Talib_Resume.pdf"
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
                          <Icon
                         icon={tech.icon}
                         className="w-[26px] h-[26px]"
                         />
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
<div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10 shadow-[0_0_8px_rgba(255,219,110,1),0_0_18px_rgba(255,219,110,0.7),0_0_28px_rgba(255,219,110,0.35)]" />                    
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Superior University</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">Bachelor of Science in Computer Science (BSCS)</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">Expected Graduation: 2026</span>
                      <p className="text-[12px] text-zinc-400 font-normal mt-1">Lahore, Pakistan</p>
                      <p className="text-[13px] text-zinc-400 leading-relaxed font-normal mt-3.5">
                        Studying Computer Science with a focus on software engineering, web technologies, mobile application development, databases, artificial intelligence, and modern software architecture.
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
<div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10 shadow-[0_0_8px_rgba(255,219,110,1),0_0_18px_rgba(255,219,110,0.7),0_0_28px_rgba(255,219,110,0.35)]" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Web Developer &amp; SEO Specialist</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">Skyline Marketing Group LLC</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2026 — Present</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Develop premium business websites using WordPress and modern web technologies.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Optimize websites for SEO, Core Web Vitals, and performance.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Build landing pages, business websites, and custom solutions.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Support digital marketing campaigns and improve online visibility.
                        </li>
                      </ul>
                    </div>

                    {/* Experience Item 2 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Vertical line going up to next item and down to next item */}
                      <div className="absolute left-[21.5px] top-[-28px] bottom-[-51px] w-[1px] bg-[#38383a]/40" />
                      {/* Dot */}
<div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10 shadow-[0_0_8px_rgba(255,219,110,1),0_0_18px_rgba(255,219,110,0.7),0_0_28px_rgba(255,219,110,0.35)]" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">E-Commerce Manager</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">Apex Falcons SMC Ltd</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2025</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Managed daily e-commerce operations and online store performance.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Optimized product listings, inventory management, and customer experience.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Improved SEO and conversion strategies.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Coordinated business growth and digital sales operations.
                        </li>
                      </ul>
                    </div>

                    {/* Experience Item 3 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Vertical line going up to next item and down to next item */}
                      <div className="absolute left-[21.5px] top-[-28px] bottom-[-51px] w-[1px] bg-[#38383a]/40" />
                      {/* Dot */}
<div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10 shadow-[0_0_8px_rgba(255,219,110,1),0_0_18px_rgba(255,219,110,0.7),0_0_28px_rgba(255,219,110,0.35)]" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Technical Recruiter (Engineering Division)</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">Vera Tech Solution Limited</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2023 — 2025</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Managed technical recruitment for software engineering positions.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Conducted technical screening for frontend, backend, and mobile developers.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Worked closely with engineering teams to identify top talent.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Improved hiring workflows and recruitment efficiency.
                        </li>
                      </ul>
                    </div>

                    {/* Experience Item 4 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Vertical line going up to next item and down to next item */}
                      <div className="absolute left-[21.5px] top-[-28px] bottom-[-51px] w-[1px] bg-[#38383a]/40" />
                      {/* Dot */}
<div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10 shadow-[0_0_8px_rgba(255,219,110,1),0_0_18px_rgba(255,219,110,0.7),0_0_28px_rgba(255,219,110,0.35)]" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Founder &amp; Shopify Developer</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">DS Mart</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2023</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Founded and managed a Shopify-based e-commerce business.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Customized Shopify themes using Liquid.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Managed products, orders, inventory, and customer experience.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Optimized store performance and mobile responsiveness.
                        </li>
                      </ul>
                    </div>

                    {/* Experience Item 5 */}
                    <div className="relative pl-[62px] max-w-[650px]">
                      {/* Dot */}
<div className="absolute left-[22px] top-[7px] -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#ffdb6e] border-2 border-[#1e1e1f] z-10 shadow-[0_0_8px_rgba(255,219,110,1),0_0_18px_rgba(255,219,110,0.7),0_0_28px_rgba(255,219,110,0.35)]" />
                      
                      <h4 className="text-[15px] font-semibold text-white leading-snug tracking-tight">Founder &amp; Technical Author</h4>
                      <p className="text-[13px] text-zinc-300 font-medium mt-1.5">FutureBit</p>
                      <span className="text-[11.5px] text-[#ffdb6e] font-normal tracking-wide block mt-1.5">2022 — Present</span>
                      <ul className="list-none space-y-2.5 mt-4 text-[13px] text-zinc-400 leading-relaxed font-normal">
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Founded a technology blog focused on software engineering and AI.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Published technical articles on web development, Flutter, React, and AI.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Improved technical writing, SEO, and content strategy.
                        </li>
                        <li className="relative pl-5 before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-1.5 before:bg-[#ffdb6e] before:rounded-full">
                          Shared practical programming knowledge with developers.
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
                  {["All", "AI & Automation", "Mobile Apps", "Web Development", "E-Commerce"].map((cat) => (
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
                      {["All", "AI & Automation", "Mobile Apps", "Web Development", "E-Commerce"].map((cat) => (
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
                      <motion.a
                        layout
                        key={p.id}
                        href={`/portfolio/${p.slug}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group w-full flex flex-col"
                      >
                        {/* Thumbnail card with aspect 4/3 and lift hover effects */}
                        <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-4 bg-[#2b2b2c]/30 border border-[#38383a]/25 shadow-md transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_24px_-8px_rgba(255,219,110,0.15)] group-hover:border-[#ffdb6e]/40">
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

                        {/* Title, Category, Description and Tags */}
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
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {p.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="px-2 py-0.5 rounded bg-[#2b2b2c]/60 border border-[#38383a]/20 text-zinc-400 text-[9px] font-mono"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </AnimatePresence>
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
                    I'm always open to discussing new projects, freelance opportunities, business collaborations, AI-powered software, web development, mobile applications, e-commerce solutions, and SEO projects. Feel free to reach out and let's build something exceptional together.
                  </p>
                </div>

                {/* 3. Contact Form */}
                <form className="space-y-6 text-left" onSubmit={handleContactSubmit} noValidate>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3.5 p-4 rounded-[14px] bg-[#ffdb6e]/10 border border-[#ffdb6e]/25"
                    >
                      <div className="w-9 h-9 rounded-[10px] bg-[#ffdb6e]/15 border border-[#ffdb6e]/30 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={18} className="text-[#ffdb6e] stroke-[1.5]" />
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold text-[#ffdb6e]">Message sent successfully!</p>
                        <p className="text-[12.5px] text-zinc-400 leading-relaxed mt-1 font-normal">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3.5 p-4 rounded-[14px] bg-red-500/10 border border-red-500/25"
                    >
                      <div className="w-9 h-9 rounded-[10px] bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0">
                        <AlertCircle size={18} className="text-red-400 stroke-[1.5]" />
                      </div>
                      <div>
                        <p className="text-[13.5px] font-semibold text-red-400">Something went wrong while sending your message.</p>
                        <p className="text-[12.5px] text-zinc-400 leading-relaxed mt-1 font-normal">Please try again later.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Full Name</label>
                      <div className="relative group">
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={handleContactChange("name")}
                          placeholder="Enter your full name"
                          className={`w-full px-5 py-3.5 text-[13px] bg-[#212123]/20 border text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:bg-[#212123]/40 focus:ring-1 transition-all duration-300 font-normal shadow-sm ${
                            formErrors.name
                              ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/10"
                              : "border-[#38383a]/40 focus:border-[#ffdb6e] focus:ring-[#ffdb6e]/10 hover:border-[#38383a]/70"
                          }`}
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                      </div>
                      {formErrors.name && (
                        <p className="text-[12px] text-red-400 font-normal">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Email Address</label>
                      <div className="relative group">
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={handleContactChange("email")}
                          placeholder="Enter your email address"
                          className={`w-full px-5 py-3.5 text-[13px] bg-[#212123]/20 border text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:bg-[#212123]/40 focus:ring-1 transition-all duration-300 font-normal shadow-sm ${
                            formErrors.email
                              ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/10"
                              : "border-[#38383a]/40 focus:border-[#ffdb6e] focus:ring-[#ffdb6e]/10 hover:border-[#38383a]/70"
                          }`}
                        />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                      </div>
                      {formErrors.email && (
                        <p className="text-[12px] text-red-400 font-normal">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div className="space-y-2">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Subject</label>
                    <div className="relative group">
                      <input 
                        type="text" 
                        required 
                        value={formData.subject}
                        onChange={handleContactChange("subject")}
                        placeholder="What would you like to discuss?"
                        className={`w-full px-5 py-3.5 text-[13px] bg-[#212123]/20 border text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:bg-[#212123]/40 focus:ring-1 transition-all duration-300 font-normal shadow-sm ${
                          formErrors.subject
                            ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/10"
                            : "border-[#38383a]/40 focus:border-[#ffdb6e] focus:ring-[#ffdb6e]/10 hover:border-[#38383a]/70"
                        }`}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                    </div>
                    {formErrors.subject && (
                      <p className="text-[12px] text-red-400 font-normal">{formErrors.subject}</p>
                    )}
                  </div>

                  {/* Row 3: Message */}
                  <div className="space-y-2">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wider uppercase font-mono">Message</label>
                    <div className="relative group">
                      <textarea 
                        required 
                        rows={5}
                        value={formData.message}
                        onChange={handleContactChange("message")}
                        placeholder="Tell me about your project or idea..."
                        className={`w-full px-5 py-4 text-[13px] bg-[#212123]/20 border text-zinc-200 placeholder-zinc-600 rounded-xl outline-none focus:bg-[#212123]/40 focus:ring-1 transition-all duration-300 font-normal resize-none shadow-sm ${
                          formErrors.message
                            ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/10"
                            : "border-[#38383a]/40 focus:border-[#ffdb6e] focus:ring-[#ffdb6e]/10 hover:border-[#38383a]/70"
                        }`}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ffdb6e] transition-all duration-300 group-focus-within:w-full rounded-b-xl" />
                    </div>
                    {formErrors.message && (
                      <p className="text-[12px] text-red-400 font-normal">{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-3">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2.5 px-8 py-3.5 bg-[#2b2b2c] border border-[#38383a]/50 text-[#ffdb6e] hover:text-zinc-950 hover:bg-[#ffdb6e] hover:border-transparent text-[13px] font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:text-[#ffdb6e] disabled:hover:bg-[#2b2b2c] disabled:hover:border-[#38383a]/50"
                      whileHover={isSubmitting ? undefined : { y: -2 }}
                      whileTap={isSubmitting ? undefined : { scale: 0.97 }}
                    >
                      {isSubmitting ? (
                        <Loader2 size={13} className="stroke-[1.5] animate-spin" />
                      ) : (
                        <Send size={13} className="stroke-[1.5]" />
                      )}
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
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
