// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://intentsolutions.io';
const SITE_HOST = 'intentsolutions.io';

// Field-note posts are intentional cross-posts: each carries an off-domain
// `canonical:` pointing at startaitools.com (the canonical publisher). They
// legitimately render here but must NOT be advertised for indexing — Google
// would (correctly) flag them as "Alternate page with proper canonical tag".
// We read frontmatter at config-load and build the set of /field-notes/<slug>/
// URLs whose canonical host is off-domain, then reject them in the sitemap
// `filter`. Self-canonical (or canonical-less, defaults to on-domain) posts and
// the /field-notes/ index stay in the sitemap.
function offDomainFieldNoteUrls() {
  const dir = fileURLToPath(new URL('./src/content/field-notes', import.meta.url));
  /** @type {Set<string>} */
  const excluded = new Set();
  let files;
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.md'));
  } catch {
    return excluded;
  }
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(`${dir}/${file}`, 'utf8');
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const canonMatch = fm[1].match(/^canonical:\s*["']?([^"'\n]+)["']?\s*$/m);
    if (!canonMatch) continue; // no canonical → treated as self-canonical, keep
    let host;
    try {
      host = new URL(canonMatch[1].trim()).host;
    } catch {
      continue;
    }
    if (host !== SITE_HOST) {
      excluded.add(`${SITE}/field-notes/${slug}/`);
    }
  }
  return excluded;
}

const offDomainPosts = offDomainFieldNoteUrls();

// Utility / non-indexable pages that should never appear in the sitemap.
const EXCLUDED_PATHS = new Set([
  `${SITE}/thank-you/`,
  `${SITE}/404/`,
]);

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },

  // iOS Safari fails to render single HTML lines longer than ~5000 chars.
  // Same rationale as tonsofskills.com — trade a few KB of gzipped bytes for
  // safe rendering on every device. Enforced by the deploy-vps.yml line-length
  // guardrail.
  compressHTML: false,

  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !EXCLUDED_PATHS.has(page) && !offDomainPosts.has(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
