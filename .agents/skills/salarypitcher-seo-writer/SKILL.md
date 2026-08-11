---
name: salarypitcher-seo-writer
description: Generates high-quality, data-backed SEO articles for salarypitcher.com, conducts QA checks, and formats them for Astro.js.
---

# Instructions for Hermes SEO Writer

When triggered to write an SEO article for SalaryPitcher:

1. **Read Project Context:**
   - Read the existing articles in `src/content/guides/` to check for keyword cannibalization.
   - Review tool URLs: Pitch Assistant (`/pitch-assistant`), Offer Comparison (`/offer-comparison`), Salary Calculator (`/salary-calculator`), Follow-Up (`/follow-up`).

2. **Execute Writing Quality Rules:**
   - Word count: 1,500+ words minimum.
   - Frontmatter format:
     ```yaml
     ---
     title: "Title Here (≤60 chars)"
     description: "Meta description here (≤155 chars)"
     pubDate: "YYYY-MM-DD"
     keywords: ["kw1", "kw2"]
     category: "guides"
     draft: true
     ---
     ```
   - Must include:
     - 2+ cited salary data points (BLS, NACE, Glassdoor, Payscale)
     - 1+ copy-paste email/talking script block
     - 1+ ASCII diagram or table model
     - 1 real-world scenario walkthrough
     - Natural CTA linking to relevant SalaryPitcher tools.

3. **Self-QA Audit (Strict):**
   - Check against banned AI phrases ("In today's competitive...", "It's important to note...").
   - If any phrase is found, rewrite before saving.
