// Import required packages
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize the Google AI client with API key from environment variables
// The API key is used to authenticate your requests to Google's AI services
const ai = new GoogleGenAI({ 
  apiKey: process.env.GOOGLE_AI_API_KEY 
});

// Define an async function to handle the AI interaction
// Async/await is used because AI operations are asynchronous (they take time to complete)
async function main() {
  // Generate content using the AI model
  // The model parameter specifies which AI model to use (in this case, gemini-2.0-flash)
  // The contents parameter contains the prompt we want to send to the AI
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  
  // Log the response from the AI
  // The response.text property contains the AI's generated text
  console.log(response.text);
}

// Execute the main function using an IIFE (Immediately Invoked Function Expression)
// This is a common pattern to handle top-level async code in TypeScript
(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error:", error);
  }
})();