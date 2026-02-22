import { ChevronDown } from "lucide-react";

export function ControlDock() {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-[840px] px-6">
      <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/5 rounded-[2rem] px-8 py-4 flex items-center justify-between gap-8 shadow-2xl">
        {/* SPEED */}
        <div className="flex items-center gap-4 group">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-semibold">Speed</label>
          <div className="flex items-center gap-3">
            <input 
              type="range" 
              className="w-24 h-1 cursor-pointer" 
              min="0" 
              max="100" 
              defaultValue="65" 
            />
            <span className="text-[11px] font-mono text-white/30 w-4">65</span>
          </div>
        </div>

        <div className="h-6 w-px bg-white/5"></div>

        {/* CURSOR */}
        <div className="flex items-center gap-4 group">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-semibold">Cursor</label>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            <span className="text-[11px] text-white/60">Line</span>
            <ChevronDown className="size-3 text-white/20" />
          </div>
        </div>

        <div className="h-6 w-px bg-white/5"></div>

        {/* BG TOGGLE */}
        <div className="flex items-center gap-4 group">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-semibold">Bg</label>
          <div className="toggle-switch"></div>
        </div>

        <div className="h-6 w-px bg-white/5"></div>

        {/* RESOLUTION */}
        <div className="flex items-center gap-4 group">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-semibold">Res</label>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer">
            <span className="text-[11px] text-white/60">1080p</span>
            <ChevronDown className="size-3 text-white/20" />
          </div>
        </div>

        <div className="h-6 w-px bg-white/5 pointer-events-none opacity-0"></div>

        {/* PREVIEW */}
        <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-white/80 hover:bg-white/10 transition-all active:scale-[0.98]">
          Preview Animation
        </button>
      </div>
    </div>
  );
}
