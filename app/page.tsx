"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ─── Data ─────────────────────────────────────────────────── */
const NAV = [["О себе","about"],["Проекты","projects"],["Стек","stack"],["Цены","prices"],["Контакт","contact"]];
const ROLES = ["Web Developer","Next.js Engineer","Full-Stack Builder","UI/UX Enthusiast"];

const PROJECTS = [
  { name:"Albatros Tur", tag:"Коммерческий сайт", desc:"Туристическое агентство из Молдовы. Каталог туров и пляжей, мультиязычность RO/RU, форма бронирования, Supabase база данных.", url:"https://albatrostur-site.vercel.app", stack:["Next.js 15","Supabase","Tailwind","i18n"], emoji:"✈️", live:true },
  { name:"UNDEMERGEM",   tag:"Стартап",           desc:"Агрегатор активностей и мест отдыха в Молдове. Интерактивная карта с пинами, фильтры по категориям, система бронирования.",  url:"#",                                    stack:["Next.js","Mapbox","Supabase","TypeScript"], emoji:"🗺️", live:false },
];

const STACK = [
  {n:"Next.js",    c:"#ffffff"}, {n:"React",      c:"#61dafb"},
  {n:"TypeScript", c:"#3178c6"}, {n:"Tailwind",   c:"#06b6d4"},
  {n:"Supabase",   c:"#3ecf8e"}, {n:"PostgreSQL",  c:"#336791"},
  {n:"Vercel",     c:"#ffffff"}, {n:"Git",         c:"#f34f29"},
];

const PRICES = [
  { name:"Лендинг",    price:"250–500 €",  desc:"Одностраничный промо-сайт",   items:["Адаптивный дизайн","Форма обратной связи","Оптимизация скорости","Деплой на Vercel"],  c:"#a855f7" },
  { name:"Сайт",       price:"600–1200 €", desc:"Многостраничный бизнес-сайт", items:["До 6 страниц","База данных Supabase","Несколько языков","Деплой + домен"],             c:"#06b6d4", hot:true },
  { name:"Приложение", price:"от 2000 €",  desc:"Полноценное веб-приложение",  items:["Авторизация","Личный кабинет","API интеграции","Поддержка 1 месяц"],                    c:"#f43f5e" },
];

/* ─── Intro splash ──────────────────────────────────────────── */
function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => { setPhase(2); onDone(); }, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  if (phase === 2) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{
      background: "#07070f",
      opacity: phase === 1 ? 0 : 1,
      pointerEvents: phase >= 1 ? "none" : "all",
      transition: "opacity 0.7s ease",
    }}>
      <div style={{
        fontSize: "clamp(72px,18vw,180px)", fontWeight: 900,
        background: "linear-gradient(135deg,#e879f9,#a855f7,#06b6d4)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        transform: phase === 1 ? "scale(6)" : "scale(1)",
        opacity: phase === 1 ? 0 : 1,
        transition: "transform 0.75s cubic-bezier(.4,0,.2,1), opacity 0.5s",
        letterSpacing: "-2px",
      }}>GS.</div>
    </div>
  );
}

/* ─── Scroll progress bar ───────────────────────────────────── */
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const upd = () => {
      const el = document.documentElement;
      setW(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100);
    };
    window.addEventListener("scroll", upd, { passive: true });
    return () => window.removeEventListener("scroll", upd);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[999] h-[2px] transition-none pointer-events-none"
      style={{ width: `${w}%`, background: "linear-gradient(90deg,#a855f7,#06b6d4,#f43f5e)" }} />
  );
}

/* ─── Custom cursor ─────────────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf: number;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13;
      ring.current.y += (pos.current.y - ring.current.y) * 0.13;
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 22}px,${ring.current.y - 22}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    const big = () => { if (ringRef.current) { ringRef.current.style.width = "60px"; ringRef.current.style.height = "60px"; ringRef.current.style.borderColor = "rgba(168,85,247,0.9)"; } };
    const sm  = () => { if (ringRef.current) { ringRef.current.style.width = "44px"; ringRef.current.style.height = "44px"; ringRef.current.style.borderColor = "rgba(168,85,247,0.45)"; } };
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", big); el.addEventListener("mouseleave", sm); });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dotRef}  className="fixed top-0 left-0 z-[9998] pointer-events-none w-2 h-2 rounded-full bg-purple-400"
        style={{ mixBlendMode: "difference", willChange: "transform" }} />
      <div ref={ringRef} className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
        style={{ width: 44, height: 44, border: "1.5px solid rgba(168,85,247,0.45)", transition: "width .3s, height .3s, border-color .3s", willChange: "transform" }} />
    </>
  );
}

/* ─── Count-up ──────────────────────────────────────────────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let v = 0;
      const step = target / 50;
      const id = setInterval(() => {
        v += step;
        if (v >= target) { setN(target); clearInterval(id); }
        else setN(Math.floor(v));
      }, 20);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Glitch text ───────────────────────────────────────────── */
function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [active, setActive] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const start = () => {
    setActive(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(false), 520);
  };
  return (
    <span className={`relative inline-block select-none ${className}`} onMouseEnter={start}>
      {active && (
        <>
          <span className="glitch-1 absolute inset-0" aria-hidden
            style={{ color: "#ff0080", WebkitTextFillColor: "#ff0080" }}>{text}</span>
          <span className="glitch-2 absolute inset-0" aria-hidden
            style={{ color: "#06b6d4", WebkitTextFillColor: "#06b6d4" }}>{text}</span>
        </>
      )}
      <span className="g-text">{text}</span>
    </span>
  );
}

/* ─── Infinite marquee ──────────────────────────────────────── */
function Marquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right,#07070f,transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left,#07070f,transparent)" }} />
      <div className="marquee-track flex gap-5 w-max">
        {items.map(({ n, c }, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-2xl shrink-0"
            style={{ background: "rgba(10,10,20,0.85)", border: "1px solid rgba(168,85,247,0.18)" }}>
            <div className="w-3 h-3 rounded-full shrink-0"
              style={{ background: c, boxShadow: `0 0 10px ${c}99` }} />
            <span className="font-bold text-sm text-slate-200 whitespace-nowrap">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Magnetic button ───────────────────────────────────────── */
function MagBtn({ href, children, style, className = "", target = "_self", rel = "" }: {
  href: string; children: React.ReactNode; style?: React.CSSProperties;
  className?: string; target?: string; rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mv  = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left - r.width / 2)  * 0.35;
    const y  = (e.clientY - r.top  - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const lv = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} target={target} rel={rel} className={`transition-transform duration-300 ${className}`}
      style={style} onMouseMove={mv} onMouseLeave={lv}>
      {children}
    </a>
  );
}

/* ─── Typewriter ────────────────────────────────────────────── */
function useTypewriter(texts: string[]) {
  const [out, setOut] = useState("");
  const [i, setI]     = useState(0);
  const [ch, setCh]   = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = texts[i];
    if (!del && ch < cur.length)  { const t = setTimeout(() => setCh(c => c + 1), 80);    return () => clearTimeout(t); }
    if (!del && ch === cur.length){ const t = setTimeout(() => setDel(true), 2000);        return () => clearTimeout(t); }
    if (del  && ch > 0)           { const t = setTimeout(() => setCh(c => c - 1), 40);    return () => clearTimeout(t); }
    if (del  && ch === 0)         { setDel(false); setI(x => (x + 1) % texts.length); }
  }, [ch, del, i, texts]);
  useEffect(() => { setOut(texts[i].slice(0, ch)); }, [ch, i, texts]);
  return out;
}

/* ─── 3D Tilt card ──────────────────────────────────────────── */
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref  = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });
  const move = useCallback((e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale3d(1.03,1.03,1.03)`;
    setGlow({ x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100, on: true });
  }, []);
  const leave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    setGlow(g => ({ ...g, on: false }));
  }, []);
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave}
      className={`rounded-3xl transition-transform duration-200 relative overflow-hidden ${className}`}
      style={{ transformStyle: "preserve-3d", background: "rgba(10,10,20,0.85)", backdropFilter: "blur(20px)", border: "1px solid rgba(168,85,247,0.2)", ...style }}>
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{
        opacity: glow.on ? 1 : 0,
        background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(168,85,247,0.18) 0%, transparent 60%)`,
      }} />
      {children}
    </div>
  );
}

/* ─── Scroll reveal ─────────────────────────────────────────── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ─── Stars ─────────────────────────────────────────────────── */
function Stars() {
  const stars = useRef(Array.from({ length: 60 }, () => ({
    x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2 + 0.5, d: Math.random() * 3 + 1, delay: Math.random() * 4,
  }))).current;
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{
          left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s,
          animation: `twinkle ${s.d}s ease-in-out ${s.delay}s infinite`, opacity: 0.3,
        }} />
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const role = useTypewriter(ROLES);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu]         = useState(false);
  const [mouse, setMouse]       = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => { if (sessionStorage.getItem("intro_seen")) setShowIntro(false); }, []);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 50);
    const m = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", s);
    window.addEventListener("mousemove", m);
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("mousemove", m); };
  }, []);
  const handleIntroDone = useCallback(() => { sessionStorage.setItem("intro_seen", "1"); setShowIntro(false); }, []);

  return (
    <div className="min-h-screen relative">
      {showIntro && <Intro onDone={handleIntroDone} />}
      <ScrollProgress />
      <CustomCursor />
      <Stars />

      {/* Cursor glow */}
      <div className="fixed pointer-events-none z-50" style={{
        left: mouse.x - 200, top: mouse.y - 200, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)",
        borderRadius: "50%", transition: "left .08s,top .08s",
      }} />

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle,#a855f7,transparent 70%)" }} />
        <div className="blob absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle,#06b6d4,transparent 70%)", animationDelay: "3s" }} />
        <div className="blob absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl" style={{ background: "radial-gradient(circle,#f43f5e,transparent 70%)", animationDelay: "6s" }} />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 inset-x-0 z-40 transition-all duration-500" style={{
        background: scrolled ? "rgba(7,7,15,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(168,85,247,0.15)" : "none",
      }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-black text-xl g-text tracking-tight">GS.</span>
          <nav className="hidden md:flex gap-8">
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
          <MagBtn href="#contact" className="hidden md:inline-flex items-center text-sm font-bold px-5 py-2.5 rounded-full text-white"
            style={{ background: "linear-gradient(135deg,#a855f7,#06b6d4)" }}>
            Нанять меня
          </MagBtn>
          <button className="md:hidden" onClick={() => setMenu(!menu)}>
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menu ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menu ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menu ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
        {menu && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4" style={{ background: "rgba(7,7,15,0.97)" }}>
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="text-slate-300 hover:text-white py-1 text-sm">{l}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 text-emerald-400"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Открыт для новых проектов
            </div>

            <h1 className="font-black leading-[0.9] tracking-tight mb-6" style={{ fontSize: "clamp(52px,9vw,96px)" }}>
              Grigorii<br />
              <GlitchText text="Slicov" />
            </h1>

            <div className="h-9 flex items-center mb-6">
              <span className="text-xl md:text-2xl font-bold text-slate-300">
                {role}
                <span className="inline-block w-0.5 h-6 bg-purple-400 ml-1 align-middle animate-pulse" />
              </span>
            </div>

            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-md">
              Создаю современные сайты и приложения на Next.js.<br />
              Быстро, красиво, под ключ. Из Молдовы 🇲🇩
            </p>

            <div className="flex flex-wrap gap-4">
              <MagBtn href="#projects"
                className="inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg,#a855f7,#06b6d4)", boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}>
                Мои проекты →
              </MagBtn>
              <MagBtn href="#contact"
                className="inline-flex items-center px-8 py-4 rounded-2xl font-bold text-slate-300 text-sm border border-white/10 hover:border-purple-500/50 hover:text-white transition-colors">
                Написать
              </MagBtn>
            </div>
          </div>

          {/* Right — Photo */}
          <div className="flex justify-center items-center relative">
            <div className="ring-spin absolute rounded-full" style={{
              width: 300, height: 300,
              background: "conic-gradient(#ff0080,#ff8c00,#ffed00,#00ff9f,#00b3ff,#a855f7,#ff0080)",
              padding: 3, borderRadius: "50%", filter: "blur(2px)",
            }} />
            <div className="float relative rounded-full overflow-hidden" style={{ width: 280, height: 280, border: "4px solid rgba(7,7,15,0.9)" }}>
              <Image src="/photo.jpg" alt="Grigorii Slicov" fill className="object-cover object-top" priority />
            </div>
            {[
              { l: "Next.js",  top: "8%",  left: "-12%",  d: "0s" },
              { l: "Supabase", top: "80%", left: "-16%",  d: "0.7s" },
              { l: "React",    top: "8%",  right: "-12%", d: "1.4s" },
              { l: "Vercel",   top: "80%", right: "-16%", d: "2.1s" },
            ].map(({ l, d, ...pos }) => (
              <div key={l} className="float absolute glass rounded-2xl px-4 py-2 text-xs font-bold text-slate-200 hidden md:flex items-center"
                style={{ ...(pos as React.CSSProperties), animationDelay: d, border: "1px solid rgba(255,255,255,0.15)" }}>
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 flex flex-col items-center gap-2 text-xs animate-bounce">
          scroll
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4 g-text">— О себе</p>
            <h2 className="text-4xl md:text-5xl font-black mb-12">
              Начинающий разработчик<br />
              <span className="g-text">с реальными проектами</span>
            </h2>
          </Reveal>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { num: 2,   suffix: "",   label: "Проекта" },
              { num: 8,   suffix: "+",  label: "Технологий" },
              { num: 100, suffix: "%",  label: "Честность" },
            ].map(({ num, suffix, label }, i) => (
              <Reveal key={label} delay={i * 0.1}>
                <div className="text-center glass rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl md:text-4xl font-black g-text"><CountUp target={num} suffix={suffix} /></div>
                  <div className="text-slate-500 text-xs mt-1">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚀", title: "Быстрая разработка", desc: "Запускаю проекты за 1–4 недели, без затяжных обсуждений." },
              { icon: "💎", title: "Современный стек",   desc: "Next.js, Supabase, Tailwind — то, что используют топовые компании." },
              { icon: "🤝", title: "Открытое общение",   desc: "Всегда на связи, показываю прогресс, довожу до конца." },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.12}>
                <TiltCard className="p-7 h-full">
                  <div className="text-4xl mb-4">{c.icon}</div>
                  <div className="font-black text-lg mb-2">{c.title}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 glass rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative rounded-2xl overflow-hidden shrink-0" style={{ width: 120, height: 120 }}>
                <Image src="/photo.jpg" alt="Grigorii" fill className="object-cover object-top" />
              </div>
              <div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Я из Кишинёва. Изучаю веб-разработку самостоятельно и уже создал несколько коммерческих проектов — туристический сайт с базой данных и стартап-платформу для активностей в Молдове.
                </p>
                <div className="flex flex-wrap gap-3">
                  <MagBtn href="tel:+37369721294"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: "#25d366" }}>
                    +373 69 721 294
                  </MagBtn>
                  <MagBtn href="https://t.me/targetboomerang" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                    style={{ background: "#229ed9" }}>
                    Telegram
                  </MagBtn>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4 g-text">— Проекты</p>
            <h2 className="text-4xl md:text-5xl font-black mb-16">Реальные работы</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.15}>
                <TiltCard className="p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl">{p.emoji}</div>
                    {p.live ? (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
                      </a>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}>
                        В разработке
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#a855f7" }}>{p.tag}</div>
                  <h3 className="font-black text-2xl mb-3">{p.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map(s => (
                      <span key={s} className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: "rgba(168,85,247,0.1)", color: "#d8b4fe", border: "1px solid rgba(168,85,247,0.15)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STACK — infinite marquee ── */}
      <section id="stack" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4 g-text">— Технологии</p>
            <h2 className="text-4xl md:text-5xl font-black mb-16">Мой стек</h2>
          </Reveal>
          <Marquee />
        </div>
      </section>

      {/* ── PRICES ── */}
      <section id="prices" className="relative z-10 py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4 g-text">— Цены</p>
            <h2 className="text-4xl md:text-5xl font-black mb-3">Стоимость</h2>
            <p className="text-slate-500 mb-16">Точная цена обсуждается индивидуально</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICES.map(({ name, price, desc, items, c, hot }, i) => (
              <Reveal key={name} delay={i * 0.12}>
                <TiltCard className="p-8 h-full flex flex-col"
                  style={hot ? { boxShadow: `0 0 60px ${c}35`, border: `1px solid ${c}60` } : {}}>
                  {hot && (
                    <div className="text-center mb-4">
                      <span className="text-xs font-black px-4 py-1 rounded-full text-white" style={{ background: c }}>Популярный</span>
                    </div>
                  )}
                  <h3 className="font-black text-xl mb-1">{name}</h3>
                  <p className="text-slate-500 text-sm mb-5">{desc}</p>
                  <div className="text-4xl font-black mb-6" style={{ color: c }}>{price}</div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {items.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                          style={{ background: `${c}20`, color: c }}>✓</div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagBtn href="#contact" className="block w-full text-center py-3.5 rounded-2xl font-bold text-sm"
                    style={hot ? { background: c, color: "#fff" } : { border: `1px solid ${c}40`, color: c }}>
                    Обсудить проект
                  </MagBtn>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative z-10 py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4 g-text">— Контакт</p>
            <h2 className="text-5xl md:text-6xl font-black mb-4">Есть проект?</h2>
            <p className="text-slate-400 mb-14 text-lg">Напиши — отвечу в течение нескольких часов.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <TiltCard className="p-2 mb-8 text-left">
              {[
                { icon: "📱", label: "Телефон",  val: "+373 69 721 294",    href: "tel:+37369721294" },
                { icon: "✉️", label: "Email",    val: "grisha.009@mail.ru", href: "mailto:grisha.009@mail.ru" },
                { icon: "✈️", label: "Telegram", val: "@targetboomerang",   href: "https://t.me/targetboomerang" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4 px-6 py-5 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "rgba(168,85,247,0.12)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-0.5">{item.label}</div>
                    <a href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-semibold hover:text-white transition-colors" style={{ color: "#c084fc" }}>
                      {item.val}
                    </a>
                  </div>
                </div>
              ))}
            </TiltCard>
          </Reveal>
          <Reveal delay={0.2}>
            <MagBtn href="https://t.me/targetboomerang" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-white text-base"
              style={{ background: "linear-gradient(135deg,#a855f7,#06b6d4)", boxShadow: "0 0 60px rgba(168,85,247,0.5)" }}>
              Написать в Telegram →
            </MagBtn>
          </Reveal>
        </div>
      </section>

      <footer className="relative z-10 py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-slate-600">
          <span className="font-black g-text text-lg">GS.</span>
          <span>© {new Date().getFullYear()} Grigorii Slicov</span>
        </div>
      </footer>
    </div>
  );
}
