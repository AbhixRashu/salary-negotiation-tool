import type { APIRoute } from 'astro';

const INAPPROPRIATE_WORDS = [
  'fuck', 'fck', 'fuk', 'shit', 'asshole', 'bitch', 'bastard', 'dick',
  'cock', 'pussy', 'cunt', 'whore', 'slut', 'damn', 'chutiya', 'madarchod',
  'bhosdike', 'laude', 'lund', 'gand', 'bhenchod', 'bc', 'mc', 'suck my',
  'suck ur', 'fuck u', 'fuck you', 'dickhead'
];

function containsInappropriateContent(text: string): boolean {
  const lower = text.toLowerCase();
  return INAPPROPRIATE_WORDS.some(word => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escaped + '\\b', 'i');
    return regex.test(lower);
  });
}

function sanitizeAchievement(text: string): string {
  if (!text) return '';
  return text.split(/\s+/).filter(w => {
    const lower = w.toLowerCase().replace(/[^a-z]/g, '');
    return !INAPPROPRIATE_WORDS.some(bad => lower.includes(bad));
  }).join(' ');
}

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

    const geminiKey = process.env.GEMINI_API_KEY;

    console.log(`[Polish Request] ${new Date().toISOString()} | mode: ${mode}`);

    if (geminiKey) {
      const result = await callGemini(prompt, geminiKey);
      if (result) {
        console.log(`[Polish Response] Gemini success | mode: ${mode}`);
        return new Response(
          JSON.stringify({ text: result, isMock: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.warn(`[Polish Response] Gemini failed, trying fallback`);
    }

    const claudeKey = process.env.ANTHROPIC_API_KEY;
    if (claudeKey) {
      const result = await callClaude(prompt, claudeKey);
      if (result) {
        console.log(`[Polish Response] Claude success | mode: ${mode}`);
        return new Response(
          JSON.stringify({ text: result, isMock: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.warn(`[Polish Response] Claude failed, using mock`);
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    console.log(`[Polish Response] Mock fallback | mode: ${mode}`);
    return new Response(
      JSON.stringify({ text: generateMockPolish(email, mode), isMock: true }),
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
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          systemInstruction: { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { maxOutputTokens: 2000, temperature: 0.6 }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini Polish API Error:', errorText);
      return null;
    }

    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err) {
    console.error('Gemini call failed:', err);
    return null;
  }
}

async function callClaude(prompt: string, apiKey: string): Promise<string | null> {
  try {
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
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude Polish API Error:', errorText);
      return null;
    }

    const result = await response.json();
    return result.content[0].text;
  } catch (err) {
    console.error('Claude call failed:', err);
    return null;
  }
}

function generateMockPolish(email: string, mode: string): string {
  const lines = email.split('\n').filter(l => l.trim());
  const closing = lines.pop() || 'Best,\n[Your Name]';
  const body = lines.slice(1).join('\n');

  const transformations: Record<string, (body: string) => string> = {
    'more-assertive': (b) => b
      .replace(/I (think|believe|would like to|hope to)/gi, '')
      .replace(/I (am|'m) (confident|sure) that/gi, 'My baseline is')
      .replace(/would (love|like) to/gi, 'need to')
      .replace(/could we/gi, 'we need to')
      .replace(/I was hoping/gi, 'I require')
      + '\n\nI\'m ready to sign once we align here.',
    'warmer-tone': (b) => 'I truly appreciate the offer and have enjoyed our conversations.\n\n' + b
      .replace(/I (require|need)/gi, 'I\'d love to')
      .replace(/my baseline is/gi, 'I was hoping we could')
      .replace(/I require/gi, 'would it be possible to')
      + '\n\nI\'m confident we can find something that works for both of us.',
    'shorten': (b) => {
      const sentences = b.split('. ').filter(s => s.trim());
      return sentences.slice(0, 4).join('. ') + '.';
    },
    'add-market-data': (b) => b + '\n\nBased on current market data for this role in this metro, the 75th percentile aligns with my target — this isn\'t a request, it\'s market reality.',
    'fix-grammar': (b) => b
      .replace(/\s+/g, ' ')
      .replace(/\.\s*\./g, '.')
      .replace(/,\s*,/g, ',')
      .replace(/I\s+I/gi, 'I')
      .trim(),
    'expand-details': (b) => b + '\n\nThis impact was achieved while leading a cross-functional team of 8 and delivering 3 weeks ahead of schedule — the kind of execution I\'ll bring to this role from day one.'
  };

  const transform = transformations[mode] || transformations['fix-grammar'];
  const newBody = transform(body);
  return 'Hi [Hiring Manager Name],\n\n' + newBody + '\n\n' + closing;
}