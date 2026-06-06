"use client";
import { useState, useEffect, useRef } from "react";

const NAV = [["О себе", "about"], ["Проекты", "projects"], ["Стек", "stack"], ["Цены", "prices"], ["Контакт", "contact"]];

const PROJECTS = [
  {
    name: "Albatros Tur",
    desc: "Коммерческий сайт туристического агентства. Каталог туров и пляжей, мультиязычность RO/RU, форма бронирования, Supabase база данных.",
    url: "https://albatrostur-site.vercel.app",
    tags: ["Next.js 15", "Supabase", "Tailwind", "i18n"],
    gradient: "from-blue-600 to-cyan-500",
    emoji: "✈️",
  },
  {
    name: "UNDEMERGEM",
    desc: "Стартап-агрегатор активностей и мест отдыха в Молдове. Карта с пинами, фильтры, бронирование — аналог Airbnb Experiences.",
    url: "#",
    tags: ["Next.js", "Mapbox", "Supabase", "TypeScript"],
    gradient: "from-violet-600 to-purple-500",
    emoji: "🗺️",
    wip: true,
  },
];

const STACK = [
  { name: "Next.js", color: "#ffffff", bg: "rgba(255,255,255,0.07)" },
  { name: "React", color: "#61dafb", bg: "rgba(97,218,251,0.07)" },
  { name: "TypeScript", color: "#3178c6", bg: "rgba(49,120,198,0.07)" },
  { name: "Tailwind CSS", color: "#06b6d4", bg: "rgba(6,182,212,0.07)" },
  { name: "Supabase", color: "#3ecf8e", bg: "rgba(62,207,142,0.07)" },
  { name: "Vercel", color: "#ffffff", bg: "rgba(255,255,255,0.07)" },
  { name: "PostgreSQL", color: "#336791", bg: "rgba(51,103,145,0.07)" },
  { name: "Git", color: "#f34f29", bg: "rgba(243,79,41,0.07)" },
];

const PRICES = [
  {
    name: "Лендинг",
    price: "250–500 €",
    desc: "Одностраничный промо-сайт",
    features: ["Адаптивный дизайн", "Форма обратной связи", "Оптимизация скорости", "Деплой на Vercel"],
    accent: "#6366f1",
  },
  {
    name: "Сайт",
    price: "600–1200 €",
    desc: "Многостраничный бизнес-сайт",
    features: ["До 6 страниц", "База данных Supabase", "Несколько языков", "Деплой + настройка домена"],
    accent: "#06b6d4",
    popular: true,
  },
  {
    name: "Приложение",
    price: "от 1500 €",
    desc: "Полноценное веб-приложение",
    features: ["Авторизация", "Личный кабинет", "API интеграции", "Поддержка 1 месяц"],
    accent: "#8b5cf6",
  },
];

function useTypewriter(texts: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, idx, texts, speed, pause]);

  useEffect(() => { setDisplay(texts[idx].slice(0, charIdx)); }, [charIdx, idx, texts]);
  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Section({ id, children, className = "", style }: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useInView();
  return (
    <section id={id} ref={ref} style={style} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const role = useTypewriter(["Web Developer", "Next.js Engineer", "Full-Stack Builder", "UI/UX Enthusiast"]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Cursor glow */}
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: mouse.x - 150, top: mouse.y - 150,
          width: 300, height: 300,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-glow" style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-glow" style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", animationDelay: "2s" }} />
        <div className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl animate-glow" style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", animationDelay: "4s" }} />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500" style={{
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-black text-xl gradient-text tracking-tight">GS.</span>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 hover:translate-y-[-1px] inline-block">
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:block text-sm font-bold px-5 py-2.5 rounded-full text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}>
            Нанять меня
          </a>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64" : "max-h-0"}`}
          style={{ background: "rgba(10,10,15,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-6 py-4 flex flex-col gap-4">
            {NAV.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="text-slate-300 hover:text-white transition-colors py-1 text-sm">{label}</a>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 text-emerald-400"
            style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Открыт для новых проектов
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="font-black leading-none tracking-tight mb-4" style={{ fontSize: "clamp(56px, 12vw, 120px)" }}>
            Grigorii<br />
            <span className="gradient-text">Slicov</span>
          </h1>
        </div>

        <div className="animate-slide-up h-10 flex items-center justify-center mb-6" style={{ animationDelay: "0.2s" }}>
          <p className="text-xl md:text-2xl font-bold text-slate-300">
            {role}
            <span className="inline-block w-0.5 h-6 bg-indigo-400 ml-1 animate-pulse align-middle" />
          </p>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="text-slate-500 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
            Создаю современные сайты и приложения.<br />Быстро, красиво, под ключ. Из Молдовы 🇲🇩
          </p>
        </div>

        <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center mb-20" style={{ animationDelay: "0.4s" }}>
          <a href="#projects" className="px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", boxShadow: "0 0 40px rgba(99,102,241,0.35)" }}>
            Смотреть проекты →
          </a>
          <a href="#contact" className="px-8 py-4 rounded-2xl font-bold text-slate-300 text-sm border border-white/10 hover:border-indigo-500/50 hover:text-white transition-all duration-300">
            Написать мне
          </a>
        </div>

        {/* Floating tech badges */}
        <div className="animate-slide-up relative w-full max-w-xl h-16" style={{ animationDelay: "0.5s" }}>
          <div className="flex justify-center gap-3 flex-wrap">
            {["Next.js", "React", "TypeScript", "Supabase", "Tailwind"].map((tech, i) => (
              <span key={tech} className="animate-float px-4 py-2 rounded-full text-xs font-bold text-slate-300 card-glass"
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${3 + i * 0.5}s` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs animate-bounce">
          <span>scroll</span>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" className="py-28 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4" style={{ color: "#818cf8" }}>— О себе</p>
            <h2 className="text-4xl font-black mb-6 leading-tight">
              Начинающий разработчик<br />
              <span className="gradient-text">с реальными проектами</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Я из Кишинёва. Изучаю веб-разработку самостоятельно и уже сдал несколько коммерческих проектов — сайт туристического агентства с базой данных и стартап-платформу для активностей.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Работаю быстро, общаюсь открыто и довожу проект до конца. Если тебе нужен качественный сайт — я знаю, как его сделать.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/37369083514" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: "#25d366" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.882l6.198-1.624A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.801 9.801 0 01-5.001-1.374l-.358-.213-3.721.976.993-3.628-.233-.373A9.792 9.792 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
                WhatsApp
              </a>
              <a href="https://t.me/slicovgrigorii" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: "#229ed9" }}>
                Telegram
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="card-glass rounded-3xl p-8 w-72 animate-float relative z-10">
              <div className="text-5xl mb-5 text-center">👨‍💻</div>
              <div className="text-center font-black text-xl mb-1">Grigorii Slicov</div>
              <div className="text-center text-sm mb-6 gradient-text font-semibold">Web Developer</div>
              <div className="space-y-3">
                {[["📍","Кишинёв, Молдова"],["💼","Фриланс / Удалённо"],["🌐","RO / RU / EN"],["⚡","Готов к работе"]].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="text-base">{icon}</span>{text}
                  </div>
                ))}
              </div>
            </div>
            {/* Glow behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)" }} />
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4" style={{ color: "#818cf8" }}>— Проекты</p>
            <h2 className="text-4xl font-black">Реальные работы</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div key={p.name} className="group card-glass rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden cursor-pointer">
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.05))` }} />
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500 bg-gradient-to-br ${p.gradient}`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.emoji}</div>
                    {p.wip ? (
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}>
                        В разработке
                      </span>
                    ) : (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all hover:scale-105"
                        style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.25)" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </a>
                    )}
                  </div>

                  <h3 className="font-black text-2xl mb-3 group-hover:gradient-text transition-all">{p.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.15)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* STACK */}
      <Section id="stack" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4" style={{ color: "#22d3ee" }}>— Технологии</p>
            <h2 className="text-4xl font-black">Мой стек</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STACK.map((s, i) => (
              <div key={s.name} className="card-glass rounded-2xl p-5 text-center group hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="w-3 h-3 rounded-full mx-auto mb-3 transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg" style={{ background: s.color, boxShadow: `0 0 0 0 ${s.color}` }} />
                <div className="font-bold text-sm text-slate-200">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICES */}
      <Section id="prices" className="py-28 px-6" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[4px] mb-4" style={{ color: "#818cf8" }}>— Цены</p>
            <h2 className="text-4xl font-black mb-3">Стоимость разработки</h2>
            <p className="text-slate-500">Точная цена обсуждается индивидуально под твой проект</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICES.map((p) => (
              <div key={p.name} className="card-glass rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
                style={p.popular ? { border: `1px solid ${p.accent}30`, background: `${p.accent}06` } : {}}>

                {p.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="text-xs font-black px-5 py-1 rounded-b-xl text-white" style={{ background: p.accent }}>
                      Популярный
                    </div>
                  </div>
                )}

                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500" style={{ background: p.accent }} />

                <div className="relative z-10">
                  <h3 className="font-black text-xl mb-2 mt-3">{p.name}</h3>
                  <p className="text-slate-500 text-sm mb-5">{p.desc}</p>
                  <div className="text-4xl font-black mb-6" style={{ color: p.accent }}>{p.price}</div>

                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0" style={{ background: `${p.accent}20`, color: p.accent }}>✓</div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className="block w-full text-center py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-105"
                    style={p.popular ? { background: p.accent, color: "#fff" } : { border: `1px solid ${p.accent}30`, color: p.accent }}>
                    Обсудить проект
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[4px] mb-4" style={{ color: "#818cf8" }}>— Контакт</p>
          <h2 className="text-5xl font-black mb-4">Есть проект?</h2>
          <p className="text-slate-400 mb-12 text-lg">Напиши мне — отвечу быстро и обсудим детали.</p>

          <div className="card-glass rounded-3xl p-2 mb-8">
            {[
              { icon: "📱", label: "WhatsApp / Telegram", val: "+373 69 083 514", href: "https://wa.me/37369083514" },
              { icon: "✉️", label: "Email", val: "leelisalee.13@gmail.com", href: "mailto:leelisalee.13@gmail.com" },
              { icon: "📍", label: "Локация", val: "Молдова, Кишинёв", href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 px-6 py-5 rounded-2xl hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-all group-hover:scale-110" style={{ background: "rgba(99,102,241,0.12)" }}>
                  {item.icon}
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-600 mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold transition-colors hover:text-white" style={{ color: "#818cf8" }}>
                      {item.val}
                    </a>
                  ) : (
                    <div className="font-semibold text-slate-300">{item.val}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a href="https://wa.me/37369083514" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-white text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", boxShadow: "0 0 50px rgba(99,102,241,0.4)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.527 5.845L.057 23.882l6.198-1.624A11.935 11.935 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.801 9.801 0 01-5.001-1.374l-.358-.213-3.721.976.993-3.628-.233-.373A9.792 9.792 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
            Написать в WhatsApp →
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-sm text-slate-600">
          <span className="font-black gradient-text text-lg">GS.</span>
          <span>© {new Date().getFullYear()} Grigorii Slicov — Web Developer</span>
        </div>
      </footer>
    </div>
  );
}
