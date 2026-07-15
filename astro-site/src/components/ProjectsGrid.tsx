import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  isPrivate: boolean;
  icon: string;
}

const projects: Project[] = [
  {
    name: 'Executive Intent',
    description: 'Proof-first security pipeline for Gmail and Calendar. DLP enforcement with vector search for executive communications.',
    features: ['Gmail/Calendar DLP', 'Vector search', 'Proof-first security'],
    techStack: ['GCP', 'Gmail API', 'Vector Search'],
    isPrivate: true,
    icon: '🔐',
  },
  {
    name: 'Claude Code Plugins',
    description: '430+ plugins marketplace with embedded AI skills and Jupyter tutorials. The largest Claude Code plugin collection.',
    features: ['430+ plugins', 'AI skills', 'Jupyter tutorials'],
    techStack: ['Claude Code', 'Python', 'TypeScript'],
    repoUrl: 'https://github.com/jeremylongshore/claude-code-plugins-plus-skills',
    liveUrl: 'https://claudecodeplugins.io',
    isPrivate: false,
    icon: '🔌',
  },
  {
    name: 'Kobiton · automate (client)',
    description: 'Featured-plugin partner engagement for Kobiton Inc. Multi-cycle review and hardening of their real-device-cloud Claude Code plugin — 14 upstream PRs merged, server-side findings filed, and a published case-study blog series.',
    features: ['Multi-cycle plugin audit', '14 upstream PRs merged', 'Marketplace featured placement'],
    techStack: ['Claude Code', 'MCP', 'Appium'],
    repoUrl: 'https://github.com/kobiton/automate',
    liveUrl: 'https://startaitools.com/posts/agents-md-cross-tool-plugin-brief/',
    isPrivate: false,
    icon: '📱',
  },
  {
    name: 'Perception',
    description: 'AI-powered news intelligence with 8 specialized Vertex AI agents monitoring 50+ sources for executive insights.',
    features: ['8 AI agents', '50+ sources', 'Executive insights'],
    techStack: ['Vertex AI', 'ADK', 'A2A Protocol'],
    repoUrl: 'https://github.com/intent-solutions-io/perception-with-intent',
    isPrivate: false,
    icon: '📰',
  },
  {
    name: 'Start AI Tools',
    description: 'AI tools directory with tutorials and implementation guides. Curated collection of production-ready AI resources.',
    features: ['AI directory', 'Tutorials', 'Implementation guides'],
    techStack: ['Astro', 'React'],
    repoUrl: 'https://github.com/jeremylongshore/startaitools.com',
    liveUrl: 'https://startaitools.com',
    isPrivate: false,
    icon: '🛠️',
  },
  {
    name: 'DiagnosticPro',
    description: 'AI-powered equipment diagnostic platform. Professional repair analysis for $4.99 per diagnostic.',
    features: ['$4.99 analysis', 'Equipment diagnostics', 'AI-powered'],
    techStack: ['Firebase', 'Vertex AI', 'React'],
    repoUrl: 'https://github.com/intent-solutions-io/DiagnosticPro',
    liveUrl: 'https://diagnosticpro.io',
    isPrivate: false,
    icon: '🔧',
  },
  {
    name: 'PipelinePilot',
    description: 'B2B sales automation with ADK-based SDR orchestration. Vertex AI Agent Engine powers intelligent outreach.',
    features: ['SDR orchestration', 'B2B automation', 'Vertex AI'],
    techStack: ['ADK', 'Vertex AI', 'Firestore'],
    isPrivate: true,
    icon: '📊',
  },
  {
    name: 'HustleStats',
    description: 'Performance data platform for youth soccer recruiting. Firebase + Vertex AI with A2A protocol integration.',
    features: ['Youth soccer', 'Recruiting data', 'Performance tracking'],
    techStack: ['Firebase', 'Vertex AI', 'A2A'],
    isPrivate: true,
    icon: '⚽',
  },
  {
    name: 'IAM Bob ADK',
    description: 'Official Google ADK and Vertex AI Agent Engine reference implementation of the Intent Agent Model.',
    features: ['Slack AI', 'Compliance agents', 'Memory Bank'],
    techStack: ['ADK', 'Slack', 'Memory Bank'],
    repoUrl: 'https://github.com/jeremylongshore/iam-bob-adk',
    isPrivate: false,
    icon: '🧠',
  },
  {
    name: 'Waygate MCP',
    description: 'Foundational MCP Server Framework for enterprise integrations. TypeScript-based server foundation.',
    features: ['MCP server', 'Enterprise framework', 'TypeScript'],
    techStack: ['MCP', 'TypeScript'],
    repoUrl: 'https://github.com/jeremylongshore/waygate-mcp',
    isPrivate: false,
    icon: '🚪',
  },
  {
    name: 'CostPlusDB',
    description: 'Transparent PostgreSQL hosting at cost + 25%. Published benchmarks and no hidden fees.',
    features: ['Cost + 25%', 'Published benchmarks', 'Transparent pricing'],
    techStack: ['PostgreSQL', 'Cloud Run'],
    isPrivate: true,
    icon: '💾',
  },
  {
    name: 'Git With Intent',
    description: 'AI-powered git workflows for intent-based commits. Automation that understands what you meant to do.',
    features: ['Intent-based commits', 'AI workflows', 'Automation'],
    techStack: ['Git', 'AI Workflows'],
    repoUrl: 'https://github.com/intent-solutions-io/iam-git-with-intent',
    isPrivate: false,
    icon: '🔀',
  },
  {
    name: 'STCI',
    description: 'Standard Token Cost Index - vendor-neutral LLM pricing benchmark. The definitive source for AI cost comparison.',
    features: ['LLM pricing', 'Vendor-neutral', 'Cost benchmark'],
    techStack: ['BigQuery', 'Analytics'],
    isPrivate: true,
    icon: '📈',
  },
  {
    name: 'Nixtla Plugins',
    description: 'Claude Code plugins for TimeGPT pipelines. Generate forecasting models and FastAPI services from natural language.',
    features: ['TimeGPT', 'Forecasting', 'Natural language'],
    techStack: ['TimeGPT', 'FastAPI'],
    repoUrl: 'https://github.com/intent-solutions-io/plugins-nixtla',
    isPrivate: false,
    icon: '📊',
  },
  {
    name: 'IntentMail',
    description: 'Modern email stack with MCP interface layer. Unified Gmail and Outlook integration.',
    features: ['Unified email', 'MCP interface', 'Gmail + Outlook'],
    techStack: ['MCP', 'Gmail', 'Outlook'],
    repoUrl: 'https://github.com/intent-solutions-io/intent-mail',
    isPrivate: false,
    icon: '📧',
  },
  {
    name: 'Private AI',
    description: 'Enterprise LLM deployments for organizations requiring data privacy. Self-hosted AI infrastructure.',
    features: ['Self-hosted', 'Data privacy', 'Enterprise LLMs'],
    techStack: ['LLMs', 'Enterprise'],
    isPrivate: true,
    icon: '🏢',
  },
  {
    name: 'Intent Solutions',
    description: 'AI consulting and Claude Code Systems. Build + train for teams of any size.',
    features: ['AI consulting', 'Claude Code', 'Team training'],
    techStack: ['Claude Code', 'GCP', 'Firebase'],
    liveUrl: 'https://intentsolutions.io',
    isPrivate: true,
    icon: '🎯',
  },
];

export default function ProjectsGrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-800/60" ref={ref}>
      <div className="container mx-auto px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-h1 font-bold text-zinc-50 mb-4">
            Active Projects
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            From AI agents to developer tools - production systems shipping to real users.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="card-slate flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-2xl">{project.icon}</div>
                {project.isPrivate && (
                  <span className="text-xs px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-500">
                    Private
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold text-zinc-50 mb-2">
                {project.name}
              </h3>

              <p className="text-sm text-zinc-400 mb-4 flex-1">
                {project.description}
              </p>

              <ul className="space-y-1 mb-4">
                {project.features.map((feature) => (
                  <li key={feature} className="text-xs text-zinc-500 flex items-center gap-2">
                    <span className="text-zinc-600">•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 bg-zinc-800/50 border border-zinc-700/50 rounded text-zinc-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-zinc-300 hover:text-zinc-50 transition-smooth"
                  >
                    GitHub →
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-zinc-300 hover:text-zinc-50 transition-smooth"
                  >
                    Live →
                  </a>
                )}
                {!project.repoUrl && !project.liveUrl && (
                  <span className="text-sm text-zinc-600">Coming soon</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
