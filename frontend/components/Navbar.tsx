"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Qualifications", "qualifications"],
  ["Contact", "contact"],
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const [, id] of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className={`mx-auto max-w-6xl px-5 ${scrolled ? "glass-strong rounded-2xl mx-3 sm:mx-auto" : ""}`}>
        <div className="flex items-center justify-between h-14">
          <a href="#home" className="font-display font-bold text-lg">
            <span className="text-gradient">YRN</span>
            <span style={{ color: "#3B82F6" }}>.</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="relative px-3 py-2 text-sm text-white/70 hover:text-white transition">
                {label}
                {active === id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full" style={{ background: "#3B82F6", boxShadow: "0 0 10px #3B82F6" }} />
                )}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-white" onClick={() => setOpen(v => !v)} aria-label="menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-3 mt-2 glass-strong rounded-2xl p-3"
          >
            {LINKS.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block px-3 py-2 text-white/80 hover:text-white">{label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
