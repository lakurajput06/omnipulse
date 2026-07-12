import { Tab } from "../types";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenDemo: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenDemo }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-4 md:px-8 shadow-sm">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setActiveTab(Tab.Home)}
        id="header-logo-container"
      >
        <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3" />
          </svg>
        </span>
        <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          OmniPulse
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab(Tab.Home)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === Tab.Home
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
          id="nav-btn-home"
        >
          Home
        </button>
        <button
          onClick={() => setActiveTab(Tab.ROI)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === Tab.ROI
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
          id="nav-btn-roi"
        >
          ROI Tracker
        </button>
        <button
          onClick={() => setActiveTab(Tab.AIBot)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === Tab.AIBot
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
          id="nav-btn-aibot"
        >
          AI Bot Console
        </button>
        <button
          onClick={() => setActiveTab(Tab.Menu)}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
            activeTab === Tab.Menu
              ? "bg-white text-blue-600 shadow-xs"
              : "text-gray-600 hover:text-gray-900"
          }`}
          id="nav-btn-menu"
        >
          Workspace
        </button>
      </nav>

      {/* Action Button */}
      <div>
        <button 
          onClick={onOpenDemo}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors active:scale-98"
          id="header-demo-btn"
        >
          Get a Demo
        </button>
      </div>
    </header>
  );
}
