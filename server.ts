import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured. Please add your API key in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for chatbot simulation
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();
    
    // System instruction to act as OmniPulse's AI Support and Growth Engine
    const systemInstruction = `You are the OmniPulse AI Support Bot (V3.0 AI Engine Live), a professional, friendly, and highly intelligent virtual WhatsApp assistant representing OmniPulse.
OmniPulse is an All-in-One Growth & Support Engine for WhatsApp. It integrates marketing campaigns, unified support ticketing, and intelligent conversational chatbots in a single unified dashboard.

Key Features of OmniPulse you can answer questions about:
1. Marketing Automation: Bulk campaigns, segmented broadcasting, and scheduled broadcast sequences that convert leads.
2. Deep ROI Tracking: Real-time sales attribution, tracking exactly which WhatsApp message drove the sale with clinical precision.
3. GPT-Powered Support: Deflects 80% of support tickets with multi-lingual AI understanding intent, tone, and context across 40+ languages.
4. Official WhatsApp Cloud API integration: Ensures maximum speed, high template approval rate, and zero spam ban risk.
5. Pricing and Demo: Free 14-day trial, no credit card required. Contact team for demo.

Maintain a professional, helpful, tech-savvy, and warm tone. Keep responses conversational, concise, and focused on showcasing how WhatsApp automation can scale business growth and reduce support costs. Use bullet points where appropriate for readability.`;

    // Reconstruct conversation history for Gemini chat format
    const chatHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    // Start chat with history
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const response = await chat.sendMessage({ message });
    const text = response.text;

    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to communicate with OmniPulse AI Engine.",
      isConfigError: error.message?.includes("GEMINI_API_KEY") 
    });
  }
});

// Endpoint to simulate AI support deflection logic
app.post("/api/analyze-ticket", async (req, res) => {
  try {
    const { ticketText } = req.body;
    if (!ticketText) {
      return res.status(400).json({ error: "Ticket text is required." });
    }

    const ai = getGeminiClient();

    const prompt = `Analyze this simulated customer support ticket. Decide whether it can be deflected (resolved automatically) by an AI Bot, or if it requires a human agent escalation. Return a JSON response with the following keys:
- action: either "deflect" or "escalate"
- category: e.g. "Order Status", "Shipping Address", "Refund Claim", "Technical Issue", "General Info"
- reply: A helpful, empathetic, automated draft reply if "deflect", or a reassuring escalation message if "escalate".
- confidence: a percentage (e.g. "95%")

Ticket text: "${ticketText}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            action: { type: "STRING" },
            category: { type: "STRING" },
            reply: { type: "STRING" },
            confidence: { type: "STRING" }
          },
          required: ["action", "category", "reply", "confidence"]
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error.message || "Analysis failed." });
  }
});

// Setup Vite middleware for dynamic asset compilation & HMR-handling or static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode with static build assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OmniPulse Application is active at http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Vite startup failed:", err);
});
