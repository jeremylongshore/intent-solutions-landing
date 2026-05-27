import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCounter from './AnimatedCounter';

const CYAN = 'rgb(34 211 238)';

const stats = [
  { value: 2200, suffix: '+', label: 'GitHub Stars',   decimals: 0 },
  { value: 430,  suffix: '+', label: 'Plugins Built',  decimals: 0 },
  { value: 2750, suffix: '+', label: 'Agent Skills',   decimals: 0 },
  { value: 20,   suffix: '+', label: 'Years in Ops',   decimals: 0 },
];

const badges = [
  { title: 'Google Cloud',    description: 'Agent Starter Pack contributor' },
  { title: 'Model Agnostic',  description: 'No vendor lock-in' },
  { title: 'Open Source',     description: '2,200+ GitHub stars' },
  { title: 'Discovery-First', description: 'No surprise pricing' },
];

export default function TrustBadges() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      style={{
        padding: '4rem 0',
        background: 'rgb(18 18 20)',
        borderTop:    '1px solid rgba(39,39,42,0.5)',
        borderBottom: '1px solid rgba(39,39,42,0.5)',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ marginBottom: '0.5rem' }}>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2000}
                  className=""
                />
                {/* Inline style via wrapper since className won't apply Tailwind here */}
              </div>
              <p style={{
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgb(82 82 91)',
                fontFamily: "'Syne', system-ui, sans-serif",
                fontWeight: 600,
                margin: 0,
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              style={{
                padding: '1rem 1.25rem',
                background: 'rgba(24,24,27,0.6)',
                border: '1px solid rgba(34,211,238,0.1)',
                borderRadius: '0.625rem',
                textAlign: 'center',
                backdropFilter: 'blur(6px)',
              }}
            >
              <h3 style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'rgb(228 228 231)',
                margin: '0 0 0.3rem',
              }}>
                {badge.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgb(82 82 91)', margin: 0 }}>
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
