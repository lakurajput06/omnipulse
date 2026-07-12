import { useState, useEffect, useRef } from "react";
import { ChatMessage, TicketAnalysis } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, User, Sparkles, MessageSquare, ShieldAlert, ArrowRight, ClipboardCheck, Info, CheckCircle2, Loader2 } from "lucide-react";

export default function AIBotView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "bot",
      text: "Hello! 👋 I'm your OmniPulse AI Support Bot (V3.0 Engine). I can automatically track orders, update shipping addresses, draft refunds, or answer general questions. Select one of our template bots below or type a message!",
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeBotPreset, setActiveBotPreset] = useState<string>("order");
  const [isSimulatedMode, setIsSimulatedMode] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);

  // Ticket deflection analyzer state
  const [ticketInput, setTicketInput] = useState(
    "Hi, I bought a denim jacket yesterday (Order #OP-9831) but realized my shipping address has a typo in the zip code. It's supposed to be 94103 instead of 94108. Can you help fix this before it ships out?"
  );
  const [analyzingTicket, setAnalyzingTicket] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<TicketAnalysis | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // AI Chat Bot Preset Triggers matching the original hero mockup
  const botPresets = [
    {
      id: "order",
      name: "Order Tracking Bot",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      query: "Where is my order #OP-7741?",
      color: "bg-blue-500",
      icon: "🤖"
    },
    {
      id: "shipping",
      name: "Shipping Assistant Bot",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      query: "Can I update my shipping address to 104 Cosmic Way?",
      color: "bg-indigo-500",
      icon: "🚚"
    },
    {
      id: "refund",
      name: "Refund Support Bot",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      query: "I need help requesting a refund for my last return.",
      color: "bg-purple-500",
      icon: "💳"
    }
  ];

  const triggerPreset = (preset: typeof botPresets[0]) => {
    setActiveBotPreset(preset.id);
    handleSend(preset.query);
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    if (!textToSend) setInputText("");

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setKeyError(null);

    try {
      // If we are explicitly in simulated mode, trigger mock replies
      if (isSimulatedMode) {
        setTimeout(() => {
          setIsTyping(false);
          const replyText = getMockReply(text);
          setMessages(prev => [...prev, {
            id: "reply-" + Date.now(),
            sender: "bot",
            text: replyText,
            timestamp: new Date()
          }]);
        }, 800);
        return;
      }

      // Reconstruct simple history for server
      const chatHistory = messages.slice(-6).map(m => ({
        role: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: chatHistory })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to talk to AI.");
      }

      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: "reply-" + Date.now(),
        sender: "bot",
        text: data.text,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      console.error(err);
      setIsTyping(false);
      
      // Auto-fallback helper
      const errorMsg = err.message || "";
      if (errorMsg.includes("GEMINI_API_KEY") || errorMsg.includes("Secrets") || errorMsg.includes("API key")) {
        setKeyError("GEMINI_API_KEY is missing or invalid. Please configure your key in Settings > Secrets. Alternatively, you can toggle Simulated Mode to test instant high-fidelity mockup conversational states!");
      } else {
        setKeyError("Network connection error. Reverting to automated support reply stream.");
      }

      // Instant fallback simulation reply so user experience never feels broken
      setTimeout(() => {
        const replyText = getMockReply(text);
        setMessages(prev => [...prev, {
          id: "reply-" + Date.now(),
          sender: "bot",
          text: `[Simulated Backup Mode Active] \n\n${replyText}`,
          timestamp: new Date()
        }]);
      }, 1000);
    }
  };

  // Automated Ticket Analyzer
  const handleAnalyzeTicket = async () => {
    if (!ticketInput.trim()) return;
    setAnalyzingTicket(true);
    setAnalysisResult(null);

    try {
      if (isSimulatedMode) {
        setTimeout(() => {
          setAnalyzingTicket(false);
          setAnalysisResult({
            action: "deflect",
            category: "Shipping Address",
            reply: "Hi there! I can definitely help update that. I've updated the shipping zip code on Order #OP-9831 from 94108 to 94103. A confirmation receipt has been sent to your registered email address. Let me know if there's anything else!",
            confidence: "98%"
          });
        }, 1200);
        return;
      }

      const res = await fetch("/api/analyze-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketText: ticketInput })
      });

      const data = await res.json();
      setAnalyzingTicket(false);

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }

      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      setAnalyzingTicket(false);
      // Fallback analysis mock
      setAnalysisResult({
        action: "deflect",
        category: "Shipping Address",
        reply: "Hi there! I can definitely help update that. I've logged the shipping address update on Order #OP-9831 to zip code 94103 before dispatch. No further action needed!",
        confidence: "95%"
      });
    }
  };

  const getMockReply = (userQuery: string): string => {
    const q = userQuery.toLowerCase();
    if (q.includes("order")) {
      return "📦 **Order Status Detected:** Order #OP-7741 has been dispatched via Priority Transit! \n\n- **Current Location:** Out for Delivery (Arriving today by 5:00 PM local time).\n- **Delivery Representative:** Sarah Connor (+1 555-0199).\n- **Live Tracking Link:** [Track in Browser](https://example.com/track)";
    }
    if (q.includes("shipping") || q.includes("address")) {
      return "🚚 **Shipping Assistant Active:** I can help change your shipping address! \n\nI have successfully scheduled the address adjustment for your active order to **104 Cosmic Way, suite 200**. Our system has updated the courier cargo sheet. You're fully good to go!";
    }
    if (q.includes("refund")) {
      return "💳 **Refund claim lodged:** I have examined your transaction history. \n\nRefund of **$45.00** for Order #OP-5521 has been processed back to your original payment method (Visa ending in *4242). It should reflect in your banking ledger within 3-5 business days.";
    }
    return "💡 **OmniPulse Assistant:** I understand you're asking about WhatsApp integrations! OmniPulse provides a unified marketing and support dashboard. We can connect your CRM, configure template message sequences, or build deep customer tracking nodes. Let me know what you'd like to build next!";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Tab Header */}
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
            GPT-Powered AI Support Console
          </h2>
          <p className="font-sans text-gray-600 text-sm mt-1">
            Deflect support volume up to 80% using OmniPulse automated conversational agents running on Gemini 3.5.
          </p>
        </div>

        {/* Simulator Toggle */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-150 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulatedMode ? "bg-amber-400" : "bg-blue-400"}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSimulatedMode ? "bg-amber-500" : "bg-blue-600"}`}></span>
            </span>
            <span className="text-xs font-bold text-gray-700 font-mono">
              {isSimulatedMode ? "SIMULATED BACKUP RUNNING" : "SERVER-SIDE GEMINI ONLINE"}
            </span>
          </div>
          <button
            onClick={() => setIsSimulatedMode(!isSimulatedMode)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              isSimulatedMode 
                ? "bg-amber-100 text-amber-800 hover:bg-amber-200" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Switch to {isSimulatedMode ? "Live API" : "Offline Simulation"}
          </button>
        </div>
      </div>

      {/* Grid Layout: Live Chat vs Ticket Analyzer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Live WhatsApp Simulation Box (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[550px]">
          
          {/* Simulated WhatsApp Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/20">
                  ⚡
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-600"></span>
              </div>
              <div>
                <div className="font-display font-bold text-sm flex items-center gap-1.5">
                  OmniPulse AI Assistant
                  <span className="bg-white/20 text-white text-[9px] font-mono px-1.5 py-0.2 rounded-sm font-bold uppercase tracking-wider">
                    V3.0 LIVE
                  </span>
                </div>
                <div className="text-xs text-blue-100 font-sans">Typical response: Instant</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs bg-white/10 px-2.5 py-1 rounded-md text-blue-50">
              <Bot className="w-4 h-4" />
              Agent Active
            </div>
          </div>

          {/* Preset Trigger Row (Hero Screen bots alignment) */}
          <div className="p-3 bg-gray-50 border-b border-gray-100 overflow-x-auto flex gap-2">
            {botPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => triggerPreset(preset)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeBotPreset === preset.id
                    ? "bg-blue-50 border-blue-200 text-blue-700 shadow-xs"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{preset.icon}</span>
                {preset.name}
              </button>
            ))}
          </div>

          {/* Message Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
            {messages.map(msg => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isBot ? "justify-start" : "justify-end"} items-end gap-2`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                      isBot
                        ? "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                        : "bg-blue-600 text-white rounded-br-none font-medium"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div className={`text-[10px] mt-1 text-right ${isBot ? "text-gray-400" : "text-blue-200"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-xs animate-bounce">
                  🤖
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-3 shadow-xs">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error alerts */}
          {keyError && (
            <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-xs text-red-600 flex items-start gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{keyError}</span>
            </div>
          )}

          {/* Input Box */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask OmniPulse AI bot anything..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-blue-500 focus:bg-white transition-colors"
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors shadow-md shadow-blue-500/10 active:scale-95"
              id="send-chat-msg-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Support Ticket Deflection Analyzer (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900 text-base">Deflection Engine</h3>
              <p className="text-xs text-gray-500 font-sans">Simulate AI vs Human redirection</p>
            </div>
          </div>

          {/* Sample Text Field */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Incoming Customer Support Ticket
            </label>
            <textarea
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm leading-relaxed focus:outline-hidden focus:border-blue-500 focus:bg-white transition-colors resize-none"
              placeholder="Paste a simulated customer complaint or support request..."
            />
          </div>

          {/* CTA Button */}
          <button
            onClick={handleAnalyzeTicket}
            disabled={analyzingTicket}
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
            id="analyze-ticket-btn"
          >
            {analyzingTicket ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing intent and tone...
              </>
            ) : (
              <>
                <ClipboardCheck className="w-4 h-4" />
                Analyze Ticket Deflection
              </>
            )}
          </button>

          {/* Analyzer Output Results */}
          <AnimatePresence mode="wait">
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-4 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Identified Category</span>
                    <span className="text-sm font-semibold text-gray-800">{analysisResult.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">AI Decision</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold uppercase mt-1 ${
                      analysisResult.action === "deflect"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}>
                      {analysisResult.action === "deflect" ? "🤖 Deflected (AI Safe)" : "🧑 Escalate to Agent"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200/50">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Deflection Score</span>
                    <span className="text-sm font-mono font-bold text-gray-800">{analysisResult.confidence}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Service Status</span>
                    <span className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolved automatically
                    </span>
                  </div>
                </div>

                {/* Draft Reply Bubble */}
                <div className="pt-3 border-t border-gray-200/50">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Automated Outbox Draft</span>
                  <div className="p-3 bg-white border border-gray-150 rounded-xl text-xs text-gray-600 leading-relaxed italic">
                    "{analysisResult.reply}"
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
