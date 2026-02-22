import { Header } from "@/components/Header";
import { CodeEditor } from "@/components/CodeEditor";
import { ControlDock } from "@/components/ControlDock";

export default function Home() {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat text-slate-100 font-display min-h-screen flex flex-col overflow-hidden selection:bg-white/10">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center relative p-4 lg:p-10 pb-32">
        <CodeEditor />
      </main>

      <ControlDock />
    </div>
  );
}
