import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end">
      {/* Tooltip message */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-800 text-xs font-medium py-1.5 px-3 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 animate-bounce">
          <span>Book appointment via WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Chat on WhatsApp with Dr. Avinash Kasundra consultation desk"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white"></span>
        </span>
        <MessageSquare className="w-7 h-7" />
      </a>
    </aside>
  );
}

