import React, { useState } from "react";
import { Tab } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ROIView from "./components/ROIView";
import AIBotView from "./components/AIBotView";
import MenuView from "./components/MenuView";
import { Home, TrendingUp, Bot, Settings, X, Shield, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Demo scheduler modal states
  const [demoName, setDemoName] = useState("");
  const [demoEmail, setDemoEmail] = useState("");
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  const handleStartTrial = () => {
    setActiveTab(Tab.Menu);
    // Scroll down to the contact form smoothly
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 150);
  };

  const handleWatchTour = () => {
    setIsTourOpen(true);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoName || !demoEmail) return;
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setIsDemoOpen(false);
      setDemoName("");
      setDemoEmail("");
      setActiveTab(Tab.Menu);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans selection:bg-blue-100 selection:text-blue-800">
      
      {/* Universal Top Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenDemo={() => setIsDemoOpen(true)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 pb-24 md:pb-12" id="main-content-layout">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {activeTab === Tab.Home && (
              <HomeView 
                onStartTrial={handleStartTrial} 
                onWatchTour={handleWatchTour} 
                setActiveTab={setActiveTab} 
              />
            )}
            {activeTab === Tab.ROI && <ROIView />}
            {activeTab === Tab.AIBot && <AIBotView />}
            {activeTab === Tab.Menu && <MenuView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Floating Mobile Bottom Navigation Bar (Matching layout exactly) */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center py-2 z-40 md:hidden shadow-lg shadow-gray-200/50"
        id="mobile-navigation-bar"
      >
        <button
          onClick={() => setActiveTab(Tab.Home)}
          className={`flex flex-col items-center gap-1 font-medium transition-all cursor-pointer ${
            activeTab === Tab.Home ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
          id="mobile-nav-home"
        >
          <Home className={`w-5 h-5 ${activeTab === Tab.Home ? "fill-blue-50" : ""}`} />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveTab(Tab.ROI)}
          className={`flex flex-col items-center gap-1 font-medium transition-all cursor-pointer ${
            activeTab === Tab.ROI ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
          id="mobile-nav-roi"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px]">ROI</span>
        </button>

        <button
          onClick={() => setActiveTab(Tab.AIBot)}
          className={`flex flex-col items-center gap-1 font-medium transition-all cursor-pointer ${
            activeTab === Tab.AIBot ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
          id="mobile-nav-aibot"
        >
          <Bot className={`w-5 h-5 ${activeTab === Tab.AIBot ? "fill-blue-50" : ""}`} />
          <span className="text-[10px]">AI Bot</span>
        </button>

        <button
          onClick={() => setActiveTab(Tab.Menu)}
          className={`flex flex-col items-center gap-1 font-medium transition-all cursor-pointer ${
            activeTab === Tab.Menu ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
          }`}
          id="mobile-nav-menu"
        >
          <Settings className="w-5 h-5" />
          <span className="text-[10px]">Workspace</span>
        </button>
      </nav>

      {/* TOUR WALKTHROUGH DIALOG / MODAL */}
      <AnimatePresence>
        {isTourOpen && (
          <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-lg w-full p-6 relative overflow-hidden"
              id="tour-modal-container"
            >
              <button 
                onClick={() => setIsTourOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4">
                <span className="text-2xl">🍿</span>
                <h3 className="font-display font-bold text-xl text-gray-900">OmniPulse Video Tour</h3>
                <p className="font-sans text-gray-500 text-xs">
                  See how OmniPulse unifies your marketing, support, and automation in under 3 minutes.
                </p>

                {/* Simulated Tour Video Stage */}
                <div className="aspect-[16/9] bg-zinc-900 rounded-xl flex flex-col justify-between p-4 text-left text-white border border-zinc-800 relative group overflow-hidden">
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-600 px-2 py-0.5 rounded-xs">
                      Simulated Demonstration
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">02:45</span>
                  </div>

                  <div className="m-auto flex flex-col items-center gap-2 z-10 cursor-pointer">
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 fill-blue-600 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold">Play Walkthrough Scene</span>
                  </div>

                  <div className="space-y-1 z-10">
                    <span className="text-[11px] font-semibold text-zinc-300 block">Deploying Automated WhatsApp Workflows</span>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2 bg-gray-50 rounded-lg text-left">
                    <span className="text-xs font-bold text-gray-800 block">1. Broadcast</span>
                    <span className="text-[10px] text-gray-500">Send templates safely.</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg text-left">
                    <span className="text-xs font-bold text-gray-800 block">2. AI Automate</span>
                    <span className="text-[10px] text-gray-500">Deflect 80% FAQs.</span>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg text-left">
                    <span className="text-xs font-bold text-gray-800 block">3. Attribute ROI</span>
                    <span className="text-[10px] text-gray-500">Track transactional conversions.</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsTourOpen(false);
                    setActiveTab(Tab.ROI);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors"
                >
                  Configure Custom Workflows ➔
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GET A DEMO POPUP MODAL */}
      <AnimatePresence>
        {isDemoOpen && (
          <div className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-sm w-full p-6 relative"
              id="demo-modal-container"
            >
              <button 
                onClick={() => setIsDemoOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4">
                <span className="text-2xl">📅</span>
                <h3 className="font-display font-bold text-lg text-gray-900">Get a Demo Today</h3>
                <p className="font-sans text-gray-500 text-xs">
                  We will show you exactly how to scale your WhatsApp marketing and support.
                </p>

                <AnimatePresence mode="wait">
                  {!demoSubmitted ? (
                    <motion.form 
                      key="demo-form"
                      onSubmit={handleDemoSubmit}
                      className="space-y-3 text-left"
                    >
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                        <input 
                          type="text" 
                          required
                          value={demoName}
                          onChange={(e) => setDemoName(e.target.value)}
                          placeholder="Your Name" 
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                        <input 
                          type="email" 
                          required
                          value={demoEmail}
                          onChange={(e) => setDemoEmail(e.target.value)}
                          placeholder="yourname@company.com" 
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-colors active:scale-98"
                      >
                        Register for Instant Booking
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="demo-success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-6 space-y-3"
                    >
                      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl mx-auto shadow-sm">
                        ✓
                      </div>
                      <h4 className="font-display font-bold text-sm text-green-800">Booking Pipeline Active!</h4>
                      <p className="text-xs text-green-700">
                        Redirecting to complete custom schedule workspace...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
