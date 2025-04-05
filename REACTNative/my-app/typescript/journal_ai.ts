import { config } from "dotenv";
import { join } from "path";

// Load .env file from the same directory
config({ path: join(__dirname, '.env') });
console.log("Loaded API Key:", process.env.GOOGLE_AI_API_KEY); // Debug line to check the API key

import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if the API key is loaded properly
if (!process.env.GOOGLE_AI_API_KEY) {
  console.error("API key is not loaded. Please check your .env file.");
  process.exit(1); // Exit if the key is not loaded
}

const ai = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);  // Directly pass the API key as a string

const journal_entry = "April 5th, 2025. I am doing my first journal entry. I did not get a lot of sleep last night. It is 11:00 AM. I am feeling pretty good right now.";

async function main() {
  try {
    
    
    



    // Try using a different model name and API version
    const model = ai.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    });

    console.log("Model initialized successfully");
    console.log("Sending request to API...");

    const result = await model.generateContent([
      `Can you give me a paragraph analysis of my journal entry? My journal entry is: ${journal_entry}. I want the analysis to analyze the emotions and feelings of the person writing the journal entry.`,
    ]);

    // Access the response correctly
    const response = await result.response; 
    console.log("\nResponse from AI:\n");
    console.log(response?.text());  // response?.text() handles if the response is undefined or null
  } catch (error: any) {
    console.error("\nError details:");
    console.error("Message:", error.message);
    console.error("Status:", error.status);
    console.error("Status Text:", error.statusText);
    
    if (error?.message?.includes("404")) {
      console.error("\nPossible solutions:");
      console.error("1. Verify your API key has access to the Generative Language API");
      console.error("2. Check if the model name is correct (current: gemini-pro)");
      console.error("3. Make sure you have enabled the API in Google Cloud Console");
      console.error("4. Verify your billing is set up correctly");
      console.error("\nPlease visit https://console.cloud.google.com/ to verify your API settings");
    }
  }
}

// Call main function
(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error:", error);
  }
})();
