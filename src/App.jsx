import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, Moon, Sun,
  ChevronDown, Code2, Palette, Server,
  Zap, GraduationCap, User, ArrowUpRight, Terminal, Globe
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────
const projects = [
  {
    id: 1, name: "FinTrack", stack: "React · Recharts · Vite",
    desc: "Personal finance dashboard with live income/expense tracking, multi-chart visualisation, budget management, and animated modals.",
    bullets: [
      "Engineered real-time balance computation with category tagging across transactions",
      "Built area, bar & donut charts with gradient fills and custom tooltips",
      "Delivered dark-mode UI with responsive stat cards and gradient visual hierarchy"
    ],
    color: "#00C9FF", github: "https://github.com/Josh-only/fintrack",
    image: "/fintrack.png", tag: "Finance"
  },
  {
    id: 2, name: "TaskFlow", stack: "React · HTML5 DnD · Vite",
    desc: "Five-column Kanban board with native drag-and-drop, priority labels, team avatars, and sprint progress tracking.",
    bullets: [
      "Native HTML5 drag-and-drop with live column reordering and task state sync",
      "Priority system with colour-coded labels: Low, Medium, High, Critical",
      "Inline task creation with real-time updates — zero external dependencies"
    ],
    color: "#845EC2", github: "https://github.com/Josh-only/taskflow",
    image: "/taskflow.png", tag: "Productivity"
  },
  {
    id: 3, name: "WeatherSphere", stack: "React · Open-Meteo API · Vite",
    desc: "Real-time weather app with city search, 7-day forecast, hourly breakdown, and dynamic condition-based theming.",
    bullets: [
      "City search with autocomplete across 10+ global cities including Lagos",
      "CSS-animated weather icons and background gradients driven by live conditions",
      "Celsius/Fahrenheit toggle with consistent unit conversion across all panels"
    ],
    color: "#FFD93D", github: "https://github.com/Josh-only/weathersphere",
    image: "/weathersphere.png", tag: "Utility"
  }
];

const skills = {
  Languages: { icon: Code2, color: "#00C9FF", items: ["JavaScript (ES6+)", "HTML/CSS", "Java", "C (OOP)", "TypeScript"] },
  Frontend: { icon: Palette, color: "#FF6B6B", items: ["React.js", "Angular", "Blazor WebAssembly", "jQuery", "Vite"] },
  Backend: { icon: Server, color: "#6BCB77", items: ["Node.js", "Express", "ASP.NET Core", "RESTful APIs", "MongoDB", "SQL Server"] },
  Tools: { icon: Zap, color: "#FFD93D", items: ["Git/GitHub", "Vercel", "Netlify", "Postman", "Figma", "Bash"] }
};

const experience = [
  {
    role: "Front-End Engineer Intern", company: "United Bank for Africa (UBA)",
    location: "Lagos Island, Marina", period: "July 2025 – October 2025", color: "#00C9FF",
    bullets: [
      "Developed and maintained UI components using Angular and TypeScript for internal enterprise applications",
      "Integrated RESTful APIs ensuring seamless data flow between front-end and back-end services",
      "Refactored legacy components improving application usability and client-side performance",
      "Participated in code reviews, debugging, and testing to maintain code quality"
    ]
  },
  {
    role: "Product Designer", company: "Freelance", location: "Remote",
    period: "March 2020 – Present", color: "#845EC2",
    bullets: [
      "Conducted user research through interviews and usability testing to inform design decisions",
      "Created wireframes, user flows, and high-fidelity UI designs for web and mobile products",
      "Collaborated with engineers to translate requirements into intuitive, accessible designs",
      "Maintained and extended product design systems across multiple client projects"
    ]
  }
];

// ─── UPBEAT MOTIVATIONAL MUSIC (Web Audio API) ──────────────────
function createIronManTheme(ctx) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 2);
  master.connect(ctx.destination);

  // Compressor for punchy feel
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -18; comp.knee.value = 6;
  comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.15;
  comp.connect(master);

  // Short bright reverb
  const reverb = ctx.createConvolver();
  const rvBuf = ctx.createBuffer(2, ctx.sampleRate * 1.2, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = rvBuf.getChannelData(c);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
  }
  reverb.buffer = rvBuf;
  const rvGain = ctx.createGain(); rvGain.gain.value = 0.18;
  reverb.connect(rvGain); rvGain.connect(comp);

  const intervals = [];
  const BPM = 128; // energetic dance tempo
  const BEAT = 60 / BPM;
  const now = ctx.currentTime;

  // ── Punchy kick drum (four on the floor)
  let kt = now;
  const playKick = () => {
    for (let i = 0; i < 4; i++) {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = Math.sin(2 * Math.PI * 60 * j / ctx.sampleRate) * Math.exp(-j / (ctx.sampleRate * 0.06));
      const src = ctx.createBufferSource(), g = ctx.createGain();
      src.buffer = buf;
      const t = kt + i * BEAT;
      g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      src.connect(g); g.connect(comp);
      src.start(t); src.stop(t + 0.3);
    }
    kt += 4 * BEAT;
  };
  playKick();
  intervals.push(setInterval(playKick, 4 * BEAT * 1000));

  // ── Snappy snare on beats 2 and 4
  let st = now + BEAT;
  const playSnare = () => {
    for (let i = 0; i < 2; i++) {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.025));
      const src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      f.type = "bandpass"; f.frequency.value = 2000; f.Q.value = 0.8;
      src.buffer = buf;
      const t = st + i * 2 * BEAT;
      g.gain.setValueAtTime(0.55, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      src.connect(f); f.connect(g); g.connect(comp);
      src.start(t); src.stop(t + 0.16);
    }
    st += 4 * BEAT;
  };
  playSnare();
  intervals.push(setInterval(playSnare, 4 * BEAT * 1000));

  // ── Crispy hi-hats (eighth notes with groove)
  let ht = now;
  const playHats = () => {
    for (let i = 0; i < 8; i++) {
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.008));
      const src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      f.type = "highpass"; f.frequency.value = 9000;
      src.buffer = buf;
      const t = ht + i * (BEAT / 2);
      const vel = i % 2 === 0 ? 0.18 : 0.1;
      g.gain.setValueAtTime(vel, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      src.connect(f); f.connect(g); g.connect(comp);
      src.start(t); src.stop(t + 0.05);
    }
    ht += 4 * BEAT;
  };
  playHats();
  intervals.push(setInterval(playHats, 4 * BEAT * 1000));

  // ── Bouncy synth bass (upbeat walking bass)
  const bassNotes = [130.8, 130.8, 146.8, 164.8, 130.8, 174.6, 164.8, 146.8];
  let bt = now;
  const playBass = () => {
    bassNotes.forEach((freq, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      f.type = "lowpass"; f.frequency.value = 400; f.Q.value = 3;
      o.type = "square"; o.frequency.value = freq;
      const t = bt + i * (BEAT / 2);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.35, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + (BEAT / 2) - 0.02);
      o.connect(f); f.connect(g); g.connect(comp);
      o.start(t); o.stop(t + BEAT / 2);
    });
    bt += bassNotes.length * (BEAT / 2);
  };
  playBass();
  intervals.push(setInterval(playBass, bassNotes.length * (BEAT / 2) * 1000));

  // ── Uplifting lead melody (major key, energetic)
  const mel = [
    [523.2,0.25],[523.2,0.25],[659.3,0.5],[587.3,0.25],[523.2,0.25],
    [659.3,0.5],[698.5,0.25],[659.3,0.25],[587.3,0.5],
    [523.2,0.25],[587.3,0.25],[659.3,0.25],[698.5,0.25],[784,0.75],
    [698.5,0.25],[659.3,0.25],[587.3,0.5],[523.2,1.0]
  ];
  let mt = now + 0.1;
  const playMel = () => {
    mel.forEach(([f, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "triangle"; o.frequency.value = f;
      g.gain.setValueAtTime(0, mt);
      g.gain.linearRampToValueAtTime(0.16, mt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, mt + d - 0.02);
      o.connect(g); g.connect(reverb); g.connect(comp);
      o.start(mt); o.stop(mt + d);
      mt += d;
    });
    mt += BEAT * 0.5;
  };
  playMel();
  const melDur = (mel.reduce((s, [, d]) => s + d, 0) + BEAT * 0.5) * 1000;
  intervals.push(setInterval(playMel, melDur));

  // ── Bright chord stabs (upbeat energy)
  const chords = [
    [261.6, 329.6, 392],
    [293.7, 369.9, 440],
    [329.6, 415.3, 493.9],
    [261.6, 349.2, 440]
  ];
  let cst = now + BEAT * 0.5;
  let cIdx = 0;
  const playStabs = () => {
    chords[cIdx % chords.length].forEach(f => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "square"; o.frequency.value = f;
      g.gain.setValueAtTime(0, cst);
      g.gain.linearRampToValueAtTime(0.07, cst + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, cst + 0.18);
      o.connect(g); g.connect(reverb); g.connect(comp);
      o.start(cst); o.stop(cst + 0.2);
    });
    cst += BEAT * 2; cIdx++;
  };
  playStabs();
  intervals.push(setInterval(playStabs, BEAT * 2 * 1000));

  // ── Driving drums (kept for structure, reusing kick logic)
  let dt = now + 0.1;
  const drumPattern = [1,0,0,0, 0,0,1,0, 1,0,0,0, 0,1,1,0];
  const hihatPattern = [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1];
  const playDrums = () => {
    drumPattern.forEach((hit, i) => {
      if (hit) {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.04));
        const src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
        f.type = "lowpass"; f.frequency.value = 150;
        src.buffer = buf;
        const t = dt + i * 0.125;
        g.gain.setValueAtTime(i === 0 ? 0.7 : 0.4, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t); src.stop(t + 0.15);
      }
    });
    hihatPattern.forEach((hit, i) => {
      if (hit) {
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (ctx.sampleRate * 0.01));
        const src = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
        f.type = "highpass"; f.frequency.value = 7000;
        src.buffer = buf;
        const t = dt + i * 0.125;
        g.gain.setValueAtTime(0.08, t);
        src.connect(f); f.connect(g); g.connect(master);
        src.start(t); src.stop(t + 0.06);
      }
    });
    dt += drumPattern.length * 0.125;
  };
  playDrums();
  intervals.push(setInterval(playDrums, drumPattern.length * 125));

  // ── Epic pad swells
  const padChords = [[82.4,110,138.6,164.8],[73.4,98,123.5,146.8],[98,130.8,164.8,196]];
  let pt = ctx.currentTime;
  let pi2 = 0;
  const playPads = () => {
    padChords[pi2 % padChords.length].forEach(f => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0, pt);
      g.gain.linearRampToValueAtTime(0.07, pt + 1.5);
      g.gain.linearRampToValueAtTime(0.05, pt + 3.5);
      g.gain.linearRampToValueAtTime(0, pt + 4);
      o.connect(g); g.connect(reverb); g.connect(master);
      o.start(pt); o.stop(pt + 4.2);
    });
    pt += 4; pi2++;
  };
  playPads();
  intervals.push(setInterval(playPads, 4000));

  return { masterGain: master, intervals };
}

// ─── SCROLL REVEAL ──────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0) translateX(0)";
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── SUB-COMPONENTS ─────────────────────────────────────────────
function NavDot({ active, onClick, label }) {
  return (
    <button onClick={onClick} title={label} style={{
      width: active ? 28 : 8, height: 8, borderRadius: 100, border: "none",
      cursor: "pointer", padding: 0,
      background: active ? "var(--accent)" : "var(--dot)",
      transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
      boxShadow: active ? "0 0 12px var(--accent)" : "none"
    }} />
  );
}

function GlowCard({ children, color = "#00C9FF", style = {}, className = "" }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={className}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--card)",
        border: `1px solid ${hov ? color + "44" : "var(--border)"}`,
        borderRadius: 20, transition: "all 0.35s ease",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hov ? `0 24px 64px ${color}20` : "none",
        ...style
      }}
    >{children}</div>
  );
}

function SectionHeader({ label, title, centered = false }) {
  return (
    <div className="reveal" style={{
      textAlign: centered ? "center" : "left",
      opacity: 0, transform: "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)"
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#00C9FF", display: "block", marginBottom: 12 }}>{label}</span>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-1.5px", color: "var(--heading)", lineHeight: 1.1 }}>{title}</h2>
    </div>
  );
}

// ─── HERO ───────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Front-End Engineer", "Product Designer", "CS Undergraduate", "Fintech Enthusiast"];
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const cur = roles[ri];
    const t = setTimeout(() => {
      if (!del && ci < cur.length) { setTyped(cur.slice(0, ci + 1)); setCi(c => c + 1); }
      else if (!del && ci === cur.length) { setTimeout(() => setDel(true), 1800); }
      else if (del && ci > 0) { setTyped(cur.slice(0, ci - 1)); setCi(c => c - 1); }
      else { setDel(false); setRi(r => (r + 1) % roles.length); }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [ci, del, ri]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 32px" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", top: "-15%", right: "-15%", background: "radial-gradient(circle, rgba(0,201,255,0.05) 0%, transparent 70%)", animation: "float1 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: "0%", left: "-10%", background: "radial-gradient(circle, rgba(132,94,194,0.06) 0%, transparent 70%)", animation: "float2 11s ease-in-out infinite", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, width: "100%", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 380px", gap: 60, alignItems: "center" }}>
        {/* Text */}
        <div>
          <div className="reveal" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s 0.1s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(0,201,255,0.08)", border: "1px solid rgba(0,201,255,0.2)", fontSize: 13, color: "#00C9FF", fontWeight: 600, marginBottom: 28, letterSpacing: "0.06em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C9FF", display: "inline-block", animation: "pulse 2s ease infinite" }} />
              AVAILABLE FOR OPPORTUNITIES
            </div>
          </div>
          <div className="reveal" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-3px", marginBottom: 8, color: "var(--heading)" }}>Toluwani</h1>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-3px", marginBottom: 32, background: "linear-gradient(135deg, #00C9FF 0%, #845EC2 50%, #FFD93D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "gradientShift 4s ease infinite" }}>Oyebade</h1>
          </div>
          <div className="reveal" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s 0.3s cubic-bezier(0.22,1,0.36,1)", marginBottom: 20 }}>
            <div style={{ fontSize: "clamp(16px, 2.2vw, 22px)", fontWeight: 600, color: "var(--subtext)", minHeight: 36, display: "flex", alignItems: "center", gap: 10 }}>
              <Terminal size={20} color="#00C9FF" />
              <span style={{ color: "var(--text)" }}>{typed}</span>
              <span style={{ color: "#00C9FF", animation: "blink 1s step-end infinite" }}>|</span>
            </div>
          </div>
          <div className="reveal" style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
            <p style={{ fontSize: 16, color: "var(--subtext)", maxWidth: 520, lineHeight: 1.85, marginBottom: 36 }}>
              3rd year Computer Science undergraduate at Achievers University, building scalable frontend systems and fintech-driven digital experiences.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 36 }}>
              <a href="#projects" style={{ padding: "13px 28px", borderRadius: 13, textDecoration: "none", background: "linear-gradient(135deg, #00C9FF, #0077FF)", color: "#fff", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(0,201,255,0.3)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,201,255,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,201,255,0.3)"; }}
              >View Projects <ArrowUpRight size={15} /></a>
              <a href="mailto:toluwanioyebade@gmail.com" style={{ padding: "13px 28px", borderRadius: 13, textDecoration: "none", background: "var(--card)", color: "var(--text)", border: "1px solid var(--border)", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#00C9FF44"; e.currentTarget.style.color = "#00C9FF"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
              ><Mail size={15} /> Get in Touch</a>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: Github, href: "https://github.com/Josh-only" },
                { icon: Linkedin, href: "https://linkedin.com/in/toluwani-oyebade" },
                { icon: Mail, href: "mailto:toluwanioyebade@gmail.com" },
                { icon: Phone, href: "tel:+2349115715638" }
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: 42, height: 42, borderRadius: 11, background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--subtext)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#00C9FF"; e.currentTarget.style.borderColor = "#00C9FF44"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--subtext)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                ><s.icon size={17} /></a>
              ))}
            </div>
          </div>
        </div>

        {/* Caricature */}
        <div className="reveal" style={{ opacity: 0, transform: "translateX(60px)", transition: "all 0.9s 0.5s cubic-bezier(0.22,1,0.36,1)", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 340 }}>
            {/* Animated glow halo */}
            <div style={{ position: "absolute", inset: -8, borderRadius: "50%", background: "linear-gradient(135deg, #00C9FF44, #845EC244, #FFD93D44)", filter: "blur(20px)", animation: "glowPulse 3s ease-in-out infinite", zIndex: 0 }} />
            {/* Arc reactor dot */}
            <div style={{ position: "absolute", bottom: 20, right: 20, width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle, #00C9FF, #0044FF)", boxShadow: "0 0 20px #00C9FF, 0 0 40px #00C9FF66", zIndex: 3, animation: "pulse 2s ease infinite" }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(0,201,255,0.25)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
              <img src="/avatar.jpeg" alt="Toluwani Oyebade" style={{ width: "100%", display: "block" }} />
              {/* Bottom fade to blend bg */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, var(--bg) 100%)" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--subtext)", fontSize: 12, animation: "bounce 2s ease infinite" }}>
        <span>Scroll</span><ChevronDown size={15} />
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "120px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="About" title="Who I Am" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 60 }}>
        {[
          { icon: User, color: "#00C9FF", title: "The Developer", body: "Ambitious 3rd year Computer Science undergraduate at Achievers University, Owo with hands-on experience in web development and a strong foundation in algorithms, discrete structures, and system design.", tx: "-40px" },
          { icon: Zap, color: "#845EC2", title: "The Vision", body: "Passionate about Artificial Intelligence and fintech innovation, with a growing interest in scalable backend systems and data-driven applications.", tx: "40px" },
          { icon: GraduationCap, color: "#6BCB77", title: "Education", body: "B.Sc. Computer Science\nAchievers University, Owo · Ondo State\nOct 2023 – May 2027\n\nData Structures · OOP · AI · Cyber Security", tx: "-40px" },
          { icon: Globe, color: "#FFD93D", title: "Core Strengths", body: "Code Quality · Testing & Debugging · Version Control · Collaborative Development (Git) · Product Thinking · User-Centred Design", tx: "40px" }
        ].map((c, i) => (
          <GlowCard key={i} color={c.color} className="reveal" style={{ padding: 36, opacity: 0, transform: `translateX(${c.tx})`, transition: `all 0.7s ${0.1 + i * 0.1}s cubic-bezier(0.22,1,0.36,1)` }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, background: `${c.color}12`, border: `1px solid ${c.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <c.icon size={22} color={c.color} />
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 800, marginBottom: 12, color: "var(--heading)" }}>{c.title}</h3>
            <p style={{ color: "var(--subtext)", lineHeight: 1.85, fontSize: 14, whiteSpace: "pre-line" }}>{c.body}</p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ─────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="Experience" title="Where I've Worked" />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 60 }}>
        {experience.map((exp, i) => (
          <GlowCard key={i} color={exp.color} className="reveal" style={{ padding: 36, opacity: 0, transform: "translateY(40px)", transition: `all 0.7s ${i * 0.15}s cubic-bezier(0.22,1,0.36,1)` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14, marginBottom: 18 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: exp.color, boxShadow: `0 0 8px ${exp.color}` }} />
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 19, fontWeight: 800, color: "var(--heading)" }}>{exp.role}</h3>
                </div>
                <p style={{ color: exp.color, fontWeight: 700, fontSize: 14 }}>{exp.company}</p>
                <p style={{ color: "var(--subtext)", fontSize: 12, marginTop: 2 }}>{exp.location}</p>
              </div>
              <span style={{ padding: "5px 14px", borderRadius: 100, background: `${exp.color}12`, color: exp.color, fontSize: 12, fontWeight: 600, border: `1px solid ${exp.color}30`, whiteSpace: "nowrap" }}>{exp.period}</span>
            </div>
            <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: 11, fontSize: 14, color: "var(--subtext)", lineHeight: 1.75 }}>
                  <span style={{ color: exp.color, marginTop: 5, flexShrink: 0 }}>▸</span>{b}
                </li>
              ))}
            </ul>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ───────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding: "120px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="Projects" title="Things I've Built" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, marginTop: 60 }}>
        {projects.map((p, i) => (
          <GlowCard key={p.id} color={p.color} className="reveal" style={{ display: "flex", flexDirection: "column", opacity: 0, transform: "translateY(50px)", transition: `all 0.7s ${i * 0.15}s cubic-bezier(0.22,1,0.36,1)`, overflow: "hidden" }}>
            {/* Screenshot */}
            <div style={{ position: "relative", overflow: "hidden", height: 200, borderRadius: "20px 20px 0 0" }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", transition: "transform 0.5s ease" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 100%)`, pointerEvents: "none" }} />
              <span style={{ position: "absolute", top: 12, right: 12, fontSize: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", color: p.color, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", border: `1px solid ${p.color}44` }}>{p.tag}</span>
            </div>

            {/* Content */}
            <div style={{ padding: "22px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 21, fontWeight: 800, marginBottom: 4, color: "var(--heading)" }}>{p.name}</h3>
              <p style={{ fontSize: 11, color: p.color, fontWeight: 600, marginBottom: 11, fontFamily: "monospace" }}>{p.stack}</p>
              <p style={{ fontSize: 13, color: "var(--subtext)", lineHeight: 1.75, marginBottom: 16 }}>{p.desc}</p>
              <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 22, flex: 1 }}>
                {p.bullets.map((b, j) => (
                  <li key={j} style={{ display: "flex", gap: 9, fontSize: 12, color: "var(--subtext)", lineHeight: 1.65 }}>
                    <span style={{ color: p.color, flexShrink: 0, marginTop: 3 }}>◆</span>{b}
                  </li>
                ))}
              </ul>
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", borderRadius: 11, textDecoration: "none", border: `1px solid ${p.color}30`, background: `${p.color}08`, color: p.color, fontSize: 13, fontWeight: 700, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${p.color}18`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${p.color}08`; e.currentTarget.style.transform = "translateY(0)"; }}
              ><Github size={15} /> View on GitHub <ArrowUpRight size={13} /></a>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <SectionHeader label="Skills" title="What I Work With" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 60 }}>
        {Object.entries(skills).map(([cat, { icon: Icon, color, items }], i) => (
          <GlowCard key={cat} color={color} className="reveal" style={{ padding: 26, opacity: 0, transform: "translateY(40px)", transition: `all 0.6s ${i * 0.1}s cubic-bezier(0.22,1,0.36,1)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}12`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={17} color={color} />
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, color: "var(--heading)" }}>{cat}</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {items.map(item => (
                <div key={item} style={{ padding: "7px 13px", borderRadius: 8, background: "var(--tag-bg)", border: "1px solid var(--border)", fontSize: 12, color: "var(--text)", fontWeight: 500, transition: "all 0.15s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}10`; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--tag-bg)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >{item}</div>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 32px 160px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <SectionHeader label="Contact" title="Let's Work Together" centered />
      <p className="reveal" style={{ color: "var(--subtext)", fontSize: 16, lineHeight: 1.85, marginBottom: 48, marginTop: 24, opacity: 0, transform: "translateY(20px)", transition: "all 0.7s 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
        I'm actively seeking internships, collaborations, and entry-level opportunities. Whether you have a project in mind or just want to connect — my inbox is always open.
      </p>
      <div className="reveal" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", opacity: 0, transform: "translateY(20px)", transition: "all 0.7s 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
        {[
          { icon: Mail, label: "toluwanioyebade@gmail.com", href: "mailto:toluwanioyebade@gmail.com", color: "#00C9FF" },
          { icon: Phone, label: "+234-911-571-5638", href: "tel:+2349115715638", color: "#6BCB77" },
          { icon: Github, label: "Josh-only", href: "https://github.com/Josh-only", color: "#845EC2" },
          { icon: Linkedin, label: "toluwani-oyebade", href: "https://linkedin.com/in/toluwani-oyebade", color: "#FFD93D" },
        ].map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 9, padding: "13px 22px", borderRadius: 13, textDecoration: "none", background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.color}44`; e.currentTarget.style.color = c.color; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(0)"; }}
          ><c.icon size={15} color={c.color} /> {c.label}</a>
        ))}
      </div>
    </section>
  );
}

// ─── MAIN ───────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const sections = ["home", "about", "experience", "projects", "skills", "contact"];
  const sectionLabels = ["Home", "About", "Experience", "Projects", "Skills", "Contact"];


  useScrollReveal();

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const theme = {
    "--bg": dark ? "#06060f" : "#f4f6fb",
    "--card": dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.9)",
    "--border": dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    "--text": dark ? "#e8e8f0" : "#1a1a2e",
    "--heading": dark ? "#ffffff" : "#0a0a1a",
    "--subtext": dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.55)",
    "--tag-bg": dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    "--dot": dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
    "--accent": "#00C9FF",
    "--nav-bg": dark ? "rgba(6,6,15,0.88)" : "rgba(244,246,251,0.88)",
  };

  return (
    <div style={{ ...theme, background: "var(--bg)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,201,255,0.3);border-radius:10px}
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,20px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-30px)}}
        @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,201,255,0.4)}50%{opacity:0.7;box-shadow:0 0 0 6px rgba(0,201,255,0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes glowPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.7;transform:scale(1.05)}}
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: dark ? "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(0,201,255,0.04) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(132,94,194,0.04) 0%, transparent 50%)" : "none" }} />

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "var(--nav-bg)", backdropFilter: "blur(24px)", borderBottom: "1px solid var(--border)", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--heading)" }}>T<span style={{ color: "#00C9FF" }}>.</span>O</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {sections.map((s, i) => <NavDot key={s} active={activeSection === s} onClick={() => document.getElementById(s)?.scrollIntoView({ behavior: "smooth" })} label={sectionLabels[i]} />)}
        </div>
        <div style={{ display: "flex", gap: 10 }}>

          <button onClick={() => setDark(d => !d)} style={{ width: 40, height: 40, borderRadius: 10, background: "var(--card)", border: "1px solid var(--border)", color: "var(--subtext)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </nav>

      <div style={{ paddingTop: 64, position: "relative", zIndex: 1 }}>
        <Hero /><About /><Experience /><Projects /><Skills /><Contact />
      </div>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "24px 32px", textAlign: "center", color: "var(--subtext)", fontSize: 13, position: "relative", zIndex: 1 }}>
        Built with React · Designed & Developed by Toluwani Oyebade · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
