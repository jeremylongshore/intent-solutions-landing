import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Products() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const products = [
    {
      name: 'Claude Code Plugins Hub',
      description:
        '430+ plugins with 2,750+ agent skills, CCPI package manager, and interactive tutorials—2,200+ GitHub stars, 300+ forks, community-driven.',
      badge: 'Python • Open Source • 2,200★',
      link: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    },
    {
      name: 'IRSB',
      description:
        'On-chain guardrails for AI agents—EIP-7702 spend limits, cryptographic execution receipts, and automated dispute resolution. No agent should hold unguarded keys.',
      badge: 'TypeScript • Ethereum • EIP-7702',
      link: 'https://github.com/jeremylongshore/irsb',
    },
    {
      name: 'Moat',
      description:
        'Verified Agent Capabilities Marketplace—MCP-first trust, policy, and execution layer for agents. Prove what your agent can do before it runs.',
      badge: 'Python • MCP • Agent Trust',
      link: 'https://github.com/jeremylongshore/moat',
    },
    {
      name: 'Intent Scout',
      description:
        'The first AI that can earn its own existence, replicate, and evolve—without needing a human. Autonomous agent economics research.',
      badge: 'TypeScript • Autonomous Agents',
      link: 'https://github.com/jeremylongshore/intent-scout',
    },
    {
      name: 'News Pipeline',
      description:
        'Automated monitoring pipeline that converts daily news into structured intelligence briefs for decision makers. Open-source archived project.',
      badge: 'Workflow Automation • 10★',
      link: 'https://github.com/jeremylongshore/news-pipeline-n8n',
    },
    {
      name: 'Excel Analyst Pro',
      description:
        'Professional financial modeling toolkit for Claude Code—DCF models, LBO analysis, variance reports, and pivot tables via natural language.',
      badge: 'Claude Code Skill • 8★',
      link: 'https://github.com/jeremylongshore/excel-analyst-pro',
    },
    {
      name: 'StartAITools',
      description:
        'Technical research blog with 37+ posts documenting real AI implementations, production systems, and practical development guides.',
      badge: 'Hugo • Technical Writing • 7★',
      link: 'https://startaitools.com',
    },
    {
      name: 'DiagnosticPro',
      description:
        'Live automotive diagnostics for service centers—Vertex AI orchestrates triage while Firebase keeps technicians synced in real time.',
      badge: 'TypeScript • React • Vertex AI',
      link: 'https://diagnosticpro.io',
    },
    {
      name: "Bob's Brain",
      description:
        'Collaborative AI assistant with Slack integration—Google Gemini 2.5 Flash, Neo4j knowledge graphs, BigQuery analytics, Cloud Run deployment.',
      badge: 'Python • Gemini • Neo4j',
      link: 'https://github.com/jeremylongshore/bobs-brain',
    },
  ];

  return (
    <section id="products" className="py-24 bg-zinc-900" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-h1 font-bold text-zinc-50 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          products i've shipped
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="card-slate"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-zinc-50 mb-3">
                {product.name}
              </h3>
              <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
                {product.description}
              </p>
              <span className="inline-block px-3 py-1 bg-zinc-800/50 text-zinc-300 text-xs rounded border border-zinc-700">
                {product.badge}
              </span>
              {product.link && (
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-zinc-200 text-sm hover:text-zinc-50 transition-smooth"
                >
                  view project →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
