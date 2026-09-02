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

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
    fallback: {
      es: 'en',
      fr: 'en',
      de: 'en',
      pt: 'en',
      it: 'en',
      ja: 'en',
    },
  },

  vite: {
      plugins: [tailwindcss()],
  },

  integrations: [sitemap({
    serialize(item) {
      const url = item.url.replace(/\/$/, '');
      const priorityMap = {
        'https://salarypitcher.com/en': 1.0,
        'https://salarypitcher.com/en/pitch-assistant': 0.9,
        'https://salarypitcher.com/en/salary-calculator': 0.9,
        'https://salarypitcher.com/en/offer-comparison': 0.9,
        'https://salarypitcher.com/en/blog': 0.8,
      };
      if (url in priorityMap) {
        item.priority = priorityMap[url];
      }
      item.lastmod = new Date().toISOString();
      return item;
    },
  })],
});