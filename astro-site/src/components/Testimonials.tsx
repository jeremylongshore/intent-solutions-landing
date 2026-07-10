import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ── Warm-light section palette ── */
const CREAM        = '#FBF4EA';
const INK          = 'rgb(24 24 27)';
const BODY         = 'rgb(68 64 60)';
const MUTED        = 'rgb(120 113 108)';
const HAIRLINE     = 'rgb(231 222 210)';
const EMBER        = '#F97316';
const EMBER_DEEP   = '#C2410C';   /* orange-700 — accessible on white */
const EMBER_ACTION = '#EA580C';   /* orange-600 — buttons/links */

/* Marker-highlight for the heading keyword */
const HIGHLIGHT: React.CSSProperties = {
  background: 'linear-gradient(120deg, #FF8A2A, #F26205)',
  color: 'rgb(9 9 11)',
  padding: '0.02em 0.22em 0.06em',
  borderRadius: '8px',
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
};

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  result: string;
  tags: string[];
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  link?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'TechScale Inc',
    quote: 'Intent Solutions transformed our manual SDR process into a fully automated pipeline. What used to take 3 team members now runs autonomously with better accuracy.',
    result: '67% reduction in operational costs',
    tags: ['IAM Agents', 'Automation'],
  },
  {
    id: 'testimonial-2',
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'HealthSync',
    quote: 'We needed HIPAA-compliant AI that stayed on our infrastructure. Their Private AI solution gave us ChatGPT capabilities without data leaving our GCP environment.',
    result: '99.9% uptime, zero data breaches',
    tags: ['Private AI', 'Healthcare'],
  },
  {
    id: 'testimonial-3',
    name: 'Emily Watson',
    role: 'CEO',
    company: 'DataFlow Analytics',
    quote: 'The custom RAG system they built indexes our entire knowledge base and serves real-time insights to our sales team. Game-changing for our conversion rates.',
    result: '43% increase in close rates',
    tags: ['RAG Systems', 'Data'],
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'PipelinePilot: 4-Agent SDR Automation',
    client: 'B2B SaaS Startup',
    industry: 'Sales Technology',
    challenge: 'Manual lead enrichment and outreach taking 20+ hours weekly. Inconsistent messaging across channels.',
    solution: 'Built custom 4-agent IAM system: Orchestrator, Data Captain, Content Analyst, and Readiness Auditor working in coordination.',
    results: [
      'Reduced manual work from 20hrs to 2hrs/week',
      'Increased lead response rate by 58%',
      'Standardized messaging across all channels',
      'Live production system handling 500+ leads/month',
    ],
    tags: ['IAM M3', 'Production MVP', 'SDR Automation'],
    link: 'https://pipelinepilot-prod.web.app',
  },
  {
    id: 'case-2',
    title: 'Private AI for Healthcare Compliance',
    client: 'Regional Hospital Network',
    industry: 'Healthcare',
    challenge: "Needed AI-powered clinical documentation assistant but couldn't use cloud AI due to HIPAA requirements.",
    solution: 'Deployed model-agnostic Private AI on their GCP infrastructure with Vertex AI. Full ChatGPT experience with data sovereignty.',
    results: [
      'Achieved HIPAA compliance certification',
      'Processed 10K+ clinical queries/month',
      '87% reduction in documentation time',
      'Zero PHI data breaches since deployment',
    ],
    tags: ['Private AI', 'HIPAA', 'Vertex AI'],
  },
  {
    id: 'case-3',
    title: 'n8n Automation for Customer Onboarding',
    client: 'FinTech Platform',
    industry: 'Financial Services',
    challenge: 'Customer onboarding required 14 manual touchpoints across 5 systems. Average time: 3 days.',
    solution: 'Built n8n workflows connecting CRM, KYC verification, account provisioning, and email automation.',
    results: [
      'Onboarding time reduced to 4 hours',
      '95% fewer manual errors',
      'Scaled from 50 to 300 customers/month',
      'Saved $45K annually in operational costs',
    ],
    tags: ['Automation', 'n8n', 'Workflows'],
  },
];

const cardStyle: React.CSSProperties = {
  background: '#FDFBF7',
  border: `1px solid ${HAIRLINE}`,
  borderRadius: '1rem',
  padding: '1.5rem',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)',
};

function Stars() {
  return (
    <div aria-hidden="true" style={{ color: EMBER, fontSize: '0.85rem', letterSpacing: '3px', marginBottom: '0.9rem' }}>
      ★★★★★
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<'testimonials' | 'case-studies'>('testimonials');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);

  const selectedStudy = caseStudies.find((cs) => cs.id === selectedCaseStudy);

  /* Mobile carousel: track which testimonial is centered, for the dots */
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const node = child as HTMLElement;
      const c = node.offsetLeft + node.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < min) { min = d; closest = i; }
    });
    setActiveIndex(closest);
  };

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      style={{
        padding: '6.5rem 0',
        background: 'linear-gradient(180deg, #1a1310 0%, #120d0b 100%)',
        borderTop: '1px solid rgba(39,39,42,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft ember wash, top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 640, height: 640,
          top: '-18%', right: '-12%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 68%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.3))' }} />
            <span style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: 'rgb(251 146 60)' }}>
              Proven Results
            </span>
            <span style={{ display: 'block', height: 1, width: '3.5rem', background: 'linear-gradient(to left, transparent, rgba(249,115,22,0.3))' }} />
          </div>

          <h2 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 700, color: 'rgb(250 250 250)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '0.85rem' }}>
            proven results in <span style={HIGHLIGHT}>production</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgb(161 161 170)', maxWidth: '36rem', margin: '0 auto' }}>
            Real systems, real outcomes — from automation that saves 20hrs/week to AI infrastructure serving thousands of users.
          </p>
        </motion.div>

        {/* Tab toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}
        >
          <div style={{ display: 'inline-flex', padding: '0.25rem', borderRadius: '0.6rem', background: 'rgba(9,9,11,0.5)', border: '1px solid rgba(63,63,70,0.6)' }}>
            {(['testimonials', 'case-studies'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '0.45rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  transition: 'all 0.2s ease',
                  background:  activeTab === tab ? EMBER : 'transparent',
                  color:       activeTab === tab ? 'rgb(9 9 11)' : 'rgb(161 161 170)',
                }}
              >
                {tab === 'testimonials' ? 'Client Testimonials' : 'Case Studies'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'testimonials' ? (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="tst-track" ref={trackRef} onScroll={handleTrackScroll}>
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  className="tst-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}
                >
                  <Stars />

                  {/* Quote */}
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: BODY, marginBottom: '1rem', flex: 1, fontStyle: 'italic' }}>
                    "{t.quote}"
                  </p>

                  {/* Result */}
                  <div style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '2rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: 'rgba(249,115,22,0.1)',
                    border: '1px solid rgba(234,88,12,0.3)',
                    color: EMBER_DEEP,
                    marginBottom: '1.25rem',
                  }}>
                    {t.result}
                  </div>

                  {/* Author */}
                  <div style={{ borderTop: `1px solid ${HAIRLINE}`, paddingTop: '1rem' }}>
                    <p style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 600, color: INK, margin: '0 0 0.2rem' }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: MUTED, margin: '0 0 0.75rem' }}>
                      {t.role}, {t.company}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {t.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.18rem 0.5rem', borderRadius: '3px', background: '#F7F1E8', border: `1px solid ${HAIRLINE}`, color: MUTED }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>{/* /tst-track */}

              {/* Carousel dots — mobile only (hidden on desktop via CSS) */}
              <div className="tst-dots" role="tablist" aria-label="Testimonials">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={i === activeIndex ? 'tst-dot is-active' : 'tst-dot'}
                    onClick={() => scrollToCard(i)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="case-studies"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {caseStudies.map((study, i) => (
                  <motion.button
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    onClick={() => setSelectedCaseStudy(study.id)}
                    style={{ ...cardStyle, textAlign: 'left', width: '100%', cursor: 'pointer', transition: 'border-color 0.25s ease, transform 0.2s ease' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(234,88,12,0.45)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = HAIRLINE;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <h3 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '1rem', fontWeight: 700, color: INK, marginBottom: '0.4rem' }}>
                      {study.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: MUTED, marginBottom: '1rem' }}>
                      {study.client} · {study.industry}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                      {study.tags.slice(0, 2).map((tag) => (
                        <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.55rem', borderRadius: '3px', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(234,88,12,0.25)', color: EMBER_DEEP }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: EMBER_ACTION, fontWeight: 600 }}>Read full case study →</span>
                  </motion.button>
                ))}
              </div>

              {/* Case study modal */}
              <AnimatePresence>
                {selectedCaseStudy && selectedStudy && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(20,10,0,0.6)', backdropFilter: 'blur(6px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                    onClick={() => setSelectedCaseStudy(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.92, y: 16 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.92, y: 16 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{ ...cardStyle, maxWidth: '42rem', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', border: '1px solid rgba(234,88,12,0.3)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div>
                          <h3 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '1.25rem', fontWeight: 700, color: INK, marginBottom: '0.35rem' }}>
                            {selectedStudy.title}
                          </h3>
                          <p style={{ fontSize: '0.8rem', color: MUTED }}>
                            {selectedStudy.client} · {selectedStudy.industry}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedCaseStudy(null)}
                          style={{ background: 'none', border: 'none', color: MUTED, fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1, padding: '0.25rem' }}
                          aria-label="Close"
                        >
                          ×
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                        {selectedStudy.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '2rem', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(234,88,12,0.25)', color: EMBER_DEEP }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {[
                        { heading: 'The Challenge', content: selectedStudy.challenge },
                        { heading: 'Our Solution',  content: selectedStudy.solution },
                      ].map(({ heading, content }) => (
                        <div key={heading} style={{ marginBottom: '1.5rem' }}>
                          <h4 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgb(41 37 36)', marginBottom: '0.5rem' }}>
                            {heading}
                          </h4>
                          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: BODY, margin: 0 }}>
                            {content}
                          </p>
                        </div>
                      ))}

                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ fontFamily: "'Syne', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 700, color: 'rgb(41 37 36)', marginBottom: '0.75rem' }}>
                          Measured Results
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {selectedStudy.results.map((result, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: EMBER_ACTION, boxShadow: '0 0 6px rgba(234,88,12,0.5)', flexShrink: 0, marginTop: 7 }} />
                              <span style={{ fontSize: '0.875rem', color: BODY }}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedStudy.link && (
                        <a
                          href={selectedStudy.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', textAlign: 'center', padding: '0.875rem', background: EMBER_ACTION, color: '#FFFFFF', borderRadius: '0.5rem', fontFamily: "'Syne', system-ui, sans-serif", fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}
                        >
                          View Live System
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All projects link */}
        <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <a
            href="/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: "'Syne', system-ui, sans-serif",
              fontSize: '0.875rem',
              fontWeight: 600,
              color: EMBER_ACTION,
              textDecoration: 'none',
            }}
          >
            Explore all shipped projects →
          </a>
        </div>
      </div>
    </section>
  );
}
