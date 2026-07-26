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
- Site uses Astro SSR (output: 'server') with @astrojs/node adapter — NOT static mode
- Run production: `node --env-file=.env ./dist/server/entry.mjs` after `npm run build` (or use `npm start`)
- .env file required with GEMINI_API_KEY for AI generation (fallback template works without it)