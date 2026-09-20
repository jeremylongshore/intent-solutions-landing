#!/usr/bin/env node
// Copies the canonical estate bar (../estate-bar, the single source for every
// Intent Solutions property) into this Astro project before dev and build:
//   public/estate-bar/        the stylesheet and font, served at /estate-bar/
//   src/generated/estate-bar/ the company fragment and the link list, imported
//                             by EstateBar.astro, Footer.tsx and site-map.mjs
// Both targets are git-ignored. Every file is verified against the canonical
// manifest first, so a hand-edited source fails the build instead of shipping.
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, '..', '..', 'estate-bar');
const project = join(here, '..');

for (const line of readFileSync(join(source, 'manifest.sha256'), 'utf8').trim().split('\n')) {
  const [digest, rel] = line.split(/\s{2}/);
  const actual = createHash('sha256').update(readFileSync(join(source, rel))).digest('hex');
  if (actual !== digest) {
    console.error(`estate-bar: ${rel} does not match manifest.sha256. Run: node estate-bar/render.mjs`);
    process.exit(1);
  }
}

const pub = join(project, 'public', 'estate-bar');
const gen = join(project, 'src', 'generated', 'estate-bar');
for (const dir of [pub, gen]) { rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true }); }
cpSync(join(source, 'estate-bar.css'), join(pub, 'estate-bar.css'));
cpSync(join(source, 'fonts'), join(pub, 'fonts'), { recursive: true });
cpSync(join(source, 'fragments', 'estate-bar.company.html'), join(gen, 'estate-bar.company.html'));
cpSync(join(source, 'links.json'), join(gen, 'links.json'));
console.log('estate-bar: synced canonical bar into public/estate-bar and src/generated/estate-bar');
