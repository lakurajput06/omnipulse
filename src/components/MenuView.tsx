import React, { useState } from "react";
import { DemoBooking } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Users, Mail, Phone, Calendar, Clock, CheckCircle2, MessageSquare, Shield, Settings, Tag, ArrowRight, Wallet, HelpCircle } from "lucide-react";

export default function MenuView() {
  
  // 1. Multi-Agent Shared Inbox State
  const [selectedTicketId, setSelectedTicketId] = useState<string>("t-1");
  const [agentAssignment, setAgentAssignment] = useState<Record<string, string>>({
    "t-1": "Lakshya (You)",
    "t-2": "David Miller",
    "t-3": "AI Bot V3.0"
  });

  const tickets = [
    {
      id: "t-1",
      customer: "Alex Riviera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      lastMessage: "I need my delivery tracking details, please.",
      status: "Active",
      time: "2m ago",
      tag: "Shipping Query",
      phone: "+1 (555) 014-9981",
      email: "alex.riviera@outlook.com"
    },
    {
      id: "t-2",
      customer: "Sophia Lin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      lastMessage: "My address typo was fixed. Thanks!",
      status: "Closed",
      time: "1h ago",
      tag: "CRM Address Update",
      phone: "+44 7911 123456",
      email: "sophia.lin@gmail.com"
    },
    {
      id: "t-3",
      customer: "Marcus Aurelius",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      lastMessage: "Can we schedule a customized corporate WhatsApp API deployment?",
      status: "Awaiting Reply",
      time: "3h ago",
      tag: "Enterprise Demo Lead",
      phone: "+39 06 6982",
      email: "marcus.aurelius@rome.it"
    }
  ];

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  // 2. Pricing Calculator State
  const [monthlyMessages, setMonthlyMessages] = useState<number>(20000);
  
  // Cost estimates for a disconnected, multiple-service stack
  // Broadcasting service = $29/mo base + conversation fees
  // Helpdesk ticketing service = $49/mo base + fees
  // Chatbot builder service = $39/mo base
  // Total standalone stack = $117/mo + high integration labor
  const competitorBasePrice = 117;
  const omniPulseBasePrice = 49;
  
  const conversationFeeRate = 0.005; // $0.005 per conversion msg
  const omniSavings = competitorBasePrice - omniPulseBasePrice + (monthlyMessages * 0.0015);

  // 3. Demo Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    useCase: "support_deflection",
    dateTime: ""
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.dateTime) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-16">
      
      {/* SECTION 1: Unified Multi-Agent Shared Inbox Simulation */}
      <div>
        <div className="mb-8">
          <h2 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
            Unified Shared Inbox Workspace
          </h2>
          <p className="font-sans text-gray-600 text-sm mt-1">
            Collaborate as a support squad, delegate tickets, add labels, and track customers on WhatsApp live.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[500px]">
          
          {/* Ticket List Panel (md:col-span-4) */}
          <div className="md:col-span-4 border-r border-gray-100 flex flex-col h-full bg-gray-50/30">
            <div className="p-4 border-b border-gray-100 bg-white">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Live Threads Inbox</span>
              <div className="flex gap-1.5">
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold">All Inbox (3)</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">Assigned (1)</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {tickets.map(ticket => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-4 flex gap-3 cursor-pointer transition-colors ${
                    selectedTicketId === ticket.id ? "bg-blue-50/50 border-l-4 border-blue-600" : "hover:bg-gray-50"
                  }`}
                >
                  <img src={ticket.avatar} alt={ticket.customer} className="w-10 h-10 rounded-full object-cover shrink-0 border border-gray-200" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-xs text-gray-900 truncate">{ticket.customer}</span>
                      <span className="text-[10px] text-gray-400 shrink-0">{ticket.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{ticket.lastMessage}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-sm text-[9px] font-mono font-bold ${
                        ticket.status === "Active" ? "bg-green-100 text-green-800" :
                        ticket.status === "Closed" ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-800"
                      }`}>{ticket.status}</span>
                      <span className="text-[9px] text-gray-400 bg-white border border-gray-100 px-1.5 py-0.5 rounded-xs truncate">
                        {ticket.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat / Content Panel (md:col-span-5) */}
          <div className="md:col-span-5 flex flex-col h-full bg-white">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
              <div className="flex items-center gap-3">
                <img src={selectedTicket.avatar} alt={selectedTicket.customer} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                <div>
                  <span className="font-bold text-xs text-gray-900 block">{selectedTicket.customer}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{selectedTicket.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={agentAssignment[selectedTicket.id] || "Unassigned"}
                  onChange={(e) => setAgentAssignment({ ...agentAssignment, [selectedTicket.id]: e.target.value })}
                  className="bg-white border border-gray-250 text-[10px] font-bold px-2.5 py-1.5 rounded-lg focus:outline-hidden"
                >
                  <option value="Lakshya (You)">Assign: You</option>
                  <option value="David Miller">Assign: David</option>
                  <option value="AI Bot V3.0">Assign: AI Bot</option>
                </select>
              </div>
            </div>

            {/* Simulated Live Thread Message History */}
            <div className="flex-1 p-4 bg-gray-50/20 overflow-y-auto space-y-4 text-xs">
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3.5 rounded-2xl rounded-bl-none max-w-[85%]">
                  "Hey! Can you check the transaction status or details?"
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-br-none max-w-[85%] font-medium">
                  {selectedTicket.lastMessage}
                </div>
              </div>
            </div>

            {/* Shared Inbox Input Bar */}
            <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
              <input
                type="text"
                placeholder={`Reply to ${selectedTicket.customer} on WhatsApp as ${agentAssignment[selectedTicket.id] || "Agent"}...`}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                id="inbox-reply-input"
              />
              <button
                onClick={() => alert(`Simulated response dispatched as ${agentAssignment[selectedTicket.id] || "Agent"}`)}
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-4 py-2 rounded-lg text-xs"
                id="inbox-reply-send-btn"
              >
                Send
              </button>
            </div>
          </div>

          {/* CRM Profile Panel (md:col-span-3) */}
          <div className="md:col-span-3 border-l border-gray-100 bg-gray-50/50 p-4 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block pb-2 border-b border-gray-100">
                Customer CRM Card
              </span>

              <div className="space-y-3">
                <div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Full Contact</span>
                  <span className="text-xs font-semibold text-gray-700">{selectedTicket.customer}</span>
                </div>
                <div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Email Address</span>
                  <span className="text-xs font-medium text-gray-600 break-all">{selectedTicket.email}</span>
                </div>
                <div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">CRM Assigned Node</span>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm inline-block mt-0.5">
                    {selectedTicket.tag}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider block">Platform SLA Tier</span>
                  <span className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-0.5">
                    <Shield className="w-3.5 h-3.5 text-green-500 fill-green-50" /> WhatsApp Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-center">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">OmniPulse Integration</span>
              <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-center gap-1">
                View CRM Timeline ➔
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Pricing Stack Savings Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8 border-t border-gray-100">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
            <Wallet className="w-3.5 h-3.5" />
            Operational Savings Analysis
          </div>
          <h2 className="font-display font-bold text-3xl text-gray-900 tracking-tight leading-tight">
            Stop paying three bills. Pay one fraction.
          </h2>
          <p className="font-sans text-gray-600 text-sm leading-relaxed">
            By unifying broadcasting, customer ticketing, and AI chatbot generation into OmniPulse, you bypass heavy SaaS markup subscription costs and code integrations from disconnected services.
          </p>

          {/* Pricing slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Monthly WhatsApp Broadcast Volume
              </label>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                {monthlyMessages.toLocaleString()} Messages
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="150000"
              step="5000"
              value={monthlyMessages}
              onChange={(e) => setMonthlyMessages(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-100 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>2,000 / mo</span>
              <span>75,000</span>
              <span>150,000 / mo</span>
            </div>
          </div>
        </div>

        {/* Pricing Math Card Layout */}
        <div className="bg-zinc-900 text-white p-6 rounded-2xl border border-zinc-800 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Estimated Stack Cost comparison</span>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <span className="text-xs text-zinc-400 block">Scattered Standalone Stack</span>
                <span className="text-lg font-mono font-bold text-zinc-300 line-through">${(competitorBasePrice + (monthlyMessages * conversationFeeRate)).toFixed(0)} / mo</span>
              </div>
              <div>
                <span className="text-xs text-green-400 block font-semibold">OmniPulse All-in-One</span>
                <span className="text-xl font-mono font-extrabold text-green-400">${(omniPulseBasePrice + (monthlyMessages * (conversationFeeRate * 0.7))).toFixed(0)} / mo</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-green-500/10 p-4 border border-green-500/20 rounded-xl">
            <div>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider block">Your Platform Net Savings</span>
              <span className="text-xl font-display font-extrabold text-white">Save ${(omniSavings + 45).toFixed(0)} / USD yearly</span>
            </div>
            <div className="bg-green-500 text-white p-2.5 rounded-lg font-bold text-sm">
              90% Savings
            </div>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-zinc-400 block">
              Calculations based on 3 active standalone agent seats & conversation throughput.
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: Book a Demo Calendar Form */}
      <div className="pt-8 border-t border-gray-100 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl text-gray-900 tracking-tight">
            Schedule a Custom Consultation
          </h2>
          <p className="font-sans text-gray-500 text-xs mt-1">
            Let our core solutions engineer help architect your WhatsApp growth sequence, CRM mappings, and template validations.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!bookingConfirmed ? (
            <motion.form
              key="booking-form"
              onSubmit={handleBookDemo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4 text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                    placeholder="Lakshya Tankri"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                    placeholder="lakshya.tankri@gmail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={bookingForm.companyName}
                    onChange={(e) => setBookingForm({ ...bookingForm, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                    placeholder="OmniPulse Corp"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.phoneNumber}
                    onChange={(e) => setBookingForm({ ...bookingForm, phoneNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                    placeholder="+91 99999-99999"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Primary Use Case Target
                  </label>
                  <select
                    value={bookingForm.useCase}
                    onChange={(e) => setBookingForm({ ...bookingForm, useCase: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  >
                    <option value="support_deflection">AI Automated Support Deflection</option>
                    <option value="roi_marketing">Broadcasting & CRM ROI Tracking</option>
                    <option value="both_growth_support">Full Hybrid Growth & Support Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Preferred Consultation Date / Time
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={bookingForm.dateTime}
                    onChange={(e) => setBookingForm({ ...bookingForm, dateTime: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 active:scale-98 transition-all mt-4"
                id="submit-demo-booking-btn"
              >
                Schedule Interactive Consultation ➔
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-150 p-8 rounded-2xl shadow-sm text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
                ✓
              </div>
              <h3 className="font-display font-bold text-xl text-green-800">
                Consultation Scheduled!
              </h3>
              <p className="font-sans text-green-700 text-xs leading-relaxed max-w-md mx-auto">
                Thank you, **{bookingForm.name}**. We have registered your reservation for **{new Date(bookingForm.dateTime).toLocaleString()}**. A custom Google Meet link and WhatsApp briefing dossier have been sent to **{bookingForm.email}**.
              </p>
              
              <button
                onClick={() => setBookingConfirmed(false)}
                className="text-xs font-semibold text-green-800 underline hover:text-green-900 block mx-auto pt-2"
                id="reset-booking-form-btn"
              >
                Book another session
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
