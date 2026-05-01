import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing from .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

function extractJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON found in AI response");
    return JSON.parse(match[0]);
  }
}

export const generateTasksFromGoal = async (goal: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a productivity coach and goal strategist. A user has set the following goal: "${goal}".

Break this goal into 4 to 6 realistic, actionable tasks that follow a logical progression — from foundation to completion. Each task should:
- Be something a real person can actually do within a day or week
- Have a clear, motivating title (not generic like "Research" or "Plan")
- Include a description that explains WHY this step matters and HOW to approach it

Return ONLY this JSON, no explanation:
{"tasks": [{ "title": "", "description": "" }]}`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" },
  });

  return extractJson(result.response.text());
};

export const expandTaskWithAI = async (taskTitle: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `You are a productivity expert helping someone complete a specific task. The task is: "${taskTitle}".

Break this into 4 to 6 small, concrete steps that someone can actually check off one by one. Each step should:
- Start with an action verb (e.g. "Open", "Write", "Set up", "Review", "Send")
- Be specific enough that the person knows exactly what to do
- Be completable in under 30 minutes ideally
- Build naturally on the previous step

Return ONLY this JSON, no explanation:
{"steps": ["step 1", "step 2", "step 3"]}`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  return extractJson(result.response.text());
};