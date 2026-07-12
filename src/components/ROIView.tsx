import { useState, useEffect, useRef } from "react";
import { SimulatedCampaign } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Send, TrendingUp, DollarSign, Percent, BarChart3, Activity, Loader2, ArrowRight, Play, CheckCircle2 } from "lucide-react";

export default function ROIView() {
  const [listSize, setListSize] = useState<number>(5000);
  const [conversionRate, setConversionRate] = useState<number>(3.5);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(45);
  const [campaignName, setCampaignName] = useState<string>("Summer Flash Sale");
  
  // Cost per message on WhatsApp Cloud API is roughly $0.008 (depends on conversation type)
  const costPerMessage = 0.008;

  const [activeCampaign, setActiveCampaign] = useState<SimulatedCampaign | null>(null);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [sentCount, setSentCount] = useState<number>(0);
  
  // Historical simulated campaigns for comparative analysis
  const [campaigns, setCampaigns] = useState<SimulatedCampaign[]>([
    {
      id: "hist-1",
      name: "Cart Abandonment Recovery",
      messagesSent: 2800,
      openRate: 94.2,
      clickRate: 31.5,
      conversionRate: 6.8,
      averageOrderValue: 65,
      revenue: 12376,
      cost: 22.4,
      roi: 55150,
      status: "completed",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: "hist-2",
      name: "VIP Early Access Broadcast",
      messagesSent: 4500,
      openRate: 91.8,
      clickRate: 24.2,
      conversionRate: 4.1,
      averageOrderValue: 80,
      revenue: 14760,
      cost: 36.0,
      roi: 40900,
      status: "completed",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    }
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simulationLogs]);

  const handleLaunchCampaign = () => {
    if (activeCampaign && activeCampaign.status === "sending") return;

    const calculatedCost = Number((listSize * costPerMessage).toFixed(2));
    const calculatedRevenue = Number(((listSize * (conversionRate / 100)) * averageOrderValue).toFixed(2));
    const calculatedROI = calculatedCost > 0 ? Number((((calculatedRevenue - calculatedCost) / calculatedCost) * 100).toFixed(0)) : 0;

    const newCampaign: SimulatedCampaign = {
      id: "sim-" + Date.now(),
      name: campaignName || "WhatsApp Drip Broadcast",
      messagesSent: listSize,
      openRate: 93.8, // standard high open rate for WhatsApp
      clickRate: 22.4, // standard click rate
      conversionRate,
      averageOrderValue,
      revenue: calculatedRevenue,
      cost: calculatedCost,
      roi: calculatedROI,
      status: "sending",
      createdAt: new Date()
    };

    setActiveCampaign(newCampaign);
    setSentCount(0);
    setSimulationLogs([
      "🚀 Initializing OmniPulse V3.0 WhatsApp Broadcast Engine...",
      `📦 Segment selected: Target Audience size = ${listSize} users`,
      `📄 Compiling WhatsApp approved template: "${campaignName}"`,
      "🔒 Verification: Official WhatsApp Cloud API tokens verified successfully.",
      "🚦 Throttling set: 100 messages/second (Zero Ban Risk Mode active)"
    ]);

    // Start sending simulation
    let currentSent = 0;
    const intervalTime = 70; // ms
    const incrementStep = Math.max(1, Math.floor(listSize / 50));

    const timer = setInterval(() => {
      currentSent += incrementStep;
      if (currentSent >= listSize) {
        currentSent = listSize;
        clearInterval(timer);
        
        setActiveCampaign(prev => {
          if (!prev) return null;
          const completed: SimulatedCampaign = { ...prev, status: "completed" };
          setCampaigns(hist => [completed, ...hist]);
          return completed;
        });

        setSimulationLogs(prev => [
          ...prev,
          `✨ Sent ${listSize}/${listSize} messages successfully!`,
          "📊 Webhook returned 99.8% delivery rate.",
          "🎯 Attribution Engine: Aggregating click and transactional callbacks...",
          "📈 Double-entry ROI Tracker updated.",
          "✅ Campaign completed successfully!"
        ]);
      } else {
        setSentCount(currentSent);
        // Add random interactive logs
        if (Math.random() > 0.6) {
          const sampleUsers = ["Lakshya", "Emma", "Sarah", "Daniel", "Raj", "Miku", "Kenji", "Sophia"];
          const user = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
          const events = [
            `📡 Broadcast delivered to customer ${user}...`,
            `💬 Interactive button click received from ${user}!`,
            `🛒 Conversion checkout detected: $${averageOrderValue} generated via WhatsApp Link!`,
            `📊 Open tracked for ${user}`
          ];
          const randomEvent = events[Math.floor(Math.random() * events.length)];
          setSimulationLogs(prev => [...prev, `[${currentSent}/${listSize}] ${randomEvent}`]);
        }
      }
    }, intervalTime);
  };

  // Compute aggregated stats
  const totalSent = campaigns.reduce((acc, c) => acc + c.messagesSent, 0) + (activeCampaign && activeCampaign.status === "sending" ? sentCount : 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenue, 0) + (activeCampaign && activeCampaign.status === "completed" ? activeCampaign.revenue : 0);
  const totalCost = campaigns.reduce((acc, c) => acc + c.cost, 0) + (activeCampaign && activeCampaign.status === "completed" ? activeCampaign.cost : 0);
  const averageRoi = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* View Title */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
          WhatsApp ROI Tracker & Campaign Simulator
        </h2>
        <p className="font-sans text-gray-600 text-sm mt-1">
          Simulate broadcast campaigns on top of the official WhatsApp Cloud API, see delivery speeds in real-time, and watch your ROI metrics soar.
        </p>
      </div>

      {/* Main Grid: Control Panel vs Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Setup Form (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900 text-base">Campaign Architect</h3>
              <p className="text-xs text-gray-500 font-sans">Set your marketing broadcast variables</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Campaign Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                WhatsApp Template / Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-colors"
                placeholder="e.g. Black Friday Flash Sale"
                disabled={activeCampaign?.status === "sending"}
              />
            </div>

            {/* List Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Target Audience (List Size)
                </label>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                  {listSize.toLocaleString()} users
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={listSize}
                onChange={(e) => setListSize(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-100 rounded-lg"
                disabled={activeCampaign?.status === "sending"}
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>500</span>
                <span>25,000</span>
                <span>50,000</span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Expected Conversion Rate (%)
                </label>
                <span className="text-xs font-mono font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-sm">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-100 rounded-lg"
                disabled={activeCampaign?.status === "sending"}
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>0.5% (Avg)</span>
                <span>7.5%</span>
                <span>15.0% (Elite)</span>
              </div>
            </div>

            {/* Average Order Value */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Average Order Value (AOV)
                </label>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">
                  ${averageOrderValue} USD
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={averageOrderValue}
                onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-100 rounded-lg"
                disabled={activeCampaign?.status === "sending"}
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                <span>$10</span>
                <span>$130</span>
                <span>$250</span>
              </div>
            </div>
          </div>

          {/* Pricing Estimation Cards */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Estimated WhatsApp Cost</span>
              <span className="text-sm font-mono font-bold text-gray-700">${(listSize * costPerMessage).toFixed(2)}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Projected Revenue</span>
              <span className="text-sm font-mono font-bold text-green-600">${((listSize * (conversionRate / 100)) * averageOrderValue).toFixed(0)}</span>
            </div>
          </div>

          <button
            onClick={handleLaunchCampaign}
            disabled={activeCampaign?.status === "sending"}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
              activeCampaign?.status === "sending"
                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/10 hover:shadow-blue-500/20"
            }`}
            id="launch-campaign-btn"
          >
            {activeCampaign?.status === "sending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Broadcasting in Progress...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                Launch WhatsApp Broadcast
              </>
            )}
          </button>
        </div>

        {/* Right Col: Live Sending Progress & Console (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-lg text-white flex-1 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="font-display font-bold text-sm tracking-wide uppercase text-zinc-100">
                    OmniPulse Broadcast Console
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-mono font-bold rounded-sm">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  V3.0 THREAD ACTIVE
                </div>
              </div>

              {/* Progress Bar for Active Simulation */}
              {activeCampaign && (
                <div className="my-6">
                  <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
                    <span>Campaign: <strong className="text-white">{activeCampaign.name}</strong></span>
                    <span>
                      {activeCampaign.status === "sending"
                        ? `${Math.floor((sentCount / activeCampaign.messagesSent) * 100)}% (${sentCount.toLocaleString()} / ${activeCampaign.messagesSent.toLocaleString()})`
                        : "Completed (100%)"
                      }
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden border border-zinc-700">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full"
                      animate={{ width: activeCampaign.status === "sending" ? `${(sentCount / activeCampaign.messagesSent) * 100}%` : "100%" }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              )}

              {/* Console Logs */}
              <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 h-64 overflow-y-auto font-mono text-xs text-zinc-300 space-y-1.5 flex flex-col">
                {simulationLogs.length === 0 ? (
                  <div className="text-zinc-500 text-center m-auto font-sans text-xs">
                    Console idle. Create a campaign and hit Launch to see real-time WhatsApp Cloud API logs.
                  </div>
                ) : (
                  simulationLogs.map((log, index) => {
                    let textClass = "text-zinc-300";
                    if (log.includes("🚀") || log.includes("✅")) textClass = "text-blue-400 font-bold";
                    if (log.includes("✨") || log.includes("Conversion checkout")) textClass = "text-green-400 font-bold";
                    if (log.includes("Verification:")) textClass = "text-purple-400";
                    return (
                      <div key={index} className={`${textClass} leading-relaxed`}>
                        {log}
                      </div>
                    );
                  })
                )}
                <div ref={logsEndRef} />
              </div>
            </div>

            {/* Simulated Active Output Metric */}
            {activeCampaign && activeCampaign.status === "completed" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <div>
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider block">Estimated Performance</span>
                    <span className="text-sm font-semibold text-white">
                      ROI: <strong className="text-green-400">+{activeCampaign.roi}%</strong>, Rev: ${activeCampaign.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 font-sans">
                  Attribution fully logged.
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Aggregate KPI Stats Section (High-Contrast Slate) */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Sent */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Broadcast Volume</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Send className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h4 className="font-display font-extrabold text-2xl text-gray-900">{totalSent.toLocaleString()}</h4>
            <p className="text-xs text-gray-500 mt-1">Official Cloud API messages sent</p>
          </div>
        </div>

        {/* Avg Open Rate */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Open Rate</span>
            <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg"><Percent className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h4 className="font-display font-extrabold text-2xl text-gray-900">93.4%</h4>
            <p className="text-xs text-gray-500 mt-1">Sms average: ~15-20%</p>
          </div>
        </div>

        {/* Total Generated Revenue */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attributed Revenue</span>
            <span className="p-1.5 bg-green-50 text-green-600 rounded-lg"><DollarSign className="w-4 h-4" /></span>
          </div>
          <div className="mt-4">
            <h4 className="font-display font-extrabold text-2xl text-green-600">${totalRevenue.toLocaleString()}</h4>
            <p className="text-xs text-gray-500 mt-1">Simulated total sales</p>
          </div>
        </div>

        {/* Average ROI (High-Contrast Slate Pop-up Card as per instructions) */}
        <div className="bg-zinc-900 text-white p-6 rounded-2xl border border-zinc-800 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider z-10">North Star ROI</span>
            <span className="p-1.5 bg-green-500 text-white rounded-lg z-10"><TrendingUp className="w-4 h-4" /></span>
          </div>
          <div className="mt-4 z-10">
            <h4 className="font-display font-extrabold text-2xl text-green-400">+{averageRoi.toFixed(0)}%</h4>
            <p className="text-xs text-zinc-400 mt-1">Average campaign returns</p>
          </div>
        </div>
      </div>

      {/* Historical Logs & Detailed Campaign Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm mt-12 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="font-display font-bold text-gray-900 text-base">Campaign Log Matrix</h3>
            <p className="text-xs text-gray-500 font-sans">Full breakdown of sent templates, costs, and conversions</p>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {campaigns.length} Historical Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Campaign Name</th>
                <th className="py-4 px-6">Sent Volume</th>
                <th className="py-4 px-6">Open / Click Rate</th>
                <th className="py-4 px-6">Conv. Rate</th>
                <th className="py-4 px-6">Estimated Cost</th>
                <th className="py-4 px-6">Attributed Sales</th>
                <th className="py-4 px-6 text-right">Attribution ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900">{c.name}</td>
                  <td className="py-4 px-6 font-mono font-medium text-gray-700">{c.messagesSent.toLocaleString()}</td>
                  <td className="py-4 px-6 font-sans">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-700">Open: <strong className="font-mono text-purple-600">{c.openRate}%</strong></span>
                      <span className="text-[10px] text-gray-500">Click: <strong className="font-mono text-blue-600">{c.clickRate}%</strong></span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-green-600">{c.conversionRate}%</td>
                  <td className="py-4 px-6 font-mono text-gray-600">${c.cost.toFixed(2)}</td>
                  <td className="py-4 px-6 font-mono font-bold text-gray-900">${c.revenue.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                      +{c.roi.toLocaleString()}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
