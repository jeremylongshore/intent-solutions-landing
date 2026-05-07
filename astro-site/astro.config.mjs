// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://intentsolutions.io',

  // iOS Safari fails to render single HTML lines longer than ~5000 chars.
  // Same rationale as tonsofskills.com — trade a few KB of gzipped bytes for
  // safe rendering on every device. Enforced by the deploy-vps.yml line-length
  // guardrail.
  compressHTML: false,

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});