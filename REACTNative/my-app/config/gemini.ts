import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

// Initialize the Gemini API client
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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