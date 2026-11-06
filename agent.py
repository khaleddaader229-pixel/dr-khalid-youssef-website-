import glob
import datetime
import os

import anthropic

MODEL = os.environ.get("CLAUDE_MODEL", "claude-sonnet-5-5")
MAX_CHARS_PER_FILE = 15000

INSTRUCTIONS = """أنت مساعد يراجع الموقع الشخصي لطبيب عظام. اكتب تقريراً بالعربية يحتوي على:
1. مشاكل SEO في كل صفحة (العنوان، الوصف، العناوين الفرعية، النصوص البديلة للصور).
2. روابط يبدو أنها مكسورة أو مشبوهة.
3. تحسينات مقترحة لسهولة القراءة على الموبايل.
4. ثلاث أفكار لمقالات جديدة قد يبحث عنها المرضى.

قواعد مهمة:
- لا تعدّل أي ملف، فقط اقترح.
- لا تضف أي معلومة طبية جديدة بنفسك. أي اقتراح طبي يُكتب كفكرة عنوان فقط، والطبيب هو من يكتب المحتوى.
- رتّب الاقتراحات من الأهم إلى الأقل أهمية، وكن مختصراً.
"""


def read_site():
    parts = []
    for path in sorted(glob.glob("**/*.html", recursive=True)):
        with open(path, encoding="utf-8", errors="ignore") as f:
            text = f.read()[:MAX_CHARS_PER_FILE]
        parts.append(f"=== {path} ===\n{text}")
    return "\n\n".join(parts)


def main():
    site = read_site()
    if not site:
        raise SystemExit("No HTML files found.")

    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from the environment
    response = client.messages.create(
        model=MODEL,
        max_tokens=3000,
        system=INSTRUCTIONS,
        messages=[{"role": "user", "content": site}],
    )
    report = "".join(b.text for b in response.content if b.type == "text")

    os.makedirs("agent-reports", exist_ok=True)
    name = f"agent-reports/{datetime.date.today().isoformat()}.md"
    with open(name, "w", encoding="utf-8") as f:
        f.write(report)
    print(f"Saved {name}")


if __name__ == "__main__":
    main()
