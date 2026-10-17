import { experiences } from '../data/public-experiences.mjs';

// Only reviewed registry IDs and fixed UI enums enter event properties.
// Never forward a URL, search term, form value or DOM text.
type AnalyticsWindow = Window & { umami?: { track: (name: string, data: Record<string, string>) => unknown } };
function track(name: string, data: Record<string, string>) {
  try {
    const analytics = (window as AnalyticsWindow).umami;
    if (analytics) return Promise.resolve(analytics.track(name, data)).catch(() => {});
  } catch { /* Measurement must never block navigation. */ }
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented) return;
  const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const target = new URL(link.href, location.href);
  let delivery: Promise<unknown> | undefined;
  if (target.origin === location.origin && target.pathname === '/projects/') {
    const surface = link.closest('footer') ? 'footer'
      : link.closest('.site-nav') ? 'navigation'
      : link.closest('.is-estate-bar') ? 'estate-bar' : 'content';
    delivery = track('explore_open', { source: location.pathname === '/' ? 'home' : 'other', surface });
  }
  const entry = location.pathname === '/projects/' && experiences.find((item) =>
    item.href === link.href || item.links.some((related) => related.href === link.href));
  if (entry) delivery = track('experience_open', {
    experience: entry.id,
    category: entry.category,
    destination: entry.href === link.href ? 'primary' : 'related',
  });
  // A document unload can cancel the tracker's fetch. Give ordinary same-tab
  // navigation a short delivery window; blocked/hung analytics never traps it.
  // Preserve downloads, modifier keys and the browser's new-tab behavior.
  if (delivery && event.button === 0 && !event.ctrlKey && !event.metaKey
      && !event.shiftKey && !event.altKey && !link.download
      && (!link.target || link.target === '_self')) {
    event.preventDefault();
    const href = link.href;
    Promise.race([delivery, new Promise((resolve) => setTimeout(resolve, 250))])
      .then(() => location.assign(href));
  }
});

document.querySelector('#experience-category')?.addEventListener('change', (event) => {
  const value = (event.target as HTMLSelectElement).value;
  if (value === 'all' || experiences.some((item) => item.category === value)) {
    track('explore_filter', { category: value });
  }
});
