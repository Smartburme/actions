# Python script to read HTML file and print info
print("Hello from Python script!")

with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

print(f"HTML file has {len(html_content)} characters")
