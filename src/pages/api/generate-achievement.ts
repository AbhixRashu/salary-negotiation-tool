import type { APIRoute } from 'astro';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFallbackAchievement(role: string, experience?: string, industry?: string): string {
  const isFresher = experience === 'entry';
  const industryHint = industry || 'the';

  if (isFresher) {
    const fresherTemplates = [
      `During my academic career, I completed a major project using industry-standard tools that improved efficiency by ${Math.floor(Math.random() * 20) + 20}%. I led a team of ${Math.floor(Math.random() * 3) + 2} members, delivered ahead of deadline, and received top marks from faculty judges for the technical implementation and measurable impact.`,
      `As a student, I earned a professional certification in ${industryHint} through self-study while managing a full course load. I then applied these skills to build a project that attracted ${Math.floor(Math.random() * 200) + 100}+ users. This experience demonstrated my ability to learn complex skills independently and deliver results.`,
      `I interned at a company where I used analytical tools to automate a manual workflow, saving the team ${Math.floor(Math.random() * 5) + 5} hours per week. I collaborated with ${Math.floor(Math.random() * 3) + 3} cross-functional team members on a product launch and presented my findings to senior leadership.`,
      `I participated in a ${Math.floor(Math.random() * 24) + 24}-hour hackathon where my team built a solution for a real-world challenge, placing in the top ${Math.floor(Math.random() * 5) + 3} out of ${Math.floor(Math.random() * 50) + 50} teams. I handled the core implementation and architecture, and the project was recognised for its innovative approach.`,
      `I organised and led a student initiative with ${Math.floor(Math.random() * 30) + 20} members, coordinating events and managing a team of ${Math.floor(Math.random() * 3) + 3} volunteers. I grew participation by ${Math.floor(Math.random() * 20) + 20}% over one semester and received an outstanding contribution award for my efforts.`,
    ];
    return pick(fresherTemplates);
  }

  const pctImprovement = industry?.toLowerCase().includes('tech') ? '40' : '30';
  const revenueImpact = industry?.toLowerCase().includes('finance') ? '$2.5M' : '$1.5M';
  const teamSize = '10';

  const templates = [
    `In my current role, I led a critical initiative that improved team efficiency by ${pctImprovement}% within six months. I collaborated across ${teamSize} cross-functional stakeholders to deliver the project ahead of schedule, resulting in approximately ${revenueImpact} in annual value creation for the organization.`,
    `As a ${role}, I spearheaded the implementation of new processes across our department, directly improving key performance metrics by ${pctImprovement}% year-over-year. This involved coordinating with ${teamSize} team members and external partners, ultimately driving ${revenueImpact} in measurable business impact.`,
    `I led a cross-functional effort to redesign our approach to operational efficiency, delivering a ${pctImprovement}% improvement in productivity. Managing stakeholder relationships across ${teamSize} departments, I delivered results that contributed ${revenueImpact} to the bottom line while enhancing team performance.`,
    `I identified a critical gap in our ${role} workflow and developed a solution that reduced processing time by ${Math.floor(Math.random() * 20) + 20}% within the first quarter. This initiative saved approximately $${Math.floor(Math.random() * 200) + 100}K annually and was adopted across ${Math.floor(Math.random() * 3) + 2} departments as a best practice.`,
    `I managed a $${Math.floor(Math.random() * 5) + 2}M portfolio of initiatives as a ${role}, delivering ${Math.floor(Math.random() * 15) + 15}% above target across all KPIs. Through strategic stakeholder management and data-driven decision making, I reduced operational costs by ${Math.floor(Math.random() * 10) + 10}% while maintaining quality standards.`,
  ];
  return pick(templates);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { role, experience, industry } = await request.json();
    if (!role) {
      return new Response(
        JSON.stringify({ error: 'Role is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isFresher = experience === 'entry';
    const prompt = isFresher
      ? `You are a career coach helping a fresher/entry-level candidate write a career achievement. Given their target role "${role}"${industry ? ` in the ${industry} industry` : ''}, write a realistic, specific, and impressive achievement in 50-80 words. It should describe a project, internship, academic work, certification, hackathon, or leadership activity that demonstrates initiative, impact, and relevant skills. Include metrics (%, numbers, scale) wherever possible. Make it sound authentic — not generic. Write in first person. Do NOT use placeholder brackets. Do NOT add any commentary or labels — just the achievement text.`
      : `You are a career coach helping a professional applying for a "${role}" role${industry ? ` in the ${industry} industry` : ''}. Write a realistic, specific, and impressive career achievement in 50-80 words. It should describe a work accomplishment that demonstrates leadership, impact, and quantifiable results. Include specific metrics (%, revenue, time saved, team size, etc.). Make it sound authentic and specific to the role — not generic. Write in first person. Do NOT use placeholder brackets. Do NOT add any commentary or labels — just the achievement text.`;

    const geminiKeys = (process.env.GEMINI_API_KEY || '').split(',').map(k => k.trim()).filter(Boolean);

    if (geminiKeys.length) {
      for (const key of geminiKeys) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 25000);
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': key
              },
              body: JSON.stringify({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { maxOutputTokens: 300 }
              }),
              signal: controller.signal
            }
          );
          clearTimeout(timeoutId);

          if (!response.ok) {
            console.error(`Gemini achievement error (key ${key.substring(0, 6)}...):`, await response.text());
            continue;
          }

          const data = await response.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text.trim()) {
            return new Response(
              JSON.stringify({ text: text.trim() }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
        } catch (err) {
          console.error(`Gemini achievement call failed (key ${key.substring(0, 6)}...):`, err);
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, 800));
    return new Response(
      JSON.stringify({ text: generateFallbackAchievement(role, experience, industry), isFallback: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Achievement endpoint error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
