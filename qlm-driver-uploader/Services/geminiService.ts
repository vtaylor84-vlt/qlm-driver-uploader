// services/geminiService.ts
const GEMINI_PROMPT = `You are an expert logistics coordinator. Based on the following images of freight on a truck, provide a concise, professional description for a Bill of Lading. Mention the type of goods, packaging (e.g., pallets, boxes), and any visible special handling notes. Do not describe the truck itself, only the cargo.`;

export const generateGeminiDescription = async (files: File[]): Promise<string> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response
  const mockDescriptions = [
    "20 wooden pallets of boxed electronics, shrink-wrapped, labeled FRAGILE.",
    "40 cardboard cartons of dry goods on 10 pallets, secured with metal bands.",
    "15 metal drums of industrial chemicals, UN marked, HAZMAT labels visible.",
    "30 shrink-wrapped skids of construction materials, lumber and steel beams.",
  ];
  
  return mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
};