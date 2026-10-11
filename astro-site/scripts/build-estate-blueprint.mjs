import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const template = readFileSync(join(root, 'src/diagrams/estate-blueprint.template.html'), 'utf8');
const fragment = readFileSync(join(root, '../estate-bar/fragments/estate-bar.company.html'), 'utf8').trim();
const stylesheet = readFileSync(join(root, '../estate-bar/estate-bar.css'), 'utf8');
const font = readFileSync(join(root, '../estate-bar/fonts/JetBrainsMono-Medium.woff2')).toString('base64');
const inlineStylesheet = stylesheet.replace(
  'url("fonts/JetBrainsMono-Medium.woff2")',
  `url("data:font/woff2;base64,${font}")`,
);

if (!template.includes('/* ESTATE_BAR_CSS */') || !template.includes('<!-- ESTATE_BAR_FRAGMENT -->')) {
  throw new Error('Estate blueprint template is missing its canonical bar slots');
}

const output = template
  .replace('/* ESTATE_BAR_CSS */', inlineStylesheet)
  .replace('<!-- ESTATE_BAR_FRAGMENT -->', fragment);

writeFileSync(join(root, 'public/estate-blueprint.html'), output);
console.log('estate-blueprint: generated self-contained HTML with canonical estate bar');
