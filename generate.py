# Python script to generate dynamic HTML content
from datetime import datetime

# Dynamic sections content
projects = [
    {"title": "Personal AI Chatbot", "desc": "AI chatbot using Python backend and HTML/JS frontend."},
    {"title": "Portfolio Website", "desc": "Responsive portfolio website with projects and skills."}
]

# Generate HTML for projects
projects_html = ""
for p in projects:
    projects_html += f"""
    <div class="card">
        <h3>{p['title']}</h3>
        <p>{p['desc']}</p>
    </div>
    """

# Read base HTML template
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Insert dynamic content placeholder
html_content = html_content.replace("{{projects}}", projects_html)
html_content = html_content.replace("{{current_year}}", str(datetime.now().year))

# Write updated HTML
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("HTML updated with dynamic content!")
