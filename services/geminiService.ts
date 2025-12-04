import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const GeminiService = {
  generateQuestionsByTopic: async (topic: string, count: number = 3): Promise<Omit<Question, 'id' | 'createdAt'>[]> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Tạo ${count} câu hỏi trắc nghiệm về chủ đề "${topic}" bằng tiếng Việt. Mỗi câu hỏi có 4 lựa chọn.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "Nội dung câu hỏi" },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Danh sách 4 đáp án lựa chọn"
                },
                correctIndex: { type: Type.INTEGER, description: "Chỉ số của đáp án đúng (0-3)" },
                topic: { type: Type.STRING, description: "Chủ đề của câu hỏi" }
              },
              required: ["text", "options", "correctIndex", "topic"]
            }
          }
        }
      });

      if (response.text) {
        return JSON.parse(response.text);
      }
      return [];
    } catch (error) {
      console.error("Gemini Generation Error:", error);
      throw error;
    }
  }
};