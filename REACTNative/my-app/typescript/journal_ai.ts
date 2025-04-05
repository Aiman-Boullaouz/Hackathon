// Journal AI functionality

/*export interface JournalEntry {
  id: string;
  content: string;
  timestamp: Date;
  sentiment?: string;
}

export class JournalAI {
  private entries: JournalEntry[] = [];

  // Add a new journal entry
  addEntry(content: string): JournalEntry {
    const entry: JournalEntry = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      timestamp: new Date(),
    };
    this.entries.push(entry);
    return entry;
  }

  // Get all journal entries
  getEntries(): JournalEntry[] {
    return this.entries;
  }

  // Analyze sentiment of an entry
  analyzeSentiment(entry: JournalEntry): string {
    // TODO: Implement sentiment analysis
    return "neutral";
  }
}*/




/*

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (ideally from an environment variable)
const genAI = new GoogleGenerativeAI("AIzaSyA7fY93b_Oc7HcclOBJ26ZSRIKrVmWwZCU");

async function main() {
  try {
    console.log("Initializing Gemini API...");
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Write a short poem about artificial intelligence.";
    console.log("Sending prompt:", prompt);
    
    // Generate content using a chat format
    const chat = model.startChat({
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    
    console.log("\nResponse from AI:\n", response.text());
    
  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('API Response:', error.response);
    }
  }
}

main().catch(console.error);

*/


/*
import axios from 'axios';

const API_KEY = 'AIzaSyA7fY93b_Oc7HcclOBJ26ZSRIKrVmWwZCU';
const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText';

async function generatePoem() {
  try {
    const response = await axios.post(
      endpoint,
      {
        prompt: {
          text: "Write a short poem about artificial intelligence."
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': API_KEY
        }
      }
    );

    const result = response.data;
    console.log("Response:", JSON.stringify(result, null, 2));
  } catch (error: any) {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Request Error:", error.message);
    }
  }
}

generatePoem();

*/



import { GoogleGenAI } from "@google/genai";


let journal_entry = "April 5th, 2025. I am doing my first journal entry. I did not get a lot of sleep last night. It is 11:00 AM. I am feeling pretty good right now."

// Initialize the Google AI client with your API key
// The API key is used to authenticate your requests to Google's AI services
const ai = new GoogleGenAI({ apiKey: "AIzaSyA7fY93b_Oc7HcclOBJ26ZSRIKrVmWwZCU" });

// Define an async function to handle the AI interaction
// Async/await is used because AI operations are asynchronous (they take time to complete)
async function main() {
  // Generate content using the AI model
  // The model parameter specifies which AI model to use (in this case, gemini-2.0-flash)
  // The contents parameter contains the prompt we want to send to the AI
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Can you give me a paragraph analysis of my journal entry? My journal entry is: " + journal_entry + ". I want the analysis to analyse the emotions and feelings of the person writing the journal entry.",
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