import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Phone, Moon, Sun,
  ChevronDown, Code2, Palette, Server, Zap, GraduationCap,
  User, ArrowUpRight, Terminal, Globe, BookOpen,
  Target, Shield, TrendingUp, Menu, X
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────
const projects = [
  { id:1, name:"FinTrack", stack:"React · Recharts · Vite", desc:"Personal finance dashboard with live income/expense tracking, multi-chart visualisation, budget management, and animated modals.", bullets:["Engineered real-time balance computation with category tagging","Built area, bar & donut charts with gradient fills and custom tooltips","Delivered dark-mode UI with responsive stat cards and gradient hierarchy"], color:"#00C9FF", github:"https://github.com/Josh-only/fintrack", image:"/fintrack.png", tag:"Finance" },
  { id:2, name:"TaskFlow", stack:"React · HTML5 DnD · Vite", desc:"Five-column Kanban board with native drag-and-drop, priority labels, team avatars, and sprint progress tracking.", bullets:["Native HTML5 drag-and-drop with live column reordering","Priority system: Low, Medium, High, Critical labels","Inline task creation with real-time updates — zero dependencies"], color:"#845EC2", github:"https://github.com/Josh-only/taskflow", image:"/taskflow.png", tag:"Productivity" },
  { id:3, name:"WeatherSphere", stack:"React · Open-Meteo API · Vite", desc:"Real-time weather app with city search, 7-day forecast, hourly breakdown, and dynamic condition-based theming.", bullets:["City search autocomplete across 10+ global cities","CSS-animated weather icons driven by live conditions","Celsius/Fahrenheit toggle across all forecast panels"], color:"#FFD93D", github:"https://github.com/Josh-only/weathersphere", image:"/weathersphere.png", tag:"Utility" }
];

const skills = {
  Languages: { icon: Code2, color: "#00C9FF", items: ["JavaScript (ES6+)", "HTML/CSS", "Java", "C#(OOP)", "TypeScript"] },
  Frontend:  { icon: Palette, color: "#FF6B6B", items: ["React.js", "Angular", "Blazor WebAssembly", "jQuery", "Vite"] },
  Backend:   { icon: Server, color: "#6BCB77", items: ["Node.js", "Express", "ASP.NET Core", "RESTful APIs", "MongoDB", "SQL Server"] },
  Tools:     { icon: Zap, color: "#FFD93D", items: ["Git/GitHub", "Vercel", "Netlify", "Postman", "Figma", "Bash"] }
};

const experience = [
  { role:"Front-End Engineer Intern", company:"United Bank for Africa (UBA)", location:"Lagos Island, Marina", period:"July 2025 – October 2025", color:"#00C9FF", bullets:["Developed and maintained UI components using Angular and TypeScript for internal enterprise applications","Integrated RESTful APIs ensuring seamless data flow between front-end and back-end services","Refactored legacy components improving application usability and client-side performance","Participated in code reviews, debugging, and testing to maintain code quality"] },
  { role:"Product Designer", company:"Freelance", location:"Remote", period:"March 2020 – Present", color:"#845EC2", bullets:["Conducted user research through interviews and usability testing","Created wireframes, user flows, and high-fidelity UI designs for web and mobile","Collaborated with engineers to translate requirements into intuitive designs","Maintained and extended product design systems across multiple client projects"] }
];

const books = [
  { title:"The 48 Laws of Power", author:"Robert Greene", color:"#FF6B6B", note:"Blueprint for strategy and power." },
  { title:"The Laws of Human Nature", author:"Robert Greene", color:"#FF6B6B", note:"Understanding people before they understand you." },
  { title:"Mastery", author:"Robert Greene", color:"#FF6B6B", note:"Long-game skill dominance." },
  { title:"Atomic Habits", author:"James Clear", color:"#00C9FF", note:"Systems over motivation." },
  { title:"Rich Dad Poor Dad", author:"Robert Kiyosaki", color:"#6BCB77", note:"Asset mindset unlocked." },
  { title:"The Psychology of Money", author:"Morgan Housel", color:"#6BCB77", note:"Wealth behavior beats income." },
  { title:"Think and Grow Rich", author:"Napoleon Hill", color:"#FFD93D", note:"Classic belief + wealth programming." },
  { title:"Can't Hurt Me", author:"David Goggins", color:"#845EC2", note:"Discipline on demon mode." },
  { title:"Deep Work", author:"Cal Newport", color:"#00C9FF", note:"Focus like a machine." },
  { title:"The Millionaire Fastlane", author:"MJ DeMarco", color:"#FFD93D", note:"Escape the slow lane mentality." },
  { title:"Zero to One", author:"Peter Thiel", color:"#FF6B6B", note:"Build monopolies, think differently." },
  { title:"The Art of Seduction", author:"Robert Greene", color:"#845EC2", note:"Influence through subtle power." },
  { title:"How to Win Friends & Influence People", author:"Dale Carnegie", color:"#6BCB77", note:"Social leverage classic." },
];

const principles = [
  { icon: Target, title: "Clarity Before Action", color: "#00C9FF", quote: "If you don't define the game, you can't win it.", body: "Most stress comes from vague goals, vague standards, vague expectations. Get specific. Then move." },
  { icon: Shield, title: "Secure the Baseline", color: "#845EC2", quote: "If the floor is strong, you can take bigger risks without panic.", body: "Health. Skills. Reputation. Cash flow. Lock in the non-negotiables first — everything else becomes optional." },
  { icon: TrendingUp, title: "Long-Term > Loud Wins", color: "#FFD93D", quote: "I'd rather compound quietly than spike dramatically.", body: "Slow skill stacking. Slow credibility building. Momentum beats hype every single time." },
];

const influences = [
  { name: "Alex Hormozi", tag: "Business · Leverage", color: "#FF6B6B" },
  { name: "Robert Greene", tag: "Power · Strategy", color: "#845EC2" },
  { name: "Naval Ravikant", tag: "Wealth · Thinking", color: "#00C9FF" },
  { name: "Patrick Bet-David", tag: "Ambition · Vision", color: "#FFD93D" },
  { name: "Chris Williamson", tag: "Discipline · Depth", color: "#6BCB77" },
  { name: "Jordan Peterson", tag: "Responsibility · Order", color: "#FF9F43" },
  { name: "Gary Vaynerchuk", tag: "Execution · Energy", color: "#00C9FF" },
];

// ─── SCROLL REVEAL ───────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity="1"; e.target.style.transform="translateY(0) translateX(0)"; observer.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────
function NavDot({ active, onClick, label }) {
  return (
    <button onClick={onClick} title={label} style={{ width: active?28:8, height:8, borderRadius:100, border:"none", cursor:"pointer", padding:0, background: active?"var(--accent)":"var(--dot)", transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: active?"0 0 12px var(--accent)":"none" }} />
  );
}

function GlowCard({ children, color="#00C9FF", style={}, className="" }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={className} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:"var(--card)", border:`1px solid ${hov?color+"44":"var(--border)"}`, borderRadius:20, transition:"all 0.35s ease", transform:hov?"translateY(-5px)":"translateY(0)", boxShadow:hov?`0 24px 64px ${color}20`:"none", ...style }}
    >{children}</div>
  );
}

function SectionHeader({ label, title, centered=false }) {
  return (
    <div className="reveal" style={{ textAlign:centered?"center":"left", opacity:0, transform:"translateY(30px)", transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)" }}>
      <span style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#00C9FF", display:"block", marginBottom:12 }}>{label}</span>
      <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(28px, 5vw, 52px)", fontWeight:800, letterSpacing:"-1.5px", color:"var(--heading)", lineHeight:1.1 }}>{title}</h2>
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Front-End Engineer","Product Designer","CS Undergraduate","Fintech Enthusiast"];
  const [ri,setRi] = useState(0); const [ci,setCi] = useState(0); const [del,setDel] = useState(false);
  useEffect(() => {
    const cur = roles[ri];
    const t = setTimeout(() => {
      if (!del && ci<cur.length) { setTyped(cur.slice(0,ci+1)); setCi(c=>c+1); }
      else if (!del && ci===cur.length) { setTimeout(()=>setDel(true),1800); }
      else if (del && ci>0) { setTyped(cur.slice(0,ci-1)); setCi(c=>c-1); }
      else { setDel(false); setRi(r=>(r+1)%roles.length); }
    }, del?40:80);
    return ()=>clearTimeout(t);
  }, [ci,del,ri]);

  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", padding:"80px 20px 40px" }}>
      <div style={{ position:"absolute", width:"min(700px,100vw)", height:"min(700px,100vw)", borderRadius:"50%", top:"-15%", right:"-15%", background:"radial-gradient(circle, rgba(0,201,255,0.05) 0%, transparent 70%)", animation:"float1 8s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:"min(500px,80vw)", height:"min(500px,80vw)", borderRadius:"50%", bottom:"0%", left:"-10%", background:"radial-gradient(circle, rgba(132,94,194,0.06) 0%, transparent 70%)", animation:"float2 11s ease-in-out infinite", pointerEvents:"none" }} />

      <div style={{ maxWidth:1100, width:"100%", position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr auto", gap:"clamp(20px,5vw,60px)", alignItems:"center" }}>
        <div>
          <div className="reveal" style={{ opacity:0, transform:"translateY(30px)", transition:"all 0.7s 0.1s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px", borderRadius:100, background:"rgba(0,201,255,0.08)", border:"1px solid rgba(0,201,255,0.2)", fontSize:13, color:"#00C9FF", fontWeight:600, marginBottom:28, letterSpacing:"0.06em" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#00C9FF", display:"inline-block", animation:"pulse 2s ease infinite" }} />
              AVAILABLE FOR OPPORTUNITIES
            </div>
          </div>
          <div className="reveal" style={{ opacity:0, transform:"translateY(30px)", transition:"all 0.7s 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
            <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(36px, 7vw, 88px)", fontWeight:800, lineHeight:1.0, letterSpacing:"-3px", marginBottom:8, color:"var(--heading)" }}>Toluwani</h1>
            <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(36px, 7vw, 88px)", fontWeight:800, lineHeight:1.0, letterSpacing:"-3px", marginBottom:28, background:"linear-gradient(135deg, #00C9FF 0%, #845EC2 50%, #FFD93D 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundSize:"200%", animation:"gradientShift 4s ease infinite" }}>Oyebade</h1>
          </div>
          <div className="reveal" style={{ opacity:0, transform:"translateY(30px)", transition:"all 0.7s 0.3s cubic-bezier(0.22,1,0.36,1)", marginBottom:20 }}>
            <div style={{ fontSize:"clamp(14px, 2.2vw, 22px)", fontWeight:600, color:"var(--subtext)", minHeight:36, display:"flex", alignItems:"center", gap:10 }}>
              <Terminal size={18} color="#00C9FF" />
              <span style={{ color:"var(--text)" }}>{typed}</span>
              <span style={{ color:"#00C9FF", animation:"blink 1s step-end infinite" }}>|</span>
            </div>
          </div>
          <div className="reveal" style={{ opacity:0, transform:"translateY(30px)", transition:"all 0.7s 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
            <p style={{ fontSize:"clamp(13px,1.5vw,16px)", color:"var(--subtext)", maxWidth:520, lineHeight:1.85, marginBottom:28 }}>3rd year Computer Science undergraduate at Achievers University, building scalable frontend systems and fintech-driven digital experiences.</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:28 }}>
              <a href="#projects" style={{ padding:"12px clamp(16px,3vw,28px)", borderRadius:13, textDecoration:"none", background:"linear-gradient(135deg, #00C9FF, #0077FF)", color:"#fff", fontSize:"clamp(12px,1.5vw,14px)", fontWeight:700, display:"flex", alignItems:"center", gap:8, boxShadow:"0 8px 32px rgba(0,201,255,0.3)", transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(0,201,255,0.45)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,201,255,0.3)";}}
              >View Projects <ArrowUpRight size={14} /></a>
              <a href="mailto:toluwanioyebade@gmail.com" style={{ padding:"12px clamp(16px,3vw,28px)", borderRadius:13, textDecoration:"none", background:"var(--card)", color:"var(--text)", border:"1px solid var(--border)", fontSize:"clamp(12px,1.5vw,14px)", fontWeight:700, display:"flex", alignItems:"center", gap:8, transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#00C9FF44";e.currentTarget.style.color="#00C9FF";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text)";}}
              ><Mail size={14} /> Get in Touch</a>
              <a href="/resume.pdf" download="Oyebade_Toluwani_Resume.pdf" style={{ padding:"12px clamp(16px,3vw,28px)", borderRadius:13, textDecoration:"none", background:"rgba(0,201,255,0.08)", color:"#00C9FF", border:"1px solid rgba(0,201,255,0.3)", fontSize:"clamp(12px,1.5vw,14px)", fontWeight:700, display:"flex", alignItems:"center", gap:8, transition:"all 0.2s", boxShadow:"0 0 0 0 rgba(0,201,255,0)" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,201,255,0.15)";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,201,255,0.25)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(0,201,255,0.08)";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 0 0 0 rgba(0,201,255,0)";}}
              >⬇ Download Resume</a>
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[{icon:Github,href:"https://github.com/Josh-only"},{icon:Linkedin,href:"https://linkedin.com/in/toluwani-oyebade"},{icon:Mail,href:"mailto:toluwanioyebade@gmail.com"},{icon:Phone,href:"tel:+2349115715638"}].map((s,i)=>(
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width:40, height:40, borderRadius:11, background:"var(--card)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--subtext)", textDecoration:"none", transition:"all 0.2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.color="#00C9FF";e.currentTarget.style.borderColor="#00C9FF44";e.currentTarget.style.transform="translateY(-3px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.color="var(--subtext)";e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.transform="translateY(0)";}}
                ><s.icon size={16} /></a>
              ))}
            </div>
          </div>
        </div>

        {/* Caricature */}
        <div className="reveal" style={{ opacity:0, transform:"translateX(60px)", transition:"all 0.9s 0.5s cubic-bezier(0.22,1,0.36,1)", display:"flex", justifyContent:"center" }}>
          <div style={{ position:"relative", width:"clamp(180px, 25vw, 320px)" }}>
            <div style={{ position:"absolute", inset:-8, borderRadius:"50%", background:"linear-gradient(135deg, #00C9FF44, #845EC244, #FFD93D44)", filter:"blur(20px)", animation:"glowPulse 3s ease-in-out infinite", zIndex:0 }} />
            <div style={{ position:"absolute", bottom:16, right:16, width:16, height:16, borderRadius:"50%", background:"radial-gradient(circle, #00C9FF, #0044FF)", boxShadow:"0 0 20px #00C9FF, 0 0 40px #00C9FF66", zIndex:3, animation:"pulse 2s ease infinite" }} />
            <div style={{ position:"relative", zIndex:1, borderRadius:"50%", overflow:"hidden", border:"3px solid rgba(0,201,255,0.25)", boxShadow:"0 40px 100px rgba(0,0,0,0.6)" }}>
              <img src="/avatar.jpeg" alt="Toluwani Oyebade" style={{ width:"100%", display:"block" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 50%, var(--bg) 100%)" }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6, color:"var(--subtext)", fontSize:12, animation:"bounce 2s ease infinite" }}>
        <span>Scroll</span><ChevronDown size={14} />
      </div>
    </section>
  );
}

// ─── ABOUT (EXPANDED) ────────────────────────────────────────────
function About() {
  const [activeBook, setActiveBook] = useState(null);

  return (
    <section id="about" style={{ padding:"80px 20px", maxWidth:1100, margin:"0 auto" }}>
      <SectionHeader label="About" title="Who I Am" />

      {/* Core cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:20, marginTop:48, marginBottom:80 }}>
        {[
          { icon:User, color:"#00C9FF", title:"The Developer", body:"3rd year CS undergraduate at Achievers University, Owo. Hands-on experience in web development with a strong foundation in algorithms, system design, and discrete structures.", tx:"-40px" },
          { icon:Zap, color:"#845EC2", title:"The Vision", body:"Passionate about AI and fintech innovation, with a growing interest in scalable backend systems and data-driven applications. Building impactful solutions.", tx:"40px" },
          { icon:GraduationCap, color:"#6BCB77", title:"Education", body:"B.Sc. Computer Science\nAchievers University, Owo\nOct 2023 – May 2027\n\nData Structures · OOP · AI · Cyber Security", tx:"-40px" },
          { icon:Globe, color:"#FFD93D", title:"Core Strengths", body:"Code Quality · Testing & Debugging · Version Control · Collaborative Development · Product Thinking · User-Centred Design", tx:"40px" }
        ].map((c,i)=>(
          <GlowCard key={i} color={c.color} className="reveal" style={{ padding:32, opacity:0, transform:`translateX(${c.tx})`, transition:`all 0.7s ${0.1+i*0.1}s cubic-bezier(0.22,1,0.36,1)` }}>
            <div style={{ width:46, height:46, borderRadius:12, background:`${c.color}12`, border:`1px solid ${c.color}25`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}><c.icon size={20} color={c.color} /></div>
            <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:17, fontWeight:800, marginBottom:10, color:"var(--heading)" }}>{c.title}</h3>
            <p style={{ color:"var(--subtext)", lineHeight:1.85, fontSize:13, whiteSpace:"pre-line" }}>{c.body}</p>
          </GlowCard>
        ))}
      </div>

      {/* ── OPERATING PRINCIPLES */}
      <div className="reveal" style={{ opacity:0, transform:"translateY(40px)", transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)", marginBottom:80 }}>
        <div style={{ marginBottom:32 }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#00C9FF" }}>OPERATING PRINCIPLES</span>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"var(--heading)", marginTop:8 }}>How I Move</h3>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:20 }}>
          {principles.map((p,i)=>(
            <div key={i} className="reveal" style={{ opacity:0, transform:"translateY(40px)", transition:`all 0.7s ${i*0.15}s cubic-bezier(0.22,1,0.36,1)`, background:"var(--card)", border:`1px solid ${p.color}22`, borderRadius:20, padding:28, borderLeft:`3px solid ${p.color}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${p.color}15`, display:"flex", alignItems:"center", justifyContent:"center" }}><p.icon size={18} color={p.color} /></div>
                <h4 style={{ fontFamily:"'Syne', sans-serif", fontSize:15, fontWeight:800, color:"var(--heading)", textTransform:"uppercase", letterSpacing:"0.04em" }}>{p.title}</h4>
              </div>
              <p style={{ fontSize:14, fontStyle:"italic", color:p.color, marginBottom:10, lineHeight:1.6 }}>"{p.quote}"</p>
              <p style={{ fontSize:13, color:"var(--subtext)", lineHeight:1.75 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>



      {/* ── GITHUB HEATMAP */}
      <div className="reveal" style={{ opacity:0, transform:"translateY(40px)", transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)", marginBottom:80 }}>
        <div style={{ marginBottom:32 }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#00C9FF" }}>GITHUB ACTIVITY</span>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"var(--heading)", marginTop:8 }}>Code in the Wild</h3>
          <p style={{ color:"var(--subtext)", marginTop:10, fontSize:14 }}>Every square is a commit. Every commit is a step forward.</p>
        </div>
        <div style={{ background:"#0a0a1a", border:"1px solid rgba(0,201,255,0.2)", borderRadius:20, padding:"clamp(16px,3vw,32px)", overflow:"hidden", boxShadow:"0 0 40px rgba(0,201,255,0.08)" }}>
          <img
            src="https://ghchart.rshah.org/00C9FF/Josh-only"
            alt="GitHub Contribution Chart"
            style={{ width:"100%", display:"block", borderRadius:8, filter:"invert(1) hue-rotate(150deg) saturate(2) brightness(1.4) contrast(1.2)" }}
            onError={e => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback if image fails */}
          <div style={{ display:"none", flexDirection:"column", alignItems:"center", gap:16, padding:"40px 0" }}>
            <Github size={40} color="#00C9FF" />
            <p style={{ color:"var(--subtext)", fontSize:14 }}>View contributions on GitHub</p>
            <a href="https://github.com/Josh-only" target="_blank" rel="noopener noreferrer" style={{ padding:"12px 24px", borderRadius:12, textDecoration:"none", background:"rgba(0,201,255,0.1)", border:"1px solid rgba(0,201,255,0.3)", color:"#00C9FF", fontSize:14, fontWeight:600 }}>
              github.com/Josh-only
            </a>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px,1fr))", gap:12, marginTop:16 }}>
          {[
            { label:"Contributions", value:"55+", color:"#00C9FF" },
            { label:"Public Repos", value:"6", color:"#845EC2" },
            { label:"Longest Streak", value:"4 days", color:"#FFD93D" },
            { label:"Top Language", value:"JS", color:"#6BCB77" },
          ].map((s,i)=>(
            <div key={i} style={{ background:"var(--card)", border:`1px solid ${s.color}22`, borderRadius:14, padding:"16px", textAlign:"center" }}>
              <p style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:800, color:s.color, marginBottom:4 }}>{s.value}</p>
              <p style={{ fontSize:12, color:"var(--subtext)", fontWeight:500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── INFLUENCES */}
      <div className="reveal" style={{ opacity:0, transform:"translateY(40px)", transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)", marginBottom:80 }}>
        <div style={{ marginBottom:32 }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#00C9FF" }}>KNOWLEDGE STACK</span>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"var(--heading)", marginTop:8 }}>Who I Learn From</h3>
          <p style={{ color:"var(--subtext)", marginTop:10, fontSize:14 }}>Curated thinkers that inform my approach to business, engineering, and life.</p>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
          {influences.map((inf,i)=>(
            <div key={i} className="reveal" style={{ opacity:0, transform:"translateY(20px)", transition:`all 0.5s ${i*0.08}s cubic-bezier(0.22,1,0.36,1)`, padding:"14px 20px", borderRadius:14, background:"var(--card)", border:`1px solid ${inf.color}25`, cursor:"default", transition:"all 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=`${inf.color}55`;e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=`${inf.color}25`;e.currentTarget.style.transform="translateY(0)";}}
            >
              <p style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:14, color:"var(--heading)", marginBottom:4 }}>{inf.name}</p>
              <p style={{ fontSize:11, color:inf.color, fontWeight:600, letterSpacing:"0.04em" }}>{inf.tag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOOKS */}
      <div className="reveal" style={{ opacity:0, transform:"translateY(40px)", transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)", marginBottom:80 }}>
        <div style={{ marginBottom:32 }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#00C9FF" }}>REFERENCE LIBRARY</span>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"var(--heading)", marginTop:8 }}>Books I've Read</h3>
          <p style={{ color:"var(--subtext)", marginTop:10, fontSize:14 }}>{books.length} books that shaped how I think.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(160px, 1fr))", gap:16 }}>
          {books.map((b,i)=>(
            <div key={i} className="reveal" style={{ opacity:0, transform:"translateY(30px)", background:"var(--card)", border:`1px solid ${b.color}22`, borderRadius:16, padding:20, cursor:"pointer", transition:`all 0.5s ${i*0.05}s cubic-bezier(0.22,1,0.36,1)`, borderTop:`3px solid ${b.color}` }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 16px 40px ${b.color}18`;e.currentTarget.style.borderColor=`${b.color}55`;}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor=`${b.color}22`;}}
            >
              <div style={{ width:32, height:32, borderRadius:8, background:`${b.color}15`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}><BookOpen size={15} color={b.color} /></div>
              <p style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:12, color:"var(--heading)", marginBottom:4, lineHeight:1.4 }}>{b.title}</p>
              <p style={{ fontSize:11, color:b.color, fontWeight:600, marginBottom:8 }}>{b.author}</p>
              <p style={{ fontSize:11, color:"var(--subtext)", lineHeight:1.5 }}>{b.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SPOTIFY */}
      <div className="reveal" style={{ opacity:0, transform:"translateY(40px)", transition:"all 0.7s cubic-bezier(0.22,1,0.36,1)" }}>
        <div style={{ marginBottom:32 }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#1DB954" }}>ATMOSPHERIC INPUT</span>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"var(--heading)", marginTop:8 }}>What I'm Listening To</h3>
          <p style={{ color:"var(--subtext)", marginTop:10, fontSize:14 }}>The playlist running in the background while I build.</p>
        </div>
        <div style={{ borderRadius:20, overflow:"hidden", border:"1px solid rgba(29,185,84,0.2)", boxShadow:"0 20px 60px rgba(29,185,84,0.08)" }}>
          <iframe
            src="https://open.spotify.com/embed/playlist/2k9LJJJV7lZyTIV7aiVmTA?utm_source=generator&theme=0"
            width="100%" height="380" frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy" style={{ display:"block" }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding:"80px 20px", maxWidth:1100, margin:"0 auto" }}>
      <SectionHeader label="Experience" title="Where I've Worked" />
      <div style={{ display:"flex", flexDirection:"column", gap:20, marginTop:48 }}>
        {experience.map((exp,i)=>(
          <GlowCard key={i} color={exp.color} className="reveal" style={{ padding:"clamp(20px,4vw,36px)", opacity:0, transform:"translateY(40px)", transition:`all 0.7s ${i*0.15}s cubic-bezier(0.22,1,0.36,1)` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:16 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:exp.color, boxShadow:`0 0 8px ${exp.color}` }} />
                  <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(15px,2vw,19px)", fontWeight:800, color:"var(--heading)" }}>{exp.role}</h3>
                </div>
                <p style={{ color:exp.color, fontWeight:700, fontSize:14 }}>{exp.company}</p>
                <p style={{ color:"var(--subtext)", fontSize:12, marginTop:2 }}>{exp.location}</p>
              </div>
              <span style={{ padding:"5px 14px", borderRadius:100, background:`${exp.color}12`, color:exp.color, fontSize:12, fontWeight:600, border:`1px solid ${exp.color}30`, whiteSpace:"nowrap" }}>{exp.period}</span>
            </div>
            <ul style={{ paddingLeft:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
              {exp.bullets.map((b,j)=>(
                <li key={j} style={{ display:"flex", gap:10, fontSize:"clamp(12px,1.5vw,14px)", color:"var(--subtext)", lineHeight:1.75 }}>
                  <span style={{ color:exp.color, marginTop:4, flexShrink:0 }}>▸</span>{b}
                </li>
              ))}
            </ul>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding:"80px 20px", maxWidth:1100, margin:"0 auto" }}>
      <SectionHeader label="Projects" title="Things I've Built" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap:24, marginTop:48 }}>
        {projects.map((p,i)=>(
          <GlowCard key={p.id} color={p.color} className="reveal" style={{ display:"flex", flexDirection:"column", opacity:0, transform:"translateY(50px)", transition:`all 0.7s ${i*0.15}s cubic-bezier(0.22,1,0.36,1)`, overflow:"hidden" }}>
            <div style={{ position:"relative", overflow:"hidden", height:190, borderRadius:"20px 20px 0 0" }}>
              <img src={p.image} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top", display:"block", transition:"transform 0.5s ease" }}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              />
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.6) 100%)`, pointerEvents:"none" }} />
              <span style={{ position:"absolute", top:12, right:12, fontSize:10, padding:"4px 10px", borderRadius:6, background:"rgba(0,0,0,0.65)", backdropFilter:"blur(8px)", color:p.color, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", border:`1px solid ${p.color}44` }}>{p.tag}</span>
            </div>
            <div style={{ padding:"20px 22px 22px", display:"flex", flexDirection:"column", flex:1 }}>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:20, fontWeight:800, marginBottom:4, color:"var(--heading)" }}>{p.name}</h3>
              <p style={{ fontSize:11, color:p.color, fontWeight:600, marginBottom:10, fontFamily:"monospace" }}>{p.stack}</p>
              <p style={{ fontSize:13, color:"var(--subtext)", lineHeight:1.75, marginBottom:14 }}>{p.desc}</p>
              <ul style={{ paddingLeft:0, listStyle:"none", display:"flex", flexDirection:"column", gap:7, marginBottom:20, flex:1 }}>
                {p.bullets.map((b,j)=>(
                  <li key={j} style={{ display:"flex", gap:8, fontSize:12, color:"var(--subtext)", lineHeight:1.65 }}>
                    <span style={{ color:p.color, flexShrink:0, marginTop:3 }}>◆</span>{b}
                  </li>
                ))}
              </ul>
              <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px", borderRadius:11, textDecoration:"none", border:`1px solid ${p.color}30`, background:`${p.color}08`, color:p.color, fontSize:13, fontWeight:700, transition:"all 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=`${p.color}18`;e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=`${p.color}08`;e.currentTarget.style.transform="translateY(0)";}}
              ><Github size={14} /> View on GitHub <ArrowUpRight size={12} /></a>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding:"80px 20px", maxWidth:1100, margin:"0 auto" }}>
      <SectionHeader label="Skills" title="What I Work With" />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginTop:48 }}>
        {Object.entries(skills).map(([cat,{icon:Icon,color,items}],i)=>(
          <GlowCard key={cat} color={color} className="reveal" style={{ padding:24, opacity:0, transform:"translateY(40px)", transition:`all 0.6s ${i*0.1}s cubic-bezier(0.22,1,0.36,1)` }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{ width:36, height:36, borderRadius:9, background:`${color}12`, border:`1px solid ${color}25`, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon size={16} color={color} /></div>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontSize:14, fontWeight:800, color:"var(--heading)" }}>{cat}</h3>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {items.map(item=>(
                <div key={item} style={{ padding:"6px 12px", borderRadius:7, background:"var(--tag-bg)", border:"1px solid var(--border)", fontSize:12, color:"var(--text)", fontWeight:500, transition:"all 0.15s", cursor:"default" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=`${color}10`;e.currentTarget.style.color=color;e.currentTarget.style.borderColor=`${color}30`;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="var(--tag-bg)";e.currentTarget.style.color="var(--text)";e.currentTarget.style.borderColor="var(--border)";}}
                >{item}</div>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding:"80px 20px 120px", maxWidth:700, margin:"0 auto", textAlign:"center" }}>
      <SectionHeader label="Contact" title="Let's Work Together" centered />
      <p className="reveal" style={{ color:"var(--subtext)", fontSize:"clamp(13px,1.5vw,16px)", lineHeight:1.85, marginBottom:40, marginTop:20, opacity:0, transform:"translateY(20px)", transition:"all 0.7s 0.2s cubic-bezier(0.22,1,0.36,1)" }}>
        I'm actively seeking internships, collaborations, and entry-level opportunities. Whether you have a project in mind or just want to connect — my inbox is always open.
      </p>
      <div className="reveal" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", opacity:0, transform:"translateY(20px)", transition:"all 0.7s 0.35s cubic-bezier(0.22,1,0.36,1)" }}>
        {[
          {icon:Mail, label:"toluwanioyebade@gmail.com", href:"mailto:toluwanioyebade@gmail.com", color:"#00C9FF"},
          {icon:Phone, label:"+234-911-571-5638", href:"tel:+2349115715638", color:"#6BCB77"},
          {icon:Github, label:"Josh-only", href:"https://github.com/Josh-only", color:"#845EC2"},
          {icon:Linkedin, label:"toluwani-oyebade", href:"https://linkedin.com/in/toluwani-oyebade", color:"#FFD93D"},
        ].map(c=>(
          <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 18px", borderRadius:13, textDecoration:"none", background:"var(--card)", border:"1px solid var(--border)", color:"var(--text)", fontSize:"clamp(11px,1.5vw,13px)", fontWeight:600, transition:"all 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=`${c.color}44`;e.currentTarget.style.color=c.color;e.currentTarget.style.transform="translateY(-3px)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--text)";e.currentTarget.style.transform="translateY(0)";}}
          ><c.icon size={14} color={c.color} /> {c.label}</a>
        ))}
      </div>
    </section>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sections = ["home","about","experience","projects","skills","contact"];
  const sectionLabels = ["Home","About","Experience","Projects","Skills","Contact"];

  useScrollReveal();

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e=>{ if(e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.25 }
    );
    sections.forEach(id=>{ const el=document.getElementById(id); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  }, []);

  const theme = {
    "--bg": dark?"#06060f":"#f4f6fb",
    "--card": dark?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.9)",
    "--border": dark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)",
    "--text": dark?"#e8e8f0":"#1a1a2e",
    "--heading": dark?"#ffffff":"#0a0a1a",
    "--subtext": dark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.55)",
    "--tag-bg": dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",
    "--dot": dark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.15)",
    "--accent": "#00C9FF",
    "--nav-bg": dark?"rgba(6,6,15,0.92)":"rgba(244,246,251,0.92)",
  };

  return (
    <div style={{ ...theme, background:"var(--bg)", color:"var(--text)", fontFamily:"'DM Sans', sans-serif", transition:"background 0.4s, color 0.4s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,201,255,0.3);border-radius:10px}
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,20px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-30px)}}
        @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}
        @keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(0,201,255,0.4)}50%{opacity:0.7;box-shadow:0 0 0 6px rgba(0,201,255,0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes glowPulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:0.7;transform:scale(1.05)}}
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr !important}
          .hero-avatar{display:none !important}
          .about-grid{grid-template-columns:1fr !important}
        }
      `}</style>

      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, background: dark?"radial-gradient(ellipse 80% 60% at 10% 0%, rgba(0,201,255,0.04) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(132,94,194,0.04) 0%, transparent 50%)":"none" }} />

      {/* NAVBAR */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, background:"var(--nav-bg)", backdropFilter:"blur(24px)", borderBottom:"1px solid var(--border)", padding:"0 clamp(16px,4vw,32px)", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'Syne', sans-serif", fontSize:18, fontWeight:800, letterSpacing:"-0.5px", color:"var(--heading)" }}>T<span style={{ color:"#00C9FF" }}>.</span>O</span>

        {/* Desktop dots */}
        <div className="desktop-nav" style={{ display:"flex", gap:8, alignItems:"center" }}>
          {sections.map((s,i)=><NavDot key={s} active={activeSection===s} onClick={()=>scrollTo(s)} label={sectionLabels[i]} />)}
        </div>

        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {/* Dark/light */}
          <button onClick={()=>setDark(d=>!d)} style={{ width:38, height:38, borderRadius:9, background:"var(--card)", border:"1px solid var(--border)", color:"var(--subtext)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>
            {dark?<Sun size={15} />:<Moon size={15} />}
          </button>
          {/* Mobile menu */}
          <button onClick={()=>setMenuOpen(m=>!m)} style={{ width:38, height:38, borderRadius:9, background:"var(--card)", border:"1px solid var(--border)", color:"var(--subtext)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            {menuOpen?<X size={15} />:<Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div style={{ position:"fixed", top:64, left:0, right:0, zIndex:999, background:"var(--nav-bg)", backdropFilter:"blur(24px)", borderBottom:"1px solid var(--border)", padding:"16px 24px", display:"flex", flexDirection:"column", gap:4 }}>
          {sectionLabels.map((label,i)=>(
            <button key={label} onClick={()=>scrollTo(sections[i])} style={{ padding:"12px 16px", borderRadius:10, border:"none", background:activeSection===sections[i]?"rgba(0,201,255,0.1)":"transparent", color:activeSection===sections[i]?"#00C9FF":"var(--text)", fontSize:14, fontWeight:600, cursor:"pointer", textAlign:"left", fontFamily:"'DM Sans', sans-serif", transition:"all 0.15s" }}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div style={{ paddingTop:64, position:"relative", zIndex:1 }}>
        <Hero /><About /><Experience /><Projects /><Skills /><Contact />
      </div>

      <footer style={{ borderTop:"1px solid var(--border)", padding:"20px clamp(16px,4vw,32px)", textAlign:"center", color:"var(--subtext)", fontSize:12, position:"relative", zIndex:1 }}>
      Designed & Developed by Toluwani Oyebade · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
