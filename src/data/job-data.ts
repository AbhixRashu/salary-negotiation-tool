export interface NegotiateJob {
  slug: string;
  readableTitle: string;
  paragraphs: string[];
  bullets: string[];
}

export const NEGOTIATE_JOBS: NegotiateJob[] = [
  {
    slug: "software-engineer",
    readableTitle: "Software Engineer",
    paragraphs: [
      "Software engineers in the US typically earn between $90,000 and $180,000 depending on experience level, company size, and location. Senior engineers at top tech companies like Google, Meta, and Microsoft can command total compensation packages exceeding $300,000 when including equity grants and annual bonuses. The negotiation landscape for software engineers is unique because equity (RSUs or stock options) often represents 30–50% of total compensation, making it a critical leverage point.",
      "When negotiating a software engineering offer, remember that base salary is usually the hardest component to move due to established pay bands at most companies. The most effective strategy is to negotiate base salary first, then shift focus to equity and signing bonus — where hiring managers typically have more discretion. Engineers with competing offers or specialized skills in AI/ML, distributed systems, or security engineering have significantly more leverage and should aim for the 15–20% increase range.",
    ],
    bullets: [
      "Base salary (target 10–20% above initial offer)",
      "Annual bonus (typically 10–25% of base at tech companies)",
      "Equity/RSUs (negotiate for more shares or better vesting schedule)",
      "Signing bonus ($10,000–$50,000 common at mid-to-large tech firms)",
      "Flexible work arrangement (remote days, hours, or fully remote)",
    ],
  },
  {
    slug: "product-manager",
    readableTitle: "Product Manager",
    paragraphs: [
      "Product managers in the US earn between $100,000 and $200,000 in base salary, with total compensation frequently reaching $250,000+ at top technology companies. PM roles are highly cross-functional, and companies pay a premium for candidates who can demonstrate a track record of shipping successful products, driving user growth, or increasing revenue metrics. The negotiation process for PMs often emphasizes impact metrics over technical skill.",
      "One distinctive aspect of PM negotiations is that annual bonuses are often tied to product KPIs like user engagement, retention, or revenue targets. When countering an offer, PMs should highlight specific product wins, quantify user impact, and request performance-based accelerators. Candidates with experience at high-growth startups or FAANG companies have the strongest leverage, especially when negotiating for principal or director-level roles.",
    ],
    bullets: [
      "Base salary (target 10–20% above initial offer)",
      "Annual bonus (performance-based, typically 10–20% of base)",
      "Equity/RSUs (standard at most tech and SaaS companies)",
      "Signing bonus (one-time cash, negotiable at larger firms)",
      "Flexible work arrangement (common for PM roles)",
    ],
  },
  {
    slug: "data-scientist",
    readableTitle: "Data Scientist",
    paragraphs: [
      "Data scientists in the US command salaries from $95,000 to $170,000 at the mid-level, with senior and principal roles exceeding $200,000 in base pay. Total compensation at top tech companies can reach $300,000+ with equity grants. The field has grown rapidly, and companies compete aggressively for candidates with strong statistical modeling, machine learning, and Python/SQL skills. Remote data science roles are increasingly common and often pay national-level bands.",
      "When negotiating a data scientist offer, emphasize the business impact of your previous work — revenue generated through models, cost savings from automation, or accuracy improvements over existing systems. Data scientists with PhDs or deep expertise in specialized areas like NLP, computer vision, or causal inference typically have 10–15% more negotiating power. Pre-IPO equity can be particularly valuable for data scientists joining growth-stage companies.",
    ],
    bullets: [
      "Base salary (target 10–20% above initial offer)",
      "Annual bonus (typically 10–15% of base at most firms)",
      "Equity/RSUs (significant component at tech companies)",
      "Signing bonus ($10,000–$30,000 common at mid-to-large firms)",
      "Flexible work arrangement (remote work is widely available)",
    ],
  },
  {
    slug: "ux-designer",
    readableTitle: "UX Designer",
    paragraphs: [
      "UX designers in the US earn between $80,000 and $155,000 for mid-to-senior roles, with principal and lead designers commanding $180,000+. Top technology companies offer total packages that include significant equity components. The negotiation dynamics for UX designers differ from engineering roles because the impact is often qualitative — improved user satisfaction scores, reduced task completion times, or increased conversion rates — rather than purely quantitative.",
      "Designers negotiating offers should prepare a case study portfolio that directly ties their work to business outcomes. Companies value designers who can articulate the ROI of their design decisions, especially those with experience in design systems, user research, and cross-functional collaboration. Senior designers with management experience or a strong personal brand (public speaking, design publications) have additional leverage in salary negotiations.",
    ],
    bullets: [
      "Base salary (target 10–15% above initial offer)",
      "Annual bonus (5–15% of base depending on company)",
      "Equity/RSUs (offered at most tech and SaaS companies)",
      "Signing bonus ($5,000–$20,000 common at larger firms)",
      "Flexible work arrangement (remote or hybrid options)",
    ],
  },
  {
    slug: "nurse-practitioner",
    readableTitle: "Nurse Practitioner",
    paragraphs: [
      "Nurse practitioners in the US earn between $95,000 and $130,000 annually, with experienced NPs in specialized fields like psychiatric mental health or acute care exceeding $150,000. The healthcare industry has seen significant salary growth for NPs due to expanded scope-of-practice laws and increased demand for primary care providers. Negotiation leverage varies substantially by state, as some states allow independent practice while others require physician oversight.",
      "When negotiating an NP offer, focus on base salary first, then shift to shift differentials, call pay, and CME (continuing medical education) allowances. Many healthcare employers have less flexibility on base salary due to established pay scales but can offer signing bonuses, loan repayment assistance, or schedule preferences. NPs with certifications in high-demand specialties like emergency medicine or psychiatry should leverage these during negotiations.",
    ],
    bullets: [
      "Base salary (target 5–15% above initial offer)",
      "Annual bonus (productivity or quality-based, typically 3–10%)",
      "CME allowance ($1,500–$5,000 annually)",
      "Signing bonus ($5,000–$20,000 common in high-need areas)",
      "Flexible work arrangement (4-day weeks, per diem options)",
    ],
  },
  {
    slug: "marketing-manager",
    readableTitle: "Marketing Manager",
    paragraphs: [
      "Marketing managers in the US earn between $75,000 and $145,000 depending on industry, company size, and location. In-house marketing roles at SaaS companies and consumer tech firms typically pay 15–25% more than agency-side roles. Digital marketing managers with expertise in performance marketing, SEO, or growth hacking command premium salaries because their work is directly tied to revenue generation and customer acquisition costs.",
      "Marketing managers should negotiate using specific campaign performance metrics — ROAS, CAC, conversion rates, or revenue influenced — to justify their counter offer. The rise of marketing analytics means companies increasingly expect data-backed requests rather than title-based comparisons. Managers with experience managing large budgets ($1M+) or leading cross-channel strategies have the strongest negotiating position, especially when they can demonstrate direct revenue attribution.",
    ],
    bullets: [
      "Base salary (target 8–15% above initial offer)",
      "Annual bonus (typically 10–20% of base, tied to pipeline or revenue)",
      "Equity/RSUs (common at SaaS and public tech companies)",
      "Signing bonus ($5,000–$15,000 at mid-to-large firms)",
      "Flexible work arrangement (hybrid or remote common in marketing)",
    ],
  },
  {
    slug: "devops-engineer",
    readableTitle: "DevOps Engineer",
    paragraphs: [
      "DevOps engineers in the US earn between $100,000 and $175,000, with senior and principal roles exceeding $200,000. The DevOps and SRE (Site Reliability Engineering) field remains highly competitive, with companies paying premiums for candidates skilled in Kubernetes, Terraform, CI/CD pipelines, and cloud infrastructure (AWS, GCP, Azure). Total compensation often includes equity grants that can double the base salary at large tech firms.",
      "DevOps engineers have significant negotiation leverage due to the critical nature of infrastructure reliability and the scarcity of experienced talent. When negotiating, emphasize specific achievements like reducing deployment time by X%, improving system uptime, or migrating infrastructure to the cloud with measurable cost savings. SREs and DevOps engineers with incident management experience at high-scale companies (handling millions of requests per second) are in the highest demand.",
    ],
    bullets: [
      "Base salary (target 10–20% above initial offer)",
      "Annual bonus (10–20% of base at most tech companies)",
      "Equity/RSUs (major component at cloud-native and tech firms)",
      "Signing bonus ($10,000–$30,000 common in competitive markets)",
      "Flexible work arrangement (remote DevOps roles are widely available)",
    ],
  },
  {
    slug: "sales-manager",
    readableTitle: "Sales Manager",
    paragraphs: [
      "Sales managers in the US earn between $85,000 and $160,000 in base salary, with total compensation including commissions and overrides often reaching $200,000–$350,000. The sales compensation structure is heavily variable — base salary typically represents only 40–60% of total target earnings. When negotiating a sales management offer, both the base salary and the commission structure (accelerators, multipliers, and territory assignment) are critical components.",
      "Sales managers should negotiate using their track record: quota attainment percentages, team revenue growth, and rep retention rates. The most important leverage point for sales managers is the territory or vertical they will manage — a more established territory with warm relationships provides higher earning potential. When negotiating, ask about override structures, team quota attainment history, and whether the role includes a carryover book of business.",
    ],
    bullets: [
      "Base salary (target 10–15% above initial offer)",
      "Commission/override structure (40–60% of total comp)",
      "Equity/RSUs (common at public and growth-stage SaaS companies)",
      "Signing bonus ($10,000–$25,000 to replace lost commissions at prior role)",
      "Flexible work arrangement (field sales is typically in-person; remote possible)",
    ],
  },
  {
    slug: "account-executive",
    readableTitle: "Account Executive",
    paragraphs: [
      "Account executives in the US earn between $65,000 and $120,000 in base salary, with on-target earnings (OTE) typically reaching $130,000–$250,000 through commission. Top-performing enterprise AEs at SaaS companies can earn $300,000+ annually. The AE compensation model is heavily weighted toward variable pay — the base salary covers roughly 50% of OTE, and the remaining 50% comes from commission on closed deals. This makes commission structure negotiation more important than base salary.",
      "When negotiating an AE offer, focus on three things: base salary, commission rate, and ramp period. AEs joining a new company typically need 3–6 months to build pipeline, so a guaranteed commission or draw during the ramp period is essential. Experienced AEs with a proven book of business, industry connections, or experience selling into specific verticals (enterprise, mid-market, SMB) should negotiate for a higher commission rate or accelerator multipliers that increase payouts above 100% quota attainment.",
    ],
    bullets: [
      "Base salary (target 5–10% above initial offer)",
      "Commission structure (accelerators, multipliers, capped vs uncapped)",
      "Equity/RSUs (available at most public SaaS companies)",
      "Signing bonus ($5,000–$20,000 common to offset ramp period)",
      "Flexible work arrangement (field roles may require travel; some remote)",
    ],
  },
  {
    slug: "hr-business-partner",
    readableTitle: "HR Business Partner",
    paragraphs: [
      "HR Business Partners in the US earn between $80,000 and $145,000, with senior HRBPs at large enterprises and tech companies earning $160,000+. The role has evolved significantly from traditional HR to a strategic business partner function that advises leadership on talent strategy, organizational design, and workforce planning. Companies now compete aggressively for HRBPs who can demonstrate data-driven people analytics and strategic influence at the executive level.",
      "HRBPs negotiating offers should highlight their experience with organizational design, employee relations, talent development, and measurable outcomes like reduced turnover rates or improved engagement scores. Total compensation packages for HRBPs increasingly include equity grants and annual bonuses tied to company performance metrics. HRBPs with certifications like SHRM-SCP or SPHR, and those with experience in high-growth or technology organizations, typically have stronger negotiation positions.",
    ],
    bullets: [
      "Base salary (target 8–15% above initial offer)",
      "Annual bonus (typically 10–20% of base, tied to company performance)",
      "Equity/RSUs (increasingly common at public tech companies)",
      "Signing bonus ($5,000–$15,000 at mid-to-large firms)",
      "Flexible work arrangement (HRBP roles are often hybrid or in-office)",
    ],
  },
];
