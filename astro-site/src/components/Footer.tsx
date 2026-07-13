const ORANGE     = 'rgb(251 146 60)';
const ORANGE_DIM = 'rgba(249,115,22,0.55)';

const navLinks = [
  { label: 'Learn', href: '/learn' },
  { label: 'Colab', href: '/colab' },
  { label: 'Agents', href: '/agents' },
  { label: 'Private AI', href: '/private-ai' },
  { label: 'Automation', href: '/automation' },
  { label: 'Cloud & Data', href: '/cloud' },
  { label: 'Resellers', href: '/resellers' },
];

const resourceLinks = [
  { label: 'Field Notes', href: '/field-notes' },
  { label: 'Claude Code Plugins', href: 'https://claudecodeplugins.io', external: true },
  { label: 'GitHub', href: 'https://github.com/jeremylongshore', external: true },
  { label: 'Hugging Face', href: 'https://huggingface.co/intent-solutions-io', external: true },
  { label: 'Cowork Accelerator', href: 'https://whop.com/claude-code-cowork-accelerator/', external: true },
];

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Acceptable Use', href: '/acceptable-use' },
];

const faqs = [
  {
    q: 'What exactly is a Claude Code setup?',
    a: 'We configure Claude Code for your specific tech stack, team size, and workflows — custom CLAUDE.md files, curated plugin packs, slash commands, MCP connections, and hooks, tuned so your team gets value from day one.',
  },
  {
    q: 'Do I need to know how to code?',
    a: "Not at all. The Learn track is built for decision-makers and team leads — we show you what Claude Code can do and how it fits your org, no coding required.",
  },
  {
    q: "What's included in the discovery call?",
    a: "A 30-minute conversation where we learn about your team, workflows, and goals. You'll get honest recommendations — or an honest 'not a fit.' No pressure, no pitch deck.",
  },
  {
    q: 'What happens after the initial setup?',
    a: 'Every engagement includes a support window. We stay available for questions, plugin tweaks, and workflow adjustments — enterprise clients get ongoing retainers with quarterly workshops.',
  },
];

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        fontSize: '0.875rem',
        color: 'rgb(113 113 122)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        display: 'block',
        paddingBottom: '0.5rem',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgb(212 212 216)')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgb(113 113 122)')}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'rgb(9 9 11)',
        borderTop: '1px solid rgba(39,39,42,0.6)',
        padding: '4.5rem 0 2rem',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Top row: brand + nav columns ── */}
        <div
          className="footer-top"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.8fr 0.9fr 1.4fr',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >

          {/* Brand column */}
          <div>
            {/* Logotype */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {/* Dot */}
              <span
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  borderRadius: '50%',
                  background: ORANGE,
                  boxShadow: `0 0 8px ${ORANGE_DIM}`,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: 'rgb(228 228 231)',
                }}
              >
                Intent <span style={{ color: '#FF7A1A' }}>Solutions</span>
              </span>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgb(82 82 91)',
                lineHeight: 1.7,
                maxWidth: '22rem',
                marginBottom: '1.5rem',
              }}
            >
              creating industries that don't exist
            </p>

            <p
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgb(63 63 70)',
                margin: 0,
              }}
            >
              gulf shores, alabama
            </p>
          </div>

          {/* Services column */}
          <div>
            <p
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgb(82 82 91)',
                marginBottom: '1.25rem',
              }}
            >
              Services
            </p>
            {navLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          {/* Resources column */}
          <div>
            <p
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgb(82 82 91)',
                marginBottom: '1.25rem',
              }}
            >
              Resources
            </p>
            {resourceLinks.map((link) => (
              <FooterLink key={link.href} href={link.href} external={link.external}>
                {link.label}
              </FooterLink>
            ))}
            <div style={{ marginTop: '1.25rem' }}>
              <FooterLink href="mailto:jeremy@intentsolutions.io">
                jeremy@intentsolutions.io
              </FooterLink>
            </div>
          </div>

          {/* FAQ column */}
          <div>
            <p
              style={{
                fontFamily: "'Syne', system-ui, sans-serif",
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgb(82 82 91)',
                marginBottom: '1.25rem',
              }}
            >
              FAQ
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {faqs.map((faq) => (
                <details key={faq.q} className="footer-faq">
                  <summary>
                    <span>{faq.q}</span>
                    <svg className="faq-chevron" width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1.5 3.5 L5 7 L8.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

        </div>

        {/* ── Divider ── */}
        <div
          aria-hidden="true"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(39,39,42,0.8), transparent)',
            marginBottom: '1.75rem',
          }}
        />

        {/* ── Bottom row: legal + copyright ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'rgb(63 63 70)', margin: 0 }}>
            © 2025 intent solutions io. all rights reserved.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.72rem',
                  color: 'rgb(63 63 70)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'rgb(113 113 122)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgb(63 63 70)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
