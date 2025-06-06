import { Types } from "mongoose";
import { CohereClientV2 } from "cohere-ai";
import { config } from "../config/config";
import { PlantCare } from "../schema/PlantCare";

const cohere = new CohereClientV2({
  token: config.COHERE_API_KEY,
});
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDPBENRZcOm4Yrt-EpS7Gnomg7Aw5wCj7Q");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
interface CohereResponse {
  message?: {
    content?: string;
  };
}

const timeout = (ms: number) => new Promise<Error>((_, reject) => setTimeout(() => reject(new Error('Timeout exceeded')), ms));

export const getScheduleByAgeAndPlantName = async (
  userId: Types.ObjectId,
  plantId: string,
  age: number,
  plantName: string
) => {
  try {
    const today = new Date(); // Get the current date

    // Function to format date as YYYY-MM-DD in Sri Lanka timezone
    const formatDateSriLanka = (date: Date) => {
      // Convert to Sri Lanka timezone (UTC+5:30)
      const options = { timeZone: 'Asia/Colombo' };
      const sriLankaDate = new Date(date.toLocaleString('en-US', options));

      // Format as YYYY-MM-DD
      const year = sriLankaDate.getFullYear();
      const month = String(sriLankaDate.getMonth() + 1).padStart(2, '0');
      const day = String(sriLankaDate.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    // Generate future dates for the schedule in Sri Lanka timezone
    const futureDates = [
      formatDateSriLanka(today),
      formatDateSriLanka(new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)),  // +3 days
      formatDateSriLanka(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)),  // +7 days
      formatDateSriLanka(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)), // +14 days
      formatDateSriLanka(new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000)), // +21 days
      formatDateSriLanka(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)), // +30 days
    ];

    // Construct the prompt dynamically
    const prompt = `You are a professional botanist and plant care expert. Generate a detailed indoor plant care schedule for a plant named "${plantName}", which is "${age}" months/years old. The schedule should be structured in a JSON format and include:
    - Watering details (amount in milliliters or liters & frequency).
    - Fertilization (must include exactly **one** specific type per week, with a precise amount in **ml or grams**).
    - Pruning & maintenance tasks.
    - Condition checks (e.g., pests, soil moisture).

    The schedule should be an array of objects, following this format:
    {
      "careSchedule": [
        {
          "date": "",
          "watering": {
            "amount": "Specify in ml or liters (e.g., '500ml')",
            "schedule": "Define the frequency (e.g., 'Every 3 days')"
          },
          "fertilization": {
            "type": "Specify one fertilizer type per week (e.g., 'Liquid seaweed fertilizer', 'Slow-release organic granules')",
            "amount": "Provide a precise amount (e.g., '5ml diluted in 1L water', '10g spread on soil')",
          },
          "pruning_maintenance": "Clearly state maintenance tasks (e.g., 'Trim dead leaves', 'Check for root rot')",
          "condition_check": "Detail what to inspect (e.g., 'Check soil moisture with a finger test', 'Look under leaves for pests')"
        }
      ]
    }
    The schedule should cover the following dates: ${futureDates.join(", ")}.
    
    **Rules:**
    1. Fertilization **must** be included once per week with an exact type and amount.
    2. No placeholder values like 'none' or 'n/a'.
    3. If no fertilization is needed for a given week, state: "Not required this week because [reason]".
    
    Ensure the response is valid JSON without additional explanations.`;

    console.log("Requesting schedule generation from AI...");
    const result = await model.generateContent(prompt);
    const jsonString = result.response.text();
    const responseString = jsonString.replace(/^```json\n/, "").replace(/```$/, "");
    const jsonData = JSON.parse(responseString);
    const newPlantCare = new PlantCare({
      userId: userId,
      plantId: new Types.ObjectId(plantId),
      age: age,
      schedule: jsonData.careSchedule,
    });

    await newPlantCare.save();
    return { schedule: newPlantCare };
  } catch (error) {
    console.error("Error generating plant care schedule:", error);
    throw new Error("Failed to generate plant care schedule.");
  }
};

export const getTreatmentDao = async (name: string) => {
  try {
    const prompt = `
    Generate a comprehensive plant disease treatment guide for ${name} in JSON format with these keys:
    treatment_plan: {
      "description": "Brief overview of the disease",
      "symptoms": ["list", "of", "symptoms"],
      "organic_treatments": ["list", "of", "organic", "remedies"],
      "chemical_treatments": ["list", "of", "chemical", "treatments"],
      "prevention": ["prevention", "tips"],
      "recovery_time": "Estimated recovery time",
      "videos": ["youtube_video_id1", "youtube_video_id2"],
      "images": ["image_url1", "image_url2"]
    }
    Provide real YouTube video IDs and image URLs when possible. please ensure the response is valid JSON without additional explanations. and should be the 1 treatment plan for the disease. and use this format only `;

    const result = await model.generateContent(prompt);
    const jsonString = result.response.text();
    const responseString = jsonString.replace(/^```json\n/, "").replace(/```$/, "");
    const jsonData = JSON.parse(responseString);

    return { treatment: jsonData.treatment_plan };
  } catch (error) {
    console.error("Error generating treatment plan:", error);
    throw new Error("Failed to generate treatment plan.");
  }
};

