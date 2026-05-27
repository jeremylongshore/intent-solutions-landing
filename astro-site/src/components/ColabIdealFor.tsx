import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const isThisYou = [
  {
    title: 'Ready to build',
    description: 'Your team is past the evaluation phase and ready to implement Claude Code workflows.',
    icon: '✓',
  },
  {
    title: 'Codebase ready',
    description: 'You have a repo, a team, and defined scope — not just a vague idea.',
    icon: '✓',
  },
  {
    title: 'Want PRs, not advice',
    description: 'You need code merged and deployed, not another strategy deck.',
    icon: '✓',
  },
];

const notForYou = [
  'You are not sure what Claude Code is (start with Learn)',
  'You do not have a codebase or team to work with',
  'You want strategic advice only (Learn might be better)',
];

const humanApprovalPolicy = [
  {
    title: 'Every PR reviewed',
    desc: 'No code ships without your team signing off. Period.',
  },
  {
    title: 'Scoped access',
    desc: 'I work in your repo with the permissions you grant — nothing more.',
  },
  {
    title: 'Full audit trail',
    desc: 'Every action logged. You see what was done and why.',
  },
  {
    title: 'Your IP, your control',
    desc: 'Code stays in your environment. No data leaves without your say.',
  },
];

const whatIBring = [
  {
    title: '430+ Claude Code plugins',
    description: 'The largest public plugin collection at claudecodeplugins.io',
  },
  {
    title: '20+ years ops experience',
    description: 'Production discipline, not just demos. I ship.',
  },
  {
    title: 'Vertex AI / GCP certified',
    description: 'Enterprise cloud infrastructure for scale.',
  },
  {
    title: 'Clean handoff every time',
    description: 'Documentation and training so your team can maintain it.',
  },
];

export default function ColabIdealFor() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      {/* Is This You? */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800/60" ref={ref}>
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-h2 font-bold text-zinc-50 mb-4">
                Is Colab Right for You?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Colab is for teams ready to execute. If you are still evaluating Claude Code, start with Learn.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {isThisYou.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-green-500 text-xl mb-2">{item.icon}</div>
                  <h3 className="text-zinc-200 font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="p-4 bg-zinc-800/20 border border-zinc-700/30 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-sm text-zinc-500 mb-2 font-medium">Not for you if:</p>
              <ul className="space-y-1">
                {notForYou.map((item) => (
                  <li key={item} className="text-sm text-zinc-500 flex items-start gap-2">
                    <span className="text-zinc-600">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Human Approval Policy */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-h2 font-bold text-zinc-50 mb-4">
                Human Approval Policy
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Your code, your control. Nothing ships without your explicit sign-off.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {humanApprovalPolicy.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <h3 className="text-zinc-200 font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I Bring */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800/60">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-h2 font-bold text-zinc-50 mb-4">
                What I Bring
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {whatIBring.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-zinc-600 mt-1">✓</span>
                  <div>
                    <h3 className="text-zinc-50 font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-zinc-500">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <a
                href="https://calendar.app.google/Wqbt8EJuEh5xvvV58"
                target="_blank"
                rel="noopener"
                className="btn-primary"
              >
                Book a Discovery Call
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
