import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/generate.ts
var generate_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var INAPPROPRIATE_WORDS = [
	"fuck",
	"fck",
	"fuk",
	"shit",
	"asshole",
	"bitch",
	"bastard",
	"dick",
	"cock",
	"pussy",
	"cunt",
	"whore",
	"slut",
	"damn",
	"chutiya",
	"madarchod",
	"bhosdike",
	"laude",
	"lund",
	"gand",
	"bhenchod",
	"bc",
	"mc",
	"suck my",
	"suck ur",
	"fuck u",
	"fuck you",
	"dickhead"
];
function containsInappropriateContent(text) {
	const lower = text.toLowerCase();
	return INAPPROPRIATE_WORDS.some((word) => {
		const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		return new RegExp("\\b" + escaped + "\\b", "i").test(lower);
	});
}
var SYSTEM_PROMPT = "You are the world's most elite salary negotiation strategist — personally hired by Fortune 500 executives to negotiate their compensation packages. You combine Harvard Negotiation Project methodology, FBI Behavioral Analysis negotiation tactics, and deep insider knowledge of HR decision-making. Your emails are so persuasive that recruiters forward them internally as examples of 'how to negotiate professionally.' Every sentence must serve a strategic purpose. Avoid ALL corporate clichés. No introductory commentary — start directly with the salutation.";
var POST = async ({ request }) => {
	try {
		const { role, company, location, currentOffer, targetSalary, competingOffer, tone, achievement, achievementDetail, lowRange, highRange, hrReplyEmail, industry, companySize } = await request.json();
		if (!role || !company || !targetSalary || !tone) return new Response(JSON.stringify({ error: "Missing required parameters. Please provide role, company, target salary, and tone." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		let safeAchievement = (achievement || "").trim();
		if (safeAchievement) {
			const wordCount = safeAchievement.split(/\s+/).filter(Boolean).length;
			if (wordCount < 30) return new Response(JSON.stringify({ error: `Achievement requires at least 30 words (you wrote ${wordCount}).` }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
			if (containsInappropriateContent(safeAchievement)) return new Response(JSON.stringify({ error: "Achievement contains inappropriate or profane language. Please revise." }), {
				status: 400,
				headers: { "Content-Type": "application/json" }
			});
		}
		const params = {
			role,
			company,
			location: location || "Remote",
			currentOffer,
			targetSalary,
			competingOffer: competingOffer === "yes" || competingOffer === true,
			tone,
			achievement: safeAchievement,
			achievementDetail: achievementDetail || "",
			lowRange: lowRange || "",
			highRange: highRange || "",
			hrReplyEmail: hrReplyEmail || "",
			industry: industry || "",
			companySize: companySize || ""
		};
		const prompt = buildPrompt(params);
		const geminiKeys = (process.env.GEMINI_API_KEY || "").split(",").map((k) => k.trim()).filter(Boolean);
		console.log(`[Request] ${(/* @__PURE__ */ new Date()).toISOString()} | ${role} @ ${company} | tone: ${tone} | gemini keys: ${geminiKeys.length}`);
		for (let i = 0; i < geminiKeys.length; i++) {
			const geminiResult = await callGemini(prompt, geminiKeys[i]);
			if (geminiResult) {
				console.log(`[Response] Gemini success (key ${i + 1}) | ${role} @ ${company}`);
				return new Response(JSON.stringify({
					text: geminiResult,
					isFallback: false
				}), {
					status: 200,
					headers: { "Content-Type": "application/json" }
				});
			}
			console.warn(`[Response] Gemini key ${i + 1} failed for ${role} @ ${company}${i < geminiKeys.length - 1 ? ", trying next key..." : ""}`);
		}
		const claudeKey = process.env.ANTHROPIC_API_KEY;
		if (claudeKey) {
			const claudeResult = await callClaude(prompt, claudeKey);
			if (claudeResult) {
				console.log(`[Response] Claude success | ${role} @ ${company}`);
				return new Response(JSON.stringify({
					text: claudeResult,
					isFallback: false
				}), {
					status: 200,
					headers: { "Content-Type": "application/json" }
				});
			}
			console.warn(`[Response] Claude failed for ${role} @ ${company}, using template`);
		}
		await new Promise((resolve) => setTimeout(resolve, 800));
		console.log(`[Response] Template fallback | ${role} @ ${company}`);
		return new Response(JSON.stringify({
			text: generateFallbackEmail(params),
			isFallback: true
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("API Endpoint Error:", error);
		return new Response(JSON.stringify({ error: error.message || "An internal server error occurred." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
async function callGemini(prompt, apiKey) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 3e4);
		const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=" + apiKey, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [{
					role: "user",
					parts: [{ text: prompt }]
				}],
				systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
				generationConfig: { maxOutputTokens: 2e3 }
			}),
			signal: controller.signal
		});
		clearTimeout(timeoutId);
		if (!response.ok) {
			const errorText = await response.text();
			console.error("Gemini API Error:", errorText);
			return null;
		}
		return (await response.json())?.candidates?.[0]?.content?.parts?.[0]?.text || null;
	} catch (err) {
		if (err.name === "AbortError") console.error("Gemini call timed out after 30s");
		else console.error("Gemini call failed:", err);
		return null;
	}
}
async function callClaude(prompt, apiKey) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 3e4);
		const response = await fetch("https://api.anthropic.com/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": apiKey,
				"anthropic-version": "2023-06-01"
			},
			body: JSON.stringify({
				model: "claude-sonnet-4-20250514",
				max_tokens: 2e3,
				messages: [{
					role: "user",
					content: prompt
				}],
				system: SYSTEM_PROMPT
			}),
			signal: controller.signal
		});
		clearTimeout(timeoutId);
		if (!response.ok) {
			const errorText = await response.text();
			console.error("Claude API Error:", errorText);
			return null;
		}
		return (await response.json()).content[0].text;
	} catch (err) {
		if (err.name === "AbortError") console.error("Claude call timed out after 30s");
		else console.error("Claude call failed:", err);
		return null;
	}
}
function buildPrompt(params) {
	const usd = (n) => new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(Number(n));
	const rangeStr = params.lowRange && params.highRange ? `${usd(params.lowRange)} to ${usd(params.highRange)}` : "market standard rates";
	const offerStr = params.currentOffer ? usd(params.currentOffer) : "the initial offer";
	const targetStr = params.targetSalary ? usd(params.targetSalary) : "a market-aligned figure";
	const achievementDetail = params.achievement || "";
	const achievementExtra = params.achievementDetail || "";
	const baseContext = `
## CANDIDATE PROFILE
- **Role:** ${params.role}
- **Company:** ${params.company}
- **Industry:** ${params.industry || "Not specified"}
- **Company Size:** ${params.companySize || "Not specified"}
- **Location:** ${params.location}
- **Experience Level Implied:** Senior professional with measurable impact
- **Current Offer:** ${offerStr}
- **Target Salary:** ${targetStr}
- **Market Range (${params.location}):** ${rangeStr}
- **Key Achievement:** ${achievementDetail}${achievementExtra ? `\n- **Additional Context:** ${achievementExtra}` : ""}
- **Competing Offer:** ${params.competingOffer ? "YES — candidate holds an active alternative offer (leverage confirmed)" : "NO — candidate is negotiating from offer strength alone"}
- **Desired Tone:** ${params.tone}
`;
	if (params.hrReplyEmail && params.hrReplyEmail.length > 10) return `You are a world-class salary negotiation strategist — the person CEOs and VPs secretly hire to negotiate their own offers. You have closed $200M+ in compensation packages across FAANG, hedge funds, and startups. You combine Harvard Negotiation Project methodology, CIA negotiation tactics (from the FBI's Behavioral Analysis Program), and real-world recruiting insider knowledge.

## CONTEXT

The candidate received the following email from a recruiter at ${params.company}:

--- BEGIN RECRUITER / HR EMAIL ---
${params.hrReplyEmail.substring(0, 500)}
--- END RECRUITER / HR EMAIL ---

${baseContext}

## STRATEGIC DIRECTIVES

Write a REPLY to the recruiter's email above. This is not a cold email — it is a professional negotiation move inside an active dialogue.

1. **Acknowledge & Validate First** — Open by referencing something specific from the recruiter's message to show engagement and build rapport. Do NOT ignore what they wrote.

2. **Apply Advanced Negotiation Frameworks:**
   - **Anchoring:** The target salary (${targetStr}) is your anchor. Frame it as data-driven, not emotional.
   - **BATNA Reinforcement:** ${params.competingOffer ? "Subtly acknowledge the competing offer as market validation of your value, but express genuine preference for " + params.company + "." : "Imply (without stating) that you have options and are being deliberate about where you land."}
   - **Value-First Positioning:** Lead with the specific value you bring (the achievement), then connect it to why the target is justified.
   - **Reciprocity Principle:** Frame the ask as enabling you to deliver maximum value to the company, not as personal gain.
   - **Liking Principle:** Maintain warm professionalism that makes the recruiter want to advocate for you internally.

3. **Tone Calibration (${params.tone}):**
   - "confident-polite": Mirror the recruiter's energy. Direct + respectful. Use language like "based on my research" and "I'm confident I can deliver."
   - "assertive": Shorter sentences. Higher agency. Use "I require" or "my baseline is." Frame it as a decision gate.
   - "warm-collaborative": Longer, warmer sentences. Use "I'd love to" and "Let's find a way." Emphasize team/culture fit.

4. **Structure Architecture:**
   - Opening: Thank + specific reference to their email + state you're excited about the role.
   - Value Paragraph: One tight sentence weaving your achievement into why the target is warranted.
   - Market Data Sentence: Reference the salary range in ${params.location} to externalize the justification.
   - The Ask: Clear, specific number (${targetStr}). Not a range — a target.
   - Closing Call to Action: Specific next step ("happy to discuss on a call this Thursday" or "let me know if you'd like to connect to align on this").

5. **FORBIDDEN PHRASES (zero tolerance):**
   - "I hope this email finds you well"
   - "I am writing to express..."
   - "First and foremost"
   - "Thank you for this opportunity" (use specific thanks instead)
   - "At this time" / "At this juncture"
   - "I would like to respectfully request"
   - "I am reaching out because..."

6. **PSYCHOLOGICAL TRIGGERS TO EMBED:**
   - Scarcity: implied without stating ("I'm being deliberate about where I land")
   - Social Proof: market data as third-party validation
   - Commitment/Consistency: tie the ask to the company's stated values or the team's goals
   - Authority: the achievement demonstrates you're a top-performer

7. **FORMATTING RULES:**
   - Max 220 words
   - 3-4 short paragraphs (2-3 sentences each)
   - Start directly with salutation: "Hi [Name]," or "Hello [Name],"
   - No subject line needed
   - Copy-paste ready — no meta commentary or explanations`;
	return `You are a world-class salary negotiation strategist — the person Fortune 500 executives secretly hire to negotiate their own compensation packages. You blend Harvard Negotiation Project methodology, FBI Behavioral Analysis negotiation tactics, and deep insider knowledge of how HR and recruiting teams evaluate counter-offers internally.

## CONTEXT

The candidate is preparing to negotiate their offer with ${params.company} for the ${params.role} position.

${baseContext}

## STRATEGIC DIRECTIVES

Write a complete, copy-paste-ready salary negotiation email. Every word must earn its place. This email will be sent to a real hiring manager or recruiter.

### 1. OPENING STRATEGY
- Start with direct appreciation for the offer itself (not a generic "thank you for this opportunity")
- Express genuine excitement about the role and the team's mission
- Create immediate rapport in 1-2 sentences

### 2. VALUE PROP POSITIONING
- Weave the candidate's key achievement (${achievementDetail || "their proven track record"}) into the justification as THE reason the target is justified
- Connect their past impact to future value for ${params.company}
- Do NOT list achievements like a resume — tell a mini-story of capability

### 3. MARKET ANCHORING
- Use the market salary data (${rangeStr}) for ${params.role} in ${params.location} as third-party validation
- Frame the target (${targetStr}) as aligned with market reality, not greed
- Externalize the justification: "Based on market data..." not "I feel I deserve..."

### 4. THE ASK — ANCHOR PRECISELY
- State the target salary clearly: ${targetStr}
- If ${params.competingOffer ? "there is a competing offer, frame it as market confirmation of your value: \"I have another offer at this level, but " + params.company + " is my clear first choice.\"" : "there is no competing offer, do NOT fabricate one. Frame the ask around value delivered + market rate alone."}
- Never give a range — a range invites them to pick the bottom

### 5. TONE ARCHITECTURE — "${params.tone}"
${params.tone === "confident-polite" ? `- **Confident & Polite:** Assertive but warm. Lead with market data, then value, then ask.
  - Sentence rhythm: declarative statements softened with "I believe" or "I'm confident"
  - Vocabulary: "based on my research," "the value I bring," "fair alignment"
  - Energy: calm, assured, collaborative` : params.tone === "assertive" ? `- **Assertive:** High agency, decisive, minimal qualifiers.
  - Sentence rhythm: short, declarative. Lead with the decision.
  - Vocabulary: "I require," "my baseline," "to move forward"
  - Energy: direct, professional, no apologizing` : `- **Warm & Collaborative:** Relationship-first, friendly but professional.
  - Sentence rhythm: longer, flowing sentences. Open with shared enthusiasm.
  - Vocabulary: "I'd love to," "let's find a way," "mutually beneficial"
  - Energy: warm, team-oriented, flexible within structure`}

### 6. CLOSING — CALL TO ACTION
- Specific, low-pressure, time-bound next step
- Examples: "I'm happy to hop on a call this week to discuss." / "Let me know if you're open to connecting briefly."
- Reiterate enthusiasm for the role

### 7. ZERO-TOLERANCE FORBIDDEN LIST
Absolutely DO NOT use any of these corporate clichés:
- "I hope this email finds you well"
- "I am writing to express my interest"
- "First and foremost"
- "Thank you for this opportunity" (use specific thanks instead)
- "At this time" / "At this juncture" / "At this point in time"
- "I would like to respectfully request"
- "I am reaching out to..."
- "Per my previous conversation"

### 8. FORMAT RULES
- Max 220 words
- 3-4 tight paragraphs (2-3 sentences max each)
- Start directly with "Hi [Hiring Manager Name]," or "Dear [Hiring Manager Name],"
- End with "Best regards" or "Best" + [Your Name]
- Copy-paste ready — no explanations, no meta commentary, no introductory text
- Single spacing between paragraphs`;
}
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function generateFallbackEmail(p) {
	const usd = (n) => new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(Number(n));
	const closings = [
		"Best,\n\n[Your Name]",
		"Best regards,\n\n[Your Name]",
		"Sincerely,\n\n[Your Name]"
	];
	const formattedRange = p.lowRange && p.highRange ? `${usd(p.lowRange)} to ${usd(p.highRange)}` : "market standard rates for this role";
	const targetStr = p.targetSalary ? usd(p.targetSalary) : "a market-aligned figure";
	const locText = p.location.toLowerCase().includes("remote") ? "nationally" : `in ${p.location}`;
	const rawAchievement = (p.achievement + " " + p.achievementDetail).trim();
	const achievement = containsInappropriateContent(rawAchievement) || rawAchievement.split(/\s+/).filter(Boolean).length < 5 ? "my track record of driving measurable business impact" : rawAchievement;
	const achievementHook = achievement.length > 20 ? achievement.replace(/\.$/, "") : "a consistent track record of delivering measurable results";
	const toneVariants = {
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
	const competingLine = pick(p.competingOffer ? [
		`I have another offer at a comparable level, but ${p.company} is my strong preference. If we can meet at ${targetStr}, I'm ready to commit immediately.`,
		`I'm currently considering a competing offer at a similar level. That said, ${p.company} is my top choice. At ${targetStr}, I'd accept right away.`,
		`Another company has put forward a competitive offer. I'd much rather join ${p.company} though — if we can settle at ${targetStr}, I'm in.`
	] : [
		`${p.company} is where I want to be, and I'm confident this is the right place for me to do my best work.`,
		`I've been intentional about where I want to take my career next, and ${p.company} is the clear frontrunner.`,
		`I'm genuinely excited about the direction of ${p.company} and the impact I can have in this role.`
	]);
	return `Hi [Hiring Manager Name],

${tone.opening}

${tone.valueLead} ${tone.ask} ${competingLine}

${tone.close}

${pick(closings)}`;
}
//#endregion
//#region \0virtual:astro:page:src/pages/api/generate@_@ts
var page = () => generate_exports;
//#endregion
export { page };
