/**
 * Submit all URLs from the generated sitemap to IndexNow.
 * Reads dist/sitemap-0.xml, extracts every <loc> URL, and POSTs
 * them to https://api.indexnow.org/indexnow.
 */
import fs from 'fs';
import path from 'path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY = '0c14c7f355d44254b99b243d7469ae72';
const HOST = 'salarypitcher.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const candidates = [
  path.join(process.cwd(), 'dist', 'client', 'sitemap-0.xml'),
  path.join(process.cwd(), 'dist', 'sitemap-0.xml'),
];
const SITEMAP_PATH = candidates.find((p) => fs.existsSync(p));

if (!SITEMAP_PATH) {
  console.error(`Sitemap not found in: ${candidates.join(', ')}`);
  console.error('Run "npm run build" first so the sitemap is generated.');
  process.exit(1);
}

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('No <loc> URLs found in sitemap.');
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

console.log(`Submitted ${urlList.length} URLs to IndexNow`);
console.log(`Status: ${res.status} ${res.statusText}`);
const body = await res.text();
if (body) console.log(`Response: ${body}`);

process.exit(res.ok ? 0 : 1);