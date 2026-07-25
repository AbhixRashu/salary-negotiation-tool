import re

# Read salaries.ts
with open('src/data/salaries.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract role objects using regex pattern for each entry
# We'll capture role and category
pattern = r'\{\s*role:\s*"([^"]+)",\s*category:\s*"([^"]+)"[^}]*\}'
matches = re.findall(pattern, content)
roles = []
for role, category in matches:
    roles.append((role, category))

# Read existing role-descriptions.ts
with open('src/data/role-descriptions.ts', 'r', encoding='utf-8') as f:
    desc_content = f.read()

# Extract existing descriptions
desc_pattern = r'"([^"]+)"\s*:'
desc_matches = re.findall(desc_pattern, desc_content)
existing = set(desc_matches)

print(f"Total roles in salaries.ts: {len(roles)}")
print(f"Existing descriptions: {len(existing)}")

# Determine missing
missing = [r for r in roles if r[0] not in existing]
print(f"Missing descriptions: {len(missing)}")

# Prepare description mapping
def generate_description(role, category):
    cat = category.lower()
    if 'technology' in cat:
        return f"{role} develops, implements, and maintains technology solutions."
    elif 'healthcare' in cat:
        return f"{role} provides patient care and medical services."
    elif 'finance' in cat or 'business' in cat:
        return f"{role} analyzes financial data and supports business operations."
    elif 'marketing' in cat or 'sales' in cat:
        return f"{role} creates and executes marketing and sales strategies."
    elif 'education' in cat:
        return f"{role} educates and supports learners in academic settings."
    elif 'engineering' in cat:
        return f"{role} designs, builds, and maintains engineering systems."
    elif 'legal' in cat:
        return f"{role} provides legal counsel and ensures compliance."
    elif 'service' in cat or 'hospitality' in cat:
        return f"{role} delivers customer service and hospitality experiences."
    elif 'creative' in cat:
        return f"{role} creates visual and multimedia content."
    elif 'data' in cat:
        return f"{role} analyzes and interprets data to drive decisions."
    else:
        return f"{role} performs specialized duties in the {category} field."

# Build new entries
new_entries = {}
for role, category in missing:
    desc = generate_description(role, category)
    new_entries[role] = desc

# Read the whole file to replace the object
lines = []
with open('src/data/role-descriptions.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find start and end indices
start_idx = None
for i, line in enumerate(lines):
    if line.strip().startswith('export const ROLE_DESCRIPTIONS'):
        start_idx = i
        break
if start_idx is None:
    raise ValueError("Could not find ROLE_DESCRIPTIONS line")

# Find matching closing brace after start_idx
brace_count = 0
end_idx = None
for i in range(start_idx, len(lines)):
    line = lines[i]
    for ch in line:
        if ch == '{':
            brace_count += 1
        elif ch == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i
                break
    if end_idx is not None:
        break

if end_idx is None:
    raise ValueError("Could not find matching closing brace")

# Build new content lines
new_lines = lines[:start_idx+1]  # include the line with '= { '}= {' line? Actually the line includes '= {', we keep it.
# Add entries sorted by role
for role, desc in sorted(new_entries.items()):
    # Escape quotes in description if any
    desc_escaped = desc.replace('"', '\\"')
    new_lines.append(f'    "{role}": "{desc_escaped}",\n')
# Keep the closing brace line (the line at end_idx)
new_lines.append(lines[end_idx])  # this line contains '};'
# Append any remaining lines after end_idx
new_lines.extend(lines[end_idx+1:])

# Write back
with open('src/data/role-descriptions.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Added {len(new_entries)} new descriptions.")
