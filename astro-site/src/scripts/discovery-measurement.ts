import { experiences } from '../data/public-experiences.mjs';

// Only reviewed registry IDs and fixed UI enums enter event properties.
// Never forward a URL, search term, form value or DOM text.
type AnalyticsWindow = Window & { umami?: { track: (name: string, data: Record<string, string>) => unknown } };
function track(name: string, data: Record<string, string>) {
  try {
    Promise.resolve((window as AnalyticsWindow).umami?.track(name, data)).catch(() => {});
  } catch { /* Measurement must never block navigation. */ }
}

document.addEventListener('click', (event) => {
  const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const target = new URL(link.href, location.href);
  if (target.origin === location.origin && target.pathname === '/projects/') {
    const surface = link.closest('footer') ? 'footer'
      : link.closest('.site-nav') ? 'navigation'
      : link.closest('.is-estate-bar') ? 'estate-bar' : 'content';
    track('explore_open', { source: location.pathname === '/' ? 'home' : 'other', surface });
  }
  if (location.pathname !== '/projects/') return;
  const entry = experiences.find((item) =>
    item.href === link.href || item.links.some((related) => related.href === link.href));
  if (entry) track('experience_open', {
    experience: entry.id,
    category: entry.category,
    destination: entry.href === link.href ? 'primary' : 'related',
  });
});

document.querySelector('#experience-category')?.addEventListener('change', (event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (value === 'all' || experiences.some((item) => item.category === value)) {
    track('explore_filter', { category: value });
  }
});
