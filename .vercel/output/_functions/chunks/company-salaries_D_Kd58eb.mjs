import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, x as unescapeHTML } from "./server_D6Rm-QtC.mjs";
import { t as createComponent } from "./compiler_Db9x-0at.mjs";
import { t as $$Layout } from "./Layout_DAOvAHMr.mjs";
//#region src/data/company-salaries.ts
var COMPANIES = [
	{
		name: "Google",
		industry: "Technology",
		location: "Mountain View, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 192e3,
				low: 148e3,
				high: 268e3,
				equity: "$50K-$150K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Senior Software Engineer",
				median: 285e3,
				low: 22e4,
				high: 38e4,
				equity: "$100K-$250K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Staff Software Engineer",
				median: 42e4,
				low: 32e4,
				high: 55e4,
				equity: "$200K-$400K/yr RSU",
				bonus: "15-25%"
			},
			{
				title: "Product Manager",
				median: 185e3,
				low: 145e3,
				high: 245e3,
				equity: "$40K-$120K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Data Scientist",
				median: 175e3,
				low: 135e3,
				high: 23e4,
				equity: "$40K-$100K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "UX Designer",
				median: 165e3,
				low: 128e3,
				high: 215e3,
				equity: "$30K-$80K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Tech Lead",
				median: 32e4,
				low: 25e4,
				high: 42e4,
				equity: "$150K-$300K/yr RSU",
				bonus: "20%"
			},
			{
				title: "Engineering Manager",
				median: 35e4,
				low: 27e4,
				high: 46e4,
				equity: "$150K-$300K/yr RSU",
				bonus: "20-25%"
			},
			{
				title: "Site Reliability Engineer",
				median: 195e3,
				low: 155e3,
				high: 265e3,
				equity: "$50K-$130K/yr RSU",
				bonus: "15-20%"
			}
		],
		perks: [
			"Free meals",
			"On-site gym",
			"Shuttle service",
			"Education reimbursement",
			"25 PTO days",
			"Parental leave 24wks",
			"Healthcare",
			"401k match 50%"
		]
	},
	{
		name: "Meta",
		industry: "Technology",
		location: "Menlo Park, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 2e5,
				low: 16e4,
				high: 29e4,
				equity: "$60K-$180K/yr RSU",
				bonus: "15%"
			},
			{
				title: "Senior Software Engineer",
				median: 32e4,
				low: 25e4,
				high: 43e4,
				equity: "$150K-$350K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Staff Software Engineer",
				median: 48e4,
				low: 37e4,
				high: 62e4,
				equity: "$250K-$500K/yr RSU",
				bonus: "20%"
			},
			{
				title: "Product Manager",
				median: 195e3,
				low: 155e3,
				high: 26e4,
				equity: "$50K-$140K/yr RSU",
				bonus: "15%"
			},
			{
				title: "Data Engineer",
				median: 178e3,
				low: 14e4,
				high: 24e4,
				equity: "$40K-$110K/yr RSU",
				bonus: "15%"
			},
			{
				title: "UX Researcher",
				median: 17e4,
				low: 135e3,
				high: 225e3,
				equity: "$35K-$90K/yr RSU",
				bonus: "15%"
			},
			{
				title: "Engineering Manager",
				median: 38e4,
				low: 29e4,
				high: 5e5,
				equity: "$200K-$400K/yr RSU",
				bonus: "20%"
			}
		],
		perks: [
			"Free meals",
			"On-site gym",
			"Commuter benefits",
			"Healthcare",
			"Parental leave 16wks",
			"401k match",
			"Learning fund $3K"
		]
	},
	{
		name: "Microsoft",
		industry: "Technology",
		location: "Redmond, WA",
		roles: [
			{
				title: "Software Engineer",
				median: 155e3,
				low: 12e4,
				high: 205e3,
				equity: "$30K-$80K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Senior Software Engineer",
				median: 23e4,
				low: 18e4,
				high: 31e4,
				equity: "$60K-$150K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Principal Software Engineer",
				median: 36e4,
				low: 28e4,
				high: 47e4,
				equity: "$120K-$280K/yr RSU",
				bonus: "20%"
			},
			{
				title: "Product Manager",
				median: 155e3,
				low: 12e4,
				high: 205e3,
				equity: "$25K-$70K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Data Scientist",
				median: 148e3,
				low: 115e3,
				high: 195e3,
				equity: "$25K-$65K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Azure Cloud Engineer",
				median: 17e4,
				low: 135e3,
				high: 225e3,
				equity: "$35K-$90K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Engineering Manager",
				median: 28e4,
				low: 22e4,
				high: 37e4,
				equity: "$80K-$200K/yr RSU",
				bonus: "15-20%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 50% up to limit",
			"Stock purchase discount 10%",
			"Parental leave 16wks",
			"Tuition reimbursement",
			"On-site gym",
			"Flexible hours"
		]
	},
	{
		name: "Amazon",
		industry: "Technology",
		location: "Seattle, WA",
		roles: [
			{
				title: "Software Engineer",
				median: 17e4,
				low: 13e4,
				high: 235e3,
				equity: "$20K-$80K/yr RSU",
				bonus: "0-10%"
			},
			{
				title: "Senior Software Engineer",
				median: 28e4,
				low: 215e3,
				high: 38e4,
				equity: "$50K-$150K/yr RSU",
				bonus: "0-15%"
			},
			{
				title: "Principal Software Engineer",
				median: 45e4,
				low: 34e4,
				high: 6e5,
				equity: "$150K-$350K/yr RSU",
				bonus: "0-15%"
			},
			{
				title: "Product Manager",
				median: 16e4,
				low: 125e3,
				high: 215e3,
				equity: "$15K-$60K/yr RSU",
				bonus: "0-10%"
			},
			{
				title: "AWS Solutions Architect",
				median: 185e3,
				low: 145e3,
				high: 25e4,
				equity: "$25K-$80K/yr RSU",
				bonus: "0-10%"
			},
			{
				title: "Engineering Manager",
				median: 34e4,
				low: 26e4,
				high: 45e4,
				equity: "$80K-$200K/yr RSU",
				bonus: "0-15%"
			},
			{
				title: "Supply Chain Manager",
				median: 125e3,
				low: 95e3,
				high: 17e4,
				equity: "$10K-$40K/yr RSU",
				bonus: "0-10%"
			}
		],
		perks: [
			"Healthcare day 1",
			"401k match",
			"Career choice tuition",
			"Parental leave 20wks",
			"Commuter benefits",
			"Employee discount 10%"
		]
	},
	{
		name: "Apple",
		industry: "Technology",
		location: "Cupertino, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 185e3,
				low: 145e3,
				high: 25e4,
				equity: "$40K-$120K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Senior Software Engineer",
				median: 29e4,
				low: 225e3,
				high: 39e4,
				equity: "$100K-$250K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Hardware Engineer",
				median: 175e3,
				low: 135e3,
				high: 235e3,
				equity: "$40K-$100K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Product Manager",
				median: 175e3,
				low: 14e4,
				high: 23e4,
				equity: "$35K-$90K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Machine Learning Engineer",
				median: 21e4,
				low: 165e3,
				high: 28e4,
				equity: "$60K-$150K/yr RSU",
				bonus: "15%"
			},
			{
				title: "Engineering Manager",
				median: 34e4,
				low: 26e4,
				high: 45e4,
				equity: "$150K-$300K/yr RSU",
				bonus: "20%"
			}
		],
		perks: [
			"Employee discount on products",
			"Healthcare",
			"401k match 50%",
			"Parental leave 12wks",
			"On-site fitness",
			"Education reimbursement",
			"Stock purchase program"
		]
	},
	{
		name: "Netflix",
		industry: "Technology",
		location: "Los Gatos, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 32e4,
				low: 25e4,
				high: 45e4,
				equity: "None (all cash)",
				bonus: "None (top-of-market)"
			},
			{
				title: "Senior Software Engineer",
				median: 5e5,
				low: 38e4,
				high: 7e5,
				equity: "None (all cash)",
				bonus: "None (top-of-market)"
			},
			{
				title: "Product Manager",
				median: 3e5,
				low: 23e4,
				high: 42e4,
				equity: "None (all cash)",
				bonus: "None (top-of-market)"
			},
			{
				title: "Data Scientist",
				median: 28e4,
				low: 22e4,
				high: 38e4,
				equity: "None (all cash)",
				bonus: "None (top-of-market)"
			}
		],
		perks: [
			"Unlimited time off",
			"Choose own cash/equity mix",
			"Expense everything",
			"Top-tier healthcare",
			"No annual review process"
		]
	},
	{
		name: "Stripe",
		industry: "Technology",
		location: "San Francisco, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 2e5,
				low: 16e4,
				high: 275e3,
				equity: "$60K-$180K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Senior Software Engineer",
				median: 32e4,
				low: 25e4,
				high: 43e4,
				equity: "$150K-$350K/yr RSU",
				bonus: "15-20%"
			},
			{
				title: "Product Manager",
				median: 195e3,
				low: 155e3,
				high: 26e4,
				equity: "$50K-$140K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Data Engineer",
				median: 18e4,
				low: 142e3,
				high: 245e3,
				equity: "$40K-$110K/yr RSU",
				bonus: "10-15%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 4%",
			"Parental leave 20wks",
			"Professional development budget",
			"Home office stipend",
			"Flexible PTO"
		]
	},
	{
		name: "JPMorgan Chase",
		industry: "Finance & Banking",
		location: "New York, NY",
		roles: [
			{
				title: "Investment Banker",
				median: 175e3,
				low: 12e4,
				high: 25e4,
				equity: "$20K-$80K/yr",
				bonus: "50-200%"
			},
			{
				title: "Software Engineer",
				median: 15e4,
				low: 115e3,
				high: 2e5,
				equity: "$15K-$50K/yr",
				bonus: "10-20%"
			},
			{
				title: "Quantitative Analyst",
				median: 175e3,
				low: 13e4,
				high: 24e4,
				equity: "$20K-$60K/yr",
				bonus: "20-50%"
			},
			{
				title: "Risk Manager",
				median: 145e3,
				low: 11e4,
				high: 195e3,
				equity: "$15K-$40K/yr",
				bonus: "15-30%"
			},
			{
				title: "Compliance Officer",
				median: 12e4,
				low: 9e4,
				high: 165e3,
				equity: "$10K-$30K/yr",
				bonus: "10-20%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 5%",
			"Tuition assistance",
			"Gym membership",
			"Commuter benefits",
			"Adoption assistance",
			"Career development programs"
		]
	},
	{
		name: "Goldman Sachs",
		industry: "Finance & Banking",
		location: "New York, NY",
		roles: [
			{
				title: "Investment Banker",
				median: 19e4,
				low: 135e3,
				high: 28e4,
				equity: "$20K-$100K/yr",
				bonus: "50-200%"
			},
			{
				title: "Software Engineer",
				median: 16e4,
				low: 125e3,
				high: 215e3,
				equity: "$15K-$50K/yr",
				bonus: "10-25%"
			},
			{
				title: "Quantitative Analyst",
				median: 185e3,
				low: 14e4,
				high: 26e4,
				equity: "$20K-$70K/yr",
				bonus: "20-50%"
			},
			{
				title: "Asset Manager",
				median: 165e3,
				low: 125e3,
				high: 23e4,
				equity: "$15K-$50K/yr",
				bonus: "20-40%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 6%",
			"Wellness programs",
			"Fitness center",
			"Flexible work",
			"Parental leave 16wks",
			"Education subsidy"
		]
	},
	{
		name: "McKinsey & Co.",
		industry: "Consulting",
		location: "New York, NY",
		roles: [
			{
				title: "Business Analyst",
				median: 11e4,
				low: 9e4,
				high: 14e4,
				equity: "None",
				bonus: "10-25%"
			},
			{
				title: "Associate",
				median: 185e3,
				low: 15e4,
				high: 235e3,
				equity: "None",
				bonus: "15-30%"
			},
			{
				title: "Engagement Manager",
				median: 25e4,
				low: 2e5,
				high: 32e4,
				equity: "None",
				bonus: "20-40%"
			},
			{
				title: "Associate Partner",
				median: 4e5,
				low: 32e4,
				high: 52e4,
				equity: "Profit sharing",
				bonus: "30-50%"
			},
			{
				title: "Partner",
				median: 8e5,
				low: 6e5,
				high: 12e5,
				equity: "Profit sharing",
				bonus: "40-60%"
			}
		],
		perks: [
			"Healthcare",
			"401k match",
			"MBA sponsorship",
			"Global mobility",
			"Travel benefits",
			"Professional development",
			"Wellness benefits"
		]
	},
	{
		name: "Boston Consulting Group",
		industry: "Consulting",
		location: "Boston, MA",
		roles: [
			{
				title: "Consultant",
				median: 112e3,
				low: 92e3,
				high: 142e3,
				equity: "None",
				bonus: "10-25%"
			},
			{
				title: "Project Leader",
				median: 2e5,
				low: 16e4,
				high: 255e3,
				equity: "None",
				bonus: "15-30%"
			},
			{
				title: "Principal",
				median: 38e4,
				low: 3e5,
				high: 5e5,
				equity: "Profit sharing",
				bonus: "30-50%"
			},
			{
				title: "Managing Director",
				median: 75e4,
				low: 55e4,
				high: 11e5,
				equity: "Profit sharing",
				bonus: "40-60%"
			}
		],
		perks: [
			"Healthcare",
			"401k match",
			"MBA sponsorship",
			"Global exposure",
			"Flexible work",
			"Mental health support",
			"Parental leave 16wks"
		]
	},
	{
		name: "UnitedHealth Group",
		industry: "Healthcare",
		location: "Minnetonka, MN",
		roles: [
			{
				title: "Software Engineer",
				median: 115e3,
				low: 9e4,
				high: 155e3,
				equity: "$10K-$30K/yr",
				bonus: "8-12%"
			},
			{
				title: "Data Analyst",
				median: 85e3,
				low: 68e3,
				high: 11e4,
				equity: "$5K-$15K/yr",
				bonus: "5-10%"
			},
			{
				title: "Clinical Informatics Specialist",
				median: 95e3,
				low: 76e3,
				high: 125e3,
				equity: "$5K-$15K/yr",
				bonus: "8-12%"
			},
			{
				title: "Healthcare Consultant",
				median: 105e3,
				low: 82e3,
				high: 14e4,
				equity: "$8K-$20K/yr",
				bonus: "10-15%"
			},
			{
				title: "Product Manager",
				median: 135e3,
				low: 105e3,
				high: 178e3,
				equity: "$15K-$40K/yr",
				bonus: "10-15%"
			}
		],
		perks: [
			"Healthcare (zero-premium options)",
			"401k match 100% up to 6%",
			"ESPP",
			"Tuition reimbursement $5K",
			"Parental leave 12wks",
			"Wellness credits"
		]
	},
	{
		name: "Johnson & Johnson",
		industry: "Healthcare",
		location: "New Brunswick, NJ",
		roles: [
			{
				title: "Research Scientist",
				median: 125e3,
				low: 98e3,
				high: 162e3,
				equity: "$10K-$30K/yr",
				bonus: "10-15%"
			},
			{
				title: "Regulatory Affairs Specialist",
				median: 11e4,
				low: 88e3,
				high: 145e3,
				equity: "$8K-$20K/yr",
				bonus: "8-12%"
			},
			{
				title: "Clinical Trial Manager",
				median: 135e3,
				low: 105e3,
				high: 175e3,
				equity: "$10K-$25K/yr",
				bonus: "10-15%"
			},
			{
				title: "Medical Director",
				median: 28e4,
				low: 22e4,
				high: 36e4,
				equity: "$30K-$80K/yr",
				bonus: "15-25%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 75% up to 6%",
			"ESPP 15% discount",
			"Parental leave 12wks",
			"On-site gym",
			"Tuition reimbursement",
			"Adoption assistance"
		]
	},
	{
		name: "Walmart",
		industry: "Retail",
		location: "Bentonville, AR",
		roles: [
			{
				title: "Software Engineer",
				median: 125e3,
				low: 98e3,
				high: 168e3,
				equity: "$10K-$30K/yr RSU",
				bonus: "5-15%"
			},
			{
				title: "Supply Chain Manager",
				median: 11e4,
				low: 85e3,
				high: 148e3,
				equity: "$8K-$20K/yr RSU",
				bonus: "10-20%"
			},
			{
				title: "Data Scientist",
				median: 135e3,
				low: 105e3,
				high: 178e3,
				equity: "$10K-$25K/yr RSU",
				bonus: "5-15%"
			},
			{
				title: "Store Manager",
				median: 135e3,
				low: 95e3,
				high: 19e4,
				equity: "$15K-$40K/yr RSU",
				bonus: "50-150%"
			},
			{
				title: "Merchandising Director",
				median: 2e5,
				low: 155e3,
				high: 27e4,
				equity: "$20K-$60K/yr RSU",
				bonus: "30-60%"
			}
		],
		perks: [
			"Healthcare day 1",
			"Stock purchase plan 15% discount",
			"401k match 6%",
			"Tuition coverage 100%",
			"Associate discount 10%",
			"Parental leave 6wks"
		]
	},
	{
		name: "Tesla",
		industry: "Manufacturing / Automotive",
		location: "Austin, TX",
		roles: [
			{
				title: "Software Engineer",
				median: 165e3,
				low: 13e4,
				high: 22e4,
				equity: "$30K-$100K/yr RSU",
				bonus: "None"
			},
			{
				title: "Mechanical Engineer",
				median: 115e3,
				low: 9e4,
				high: 15e4,
				equity: "$15K-$40K/yr RSU",
				bonus: "None"
			},
			{
				title: "Manufacturing Engineer",
				median: 105e3,
				low: 82e3,
				high: 138e3,
				equity: "$10K-$30K/yr RSU",
				bonus: "None"
			},
			{
				title: "Production Manager",
				median: 13e4,
				low: 1e5,
				high: 175e3,
				equity: "$15K-$40K/yr RSU",
				bonus: "None"
			},
			{
				title: "Battery Engineer",
				median: 145e3,
				low: 115e3,
				high: 19e4,
				equity: "$20K-$50K/yr RSU",
				bonus: "None"
			}
		],
		perks: [
			"Equity refresh annually",
			"Medical/dental/vision",
			"401k match",
			"Free EV charging",
			"Adoption assistance",
			"Employee vehicle discount",
			"Stock purchase program"
		]
	},
	{
		name: "Salesforce",
		industry: "Technology",
		location: "San Francisco, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 175e3,
				low: 138e3,
				high: 235e3,
				equity: "$40K-$120K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Solutions Engineer",
				median: 145e3,
				low: 112e3,
				high: 195e3,
				equity: "$20K-$60K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Product Manager",
				median: 17e4,
				low: 135e3,
				high: 225e3,
				equity: "$35K-$100K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Account Executive",
				median: 12e4,
				low: 85e3,
				high: 18e4,
				equity: "$15K-$40K/yr RSU",
				bonus: "50-150%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 100% up to 5%",
			"Wellness reimbursement $100/mo",
			"Parental leave 26wks",
			"Volunteer time off 56hrs/yr",
			"Education reimbursement",
			"ESPP 15% discount"
		]
	},
	{
		name: "Adobe",
		industry: "Technology",
		location: "San Jose, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 165e3,
				low: 13e4,
				high: 22e4,
				equity: "$30K-$100K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Product Manager",
				median: 16e4,
				low: 125e3,
				high: 21e4,
				equity: "$25K-$80K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "UX Designer",
				median: 155e3,
				low: 12e4,
				high: 2e5,
				equity: "$20K-$70K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "AI/ML Engineer",
				median: 2e5,
				low: 16e4,
				high: 27e4,
				equity: "$50K-$140K/yr RSU",
				bonus: "10-15%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 50% unlimited",
			"Sabbatical every 5 yrs",
			"Parental leave 26wks",
			"ESPP 15% discount",
			"Home office stipend",
			"Free lunch"
		]
	},
	{
		name: "NVIDIA",
		industry: "Technology",
		location: "Santa Clara, CA",
		roles: [
			{
				title: "Software Engineer",
				median: 21e4,
				low: 165e3,
				high: 28e4,
				equity: "$60K-$180K/yr RSU",
				bonus: "10-20%"
			},
			{
				title: "Hardware Engineer",
				median: 195e3,
				low: 155e3,
				high: 26e4,
				equity: "$50K-$150K/yr RSU",
				bonus: "10-20%"
			},
			{
				title: "Deep Learning Engineer",
				median: 24e4,
				low: 19e4,
				high: 32e4,
				equity: "$80K-$200K/yr RSU",
				bonus: "15-25%"
			},
			{
				title: "CUDA Engineer",
				median: 225e3,
				low: 175e3,
				high: 3e5,
				equity: "$70K-$180K/yr RSU",
				bonus: "15-25%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 4%",
			"ESPP 15% discount",
			"Free meals",
			"On-site gym",
			"Parental leave 24wks",
			"Tuition assistance",
			"Shuttle service"
		]
	},
	{
		name: "Palantir",
		industry: "Technology",
		location: "Denver, CO",
		roles: [
			{
				title: "Forward Deployed Engineer",
				median: 19e4,
				low: 15e4,
				high: 26e4,
				equity: "$50K-$150K/yr RSU",
				bonus: "10-20%"
			},
			{
				title: "Software Engineer",
				median: 18e4,
				low: 14e4,
				high: 245e3,
				equity: "$40K-$120K/yr RSU",
				bonus: "10-20%"
			},
			{
				title: "Deployment Strategist",
				median: 145e3,
				low: 11e4,
				high: 195e3,
				equity: "$20K-$60K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Engineering Manager",
				median: 32e4,
				low: 25e4,
				high: 43e4,
				equity: "$100K-$250K/yr RSU",
				bonus: "20%"
			}
		],
		perks: [
			"Healthcare 100% paid",
			"401k match 6%",
			"Free meals",
			"Equity refreshes",
			"Flexible PTO",
			"On-site gym",
			"Travel opportunities"
		]
	},
	{
		name: "Capital One",
		industry: "Finance & Banking",
		location: "McLean, VA",
		roles: [
			{
				title: "Software Engineer",
				median: 145e3,
				low: 11e4,
				high: 19e4,
				equity: "$15K-$50K/yr RSU",
				bonus: "8-12%"
			},
			{
				title: "Senior Software Engineer",
				median: 21e4,
				low: 165e3,
				high: 28e4,
				equity: "$30K-$80K/yr RSU",
				bonus: "10-15%"
			},
			{
				title: "Data Scientist",
				median: 155e3,
				low: 12e4,
				high: 205e3,
				equity: "$15K-$50K/yr RSU",
				bonus: "8-12%"
			},
			{
				title: "Product Manager",
				median: 15e4,
				low: 115e3,
				high: 198e3,
				equity: "$15K-$45K/yr RSU",
				bonus: "8-12%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 100% up to 5%",
			"Cash allowance for benefits",
			"Parental leave 12wks",
			"Tuition reimbursement",
			"Wellness reimbursement",
			"Commuter benefits"
		]
	},
	{
		name: "Deloitte",
		industry: "Consulting",
		location: "New York, NY",
		roles: [
			{
				title: "Consultant",
				median: 95e3,
				low: 78e3,
				high: 12e4,
				equity: "None",
				bonus: "5-15%"
			},
			{
				title: "Senior Consultant",
				median: 13e4,
				low: 105e3,
				high: 168e3,
				equity: "None",
				bonus: "10-20%"
			},
			{
				title: "Manager",
				median: 175e3,
				low: 14e4,
				high: 225e3,
				equity: "None",
				bonus: "15-30%"
			},
			{
				title: "Senior Manager",
				median: 24e4,
				low: 19e4,
				high: 31e4,
				equity: "None",
				bonus: "20-40%"
			},
			{
				title: "Partner",
				median: 6e5,
				low: 45e4,
				high: 9e5,
				equity: "Profit sharing",
				bonus: "30-50%"
			}
		],
		perks: [
			"Healthcare",
			"401k match 25% up to 6%",
			"CPA/CFA exam support",
			"Flexible PTO",
			"Tuition reimbursement",
			"Wellness subsidy",
			"Discount programs"
		]
	}
];
//#endregion
//#region src/pages/company-salaries.astro
var company_salaries_exports = /* @__PURE__ */ __exportAll({
	default: () => $$CompanySalaries,
	file: () => $$file,
	url: () => $$url
});
var $$CompanySalaries = createComponent(($$result, $$props, $$slots) => {
	const companiesJson = JSON.stringify(COMPANIES);
	const totalRoles = COMPANIES.reduce((sum, c) => sum + c.roles.length, 0);
	const highestMedian = Math.max(...COMPANIES.flatMap((c) => c.roles.map((r) => r.median)));
	const highestCompany = COMPANIES.find((c) => c.roles.some((r) => r.median === highestMedian));
	const industryColors = {
		Technology: {
			bg: "#0070f3",
			light: "#d3e5ff",
			border: "rgba(0,112,243,0.25)"
		},
		"Finance & Banking": {
			bg: "#f5a623",
			light: "#ffefcf",
			border: "rgba(245,166,35,0.3)"
		},
		Consulting: {
			bg: "#7928ca",
			light: "#e9d5ff",
			border: "rgba(121,40,202,0.25)"
		},
		Healthcare: {
			bg: "#00a86b",
			light: "#d1fae5",
			border: "rgba(0,168,107,0.25)"
		},
		Retail: {
			bg: "#ff6f00",
			light: "#ffe4cc",
			border: "rgba(255,111,0,0.25)"
		},
		"Manufacturing / Automotive": {
			bg: "#e65100",
			light: "#ffe0b2",
			border: "rgba(230,81,0,0.25)"
		}
	};
	function getCompanyColor(industry) {
		return industryColors[industry] || {
			bg: "#0070f3",
			light: "#d3e5ff",
			border: "rgba(0,112,243,0.25)"
		};
	}
	const allMedians = COMPANIES.flatMap((c) => c.roles.map((r) => r.median));
	const maxMedianGlobal = Math.max(...allMedians);
	const minMedianGlobal = Math.min(...allMedians);
	function barWidth(median) {
		return (median - minMedianGlobal) / (maxMedianGlobal - minMedianGlobal) * 100;
	}
	function barColor(median) {
		const ratio = (median - minMedianGlobal) / (maxMedianGlobal - minMedianGlobal);
		if (ratio > .7) return "#0070f3";
		if (ratio > .4) return "#00a86b";
		if (ratio > .2) return "#f5a623";
		return "#888888";
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Company Salary Data — Compensation by Company | Salary Pitcher",
		"description": "Browse compensation packages at top companies including Google, Meta, Amazon, Apple, and more. See base salary, equity, bonus, and perks for each role.",
		"data-astro-cid-ngkcaa6g": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="w-full space-y-8" data-astro-cid-ngkcaa6g><div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 reveal" data-astro-cid-ngkcaa6g><div data-astro-cid-ngkcaa6g><h1 class="text-3xl font-semibold tracking-tight text-ink mb-2" data-astro-cid-ngkcaa6g>Company Salary Explorer</h1><p class="text-sm text-body" data-astro-cid-ngkcaa6g>Browse compensation at <strong class="text-ink" data-astro-cid-ngkcaa6g>${COMPANIES.length} companies</strong>. Click a company to see role-level pay, equity, bonus, and perks.</p></div></div><!-- Stats Bar --><div class="grid grid-cols-2 sm:grid-cols-4 gap-3 reveal" data-astro-cid-ngkcaa6g><div class="border border-hairline bg-canvas rounded-lg p-4 text-center" style="border-top: 3px solid #0070f3" data-astro-cid-ngkcaa6g><span class="text-xl font-semibold text-ink font-mono" data-astro-cid-ngkcaa6g>${COMPANIES.length}</span><span class="text-[10px] font-mono text-mute uppercase tracking-wider block mt-1" data-astro-cid-ngkcaa6g>Companies</span></div><div class="border border-hairline bg-canvas rounded-lg p-4 text-center" style="border-top: 3px solid #00a86b" data-astro-cid-ngkcaa6g><span class="text-xl font-semibold text-ink font-mono" data-astro-cid-ngkcaa6g>${totalRoles}</span><span class="text-[10px] font-mono text-mute uppercase tracking-wider block mt-1" data-astro-cid-ngkcaa6g>Roles Tracked</span></div><div class="border border-hairline bg-canvas rounded-lg p-4 text-center" style="border-top: 3px solid #f5a623" data-astro-cid-ngkcaa6g><span class="text-xl font-semibold text-ink font-mono" data-astro-cid-ngkcaa6g>$${(highestMedian / 1e3).toFixed(0)}K</span><span class="text-[10px] font-mono text-mute uppercase tracking-wider block mt-1" data-astro-cid-ngkcaa6g>Highest Median</span></div><div class="border border-hairline bg-canvas rounded-lg p-4 text-center" style="border-top: 3px solid #7928ca" data-astro-cid-ngkcaa6g><span class="text-xl font-semibold text-ink font-mono" data-astro-cid-ngkcaa6g>${highestCompany?.name || "—"}</span><span class="text-[10px] font-mono text-mute uppercase tracking-wider block mt-1" data-astro-cid-ngkcaa6g>Top Payer</span></div></div><!-- Search + Filters --><div class="border border-hairline bg-canvas p-5 rounded-lg shadow-sm reveal" data-astro-cid-ngkcaa6g><div class="flex flex-col sm:flex-row gap-3" data-astro-cid-ngkcaa6g><div class="flex-1" data-astro-cid-ngkcaa6g><input type="text" id="companySearch" class="w-full px-3.5 py-2.5 border border-hairline rounded-md bg-canvas text-sm focus:border-accent-blue outline-none" placeholder="Search company or role..." autocomplete="off" data-astro-cid-ngkcaa6g></div><select id="industryFilter" class="w-full sm:w-48 px-3.5 py-2.5 border border-hairline rounded-md bg-canvas text-sm focus:border-accent-blue outline-none" data-astro-cid-ngkcaa6g><option value="" data-astro-cid-ngkcaa6g>All Industries</option><option value="Technology" data-astro-cid-ngkcaa6g>Technology</option><option value="Finance &amp; Banking" data-astro-cid-ngkcaa6g>Finance & Banking</option><option value="Consulting" data-astro-cid-ngkcaa6g>Consulting</option><option value="Healthcare" data-astro-cid-ngkcaa6g>Healthcare</option><option value="Retail" data-astro-cid-ngkcaa6g>Retail</option><option value="Manufacturing / Automotive" data-astro-cid-ngkcaa6g>Manufacturing / Automotive</option></select><select id="sortFilter" class="w-full sm:w-44 px-3.5 py-2.5 border border-hairline rounded-md bg-canvas text-sm focus:border-accent-blue outline-none" data-astro-cid-ngkcaa6g><option value="name" data-astro-cid-ngkcaa6g>Sort: Name</option><option value="roles" data-astro-cid-ngkcaa6g>Sort: Most Roles</option><option value="median" data-astro-cid-ngkcaa6g>Sort: Highest Paying</option><option value="industry" data-astro-cid-ngkcaa6g>Sort: Industry</option></select></div><div id="activeFilters" class="hidden mt-3 flex flex-wrap gap-2" data-astro-cid-ngkcaa6g></div></div><!-- Company Cards --><div id="companyGrid" class="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-children reveal" data-astro-cid-ngkcaa6g>${COMPANIES.map((company, idx) => {
		const cc = getCompanyColor(company.industry);
		const companyMax = Math.max(...company.roles.map((r) => r.median));
		return renderTemplate`<div class="company-card border border-hairline bg-canvas rounded-lg shadow-sm hover:shadow-elevated transition-all duration-200 overflow-hidden reveal tilt-card"${addAttribute(company.industry, "data-industry")}${addAttribute(company.name.toLowerCase(), "data-company")}${addAttribute(company.roles.length, "data-roles")}${addAttribute(companyMax, "data-median")}${addAttribute(idx, "data-index")}${addAttribute(`border-top: 3px solid ${cc.bg}`, "style")} data-astro-cid-ngkcaa6g><button class="w-full text-left p-5 cursor-pointer expand-btn"${addAttribute(idx, "data-index")} data-astro-cid-ngkcaa6g><div class="flex items-start justify-between gap-3" data-astro-cid-ngkcaa6g><div class="min-w-0 flex-1" data-astro-cid-ngkcaa6g><h2 class="text-lg font-semibold text-ink tracking-tight truncate" data-astro-cid-ngkcaa6g>${company.name}</h2><div class="flex flex-wrap gap-2 mt-1.5" data-astro-cid-ngkcaa6g><span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider"${addAttribute(`background:${cc.light};color:${cc.bg};border:1px solid ${cc.border}`, "style")} data-astro-cid-ngkcaa6g>${company.industry}</span><span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-mute border border-hairline" data-astro-cid-ngkcaa6g>${company.location}</span></div></div><div class="shrink-0 flex flex-col items-end gap-1" data-astro-cid-ngkcaa6g><div class="flex items-center gap-1 text-xs text-mute font-mono" data-astro-cid-ngkcaa6g><span class="role-count"${addAttribute(`color:${cc.bg}`, "style")} data-astro-cid-ngkcaa6g>${company.roles.length}</span><span data-astro-cid-ngkcaa6g>roles</span></div><svg class="chevron w-4 h-4 text-mute transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-ngkcaa6g><polyline points="6 9 12 15 18 9" data-astro-cid-ngkcaa6g></polyline></svg></div></div><div class="mt-3 flex gap-2 overflow-x-auto role-chips" data-astro-cid-ngkcaa6g>${company.roles.slice(0, 4).map((r) => renderTemplate`<span class="role-chip shrink-0 px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-soft-2 text-body border border-hairline cursor-pointer transition-all"${addAttribute(`--chip-hover-bg:${cc.light};--chip-hover-color:${cc.bg}`, "style")} data-astro-cid-ngkcaa6g>${r.title}</span>`)}${company.roles.length > 4 && renderTemplate`<span class="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono bg-canvas-soft text-mute" data-astro-cid-ngkcaa6g>+${company.roles.length - 4}</span>`}</div></button><div class="company-details border-t border-hairline" style="display:none" data-astro-cid-ngkcaa6g><div class="p-5 space-y-4" data-astro-cid-ngkcaa6g><div class="flex items-center gap-2 mb-2" data-astro-cid-ngkcaa6g><input type="text" class="role-search flex-1 px-3 py-1.5 border border-hairline rounded-md bg-canvas text-xs focus:border-accent-blue outline-none" placeholder="Filter roles..." data-astro-cid-ngkcaa6g><span class="text-[10px] font-mono text-mute role-match-count" data-astro-cid-ngkcaa6g></span></div><table class="w-full text-left" data-astro-cid-ngkcaa6g><thead data-astro-cid-ngkcaa6g><tr class="text-[10px] font-mono text-mute uppercase tracking-wider border-b border-hairline" data-astro-cid-ngkcaa6g><th class="pb-2 pr-3 font-semibold" data-astro-cid-ngkcaa6g>Role</th><th class="pb-2 pr-3 font-semibold text-right" data-astro-cid-ngkcaa6g>Base Median</th><th class="pb-2 pr-3 font-semibold text-right hidden sm:table-cell" data-astro-cid-ngkcaa6g>Range</th><th class="pb-2 pr-3 font-semibold text-right hidden md:table-cell" data-astro-cid-ngkcaa6g>Equity</th><th class="pb-2 font-semibold text-right hidden md:table-cell" data-astro-cid-ngkcaa6g>Bonus</th></tr></thead><tbody class="divide-y divide-hairline text-sm" data-astro-cid-ngkcaa6g>${company.roles.map((role) => {
			const bw = barWidth(role.median);
			const bc = barColor(role.median);
			return renderTemplate`<tr class="role-row hover:bg-canvas-soft/50 transition-colors"${addAttribute(role.title.toLowerCase(), "data-title")} data-astro-cid-ngkcaa6g><td class="py-2.5 pr-3 text-ink font-medium" data-astro-cid-ngkcaa6g>${role.title}</td><td class="py-2.5 pr-3 text-right" data-astro-cid-ngkcaa6g><div class="flex items-center gap-2 justify-end" data-astro-cid-ngkcaa6g><span class="font-mono text-ink font-semibold" data-astro-cid-ngkcaa6g>$${(role.median / 1e3).toFixed(0)}K</span><div class="w-12 h-1.5 rounded-full bg-hairline shrink-0 hidden sm:block" data-astro-cid-ngkcaa6g><div class="h-full rounded-full transition-all"${addAttribute(`width:${bw}%;background:${bc}`, "style")} data-astro-cid-ngkcaa6g></div></div></div></td><td class="py-2.5 pr-3 text-right font-mono text-body text-xs hidden sm:table-cell" data-astro-cid-ngkcaa6g>$${(role.low / 1e3).toFixed(0)}K - $${(role.high / 1e3).toFixed(0)}K</td><td class="py-2.5 pr-3 text-right font-mono text-body text-xs hidden md:table-cell" style="color:#7928ca" data-astro-cid-ngkcaa6g>${role.equity || "—"}</td><td class="py-2.5 text-right font-mono text-body text-xs hidden md:table-cell" style="color:#00a86b" data-astro-cid-ngkcaa6g>${role.bonus || "—"}</td></tr>`;
		})}</tbody></table><div data-astro-cid-ngkcaa6g><span class="text-xs font-mono text-mute uppercase tracking-wider block mb-2" data-astro-cid-ngkcaa6g>Perks & Benefits</span><div class="flex flex-wrap gap-1.5" data-astro-cid-ngkcaa6g>${company.perks.map((perk) => renderTemplate`<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-canvas-soft-2 text-body border border-hairline" data-astro-cid-ngkcaa6g>${perk}</span>`)}</div></div></div></div></div>`;
	})}</div><div id="noResults" class="hidden text-center py-16 border border-dashed border-hairline rounded-lg" data-astro-cid-ngkcaa6g><p class="text-sm text-mute" data-astro-cid-ngkcaa6g>No companies match your search.</p></div><!-- Disclaimer --><div class="p-4 border border-hairline rounded-lg bg-canvas-soft-2 text-xs text-body leading-relaxed" data-astro-cid-ngkcaa6g><p class="flex items-center gap-1.5 mb-1.5" data-astro-cid-ngkcaa6g><span class="font-semibold text-accent-blue font-mono uppercase tracking-wider text-[10px]" data-astro-cid-ngkcaa6g>⚠ Disclaimer:</span></p><p data-astro-cid-ngkcaa6g>Compensation data sourced from employee self-reports, public disclosures, and industry surveys. All figures are <strong data-astro-cid-ngkcaa6g>estimated</strong> — including the <strong data-astro-cid-ngkcaa6g>$800K McKinsey Partner</strong> figure shown above — and represent estimated total cash compensation (base + typical bonus) plus equity at current grant value. Actual packages vary significantly by level, location, performance, and negotiation outcome. Data updated 2026.</p></div></div>` })}<!-- Data injection --><script>${unescapeHTML(`window.__COMPANIES_DATA__ = ${companiesJson};`)}<\/script><script>
  (function () {
    const searchInput = document.getElementById("companySearch");
    const industryFilter = document.getElementById("industryFilter");
    const sortFilter = document.getElementById("sortFilter");
    const activeFilters = document.getElementById("activeFilters");
    const grid = document.getElementById("companyGrid");

    let activeRoleFilter = "";

    function addFilterBadge(label, onRemove) {
      const badge = document.createElement("span");
      badge.className =
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20";
      badge.innerHTML = \`\${label} <button class="hover:text-accent-blue-deep cursor-pointer">&times;</button>\`;
      badge.querySelector("button").addEventListener("click", onRemove);
      activeFilters.classList.remove("hidden");
      activeFilters.appendChild(badge);
    }

    function clearFilters() {
      activeFilters.innerHTML = "";
      activeFilters.classList.add("hidden");
      activeRoleFilter = "";
    }

    function sortCards(method) {
      const cards = Array.from(
        document.querySelectorAll(".company-card:not(.hidden)"),
      );
      const parent = grid;
      cards.sort((a, b) => {
        switch (method) {
          case "roles":
            return parseInt(b.dataset.roles) - parseInt(a.dataset.roles);
          case "median":
            return parseInt(b.dataset.median) - parseInt(a.dataset.median);
          case "industry":
            return a.dataset.industry.localeCompare(b.dataset.industry);
          default:
            return a.dataset.company.localeCompare(b.dataset.company);
        }
      });
      cards.forEach((c) => parent.appendChild(c));
    }

    function filterCards() {
      const q = searchInput.value.toLowerCase().trim();
      const ind = industryFilter.value;
      const cards = document.querySelectorAll(".company-card");
      let visible = 0;
      cards.forEach((card) => {
        const company = card.dataset.company;
        const industry = card.dataset.industry;
        const chips = Array.from(card.querySelectorAll(".role-chip")).map((s) =>
          s.textContent.toLowerCase(),
        );
        const matchQuery =
          !q || company.includes(q) || chips.some((r) => r.includes(q));
        const matchIndustry = !ind || industry === ind;
        const matchRole =
          !activeRoleFilter || chips.some((r) => r === activeRoleFilter);
        const show = matchQuery && matchIndustry && matchRole;
        card.classList.toggle("hidden", !show);
        if (show) visible++;
      });
      document
        .getElementById("noResults")
        .classList.toggle("hidden", visible > 0);
      sortCards(sortFilter.value);
    }

    searchInput.addEventListener("input", filterCards);
    industryFilter.addEventListener("change", filterCards);
    sortFilter.addEventListener("change", function () {
      sortCards(this.value);
    });

    // Role chip click → filter
    document.querySelectorAll(".role-chip").forEach((chip) => {
      chip.addEventListener("click", function (e) {
        e.stopPropagation();
        const role = this.textContent.trim();
        if (activeRoleFilter === role) {
          clearFilters();
          filterCards();
          return;
        }
        clearFilters();
        activeRoleFilter = role;
        addFilterBadge(\`Role: \${role}\`, function () {
          clearFilters();
          filterCards();
        });
        filterCards();
      });
    });

    // Expand/collapse with smooth animation
    document.querySelectorAll(".expand-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const card = this.closest(".company-card");
        const details = card.querySelector(".company-details");
        const chevron = this.querySelector(".chevron");
        const isOpen = details.style.display !== "none";

        if (isOpen) {
          details.style.display = "none";
          card.classList.remove("shadow-elevated");
          chevron.style.transform = "rotate(0deg)";
        } else {
          details.style.display = "block";
          details.style.animation = "fadeInDown 0.3s ease forwards";
          card.classList.add("shadow-elevated");
          chevron.style.transform = "rotate(180deg)";
          const input = details.querySelector(".role-search");
          if (input) {
            input.value = "";
            filterRoles(card, "");
            setTimeout(() => input.focus(), 350);
          }
        }
      });
    });

    // Role search within a company
    function filterRoles(card, q) {
      const rows = card.querySelectorAll(".role-row");
      const count = card.querySelector(".role-match-count");
      let visible = 0;
      rows.forEach((row) => {
        const match = !q || row.dataset.title.includes(q);
        row.style.display = match ? "" : "none";
        if (match) visible++;
      });
      if (count) count.textContent = \`\${visible} of \${rows.length}\`;
    }

    document.querySelectorAll(".role-search").forEach((input) => {
      const card = input.closest(".company-card");
      const count = card.querySelector(".role-match-count");
      const rows = card.querySelectorAll(".role-row");
      if (count) count.textContent = \`\${rows.length} of \${rows.length}\`;
      input.addEventListener("input", function () {
        filterRoles(card, this.value.toLowerCase().trim());
      });
    });
  })();
<\/script>`;
}, "C:/website/src/pages/company-salaries.astro", void 0);
var $$file = "C:/website/src/pages/company-salaries.astro";
var $$url = "/company-salaries";
//#endregion
//#region \0virtual:astro:page:src/pages/company-salaries@_@astro
var page = () => company_salaries_exports;
//#endregion
export { page };
