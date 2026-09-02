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



const SYSTEM_PROMPT = "You are an expert executive communications coach. You write short, warm, confident, and highly natural salary negotiation emails for real professionals. Your emails sound 100% human, genuine, and conversational — never robotic, wordy, or packed with corporate buzzwords. Every sentence is concise and purposeful. Start directly with the salutation.";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      role,
      company,
      location,
      currentOffer,
      targetSalary,
      competingOffer,
      tone,
      achievement,
      achievementDetail,
      lowRange,
      highRange,
      hrReplyEmail,
      industry,
      companySize
    } = data;

    // Validate required fields
    if (!role || !company || !targetSalary || !tone) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters. Please provide role, company, target salary, and tone.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate achievement word count (minimum 30 words)
    let safeAchievement = (achievement || '').trim();
    if (safeAchievement) {
      const wordCount = safeAchievement.split(/\s+/).filter(Boolean).length;
      if (wordCount < 30) {
        return new Response(
          JSON.stringify({ error: `Achievement requires at least 30 words (you wrote ${wordCount}).` }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
      if (containsInappropriateContent(safeAchievement)) {
        return new Response(
          JSON.stringify({ error: 'Achievement contains inappropriate or profane language. Please revise.' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    const params: EmailParams = {
      role,
      company,
      location: location || 'Remote',
      currentOffer,
      targetSalary,
      competingOffer: competingOffer === 'yes' || competingOffer === true,
      tone,
      achievement: safeAchievement,
      achievementDetail: achievementDetail || '',
      lowRange: lowRange || '',
      highRange: highRange || '',
      hrReplyEmail: hrReplyEmail || '',
      industry: industry || '',
      companySize: companySize || '',
    };

    const prompt = buildPrompt(params);
    const geminiKeys = (process.env.GEMINI_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean);

    console.log(`[Request] ${new Date().toISOString()} | ${role} @ ${company} | tone: ${tone} | gemini keys: ${geminiKeys.length}`);

    // Try each Gemini key in order until one succeeds
    for (let i = 0; i < geminiKeys.length; i++) {
      const geminiResult = await callGemini(prompt, geminiKeys[i]);
      if (geminiResult) {
        console.log(`[Response] Gemini success (key ${i + 1}) | ${role} @ ${company}`);
        return new Response(
          JSON.stringify({ text: geminiResult, isFallback: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.warn(`[Response] Gemini key ${i + 1} failed for ${role} @ ${company}${i < geminiKeys.length - 1 ? ', trying next key...' : ''}`);
    }

    // Fallback to Anthropic Claude
    const claudeKey = process.env.ANTHROPIC_API_KEY;
    if (claudeKey) {
      const claudeResult = await callClaude(prompt, claudeKey);
      if (claudeResult) {
        console.log(`[Response] Claude success | ${role} @ ${company}`);
        return new Response(
          JSON.stringify({ text: claudeResult, isFallback: false }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.warn(`[Response] Claude failed for ${role} @ ${company}, using template`);
    }

    // Final fallback — local template
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`[Response] Template fallback | ${role} @ ${company}`);
    return new Response(
      JSON.stringify({ text: generateFallbackEmail(params), isFallback: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('API Endpoint Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An internal server error occurred.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

async function callGemini(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.6
          }
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      return null;
    }

    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.error('Gemini call timed out after 30s');
    } else {
      console.error('Gemini call failed:', err);
    }
    return null;
  }
}

async function callClaude(prompt: string, apiKey: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        temperature: 0.6,
        messages: [{ role: 'user', content: prompt }],
        system: SYSTEM_PROMPT
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', errorText);
      return null;
    }

    const result = await response.json();
    return result.content[0].text;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.error('Claude call timed out after 8.5s');
    } else {
      console.error('Claude call failed:', err);
    }
    return null;
  }
}

interface EmailParams {
  role: string;
  company: string;
  location: string;
  currentOffer: string;
  targetSalary: string;
  competingOffer: boolean;
  tone: string;
  achievement: string;
  achievementDetail: string;
  lowRange: string;
  highRange: string;
  hrReplyEmail?: string;
  industry?: string;
  companySize?: string;
}

function buildPrompt(params: EmailParams): string {
  const usd = (n: string | number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n));
  const rangeStr = params.lowRange && params.highRange
    ? `${usd(params.lowRange)} to ${usd(params.highRange)}`
    : 'market benchmarks';
  const offerStr = params.currentOffer
    ? usd(params.currentOffer)
    : 'the current offer';
  const targetStr = params.targetSalary
    ? usd(params.targetSalary)
    : 'a competitive market figure';

  const achievementDetail = params.achievement || '';

  const baseContext = `
Role: ${params.role}
Company: ${params.company}
Location: ${params.location}
Current Offer: ${offerStr}
Target Ask: ${targetStr}
Market Range: ${rangeStr}
Key Achievement: ${achievementDetail || 'proven track record of measurable business results'}
Competing Offer: ${params.competingOffer ? 'Yes (holds another competitive offer)' : 'No'}
Tone: ${params.tone}
`;

  // If user provided an HR reply email, craft a concise, natural reply
  if (params.hrReplyEmail && params.hrReplyEmail.length > 10) {
    return `Write a short, natural, human email replying to the recruiter/hiring manager. It must sound like a real person typing a quick, thoughtful email.

CONTEXT:
Recruiter's Message:
"""
${params.hrReplyEmail.substring(0, 400)}
"""

${baseContext}

STRICT WRITING RULES:
1. TOTAL LENGTH: 80–120 words MAX. Exactly 2 or 3 short paragraphs.
2. TONE (${params.tone}):
   - confident-polite: Warm, respectful, clear, and positive.
   - assertive: Crisp, decisive, polite, straight to the point.
   - warm-collaborative: Very friendly, enthusiastic, solution-oriented.
3. STRUCTURE:
   - Paragraph 1: Thank them and reference their note warmly.
   - Paragraph 2: State the counter salary (${targetStr}) clearly, mentioning market rate or key impact naturally in 1 sentence.
   - Paragraph 3: Express excitement and readiness to finalize ("If we can make this work, I'm ready to move forward right away. Happy to jump on a quick call!").
4. ZERO CORPORATE ROBOTIC CLICHÉS:
   - NO "I hope this email finds you well"
   - NO "I am writing to respectfully request"
   - NO "At this juncture" / "First and foremost"
   - NO "Deliberate about where I land"
5. Start immediately with "Hi [Name]," or "Hello [Name],". End with "Best," or "Best regards," followed by "[Your Name]". No commentary or subject lines.`;
  }

  return `Write a concise, natural, human salary negotiation counter-offer email. It must sound like a real professional typing a genuine email from their inbox, NOT an AI or a textbook.

${baseContext}

STRICT WRITING RULES:
1. TOTAL LENGTH: 90–130 words MAX (strictly keep under 140 words). Exactly 2 or 3 short, easy-to-read paragraphs.
2. TONE (${params.tone}):
   - confident-polite: Warm, appreciative, clear, and confident.
   - assertive: Direct, professional, firm on the number, no fluff.
   - warm-collaborative: Friendly, relationship-first, excited to join.
3. STRUCTURE:
   - Paragraph 1: Genuine thanks for the offer and excitement about the ${params.role} role at ${params.company} (1-2 sentences).
   - Paragraph 2: Weave in the key impact (${achievementDetail ? 'their achievement' : 'past track record'}) and market range (${rangeStr}), then state the exact target figure (${targetStr}) as the desired base salary. (1-2 sentences).
   ${params.competingOffer ? '- Mention having another competitive offer, but make it clear that ' + params.company + ' is the #1 choice.' : ''}
   - Paragraph 3: Strong commitment hook ("If we can align around ${targetStr}, I am ready to sign the offer immediately. Let me know if you're open to a quick call to discuss!").
4. STRICT FORBIDDEN PHRASES (Do NOT use):
   - "I hope this email finds you well"
   - "I am writing to express..."
   - "First and foremost"
   - "At this juncture" / "At this point in time"
   - "I would like to respectfully request"
   - "Per my previous conversation"
5. FORMAT:
   - Start directly with "Hi [Hiring Manager Name]," or "Dear [Hiring Manager Name],"
   - End with "Best regards," or "Best," followed by "[Your Name]".
   - Return ONLY the clean, ready-to-copy email text without any intro, outro, or subject line.`;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFallbackEmail(p: EmailParams): string {
  const usd = (n: string | number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(n));
  const closings = ["Best,\n\n[Your Name]", "Best regards,\n\n[Your Name]", "Sincerely,\n\n[Your Name]"];
  const formattedRange = p.lowRange && p.highRange
    ? `${usd(p.lowRange)} to ${usd(p.highRange)}`
    : "market standard rates for this role";
  const targetStr = p.targetSalary ? usd(p.targetSalary) : 'a market-aligned figure';
  const locText = p.location.toLowerCase().includes('remote') ? 'nationally' : `in ${p.location}`;
  const rawAchievement = (p.achievement + " " + p.achievementDetail).trim();
  const isGarbage = containsInappropriateContent(rawAchievement) || rawAchievement.split(/\s+/).filter(Boolean).length < 5;
  const achievement = isGarbage ? 'my track record of driving measurable business impact' : rawAchievement;
  const achievementHook = achievement.length > 20
    ? achievement.replace(/\.$/, '')
    : 'a consistent track record of delivering measurable results';

  const toneVariants: Record<string, { opening: string[]; valueLead: string[]; ask: string[]; close: string[] }> = {
    "confident-polite": {
      opening: [
        `Thank you for the offer to join ${p.company} as a ${p.role}. I've been following the team's work closely, and I'm excited about the problems you're solving.`,
        `I'm grateful for the offer to join ${p.company} as a ${p.role}. The conversation reaffirmed my excitement about the work your team is doing.`,
        `Thank you for extending this offer for the ${p.role} position at ${p.company}. I've been impressed by your team's vision and the impact you're creating.`
      ],
      valueLead: [
        `Based on my background — ${achievementHook} — and market research showing the range for comparable ${p.role} roles ${locText} is ${formattedRange},`,
        `With ${achievementHook} and industry benchmarks placing this role ${locText} at ${formattedRange},`,
        `Given my experience — ${achievementHook} — and the market range for ${p.role} roles ${locText} of ${formattedRange},`
      ],
      ask: [
        `I believe ${targetStr} represents a fair reflection of the value I'll bring from day one.`,
        `I'm confident that ${targetStr} aligns with the impact I can deliver.`,
        `I think ${targetStr} appropriately reflects the experience and results I bring.`
      ],
      close: [
        `I'm eager to move forward if we can align here. Happy to connect briefly this week to discuss.`,
        `I'd love to find a path forward at that level. Let me know if you're open to a quick call.`,
        `I'm excited about the opportunity and hope we can settle at ${targetStr}. Happy to discuss further.`
      ]
    },
    "assertive": {
      opening: [
        `I appreciate the offer to join ${p.company} as a ${p.role}. I've evaluated it carefully against my criteria.`,
        `Thank you for the ${p.role} offer at ${p.company}. I've reviewed the terms against current market conditions.`,
        `I've received and reviewed the offer for the ${p.role} position at ${p.company}. Here are my thoughts.`
      ],
      valueLead: [
        `Given my track record — ${achievementHook} — and market data placing comparable ${p.role} roles ${locText} at ${formattedRange},`,
        `Based on ${achievementHook} and the standard range for ${p.role} roles ${locText} of ${formattedRange},`,
        `With clear evidence of ${achievementHook} and market rates ${locText} at ${formattedRange},`
      ],
      ask: [
        `my baseline to move forward is ${targetStr}.`,
        `my requirement to proceed is ${targetStr}.`,
        `I require ${targetStr} to align with current market value.`
      ],
      close: [
        `I'm ready to sign once we align on this. Let me know if you'd like to connect to finalize.`,
        `I'm prepared to sign at ${targetStr}. Let me know your thoughts this week.`,
        `Let me know if you can meet at ${targetStr} — I'm ready to move forward.`
      ]
    },
    "warm-collaborative": {
      opening: [
        `Thank you so much for the offer to join ${p.company} as a ${p.role}! I've really enjoyed our conversations and would love to be part of what you're building.`,
        `I was so happy to receive the offer for the ${p.role} role at ${p.company}. I truly admire the culture and mission you're building.`,
        `Thank you for this wonderful opportunity to join ${p.company} as a ${p.role}. I've been thinking about how I can contribute meaningfully to the team.`
      ],
      valueLead: [
        `Reflecting on my experience — especially ${achievementHook} — and looking at market standards for ${p.role} roles ${locText} (typically ${formattedRange}),`,
        `Considering ${achievementHook} and the typical range for ${p.role} roles ${locText} of ${formattedRange},`,
        `When I look at ${achievementHook} alongside the market data for ${p.role} positions ${locText} showing ${formattedRange},`
      ],
      ask: [
        `I was hoping we could look toward ${targetStr} to make this work well for both of us.`,
        `I'd love to find a way to get to ${targetStr} — I think that's where we both win.`,
        `Would it be possible to align around ${targetStr}? I believe that's a great starting point for us.`
      ],
      close: [
        `I'm very open to discussing how we get there. Let me know if you have time to chat this week!`,
        `I'd really love to make this work. Happy to jump on a call to explore how we can get to ${targetStr}.`,
        `Looking forward to your thoughts! I'm confident we can find something that works for everyone.`
      ]
    }
  };

  const defaultVariants = toneVariants["confident-polite"];
  const tv = toneVariants[p.tone] || defaultVariants;
  const tone = {
    opening: pick(tv.opening),
    valueLead: pick(tv.valueLead),
    ask: pick(tv.ask),
    close: pick(tv.close)
  };

  const competeVariants = p.competingOffer
    ? [
      `I have another offer at a comparable level, but ${p.company} is my strong preference. If we can meet at ${targetStr}, I'm ready to commit immediately.`,
      `I'm currently considering a competing offer at a similar level. That said, ${p.company} is my top choice. At ${targetStr}, I'd accept right away.`,
      `Another company has put forward a competitive offer. I'd much rather join ${p.company} though — if we can settle at ${targetStr}, I'm in.`
    ]
    : [
      `${p.company} is where I want to be, and I'm confident this is the right place for me to do my best work.`,
      `I've been intentional about where I want to take my career next, and ${p.company} is the clear frontrunner.`,
      `I'm genuinely excited about the direction of ${p.company} and the impact I can have in this role.`
    ];

  const competingLine = pick(competeVariants);

  return `Hi [Hiring Manager Name],

${tone.opening}

${tone.valueLead} ${tone.ask} ${competingLine}

${tone.close}

${pick(closings)}`;
}
