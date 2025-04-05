import { config } from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load the API key from the .env file
config();
const apiKey = process.env.GOOGLE_AI_API_KEY;       

if (!apiKey) {
  console.error("API key is not loaded. Please check your .env file.");
  process.exit(1);
}

// Initialize Google AI with the API key
const ai = new GoogleGenAI({ apiKey });

// Your journal entry
let journal_entry = "April 5th, 2025. I am doing my first journal entry. I did not get a lot of sleep last night. It is 11:00 AM. I am feeling pretty good right now.";

async function main() {
  try {
    // Send the request to generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Adjust model name as per the valid models
      contents: `Can you give me a paragraph analysis of my journal entry? My journal entry is: ${journal_entry}. I want the analysis to analyze the emotions and feelings of the person writing the journal entry.`,
    });

    // Log the response from AI
    console.log(response.text);    
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Execute main function
main();
