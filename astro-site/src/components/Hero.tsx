import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── Constants ─────────────────────────────────────── */
const ORANGE      = 'rgb(251 146 60)';                 /* orange-400 — accent text */
const EMBER       = 'rgb(249 115 22)';                 /* orange-500 — glows/solids */
const EMBER_GLOW  = '0 0 8px rgba(249,115,22,0.6)';

/* ── Predefined star positions (avoids SSR/hydration mismatch) ── */
const STARS = [
  { x:  5.2, y: 12.4, s: 1.2, d: 0.0, c: true  },
  { x: 12.8, y: 28.6, s: 0.8, d: 0.5, c: false },
  { x:  8.1, y: 45.2, s: 1.5, d: 1.2, c: true  },
  { x: 22.4, y:  8.9, s: 0.9, d: 0.8, c: false },
  { x: 18.7, y: 62.1, s: 1.1, d: 1.8, c: false },
  { x: 31.2, y: 35.7, s: 0.7, d: 2.1, c: false },
  { x:  3.8, y: 78.3, s: 1.3, d: 0.3, c: true  },
  { x: 41.5, y: 15.8, s: 0.6, d: 1.5, c: false },
  { x: 28.9, y: 55.4, s: 1.0, d: 2.4, c: false },
  { x: 15.3, y: 88.2, s: 0.8, d: 0.9, c: false },
  { x: 48.2, y: 42.6, s: 1.4, d: 1.1, c: true  },
  { x:  7.6, y: 65.9, s: 0.9, d: 2.7, c: false },
  { x: 35.4, y: 72.1, s: 1.1, d: 0.6, c: false },
  { x: 44.8, y: 85.6, s: 1.2, d: 0.2, c: true  },
  { x: 19.5, y: 93.4, s: 0.8, d: 2.3, c: false },
  { x: 38.7, y:  5.1, s: 1.0, d: 1.4, c: false },
  { x: 25.1, y: 48.7, s: 0.6, d: 0.7, c: false },
  { x: 52.0, y: 22.3, s: 0.7, d: 1.9, c: false },
];

/* Poster service columns */
const SERVICES = [
  { title: 'AI Development',        desc: 'Smart solutions designed to learn and evolve.' },
  { title: 'Systems Architecture',  desc: 'Scalable, secure architecture built for the future.' },
  { title: 'Production Engineering',desc: 'Reliable engineering that delivers and scales with you.' },
];

/* Proof stats — count up when the hero mounts */
const STATS = [
  { value: 1550, suffix: '+', label: 'GitHub Stars' },
  { value: 270,  suffix: '+', label: 'Plugins Built' },
  { value: 1537, suffix: '',  label: 'Agent Skills' },
];

/* ── Count-up hook ─────────────────────────────────── */
function useCountUp(target: number, start: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const n = useCountUp(value, start);
  return (
    <div className="hero-stat">
      <span className="hero-stat-num">{n.toLocaleString('en-US')}{suffix}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────── */
function StarField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left:   `${star.x}%`,
            top:    `${star.y}%`,
            width:  `${star.s}px`,
            height: `${star.s}px`,
            background: star.c ? EMBER : 'rgba(255,255,255,0.7)',
            boxShadow: star.c ? EMBER_GLOW : 'none',
            animation: `twinkle ${2.2 + star.d}s ${star.d}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── The Intent mark — the actual 3D render, extracted from the
   brand poster (transparent PNG, glow and bevel intact). ── */
function IntentMark({ size, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/images/logo-mark.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{
        display: 'block',
        filter: 'drop-shadow(0 0 26px rgba(255,106,0,0.35)) drop-shadow(0 0 90px rgba(255,106,0,0.18))',
      }}
    />
  );
}

/* ── The mark levitating over the wide rim-lit podium.
   The whole scene tilts with the cursor (parallax) on desktop. ── */
function LogoScene({ rotateX, rotateY }: { rotateX: any; rotateY: any }) {
  return (
    <motion.div
      className="hero-scene relative flex flex-col items-center justify-center flex-shrink-0"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      aria-hidden="true"
    >
      {/* Directional light — warm wash from the upper right */}
      <span
        className="absolute"
        style={{
          width: '90%', height: '90%',
          top: '-10%', right: '-14%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,140,40,0.2) 0%, rgba(255,120,26,0.07) 45%, transparent 70%)',
          animation: 'hero-glow-pulse 6s ease-in-out infinite',
        }}
      />
      {/* Levitating mark — floats + slowly swivels; sits above the podium in 3D */}
      <motion.div
        className="relative z-10"
        style={{ translateZ: 40 }}
        initial={{ opacity: 0, y: 34, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.05, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ animation: 'hero-float 6.5s ease-in-out infinite' }}>
          <div style={{ animation: 'hero-turntable 9s ease-in-out infinite', transformStyle: 'preserve-3d' }}>
            <IntentMark className="hero-mark" />
          </div>
        </div>
      </motion.div>

      {/* Podium — the actual render, wide, with clear air below the mark */}
      <motion.div
        className="relative flex flex-col items-center hero-podium-wrap"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Cast shadow on the disc — breathes with the float */}
        <span
          className="absolute rounded-full hero-cast-shadow"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
            filter: 'blur(6px)',
            animation: 'hero-shadow 6.5s ease-in-out infinite',
          }}
        />
        <img src="/images/logo-podium.png" alt="" aria-hidden="true" className="hero-podium" style={{ display: 'block' }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsStart, setStatsStart] = useState(false);

  /* Kick off the count-up shortly after the entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setStatsStart(true), 700);
    return () => clearTimeout(t);
  }, []);

  /* Cursor parallax (desktop; touch devices never fire mousemove) */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-13, 13]), { stiffness: 55, damping: 14 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 55, damping: 14 });

  const handleMouse = (e: React.MouseEvent) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetMouse = () => { mx.set(0); my.set(0); };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="min-h-screen flex items-center relative overflow-hidden bg-zinc-950"
    >

      {/* Atmosphere */}
      <div className="absolute inset-0 hero-overlay-bottom pointer-events-none" />
      <div className="absolute inset-0 hero-scanlines pointer-events-none" />
      {/* Film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      {/* Ember ambient glow — upper right, behind the mark */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700,
          top: '-14%', right: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Star field — left half only */}
      <StarField />

      {/* Content */}
      <div className="container mx-auto px-8 py-20 lg:py-24 relative z-10" style={{ perspective: 1200 }}>
        <div className="flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-8 lg:gap-10">

          {/* ── Primary content ── */}
          <div className="max-w-[600px] w-full">

            {/* System status badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <span
                className="hidden sm:block h-px w-8 flex-shrink-0"
                style={{ background: `linear-gradient(to right, transparent, ${EMBER})` }}
              />
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: EMBER }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: EMBER }} />
              </span>
              <span
                className="font-display text-[0.62rem] font-semibold tracking-[0.32em] uppercase px-3 py-1 rounded-full border"
                style={{ color: ORANGE, borderColor: 'rgba(249,115,22,0.25)', background: 'rgba(249,115,22,0.05)' }}
              >
                building intelligence · delivering impact
              </span>
            </motion.div>

            {/* Headline — marker-highlight device */}
            <motion.h1
              className="hero-headline font-display font-bold tracking-[-0.03em] mb-6 text-zinc-50"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="lg:whitespace-nowrap">Intelligent Solutions.</span>{' '}
              <motion.span
                className="lg:whitespace-nowrap"
                style={{
                  background: 'linear-gradient(120deg, #FF8A2A, #F26205)',
                  color: 'rgb(9 9 11)',
                  padding: '0.02em 0.18em 0.06em',
                  borderRadius: '10px',
                  boxShadow: '0 12px 60px rgba(249,115,22,0.4), 0 4px 18px rgba(249,115,22,0.25)',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                Intentional Impact.
              </motion.span>
            </motion.h1>

            {/* Poster underline rule */}
            <motion.div
              className="mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left center' }}
            >
              <span className="block h-[3px] w-32 rounded-full" style={{ background: `linear-gradient(to right, ${EMBER}, transparent)` }} />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-[0.98rem] text-zinc-400 leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52 }}
            >
              We build AI-powered solutions that learn, adapt, and drive real business outcomes.
            </motion.p>

            {/* Service columns */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.6 }}
            >
              {SERVICES.map((svc, i) => (
                <div key={svc.title} className="relative pl-4 sm:pl-0 sm:pt-4">
                  <span
                    className="absolute left-0 top-0 bottom-0 w-px sm:bottom-auto sm:right-[30%] sm:h-px sm:w-auto"
                    style={{ background: `linear-gradient(to right, rgba(249,115,22,${0.45 - i * 0.1}), transparent)` }}
                  />
                  <span
                    className="mb-2.5 hidden sm:flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}
                  >
                    <IntentMark size={16} />
                  </span>
                  <p className="font-display text-[0.78rem] font-semibold text-zinc-200 mb-1">{svc.title}</p>
                  <p className="text-[0.72rem] leading-relaxed text-zinc-500">{svc.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.68 }}
            >
              <a href="https://calendar.app.google/Wqbt8EJuEh5xvvV58" target="_blank" rel="noopener" className="btn-primary btn-magnetic font-display tracking-wide">
                Book a Discovery Call
              </a>
              <a
                href="https://claudecodeplugins.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              >
                <span className="transition-colors duration-300 group-hover:text-orange-300" style={{ color: ORANGE }}>explore</span>
                <span>270+ plugins</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </motion.div>
          </div>

          {/* ── The logo scene (now on every viewport) ── */}
          <LogoScene rotateX={rotateX} rotateY={rotateY} />

        </div>

        {/* ── Proof stats — count up on load ── */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} start={statsStart} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
