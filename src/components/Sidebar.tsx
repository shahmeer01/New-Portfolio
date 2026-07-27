import { Mail, MapPin, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { motion } from "motion/react";

const profilePic = "/src/assets/images/professional_portrait_1784148542630.jpg";

export default function Sidebar() {
  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Globe, href: "#", label: "Website" },
  ];

  return (
    <aside id="sidebar" className="w-full lg:w-[290px] shrink-0 bg-[#1e1e1f] border border-[#38383a]/30 rounded-[24px] pt-9 pb-8 px-6 lg:px-7 flex flex-col items-center justify-start text-center relative shadow-xl h-fit lg:sticky lg:top-16">
      
      {/* Top Profile Content Wrapper */}
      <div className="flex flex-col items-center w-full">
        {/* Profile Photo Container (Reduced to 150px with elegant breathing room) */}
        <div className="w-[150px] h-[150px] rounded-[32px] overflow-hidden mb-6 shadow-lg bg-[#2b2b2c]">
          <img
            src={profilePic}
            alt="Muhammad Shahmeer Talib"
            className="w-full h-full object-cover scale-[1.15] grayscale opacity-95 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback if image path is not found in sandbox
              e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80";
            }}
          />
        </div>

        {/* Name and Title */}
        <div className="flex flex-col items-center w-full mb-6">
          <h1 className="text-[21px] sm:text-[22px] font-semibold tracking-tight text-white leading-snug">
            Muhammad Shahmeer Talib
          </h1>
          <div className="mt-3 inline-block px-3.5 py-1.5 bg-[#2b2b2c] text-[#ffdb6e] text-[11px] font-normal rounded-lg tracking-wide shadow-sm">
            Product Engineer &amp; AI Builder
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full border-[#38383a]/30 mb-6" />

        {/* Contact Information Info Cards */}
        <div className="w-full space-y-3.5 text-left mb-6.5">
          
          {/* Email Card (py-2.5 px-3.5 for a lighter, less bulky feel) */}
          <a 
            href="mailto:shahmeertalib5960@gmail.com"
            className="w-full py-2.5 px-3.5 bg-[#212123]/20 border border-[#38383a]/20 rounded-xl flex items-center gap-3.5 hover:border-[#ffdb6e]/20 transition-all duration-300 group shadow-sm cursor-pointer"
          >
            <div className="w-9 h-9 shrink-0 rounded-lg bg-[#212123] border border-[#38383a]/30 flex items-center justify-center text-[#ffdb6e] group-hover:bg-[#ffdb6e] group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
              <Mail size={14} className="stroke-[1.5]" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">Email</p>
              <span 
                className="text-[13px] text-white group-hover:text-[#ffdb6e] transition-colors font-normal truncate block mt-0.5" 
                title="Shahmeertalib5960@gmail.com"
              >
                Shahmeertalib5960@gmail.com
              </span>
            </div>
          </a>

          {/* Location Card (py-2.5 px-3.5 for a lighter, less bulky feel) */}
          <div className="w-full py-2.5 px-3.5 bg-[#212123]/20 border border-[#38383a]/20 rounded-xl flex items-center gap-3.5 hover:border-[#ffdb6e]/20 transition-all duration-300 group shadow-sm">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-[#212123] border border-[#38383a]/30 flex items-center justify-center text-[#ffdb6e] group-hover:bg-[#ffdb6e] group-hover:text-zinc-950 transition-all duration-300 shadow-inner">
              <MapPin size={14} className="stroke-[1.5]" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">Location</p>
              <p className="text-[13px] text-white font-normal truncate mt-0.5" title="Lahore, Pakistan">
                Lahore, Pakistan
              </p>
            </div>
          </div>

        </div>

        {/* Social Links (Positioned beautifully right under the contact info with refined size) */}
        <div className="flex items-center justify-center gap-3.5 w-full mt-1.5">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-[#212123]/40 border border-[#38383a]/30 text-zinc-400 hover:text-[#ffdb6e] hover:bg-[#2b2b2c] hover:border-[#ffdb6e]/25 flex items-center justify-center transition-all duration-300"
              title={social.label}
            >
              <social.icon size={15} className="stroke-[1.5]" />
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}
