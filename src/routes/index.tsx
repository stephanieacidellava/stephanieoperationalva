import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import caseAutomation from "@/assets/case-automation.jpg";
import caseTracker from "@/assets/case-tracker.jpg";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "light" | "dark" | null);
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function addRipple(e: React.MouseEvent<HTMLElement>) {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const dot = document.createElement("span");
  dot.className = "ripple-dot";
  dot.style.width = dot.style.height = `${size}px`;
  dot.style.left = `${e.clientX - rect.left - size / 2}px`;
  dot.style.top = `${e.clientY - rect.top - size / 2}px`;
  target.appendChild(dot);
  setTimeout(() => dot.remove(), 650);
}


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stephanie Acidella — Operations & Workflow Support VA" },
      {
        name: "description",
        content:
          "Operations & Workflow Support VA specializing in Zapier automation, GoHighLevel CRM, spreadsheet validation, and reporting systems for high-volume teams.",
      },
      { property: "og:title", content: "Stephanie Acidella — Operations & Workflow Support VA" },
      {
        property: "og:description",
        content:
          "Workflow automation, CRM management, and reporting systems that reduce manual work and improve operational accuracy.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { theme, toggle } = useTheme();
  useReveal();
  return (
    <div className="bg-brand-bg text-brand-primary font-sans antialiased min-h-screen">
      <nav className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-primary/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <a href="#top" className="font-mono font-bold tracking-tighter text-base sm:text-xl">
            STEPHANIE CABILAO ACIDELLA
          </a>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase">
              <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
              <a href="#experience" className="hover:text-brand-accent transition-colors">Experience</a>
              <a href="#work" className="hover:text-brand-accent transition-colors">Work</a>
              <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
            </div>
            <button
              type="button"
              onClick={(e) => { addRipple(e); toggle(); }}
              aria-label="Toggle theme"
              className="ripple size-10 rounded-full border border-brand-primary/10 bg-brand-surface flex items-center justify-center text-base hover:border-brand-accent transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>


      <header id="top" className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono font-bold rounded-full mb-6 italic">
            // OPERATIONS &amp; WORKFLOW SUPPORT VA
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Optimizing workflows through{" "}
            <span className="text-brand-accent">automation</span> and precision data.
          </h1>
          <p className="text-lg text-brand-muted leading-relaxed mb-10 max-w-2xl">
            I build structured validation trackers and automated monitoring systems that reduce
            manual work and increase visibility across high-volume operational environments.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              onClick={addRipple} className="ripple bg-brand-primary text-brand-bg px-8 py-4 rounded-full font-bold hover:bg-brand-accent hover:scale-105 active:scale-95 transition-all"
            >
              Get in Touch
            </a>
            <div className="flex items-center gap-2 px-6 py-4 border border-brand-primary/10 rounded-full font-mono text-sm">
              <span className="size-2 bg-green-500 rounded-full animate-pulse" />
              Available for US/UK/AU shifts
            </div>
          </div>
        </div>
      </header>

      <section id="services" className="reveal py-24 bg-brand-surface border-y border-brand-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-brand-muted mb-12">
            Capabilities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-brand-bg p-8 border border-brand-primary/5 rounded-2xl shadow-sm"
              >
                <div className="size-12 bg-brand-accent/5 rounded-xl flex items-center justify-center mb-6">
                  <span className="font-mono font-bold text-brand-accent text-sm">{s.tag}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-brand-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="reveal py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-brand-muted mb-4">
              Experience
            </h2>
            <p className="text-2xl font-bold">A track record of operational excellence.</p>
          </div>
          <div className="md:col-span-8 space-y-12">
            {EXPERIENCE.map((e, i) => (
              <div key={e.title} className="relative pl-8 border-l-2 border-brand-primary/5">
                <div
                  className={`absolute -left-[9px] top-0 size-4 rounded-full ring-4 ring-brand-bg ${
                    i === 0 ? "bg-brand-accent" : "bg-brand-primary/20"
                  }`}
                />
                <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                  <h4 className="text-xl font-bold">{e.title}</h4>
                  <span className="font-mono text-xs font-bold text-brand-muted bg-brand-surface px-2 py-1 rounded">
                    {e.period}
                  </span>
                </div>
                <p className="text-sm font-bold text-brand-accent mb-4 italic">{e.org}</p>
                <ul className="space-y-3 text-brand-muted leading-relaxed">
                  {e.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="reveal py-24 bg-brand-primary text-brand-bg">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest opacity-50 mb-12">
            Case Studies
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {CASES.map((c) => (
              <article key={c.title} className="group">
                <div className="w-full aspect-video bg-white/5 outline-1 -outline-offset-1 outline-white/10 rounded-2xl overflow-hidden mb-6">
                  <img
                    src={c.image}
                    alt={c.title}
                    width={1280}
                    height={832}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-3">{c.title}</h3>
                <p className="text-white/60 mb-6">{c.body}</p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal py-24 max-w-7xl mx-auto px-6">
        <div className="bg-brand-accent/5 p-8 sm:p-12 rounded-3xl border border-brand-accent/10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-medium italic leading-relaxed mb-8">
              “Stephanie transformed our manual data entry into a streamlined automated machine.
              Her attention to detail in Excel reporting saved our team hours every single week.”
            </p>
            <p className="font-bold">Operational Lead</p>
            <p className="text-sm text-brand-muted">Cabilao&apos;s GCash Partner Outlet</p>
          </div>
        </div>
      </section>

      <section id="contact" className="reveal py-24 border-t border-brand-primary/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8">Ready to automate your operations?</h2>
            <p className="text-brand-muted text-lg mb-12">
              I&apos;m currently taking on new workflow optimization projects. Let&apos;s discuss
              how I can help your team reclaim their time.
            </p>
            <div className="space-y-4 font-mono text-sm">
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-brand-muted">Email:</span>
                <a
                  href="mailto:stephanieacidella.va@gmail.com"
                  className="font-bold hover:text-brand-accent break-all"
                >
                  stephanieacidella.va@gmail.com
                </a>
              </p>
              <p className="flex gap-4">
                <span className="text-brand-muted">Phone:</span>
                <span className="font-bold">+63 970 397 8121</span>
              </p>
              <p className="flex gap-4">
                <span className="text-brand-muted">Location:</span>
                <span className="font-bold">Calamba, Misamis Occidental, PH</span>
              </p>
              <p className="flex flex-wrap gap-x-4 gap-y-1">
                <span className="text-brand-muted">Social:</span>
                <a
                  href="https://linkedin.com/in/stephanieacidellava"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold hover:text-brand-accent"
                >
                  linkedin.com/in/stephanieacidellava
                </a>
              </p>
            </div>
          </div>
          <div className="bg-brand-bg border border-brand-primary/10 p-8 rounded-2xl">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const fd = new FormData(form);
                const name = fd.get("name");
                const project = fd.get("project");
                const message = fd.get("message");
                const body = `Project: ${project}\n\n${message}\n\n— ${name}`;
                window.location.href = `mailto:stephanieacidella.va@gmail.com?subject=${encodeURIComponent(
                  `New inquiry from ${name}`,
                )}&body=${encodeURIComponent(body)}`;
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-brand-muted uppercase mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-primary/5 rounded-lg focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-brand-muted uppercase mb-2">
                    Project
                  </label>
                  <input
                    name="project"
                    type="text"
                    placeholder="e.g. CRM Setup"
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-primary/5 rounded-lg focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-brand-muted uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-brand-surface border border-brand-primary/5 rounded-lg focus:ring-2 focus:ring-brand-accent/20 focus:outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                onClick={addRipple} className="ripple w-full bg-brand-primary text-brand-bg py-4 rounded-lg font-bold hover:bg-brand-accent active:scale-[0.98] transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-brand-primary/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6">
          <span className="font-mono text-xs text-brand-muted italic">
            STEPHANIE CABILAO ACIDELLA © 2025
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-mono uppercase tracking-widest text-brand-muted">
            <span>Fiber Primary (100 Mbps)</span>
            <span>UPS Equipped (3hr)</span>
            <span>Calamba, Misamis Occ.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SERVICES = [
  {
    tag: "01",
    title: "Workflow Automation",
    body: "Building Zapier and n8n workflows to connect your stack, route leads, and eliminate repetitive manual tasks.",
  },
  {
    tag: "02",
    title: "CRM Management",
    body: "GoHighLevel (GHL) and CRM support for lead tracking, pipeline hygiene, and backend process coordination.",
  },
  {
    tag: "03",
    title: "Reporting & Data Validation",
    body: "Excel and Google Sheets monitoring trackers with automated formulas, validation rules, and conditional formatting.",
  },
  {
    tag: "04",
    title: "Administrative Support",
    body: "Calendar, email, and Google Workspace organization — plus WordPress and funnel maintenance.",
  },
  {
    tag: "05",
    title: "Lead Tracking Systems",
    body: "Centralized follow-up dashboards so no inquiry, pending action, or customer response slips through the cracks.",
  },
  {
    tag: "06",
    title: "AI-Assisted Operations",
    body: "ChatGPT, Gemini, and Grammarly woven into daily workflows to speed up writing, review, and triage.",
  },
];

const EXPERIENCE = [
  {
    period: "2025 – Present",
    title: "Independent Workflow Automation",
    org: "Portfolio Projects",
    bullets: [
      "Built a Zapier lead capture workflow routing submissions into Google Sheets with Gmail follow-up triggers.",
      "Developed Excel reconciliation trackers with automated formulas and validation rules.",
      "Created centralized follow-up dashboards tracking lead status, pending actions, and responses.",
    ],
  },
  {
    period: "2021 – 2024",
    title: "Treasury Assistant",
    org: "Cabilao's GCash Partner Outlet",
    bullets: [
      "Managed daily reconciliation of digital wallet transactions across high-volume payout operations.",
      "Forecasted transaction demand to maintain liquidity during peak periods.",
      "Reduced manual monitoring time by ~30% via automated Excel validation systems.",
    ],
  },
  {
    period: "2019 – 2020",
    title: "Reporting Specialist",
    org: "Zamboanga del Norte Provincial Health",
    bullets: [
      "Standardized monthly healthcare datasets, reducing reporting inconsistencies.",
      "Built Excel validation templates that improved consolidation speed for provincial reviews.",
      "Organized large-volume health records for faster access during internal reviews.",
    ],
  },
];

const CASES = [
  {
    title: "Lead Capture System",
    body: "Zapier-based automation routing service inquiries to Google Sheets with instant Gmail triggers — zero missed leads.",
    image: caseAutomation,
    tags: ["ZAPIER", "GMAIL", "SHEETS", "GHL"],
  },
  {
    title: "Liquidity Forecasting Tracker",
    body: "Automated transaction monitoring for a digital wallet outlet — 30% accuracy improvement through predictive demand patterns.",
    image: caseTracker,
    tags: ["EXCEL", "FORECASTING", "VALIDATION"],
  },
];
