import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: '17', label: 'Active Projects' },
  { value: '430+', label: 'Claude Code Plugins' },
  { value: '8', label: 'Vertex AI Agents' },
];

export default function ProjectsHero() {
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
          <h1 className="text-hero font-bold text-zinc-50 mb-6">
            What We're Building
          </h1>
          <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
            Production AI systems from concept to deployment. Real projects shipping to real users.
          </p>

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-zinc-50 mb-1">{stat.value}</div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://github.com/intent-solutions-io"
              target="_blank"
              rel="noopener"
              className="btn-primary"
            >
              View on GitHub
            </a>
            <a
              href="#contact"
              className="btn-secondary"
            >
              Work With Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
