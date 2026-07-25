import re

with open('src/pages/average-salary-by-role.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the merge conflict markers and remove the duplicate section
# The structure is: ... first function ends with `;` ... ======= ... duplicate function ... `;` ... document.body.appendChild
# We need to keep just: first function ends with `;` ... document.body.appendChild

# Find the ======= marker
idx = content.find('\n=======\n')
if idx >= 0:
    # Find the end of the duplicate section - it ends right before the line that has "document.body.appendChild"
    # The duplicate function ends with `;` followed by whitespace and then newline
    end_marker = '\n      document.body.appendChild(backdrop);'
    end_idx = content.find(end_marker, idx)
    if end_idx >= 0:
        # Remove from ======= to just before document.body.appendChild
        content = content[:idx] + content[end_idx:]
        with open('src/pages/average-salary-by-role.astro', 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed! Removed from index {idx} to {end_idx}")
    else:
        print("Could not find document.body.appendChild marker")
else:
    print("No ======= found")
