import { ChevronDown, Play } from "lucide-react";

interface DropdownItemProps {
  label: string;
  value: string;
}

function DropdownItem({ label, value }: DropdownItemProps) {
  return (
    <div className="flex flex-col min-w-[70px] lg:min-w-[90px]">
      <span className="text-[10px] font-bold tracking-widest text-[#666666]">{label}</span>
      <div className="flex items-center justify-between cursor-pointer group">
        <span className="text-[14px] font-medium text-[#e0e0e0] group-hover:text-white transition-colors">{value}</span>
        <ChevronDown className="w-4 h-4 text-[#555555] group-hover:text-white/70 transition-colors" />
      </div>
    </div>
  );
}

export function ControlDock() {
  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 px-4 flex justify-center w-full">
      <div className="bg-[#0f0f0f] border border-[#222222] rounded-lg w-full max-w-max shadow-2xl overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="px-6 py-4 flex items-center gap-6 lg:gap-16 min-w-max">
          <DropdownItem label="SPEED" value="1x" />
          <DropdownItem label="CURSOR" value="Block" />
          <DropdownItem label="THEME" value="Dracula" />
          <DropdownItem label="LANGUAGE" value="Python" />

          <div className="flex flex-col items-center pl-4 lg:pl-6 border-l border-[#222222]/50 ml-2">
            <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#333333] transition-colors border border-transparent hover:border-[#444444] active:scale-95 shrink-0">
              <Play className="fill-current text-[#dddddd] ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
