import dedent from "dedent";

export default {
  IDEA: dedent`:As your are coaching teacher
    - User want to learn about the topic
    - Generate 5-7 Course title for study (Short)
    - Make sure it is releated to description
    - Output will be ARRAY of String in JSON FORMAT only
    - Do not add any plain text in output,
    `,
  // - Chapter Explain in HTML Form, (Code example if required), add line break if required
  COURSE: dedent`
You are an expert course creator and teacher.

Please generate exactly 2 learning courses based on the topics provided. Each course should include:

- courseTitle (string)
- description (string)
- banner_image (choose randomly from: '/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png')
- category (choose one from: "Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity")
- chapters: 5–8 chapters per course. Each chapter must have:
  - chapterName
  - content: A list of 2–5 topics. Each topic has:
    - topic (2–4 word title)
    - explain (detailed explanation in 5–8 lines, include examples)
    - code (optional, otherwise null)
    - example (optional, otherwise null)

- quiz: 10 items (question, options [a, b, c, d], correctAns)
- flashcards: 10 (front, back)
- qa: 10 (question, answer)

⚠️ OUTPUT FORMAT:
Return **only valid JSON**, without markdown, notes, or explanations.
Format: { "courses": [ ... ] }
`
}



