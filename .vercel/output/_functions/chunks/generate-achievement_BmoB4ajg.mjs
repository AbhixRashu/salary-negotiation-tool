import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/generate-achievement.ts
var generate_achievement_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { role, experience, industry } = await request.json();
		if (!role) return new Response(JSON.stringify({ error: "Role is required." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const prompt = experience === "entry" ? `You are a career coach helping a fresher/entry-level candidate write a career achievement. Given their target role "${role}"${industry ? ` in the ${industry} industry` : ""}, write a realistic, specific, and impressive achievement in 50-80 words. It should describe a project, internship, academic work, certification, hackathon, or leadership activity that demonstrates initiative, impact, and relevant skills. Include metrics (%, numbers, scale) wherever possible. Make it sound authentic — not generic. Write in first person. Do NOT use placeholder brackets. Do NOT add any commentary or labels — just the achievement text.` : `You are a career coach helping a professional applying for a "${role}" role${industry ? ` in the ${industry} industry` : ""}. Write a realistic, specific, and impressive career achievement in 50-80 words. It should describe a work accomplishment that demonstrates leadership, impact, and quantifiable results. Include specific metrics (%, revenue, time saved, team size, etc.). Make it sound authentic and specific to the role — not generic. Write in first person. Do NOT use placeholder brackets. Do NOT add any commentary or labels — just the achievement text.`;
		const geminiKeys = (process.env.GEMINI_API_KEY || "").split(",").map((k) => k.trim()).filter(Boolean);
		if (!geminiKeys.length) return new Response(JSON.stringify({ error: "Gemini API key not configured." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
		for (const key of geminiKeys) try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 8500);
			const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=" + key, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contents: [{
						role: "user",
						parts: [{ text: prompt }]
					}],
					generationConfig: { maxOutputTokens: 300 }
				}),
				signal: controller.signal
			});
			clearTimeout(timeoutId);
			if (!response.ok) {
				console.error(`Gemini achievement error (key ${key.substring(0, 6)}...):`, await response.text());
				continue;
			}
			const text = (await response.json())?.candidates?.[0]?.content?.parts?.[0]?.text || "";
			if (text.trim()) return new Response(JSON.stringify({ text: text.trim() }), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		} catch (err) {
			console.error(`Gemini achievement call failed (key ${key.substring(0, 6)}...):`, err);
		}
		return new Response(JSON.stringify({ error: "All Gemini keys failed." }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error("Achievement endpoint error:", err);
		return new Response(JSON.stringify({ error: err.message || "Server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/generate-achievement@_@ts
var page = () => generate_achievement_exports;
//#endregion
export { page };
