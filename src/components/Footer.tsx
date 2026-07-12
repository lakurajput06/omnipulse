export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 font-sans text-xs flex flex-col items-center gap-6 px-4 py-12 w-full text-center border-t border-zinc-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="p-1.5 bg-zinc-800 text-blue-400 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
        </span>
        <span className="font-display font-extrabold text-lg text-white">OmniPulse</span>
      </div>

      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3">
        <a className="text-zinc-500 hover:text-white transition-colors" href="#privacy">Privacy Policy</a>
        <a className="text-zinc-500 hover:text-white transition-colors" href="#terms">Terms of Service</a>
        <a className="text-zinc-500 hover:text-white transition-colors" href="#contact">Contact Support</a>
        <a className="text-zinc-500 hover:text-white transition-colors" href="#api">API Documentation</a>
      </nav>

      <div className="w-full h-[1px] bg-zinc-850 my-2 max-w-4xl"></div>
      <p className="text-zinc-500">© 2026 OmniPulse. All rights reserved.</p>

      {/* Social and Tech channel badges */}
      <div className="flex gap-4">
        <div className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <div className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors cursor-pointer text-zinc-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
