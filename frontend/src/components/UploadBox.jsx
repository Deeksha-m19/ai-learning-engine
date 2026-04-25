import { useState, useRef } from "react";
import { UploadCloud, File as FileIcon } from "lucide-react";
import clsx from "clsx";

export default function UploadBox({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    // In a real app, we'd handle multiple or single files and upload to server
    // For this demo, we'll just mock adding the first file
    const file = files[0];
    if (file) {
      onUpload({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        date: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div
      className={clsx(
        "w-full rounded-3xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center py-16 cursor-pointer",
        isDragging
          ? "border-indigo-500 bg-indigo-500/10"
          : "border-slate-700 bg-white/[0.02] hover:bg-white/[0.04] hover:border-slate-600"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
        }}
        accept=".pdf,.txt,.docx"
      />
      
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
        <UploadCloud size={32} />
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        Drop your notes here
      </h3>
      <p className="text-slate-400 text-sm max-w-sm text-center">
        Support for PDFs, Word Docs, and Text files. We'll instantly process them for chatting and summaries.
      </p>
      
      <button className="mt-6 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors border border-slate-700 text-sm">
        Browse Files
      </button>
    </div>
  );
}
