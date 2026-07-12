export enum Tab {
  Home = "home",
  ROI = "roi",
  AIBot = "aibot",
  Menu = "menu",
  AdminLogin = "admin-login",
  UserLogin = "user-login",
  AdminDashboard = "admin-dashboard",
  UserDashboard = "user-dashboard",
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export interface SimulatedCampaign {
  id: string;
  name: string;
  messagesSent: number;
  openRate: number; // percentage
  clickRate: number; // percentage
  conversionRate: number; // percentage
  averageOrderValue: number; // USD
  revenue: number;
  cost: number;
  roi: number; // percentage
  status: "idle" | "sending" | "completed";
  createdAt: Date;
}

export interface TicketAnalysis {
  action: "deflect" | "escalate" | "";
  category: string;
  reply: string;
  confidence: string;
}

export interface DemoBooking {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  useCase: string;
  dateTime: string;
  status: "pending" | "scheduled";
}
