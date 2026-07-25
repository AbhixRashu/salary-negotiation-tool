export interface CompanySalaryData {
  name: string
  industry: string
  location: string
  roles: { title: string; median: number; low: number; high: number; equity?: string; bonus?: string }[]
  perks: string[]
}

export const COMPANIES: CompanySalaryData[] = [
  {
    name: "Google", industry: "Technology", location: "Mountain View, CA",
    roles: [
      { title: "Software Engineer", median: 192000, low: 148000, high: 268000, equity: "$50K-$150K/yr RSU", bonus: "15-20%" },
      { title: "Senior Software Engineer", median: 285000, low: 220000, high: 380000, equity: "$100K-$250K/yr RSU", bonus: "15-20%" },
      { title: "Staff Software Engineer", median: 420000, low: 320000, high: 550000, equity: "$200K-$400K/yr RSU", bonus: "15-25%" },
      { title: "Product Manager", median: 185000, low: 145000, high: 245000, equity: "$40K-$120K/yr RSU", bonus: "15-20%" },
      { title: "Data Scientist", median: 175000, low: 135000, high: 230000, equity: "$40K-$100K/yr RSU", bonus: "15-20%" },
      { title: "UX Designer", median: 165000, low: 128000, high: 215000, equity: "$30K-$80K/yr RSU", bonus: "15-20%" },
      { title: "Téch Lead", median: 320000, low: 250000, high: 420000, equity: "$150K-$300K/yr RSU", bonus: "20%" },
      { title: "Engineering Manager", median: 350000, low: 270000, high: 460000, equity: "$150K-$300K/yr RSU", bonus: "20-25%" },
      { title: "Site Reliability Engineer", median: 195000, low: 155000, high: 265000, equity: "$50K-$130K/yr RSU", bonus: "15-20%" },
    ],
    perks: ["Free meals", "On-site gym", "Shuttle service", "Education reimbursement", "25 PTO days", "Parental leave 24wks", "Healthcare", "401k match 50%"],
  },
  {
    name: "Meta", industry: "Technology", location: "Menlo Park, CA",
    roles: [
      { title: "Software Engineer", median: 200000, low: 160000, high: 290000, equity: "$60K-$180K/yr RSU", bonus: "15%" },
      { title: "Senior Software Engineer", median: 320000, low: 250000, high: 430000, equity: "$150K-$350K/yr RSU", bonus: "15-20%" },
      { title: "Staff Software Engineer", median: 480000, low: 370000, high: 620000, equity: "$250K-$500K/yr RSU", bonus: "20%" },
      { title: "Product Manager", median: 195000, low: 155000, high: 260000, equity: "$50K-$140K/yr RSU", bonus: "15%" },
      { title: "Data Engineer", median: 178000, low: 140000, high: 240000, equity: "$40K-$110K/yr RSU", bonus: "15%" },
      { title: "UX Researcher", median: 170000, low: 135000, high: 225000, equity: "$35K-$90K/yr RSU", bonus: "15%" },
      { title: "Engineering Manager", median: 380000, low: 290000, high: 500000, equity: "$200K-$400K/yr RSU", bonus: "20%" },
    ],
    perks: ["Free meals", "On-site gym", "Commuter benefits", "Healthcare", "Parental leave 16wks", "401k match", "Learning fund $3K"],
  },
  {
    name: "Microsoft", industry: "Technology", location: "Redmond, WA",
    roles: [
      { title: "Software Engineer", median: 155000, low: 120000, high: 205000, equity: "$30K-$80K/yr RSU", bonus: "10-15%" },
      { title: "Senior Software Engineer", median: 230000, low: 180000, high: 310000, equity: "$60K-$150K/yr RSU", bonus: "15-20%" },
      { title: "Principal Software Engineer", median: 360000, low: 280000, high: 470000, equity: "$120K-$280K/yr RSU", bonus: "20%" },
      { title: "Product Manager", median: 155000, low: 120000, high: 205000, equity: "$25K-$70K/yr RSU", bonus: "10-15%" },
      { title: "Data Scientist", median: 148000, low: 115000, high: 195000, equity: "$25K-$65K/yr RSU", bonus: "10-15%" },
      { title: "Azure Cloud Engineer", median: 170000, low: 135000, high: 225000, equity: "$35K-$90K/yr RSU", bonus: "10-15%" },
      { title: "Engineering Manager", median: 280000, low: 220000, high: 370000, equity: "$80K-$200K/yr RSU", bonus: "15-20%" },
    ],
    perks: ["Healthcare", "401k match 50% up to limit", "Stock purchase discount 10%", "Parental leave 16wks", "Tuition reimbursement", "On-site gym", "Flexible hours"],
  },
  {
    name: "Amazon", industry: "Technology", location: "Seattle, WA",
    roles: [
      { title: "Software Engineer", median: 170000, low: 130000, high: 235000, equity: "$20K-$80K/yr RSU", bonus: "0-10%" },
      { title: "Senior Software Engineer", median: 280000, low: 215000, high: 380000, equity: "$50K-$150K/yr RSU", bonus: "0-15%" },
      { title: "Principal Software Engineer", median: 450000, low: 340000, high: 600000, equity: "$150K-$350K/yr RSU", bonus: "0-15%" },
      { title: "Product Manager", median: 160000, low: 125000, high: 215000, equity: "$15K-$60K/yr RSU", bonus: "0-10%" },
      { title: "AWS Solutions Architect", median: 185000, low: 145000, high: 250000, equity: "$25K-$80K/yr RSU", bonus: "0-10%" },
      { title: "Engineering Manager", median: 340000, low: 260000, high: 450000, equity: "$80K-$200K/yr RSU", bonus: "0-15%" },
      { title: "Supply Chain Manager", median: 125000, low: 95000, high: 170000, equity: "$10K-$40K/yr RSU", bonus: "0-10%" },
    ],
    perks: ["Healthcare day 1", "401k match", "Career choice tuition", "Parental leave 20wks", "Commuter benefits", "Employee discount 10%"],
  },
  {
    name: "Apple", industry: "Technology", location: "Cupertino, CA",
    roles: [
      { title: "Software Engineer", median: 185000, low: 145000, high: 250000, equity: "$40K-$120K/yr RSU", bonus: "10-15%" },
      { title: "Senior Software Engineer", median: 290000, low: 225000, high: 390000, equity: "$100K-$250K/yr RSU", bonus: "15-20%" },
      { title: "Hardware Engineer", median: 175000, low: 135000, high: 235000, equity: "$40K-$100K/yr RSU", bonus: "10-15%" },
      { title: "Product Manager", median: 175000, low: 140000, high: 230000, equity: "$35K-$90K/yr RSU", bonus: "10-15%" },
      { title: "Machine Learning Engineer", median: 210000, low: 165000, high: 280000, equity: "$60K-$150K/yr RSU", bonus: "15%" },
      { title: "Engineering Manager", median: 340000, low: 260000, high: 450000, equity: "$150K-$300K/yr RSU", bonus: "20%" },
    ],
    perks: ["Employee discount on products", "Healthcare", "401k match 50%", "Parental leave 12wks", "On-site fitness", "Education reimbursement", "Stock purchase program"],
  },
  {
    name: "Netflix", industry: "Technology", location: "Los Gatos, CA",
    roles: [
      { title: "Software Engineer", median: 320000, low: 250000, high: 450000, equity: "None (all cash)", bonus: "None (top-of-market)" },
      { title: "Senior Software Engineer", median: 500000, low: 380000, high: 700000, equity: "None (all cash)", bonus: "None (top-of-market)" },
      { title: "Product Manager", median: 300000, low: 230000, high: 420000, equity: "None (all cash)", bonus: "None (top-of-market)" },
      { title: "Data Scientist", median: 280000, low: 220000, high: 380000, equity: "None (all cash)", bonus: "None (top-of-market)" },
    ],
    perks: ["Unlimited time off", "Choose own cash/equity mix", "Expense everything", "Top-tier healthcare", "No annual review process"],
  },
  {
    name: "Stripe", industry: "Technology", location: "San Francisco, CA",
    roles: [
      { title: "Software Engineer", median: 200000, low: 160000, high: 275000, equity: "$60K-$180K/yr RSU", bonus: "10-15%" },
      { title: "Senior Software Engineer", median: 320000, low: 250000, high: 430000, equity: "$150K-$350K/yr RSU", bonus: "15-20%" },
      { title: "Product Manager", median: 195000, low: 155000, high: 260000, equity: "$50K-$140K/yr RSU", bonus: "10-15%" },
      { title: "Data Engineer", median: 180000, low: 142000, high: 245000, equity: "$40K-$110K/yr RSU", bonus: "10-15%" },
    ],
    perks: ["Healthcare", "401k match 4%", "Parental leave 20wks", "Professional development budget", "Home office stipend", "Flexible PTO"],
  },
  {
    name: "JPMorgan Chase", industry: "Finance & Banking", location: "New York, NY",
    roles: [
      { title: "Investment Banker", median: 175000, low: 120000, high: 250000, equity: "$20K-$80K/yr", bonus: "50-200%" },
      { title: "Software Engineer", median: 150000, low: 115000, high: 200000, equity: "$15K-$50K/yr", bonus: "10-20%" },
      { title: "Quantitative Analyst", median: 175000, low: 130000, high: 240000, equity: "$20K-$60K/yr", bonus: "20-50%" },
      { title: "Risk Manager", median: 145000, low: 110000, high: 195000, equity: "$15K-$40K/yr", bonus: "15-30%" },
      { title: "Compliance Officer", median: 120000, low: 90000, high: 165000, equity: "$10K-$30K/yr", bonus: "10-20%" },
    ],
    perks: ["Healthcare", "401k match 5%", "Tuition assistance", "Gym membership", "Commuter benefits", "Adoption assistance", "Career development programs"],
  },
  {
    name: "Goldman Sachs", industry: "Finance & Banking", location: "New York, NY",
    roles: [
      { title: "Investment Banker", median: 190000, low: 135000, high: 280000, equity: "$20K-$100K/yr", bonus: "50-200%" },
      { title: "Software Engineer", median: 160000, low: 125000, high: 215000, equity: "$15K-$50K/yr", bonus: "10-25%" },
      { title: "Quantitative Analyst", median: 185000, low: 140000, high: 260000, equity: "$20K-$70K/yr", bonus: "20-50%" },
      { title: "Asset Manager", median: 165000, low: 125000, high: 230000, equity: "$15K-$50K/yr", bonus: "20-40%" },
    ],
    perks: ["Healthcare", "401k match 6%", "Wellness programs", "Fitness center", "Flexible work", "Parental leave 16wks", "Education subsidy"],
  },
  {
    name: "McKinsey & Co.", industry: "Consulting", location: "New York, NY",
    roles: [
      { title: "Business Analyst", median: 110000, low: 90000, high: 140000, equity: "None", bonus: "10-25%" },
      { title: "Associate", median: 185000, low: 150000, high: 235000, equity: "None", bonus: "15-30%" },
      { title: "Engagement Manager", median: 250000, low: 200000, high: 320000, equity: "None", bonus: "20-40%" },
      { title: "Associate Partner", median: 400000, low: 320000, high: 520000, equity: "Profit sharing", bonus: "30-50%" },
      { title: "Partner", median: 800000, low: 600000, high: 1200000, equity: "Profit sharing", bonus: "40-60%" },
    ],
    perks: ["Healthcare", "401k match", "MBA sponsorship", "Global mobility", "Travel benefits", "Professional development", "Wellness benefits"],
  },
  {
    name: "Boston Consulting Group", industry: "Consulting", location: "Boston, MA",
    roles: [
      { title: "Consultant", median: 112000, low: 92000, high: 142000, equity: "None", bonus: "10-25%" },
      { title: "Project Leader", median: 200000, low: 160000, high: 255000, equity: "None", bonus: "15-30%" },
      { title: "Principal", median: 380000, low: 300000, high: 500000, equity: "Profit sharing", bonus: "30-50%" },
      { title: "Managing Director", median: 750000, low: 550000, high: 1100000, equity: "Profit sharing", bonus: "40-60%" },
    ],
    perks: ["Healthcare", "401k match", "MBA sponsorship", "Global exposure", "Flexible work", "Mental health support", "Parental leave 16wks"],
  },
  {
    name: "UnitedHealth Group", industry: "Healthcare", location: "Minnetonka, MN",
    roles: [
      { title: "Software Engineer", median: 115000, low: 90000, high: 155000, equity: "$10K-$30K/yr", bonus: "8-12%" },
      { title: "Data Analyst", median: 85000, low: 68000, high: 110000, equity: "$5K-$15K/yr", bonus: "5-10%" },
      { title: "Clinical Informatics Specialist", median: 95000, low: 76000, high: 125000, equity: "$5K-$15K/yr", bonus: "8-12%" },
      { title: "Healthcare Consultant", median: 105000, low: 82000, high: 140000, equity: "$8K-$20K/yr", bonus: "10-15%" },
      { title: "Product Manager", median: 135000, low: 105000, high: 178000, equity: "$15K-$40K/yr", bonus: "10-15%" },
    ],
    perks: ["Healthcare (zero-premium options)", "401k match 100% up to 6%", "ESPP", "Tuition reimbursement $5K", "Parental leave 12wks", "Wellness credits"],
  },
  {
    name: "Johnson & Johnson", industry: "Healthcare", location: "New Brunswick, NJ",
    roles: [
      { title: "Research Scientist", median: 125000, low: 98000, high: 162000, equity: "$10K-$30K/yr", bonus: "10-15%" },
      { title: "Regulatory Affairs Specialist", median: 110000, low: 88000, high: 145000, equity: "$8K-$20K/yr", bonus: "8-12%" },
      { title: "Clinical Trial Manager", median: 135000, low: 105000, high: 175000, equity: "$10K-$25K/yr", bonus: "10-15%" },
      { title: "Medical Director", median: 280000, low: 220000, high: 360000, equity: "$30K-$80K/yr", bonus: "15-25%" },
    ],
    perks: ["Healthcare", "401k match 75% up to 6%", "ESPP 15% discount", "Parental leave 12wks", "On-site gym", "Tuition reimbursement", "Adoption assistance"],
  },
  {
    name: "Walmart", industry: "Retail", location: "Bentonville, AR",
    roles: [
      { title: "Software Engineer", median: 125000, low: 98000, high: 168000, equity: "$10K-$30K/yr RSU", bonus: "5-15%" },
      { title: "Supply Chain Manager", median: 110000, low: 85000, high: 148000, equity: "$8K-$20K/yr RSU", bonus: "10-20%" },
      { title: "Data Scientist", median: 135000, low: 105000, high: 178000, equity: "$10K-$25K/yr RSU", bonus: "5-15%" },
      { title: "Store Manager", median: 135000, low: 95000, high: 190000, equity: "$15K-$40K/yr RSU", bonus: "50-150%" },
      { title: "Merchandising Director", median: 200000, low: 155000, high: 270000, equity: "$20K-$60K/yr RSU", bonus: "30-60%" },
    ],
    perks: ["Healthcare day 1", "Stock purchase plan 15% discount", "401k match 6%", "Tuition coverage 100%", "Associate discount 10%", "Parental leave 6wks"],
  },
  {
    name: "Tesla", industry: "Manufacturing / Automotive", location: "Austin, TX",
    roles: [
      { title: "Software Engineer", median: 165000, low: 130000, high: 220000, equity: "$30K-$100K/yr RSU", bonus: "None" },
      { title: "Mechanical Engineer", median: 115000, low: 90000, high: 150000, equity: "$15K-$40K/yr RSU", bonus: "None" },
      { title: "Manufacturing Engineer", median: 105000, low: 82000, high: 138000, equity: "$10K-$30K/yr RSU", bonus: "None" },
      { title: "Production Manager", median: 130000, low: 100000, high: 175000, equity: "$15K-$40K/yr RSU", bonus: "None" },
      { title: "Battery Engineer", median: 145000, low: 115000, high: 190000, equity: "$20K-$50K/yr RSU", bonus: "None" },
    ],
    perks: ["Equity refresh annually", "Medical/dental/vision", "401k match", "Free EV charging", "Adoption assistance", "Employee vehicle discount", "Stock purchase program"],
  },
  {
    name: "Salesforce", industry: "Technology", location: "San Francisco, CA",
    roles: [
      { title: "Software Engineer", median: 175000, low: 138000, high: 235000, equity: "$40K-$120K/yr RSU", bonus: "10-15%" },
      { title: "Solutions Engineer", median: 145000, low: 112000, high: 195000, equity: "$20K-$60K/yr RSU", bonus: "10-15%" },
      { title: "Product Manager", median: 170000, low: 135000, high: 225000, equity: "$35K-$100K/yr RSU", bonus: "10-15%" },
      { title: "Account Executive", median: 120000, low: 85000, high: 180000, equity: "$15K-$40K/yr RSU", bonus: "50-150%" },
    ],
    perks: ["Healthcare", "401k match 100% up to 5%", "Wellness reimbursement $100/mo", "Parental leave 26wks", "Volunteer time off 56hrs/yr", "Education reimbursement", "ESPP 15% discount"],
  },
  {
    name: "Adobe", industry: "Technology", location: "San Jose, CA",
    roles: [
      { title: "Software Engineer", median: 165000, low: 130000, high: 220000, equity: "$30K-$100K/yr RSU", bonus: "10-15%" },
      { title: "Product Manager", median: 160000, low: 125000, high: 210000, equity: "$25K-$80K/yr RSU", bonus: "10-15%" },
      { title: "UX Designer", median: 155000, low: 120000, high: 200000, equity: "$20K-$70K/yr RSU", bonus: "10-15%" },
      { title: "AI/ML Engineer", median: 200000, low: 160000, high: 270000, equity: "$50K-$140K/yr RSU", bonus: "10-15%" },
    ],
    perks: ["Healthcare", "401k match 50% unlimited", "Sabbatical every 5 yrs", "Parental leave 26wks", "ESPP 15% discount", "Home office stipend", "Free lunch"],
  },
  {
    name: "NVIDIA", industry: "Technology", location: "Santa Clara, CA",
    roles: [
      { title: "Software Engineer", median: 210000, low: 165000, high: 280000, equity: "$60K-$180K/yr RSU", bonus: "10-20%" },
      { title: "Hardware Engineer", median: 195000, low: 155000, high: 260000, equity: "$50K-$150K/yr RSU", bonus: "10-20%" },
      { title: "Deep Learning Engineer", median: 240000, low: 190000, high: 320000, equity: "$80K-$200K/yr RSU", bonus: "15-25%" },
      { title: "CUDA Engineer", median: 225000, low: 175000, high: 300000, equity: "$70K-$180K/yr RSU", bonus: "15-25%" },
    ],
    perks: ["Healthcare", "401k match 4%", "ESPP 15% discount", "Free meals", "On-site gym", "Parental leave 24wks", "Tuition assistance", "Shuttle service"],
  },
  {
    name: "Palantir", industry: "Technology", location: "Denver, CO",
    roles: [
      { title: "Forward Deployed Engineer", median: 190000, low: 150000, high: 260000, equity: "$50K-$150K/yr RSU", bonus: "10-20%" },
      { title: "Software Engineer", median: 180000, low: 140000, high: 245000, equity: "$40K-$120K/yr RSU", bonus: "10-20%" },
      { title: "Deployment Strategist", median: 145000, low: 110000, high: 195000, equity: "$20K-$60K/yr RSU", bonus: "10-15%" },
      { title: "Engineering Manager", median: 320000, low: 250000, high: 430000, equity: "$100K-$250K/yr RSU", bonus: "20%" },
    ],
    perks: ["Healthcare 100% paid", "401k match 6%", "Free meals", "Equity refreshes", "Flexible PTO", "On-site gym", "Travel opportunities"],
  },
  {
    name: "Capital One", industry: "Finance & Banking", location: "McLean, VA",
    roles: [
      { title: "Software Engineer", median: 145000, low: 110000, high: 190000, equity: "$15K-$50K/yr RSU", bonus: "8-12%" },
      { title: "Senior Software Engineer", median: 210000, low: 165000, high: 280000, equity: "$30K-$80K/yr RSU", bonus: "10-15%" },
      { title: "Data Scientist", median: 155000, low: 120000, high: 205000, equity: "$15K-$50K/yr RSU", bonus: "8-12%" },
      { title: "Product Manager", median: 150000, low: 115000, high: 198000, equity: "$15K-$45K/yr RSU", bonus: "8-12%" },
    ],
    perks: ["Healthcare", "401k match 100% up to 5%", "Cash allowance for benefits", "Parental leave 12wks", "Tuition reimbursement", "Wellness reimbursement", "Commuter benefits"],
  },
  {
    name: "Deloitte", industry: "Consulting", location: "New York, NY",
    roles: [
      { title: "Consultant", median: 95000, low: 78000, high: 120000, equity: "None", bonus: "5-15%" },
      { title: "Senior Consultant", median: 130000, low: 105000, high: 168000, equity: "None", bonus: "10-20%" },
      { title: "Manager", median: 175000, low: 140000, high: 225000, equity: "None", bonus: "15-30%" },
      { title: "Senior Manager", median: 240000, low: 190000, high: 310000, equity: "None", bonus: "20-40%" },
      { title: "Partner", median: 600000, low: 450000, high: 900000, equity: "Profit sharing", bonus: "30-50%" },
    ],
    perks: ["Healthcare", "401k match 25% up to 6%", "CPA/CFA exam support", "Flexible PTO", "Tuition reimbursement", "Wellness subsidy", "Discount programs"],
  },
]
