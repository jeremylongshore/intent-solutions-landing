import { motion } from 'framer-motion';

/* ── Constants ─────────────────────────────────────── */
const CYAN       = 'rgb(34 211 238)';
const CYAN_GLOW  = '0 0 8px rgba(34,211,238,0.6)';

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

const STATS = [
  { value: '2,200+', label: 'GitHub Stars'  },
  { value: '430+',   label: 'Plugins Built' },
  { value: '2,750+',  label: 'Agent Skills'  },
];

const FOCUS = [
  '430+ plugins · 2,200+ GitHub stars · 2,750+ agent skills',
  'team configuration and workflow optimization',
  'only external contributor to Google Agent Starter Pack',
];

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
            background: star.c ? CYAN : 'rgba(255,255,255,0.7)',
            boxShadow: star.c ? CYAN_GLOW : 'none',
            animation: `twinkle ${2.2 + star.d}s ${star.d}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* Corner bracket — targeting reticle for stat cards */
function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  const placement: Record<string, React.CSSProperties> = {
    tl: { top: 7, left: 7 },
    tr: { top: 7, right: 7 },
    bl: { bottom: 7, left: 7 },
    br: { bottom: 7, right: 7 },
  };
  return (
    <span className="absolute" style={placement[pos]}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: `rotate(${rotations[pos]}deg)` }}>
        <path d="M0 10 L0 0 L10 0" stroke="rgba(34,211,238,0.55)" strokeWidth="1.5" />
      </svg>
    </span>
  );
}

function StatCard({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  return (
    <motion.div
      className="stat-card relative rounded-xl px-6 py-5 text-right min-w-[155px]"
      initial={{ opacity: 0, x: 28, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Targeting-reticle corners */}
      <Corner pos="tl" /><Corner pos="tr" />
      <Corner pos="bl" /><Corner pos="br" />

      {/* Top glow rule */}
      <span
        className="absolute top-0 left-[20%] right-[20%] h-px rounded-full"
        style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)' }}
      />

      <p className="font-display text-[2rem] font-bold leading-none mb-1.5" style={{ color: CYAN }}>
        {stat.value}
      </p>
      <p className="text-[0.6rem] text-zinc-500 uppercase tracking-[0.2em] font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ── Main component ─────────────────────────────────── */
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-zinc-950">

      {/* Video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/astronaut.mp4" type="video/mp4" />
      </video>

      {/* Overlays — left-only protection, nothing obscuring right */}
      <div className="absolute inset-0 hero-overlay-left" />
      <div className="absolute inset-0 hero-overlay-bottom pointer-events-none" />
      <div className="absolute inset-0 hero-scanlines pointer-events-none" />

      {/* Cyan ambient glow — top right corner, very gentle */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          top: '-12%', right: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Star field — left half only */}
      <StarField />

      {/* Content */}
      <div className="container mx-auto px-8 py-28 relative z-10">
        <div className="flex items-center justify-between gap-10">

          {/* ── Left: primary content ── */}
          <div className="max-w-[580px] w-full">

            {/* System status badge */}
            <motion.div
              className="inline-flex items-center gap-3 mb-9"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <span
                className="hidden sm:block h-px w-8 flex-shrink-0"
                style={{ background: `linear-gradient(to right, transparent, ${CYAN})` }}
              />
              {/* Pulsing live indicator */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                  style={{ background: CYAN }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: CYAN }} />
              </span>
              <span
                className="font-display text-[0.62rem] font-semibold tracking-[0.32em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: CYAN,
                  borderColor: 'rgba(34,211,238,0.2)',
                  background: 'rgba(34,211,238,0.04)',
                }}
              >
                build + train
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display font-bold leading-[0.9] tracking-[-0.03em] mb-5"
              style={{
                fontSize: 'clamp(3rem, 6.5vw, 6rem)',
                textShadow: '0 0 80px rgba(34,211,238,0.12), 0 0 160px rgba(34,211,238,0.06)',
              }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-zinc-50">Claude Code</span>
              <span className="block font-light text-zinc-400" style={{ fontSize: '85%' }}>
                Systems
              </span>
            </motion.h1>

            {/* Animated cyan rule */}
            <motion.div
              className="mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left center' }}
            >
              <span
                className="block h-px w-28"
                style={{ background: `linear-gradient(to right, ${CYAN}, transparent)` }}
              />
            </motion.div>

            {/* Byline */}
            <motion.p
              className="text-sm text-zinc-500 mb-5 tracking-wide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.44 }}
            >
              <a
                href="https://jeremylongshore.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-colors duration-300 hover:text-cyan-300"
                style={{ color: CYAN }}
              >
                jeremy_longshore
              </a>
              <span className="mx-2 text-zinc-700">·</span>
              claude code specialist
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-[0.95rem] text-zinc-400 leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.52 }}
            >
              Custom Claude Code setups for teams of any size—from solo developers to enterprise.
              I build your system and train your team to use it.
            </motion.p>

            {/* Proof points */}
            <motion.ul
              className="mb-10 space-y-2.5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.60 }}
            >
              {FOCUS.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-400">
                  <span
                    className="mt-[5px] h-[5px] w-[5px] rounded-full flex-shrink-0"
                    style={{ background: CYAN, boxShadow: CYAN_GLOW }}
                  />
                  {line}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.68 }}
            >
              <a
                href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                target="_blank"
                rel="noopener"
                className="btn-primary font-display tracking-wide"
              >
                Book a Discovery Call
              </a>
              <a
                href="https://claudecodeplugins.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
              >
                <span className="transition-colors duration-300 group-hover:text-cyan-300" style={{ color: CYAN }}>
                  explore
                </span>
                <span>430+ plugins</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </motion.div>
          </div>

          {/* ── Right: HUD stat cards (desktop only) ── */}
          <div className="hidden lg:flex flex-col gap-4 flex-shrink-0">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={0.78 + i * 0.13} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
