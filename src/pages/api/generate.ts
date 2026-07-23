import type { APIRoute } from 'astro';

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
      highRange
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

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // High-quality local mock generator conforming to all strict user rules
      const mockResult = generateMockEmail({
        role,
        company,
        location: location || 'Remote',
        currentOffer,
        targetSalary,
        competingOffer: competingOffer === 'yes' || competingOffer === true,
        tone,
        achievement: achievement || '',
        achievementDetail: achievementDetail || '',
        lowRange: lowRange || '',
        highRange: highRange || ''
      });
      
      // Delay slightly to simulate a real network response
      await new Promise(resolve => setTimeout(resolve, 800));

      return new Response(
        JSON.stringify({ 
          text: mockResult,
          isMock: true
        }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Call Anthropic API if key is present
    const prompt = buildPrompt({
      role,
      company,
      location: location || 'Remote',
      currentOffer,
      targetSalary,
      competingOffer: competingOffer === 'yes' || competingOffer === true,
      tone,
      achievement: achievement || '',
      achievementDetail: achievementDetail || '',
      lowRange: lowRange || '',
      highRange: highRange || ''
    });
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
        system: "You are an expert salary negotiation consultant. Your task is to write polished, realistic, and highly persuasive negotiation emails. Avoid corporate clichés like 'I hope this finds you well' or 'I am writing to express my appreciation'. Never include introductory conversational text. Start output directly with the salutation and keep the entire draft under 200 words."
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Claude API responded with an error. Please try again later.' }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await response.json();
    const generatedText = result.content[0].text;

    return new Response(
      JSON.stringify({ text: generatedText, isMock: false }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
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
}

function buildPrompt(params: EmailParams): string {
  const rangeStr = params.lowRange && params.highRange ? `${params.lowRange} to ${params.highRange}` : 'market standard rates';
  const offerStr = params.currentOffer ? `the initial offer of ${params.currentOffer}` : 'the initial offer';
  
  return `Write a highly-tailored salary negotiation email using the following parameters:
- Company Name: ${params.company}
- Job Title: ${params.role}
- Job Location: ${params.location}
- Initial Offer: ${offerStr}
- Target Salary Request: ${params.targetSalary}
- Market Salary Range in ${params.location}: ${rangeStr}
- Candidate Achievement/Value Context: ${params.achievement} ${params.achievementDetail ? `(Details: ${params.achievementDetail})` : ''}
- Competing Offer status: ${params.competingOffer ? 'Candidate has an active competing offer' : 'No competing offer'}
- Desired Tone: ${params.tone}

Strict constraints for the generated email:
1. Avoid generic filler and corporate clichés (DO NOT use "I hope this email finds you well", "I am writing to...", "First and foremost", "Thank you for this opportunity"). Start directly with appreciation for the offer.
2. Weave in the candidate's specific achievement and the location-based market salary range naturally as core justifications.
3. Vary the structure based on the selected tone (${params.tone}):
   - "confident and polite": Direct, self-assured, respectful, and value-driven. Lead with market data, then value add, then ask.
   - "assertive": High agency, decisive, references market positioning, and sets a firm target. Frame the ask as a decision point.
   - "warm and collaborative": Relationship-forward, friendly, expresses high interest in working together while asking for adjustment.
4. If there is a competing offer, frame it as market validation of your worth—but emphasize strong preference for ${params.company}. Position it as: "I have another offer at this level, but [Company] is my first choice if we can align on compensation."
5. End with a specific, low-pressure call to action: "happy to hop on a call this week" or "happy to chat briefly this week".
6. Keep the email copy-paste ready and strictly under 200 words. Start directly with "Dear [Hiring Manager Name]," or "Hi [Hiring Manager Name],".`;
}

function generateMockEmail(p: EmailParams): string {
  const greeting = "Hi [Hiring Manager Name],";
  const closing = "Best,\n\n[Your Name]";
  
  const formattedRange = p.lowRange && p.highRange 
    ? `${p.lowRange} to ${p.highRange}` 
    : "typical bands for this role";
  
  const locationText = p.location.toLowerCase().includes('remote') 
    ? 'for national average roles' 
    : `in the ${p.location}`;

  // Combine achievements
  const combinedAchievement = (p.achievement + " " + p.achievementDetail).trim();
  const achievementSentence = combinedAchievement.length > 5 
    ? `particularly my work in ${combinedAchievement.replace(/\.$/, '')}`
    : 'my background and technical skills';

  let body = "";

  if (p.tone === "confident and polite") {
    body = `Thanks for extending the offer to join ${p.company} as a ${p.role}. I am excited about the team's vision and the chance to contribute to your goals.

Before finalizing, I wanted to discuss the base salary. Typical market ranges for a ${p.role} ${locationText} run between ${formattedRange}. Considering this data alongside the specific value I plan to bring—${achievementSentence}—I would like to request a base salary of ${p.targetSalary}. 

${p.competingOffer 
  ? `I have a competing offer at a comparable level, but ${p.company} is my clear first choice. If we can close this gap, I'm ready to sign this week.` 
  : `I believe this target represents a fair alignment with my qualifications and will allow me to fully focus on delivering results from day one.`}

Are you open to discussing this? I am happy to hop on a call this week to align.`;
  } else if (p.tone === "assertive") {
    body = `I appreciate the offer to join ${p.company} as a ${p.role}. I am very interested in the project roadmap and look forward to contributing.

Regarding the base salary, I have evaluated the initial offer against market rates. Typical compensation for comparable ${p.role} positions ${locationText} sits between ${formattedRange}. In light of my background—especially ${achievementSentence}—I am looking for a base salary of ${p.targetSalary} to finalize our agreement.

${p.competingOffer 
  ? `I have another active offer at this level, but because ${p.company} is my top choice, I prefer to sign here if we can meet this baseline.` 
  : `This compensation reflects both my track record of delivery and the responsibilities of the role.`}

Let me know if we can connect briefly to finalize this. I am happy to hop on a call this week.`;
  } else {
    // warm and collaborative
    body = `Thank you so much for the offer to join ${p.company} as a ${p.role}! I have really enjoyed our conversations so far and am very enthusiastic about working together.

I wanted to check if there is some flexibility around the base salary. Based on market standards for a ${p.role} ${locationText} (typically ${formattedRange}) and reflecting my background—especially ${achievementSentence}—I was hoping we could look closer to ${p.targetSalary}. 

${p.competingOffer 
  ? `I do have another active offer at the moment, but my preference is strongly for this team. I want to find a package that works well for both of us.` 
  : `I am very open to discussing how we can structure this to reach a mutually beneficial agreement.`}

Let me know if you have some time. I am happy to hop on a call this week to talk through the details.`;
  }

  return `${greeting}\n\n${body}\n\n${closing}`;
}
