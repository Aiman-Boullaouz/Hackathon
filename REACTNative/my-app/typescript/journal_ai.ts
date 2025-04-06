import { GoogleGenAI } from "@google/genai";

// Initialize Google AI with the API key
const ai = new GoogleGenAI({ 
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '' 
});

export async function analyzeJournalEntry(journalEntry: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Can you give me a paragraph analysis of my journal entry? My journal entry is: ${journalEntry}. I want the analysis to analyze the emotions and feelings of the person writing the journal entry. Address the reader directly as 'you' and use the first person. Use the present tense. Provide insight and give suggestions for improvement.`,
    });
    if (!response.text) {
      throw new Error("No response text received from AI");
    }
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}