"use client";

import { EditorHeader } from "./editor/EditorHeader";
import { EditorContent } from "./editor/EditorContent";

export function CodeEditor() {
  return (
    <div className="relative w-full max-w-3xl aspect-[16/10] bg-black/80 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl flex flex-col overflow-hidden">
      <EditorHeader />
      <EditorContent />
    </div>
  );
}
