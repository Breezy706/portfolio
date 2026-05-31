"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function TextScramble({ text, className = "", duration = 1.2 }: { text: string; className?: string; duration?: number; }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const reveal = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        s += i < reveal ? text[i] : (text[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0]);
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      className={className}
      style={{ textShadow: "0 0 22px rgba(59,130,246,0.35)" }}
    >
      {out || text}
    </motion.span>
  );
}
