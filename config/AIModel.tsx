// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  });
  const tools = [
    {
      googleSearch: {
      }
    },
  ];
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    tools,
  };
  const model = 'gemini-2.5-pro';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Learn Python:: As you are a coaching teacher
-User wants to learn about the topic
-Generate 5-7 course title for the study
-Make sure it is related to description
-Output will be array of string in JSON format only
-Do not add any plain text in output`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Creating Python Course Titles**

I'm starting the process of generating course titles. Currently, my focus is on crafting 5-7 engaging and descriptive titles suitable for a beginner-to-intermediate Python course. Given the user's role as a "coaching teacher," the titles need to resonate with that perspective. I'll structure the output as a JSON array of strings, as requested.


**Generating Engaging Titles**

I've refined the title options and selected my preferred 5 to 7. I've focused on clarity, like "From Scratch to Scripts," and aspirational goals, such as "Zero to Mastery." I'm now formatting the titles into the specified JSON array. The user's "coaching teacher" role guided the selection, emphasizing hands-on learning, interactivity, and practical application.


**Selecting Final Course Titles**

I've finalized my selections and formatted them into the requested JSON array. I focused on titles that embody a coaching style, like "Interactive Python Coaching: Learn by Doing." Other examples are “From Scratch to Scripts” and “The Complete Python Developer Course: Zero to Mastery,” which cater to varying experience levels. All the selections have been reviewed and seem suitable for the user's coaching role, as they will be an expert in Python.


`,
        },
        {
          text: `\`\`\`json
[
  "Python Programming: From Beginner to Pro",
  "The Complete Python Bootcamp: A Hands-On Approach",
  "Python for Data Science: A Practical Introduction",
  "Learn Python Interactively: Your Personal Coding Coach",
  "Mastering Python: A Comprehensive Study Guide",
  "Python for Web Development: Build Real-World Applications",
  "Automate with Python: A Project-Based Learning Course"
]
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fileIndex = 0;
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
