/**
 * Submit all URLs from the generated sitemap to IndexNow.
 * Reads dist/sitemap-0.xml, extracts every <loc> URL, and POSTs
 * them to https://api.indexnow.org/indexnow.
 */
import fs from 'fs';
import path from 'path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY = '26eee80d4bc943dbae71d91ad8597453';
const HOST = 'salarypitcher.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const LOG_PATH = path.join(process.cwd(), 'logs', 'indexnow-submissions.log');

function appendLog(entry) {
  const line = {
    timestamp: new Date().toISOString(),
    ...entry,
  };
  fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, `${JSON.stringify(line)}\n`, 'utf8');
}

const candidates = [
  path.join(process.cwd(), 'dist', 'client', 'sitemap-0.xml'),
  path.join(process.cwd(), 'dist', 'sitemap-0.xml'),
];
const SITEMAP_PATH = candidates.find((p) => fs.existsSync(p));

if (!SITEMAP_PATH) {
  const msg = `Sitemap not found in: ${candidates.join(', ')}`;
  console.error(msg);
  console.error('Run "npm run build" first so the sitemap is generated.');
  appendLog({ status: 'error', urls: 0, detail: 'sitemap not found' });
  process.exit(1);
}

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('No <loc> URLs found in sitemap.');
  appendLog({ status: 'error', urls: 0, detail: 'no URLs in sitemap' });
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

let res;
try {
  res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
} catch (err) {
  console.error(`Request to IndexNow failed: ${err.message}`);
  appendLog({ status: 'error', urls: urlList.length, detail: err.message });
  process.exit(1);
}

const body = await res.text();
console.log(`Submitted ${urlList.length} URLs to IndexNow`);
console.log(`Status: ${res.status} ${res.statusText}`);
if (body) console.log(`Response: ${body}`);

const success = res.ok;
appendLog({ status: success ? 'success' : 'error', urls: urlList.length, httpStatus: res.status, detail: body || res.statusText });

process.exit(success ? 0 : 1);