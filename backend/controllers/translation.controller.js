// backend/controllers/translationController.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const translateText = async (req, res) => {
  const { json_data, target_language, language_name } = req.body;

  if (!json_data || !target_language || !language_name) {
    return res.status(400).json({ error: "Required fields are missing." });
  }

  const prompt = `
    Translate only the string values in the following JSON object to ${language_name} (language code: ${target_language}).
    Do not translate the keys.
    Return your response as a single, valid JSON object and nothing else. Do not include any introductory text, comments, or markdown formatting like \`\`\`json.
    
    JSON to translate:
    ${JSON.stringify(json_data, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const translatedJson = JSON.parse(text);
    console.log(translatedJson)
    res.status(200).json(translatedJson);
  } catch (error) {
    console.error("ERROR calling Gemini API:", error);
    res.status(500).json({ error: "Failed to translate using Gemini API." });
  }
};