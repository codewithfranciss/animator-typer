export function CodeEditor() {
  return (
    <div className="relative w-full max-w-3xl aspect-[16/10] bg-[#050505] rounded-xl border border-white/5 shadow-2xl flex flex-col overflow-hidden">
      {/* Window Controls */}
      <div className="h-12 border-b border-white/5 bg-white/[0.01] flex items-center px-6 justify-between select-none">
        <div className="flex gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#3d3d3d]"></div>
          <div className="w-3 h-3 rounded-full bg-[#3d3d3d]"></div>
          <div className="w-3 h-3 rounded-full bg-[#3d3d3d]"></div>
        </div>
        <div className="text-[11px] text-white/20 font-mono tracking-tight">useRecorder.ts</div>
        <div className="w-12"></div>
      </div>

      {/* Editor Content */}
      <div 
        className="flex-1 p-12 font-mono text-[14px] leading-relaxed text-slate-400 relative overflow-auto"
        style={{ fontVariantLigatures: 'normal' }}
      >
        <div className="absolute left-0 top-12 bottom-0 w-16 flex flex-col items-end px-5 text-white/5 select-none text-xs font-mono leading-relaxed">
          {[...Array(18)].map((_, i) => (
            <span key={i + 1}>{i + 1}</span>
          ))}
        </div>
        
        <div 
          className="pl-16 h-full outline-none whitespace-pre" 
          contentEditable="true" 
          suppressContentEditableWarning={true}
          spellCheck="false"
        >
          <span className="text-[#c678dd]">import</span> {"{ "}
          <span className="text-[#ABB2BF]">useState, useEffect</span> {"} "}
          <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span>
          <br /><br />
          <span className="text-[#c678dd]">interface</span> <span className="text-[#e5c07b]">FrameConfig</span> {"{"}<br />
          {"  "}<span className="text-[#ABB2BF]">width: number</span><br />
          {"  "}<span className="text-[#ABB2BF]">height: number</span><br />
          {"  "}<span className="text-[#ABB2BF]">fps: number</span><br />
          {"}"}<br /><br />
          <span className="text-[#c678dd]">export function</span> <span className="text-[#61afef]">useRecorder</span>(config: <span className="text-[#e5c07b]">FrameConfig</span>) {"{"}<br />
          {"  "}<span className="text-[#c678dd]">const</span> [frames, setFrames] = <span className="text-[#61afef]">useState</span>&lt;<span className="text-[#e5c07b]">string</span>[]&gt;([])<br />
          {"  "}<span className="text-[#c678dd]">const</span> [isActive, setIsActive] = <span className="text-[#61afef]">useState</span>(<span className="text-[#d19a66]">false</span>)<br /><br />
          {"  "}<span className="text-[#5c6370] italic">// capture each keystroke as a frame</span><br />
          {"  "}<span className="text-[#61afef]">useEffect</span>(() =&gt; {"{"}<br />
          {"    "}<span className="text-[#c678dd]">const</span> interval = <span className="text-[#d19a66]">1000</span> / config.fps<br />
          {"    "}<span className="text-[#c678dd]">return</span> <span className="text-[#61afef]">capture</span>(interval)<br />
          {"  }, [config])"}<br />
          {"}"}
        </div>
      </div>
    </div>
  );
}
