"use client";

import { ChevronDown, Play, Check } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { useEditorStore } from "@/store/useEditorStore";

interface DropdownItemProps {
  label: string;
  value: string;
  options?: string[];
  onChange?: (val: string) => void;
}

function DropdownItem({ label, value, options, onChange }: DropdownItemProps) {
  if (!options) {
    return (
      <div className="flex flex-col min-w-[70px] lg:min-w-[90px]">
        <span className="text-[10px] font-bold tracking-widest text-[#666666]">{label}</span>
        <div className="flex items-center justify-between cursor-pointer group mt-1">
          <span className="text-[14px] font-medium text-[#e0e0e0] group-hover:text-white transition-colors">{value}</span>
          <ChevronDown className="w-4 h-4 text-[#555555] group-hover:text-white/70 transition-colors" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-[70px] lg:min-w-[90px]">
      <span className="text-[10px] font-bold tracking-widest text-[#666666]">{label}</span>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="flex items-center justify-between cursor-pointer group outline-none mt-1 min-w-[70px]">
          <Select.Value />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-[#555555] group-hover:text-white/70 transition-colors" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={14}
            className="overflow-hidden bg-[#141414]/95 backdrop-blur-xl border border-[#333333] rounded-lg shadow-2xl z-[100] min-w-[140px] animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <Select.Viewport className="p-1.5 flex flex-col gap-0.5">
              {options.map((option) => (
                <Select.Item
                  key={option}
                  value={option}
                  className="flex items-center relative pl-8 pr-3 py-2 text-[13px] font-medium text-[#a0a0a0] rounded-md outline-none cursor-pointer select-none transition-colors data-[highlighted]:bg-[#2a2a2a] data-[highlighted]:text-white data-[state=checked]:text-white"
                >
                  <Select.ItemIndicator className="absolute left-2.5 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </Select.ItemIndicator>
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

export function ControlDock() {
  const { 
    cursorType, setCursorType,
    speed, setSpeed,
    theme, setTheme,
    language, setLanguage 
  } = useEditorStore();

  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 px-4 flex justify-center w-full">
      <div className="bg-[#0f0f0f]/90 backdrop-blur-xl border border-[#222222] rounded-xl w-full max-w-max shadow-2xl overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="px-6 py-4 flex items-center gap-6 lg:gap-16 min-w-max">
          <DropdownItem 
            label="SPEED" 
            value={speed} 
            options={["0.5x", "1x", "1.5x", "2x"]} 
            onChange={setSpeed} 
          />
          <DropdownItem 
            label="CURSOR" 
            value={cursorType} 
            options={["Block", "Line", "Underline"]} 
            onChange={(val) => setCursorType(val as 'Block' | 'Line' | 'Underline')} 
          />
          <DropdownItem 
            label="THEME" 
            value={theme} 
            options={["Dracula", "Github Dark", "Monokai", "VS Code"]} 
            onChange={setTheme} 
          />
          <DropdownItem 
            label="LANGUAGE" 
            value={language} 
            options={["TypeScript", "Python", "Rust", "Go"]} 
            onChange={setLanguage} 
          />

          <div className="flex flex-col items-center pl-4 lg:pl-6 border-l border-[#222222]/50 ml-2">
            <button className="w-10 h-10 rounded-full bg-[#e8e8e8] text-black flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-95 shrink-0">
              <Play className="fill-current w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
