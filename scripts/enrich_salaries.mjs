import fs from 'fs';

const filePath = 'src/data/salaries.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Step 1: Update the interface
const oldInterface = `export interface SalaryData {
  role: string;
  category: string;
  median: number;
  low: number; // 25th percentile
  high: number; // 75th percentile
}`;

const newInterface = `export interface SalaryData {
  role: string;
  category: string;
  median: number;
  low: number; // 25th percentile
  high: number; // 75th percentile
  growth: number; // YoY salary growth percentage
  skills: string[]; // Top skills for the role
  description: string; // Brief role description
}`;

content = content.replace(oldInterface, newInterface);

// Skill sets by category
const SKILLS_BY_CATEGORY = {
    "Technology": ["JavaScript", "Python", "React", "Node.js", "AWS", "SQL", "Docker", "Git", "TypeScript", "REST APIs"],
    "Healthcare": ["Patient Care", "EMR/EHR Systems", "Clinical Knowledge", "CPR/BLS", "Medical Terminology", "ICD-10", "Phlebotomy", "Diagnostic Skills"],
    "Finance & Business": ["Financial Analysis", "Excel", "SQL", "Financial Modeling", "ERP Systems", "GAAP", "Risk Management", "Data Analysis"],
    "Marketing & Sales": ["SEO/SEM", "Content Strategy", "Social Media", "CRM Tools", "Analytics", "Copywriting", "Email Marketing", "PPC"],
    "Education & Public Service": ["Curriculum Design", "Assessment", "Classroom Management", "Educational Technology", "Student Counseling", "Grant Writing"],
    "Engineering & Trades": ["AutoCAD", "Project Management", "Blueprints", "OSHA", "Welding", "HVAC", "Electrical Systems", "Structural Analysis"],
    "Legal & Public Safety": ["Legal Research", "Case Management", "Contract Law", "Compliance", "Investigation", "Criminal Law", "Litigation"],
    "Service & Hospitality": ["Customer Service", "POS Systems", "Inventory Management", "Team Leadership", "Food Safety", "Scheduling"],
    "Emerging Tech": ["Python", "TensorFlow", "PyTorch", "Kubernetes", "Docker", "AWS/GCP/Azure", "ML/AI", "Blockchain", "Rust", "Go"],
    "Creative & Design": ["Figma", "Adobe Creative Suite", "UI/UX", "Typography", "Motion Graphics", "3D Modeling", "Illustration", "Prototyping"],
    "Data & Analytics": ["Python", "SQL", "Tableau", "Power BI", "Machine Learning", "Statistics", "Data Modeling", "ETL", "R", "Spark"],
};

const GROWTH_BY_CATEGORY = {
    "Technology": 7.2,
    "Healthcare": 6.8,
    "Finance & Business": 5.4,
    "Marketing & Sales": 6.1,
    "Education & Public Service": 3.8,
    "Engineering & Trades": 4.9,
    "Legal & Public Safety": 4.2,
    "Service & Hospitality": 5.5,
    "Emerging Tech": 12.5,
    "Creative & Design": 5.8,
    "Data & Analytics": 10.2,
};

const DESIGN_BY_ROLE = {
    "Software Engineer": "Designs, develops, and maintains software applications using engineering best practices.",
    "Frontend Developer": "Builds responsive user interfaces using modern web frameworks and technologies.",
    "Backend Developer": "Creates server-side logic, APIs, and database integrations for web applications.",
    "Data Scientist": "Analyzes complex data using statistical methods and machine learning to drive decisions.",
    "Product Manager": "Defines product strategy and coordinates cross-functional teams to deliver value.",
    "UX/UI Designer": "Designs intuitive user experiences through research, prototyping, and visual design.",
    "Registered Nurse": "Provides direct patient care, administers medications, and coordinates treatment plans.",
    "Physician": "Diagnoses and treats medical conditions, prescribes treatments, and manages patient care.",
    "Attorney / Lawyer": "Represents clients in legal matters, provides counsel, and argues cases in court.",
};

// Process each line
const lines = content.split('\n');
const newLines = [];

for (const line of lines) {
    // Match single-line role entries like: { role: "...", category: "...", ... },
    const match = line.match(/^\s*\{\s*role:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*median:\s*(\d+),\s*low:\s*(\d+),\s*high:\s*(\d+)\s*\},?\s*$/);

    if (match) {
        const roleName = match[1];
        const category = match[2];
        const skills = SKILLS_BY_CATEGORY[category] || ["Communication", "Problem Solving", "Teamwork"];
        const growth = GROWTH_BY_CATEGORY[category] || 4.0;
        const description = DESIGN_BY_ROLE[roleName] || `Professional ${category.toLowerCase()} role with competitive compensation.`;

        const skillsStr = JSON.stringify(skills);
        newLines.push(`  { role: "${roleName}", category: "${category}", median: ${match[3]}, low: ${match[4]}, high: ${match[5]}, growth: ${growth}, skills: ${skillsStr}, description: "${description}" },`);
    } else {
        newLines.push(line);
    }
}

let result = newLines.join('\n');

// Fix any trailing comma issues
result = result.replace(/,\s*\n\s*\];/, '\n];');

fs.writeFileSync(filePath, result, 'utf8');
console.log('✅ salaries.ts enriched!');
console.log(`📊 Total roles enriched: ${(result.match(/growth:/g) || []).length}`);

