import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Send, FileText } from "lucide-react";
import ChatMessage from "../components/ChatMessage";
import Loader from "../components/Loader";

export default function Chat() {
  const { docId } = useParams();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I've analyzed your document. What would you like to know about it?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Based on the notes you provided, the core concept revolves around optimizing specific pathways. This is a simulated response designed to show how the UI would look with a real backend integration."
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-full gap-6">
      
      {/* Left Panel: Document Context */}
      <div className="hidden lg:flex w-80 shrink-0 flex-col gap-4">
        <div className="glass-card p-5 rounded-2xl h-full flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FileText size={18} className="text-indigo-400" /> Reference Material
          </h2>
          
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
            <h3 className="text-sm font-medium text-white mb-1">Active Document</h3>
            <p className="text-xs text-slate-400 truncate">Document ID: {docId}</p>
          </div>

          <div className="flex-1 overflow-auto pr-2 custom-scrollbar text-sm text-slate-400 space-y-4">
            <p className="border-l-2 border-indigo-500/30 pl-3">
              "The mitochondria is the powerhouse of the cell, generating most of the chemical energy needed to power the cell's biochemical reactions..."
            </p>
            <p className="border-l-2 border-indigo-500/30 pl-3">
              "Chemical energy produced by the mitochondria is stored in a small molecule called adenosine triphosphate (ATP)."
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel: Chat Interface */}
      <div className="flex-1 flex flex-col glass-card rounded-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center px-6 shrink-0 bg-white/[0.01]">
          <h2 className="font-medium text-white">Chatting with your notes</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-6 scroll-smooth">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-6 w-full">
              <Loader />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/[0.01] border-t border-white/5">
          <form 
            onSubmit={handleSend}
            className="flex items-center gap-2 max-w-4xl mx-auto bg-slate-900/50 border border-slate-700/50 rounded-2xl p-2 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your notes..."
              className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 placeholder:text-slate-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 flex items-center justify-center text-white transition-colors"
            >
              <Send size={18} className={input.trim() ? "ml-0.5" : ""} />
            </button>
          </form>
          <p className="text-center text-[11px] text-slate-500 mt-3">
            AI can make mistakes. Verify important information with your original notes.
          </p>
        </div>
      
      </div>
    </div>
  );
}
