export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 px-12 py-8 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto">
        <h1 className="text-sm font-medium tracking-tight text-white/90">
          codefilm
        </h1>
      </div>
      
      <div className="flex items-center gap-10 pointer-events-auto">
        <a href="#" className="text-xs font-medium text-white/40 hover:text-white/60 transition-colors">
          About
        </a>
        <button className="px-5 py-2 rounded-full border border-white/10 bg-transparent text-[11px] font-medium text-white/80 hover:bg-white/5 hover:border-white/20 transition-all active:scale-[0.98]">
          Export Video
        </button>
      </div>
    </header>
  );
}
