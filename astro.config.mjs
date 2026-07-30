// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://salarypitcher.com',
  output: 'server',
  adapter: vercel({ maxDuration: 30 }),

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [sitemap({
    customPages: [
      'https://salarypitcher.com/',
      'https://salarypitcher.com/pitch-assistant',
      'https://salarypitcher.com/salary-calculator',
      'https://salarypitcher.com/offer-comparison',
      'https://salarypitcher.com/blog',
    ],
    serialize(item) {
      const url = item.url.replace(/\/$/, '');
      const priorityMap = {
        'https://salarypitcher.com': 1.0,
        'https://salarypitcher.com/pitch-assistant': 0.9,
        'https://salarypitcher.com/salary-calculator': 0.9,
        'https://salarypitcher.com/offer-comparison': 0.9,
        'https://salarypitcher.com/blog': 0.8,
      };
      if (url in priorityMap) {
        item.priority = priorityMap[url];
      }
      item.lastmod = new Date().toISOString();
      return item;
    },
  })],
});