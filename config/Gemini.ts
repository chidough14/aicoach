// gemini.ts
import { GoogleGenAI } from '@google/genai';
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Gemini API key is missing. Check EXPO_PUBLIC_GEMINI_API_KEY in app.config.js');
}

// Create the Gemini AI client
const genAI = new GoogleGenAI({ apiKey });


export async function getGeminiResponse(prompt: string): Promise<string> {

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-pro', // ✅ Safe for old SDKs
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  return text.trim();
}


export async function generateCoursesFromTopics(topics: string[]) {
  //   const prompt = `
  // Generate 1 beginner-level course for each of these topics: ${topics.join(", ")}.

  // For each course, include:
  // - courseTitle
  // - description
  // - 1 chapter (with 1 topic)
  // - 1 quiz
  // - 1 flashcard
  // - 1 question & answer
  // - category from ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"]
  // - banner_image randomly from: "/banner1.png" to "/banner6.png"

  // Return only valid JSON in this format:
  // { "courses": [ ... ] }
  // Do not include markdown or comments.
  // `;

  // const prompt = `
  // You are an expert course creator and teacher.

  // Please generate exactly 2 learning courses based on these topics ${topics.join(", ")}. Each course should include:

  // - courseTitle (string)
  // - description (string)
  // - banner_image (choose randomly from: '/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png')
  // - category (choose one from: "Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity")
  // - chapters: 5–8 chapters per course. Each chapter must have:
  //   - chapterName
  //   - content: A list of 2–5 topics. Each topic has:
  //     - topic (2–4 word title)
  //     - explain (detailed explanation in 5–8 lines, include examples)
  //     - code (optional, otherwise null)
  //     - example (optional, otherwise null)

  // - quiz: 10 items (question, options [a, b, c, d], correctAns)
  // - flashcards: 10 (front, back)
  // - qa: 10 (question, answer)

  // ⚠️ OUTPUT FORMAT:
  // Return **only valid JSON**, without markdown, notes, or explanations.
  // Format: { "courses": [ ... ] }
  // `

  const prompt = `: As you are coaching teacher
    - User want to learn about these topics: ${topics.join(", ")}
    - Create 2 Courses With Course Name, Description, and 2 Chapters in each course
    - Make sure to add chapters 
    - List Content in each chapter along with Description in 5 to 8 lines
    - Do not Just Explain what chapter about, Explain in Detail with Example
    - Also Make Easy, Moderate and Advance Course depends on topics
    - Add CourseBanner Image from ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), select It randomly
    - Explain the chapter content as detailed tutorial with list of content
    - Generate 3 Quizz, 3 Flashcard and 3 Questions answer
    - Tag each course to one of the categorty from :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
    - Output in JSON Format only 
    -  "courses": [
  {
    "courseTitle": '<Intro to Python>',
    "description": '',
    "banner_image": "/banner1.png",
    "category":"",
    "chapters": [
      {
        chapterName: '',
        content: [
          {
            topic: '<Topic Name in 2 to 4 worlds ex.(Creating Variables)>'
            explain: '< Detailed Explaination in 5 to 8 Lines if required>',
            code: '<Code example of required else null',
            example: '< example of required else null'
          },
          
            ...
          
        ]
      }
    ],
    quiz:[
      {
        question:'',
        options:['a',b,c,d],
        correctAns:''
      }
    ],
    flashcards:[
      {
        front:'',
        back:''
      }
    ],
    qa:[
      {
        question:'',
        answer:''
      }
    ]
  }
]
    `


  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-pro", // or gemini-2.5-pro if supported
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    return text.trim();
  } catch (error) {
    console.error("Gemini Course Generation Error:", error);
    return "Error occurred while generating course.";
  }
}





