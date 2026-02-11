import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Fallback mock response if API key is missing or fails, to ensure UI demo works
const MOCK_AI_RESPONSE = `
Based on the vibe "Spontaneous Adventure", here are 3 recommended plans:

1. **Rooftop Sunset Yoga**: Head to the High Line for a quick flow session as the sun goes down. Great for clearing your head.
2. **Late Night Dim Sum**: There's a spot in Chinatown open till 3 AM. Perfect for a hungry group.
3. **Secret Comedy Show**: The Comedy Cellar has a pop-up show starting in 2 hours.
`;

export const generateAIPlan = async (vibe: string, location: string): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found, returning mock AI response.");
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_AI_RESPONSE), 1500));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest 3 unique, safe, and social activity plans for a group of Gen Z friends in ${location} with the vibe: "${vibe}". 
      Keep it short, punchy, and formatted as a numbered list. No markdown headers, just the list.`,
    });
    return response.text || MOCK_AI_RESPONSE;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return MOCK_AI_RESPONSE;
  }
};