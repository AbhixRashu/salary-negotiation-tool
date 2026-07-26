import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_D6Rm-QtC.mjs";
import { t as createComponent } from "./compiler_Db9x-0at.mjs";
import { t as $$Layout } from "./Layout_DAOvAHMr.mjs";
//#region src/pages/negotiation-strategy.astro
var negotiation_strategy_exports = /* @__PURE__ */ __exportAll({
	default: () => $$NegotiationStrategy,
	file: () => $$file,
	url: () => $$url
});
var $$NegotiationStrategy = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Negotiation Strategy Guide — Personalized Playbook | Salary Pitcher",
		"description": "Answer a few questions to get a personalized salary negotiation playbook with talking points, scripts, timing strategy, and leverage analysis."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="w-full space-y-8 max-w-3xl mx-auto"><div class="text-center reveal"><h1 class="text-3xl font-semibold tracking-tight text-ink mb-2">Negotiation Strategy Guide</h1><p class="text-sm text-body max-w-lg mx-auto">Answer 5 quick questions to get a personalized negotiation playbook — talking points, scripts, timing, and power dynamics.</p></div><!-- Progress --><div id="progressArea" class="hidden reveal"><div class="flex justify-between items-center text-xs font-mono text-mute mb-2"><span id="stratStep">Step 1 of 5</span><span id="stratPct">0%</span></div><div class="h-2 bg-hairline rounded-full overflow-hidden"><div id="stratFill" class="h-full rounded-full transition-all duration-500 ease-out" style="width:0%"></div></div></div><!-- Step Card --><div id="stratCard" class="border border-hairline bg-canvas p-6 sm:p-8 rounded-lg shadow-sm reveal"><div id="stratQuestion" class="text-xl sm:text-2xl font-semibold text-ink tracking-tight mb-6"></div><div id="stratOptions" class="space-y-3"></div><div id="stratNav" class="hidden flex justify-between items-center pt-6 border-t border-hairline mt-6"><button id="stratBack" class="px-5 py-2 rounded-full border border-hairline bg-canvas hover:bg-canvas-soft text-body hover:text-ink text-sm transition-colors cursor-pointer">← Back</button><button id="stratNext" class="px-6 py-2 bg-ink text-canvas hover:bg-ink/90 font-medium rounded-full text-sm transition-all cursor-pointer">Continue</button></div></div><!-- Playbook Result --><div id="playbookResult" class="hidden space-y-6 reveal"><div class="border border-hairline bg-canvas rounded-lg shadow-sm overflow-hidden"><div class="p-5 border-b border-hairline bg-canvas-soft-2 flex items-center justify-between"><div><h2 class="text-lg font-semibold text-ink">Your Negotiation Playbook</h2><p id="playbookSummary" class="text-xs text-mute mt-0.5"></p></div><button id="btnRestart" class="text-xs text-mute hover:text-ink font-mono underline transition-colors cursor-pointer">Start over</button></div><div id="playbookContent" class="p-5 space-y-6"></div></div></div></div>` })}<script>
  (function () {
    const steps = [
      {
        id: "scenario",
        question: "What's your negotiation scenario?",
        options: [
          { id: "new-offer", label: "New Job Offer", desc: "You received a written offer and want to negotiate a higher package.", icon: "📋" },
          { id: "promotion", label: "Promotion / Internal Move", desc: "You're moving up within your current company.", icon: "📈" },
          { id: "raise", label: "Asking for a Raise", desc: "You want a salary increase in your current role.", icon: "💪" },
          { id: "counter-offer", label: "Counter-Offer (Resignation)", desc: "You resigned and they want you to stay.", icon: "🤝" },
          { id: "multiple-offers", label: "Multiple Offers", desc: "You have 2+ offers and want to maximize leverage.", icon: "⚔️" },
        ],
      },
      {
        id: "leverage",
        question: "How would you rate your leverage?",
        options: [
          { id: "strong", label: "Strong — I have competing offers / unique skills", desc: "They need you more than you need them.", icon: "🔥" },
          { id: "balanced", label: "Balanced — Solid profile, typical negotiation", desc: "Standard back-and-forth expected.", icon: "⚖️" },
          { id: "weak", label: "Weak — Entry-level / limited options", desc: "You're early career or have few alternatives.", icon: "🌱" },
        ],
      },
      {
        id: "timeline",
        question: "Where are you in the process?",
        options: [
          { id: "offer-in-hand", label: "Offer in Hand", desc: "Written offer received, reviewing terms.", icon: "✉️" },
          { id: "verbal-offer", label: "Verbal Offer Received", desc: "They told you the number, nothing in writing yet.", icon: "🗣️" },
          { id: "final-round", label: "Waiting for Decision", desc: "In final rounds, expecting an offer soon.", icon: "⏳" },
          { id: "early-stage", label: "Early Interviews", desc: "Just started talking to them.", icon: "🚪" },
        ],
      },
      {
        id: "priority",
        question: "What's your top priority?",
        options: [
          { id: "base-salary", label: "Maximize Base Salary", desc: "Highest possible guaranteed cash.", icon: "💰" },
          { id: "total-comp", label: "Total Compensation", desc: "Best overall package including equity, bonus, benefits.", icon: "📊" },
          { id: "work-life", label: "Work-Life Balance / Flexibility", desc: "Remote days, PTO, hours, culture.", icon: "🏡" },
          { id: "growth", label: "Career Growth / Title / Role", desc: "Promotion path, scope, responsibility.", icon: "🚀" },
        ],
      },
      {
        id: "company-type",
        question: "What type of company?",
        options: [
          { id: "big-tech", label: "Big Tech / Public Company", desc: "Meta, Google, Microsoft, Amazon, Apple, etc.", icon: "🏛️" },
          { id: "startup", label: "Startup / Pre-IPO", desc: "Series A-C, private valuation, equity-heavy.", icon: "🚀" },
          { id: "finance", label: "Finance / Consulting", desc: "Banking, PE, consulting — bonus-heavy culture.", icon: "🏦" },
          { id: "mid-market", label: "Mid-Market / Enterprise", desc: "Established company, structured bands.", icon: "🏢" },
          { id: "nonprofit", label: "Nonprofit / Government / Education", desc: "Mission-driven, less flexibility on cash.", icon: "🏛️" },
        ],
      },
    ];

    let currentStep = 0;
    const answers = {};

    const $ = (id) => document.getElementById(id);
    const stratCard = $("stratCard");
    const stratQuestion = $("stratQuestion");
    const stratOptions = $("stratOptions");
    const stratNav = $("stratNav");
    const stratBack = $("stratBack");
    const stratNext = $("stratNext");
    const progressArea = $("progressArea");
    const stratStep = $("stratStep");
    const stratPct = $("stratPct");
    const stratFill = $("stratFill");
    const playbookResult = $("playbookResult");
    const playbookContent = $("playbookContent");
    const playbookSummary = $("playbookSummary");

    function renderStep() {
      const step = steps[currentStep];
      stratQuestion.textContent = step.question;
      stratOptions.innerHTML = step.options.map(o => \`
        <button class="strat-option w-full text-left px-4 py-3.5 border border-hairline rounded-md hover:border-accent-blue/50 hover:bg-canvas-soft transition-all cursor-pointer flex items-center gap-3" data-id="\${o.id}">
          <span class="text-lg shrink-0">\${o.icon}</span>
          <div>
            <div class="text-sm font-semibold text-ink">\${o.label}</div>
            <div class="text-xs text-mute mt-0.5">\${o.desc}</div>
          </div>
          <span class="ml-auto text-accent-blue opacity-0 group-[.selected]:opacity-100 transition-opacity" id="check-\${o.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
        </button>
      \`).join("");

      // Restore selection
      const sel = answers[step.id];
      if (sel) {
        stratOptions.querySelectorAll(".strat-option").forEach(btn => {
          if (btn.dataset.id === sel) {
            btn.classList.add("selected", "border-accent-blue", "bg-accent-blue/5");
            btn.classList.remove("border-hairline");
          }
        });
      }

      stratOptions.querySelectorAll(".strat-option").forEach(btn => {
        btn.addEventListener("click", function () {
          stratOptions.querySelectorAll(".strat-option").forEach(b => {
            b.classList.remove("selected", "border-accent-blue", "bg-accent-blue/5");
            b.classList.add("border-hairline");
          });
          this.classList.add("selected", "border-accent-blue", "bg-accent-blue/5");
          this.classList.remove("border-hairline");
          answers[steps[currentStep].id] = this.dataset.id;
        });
      });

      stratNav.classList.remove("hidden");
      stratBack.classList.toggle("hidden", currentStep === 0);
      stratNext.textContent = currentStep === steps.length - 1 ? "Generate My Playbook →" : "Continue →";

      // Progress
      progressArea.classList.remove("hidden");
      const pct = Math.round(((currentStep + 1) / steps.length) * 100);
      stratStep.textContent = \`Step \${currentStep + 1} of \${steps.length}\`;
      stratPct.textContent = \`\${pct}%\`;
      stratFill.style.width = \`\${pct}%\`;
    }

    function validateStep() {
      const step = steps[currentStep];
      if (!answers[step.id]) {
        stratOptions.querySelectorAll(".strat-option").forEach(b => {
          b.classList.add("animate-shake");
          setTimeout(() => b.classList.remove("animate-shake"), 500);
        });
        return false;
      }
      return true;
    }

    function generatePlaybook() {
      const l = answers.leverage || "balanced";
      const s = answers.scenario || "new-offer";
      const t = answers.timeline || "offer-in-hand";
      const p = answers.priority || "base-salary";
      const c = answers["company-type"] || "mid-market";

      const leverageMap = { strong: "Strong", balanced: "Balanced", weak: "Building" };
      const priorityLabel = {
        "base-salary": "maximize base salary",
        "total-comp": "maximize total compensation",
        "work-life": "secure flexibility and balance",
        "growth": "accelerate career growth",
      };

      playbookSummary.textContent = \`\${leverageMap[l]} leverage · \${s.replace(/-/g, " ")} · prioritizing to \${priorityLabel[p]}\`;

      const sections = [];

      // 1. Power Dynamics
      const powerTips = {
        "new-offer": {
          strong: "They've chosen you. Use competing offers to anchor higher. Your BATNA is excellent — you can afford to push.",
          balanced: "Standard negotiation. They expect you to negotiate. Ask for 10-20% above offer, settle at 5-15% above.",
          weak: "Focus on value, not need. Frame everything around what you bring. Don't apologize — you earned the offer.",
        },
        "promotion": {
          strong: "You have external options. Reference market rates for the new role level. Ask for market adjustment + promotion increase.",
          balanced: "Research the new level's range. Ask to be placed at the 50th-75th percentile. Frame as alignment, not demand.",
          weak: "Focus on future potential. Ask for a 6-month review with promised increase based on performance milestones.",
        },
        "raise": {
          strong: "Bring competitive offers or market data. Ask for market-rate adjustment. You have walk-away power — use it respectfully.",
          balanced: "Document your achievements quantitatively. Schedule a dedicated meeting (not a hallway ask). Anchor with market data.",
          weak: "Focus on contributions and growth. Ask for a small increase + a clear path to a larger one. Get commitments in writing.",
        },
        "counter-offer": {
          strong: "They've shown they value you. This is your strongest position. Name your number and be ready to walk. Get everything in writing.",
          balanced: "Decide if you actually want to stay before negotiating. If yes, ask for the market rate. Don't accept a match — ask for more.",
          weak: "Be careful — counter-offers accepted under pressure often end badly. If you stay, get a concrete improvement plan.",
        },
        "multiple-offers": {
          strong: "This is the ultimate leverage. Be transparent: 'I have competing offers and need to make a decision soon.' Let them bid.",
          balanced: "Use deadline pressure professionally. Get best and final from each. Compare total comp, not just base.",
          weak: "Even multiple offers give you data. Use the highest to anchor with the one you prefer most. Don't bluff.",
        },
      };

      sections.push({
        title: "Power Dynamics",
        icon: "⚡",
        content: powerTips[s]?.[l] || powerTips["new-offer"][l],
      });

      // 2. Timing Strategy
      const timingAdvice = {
        "offer-in-hand": "Don't respond immediately. Take 24-48 hours to review. Reply within 3-5 business days. Never negotiate on a Friday afternoon — aim for Tuesday or Wednesday morning.",
        "verbal-offer": "Get it in writing first. Say: 'Thank you, I'm very excited. Could you send over the written offer so I can review the full details?' Never negotiate verbally — written gives you leverage.",
        "final-round": "Continue interviewing elsewhere until you have a written offer. Don't negotiate before you have an offer. Use this time to research market rates.",
        "early-stage": "Don't discuss numbers yet. Deflect with: 'I'd like to learn more about the role first before discussing compensation.' Focus on demonstrating value.",
      };
      sections.push({
        title: "Timing Strategy",
        icon: "⏰",
        content: timingAdvice[t] || timingAdvice["offer-in-hand"],
      });

      // 3. Script / Talking Points
      let openingScript = "";
      if (s === "new-offer") {
        openingScript = \`"Thank you so much for the offer. I'm genuinely excited about the role and the team's mission. I've reviewed the compensation and based on my research on market rates for similar roles\${c === "big-tech" || c === "startup" ? " at this level" : ""}, I was hoping we could look at a base salary of [target]. I'm confident I can deliver strong results from day one, and I believe this reflects the value I'll bring."\`;
      } else if (s === "promotion") {
        openingScript = \`"I'm really excited about the new role and the opportunity to contribute at this level. Based on market research for \${c === "big-tech" ? "similar-level roles at comparable companies" : "this position"}, I believe a compensation adjustment to [amount] would be appropriate. Can we discuss what range you had in mind for this level?"\`;
      } else if (s === "raise") {
        openingScript = \`"I've really enjoyed my time here and the impact I've been able to make — [specific achievement with metric]. As I look at my contributions and market rates for my role, I'd like to discuss aligning my compensation accordingly. Based on my research, I believe [amount] is appropriate."\`;
      } else if (s === "counter-offer") {
        openingScript = \`"I appreciate you wanting to keep me on the team. I've given this a lot of thought. For me to stay, I'd need [specific amount/title/change]. I believe that's fair given my contributions and what I've been offered elsewhere. I'd love to make it work if we can get there."\`;
      } else {
        openingScript = \`"Thank you for the offer. I'm excited about the opportunity, but I want to be transparent — I have multiple offers I'm considering. At [company], I'd love to move forward if we can align on compensation at [target]. Your company is my first choice if we can find the right package."\`;
      }

      sections.push({
        title: "Opening Script",
        icon: "🎯",
        content: openingScript,
      });

      // 4. Key Tactics
      const tactics = {
        "new-offer": [
          "Always express enthusiasm before the ask — they need to know you want the role.",
          "Anchor with a specific number, never a range.",
          "Use market data as your justification, not personal need.",
          "If they can't move on base, negotiate signing bonus, equity, or a 6-month review.",
          "Get everything in writing before you accept.",
        ],
        "promotion": [
          "Ask for the role's market range, not a percentage increase on your current salary.",
          "Highlight your proven performance at the company — lower risk for them.",
          "Negotiate title + comp together. Titles are free for them.",
          "Ask for a start-date equity refresh.",
        ],
        "raise": [
          "Schedule a dedicated meeting — never ask in a 1:1 that's supposed to be about something else.",
          "Bring a written impact summary with metrics.",
          "Research your market rate using our salary data tool.",
          "Have a clear number in mind. Practice it out loud.",
          "If the answer is no, ask for specific milestones to get there.",
        ],
        "counter-offer": [
          "Decide your walk-away number before any conversation.",
          "60% of people who accept counter-offers leave within 12 months — negotiate hard.",
          "Don't just accept a match. They should pay a premium for your loyalty.",
          "Get title, comp, and role changes in writing before withdrawing your other resignation.",
        ],
        "multiple-offers": [
          "Be transparent about competing offers — it builds trust and urgency.",
          "Share the competing number (or a slightly higher number) to set a floor.",
          "Ask each company for their 'best and final' offer.",
          "Compare total comp: include base, bonus, equity, signing, and benefits value.",
          "Use our Offer Comparison Tool to stack them up.",
        ],
      };

      sections.push({
        title: "5 Tactics for Your Situation",
        icon: "🧠",
        content: \`<ul class="space-y-2">\${(tactics[s] || tactics["new-offer"]).map(t => \`<li class="flex items-start gap-2 text-sm text-body"><span class="text-accent-blue mt-0.5 shrink-0">→</span><span>\${t}</span></li>\`).join("")}</ul>\`,
      });

      // 5. Common Objections
      const objections = [
        {
          q: '"This is our final offer."',
          a: '"I understand. Is there flexibility on anything else — signing bonus, equity, a performance review in 6 months with an increase?"',
        },
        {
          q: '"We have a strict salary band."',
          a: '"I respect that. Can you share where I fall in the band? If I\\'m not at the top yet, what would it take to get there?"',
        },
        {
          q: '"We need an answer by end of day."',
          a: '"I\\'d love to give this the consideration it deserves. Would it be possible to have until [date] to review the full details?"',
        },
        {
          q: '"We can\\'t match the competing offer."',
          a: '"I understand budgets are tight. Can we close the gap partway and add a 6-month review to revisit?"',
        },
      ];

      sections.push({
        title: "Handling Objections",
        icon: "🛡️",
        content: \`<div class="space-y-3">\${objections.map(o => \`
          <div class="border border-hairline rounded-md p-3">
            <p class="text-xs font-semibold text-ink mb-1">Them: \${o.q}</p>
            <p class="text-xs text-body">You: \${o.a}</p>
          </div>
        \`).join("")}</div>\`,
      });

      // 6. Total Comp Breakdown (for the company type)
      const compAdvice = {
        "big-tech": "Focus on RSU refreshers and annual bonus targets. Base salary is often capped, but equity can vary 2-3x. Negotiate the stock grant amount — that's where the real money is. Ask about refresher policy and vesting schedule.",
        "startup": "Equity is the biggest variable. Understand the strike price, valuation, and dilution. Negotiate for more options, a shorter exercise window, or early exercise. Ask about the 409A valuation and liquidation preferences.",
        "finance": "Bonus is typically 50-200% of base. Focus on the bonus percentage, guaranteed minimum, and whether it's discretionary or formula-based. Signing bonuses are very negotiable in finance.",
        "mid-market": "Base salary is king here. Bonus ranges are typically 5-15%. Equity may be limited or non-existent. Negotiate base hardest, then signing bonus. Benefits (PTO, remote days) can be flexible.",
        "nonprofit": "Base is your primary lever. Equity is uncommon. Benefits and mission alignment are the value adds. Negotiate for professional development funding, sabbaticals, or flexible hours.",
      };

      sections.push({
        title: "Comp Structure Strategy",
        icon: "📊",
        content: compAdvice[c] || compAdvice["mid-market"],
      });

      // 7. Non-Negotiables
      sections.push({
        title: "What NOT to Do",
        icon: "⚠️",
        content: \`<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">\${[
          "Don't negotiate over email only — always get on a call.",
          "Don't share your current salary (in states where legal to ask, deflect).",
          "Don't accept the first offer — ever.",
          "Don't give ultimatums unless you're ready to walk.",
          "Don't lie about competing offers.",
          "Don't negotiate on a Friday.",
          "Don't forget to negotiate benefits, title, and start date too.",
          "Don't say 'I need' — say 'market rates indicate.'",
        ].map(t => \`<div class="p-2.5 rounded-md border border-hairline bg-canvas-soft"><span class="text-xs text-body">\${t}</span></div>\`).join("")}</div>\`,
      });

      playbookContent.innerHTML = sections.map(s => \`
        <div class="reveal reveal-visible">
          <h3 class="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <span>\${s.icon}</span>
            <span>\${s.title}</span>
          </h3>
          <div class="text-sm text-body leading-relaxed">\${s.content}</div>
        </div>
      \`).join("");

      stratCard.classList.add("hidden");
      progressArea.classList.add("hidden");
      playbookResult.classList.remove("hidden");
      playbookResult.scrollIntoView({ behavior: "smooth" });
    }

    stratNext.addEventListener("click", function () {
      if (currentStep === steps.length - 1) {
        if (!validateStep()) return;
        generatePlaybook();
        return;
      }
      if (!validateStep()) return;
      currentStep++;
      renderStep();
    });

    stratBack.addEventListener("click", function () {
      if (currentStep > 0) {
        currentStep--;
        renderStep();
      }
    });

    $("btnRestart").addEventListener("click", function () {
      currentStep = 0;
      Object.keys(answers).forEach(k => delete answers[k]);
      playbookResult.classList.add("hidden");
      stratCard.classList.remove("hidden");
      renderStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Start
    renderStep();
  })();
<\/script>`;
}, "C:/website/src/pages/negotiation-strategy.astro", void 0);
var $$file = "C:/website/src/pages/negotiation-strategy.astro";
var $$url = "/negotiation-strategy";
//#endregion
//#region \0virtual:astro:page:src/pages/negotiation-strategy@_@astro
var page = () => negotiation_strategy_exports;
//#endregion
export { page };
