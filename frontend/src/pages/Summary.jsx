import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText, Play, Pause, Volume2, Wand2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Summary() {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get("doc") || "demo";
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasSummary, setHasSummary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasSummary(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Smart Summary</h1>
          <p className="text-slate-400">Generate an AI-powered digest of your document.</p>
        </div>
        
        {!hasSummary && (
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Generating...</span>
            ) : (
              <><Wand2 size={18} /> Generate Summary</>
            )}
          </button>
        )}
      </div>

      {!hasSummary && !isGenerating && (
        <div className="border-2 border-dashed border-white/10 rounded-3xl p-16 text-center bg-white/[0.01]">
          <div className="w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText size={32} />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Ready to summarize</h3>
          <p className="text-slate-400 max-w-sm mx-auto mb-6">
            Click the button above to extract key insights, bullet points, and an audio overview of your document.
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="glass-card rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
            <Wand2 className="absolute inset-0 m-auto text-indigo-400" size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-white">Analyzing Document...</h3>
            <p className="text-slate-400 text-sm">Extracting key concepts, facts, and relationships.</p>
          </div>
        </div>
      )}

      {hasSummary && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 text-left"
        >
          {/* Audio Player Card */}
          <div className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 w-64 h-64 bg-indigo-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 shrink-0 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all"
            >
              {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="ml-1 fill-current" />}
            </button>
            
            <div className="flex-1 w-full space-y-2 z-10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-300 flex items-center gap-2">
                  <Volume2 size={16} /> AI Overcast
                </span>
                <span className="text-xs text-slate-400 font-mono">0:00 / 3:45</span>
              </div>
              
              {/* Fake Audio Waveform */}
              <div className="flex items-end gap-1 h-8 items-center">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-1 bg-indigo-400/80 rounded-full"
                    animate={{ height: isPlaying ? ["20%", `${Math.random() * 80 + 20}%`, "20%"] : "20%" }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Key Bullet Points */}
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Key Takeaways</h2>
            <ul className="space-y-4">
              {[
                "Mitochondria are membrane-bound cell organelles that generate most of the chemical energy needed to power the cell's biochemical reactions.",
                "Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP).",
                "Mitochondria contain their own small chromosomes, and their genetic material is inherited only from the mother."
              ].map((point, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <CheckCircle2 size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Explanations */}
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Detailed Explanation</h2>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
              <p>
                In biology, the <strong>cell structure</strong> is fundamentally dependent on various organelles working together to maintain homeostasis and execute specific functions. The mitochondria, often referred to as the powerhouse of the cell, play a crucial role in cellular respiration. 
              </p>
              <p>
                Through a process taking place in the inner membrane, known as the electron transport chain, energy is derived from carbohydrates, fats, and proteins. This energy is then packaged into ATP, which serves as the primary energy currency for the cell. This specific structure, highly folded into cristae, maximizes surface area for ATP production.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
