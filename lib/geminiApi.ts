import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const prompt =
  "You're a text reviewer for an app where different users share their interview experiences with others so others can learn from their experiences. Review the following interview experience for clarity, professionalism, and coherence while preserving the user's original content. Ensure minimal changes, keeping the experience authentic and well-structured. Provide the revised text directly without additional commentary or explanations";

export async function generateText(userPrompt: string) {
  const fullPrompt = prompt + userPrompt;

  try {
    const response = await model.generateContent(fullPrompt);
    return response.response?.text();
  } catch (error) {
    console.log("Error in generating text ", error);
  }
}
