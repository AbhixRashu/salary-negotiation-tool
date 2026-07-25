import re

with open('src/pages/average-salary-by-role.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update import line
new_content = re.sub(
    r'import \{ ROLES, METRO_AREAS \} from "\.\./data/salaries";',
    'import { ROLES, METRO_AREAS, EXPERIENCE_LEVELS } from "../data/salaries";',
    content
)

# 2. Replace the hardcoded ROLES_LIST with a spread of ROLES
pattern = r'const ROLES_LIST\s*=\s*\[[\s\S]*?\];'
new_content = re.sub(pattern, 'const ROLES_LIST = [...ROLES];', new_content, flags=re.DOTALL)

# 3. Extract script tag content
script_match = re.search(r'<script is:inline>([\s\S]*)</script>', new_content)
if script_match:
    script_inner = script_match.group(1)
    # Replace the showDetailModal function
    # We'll replace from 'function showDetailModal(roleData, multiplier) {' to the closing brace before 'function closeModal'
    # We'll do a simple replacement using a placeholder.
    new_show = '''function showDetailModal(roleData, multiplier) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <div class="modal-content">
        <div class="p-6 border-b border-hairline flex items-start justify-between">
          <div>
            <h3 class="text-lg font-semibold text-ink">${roleData.role}</h3>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider mt-1.5" style="background:${getCategoryColor(roleData.category)}22; color:${getCategoryColor(roleData.category)}; border:1px solid ${getCategoryColor(roleData.category)}44;">${roleData.category}</span>
          </div>
          <button class="modal-close w-8 h-8 rounded-full border border-hairline bg-canvas hover:bg-canvas-soft-2 flex items-center justify-center cursor-pointer transition-colors text-mute hover:text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-3 gap-3">
            <div class="stat-highlight">
              <div class="text-[10px] font-mono text-mute uppercase tracking-wider">25th Percentile</div>
              <div class="text-sm font-semibold text-ink font-mono mt-1">${fmt(Math.round(roleData.low * multiplier))}</div>
            </div>
            <div class="stat-highlight" style="border-color:rgba(0,112,243,0.3);">
              <div class="text-[10px] font-mono text-mute uppercase tracking-wider">Median Salary</div>
              <div class="text-base font-bold text-accent-blue font-mono mt-1">${fmt(Math.round(roleData.median * multiplier))}</div>
            </div>
            <div class="stat-highlight">
              <div class="text-[10px] font-mono text-mute uppercase tracking-wider">75th Percentile</div>
              <div class="text-sm font-semibold text-ink font-mono mt-1">${fmt(Math.round(roleData.high * multiplier))}</div>
            </div>
          </div>
          <div class="border-t border-hairline pt-4 mb-4">
            <div class="text-xs font-mono text-mute uppercase tracking-wider mb-2">Role Description</div>
            <p class="text-sm text-ink leading-relaxed">${roleData.description}</p>
          </div>
          <div class="border-t border-hairline pt-4 mb-4">
            <div class="text-xs font-mono text-mute uppercase tracking-wider mb-2">Yearly Growth (YoY)</div>
            <p class="text-sm font-semibold text-ink">${roleData.growth.toFixed(1)}%</p>
          </div>
          <div class="border-t border-hairline pt-4 mb-4">
            <div class="text-xs font-mono text-mute uppercase tracking-wider mb-2">Top Skills</p>
            <div class="flex flex-wrap gap-2">
              ${roleData.skills.map(shift => `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-canvas-soft-2 hover:bg-canvas-soft">${shift}</span>`).join('')}
            </div>
          </div>
          <div class="border-t border-hairline pt-4">
            <div class="text-xs font-mono text-mute uppercase tracking-wider mb-2">Seniority Ladder (Salary Multipliers)</div>
            <div class="space-y-2">
              ${Object.entries(EXPERIENCE_LEVELS).map(([level, data]) => {
                const base = roleData.median;
                const adj = base * data.multiplier * multiplier;
                return `<div class="flex justify-between text-xs"><span>${data.name}</span><span class="font-mono text-${level === 'entry' ? 'text-success' : level === 'lead' ? 'text-warning' : 'text-ink'}">${fmt(Math.round(adj))}</span></div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Close handlers
    const closeBtn = backdrop.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => closeModal(backdrop));
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        closeModal(backdrop);
        document.removeEventListener("keydown", escHandler);
      }
    });
  }'''
    # Replace the function in script_inner
    # We'll find the start and end of the old function.
    # Simple approach: replace using regex that matches the function.
    func_pattern = r'function showDetailModal\(roleData, multiplier\) \{[\s\S]*?\}\s*}(?=\s*function|\s*<\/script>)'
    # Actually we need to match until the closing brace of the function.
    # We'll do a more robust: replace from the function start to the line before 'function closeModal'
    # Let's split lines.
    lines = script_inner.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        if lines[i].strip().startswith('function showDetailModal(roleData, multiplier) {'):
            new_lines.append(new_show)
            # Skip until we find a line that is just '}' (with possible whitespace) and the next line starts with 'function closeModal'
            i += 1
            brace_count = 1
            while i < len(lines) and brace_count > 0:
                line = lines[i]
                for ch in line:
                    if ch == '{':
                        brace_count += 1
                    elif ch == ')':
                        pass
                    elif ch == '}':
                        brace_count -= 1
                i += 1
            # i now points after the closing brace
            continue
        else:
            new_lines.append(lines[i])
            i += 1
    new_script = '\n'.join(new_lines)
    # Replace the script content
    new_content = re.sub(r'<script is:inline>[\s\S]*</script>', f'<script is:inline>\n{new_script}\n</script>', new_content)
else:
    print("Script tag not found")

with open('src/pages/average-salary-by-role.astro', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Astro file updated.")
