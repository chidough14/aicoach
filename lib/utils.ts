export const extractJsonArray = (response: string): string[] => {
    try {
        // Try to extract a code block marked as json
        const codeBlockMatch = response.match(/```json\s*([\s\S]*?)\s*```/);

        // Fallback: any code block
        const genericBlockMatch = response.match(/```([\s\S]*?)```/);

        // Fallback: raw array in text
        const arrayMatch = response.match(/\[\s*"[^"]+"(?:\s*,\s*"[^"]+")*\s*\]/);

        const jsonText =
            codeBlockMatch?.[1] ||
            genericBlockMatch?.[1] ||
            arrayMatch?.[0] ||
            response;

        return JSON.parse(jsonText.trim());
    } catch (error) {
        console.error('Failed to parse response as JSON array:', error);
        return [];
    }
}


export function extractJson(raw: string): any | null {
  try {
    // Strip markdown or any surrounding text
    const match = raw.match(/{[\s\S]*}/);
    if (!match) return null;
    const cleanJson = match[0];

    return JSON.parse(cleanJson);
  } catch (err) {
    console.error("❌ JSON parse failed", err);
    return null;
  }
}
