interface DockSelectProps {
  label: string;
  options: string[];
  defaultValue?: string;
  className?: string;
}

export function DockSelect({ label, options, defaultValue, className = "min-w-[80px]" }: DockSelectProps) {
  return (
    <div className={`flex flex-col gap-1 items-start ${className}`}>
      <label className="text-[10px] uppercase tracking-widest text-white/40 font-medium ml-1">
        {label}
      </label>
      <div className="relative w-full group">
        <select 
          defaultValue={defaultValue}
          className="custom-select w-full bg-transparent text-white/90 text-sm font-medium border-0 focus:ring-0 cursor-pointer p-0 pr-6 hover:text-white transition-colors"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-surface-dark">
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
