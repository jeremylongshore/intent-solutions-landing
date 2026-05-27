import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const proofPoints = [
  '430+ Claude Code plugins · 2,200+ GitHub stars',
  '2,750+ agent skills · 20+ years ops experience',
  'Only external Google Agent Starter Pack contributor',
];

export default function ColabHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-zinc-900" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Audience label */}
          <p className="text-sm text-zinc-500 uppercase tracking-wider mb-4">
            For teams ready to ship
          </p>

          <h1 className="text-hero font-bold text-zinc-50 mb-6">
            Build and Ship with Jeremy
          </h1>

          <p className="text-xl text-zinc-400 mb-6 leading-relaxed">
            Implementation partner in your repo: we ship Claude Code workflows, plugins, and agents alongside your team.
          </p>

          {/* What Colab delivers */}
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-sm text-zinc-300">
              <span className="font-semibold text-zinc-200">What you get:</span>{' '}
              Real PRs in your repo, reviewed and deployed. CI guardrails, documentation, and training so your team can maintain it.
            </p>
          </div>

          {/* Proof bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm text-zinc-300"
              >
                {point}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
              target="_blank"
              rel="noopener"
              className="btn-primary text-lg"
            >
              Book a Discovery Call
            </a>
            <a
              href="#engagements"
              className="btn-secondary text-lg"
            >
              See Engagement Options
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
