# DESIGN.md — Salary Pitcher (Vercel-inspired design system)

Adapted from Vercel's design language for a single-purpose utility tool. Keep the stark, calm, engineered feel — but every component below is scoped to what Salary Pitcher actually needs (a conversational form + result screen + a few content pages), not a full marketing/dashboard site. Don't add components not listed here.

## Design philosophy
Stark black-and-ink on near-white canvas. Confident, calm, zero clutter. The only decoration allowed is a single subtle accent — no mesh gradients, no illustration, no stock imagery. This is a utility tool used in a stressful moment (negotiating money) — the design should feel trustworthy and composed, not "marketing-loud."

## Colors

### Light mode (default)
```
--canvas: #ffffff
--canvas-soft: #fafafa
--canvas-soft-2: #f5f5f5
--ink: #171717          /* primary text + primary button bg */
--on-primary: #ffffff
--body: #4d4d4d          /* secondary text */
--mute: #888888          /* placeholder / fine print */
--hairline: #ebebeb      /* borders, dividers */
--hairline-strong: #a1a1a1
--link: #0070f3          /* the one accent color, used sparingly */
--link-deep: #0761d1
--link-bg-soft: #d3e5ff
--success: #0070f3
--error: #ee0000
--error-soft: #f7d4d6
--warning: #f5a623
--warning-soft: #ffefcf
```

### Dark mode
```
--canvas: #171717
--canvas-soft: #1e1e1e
--canvas-soft-2: #262626
--ink: #fafafa            /* primary text; primary button becomes white-on-dark */
--on-primary: #171717
--body: #b3b3b3
--mute: #777777
--hairline: #333333
--hairline-strong: #555555
--link: #3b9eff
--link-deep: #63b3ff
--link-bg-soft: #16305c
--success: #3b9eff
--error: #ff5c5c
--error-soft: #4a1c1c
--warning: #ffb84d
--warning-soft: #4a3a1c
```

No other accent colors. No gradients anywhere on this site — that's a Vercel-brand-specific device, not something we're borrowing.

## Typography

Font stack: `Inter, system-ui, -apple-system, sans-serif` for everything narrative. `ui-monospace, "JetBrains Mono", Menlo, monospace` only for small technical labels (e.g. a data-source citation like "BLS · 2026").

| Token | Size | Weight | Line height | Letter spacing | Use |
|---|---|---|---|---|---|
| display-xl | 44px (28px mobile) | 600 | 1.1 | -1.5px | Homepage hero headline |
| display-lg | 30px (24px mobile) | 600 | 1.15 | -1px | Section headings |
| display-md | 22px | 600 | 1.2 | -0.5px | Card headings, step titles |
| body-lg | 18px | 400 | 1.6 | 0 | Lead paragraph under hero |
| body-md | 16px | 400 | 1.6 | 0 | Default body text |
| body-sm | 14px | 400 | 1.5 | -0.2px | Secondary text, form labels |
| caption | 12px | 400 | 1.4 | 0 | Fine print, badges |
| caption-mono | 12px | 400 mono | 1.4 | 0 | Data-source citations only |
| button | 15px | 500 | 1 | 0 | All button labels |

Rules:
- Sentence-case headlines only, never uppercase (except tiny mono badges like "AI ESTIMATE" which may use letter-spaced caps at 11px as a deliberate exception).
- Display sizes carry negative letter-spacing — this is core to the calm/engineered voice, don't skip it.
- Weight ceiling is 600. Never use 700+.
- Body copy never set in mono.

## Spacing scale
4px base unit: `4, 8, 12, 16, 24, 32, 48, 64, 96`
- Section vertical padding: 64-96px desktop, 32-48px mobile
- Card interior padding: 24-32px
- Form field gap: 16px
- Button row / inline gap: 12-16px

## Layout
- Tool/form max-width: 560-600px, centered — keep the conversational flow focused, not wide
- Content/guide pages max-width: 720px for readability
- Data table page (`/average-salary-by-role`) max-width: 960px
- Mobile side margins: minimum 16px

## Shape
- Buttons: full pill (`border-radius: 100px`) for primary/secondary CTAs
- Cards, inputs, result box: `8px` radius
- Small badges/tags (e.g. "AI estimate"): full pill
- Never mix a 6px and 100px radius on the same screen — pills for buttons/badges, 8px for containers, consistently

## Elevation
Stacked, extremely subtle shadows only — never a single heavy drop shadow.
```
--shadow-card: 0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.04);
--shadow-elevated: 0px 2px 2px rgba(0,0,0,0.04), 0px 8px 16px -4px rgba(0,0,0,0.06);
```
Every card also carries a 1px inset hairline border (`--hairline`) — that's the primary "this is a distinct surface" cue, more than the shadow.

## Components (scoped to this site)

**Primary button**
- Background `--ink`, text `--on-primary`, radius 100px (pill), padding `0 20px`, height 48px, weight 500
- Hover: slight opacity/lift (translateY(-1px)), transition 150ms ease

**Secondary/ghost button**
- Background `--canvas`, text `--ink`, 1px `--hairline` border, same shape/height as primary

**Form input**
- Background `--canvas`, 1px `--hairline` border, radius 8px, height 44px, padding `0 14px`, font-size 16px (never smaller — avoids mobile zoom)
- Focus: border becomes `--link`, subtle 2px `--link-bg-soft` ring

**Card / result box**
- Background `--canvas-soft`, 1px `--hairline` border, radius 8px, padding 24px, `--shadow-card`

**Step progress indicator**
- Thin 3px bar, track `--hairline`, fill `--link`, or small dots (filled = `--link`, unfilled = `--hairline`)

**Badge** (e.g. "AI estimate," "BLS verified")
- Background `--link-bg-soft`, text `--link`, pill shape, padding `4px 10px`, caption size

**Salary range slider**
- Track `--hairline`, active fill `--link`, handle `--ink` with white ring, current value shown above handle in `display-md`

**Nav bar**
- Background `--canvas`, height 64px, padding `12px 24px`. Logo/name left, minimal links right (Tool · Calculator · Salaries by Role · Guides), dark-mode toggle as a small icon button

**Footer**
- Background `--canvas`, text `--body`, simple link columns, `caption` size, generous top padding (64px)

## Motion
- 150-200ms for hovers, 250-300ms for step transitions
- Step transitions: fade + 8-12px slide, ease-out on enter
- No bounce/spring easing anywhere
- Respect `prefers-reduced-motion`

## Do
- Keep `--ink` as the only "loud" color — it's the primary CTA and nothing else needs to compete with it
- Use the pill shape consistently for every button and badge
- Keep negative letter-spacing on all display text
- Use the inset hairline border as the main "distinct card" signal, shadows stay barely visible

## Don't
- No gradients, no decorative illustration, no stock photography — this is a utility tool, not a marketing site
- No accent color beyond `--link` blue
- No uppercase headlines
- No weight above 600
- No heavy single drop-shadows
- No dashboard-style components (pricing tiers, logo strips, code editor mockups) — not relevant to this site, skip entirely