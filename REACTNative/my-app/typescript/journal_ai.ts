import { GoogleGenAI } from "@google/genai";

// Initialize the Google AI client with the API key from environment variables
const ai = new GoogleGenAI({ 
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '' 
});

// Function to analyze a journal entry using Google's AI
export async function analyzeJournalEntry(journalEntry: string): Promise<string> {
  try {
    // Generate content using the Gemini model
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Using the Gemini Flash model for quick responses
      contents: `Can you give me a paragraph analysis of my journal entry? My journal entry is: ${journalEntry}. I want the analysis to analyze the emotions and feelings of the person writing the journal entry. Address the reader directly as 'you' and use the first person. Use the present tense. Provide insight and give suggestions for improvement. Make the paragraph 4-5 sentences long. After this first paragraph, make a four or five bullet list of reccomendations or suggestions for improvement to add to a calendar. Make four-five bullet points. Add a title to the list of bullet points. Don't include astricks around the bullet points, the title, or any other formatting.`,
    });
    
    // Check if we received a valid response
    if (!response.text) {
      throw new Error("No response text received from AI");
    }
    
    // Return the AI's analysis
    return response.text;
  } catch (error) {
    // Log and rethrow any errors that occur during analysis
    console.error("Error generating content:", error);
    throw error;
  }
}