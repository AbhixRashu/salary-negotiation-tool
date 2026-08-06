 fs from 'fs';

const content = fs.readFileSync('src/data/salaries.ts', 'utf8');
const regex = /\{ role: "([^"]+)", category: "([^"]+)", median: (\d+), low: (\d+), high: (\d+), growth: [\d.]+, skills: (\[[^\]]+\]), description: "([^"]+)" \},/g;
const defaultSkills = ["Communication", "Problem Solving", "Teamwork", "Analytical Skills", "Time Management"];
const defaultStr = JSON.stringify(defaultSkills);
let match;
let fallbackRoles = [];

while ((match = regex.exec(content)) !== null) {
    if (match[6] === defaultStr) {
        growth: growthMatch ? growthMatch[1] : 'N/A'
    });
}
}
console.log('Roles with generic placeholder skills:');
fallbackRoles.forEach(r => console.log(`  - "${r.role}" (${r.category}) | Median: $${r.median} | Growth: ${r.growth}%`));
console.log(`Total: ${fallbackRoles.length}`);
</｜｜DSML｜｜parameter >
</execute_command >
