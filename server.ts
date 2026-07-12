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

// User Panel API Endpoints
// Mock data storage (in production, use a database)
const userProfiles: Record<string, any> = {
  "user@omnipulse.com": {
    name: "John Doe",
    email: "user@omnipulse.com",
    phone: "+1 (555) 123-4567",
    company: "TechStart Inc",
    location: "San Francisco, CA",
    timezone: "PST",
    website: "www.techstart.com",
  },
};

const userCampaigns: Record<string, any[]> = {
  "user@omnipulse.com": [
    {
      id: "1",
      name: "Summer Sale 2026",
      status: "active",
      startDate: "2026-06-15",
      messagesSent: 5420,
      engagement: 34.2,
      revenue: 12450,
    },
    {
      id: "2",
      name: "Product Launch",
      status: "completed",
      startDate: "2026-05-10",
      messagesSent: 8932,
      engagement: 42.5,
      revenue: 28900,
    },
    {
      id: "3",
      name: "Flash Deal",
      status: "paused",
      startDate: "2026-07-01",
      messagesSent: 3210,
      engagement: 28.8,
      revenue: 6750,
    },
  ],
};

const userTickets: Record<string, any[]> = {
  "user@omnipulse.com": [
    {
      id: "TK001",
      title: "Integration Issue with Shopify",
      status: "open",
      priority: "high",
      createdDate: "2026-07-11",
      response: "Still waiting for support team",
    },
    {
      id: "TK002",
      title: "API Rate Limit Questions",
      status: "pending",
      priority: "medium",
      createdDate: "2026-07-09",
      response: "Response pending from technical team",
    },
    {
      id: "TK003",
      title: "Campaign Analytics Report",
      status: "closed",
      priority: "low",
      createdDate: "2026-07-05",
      response: "Resolved - Report sent via email",
    },
  ],
};

// Get user profile
app.get("/api/user/profile/:email", (req, res) => {
  const { email } = req.params;
  const profile = userProfiles[email];
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: "User profile not found" });
  }
});

// Update user profile
app.put("/api/user/profile/:email", (req, res) => {
  const { email } = req.params;
  if (userProfiles[email]) {
    userProfiles[email] = { ...userProfiles[email], ...req.body };
    res.json(userProfiles[email]);
  } else {
    res.status(404).json({ error: "User profile not found" });
  }
});

// Get user campaigns
app.get("/api/user/campaigns/:email", (req, res) => {
  const { email } = req.params;
  const campaigns = userCampaigns[email] || [];
  res.json(campaigns);
});

// Create new campaign
app.post("/api/user/campaigns/:email", (req, res) => {
  const { email } = req.params;
  const newCampaign = {
    id: Date.now().toString(),
    status: "active",
    startDate: new Date().toISOString().split("T")[0],
    messagesSent: 0,
    engagement: 0,
    revenue: 0,
    ...req.body,
  };
  if (!userCampaigns[email]) {
    userCampaigns[email] = [];
  }
  userCampaigns[email].push(newCampaign);
  res.status(201).json(newCampaign);
});

// Get user support tickets
app.get("/api/user/tickets/:email", (req, res) => {
  const { email } = req.params;
  const tickets = userTickets[email] || [];
  res.json(tickets);
});

// Create new support ticket
app.post("/api/user/tickets/:email", (req, res) => {
  const { email } = req.params;
  const newTicket = {
    id: `TK${Date.now().toString().slice(-6)}`,
    status: "open",
    priority: req.body.priority || "medium",
    createdDate: new Date().toISOString().split("T")[0],
    response: "Ticket received - will be reviewed by support team",
    ...req.body,
  };
  if (!userTickets[email]) {
    userTickets[email] = [];
  }
  userTickets[email].push(newTicket);
  res.status(201).json(newTicket);
});

// Get user analytics
app.get("/api/user/analytics/:email", (req, res) => {
  const { email } = req.params;
  const campaigns = userCampaigns[email] || [];
  
  const totalMessages = campaigns.reduce((sum, c) => sum + c.messagesSent, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const avgEngagement = campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + c.engagement, 0) / campaigns.length).toFixed(1)
    : 0;
  
  const tickets = userTickets[email] || [];
  const openTickets = tickets.filter(t => t.status === "open").length;

  res.json({
    totalCampaigns: campaigns.length,
    totalMessages,
    totalRevenue,
    engagementRate: avgEngagement,
    openTickets,
    avgResponseTime: "2-3 hours",
  });
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
