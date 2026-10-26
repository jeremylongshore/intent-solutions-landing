import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('field-notes'))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Field Notes | Intent Solutions',
    description: 'Architecture decisions, production systems, and technical leadership from shipping real AI infrastructure.',
    site: context.site!.toString(),
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/field-notes/${post.id.replace(/\.md$/, '')}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
