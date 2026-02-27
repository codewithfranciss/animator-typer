"use client";

import { useEditorStore } from "@/store/useEditorStore";

export function EditorHeader() {
  const { fileName, setFileName } = useEditorStore();

  return (
    <div className="h-12 border-b border-white/5 bg-white/[0.01] flex items-center px-6 justify-between select-none z-10 shrink-0">
      <div className="flex gap-2.5">
        <div className="w-3 h-3 rounded-full bg-[#3d3d3d]"></div>
        <div className="w-3 h-3 rounded-full bg-[#3d3d3d]"></div>
        <div className="w-3 h-3 rounded-full bg-[#3d3d3d]"></div>
      </div>
      
      <div className="flex items-center justify-center">
        <input 
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="text-[11px] text-white/50 hover:text-white/80 focus:text-white/80 text-center font-mono tracking-tight bg-transparent border-none outline-none transition-colors w-[200px]"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      
      <div className="w-12"></div>
    </div>
  );
}
