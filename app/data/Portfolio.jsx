import { useState, useEffect } from "react";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  body {
    background: #060c1a;
    color: #e2e8f0;
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
  }

  :root {
    --cyan: #00d4ff;
    --orange: #e8711a;
    --glass-bg: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.08);
    --text-primary: #f0f4ff;
    --text-secondary: #8892b0;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

  .glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 16px;
    transition: border-color 0.3s ease;
  }
  .glass:hover { border-color: rgba(0,212,255,0.18); }

  .gradient-text {
    background: linear-gradient(135deg, var(--cyan) 0%, var(--orange) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .fade-in {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  @keyframes float-a { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
  @keyframes float-b { 0%,100%{transform:translateY(-6px)} 50%{transform:translateY(8px)} }
  @keyframes float-c { 0%,100%{transform:translateY(4px)} 50%{transform:translateY(-10px)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes role-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
    text-transform: lowercase;
  }
  .nav-link:hover, .nav-link.active {
    color: var(--cyan);
    background: rgba(0,212,255,0.06);
  }

  .skill-pill {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    background: rgba(0,212,255,0.05);
    border: 1px solid rgba(0,212,255,0.14);
    border-radius: 100px;
    font-size: 12px;
    color: var(--text-primary);
    font-family: 'JetBrains Mono', monospace;
    cursor: default;
    transition: all 0.2s;
  }
  .skill-pill:hover {
    background: rgba(0,212,255,0.12);
    border-color: rgba(0,212,255,0.38);
    transform: translateY(-2px);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: linear-gradient(135deg, var(--cyan), #0099cc);
    color: #060c1a;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 15px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: transform 0.25s, box-shadow 0.25s;
    text-decoration: none;
  }
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 32px rgba(0,212,255,0.35);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: transparent;
    color: var(--cyan);
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 15px;
    border: 1px solid rgba(0,212,255,0.38);
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.25s;
    text-decoration: none;
  }
  .btn-outline:hover {
    background: rgba(0,212,255,0.07);
    transform: translateY(-3px);
  }

  .project-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .project-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--cyan), var(--orange));
    opacity: 0;
    transition: opacity 0.3s;
  }
  .project-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
  .project-card:hover::after { opacity: 1; }

  .form-input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: var(--text-primary);
    font-family: 'Outfit', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: rgba(0,212,255,0.42); }
  .form-input::placeholder { color: var(--text-secondary); }

  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--cyan);
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .section-label::before, .section-label::after {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--cyan);
    opacity: 0.45;
  }

  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    z-index: 0;
    will-change: transform;
  }

  .social-pill {
    padding: 8px 22px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 100px;
    color: var(--text-secondary);
    font-size: 13px;
    text-decoration: none;
    font-family: 'JetBrains Mono', monospace;
    transition: all 0.2s;
  }
  .social-pill:hover {
    border-color: rgba(0,212,255,0.32);
    color: var(--cyan);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    .two-col { grid-template-columns: 1fr !important; }
    .timeline-grid { grid-template-columns: 28px 1fr !important; }
    .hero-title { font-size: 56px !important; }
  }
`;

/* ── DATA ──────────────────────────────────────────────── */
const SKILLS = {
  Frontend:  ["React 19", "Vite", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "React Router v7"],
  Backend:   ["Django", "DRF", "Python", "PostgreSQL", "REST APIs", "JWT Auth"],
  DevOps:    ["Railway", "Vercel", "Docker", "GitHub Actions", "Git"],
  Tools:     ["Cursor IDE", "Figma", "Postman", "VS Code"],
};

const PROJECTS = [
  {
    title: "Bihar Skill Hub",
    desc: "Full-stack skill & course platform for Bihar. Admin dashboard, JWT auth, transactional emails via Brevo API, OTP-based certificate delivery.",
    tech: ["React 19", "Django", "PostgreSQL", "Railway"],
    link: "https://biharskillhub.co.in",
    accent: "#e8711a",
    year: "2025",
    status: "Live",
  },
  {
    title: "RLHF Eval Pipeline",
    desc: "AI evaluation pipeline for LLM benchmarking. FastAPI + React with HuggingFace DPO export and Commit0/DIU-Kaiju benchmark ecosystem integration.",
    tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
    link: "#",
    accent: "#00d4ff",
    year: "2025",
    status: "In Progress",
  },
  {
    title: "AI Meeting Extractor",
    desc: "Claude-powered system for extracting structured action items from meeting transcripts. Configurable prompt pipeline with JSON output.",
    tech: ["Python", "Claude API", "FastAPI"],
    link: "#",
    accent: "#a78bfa",
    year: "2024",
    status: "Shipped",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Self-employed",
    period: "2024 – Present",
    color: "#00d4ff",
    points: [
      "Built Bihar Skill Hub from scratch — React + Django + PostgreSQL",
      "Implemented RLHF eval pipelines for AI benchmark datasets",
      "Delivered 5+ client projects across web & automation",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "Tech Startup, NCR",
    period: "2023 – 2024",
    color: "#e8711a",
    points: [
      "Built REST APIs with Django DRF for 3 production apps",
      "Reduced API response time 40% via query optimization",
      "Set up CI/CD pipelines on Railway & Vercel",
    ],
  },
];

const BLOGS = [
  { title: "Building a Glassmorphism UI in React", tag: "Frontend", date: "Apr 2025", read: "5 min" },
  { title: "Transactional Emails in Django with Brevo API", tag: "Backend", date: "Mar 2025", read: "8 min" },
  { title: "RLHF Dataset Evaluation: A Practical Guide", tag: "AI / ML", date: "Feb 2025", read: "12 min" },
];

const ROLES = ["Full Stack Developer", "React Engineer", "Django Developer", "AI Enthusiast"];
const NAV = ["hero", "about", "skills", "projects", "experience", "blog", "contact"];

/* ── COMPONENT ─────────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Inject global styles once
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = globalStyles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  // Role typewriter rotate
  useEffect(() => {
    const cycle = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setRoleVisible(true);
      }, 300);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  // Active section tracker
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    NAV.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // Fade-in on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const H = ({ children, style }) => (
    <h2 style={{
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSize: "clamp(30px, 5vw, 50px)",
      color: "#f0f4ff",
      lineHeight: 1.15,
      marginBottom: 48,
      ...style,
    }}>{children}</h2>
  );

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#060c1a" }}>
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 560, height: 560, background: "rgba(0,212,255,0.055)", top: "0%", left: "-12%" }} />
      <div className="orb" style={{ width: 480, height: 480, background: "rgba(232,113,26,0.055)", top: "45%", right: "-10%" }} />
      <div className="orb" style={{ width: 360, height: 360, background: "rgba(167,139,250,0.04)", bottom: "8%", left: "25%" }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
        zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 8,
        padding: "10px 18px",
        background: "rgba(6,12,26,0.82)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderRadius: 100,
        width: "calc(100% - 40px)",
        maxWidth: 840,
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#f0f4ff", flexShrink: 0 }}>
          S<span style={{ color: "#e8711a" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          {NAV.map(s => (
            <a key={s} href={`#${s}`} className={`nav-link${active === s ? " active" : ""}`}>
              {s === "hero" ? "home" : s}
            </a>
          ))}
        </div>
        <a href="#contact" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13, flexShrink: 0 }}>
          Hire me
        </a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "130px 24px 80px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: 860, width: "100%", textAlign: "center" }}>
          {/* Status badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
            padding: "6px 16px", borderRadius: 100,
            background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#22c55e",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e",
              boxShadow: "0 0 8px #22c55e", display: "inline-block" }} />
            Available for new projects
          </div>

          {/* Name */}
          <h1 className="hero-title" style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(58px, 10vw, 108px)",
            lineHeight: 1.0,
            letterSpacing: -3,
            color: "#f0f4ff",
            marginBottom: 16,
          }}>
            Shubham<br />
            <span className="gradient-text">Kumar</span>
          </h1>

          {/* Animated role */}
          <div style={{ height: 44, marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 17,
              color: "#8892b0",
              opacity: roleVisible ? 1 : 0,
              transform: roleVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              <span style={{ color: "#00d4ff" }}>{">"} </span>
              {ROLES[roleIdx]}
              <span style={{ animation: "blink 1.1s step-start infinite" }}>_</span>
            </p>
          </div>

          {/* Tagline */}
          <p style={{ fontSize: 17, color: "#8892b0", maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.8 }}>
            Building performant web apps from Bihar to the world. I craft pixel-perfect frontends and scalable backends that actually ship.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 72 }}>
            <a href="#projects" className="btn-primary">View my work ↓</a>
            <a href="#contact" className="btn-outline">Let's talk</a>
          </div>

          {/* Floating stat cards */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Projects Shipped", value: "10+", anim: "float-a 4.5s ease-in-out infinite" },
              { label: "Years Experience", value: "2+",  anim: "float-b 5s ease-in-out 0.4s infinite" },
              { label: "Technologies",     value: "15+", anim: "float-c 4s ease-in-out 0.8s infinite" },
            ].map(stat => (
              <div key={stat.label} className="glass" style={{ padding: "22px 36px", animation: stat.anim, textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: "#f0f4ff" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: "#8892b0", fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="fade-in">
          <div className="section-label">About me</div>
          <H>Code by day,<br /><span className="gradient-text">builder by nature</span></H>
        </div>

        <div className="two-col fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <p style={{ color: "#8892b0", fontSize: 16, lineHeight: 1.85 }}>
              Hey! I'm Shubham, a full stack developer from Bihar, India. I build web apps that solve real problems — from{" "}
              <span style={{ color: "#f0f4ff" }}>online skill platforms</span> serving students across Bihar to{" "}
              <span style={{ color: "#f0f4ff" }}>AI evaluation pipelines</span> used in LLM benchmarking.
            </p>
            <p style={{ color: "#8892b0", fontSize: 16, lineHeight: 1.85 }}>
              My stack is <span style={{ color: "#00d4ff" }}>React + Vite</span> on the frontend,{" "}
              <span style={{ color: "#e8711a" }}>Django + DRF</span> on the backend,
              PostgreSQL for data, and Railway / Vercel for deployment. I'm obsessed with shipping things that work — cleanly, fast, and at scale.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6 }}>
              {["📍 Gurugram, India", "🎓 CS Graduate", "☕ Coffee-driven", "🚀 Open to remote"].map(tag => (
                <span key={tag} style={{
                  padding: "5px 14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#8892b0",
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="glass" style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg, #00d4ff, #e8711a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#fff",
                flexShrink: 0,
              }}>SK</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#f0f4ff" }}>
                  Shubham Kumar
                </div>
                <div style={{ color: "#00d4ff", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", marginTop: 3 }}>
                  @bihari-bhau
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 13 }}>
              {[
                { icon: "🌐", text: "biharskillhub.co.in" },
                { icon: "💻", text: "github.com/bihari-bhau" },
                { icon: "📧", text: "hello@shubhamkumar.dev" },
                { icon: "📍", text: "Gurugram, Haryana" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#8892b0" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              <a href="#" className="btn-primary" style={{ fontSize: 13, padding: "9px 20px" }}>
                Download CV ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="fade-in">
          <div className="section-label">What I work with</div>
          <H>My <span className="gradient-text">Tech Stack</span></H>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {Object.entries(SKILLS).map(([cat, skills], i) => (
            <div key={cat} className="glass fade-in" style={{ padding: "24px 28px", transitionDelay: `${i * 80}ms` }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: "#e8711a",
                letterSpacing: 2.5, textTransform: "uppercase",
                marginBottom: 14,
              }}>{cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {skills.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="fade-in">
          <div className="section-label">Things I've built</div>
          <H>Featured <span className="gradient-text">Projects</span></H>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="glass project-card fade-in" style={{ padding: 28, transitionDelay: `${i * 120}ms` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#8892b0" }}>{p.year}</span>
                <span style={{
                  padding: "3px 10px",
                  background: p.status === "Live" ? "rgba(34,197,94,0.1)" : "rgba(0,212,255,0.1)",
                  color: p.status === "Live" ? "#22c55e" : "#00d4ff",
                  borderRadius: 100, fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  border: `1px solid ${p.status === "Live" ? "rgba(34,197,94,0.22)" : "rgba(0,212,255,0.22)"}`,
                }}>{p.status}</span>
              </div>

              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22,
                color: "#f0f4ff", marginBottom: 10,
              }}>{p.title}</h3>
              <p style={{ color: "#8892b0", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    padding: "3px 10px",
                    background: `${p.accent}12`,
                    border: `1px solid ${p.accent}28`,
                    borderRadius: 6,
                    fontSize: 11, color: p.accent,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{t}</span>
                ))}
              </div>

              {p.link !== "#" && (
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#00d4ff", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", textDecoration: "none" }}>
                  View live project →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="fade-in">
          <div className="section-label">Where I've been</div>
          <H>Work <span className="gradient-text">Experience</span></H>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.company} className="fade-in" style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr",
              gap: "0 24px",
              transitionDelay: `${i * 150}ms`,
            }}>
              {/* Timeline column */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: exp.color,
                  boxShadow: `0 0 18px ${exp.color}60`,
                  border: "2px solid rgba(255,255,255,0.18)",
                  flexShrink: 0, marginTop: 18,
                }} />
                {i < EXPERIENCE.length - 1 && (
                  <div style={{
                    flex: 1, width: 1, marginTop: 8,
                    background: `linear-gradient(to bottom, ${exp.color}60, transparent)`,
                    minHeight: 48,
                  }} />
                )}
              </div>

              {/* Content */}
              <div className="glass" style={{ padding: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#f0f4ff" }}>
                      {exp.role}
                    </div>
                    <div style={{ color: exp.color, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", marginTop: 3 }}>
                      {exp.company}
                    </div>
                  </div>
                  <span style={{
                    padding: "4px 12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 100,
                    fontSize: 12, color: "#8892b0",
                    fontFamily: "'JetBrains Mono', monospace",
                    flexShrink: 0,
                  }}>{exp.period}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  {exp.points.map(pt => (
                    <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#8892b0", fontSize: 14, lineHeight: 1.6 }}>
                      <span style={{ color: "#00d4ff", flexShrink: 0, marginTop: 2 }}>▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="fade-in">
          <div className="section-label">Thoughts & writings</div>
          <H>Latest <span className="gradient-text">Articles</span></H>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 22 }}>
          {BLOGS.map((b, i) => (
            <div key={b.title} className="glass project-card fade-in" style={{ padding: 28, cursor: "pointer", transitionDelay: `${i * 100}ms` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{
                  padding: "3px 10px",
                  background: "rgba(0,212,255,0.07)",
                  border: "1px solid rgba(0,212,255,0.18)",
                  borderRadius: 6,
                  fontSize: 11, color: "#00d4ff",
                  fontFamily: "'JetBrains Mono', monospace",
                }}>{b.tag}</span>
                <span style={{ fontSize: 12, color: "#8892b0", fontFamily: "'JetBrains Mono', monospace" }}>
                  {b.read} read
                </span>
              </div>

              <h3 style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18,
                color: "#f0f4ff", lineHeight: 1.45, marginBottom: 20,
              }}>{b.title}</h3>

              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                paddingTop: 14,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 12, color: "#8892b0", fontFamily: "'JetBrains Mono', monospace" }}>{b.date}</span>
                <span style={{ fontSize: 13, color: "#00d4ff" }}>Read →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "100px 24px 140px", maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="fade-in" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Get in touch</div>
          <H style={{ textAlign: "center", marginBottom: 16 }}>
            Let's build something <span className="gradient-text">together</span>
          </H>
          <p style={{ color: "#8892b0", fontSize: 16, marginBottom: 48, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 48px" }}>
            Have a project in mind? Whether it's a web app, REST API, or AI integration — I'm open to new opportunities.
          </p>
        </div>

        <div className="glass fade-in" style={{ padding: "36px 36px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#8892b0", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: 0.5 }}>
                  Name
                </label>
                <input className="form-input" placeholder="Your name"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#8892b0", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: 0.5 }}>
                  Email
                </label>
                <input className="form-input" type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, color: "#8892b0", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: 0.5 }}>
                Message
              </label>
              <textarea className="form-input" rows={5} placeholder="Tell me about your project..."
                style={{ resize: "vertical" }}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <button className="btn-primary" onClick={() => alert("Form submission — wire up your backend or EmailJS here!")}>
                Send message ✉️
              </button>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 40, flexWrap: "wrap" }}>
          {["GitHub", "LinkedIn", "Twitter", "Email"].map(l => (
            <a key={l} href="#" className="social-pill">{l}</a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign: "center", padding: "24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative", zIndex: 1,
      }}>
        <p style={{ color: "#8892b0", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
          Built with React + Vite by{" "}
          <span style={{ color: "#00d4ff" }}>Shubham Kumar</span>
          {" · "}
          <span style={{ color: "#e8711a" }}>@bihari-bhau</span>
        </p>
      </footer>
    </div>
  );
}
