"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { useEffect, useRef, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

export function EditorContent() {
  const { code, setCode, cursorType, language } = useEditorStore();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate the number of lines from the code content
  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 1);
  const displayLineCount = Math.max(lineCount + 5, 20); // More padding for click-ability

  // Build the cursor styles based on the selected type
  let cursorClass = "caret-white"; 
  let customCursorStyle = ""; 

  if (cursorType === "Block") {
    cursorClass = "caret-transparent";
    customCursorStyle = `
      .editor-textarea { 
        caret-color: white; 
        caret-shape: block; 
      }
    `;
  } else if (cursorType === "Underline") {
    customCursorStyle = `
      .editor-textarea { 
        caret-color: white; 
        caret-shape: underscore; 
      }
    `;
  } else {
    customCursorStyle = `
      .editor-textarea { 
        caret-color: white; 
        caret-shape: bar; 
      }
    `;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const getLanguage = () => {
    switch (language.toLowerCase()) {
      case 'python': return 'python';
      case 'rust': return 'rust';
      case 'go': return 'go';
      case 'typescript': 
      default: 
        return 'typescript';
    }
  };

  // Clicking anywhere in the content area should focus the editor
  const handleContainerClick = () => {
    editorRef.current?.focus();
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      className="flex-1 relative font-mono text-[14px] leading-relaxed overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-text"
      style={{ fontVariantLigatures: 'normal' }}
    >
      <style>{customCursorStyle}</style>
      
      {/* Line Numbers */}
      <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col items-end px-5 py-12 text-white/5 select-none text-xs font-mono leading-relaxed z-10 pointer-events-none">
        {[...Array(displayLineCount)].map((_, i) => (
          <span key={i + 1} className="h-[21px] flex items-center">{i + 1}</span>
        ))}
      </div>
      
      <div className="relative pl-16 py-12 min-h-full">
        {/* Transparent Textarea for Input */}
        <textarea
          ref={editorRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`absolute top-12 left-16 w-[calc(100%-4rem)] h-[calc(100%-3rem)] bg-transparent text-transparent resize-none outline-none border-none whitespace-pre font-mono p-0 m-0 overflow-hidden editor-textarea z-20 selection:bg-white/20 ${cursorClass}`}
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />

        {/* Syntax Highlighted View */}
        <div className="relative pointer-events-none z-10 w-full mb-20">
          {isClient && (
            <Highlight
              theme={themes.okaidia}
              code={code}
              language={getLanguage()}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} bg-transparent m-0 p-0`} style={{ ...style, backgroundColor: 'transparent' }}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} className="flex min-h-[21px]">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                      {/* Handle empty lines */}
                      {line.length === 1 && line[0].content === "" && <span className="invisible">{" "}</span>}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          )}
        </div>
      </div>
    </div>
  );
}
