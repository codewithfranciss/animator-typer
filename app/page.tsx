"use client";

import React, { useState, useEffect, useRef } from "react";
import { Highlight, Language, PrismTheme, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const myDefaultProps = {
  theme: undefined as PrismTheme | undefined,
};

const themeOptions = {
  Dracula: themes.dracula,
  GitHub: themes.github,
  "Night Owl": themes.nightOwl,
  "Duotone Light": themes.duotoneLight,
  "VS Dark": themes.vsDark,
};

export default function ReplicaUI() {
  const [code, setCode] = useState(`const isExample = animations.some(() => {})`);
  const [themeName, setThemeName] = useState<keyof typeof themeOptions>("Night Owl");
  const [zoom, setZoom] = useState(1);
  const [isPreview, setIsPreview] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const typingIndex = useRef(0);
  const typingInterval = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Typing effect + auto scroll
  useEffect(() => {
    if (isPreview) {
      setTypedCode("");
      typingIndex.current = 0;

      if (typingInterval.current) clearInterval(typingInterval.current);

      typingInterval.current = setInterval(() => {
        typingIndex.current += 1;
        setTypedCode(code.slice(0, typingIndex.current));

        // Auto-scroll down
        if (previewRef.current) {
          previewRef.current.scrollTop = previewRef.current.scrollHeight;
        }

        if (typingIndex.current >= code.length) {
          if (typingInterval.current) clearInterval(typingInterval.current);
        }
      }, 20); // speed
    }

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
    };
  }, [isPreview, code]);

  return (
    <div
      className="min-h-screen bg-[#0b0b0c] flex text-sm font-sans transition-colors duration-300"
      style={{
        background:
          "radial-gradient(circle at center, #080909 0%, #050506 100%), url('/broken-noise.png')",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
      }}
    >
      <main className="flex-1 p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="bg-gradient-to-b from-[#0b0b0c] to-[#050506] rounded-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.7)] border border-neutral-800">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {[1, 2].map((z) => (
                  <button
                    key={z}
                    onClick={() => setZoom(z)}
                    className={`px-3 py-1 rounded-md text-xs transition-all ${
                      zoom === z
                        ? "bg-neutral-800 text-white"
                        : "bg-neutral-900/40 text-neutral-400 hover:bg-neutral-800"
                    }`}
                  >
                    {z}x
                  </button>
                ))}

                <Select
                  value={themeName}
                  onValueChange={(value) =>
                    setThemeName(value as keyof typeof themeOptions)
                  }
                >
                  <SelectTrigger className="w-[160px] bg-neutral-900/40 text-xs border border-neutral-700 text-neutral-300">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(themeOptions).map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="ml-4 px-3 py-1 rounded-md bg-neutral-900/20 text-xs text-neutral-400">
                  code.tsx
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-600 ml-2" />
              </div>
            </div>

            {/* Full card textarea or preview */}
            <Card
              className="bg-black/60 border-0 shadow-lg rounded-lg min-h-[380px] max-h-[380px] p-0 overflow-hidden relative"
            >
              {!isPreview ? (
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  style={{
                    fontSize: zoom === 1 ? 16 : 20,
                    fontFamily: "monospace",
                    padding: "1.5rem",
                    height: "100%",
                    width: "100%",
                    resize: "none",
                    background: "transparent",
                    color: "#d1d5db", // Tailwind slate-300
                    border: "none",
                    outline: "none",
                    overflowY: "auto",
                    overflowX: "hidden",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                  className="scrollbar-hide"
                  placeholder="Type or paste your code here..."
                />
              ) : (
                <div
                  ref={previewRef}
                  style={{
                    fontSize: zoom === 1 ? 16 : 20,
                    fontFamily: "monospace",
                    padding: "1.5rem",
                    height: "100%",
                    width: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    color: "#d1d5db", // Tailwind slate-300
                  }}
                  className="scrollbar-hide"
                >
                  <Highlight
                    {...myDefaultProps}
                    code={typedCode}
                    language={"tsx" as Language}
                    theme={themeOptions[themeName]}
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={className + " m-0 leading-6"}
                        style={{ ...style, background: "transparent" }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </div>
              )}
            </Card>

            {/* Bottom Actions */}
            <div className="mt-6 flex justify-center gap-4">
              <Button
                onClick={() => setIsPreview((p) => !p)}
                className="px-6 py-2 bg-gradient-to-b from-blue-700 to-blue-600 border border-blue-700"
              >
                {isPreview ? "Edit" : "Preview"}
              </Button>
              <Button className="px-6 py-2 bg-neutral-800 border border-neutral-700">
                Export
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
