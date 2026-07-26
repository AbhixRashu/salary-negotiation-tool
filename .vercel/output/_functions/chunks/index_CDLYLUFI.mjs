import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_D6Rm-QtC.mjs";
import { t as createComponent } from "./compiler_Db9x-0at.mjs";
import { t as $$Layout } from "./Layout_DAOvAHMr.mjs";
//#region src/pages/guides/index.astro
var guides_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const guides = [
		{
			title: "How to Negotiate Salary After a Job Offer",
			slug: "how-to-negotiate-salary-after-job-offer",
			description: "A comprehensive, step-by-step blueprint for negotiating your compensation package after receiving a formal job offer.",
			readTime: "5 min read"
		},
		{
			title: "How to Counter a Lowball Offer",
			slug: "how-to-counter-lowball-offer",
			description: "Learn how to turn a disappointing lowball offer into a constructive salary discussion without burning professional bridges.",
			readTime: "4 min read"
		},
		{
			title: "What Achievements Can Freshers List?",
			slug: "what-achievements-can-freshers-list",
			description: "A complete guide for new graduates and freshers on what achievements to write in salary negotiation — even without corporate work experience.",
			readTime: "4 min read"
		},
		{
			title: "How to Negotiate a Sign-On Bonus",
			slug: "how-to-negotiate-sign-on-bonus",
			description: "Complete guide to negotiating a signing bonus as part of your job offer, with scripts and market data for maximum impact.",
			readTime: "5 min read"
		},
		{
			title: "10 Salary Negotiation Mistakes to Avoid",
			slug: "salary-negotiation-mistakes",
			description: "Discover the most common salary negotiation mistakes that cost you thousands. Learn exactly what not to do.",
			readTime: "4 min read"
		},
		{
			title: "How to Answer Salary Expectations in Interviews",
			slug: "how-to-answer-salary-expectations",
			description: "Get the exact scripts to defer giving numbers during initial recruiter screening calls and maintain maximum leverage.",
			readTime: "3 min read"
		}
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Salary Negotiation Guides — Expert Compensation Advice",
		"description": "Browse free, practical guides on negotiating job offers, countering lowball salary figures, and answering expectation questions.",
		"breadcrumbs": [{
			name: "Home",
			path: "/"
		}, {
			name: "Guides",
			path: "/guides"
		}]
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="max-w-3xl mx-auto w-full space-y-10"><!-- Header --><div class="text-center sm:text-left space-y-3 reveal"><h1 class="text-3xl font-semibold tracking-tight text-ink">Salary Negotiation Guides</h1><p class="text-sm text-body">Step-by-step checklists, script templates, and strategic advice to help you navigate job offers confidently.</p></div><!-- Guides List --><div class="space-y-6 stagger-children reveal">${guides.map((g, i) => {
		return renderTemplate`<div class="border border-hairline bg-canvas rounded-lg shadow-sm transition-all duration-300 card-hover tilt-card glow-border overflow-hidden relative lift-on-hover">${i < 2 && renderTemplate`<span class="absolute top-3 right-3 badge-pop text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-accent-blue text-white">⭐ Most Popular</span>`}<div class="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"><div class="space-y-2 max-w-xl flex-1"><div class="flex items-center gap-2"><span class="text-lg" role="img"${addAttribute([
			"Guide",
			"Guide",
			"Guide",
			"Guide",
			"Guide",
			"Guide"
		][i], "aria-label")}>${[
			"📝",
			"🛡️",
			"🎓",
			"💰",
			"❌",
			"🎯"
		][i]}</span><span class="text-[10px] font-mono font-semibold text-mute uppercase tracking-wider">${g.readTime}</span></div><h2 class="text-lg font-semibold text-ink"><a${addAttribute(`/guides/${g.slug}`, "href")} class="hover:text-accent-blue transition-colors">${g.title}</a></h2><p class="text-sm text-body leading-relaxed">${g.description}</p><div class="flex items-center gap-2 pt-1"><span class="w-1.5 h-1.5 rounded-full" style="background: {colors[i]};"></span><span class="text-[10px] font-mono text-mute">${i === 0 ? "Beginner Friendly" : i === 1 ? "Intermediate" : i === 2 ? "Beginner" : i === 3 ? "Advanced" : i === 4 ? "All Levels" : "Beginner"}</span></div></div><a${addAttribute(`/guides/${g.slug}`, "href")} class="shrink-0 px-5 py-2.5 bg-ink text-canvas hover:bg-ink/90 font-medium rounded-full text-xs transition-colors ripple-btn btn-press magnetic-btn"><span class="magnetic-inner">Read Guide →</span></a></div></div>`;
	})}</div><!-- Tool Quick Link --><div class="border border-hairline bg-canvas p-6 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"><div class="space-y-1.5 text-center sm:text-left"><h3 class="font-semibold text-sm text-ink">Ready to write your counter-proposal?</h3><p class="text-xs text-body">Answer a few questions in our tool to get a tailored draft email instantly.</p></div><a href="/" class="px-6 py-2.5 bg-ink text-canvas hover:bg-ink/90 font-medium rounded-full text-xs transition-colors shrink-0 ripple-btn btn-press">Generate Counter-Offer</a></div></div>` })}`;
}, "C:/website/src/pages/guides/index.astro", void 0);
var $$file = "C:/website/src/pages/guides/index.astro";
var $$url = "/guides";
//#endregion
//#region \0virtual:astro:page:src/pages/guides/index@_@astro
var page = () => guides_exports;
//#endregion
export { page };
