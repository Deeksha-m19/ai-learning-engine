import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MessageSquare, BrainCircuit, Network, MoreVertical, Trash2 } from "lucide-react";
import UploadBox from "../components/UploadBox";

export default function Dashboard() {
  const [documents, setDocuments] = useState([
    { id: "demo", name: "Biology 101 - Cell Structure.pdf", size: "2.4 MB", date: "Today" },
    { id: "demo2", name: "Modern History Notes.docx", size: "1.1 MB", date: "Yesterday" }
  ]);

  const handleUpload = (newDoc) => {
    setDocuments([newDoc, ...documents]);
  };

  const removeDoc = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Your Dashboard</h1>
        <p className="text-slate-400">Upload new study material or select an existing document to start learning.</p>
      </div>

      <UploadBox onUpload={handleUpload} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Documents ({documents.length})</h2>
        </div>
        
        {documents.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
            <p className="text-slate-500">No documents found. Upload one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {documents.map((doc) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={doc.id}
                  className="glass-card p-5 rounded-2xl flex flex-col group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="truncate">
                        <h3 className="text-white font-medium truncate" title={doc.name}>{doc.name}</h3>
                        <p className="text-xs text-slate-400">{doc.date} • {doc.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeDoc(doc.id)}
                      className="p-2 -mr-2 text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-white/5">
                    <Link
                      to={`/chat/${doc.id}`}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-sm font-medium transition-colors"
                    >
                      <MessageSquare size={16} /> Chat
                    </Link>
                    <Link
                      to={`/summary?doc=${doc.id}`}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-sm font-medium transition-colors"
                    >
                      <FileText size={16} /> Summary
                    </Link>
                    <Link
                      to={`/quiz?doc=${doc.id}`}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-sm font-medium transition-colors"
                    >
                      <BrainCircuit size={16} /> Quiz
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
