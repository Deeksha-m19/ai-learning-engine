import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BrainCircuit, Check, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary function of the mitochondria in a cell?",
    options: [
      "Protein synthesis",
      "Generating chemical energy (ATP)",
      "Storing genetic information",
      "Cell waste disposal"
    ],
    correctAnswer: 1,
    explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions, stored as ATP."
  },
  {
    id: 2,
    question: "From whom is mitochondrial DNA generally inherited?",
    options: [
      "Only the father",
      "Both parents equally",
      "Only the mother",
      "It is not inherited; it forms spontaneously"
    ],
    correctAnswer: 2,
    explanation: "Mitochondrial DNA (mtDNA) is maternally inherited in humans and most other multicellular organisms."
  }
];

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasQuiz, setHasQuiz] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasQuiz(true);
    }, 1500);
  };

  const handleSelect = (idx) => {
    if (selectedAns !== null) return; // Prevent multiple clicks
    setSelectedAns(idx);
    if (idx === MOCK_QUESTIONS[currentQ].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < MOCK_QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedAns(null);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelectedAns(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Knowledge Check</h1>
          <p className="text-slate-400">Test what you've learned from your documents.</p>
        </div>
        
        {!hasQuiz && (
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white font-medium transition-all flex items-center gap-2"
          >
            {isGenerating ? "Generating..." : <><BrainCircuit size={18} /> Generate Quiz</>}
          </button>
        )}
      </div>

      {!hasQuiz && !isGenerating && (
        <div className="border border-white/10 rounded-3xl p-16 text-center bg-white/[0.01]">
          <BrainCircuit size={48} className="mx-auto text-purple-400/50 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No active quiz</h3>
          <p className="text-slate-400">Click generate to automatically create a custom quiz based on your notes.</p>
        </div>
      )}

      {isGenerating && (
        <div className="glass-card rounded-3xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
          <h3 className="text-xl font-medium text-white">Generating Quiz Questions...</h3>
        </div>
      )}

      {hasQuiz && !isFinished && (
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div 
              className="h-full bg-purple-500" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + (selectedAns !== null ? 1 : 0)) / MOCK_QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-between mb-8 text-sm font-medium">
            <span className="text-purple-400">Question {currentQ + 1} of {MOCK_QUESTIONS.length}</span>
            <span className="text-slate-400">Score: {score}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-8 leading-snug">
                {MOCK_QUESTIONS[currentQ].question}
              </h2>

              <div className="space-y-3 mb-8">
                {MOCK_QUESTIONS[currentQ].options.map((opt, idx) => {
                  const isSelected = selectedAns === idx;
                  const isCorrectAnswer = idx === MOCK_QUESTIONS[currentQ].correctAnswer;
                  
                  let optStyle = "bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.06] hover:border-slate-500 cursor-pointer";
                  let icon = null;

                  if (selectedAns !== null) {
                    if (isCorrectAnswer) {
                      optStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-100 cursor-default";
                      icon = <Check size={18} className="text-emerald-400" />;
                    } else if (isSelected) {
                      optStyle = "bg-red-500/20 border-red-500/50 text-red-100 cursor-default";
                      icon = <X size={18} className="text-red-400" />;
                    } else {
                      optStyle = "bg-white/[0.01] border-white/5 text-slate-500 cursor-default opacity-50";
                    }
                  }

                  return (
                    <div 
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={clsx(
                        "w-full rounded-xl border p-4 transition-all flex items-center justify-between",
                        optStyle
                      )}
                    >
                      <span className="font-medium">{opt}</span>
                      {icon && <span>{icon}</span>}
                    </div>
                  );
                })}
              </div>

              {selectedAns !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20"
                >
                  <p className="text-sm text-indigo-200 mb-4">
                    <span className="font-bold">Explanation:</span> {MOCK_QUESTIONS[currentQ].explanation}
                  </p>
                  <div className="flex justify-end">
                    <button 
                      onClick={nextQuestion}
                      className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
                    >
                      {currentQ < MOCK_QUESTIONS.length - 1 ? "Next Question" : "View Results"}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {isFinished && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card rounded-3xl p-12 text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 p-[3px] mx-auto mb-6">
            <div className="w-full h-full bg-[#181a20] rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{Math.round((score / MOCK_QUESTIONS.length) * 100)}%</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-slate-400 mb-8">You answered {score} out of {MOCK_QUESTIONS.length} questions correctly.</p>
          
          <button 
            onClick={restart}
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={18} /> Retake Quiz
          </button>
        </motion.div>
      )}
    </div>
  );
}
