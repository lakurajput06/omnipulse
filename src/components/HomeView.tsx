import { Tab } from "../types";
import { motion } from "motion/react";

interface HomeViewProps {
  onStartTrial: () => void;
  onWatchTour: () => void;
  setActiveTab: (tab: Tab) => void;
}

export default function HomeView({ onStartTrial, onWatchTour, setActiveTab }: HomeViewProps) {
  // Trust logos with clean SVG paths instead of empty placeholders
  const trustLogos = [
    { name: "FINTECH", icon: "💳" },
    { name: "RETAIL", icon: "🛒" },
    { name: "HEALTHCARE", icon: "🏥" },
    { name: "SAAS", icon: "🚀" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 bg-gradient-to-b from-blue-50/40 via-white to-transparent overflow-hidden">
        {/* Ambient Glowing Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-green-50/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* V3.0 AI Engine Live Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/80 border border-blue-100 rounded-full mb-6 shadow-xs cursor-pointer hover:bg-blue-100/80 transition-colors"
            onClick={() => setActiveTab(Tab.AIBot)}
            id="v3-live-indicator"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-sans font-semibold text-xs text-blue-800 tracking-wide uppercase">
              ⚡ V3.0 AI Engine Live
            </span>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-tight max-w-4xl"
          >
            The All-in-One <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Growth & Support</span> Engine for WhatsApp.
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-gray-600 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed"
          >
            Deliver high-impact broadcasting, advanced support ticketing, and state-of-the-art AI chatbots in a single, unified enterprise marketing suite.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-10"
          >
            <button 
              onClick={onStartTrial}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-98 transition-all hover:shadow-xl hover:shadow-blue-500/30 text-base"
              id="hero-start-trial-btn"
            >
              Start Your Free Trial
            </button>
            <button 
              onClick={onWatchTour}
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-xl border border-gray-200 shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2 text-base"
              id="hero-watch-tour-btn"
            >
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Product Tour
            </button>
          </motion.div>

          {/* Hero Mockup Visual / Interactive Simulation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
            className="w-full max-w-4xl mt-16 relative"
          >
            <div className="bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-gray-100 overflow-hidden group">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                <img 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLuzO1IANrYNIcS5_QGAoXRZGccVWBbxnPwLvmnZVjJ7yoVZH5u2Syvh3W-N1a85i5_b_QxOwa4gKUWSeqXjqiLZemck-dt-wJS6EeB-7FDgsthEBNUqVNKUrjvaUVLLHMPTe8sZKEuluuI-m2VtxkpnvJiF3uBjHfYMdgoMadIJHY1EvpUnWVw73BdgZjcTZLcE48tVIzHSemlaOi6tE8AXj8mhtsByyH1KQdjFO9_VwpTluYDJ6cd4C5U" 
                  alt="OmniPulse WhatsApp Chatbot Simulation"
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual hotspot overlay to make the mockup feel interactive and ALIVE */}
                <div className="absolute inset-0 bg-blue-500/0 hover:bg-blue-500/5 transition-colors flex items-center justify-center group/play cursor-pointer" onClick={() => setActiveTab(Tab.AIBot)}>
                  <div className="p-4 bg-white/90 backdrop-blur-md rounded-full shadow-lg group-hover/play:scale-110 transition-transform flex items-center justify-center border border-blue-100 text-blue-600">
                    <span className="font-semibold text-sm px-2">Launch Interactive Live Chat Engine ➔</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Float Metric Card - ROI pop-up */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-6 -right-2 md:right-8 bg-zinc-900 text-white p-5 rounded-2xl shadow-xl border border-zinc-800 text-left max-w-[210px]"
              id="hero-roi-badge"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1 bg-green-500/20 rounded-md text-green-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="font-sans font-bold text-[11px] text-zinc-400 tracking-wider uppercase">
                  ROI GROWTH
                </span>
              </div>
              <div className="font-display font-extrabold text-3xl text-white">
                +124%
              </div>
              <div className="text-zinc-400 text-xs mt-1">
                Conversions this month
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals / Logo Wall */}
      <section className="py-12 bg-gray-50/50 border-y border-gray-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-sans font-bold text-xs text-gray-500 uppercase tracking-widest mb-8">
            TRUSTED BY 5,000+ ENTERPRISES ACROSS KEY INDUSTRIES
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
            {trustLogos.map((logo, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl hover:shadow-xs transition-shadow"
              >
                <span className="text-lg">{logo.icon}</span>
                <span className="font-display font-extrabold text-sm text-gray-700 tracking-wider">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OmniPulse - Bento Value Propositions */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
            Why OmniPulse?
          </h2>
          <p className="font-sans text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Stop juggling three separate platforms for broadcast marketing, helpdesk ticketing, and automated customer bots. Get everything under one high-performance roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bento Card 1: Marketing Automation */}
          <div 
            onClick={() => setActiveTab(Tab.ROI)}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                Marketing Automation
              </h3>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">
                Bulk broadcast campaigns, dynamic segment builders, and automated smart drip sequences that trigger and convert leads while you sleep.
              </p>
            </div>
            <div className="mt-8 text-blue-600 font-semibold text-xs tracking-wide uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Explore Broadcast Module ➔
            </div>
          </div>

          {/* Bento Card 2: Deep ROI Tracking */}
          <div 
            onClick={() => setActiveTab(Tab.ROI)}
            className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-lg text-white flex flex-col justify-between cursor-pointer group hover:border-zinc-700 transition-all duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Deep ROI Tracking
              </h3>
              <p className="font-sans text-zinc-400 text-sm leading-relaxed">
                Real-time conversion attribution. Know precisely which specific WhatsApp template or sequence message drove the sale with clinical, transactional accuracy.
              </p>
            </div>
            <div className="mt-8 text-green-400 font-semibold text-xs tracking-wide uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Launch ROI Calculator ➔
            </div>
          </div>

          {/* Bento Card 3: GPT-Powered Support */}
          <div 
            onClick={() => setActiveTab(Tab.AIBot)}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                GPT-Powered Support
              </h3>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">
                Deflect 80% of support volume with multi-lingual AI agents that master context, tone of voice, order queries, and FAQs across 40+ languages.
              </p>
            </div>
            <div className="mt-8 text-green-600 font-semibold text-xs tracking-wide uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Test Support Agent ➔
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 px-4 md:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="border-l-4 border-blue-600 pl-5 mb-16 text-left">
            <h2 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
              Feature Highlights
            </h2>
            <p className="font-sans font-bold text-xs text-blue-600 uppercase tracking-widest mt-1">
              Engineered for Hyper-Growth & Multi-Agent Harmony
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Feature 1: Unified Inbox */}
            <div className="flex flex-col justify-center">
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                Unified Shared Inbox
              </h3>
              <p className="font-sans text-gray-600 text-base leading-relaxed">
                Give your support team a superpower. A single, blazing-fast dashboard for all agents. Collaborate, assign tickets, tag customers, set notes, and view full CRM profiles side-by-side with chats.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xl">📥</span>
                  <div className="font-display font-bold text-gray-800 text-sm mt-2">Omnichannel Routing</div>
                  <p className="text-xs text-gray-500 mt-1">Intelligent round-robin ticket delegation.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-xl">🏷️</span>
                  <div className="font-display font-bold text-gray-800 text-sm mt-2">Tagging & Segments</div>
                  <p className="text-xs text-gray-500 mt-1">Categorize user intent in real-time.</p>
                </div>
              </div>
            </div>

            {/* Feature Inbox Illustration */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-xs relative group overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida/AP1WRLtTCK5nu_gz7ttTdAM0HJGh7GHjqWvztiSZwOUgJdl6GKZeYhy0IrQum-6GJU7QvoWFPrNueR1qZIOoGFiXgzmlNT4-wEaUSgnqRr68d_bpvDoBKJj9pGu1SrGTqxPu1lsvSPOAphHxfJOw7DgBx0BUraGhOpFks_BDqXSQKh3iVRkoG6T9W4icQPVFZ7ujPmA2hAbwlAbyym16sk5VW8Pfl_PRXMuN4GZagqdDDa78LOFM4frkdJYzRQo" 
                alt="OmniPulse Shared Inbox Interface"
                className="w-full h-auto rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-600/0 hover:bg-blue-600/5 transition-all flex items-center justify-center cursor-pointer" onClick={() => setActiveTab(Tab.Menu)}>
                <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-sm border border-gray-100 text-xs font-semibold text-gray-800">
                  Simulate Inbox ➔
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">
            {/* Feature 2 Stat Blocks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center flex flex-col justify-center">
                <span className="font-display font-extrabold text-4xl text-green-700">
                  99.9%
                </span>
                <span className="font-sans font-bold text-xs text-green-800 mt-2 tracking-wider uppercase">
                  API Uptime
                </span>
                <p className="text-xs text-green-600 mt-2">Robust cloud architecture that never drops.</p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 text-center flex flex-col justify-center">
                <span className="font-display font-extrabold text-4xl text-blue-700">
                  24/7
                </span>
                <span className="font-sans font-bold text-xs text-blue-800 mt-2 tracking-wider uppercase">
                  AI Support
                </span>
                <p className="text-xs text-blue-600 mt-2">Instant automated response to keep users happy.</p>
              </div>
            </div>

            {/* Feature 2 Description */}
            <div className="flex flex-col justify-center">
              <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
                Enterprise Reliability Built-In
              </h3>
              <p className="font-sans text-gray-600 text-base leading-relaxed">
                OmniPulse is built directly on top of the official <span className="font-semibold text-gray-800">WhatsApp Cloud API</span>. This ensures maximum throughput speed, rapid template approval rates, and zero risk of spam-related account ban triggers.
              </p>
              
              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500">✓</span> Official Meta Business Provider Integration
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500">✓</span> Highly Encrypted & Secure Database Storage
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500">✓</span> Real-Time Latency Optimization for massive broadcasts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dotted CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-600/15">
          {/* Abstract pattern bg */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
          
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 relative z-10 text-white">
            Ready to scale your business?
          </h2>
          <p className="font-sans text-blue-100 text-base md:text-lg mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Join thousands of high-performance growth teams who rely on OmniPulse to drive up to 3x more transactional revenue directly from WhatsApp conversations.
          </p>
          <div className="flex flex-col items-center gap-4 relative z-10">
            <button 
              onClick={onStartTrial}
              className="bg-white hover:bg-gray-50 text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-98 text-base"
              id="cta-demo-btn"
            >
              Start Your Free Demo
            </button>
            <p className="font-sans text-xs text-blue-200 italic">
              No credit card required • 14-day full platform trial
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
