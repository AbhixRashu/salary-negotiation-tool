import type { APIRoute } from 'astro';



const SYSTEM_PROMPT = `You are a world-class salary negotiation strategist. You help professionals refine their negotiation emails to be more persuasive, concise, and effective. You combine Harvard Negotiation Project methodology, FBI behavioral tactics, and real HR insider knowledge.`;

const POLISH_PROMPTS: Record<string, string> = {
  'more-assertive': `Rewrite the email to be more assertive and decisive:
- Use stronger verbs ("require" instead of "would like", "need" instead of "hope")
- Shorten sentences. Remove qualifiers ("I think", "I believe", "maybe")
- State the target number as a firm baseline, not a request
- Keep max 220 words, 3-4 paragraphs, direct salutation, professional closing`,
  'warmer-tone': `Rewrite the email to be warmer and more collaborative:
- Open with genuine appreciation and relationship-building language
- Use "we" language, emphasize mutual benefit
- Soften the ask: "I'd love to find a way to..." instead of "I require"
- Add a personal touch referencing the team/culture
- Keep max 220 words, 3-4 paragraphs, direct salutation, professional closing`,
  'shorten': `Rewrite the email to be concise (max 150 words):
- Cut all fluff. Keep only: appreciation, one value sentence, market anchor, the ask, next step
- 2-3 paragraphs max. Every word must earn its place
- Direct salutation, professional closing`,
  'add-market-data': `Rewrite the email to incorporate stronger market data justification:
- Reference specific percentile data for the role/location
- Mention industry benchmarks, cost-of-living adjustments
- Frame the target as data-driven, not personal desire
- Keep max 220 words, 3-4 paragraphs, direct salutation, professional closing`,
  'fix-grammar': `Polish the email for grammar, flow, and professional tone:
- Fix any awkward phrasing, run-on sentences, or repetitive words
- Improve sentence rhythm and transitions
- Ensure consistent voice throughout
- Keep the exact same structure and key points
- Max 220 words, same paragraph count`,
  'expand-details': `Expand the email with more specific value demonstration:
- Add 1-2 sentences elaborating on the achievement with concrete metrics
- Include team size, revenue impact, % improvement, or timeline
- Keep it credible and specific — no fluff
- Max 250 words, 4 paragraphs, direct salutation, professional closing`
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, mode, context } = data;

    if (!email || !mode || !POLISH_PROMPTS[mode]) {
      return new Response(
        JSON.stringify({ error: 'Invalid request. Provide email and valid mode.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `
${POLISH_PROMPTS[mode]}

${context ? `CONTEXT FROM ORIGINAL NEGOTIATION:
${context}

` : ''}
ORIGINAL EMAIL TO POLISH:
---
${email}
---

Return ONLY the polished email. No explanations, no meta-commentary, no subject line. Start directly with "Hi [Name]," or "Hello [Name]," and end with a professional sign-off.`;

    const geminiKeys = (process.env.GEMINI_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean);

    console.log(`[Polish Request] ${new Date().toISOString()} | mode: ${mode} | keys: ${geminiKeys.length}`);

    for (let i = 0; i < geminiKeys.length; i++) {
      const result = await callGemini(prompt, geminiKeys[i]);
      if (result) {
        console.log(`[Polish Response] Gemini success (key ${i + 1}) | mode: ${mode}`);
        return new Response(
          JSON.stringify({ text: result, isFallback: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.warn(`[Polish Response] Gemini key ${i + 1} failed${i < geminiKeys.length - 1 ? ', trying next...' : ''}`);
    }

    const claudeKey = process.env.ANTHROPIC_API_KEY;
    if (claudeKey) {
      const result = await callClaude(prompt, claudeKey);
      if (result) {
        console.log(`[Polish Response] Claude success | mode: ${mode}`);
        return new Response(
          JSON.stringify({ text: result, isFallback: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.warn(`[Polish Response] Claude failed, using template`);
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    console.log(`[Polish Response] Template fallback | mode: ${mode}`);
    return new Response(
      JSON.stringify({ text: generateFallbackPolish(email, mode), isFallback: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Polish API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

async function callGemini(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 2000 }
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Polish API Error:', errorText);
      return null;
    }

    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.error('Gemini Polish call timed out after 30s');
    } else {
      console.error('Gemini call failed:', err);
    }
    return null;
  }
}

async function callClaude(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
        system: SYSTEM_PROMPT
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude Polish API Error:', errorText);
      return null;
    }

    const result = await response.json();
    return result.content[0].text;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.error('Claude Polish call timed out after 30s');
    } else {
      console.error('Claude call failed:', err);
    }
    return null;
  }
}

function generateFallbackPolish(email: string, mode: string): string {
  const paragraphs = email.split(/\n\s*\n/).filter(p => p.trim());
  const last = paragraphs.length - 1;

  const transforms: Record<string, (ps: string[]) => string[]> = {
    'more-assertive': (ps) => [
      ps[0],
      ...ps.slice(1, last + 1).map((p) =>
        p
          .replace(/\bI (?:think|believe|would (?:like|love) to|hope to)\b/gi, 'I')
          .replace(/\bI (?:am|'m) (?:confident|sure) that\b/gi, 'My baseline is that')
          .replace(/\bwould (?:love|like) to\b/gi, 'will')
          .replace(/\bcould we\b/gi, 'we must')
          .replace(/\bI was hoping\b/gi, 'I require')
          .replace(/\bI'd love to\b/gi, 'I need to')
          .replace(/\bI think\b/gi, 'I know')
          .replace(/\b(?:perhaps|maybe)\b/gi, '')
      ),
      'I\'m ready to sign once we align on this number. Please let me know by end of week.'
    ],
    'warmer-tone': (ps) => [
      ps[0],
      'I truly appreciate this offer — I\'ve really enjoyed getting to know the team and I\'m excited about where the company is heading.',
      ...ps.slice(1, last + 1).map((p) =>
        p
          .replace(/\bI (?:require|need)\b/gi, 'I\'d love to')
          .replace(/\bmy baseline is\b/gi, 'I was hoping we could')
          .replace(/\bI require\b/gi, 'would it be possible to')
          .replace(/\bI know\b/gi, 'I feel')
          .replace(/\bI will\b/gi, 'I\'d love to')
      ),
      'I\'m confident we can find something that works beautifully for both of us. Looking forward to your thoughts!'
    ],
    'shorten': (ps) => {
      const keep = Math.min(3, ps.length);
      return ps.slice(0, keep).map(p => {
        const s = p.split('. ').filter(Boolean);
        return s.slice(0, 3).join('. ') + (s.length > 3 ? '.' : '');
      });
    },
    'add-market-data': (ps) => ps.map((p, i) =>
      i === last
        ? p + '\n\nBased on current market data for this role in this location, the 75th percentile aligns with my target — this isn\'t a request, it\'s simply market reality. I hope you can see this as a data-driven request rather than a demand.'
        : p
    ),
    'fix-grammar': (ps) => ps.map(p => p
      .replace(/\s+/g, ' ')
      .replace(/\.\s*\./g, '.')
      .replace(/,\s*,/g, ',')
      .replace(/\bI\s+I\b/gi, 'I')
      .replace(/\bi\b/gi, 'I')
      .replace(/\b(?:dont|cant|wont|isnt|wasnt|didnt|doesnt|havent|hasnt|couldnt|wouldnt|shouldnt)\b/gi, (m) =>
        m.toLowerCase().replace('nt', "n't"))
      .trim()),
    'expand-details': (ps) => ps.map((p, i) =>
      i === Math.min(1, last)
        ? p + ' This result came from leading a cross-functional team of 8 and delivering 3 weeks ahead of schedule — the kind of execution I\'ll bring to this role from day one.'
        : (i === last ? p + '\n\nBeyond the numbers, I bring deep domain expertise, strong cross-functional leadership, and a track record of turning around challenging projects. I\'m excited to bring all of this to the team at ' + (ps[0]?.match(/at\s+(\w+)/i)?.[1] || 'your company') + '.' : p)
    )
  };

  const transform = transforms[mode] || transforms['fix-grammar'];
  return transform(paragraphs).join('\n\n');
}
