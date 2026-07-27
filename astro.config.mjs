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

  integrations: [sitemap()],
});