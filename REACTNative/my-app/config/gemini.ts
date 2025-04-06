import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY is not defined in environment variables');
}

// Initialize the Gemini API client
export const genAI = new GoogleGenerativeAI(apiKey);

// Helper function to get the text-only model
export const getTextModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-pro" });
};

// Helper function to get the vision model
export const getVisionModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-pro-vision" });
};

// Example usage function
export const generateText = async (prompt: string) => {
  try {
    const model = getTextModel();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
}; 