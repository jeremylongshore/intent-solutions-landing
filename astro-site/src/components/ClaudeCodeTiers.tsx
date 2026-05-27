import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CYAN      = 'rgb(34 211 238)';
const CYAN_20   = 'rgba(34,211,238,0.20)';
const CYAN_GLOW = '0 0 7px rgba(34,211,238,0.55)';

const tiers = [
  {
    id: 'T-01',
    name: 'Starter',
    target: 'Solo / Small Team',
    description: 'Get up and running with Claude Code fast.',
    includes: [
      'Curated plugin pack for your stack',
      'Basic system setup and configuration',
      '1-hour training session',
      'Setup documentation',
    ],
  },
  {
    id: 'T-02',
    name: 'Growth',
    target: 'Growing Teams',
    description: 'Custom plugins and team-wide configuration.',
    includes: [
      'Everything in Starter',
      'Custom plugin development (up to 3)',
      'Team workflow optimization',
      '4-hour training workshop',
      '30-day support',
    ],
    featured: true,
  },
  {
    id: 'T-03',
    name: 'Scale',
    target: 'Departments',
    description: 'Full system build with ongoing support.',
    includes: [
      'Everything in Growth',
      'Complete system architecture',
      'Unlimited custom plugins',
      'Team training (up to 20 seats)',
      '90-day support + check-ins',
    ],
  },
  {
    id: 'T-04',
    name: 'Enterprise',
    target: 'Organization-wide',
    description: 'Custom everything with dedicated partnership.',
    includes: [
      'Everything in Scale',
      'Ongoing retainer relationship',
      'Quarterly workshops',
      'Priority development queue',
      'White-label options available',
    ],
  },
];

export default function ClaudeCodeTiers() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      id="tiers"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ borderTop: '1px solid rgba(39,39,42,0.5)', borderBottom: '1px solid rgba(39,39,42,0.5)' }}
    >
      {/* Cosmic background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/cosmic-bg-dark.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay to keep cards readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'rgba(9,9,11,0.82)' }}
      />
      {/* Ambient cyan glow — behind featured (2nd) card */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600,
          left: '28%', top: '55%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 68%)',
          filter: 'blur(8px)',
        }}
      />

      <div className="container mx-auto px-8 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span
              className="block h-px w-14"
              style={{ background: `linear-gradient(to right, transparent, ${CYAN_20})` }}
            />
            <span
              className="font-display text-[0.6rem] font-bold tracking-[0.28em] uppercase"
              style={{ color: CYAN }}
            >
              Configuration Tiers
            </span>
            <span
              className="block h-px w-14"
              style={{ background: `linear-gradient(to left, transparent, ${CYAN_20})` }}
            />
          </div>

          <h2
            className="font-display font-bold text-zinc-50 tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.1 }}
          >
            choose your setup
          </h2>
          <p className="text-zinc-400 text-[0.95rem] leading-relaxed">
            From quick starts to enterprise partnerships—pick the level that matches your team.
          </p>
        </motion.div>

        {/* ── Tier cards ── */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className="relative flex flex-col h-full"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              {/* Card shell */}
              <div
                className="relative flex flex-col h-full rounded-xl p-6"
                style={tier.featured ? {
                  background: 'rgba(18, 18, 20, 0.95)',
                  border: `1px solid rgba(34,211,238,0.28)`,
                  boxShadow: '0 0 0 1px rgba(34,211,238,0.04), 0 24px 64px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(12px)',
                } : {
                  background: 'rgba(24, 24, 27, 0.65)',
                  border: '1px solid rgba(39,39,42,0.75)',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color 0.25s ease',
                }}
              >
                {/* Featured — top cyan accent rule */}
                {tier.featured && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-[15%] right-[15%] h-px rounded-full"
                    style={{ background: `linear-gradient(to right, transparent, ${CYAN}, transparent)`,
                             boxShadow: `0 0 8px ${CYAN}` }}
                  />
                )}

                {/* Featured — "Recommended Config" designation */}
                {tier.featured && (
                  <div className="flex items-center gap-1.5 mb-5">
                    <span style={{ color: CYAN, fontSize: '0.45rem', lineHeight: 1 }}>◆</span>
                    <span
                      className="font-display font-bold tracking-[0.22em] uppercase"
                      style={{ fontSize: '0.58rem', color: CYAN }}
                    >
                      Recommended Config
                    </span>
                  </div>
                )}

                {/* Tier ID */}
                <p
                  className="font-display font-bold tracking-[0.28em] uppercase mb-3"
                  style={{ fontSize: '0.55rem', color: tier.featured ? 'rgba(34,211,238,0.45)' : 'rgba(113,113,122,0.6)' }}
                >
                  {tier.id}
                </p>

                {/* Tier name */}
                <h3
                  className="font-display font-bold text-zinc-50 mb-1 leading-tight"
                  style={{ fontSize: '1.45rem' }}
                >
                  {tier.name}
                </h3>

                {/* Target audience */}
                <p
                  className="text-zinc-500 uppercase tracking-widest mb-3"
                  style={{ fontSize: '0.62rem' }}
                >
                  {tier.target}
                </p>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  {tier.description}
                </p>

                {/* Divider */}
                <div
                  className="mb-5"
                  style={{ height: '1px', background: tier.featured ? 'rgba(34,211,238,0.12)' : 'rgba(39,39,42,0.7)' }}
                />

                {/* Feature list */}
                <ul className="space-y-2.5 flex-1 mb-7">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-snug">
                      <span
                        className="mt-[5px] h-[5px] w-[5px] rounded-full flex-shrink-0"
                        style={{ background: CYAN, boxShadow: CYAN_GLOW }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {tier.featured ? (
                  <a
                    href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                    target="_blank"
                    rel="noopener"
                    className="btn-primary text-center font-display tracking-wide text-sm"
                  >
                    Book a Discovery Call
                  </a>
                ) : (
                  <a
                    href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                    target="_blank"
                    rel="noopener"
                    className="text-center py-3 px-4 rounded-lg text-sm font-medium text-zinc-300 transition-all duration-300"
                    style={{
                      border: '1px solid rgba(63,63,70,0.8)',
                      background: 'transparent',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.3)';
                      (e.currentTarget as HTMLElement).style.color = 'rgb(228 228 231)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(63,63,70,0.8)';
                      (e.currentTarget as HTMLElement).style.color = 'rgb(212 212 216)';
                    }}
                  >
                    Book a Discovery Call
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.p
          className="text-center text-sm text-zinc-500 mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          All tiers include access to{' '}
          <a
            href="https://claudecodeplugins.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors duration-300 hover:text-cyan-300"
            style={{ color: CYAN }}
          >
            430+ open-source plugins
          </a>
        </motion.p>

      </div>
    </section>
  );
}
