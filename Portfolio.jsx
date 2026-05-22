import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Skills", "Projects", "Achievements", "Contact"];

const SKILLS = {
  "Languages": ["Java", "Python", "JavaScript","SQL"],
  "Frontend": ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Redux"],
  "Backend": ["Node.js", "Express.js", "REST APIs", "FastAPI"],
  "Database": ["MongoDB", "MySQL"],
  "Tools & Cloud": ["Git","Android Studio", "Postman", "Figma"],
  "AI/ML": ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "OpenCV", "HuggingFace"],
};

const PROJECTS = [
  {
    title: "Alchemist — AI Project Generation Engine",
    desc: "AI-powered Software Development Engine that ingests academic PDFs, GitHub repos, and plain-text prompts to generate structured project bundles. ",
    tags: ["React", "FastAPI", "Python", "MongoDB"],
    color: "#6EE7B7",
    icon: "⚗️",
    github: "https://github.com/justishita/Alchemist",
    live: "#",
  },
  {
    title: "HealthLens: Clinical Q&A Assistant",
    desc: "Domain-specific medical question answering assistant.",
    tags: ["Python", "QLoRA", "HuggingFace", "Streamlit", "PyTorch"],
    color: "#93C5FD",
    icon: "🩺",
    github: "https://github.com/justishita",
    live: "#",
  },
];

const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "UniSphere BMU ",
    period: "April 2023 — Present",
    desc: "Built and delivered responsive web applications",
    tags: ["React.js", "Redux", "Tailwind CSS"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em",
      padding: "3px 10px", borderRadius: "20px",
      border: `1px solid ${color}44`,
      background: `${color}18`,
      color: color,
      fontFamily: "'JetBrains Mono', monospace",
    }}>{label}</span>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "16px 24px", borderRadius: "12px",
      background: `${color}10`, border: `1px solid ${color}30`,
    }}>
      <span style={{ fontSize: "28px", fontWeight: 800, color, fontFamily: "'Sora', sans-serif" }}>{value}</span>
      <span style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px", letterSpacing: "0.05em" }}>{label}</span>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Languages");
  const [typed, setTyped] = useState("");
  const roles = ["SDE", "AI/ML Engineer", "Full Stack Developer"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = setInterval(() => {
      const word = roles[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(word.slice(0, charIdx.current));
        if (charIdx.current === word.length) { deleting.current = true; clearInterval(tick); setTimeout(() => startTyping(), 1800); }
      }
    }, 60);
    function startTyping() {
      const del = setInterval(() => {
        charIdx.current--;
        setTyped(roles[roleIdx.current].slice(0, charIdx.current));
        if (charIdx.current === 0) { deleting.current = false; roleIdx.current = (roleIdx.current + 1) % roles.length; clearInterval(del); startTyping2(); }
      }, 40);
    }
    function startTyping2() {
      const tick2 = setInterval(() => {
        const word2 = roles[roleIdx.current];
        charIdx.current++;
        setTyped(word2.slice(0, charIdx.current));
        if (charIdx.current === word2.length) { deleting.current = true; clearInterval(tick2); setTimeout(() => startTyping(), 1800); }
      }, 60);
    }
    return () => clearInterval(tick);
  }, []);

  const bg = dark ? "#0A0E1A" : "#F8FAFF";
  const surface = dark ? "#111827" : "#FFFFFF";
  const surface2 = dark ? "#1A2235" : "#F1F5F9";
  const text = dark ? "#E2E8F0" : "#1E293B";
  const muted = dark ? "#64748B" : "#94A3B8";
  const border = dark ? "#1E2D45" : "#E2E8F0";
  const accent = "#6EE7B7";
  const accent2 = "#818CF8";

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id); setMenuOpen(false);
  };

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Inter', 'Sora', sans-serif", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #6EE7B7; border-radius: 2px; }
        html { scroll-behavior: smooth; }
        .skill-btn { transition: all 0.2s; } .skill-btn:hover { transform: translateY(-1px); }
        .proj-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .proj-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .nav-link { transition: color 0.2s; cursor: pointer; } .nav-link:hover { color: #6EE7B7; }
        .cta-btn { transition: all 0.25s; cursor: pointer; } .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(110,231,183,0.3); }
        .icon-link { transition: all 0.2s; } .icon-link:hover { transform: scale(1.15); color: #6EE7B7 !important; }
        .cursor { display: inline-block; width: 2px; height: 1.1em; background: #6EE7B7; margin-left: 2px; vertical-align: text-bottom; animation: blink 1s step-end infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .grid-bg { background-image: linear-gradient(rgba(110,231,183,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,0.04) 1px, transparent 1px); background-size: 40px 40px; }
        a { text-decoration: none; color: inherit; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: dark ? "rgba(10,14,26,0.85)" : "rgba(248,250,255,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "18px", color: accent, letterSpacing: "-0.02em" }}>
            IV<span style={{ color: accent2 }}>.</span>
          </span>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }} className="desktop-nav">
            {NAV_LINKS.map(l => (
              <span key={l} className="nav-link" onClick={() => scrollTo(l)} style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em", color: activeNav === l ? accent : muted }}>
                {l}
              </span>
            ))}
            <button onClick={() => setDark(d => !d)} style={{ background: "none", border: `1px solid ${border}`, borderRadius: "8px", cursor: "pointer", color: muted, padding: "6px 10px", fontSize: "14px" }}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "80px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px", width: "100%" }}>
          <AnimSection>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "720px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${accent}15`, border: `1px solid ${accent}30`, borderRadius: "20px", padding: "6px 14px", width: "fit-content" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: accent, display: "inline-block", boxShadow: `0 0 8px ${accent}` }}></span>
                <span style={{ fontSize: "12px", color: accent, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>Available for opportunities</span>
              </div>
              <div>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: accent, marginBottom: "8px", letterSpacing: "0.1em" }}>Hello, I'm</p>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", color: text }}>
                  Ishita<br /><span style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Verma</span>
                </h1>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "32px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: accent2, fontSize: "15px" }}>{">"}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(14px, 2.5vw, 18px)", color: dark ? "#CBD5E1" : "#475569", fontWeight: 500 }}>
                  {typed}<span className="cursor"></span>
                </span>
              </div>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: muted, maxWidth: "560px" }}>
                Final year CSE student passionate about building scalable systems and intelligent products. 1+ year of web dev experience, 170+ DSA problems solved, and a drive to ship impactful software.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button className="cta-btn" onClick={() => scrollTo("Projects")} style={{ padding: "12px 28px", borderRadius: "10px", background: `linear-gradient(135deg, ${accent}, #3BDAA0)`, border: "none", color: "#0A0E1A", fontWeight: 700, fontSize: "14px", letterSpacing: "0.02em" }}>
                  View Projects →
                </button>
                <a href="#" className="cta-btn" style={{ padding: "12px 28px", borderRadius: "10px", background: "none", border: `1px solid ${border}`, color: text, fontWeight: 600, fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                  📄 Resume
                </a>
                <button className="cta-btn" onClick={() => scrollTo("Contact")} style={{ padding: "12px 28px", borderRadius: "10px", background: "none", border: `1px solid ${accent2}50`, color: accent2, fontWeight: 600, fontSize: "14px" }}>
                  Contact Me
                </button>
              </div>
              <div style={{ display: "flex", gap: "16px", paddingTop: "8px" }}>
                {[
                  { icon: "🐙", url: "https://github.com/justishita", label: "GitHub" },
                  { icon: "💼", url: "https://www.linkedin.com/in/ishita-verma-16bb1929a/", label: "LinkedIn" },
                  { icon: "⚡", url: "https://leetcode.com/u/Ishita-Verma/", label: "LeetCode" },
                ].map(s => (
                  <a key={s.label} href={s.url} target="_blank" className="icon-link" style={{ display: "flex", alignItems: "center", gap: "6px", color: muted, fontSize: "13px", fontWeight: 500 }}>
                    <span style={{ fontSize: "16px" }}>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <SectionHeader label="01" title="About Me" accent={accent} muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", marginTop: "48px", alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: `linear-gradient(135deg, ${accent}30, ${accent2}30)`, border: `2px solid ${accent}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
                  👩‍💻
                </div>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: muted }}>
                  I'm a <span style={{ color: accent, fontWeight: 600 }}>final year B.Tech CSE student</span> who loves crafting clean, scalable software. With over a year of professional web development experience.
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: muted }}>
                  My interests span <span style={{ color: accent2, fontWeight: 600 }}>AI/ML systems, backend architecture,</span> and high-performance frontend engineering. I thrive at the intersection of elegant design and robust engineering.
                </p>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: muted }}>
                  Outside of coding, I actively grind DSA on LeetCode, and read about software engineering.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { label: "DSA Problems", value: "170+", color: accent },
                  { label: "Projects Built", value: "10+", color: accent2 },
                  { label: "Dev Experience", value: "1+ yr", color: "#F472B6" },
                  { label: "GitHub Repos", value: "20+", color: "#FBBF24" },
                  { label: "Tech Stack", value: "15+", color: "#34D399" },
                  { label: "Grad Year", value: "2027", color: "#60A5FA" },
                ].map(s => <StatPill key={s.label} {...s} />)}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 0", background: dark ? "#0D1220" : "#F1F5F9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <SectionHeader label="02" title="Experience" accent={accent} muted={muted} />
            <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "0" }}>
              {EXPERIENCE.map((exp, i) => (
                <AnimSection key={i}>
                  <div style={{ display: "flex", gap: "24px", paddingBottom: i < EXPERIENCE.length - 1 ? "0" : "0" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "24px", flexShrink: 0 }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: accent, border: `2px solid ${bg}`, boxShadow: `0 0 8px ${accent}`, flexShrink: 0, marginTop: "6px" }}></div>
                      {i < EXPERIENCE.length - 1 && <div style={{ width: "2px", flex: 1, background: `linear-gradient(${accent}40, transparent)`, minHeight: "60px" }}></div>}
                    </div>
                    <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: "16px", padding: "28px", marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                        <div>
                          <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "17px", fontWeight: 700, color: text }}>{exp.role}</h3>
                          <p style={{ color: accent, fontSize: "13px", fontWeight: 600, marginTop: "2px" }}>{exp.company}</p>
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: muted, background: surface2, padding: "4px 12px", borderRadius: "20px", border: `1px solid ${border}` }}>{exp.period}</span>
                      </div>
                      <p style={{ fontSize: "14px", lineHeight: 1.7, color: muted, marginBottom: "16px" }}>{exp.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {exp.tags.map(t => <Tag key={t} label={t} color={accent} />)}
                      </div>
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <SectionHeader label="03" title="Tech Stack" accent={accent} muted={muted} />
            <div style={{ marginTop: "48px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                {Object.keys(SKILLS).map(k => (
                  <button key={k} className="skill-btn" onClick={() => setActiveSkill(k)} style={{
                    padding: "8px 18px", borderRadius: "8px", border: `1px solid ${activeSkill === k ? accent : border}`,
                    background: activeSkill === k ? `${accent}15` : "none",
                    color: activeSkill === k ? accent : muted,
                    fontSize: "13px", fontWeight: 600, cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em",
                  }}>{k}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
                {SKILLS[activeSkill].map((sk, i) => (
                  <div key={sk} style={{
                    background: surface, border: `1px solid ${border}`, borderRadius: "12px",
                    padding: "20px 16px", textAlign: "center",
                    opacity: 1, transform: "scale(1)",
                    transition: `all 0.3s ease ${i * 0.04}s`,
                  }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: text }}>{sk}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 0", background: dark ? "#0D1220" : "#F1F5F9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <SectionHeader label="04" title="Projects" accent={accent} muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "20px", marginTop: "48px" }}>
              {PROJECTS.map((p, i) => (
                <AnimSection key={i}>
                  <div className="proj-card" style={{ background: surface, border: `1px solid ${border}`, borderRadius: "20px", padding: "28px", cursor: "default", borderTop: `2px solid ${p.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div style={{ fontSize: "32px" }}>{p.icon}</div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <a href={p.github} target="_blank" style={{ color: muted, fontSize: "20px", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = accent} onMouseOut={e => e.target.style.color = muted}>⌥</a>
                        <a href={p.live} style={{ color: muted, fontSize: "20px", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color = p.color} onMouseOut={e => e.target.style.color = muted}>↗</a>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px", fontWeight: 700, color: text, marginBottom: "10px" }}>{p.title}</h3>
                    <p style={{ fontSize: "14px", lineHeight: 1.7, color: muted, marginBottom: "20px" }}>{p.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {p.tags.map(t => <Tag key={t} label={t} color={p.color} />)}
                    </div>
                  </div>
                </AnimSection>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a href="https://github.com/justishita" target="_blank" style={{ color: accent, fontSize: "14px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em", border: `1px solid ${accent}40`, padding: "10px 24px", borderRadius: "8px", display: "inline-block", transition: "background 0.2s" }}
                onMouseOver={e => e.target.style.background = `${accent}15`}
                onMouseOut={e => e.target.style.background = "none"}>
                View all on GitHub →
              </a>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <AnimSection>
            <SectionHeader label="05" title="DSA & Achievements" accent={accent} muted={muted} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "48px" }}>
              {[
                { platform: "LeetCode", icon: "⚡", color: "#FFA116", url: "https://leetcode.com/u/Ishita-Verma/", stats: [{ k: "Problems Solved", v: "150+" }, { k: "Contest Rating", v: "~1500" }, { k: "Top Percentage", v: "35%" }] },
                { platform: "GitHub", icon: "🐙", color: accent, url: "https://github.com/justishita", stats: [{ k: "Public Repos", v: "20+" }, { k: "Contributions", v: "300+" }, { k: "Streak", v: "Active" }] },
                { platform: "Codeforces", icon: "🔵", color: "#1F8ACB", url: "#", stats: [{ k: "Problems", v: "80+" }, { k: "Rating", v: "Pupil" }, { k: "Contests", v: "15+" }] },
              ].map(plat => (
                <div key={plat.platform} style={{ background: surface, border: `1px solid ${border}`, borderRadius: "16px", padding: "24px", borderLeft: `3px solid ${plat.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <span style={{ fontSize: "24px" }}>{plat.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 700, color: text }}>{plat.platform}</h3>
                      <a href={plat.url} target="_blank" style={{ fontSize: "12px", color: plat.color, fontFamily: "'JetBrains Mono', monospace" }}>View Profile ↗</a>
                    </div>
                  </div>
                  {plat.stats.map(s => (
                    <div key={s.k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${border}` }}>
                      <span style={{ fontSize: "13px", color: muted }}>{s.k}</span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: plat.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "32px", background: surface, border: `1px solid ${border}`, borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 700, color: accent, marginBottom: "16px" }}>🏆 Highlights</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                {["150+ DSA Problems Solved (Trees, DP, Graphs)", "Active Open Source Contributor", "Built 10+ Production Web Apps", "Full Stack + AI/ML Proficiency", "1+ Year Professional Dev Experience", "Strong System Design Foundation"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: muted }}>
                    <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>▸</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 0 60px", background: dark ? "#0D1220" : "#F1F5F9" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <AnimSection>
            <SectionHeader label="06" title="Let's Connect" accent={accent} muted={muted} center />
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: muted, margin: "24px auto 40px", maxWidth: "480px" }}>
              I'm actively looking for SDE and AI/ML roles. Whether it's a full-time position, internship, or an exciting project — let's build something great together.
            </p>
            <a href="mailto:ishita@example.com" className="cta-btn" style={{ display: "inline-block", padding: "14px 36px", borderRadius: "12px", background: `linear-gradient(135deg, ${accent}, #3BDAA0)`, color: "#0A0E1A", fontWeight: 700, fontSize: "15px", marginBottom: "48px" }}>
              Say Hello 👋
            </a>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
              {[
                { icon: "🐙", label: "GitHub", url: "https://github.com/justishita" },
                { icon: "💼", label: "LinkedIn", url: "https://www.linkedin.com/in/ishita-verma-16bb1929a/" },
                { icon: "⚡", label: "LeetCode", url: "https://leetcode.com/u/Ishita-Verma/" },
                { icon: "📄", label: "Resume", url: "#" },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" className="icon-link" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: muted, fontSize: "12px", fontWeight: 600 }}>
                  <span style={{ fontSize: "22px" }}>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "24px", borderTop: `1px solid ${border}`, color: muted, fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>
        Designed & Built by <span style={{ color: accent, fontWeight: 600 }}>Ishita Verma</span> · 2025
      </footer>
    </div>
  );
}

function SectionHeader({ label, title, accent, muted, center = false }) {
  return (
    <div style={{ textAlign: center ? "center" : "left" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: accent, letterSpacing: "0.15em", fontWeight: 600 }}>
        {label} ——
      </span>
      <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginTop: "8px" }}>
        {title}
      </h2>
    </div>
  );
}
