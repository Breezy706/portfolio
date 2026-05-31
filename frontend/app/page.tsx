"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, Sparkles, Brain, Database,
  LineChart, Bot, GraduationCap, Award, Cpu, Send, ChevronRight,
} from "lucide-react";
import NeuralBackground from "@/components/NeuralBackground";
import Navbar from "@/components/Navbar";
import { TextScramble } from "@/components/TextScramble";
const yahayaImg = "/yahaya.jpeg";

const ROTATING = ["Deep Learning", "Machine Learning", "NLP", "RAG Chatbot", "Time Series", "Databases"];

const SKILLS: { name: string; level: number; group: string }[] = [
  { name: "Python", level: 95, group: "Languages" },
  { name: "SQL", level: 90, group: "Languages" },
  { name: "R", level: 75, group: "Languages" },
  { name: "Pandas / NumPy", level: 92, group: "Data" },
  { name: "Scikit-Learn", level: 88, group: "ML" },
  { name: "TensorFlow", level: 82, group: "Deep Learning" },
  { name: "PyTorch", level: 80, group: "Deep Learning" },
  { name: "LangChain / RAG", level: 85, group: "GenAI" },
  { name: "Power BI", level: 93, group: "BI" },
  { name: "Tableau", level: 85, group: "BI" },
  { name: "Excel", level: 90, group: "BI" },
  { name: "PostgreSQL / MongoDB", level: 80, group: "Databases" },
  { name: "Apache Spark / Hadoop", level: 70, group: "Big Data" },
  { name: "FastAPI", level: 78, group: "Backend" },
  { name: "Docker / Git", level: 82, group: "DevOps" },
  { name: "QGIS", level: 72, group: "Geospatial" },
];

const PROJECTS = [
  { title: "Cardiovascular Disease Dashboard", tech: ["Power BI","DAX","SQL"], desc: "Interactive Power BI dashboard analyzing cardiovascular risk factors with drill-down KPIs." },
  { title: "Customer Churn Analysis", tech: ["Power BI","Python"], desc: "Cohort retention, segment scoring and visual storytelling for retention strategy." },
  { title: "Computer Price Prediction", tech: ["Sklearn","XGBoost"], desc: "Regression model predicting laptop prices from hardware specs with SHAP explainability." },
  { title: "Loan Approval Prediction", tech: ["Sklearn","Pandas"], desc: "Classification pipeline — preprocessing, class balancing, ROC-AUC tuned to 0.91." },
  { title: "Food Price Forecasting", tech: ["ARIMA","Prophet"], desc: "Time-series forecasting of regional food prices for market planning." },
  { title: "House Price Regression", tech: ["Linear/Ridge","Sklearn"], desc: "Multi-feature regression with cross-validated regularization." },
  { title: "Breast Cancer Classification", tech: ["Sklearn","LR","RF"], desc: "Binary classification on WBCD with precision-recall optimization." },
  { title: "Weather Image Classification", tech: ["TensorFlow","CNN"], desc: "Convolutional model classifying weather conditions from photos." },
  { title: "X-Ray Disease Detection", tech: ["PyTorch","CNN","TL"], desc: "Transfer-learning CNN detecting pneumonia patterns in chest X-rays." },
  { title: "Guava Leaf Disease Classifier", tech: ["TensorFlow","Keras"], desc: "Deep learning model identifying guava leaf diseases." },
  { title: "Sustainability Chatbot", tech: ["NLP","Python"], desc: "Conversational assistant for sustainability with intent recognition." },
  { title: "AI Career Coach", tech: ["LLM","Prompts"], desc: "Generative AI coach producing tailored career roadmaps." },
  { title: "Research Assistant Chatbot (RAG)", tech: ["LangChain","Vector DB","OpenAI"], desc: "RAG grounding answers in research papers with citation surfacing." },
  { title: "Automated Insurance Claims", tech: ["GenAI","OCR"], desc: "Document understanding pipeline extracting and validating claim fields." },
  { title: "Movie Website", tech: ["HTML","CSS","JS"], desc: "Responsive movie discovery site with dynamic content." },
];

const TIMELINE = [
  { year: "2024", title: "Started Bachelor of Data Science", body: "Joined EASTC — Eastern Africa Statistical Training Centre." },
  { year: "2024 – 2025", title: "Data Science & AI Training", body: "Zep Analytics — Python, SQL, Power BI, Tableau." },
  { year: "2025", title: "Data Safari + EMAI Conference", body: "In-person training and AI conference participation. Started Data Engineering on Udemy." },
  { year: "2026", title: "Graduation (Expected)", body: "B.Sc. in Data Science — EASTC." },
];

const CERTS = [
  { issuer: "Zep Analytics", name: "Data Science & Artificial Intelligence" },
  { issuer: "Zep Analytics", name: "Power BI for Data Analytics" },
  { issuer: "Zep Analytics", name: "Tableau for Data Visualization & BI" },
  { issuer: "Udemy", name: "Microsoft Excel for Data Analysis" },
  { issuer: "Udemy", name: "Data Engineering (in progress)" },
];

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient" style={{ fontFamily: "Space Grotesk" }}>{n}+</div>
      <div className="mt-2 text-xs uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-28 px-5">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs uppercase tracking-[0.2em]" style={{ color: "#93C5FD" }}>
            <Sparkles size={12} /> {eyebrow}
          </div>
          {title && <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gradient" style={{ fontFamily: "Space Grotesk" }}>{title}</h2>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Page() {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRot(r => (r + 1) % ROTATING.length), 2200);
    return () => clearInterval(id);
  }, []);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"sending"|"sent">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 700));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      <NeuralBackground />
      <main className="relative" style={{ zIndex: 1 }}>
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-5 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong text-xs uppercase tracking-[0.25em]" style={{ color: "#93C5FD" }}>
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" /> Available for opportunities
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-gradient" style={{ fontFamily: "Space Grotesk" }}>
            YAHAYA RAMADHANI<br />NASORO
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-white/70" style={{ fontFamily: "JetBrains Mono" }}>
            Data Scientist <span style={{ color: "#3B82F6" }}>•</span> AI Engineer <span style={{ color: "#3B82F6" }}>•</span> Data Analyst
          </motion.p>
          <div className="mt-6 h-8 flex items-center justify-center text-2xl md:text-3xl">
            <span className="text-white/50 mr-3">building</span>
            <motion.span key={rot}
              initial={{ y: 14, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.45 }}
              className="text-gradient font-bold" style={{ fontFamily: "Space Grotesk" }}>
              {ROTATING[rot]}
            </motion.span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#projects" className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-white shadow-neon hover:shadow-neon transition-all"
              style={{ background: "linear-gradient(to right, #2563EB, #60A5FA)" }}>
              Explore Projects <ChevronRight size={16} className="ml-1 inline" />
            </a>
            <a href="#contact" className="px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-white glass-strong hover:shadow-neon transition-all">
              Contact Me
            </a>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Space Grotesk" }}>
              <TextScramble text="Turning data into intelligent decisions." />
            </h3>
            <p className="text-white/75 leading-relaxed text-lg">
              <TextScramble text="Yahaya is a Data Science and Analytics enthusiast at EASTC, skilled in Python, SQL, and R for data analysis, statistical modeling, and machine learning." duration={1.5} />
            </p>
            <p className="text-white/65 leading-relaxed mt-5">
              He builds predictive models, NLP systems, and RAG-based chatbots, and uses Power BI, Tableau, Excel and QGIS to deliver clear, data-driven insights — passionate about solving real-world problems with data, AI, and BI.
            </p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <Counter to={15} label="Projects" />
              <Counter to={8} label="AI Systems" />
              <Counter to={22} label="Technologies" />
              <Counter to={6} label="Research Areas" />
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2rem] blur-2xl animate-pulse-glow"
              style={{ background: "linear-gradient(to bottom right, rgba(59,130,246,0.4), rgba(34,211,238,0.2))" }} />
            <div className="relative glass-strong rounded-[2rem] p-3 shadow-neon">
              <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden">
                <img src={yahayaImg} alt="Yahaya Ramadhani Nasoro" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(3,6,13,0.7), transparent, transparent)" }} />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 glass-strong rounded-full text-xs" style={{ fontFamily: "JetBrains Mono" }}>
                <span className="text-emerald-400">●</span> ONLINE — Dar es Salaam, TZ
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Skills" title="Data Science & AI Toolkit">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-5">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cpu size={14} style={{ color: "#93C5FD" }} />
                  <span className="text-sm font-medium text-white/90" style={{ fontFamily: "Space Grotesk" }}>
                    {s.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/40" style={{ fontFamily: "JetBrains Mono" }}>
                    {s.group}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gradient" style={{ fontFamily: "JetBrains Mono" }}>
                  {s.level}%
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden bg-white/5 border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.04, ease: "easeOut" }}
                  className="h-full rounded-full shadow-neon"
                  style={{ background: "linear-gradient(to right, #2563EB, #60A5FA, #22D3EE)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>


      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="Journey" title="Experience & Milestones">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #3B82F6, transparent)" }} />
          {TIMELINE.map((t, i) => (
            <motion.div key={t.year}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-10`}>
              <div className="absolute left-2.5 md:left-1/2 -translate-x-1/2 top-3 size-3 rounded-full shadow-neon" style={{ background: "#3B82F6" }} />
              <div className={`glass-strong rounded-2xl p-6 hover:shadow-neon transition-shadow ${i % 2 ? "md:col-start-2 md:text-left" : "md:text-right"}`}>
                <div className="text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono", color: "#93C5FD" }}>{t.year}</div>
                <div className="mt-1 text-xl font-semibold" style={{ fontFamily: "Space Grotesk" }}>{t.title}</div>
                <div className="mt-2 text-white/65 text-sm">{t.body}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Work" title="Featured Projects">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.article key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group relative glass rounded-2xl overflow-hidden hover:shadow-neon transition-all">
              <div className="relative h-36 overflow-hidden">
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom right, rgba(37,99,235,0.4), rgba(34,211,238,0.2), transparent)" }} />
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 grid place-items-center">
                  {i % 3 === 0 ? <Brain size={42} style={{ color: "#93C5FD", filter: "drop-shadow(0 0 18px rgba(96,165,250,0.7))" }} /> :
                   i % 3 === 1 ? <LineChart size={42} style={{ color: "#93C5FD", filter: "drop-shadow(0 0 18px rgba(96,165,250,0.7))" }} /> :
                                 <Bot size={42} style={{ color: "#93C5FD", filter: "drop-shadow(0 0 18px rgba(96,165,250,0.7))" }} />}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg group-hover:text-white transition-colors" style={{ fontFamily: "Space Grotesk" }}>{p.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-full border" style={{ fontFamily: "JetBrains Mono", background: "rgba(59,130,246,0.10)", borderColor: "rgba(59,130,246,0.30)", color: "#93C5FD" }}>{t}</span>
                  ))}
                </div>
                <a href="https://github.com/Breezy706" target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition">
                  <Github size={14} /> View on GitHub <ChevronRight size={12} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* QUALIFICATIONS */}
      <Section id="qualifications" eyebrow="Credentials" title="Qualifications & Research">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4"><GraduationCap style={{ color: "#93C5FD" }} /> <h3 className="text-xl font-semibold" style={{ fontFamily: "Space Grotesk" }}>Education</h3></div>
            <div className="text-white/85 font-medium">Bachelor of Data Science</div>
            <div className="text-white/60 text-sm">Eastern Africa Statistical Training Centre (EASTC) · 2024 – 2026</div>
            <p className="mt-3 text-sm text-white/65 leading-relaxed">
              Specializing in Machine Learning, AI, Statistical Analysis, Data Visualization and Predictive Analytics.
            </p>
          </div>
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4"><Award style={{ color: "#93C5FD" }} /> <h3 className="text-xl font-semibold" style={{ fontFamily: "Space Grotesk" }}>Certifications</h3></div>
            <ul className="space-y-2.5">
              {CERTS.map(c => (
                <li key={c.name} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 size-1.5 rounded-full shrink-0" style={{ background: "#3B82F6" }} />
                  <div><div className="text-white/85">{c.name}</div><div className="text-xs text-white/50">{c.issuer}</div></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-strong rounded-2xl p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4"><Brain style={{ color: "#93C5FD" }} /> <h3 className="text-xl font-semibold" style={{ fontFamily: "Space Grotesk" }}>Research Focus</h3></div>
            <p className="text-white/70 leading-relaxed">
              Leveraging Data Science and AI to solve real-world challenges through predictive modeling, machine learning,
              NLP, time-series forecasting, and data-driven decision-making — with focus on AI applications, RAG systems, data engineering, and BI.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Data Science Training — Data Safari, Morogoro (in-person)",
                "EMAI Conference — AI & Emerging Technologies",
                "Build Up with AI (online program)",
                "Data for Future (online training)",
              ].map(t => (
                <div key={t} className="flex items-start gap-2 glass rounded-lg p-3"><Database size={14} className="mt-0.5 shrink-0" style={{ color: "#93C5FD" }} /><span className="text-white/75">{t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let's build something intelligent.">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
          <div className="space-y-4">
            {[
              { Icon: Mail, label: "Email", value: "ramadhanyahya16@gmail.com", href: "mailto:ramadhanyahya16@gmail.com" },
              { Icon: Phone, label: "Phone", value: "+255 655 127 870", href: "tel:+255655127870" },
              { Icon: Linkedin, label: "LinkedIn", value: "yahaya-nasoro", href: "https://www.linkedin.com/in/yahaya-nasoro-039bb231a" },
              { Icon: Github, label: "GitHub", value: "Breezy706", href: "https://github.com/Breezy706" },
              { Icon: MapPin, label: "Location", value: "Tanzania", href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:shadow-neon transition-all group">
                <div className="size-11 rounded-lg grid place-items-center border" style={{ background: "rgba(59,130,246,0.10)", borderColor: "rgba(59,130,246,0.30)" }}>
                  <Icon size={18} style={{ color: "#93C5FD" }} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
                  <div className="text-sm text-white/90" style={{ fontFamily: "JetBrains Mono" }}>{value}</div>
                </div>
              </a>
            ))}
          </div>
          <form onSubmit={submit} className="glass-strong rounded-2xl p-6 space-y-4">
            <input required type="text" value={form.name} onChange={(e) => setForm(s => ({ ...s, name: e.target.value }))}
              placeholder="Your name"
              className="w-full bg-transparent border border-white/15 focus:border-blue-400 outline-none rounded-xl px-4 py-3 text-sm placeholder:text-white/30 transition-all" />
            <input required type="email" value={form.email} onChange={(e) => setForm(s => ({ ...s, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full bg-transparent border border-white/15 focus:border-blue-400 outline-none rounded-xl px-4 py-3 text-sm placeholder:text-white/30 transition-all" />
            <textarea required rows={5} value={form.message} onChange={(e) => setForm(s => ({ ...s, message: e.target.value }))}
              placeholder="Tell me about your project or opportunity…"
              className="w-full bg-transparent border border-white/15 focus:border-blue-400 outline-none rounded-xl px-4 py-3 text-sm placeholder:text-white/30 transition-all resize-none" />
            <button type="submit" disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-medium shadow-neon transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(to right, #2563EB, #60A5FA)" }}>
              {status === "sending" ? "Transmitting…" : status === "sent" ? "Message sent ✓" : (<>Send message <Send size={16} /></>)}
            </button>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative mt-10 py-12 px-5 border-t border-white/10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/60" style={{ fontFamily: "JetBrains Mono" }}>© 2026 Yahaya. All Rights Reserved.</div>
          <div className="text-xs text-white/50">Data Science · Machine Learning · AI Engineer · Data Analyst</div>
          <div className="flex items-center gap-3">
            {[{ I: Github, h: "https://github.com/Breezy706" }, { I: Linkedin, h: "https://www.linkedin.com/in/yahaya-nasoro-039bb231a" }, { I: Mail, h: "mailto:ramadhanyahya16@gmail.com" }].map(({ I, h }, i) => (
              <a key={i} href={h} target="_blank" rel="noreferrer" className="size-9 grid place-items-center rounded-full glass hover:shadow-neon transition-all">
                <I size={15} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-white/40 italic">Built with passion for turning data into meaningful insights.</div>
      </footer>
      </main>
    </>
  );
}

export default Page;
