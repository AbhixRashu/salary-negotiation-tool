## Development
Always Use:
- atro, tailwind-4-docs, web-design-guidelines these 3 skills for this project
- DESIGN.md for this project design

## Salary Pitch Tool Rules
- Achievement field requires minimum 30 words (validated client-side + server-side)
- Achievement field must NOT contain inappropriate/profane language (validated client-side + server-side, warning shown + generation blocked)
- Mock fallback generator auto-sanitizes garbage input to professional text
- API timeout: 30s (not 3s) — Gemini API calls need time
- Model: gemini-3.5-flash-lite for best quality (fast, thinking disabled)
- Prompt in generate.ts must use world-class negotiation frameworks (Harvard Negotiation, FBI tactics, anchoring, BATNA)
- Keep zero-tolerance for corporate clichés in generated emails
- Google Gemini MCP available at opencode.json for AI-assisted development
- Site uses Astro SSR (output: 'server') with @astrojs/vercel adapter — NOT static mode
- `npm run build` writes the Build Output API bundle to `.vercel/output`; the Vercel adapter does NOT emit `dist/server/entry.mjs`, so `npm start` cannot serve the site locally — use `npm run dev`
- .env file required with GEMINI_API_KEY for AI generation (fallback template works without it)

## AdSense / ads.txt Rules
- `public/ads.txt` must stay exactly `google.com, pub-1132201977628357, DIRECT, f08c47fec0942fa0` — never edit, move or delete it (any change restarts the AdSense review clock)
- AdSense code (meta `google-adsense-account` + `adsbygoogle.js`) lives in `src/layouts/Layout.astro` and renders only on production (never localhost / *.vercel.app)
- The CSP in `vercel.json` must keep the Google ad domains in `script-src`/`img-src`/`frame-src`/`connect-src` — `frame-src 'none'` or an allowlist without googlesyndication silently kills all ads
- AdSense crawls ads.txt at the ROOT domain, so `salarypitcher.com/ads.txt` is the file that matters
- Main traffic is on the subdomain `govtjob.salarypitcher.com` (separate repo: `sarkari-sahayak`, also ships the same ads.txt) — keep its AdSense code + ads.txt in sync
- Adding a new third-party script/service? Re-check the CSP in `vercel.json` first, otherwise it will be blocked in production