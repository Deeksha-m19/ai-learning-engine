import { User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-16 shrink-0 border-b border-slate-800 bg-[#0f1115]/50 backdrop-blur-md flex items-center justify-between px-6 z-10">
      <div className="text-sm font-medium text-slate-400">
        Workspace / Your Notes
      </div>
      
      <div className="flex items-center gap-4 text-slate-400">
        <button className="hover:text-white transition-colors">
          <User size={20} />
        </button>
      </div>
    </div>
  );
}