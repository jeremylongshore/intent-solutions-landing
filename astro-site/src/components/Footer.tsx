import estateLinks from '../generated/estate-bar/links.json';
// Labels and hrefs come from the canonical estate bar (/estate-bar/links.json),
// so the footer can never name a property differently from the top strip.
const networkLinks = estateLinks.links
  .filter((link) => link.site !== 'company')
  .map(({ label, href }) => ({ label, href }));

const companyLinks = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Field notes', href: '/field-notes/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Support', href: '/support/' },
  { label: 'Site map', href: '/site-map/' },
  { label: 'GitHub', href: 'https://github.com/jeremylongshore' },
];

const legalLinks = [
  { label: 'Terms', href: '/terms/' },
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Acceptable use', href: '/acceptable-use/' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="/" aria-label="Intent Solutions home">
            <img src="/images/logo-mark.png" alt="" width="28" height="28" />
            <span>Intent <strong>Solutions</strong></span>
          </a>
          <p>AI implementation with a defined outcome, evidence you can inspect, and a plan for operating the system.</p>
          <small>Gulf Shores, Alabama</small>
        </div>

        <div>
          <h2>Network</h2>
          {networkLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>

        <div>
          <h2>Company</h2>
          {companyLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Intent Solutions. Judge the receipts, not the résumé.</p>
        <div>
          {legalLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
      </div>

      <style>{`
        .site-footer {
          padding: 4.5rem 1.25rem 2rem;
          background: #070708;
          border-top: 1px solid rgba(63, 63, 70, 0.55);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.8fr) repeat(2, minmax(9rem, 0.65fr));
          gap: 3rem;
          max-width: 72rem;
          margin: 0 auto 3.5rem;
        }
        .footer-brand > a {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
          color: #fafafa;
          font-family: 'Syne', system-ui, sans-serif;
          font-weight: 700;
          text-decoration: none;
        }
        .footer-brand strong { color: #ff7a1a; }
        .footer-brand p {
          max-width: 31rem;
          margin: 0 0 1.2rem;
          color: #a1a1aa;
          font-size: 0.9rem;
          line-height: 1.7;
        }
        .footer-brand small {
          color: var(--intent-muted);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .footer-grid h2 {
          margin: 0 0 1rem;
          color: #fb923c;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .footer-grid > div:not(.footer-brand) > a {
          display: flex;
          align-items: center;
          min-height: 44px;
          width: fit-content;
          max-width: 100%;
          overflow-wrap: anywhere;
          margin-bottom: 0.2rem;
          color: #a1a1aa;
          font-size: 0.86rem;
          text-decoration: none;
        }
        .footer-grid a:hover,
        .footer-grid a:focus-visible,
        .footer-bottom a:hover,
        .footer-bottom a:focus-visible { color: #fafafa; }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          max-width: 72rem;
          margin: 0 auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(63, 63, 70, 0.45);
        }
        .footer-bottom p { margin: 0; color: var(--intent-muted); font-size: 0.73rem; }
        .footer-bottom div { display: flex; flex-wrap: wrap; gap: 1.25rem; }
        .footer-bottom a { display: inline-flex; align-items: center; min-height: 44px; color: var(--intent-muted); font-size: 0.73rem; text-decoration: none; }
        a:focus-visible { outline: 2px solid #fb923c; outline-offset: 3px; }
        @media (max-width: 960px) {
          .footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </footer>
  );
}
