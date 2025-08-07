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
  const prompt = `
Generate 1 beginner-level course for each of these topics: ${topics.join(", ")}.

For each course, include:
- courseTitle
- description
- 1 chapter (with 1 topic)
- 1 quiz
- 1 flashcard
- 1 question & answer
- category from ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"]
- banner_image randomly from: "/banner1.png" to "/banner6.png"

Return only valid JSON in this format:
{ "courses": [ ... ] }
Do not include markdown or comments.
`;


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




