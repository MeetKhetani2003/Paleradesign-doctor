import React from 'react';
import { Phone, Calendar, MessageSquare } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function MobileStickyBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2.5 px-4 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between gap-2">
        {/* Call Doctor */}
        <a
          href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-50 text-slate-700 hover:text-[#263F91] border border-slate-200 transition-colors"
          aria-label="Call Doctor"
        >
          <Phone className="w-4 h-4 text-[#263F91]" />
          <span className="text-[10px] font-semibold mt-0.5">Call Doctor</span>
        </a>

        {/* WhatsApp */}
        <a
          href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 transition-colors"
          aria-label="WhatsApp Appointment"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-[1.6] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#263F91] text-white text-xs font-semibold shadow-sm hover:bg-[#152B56] transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Slot</span>
        </button>
      </div>
    </div>
  );
}

