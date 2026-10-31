import React from 'react';
import { Phone, ShieldAlert, Clock } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function EmergencyBanner() {
  return (
    <div className="bg-[#152B56] text-white py-2 px-4 border-b border-blue-900/40 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="font-semibold tracking-wide text-red-300 uppercase flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" /> 24/7 Critical Care &amp; ICU Emergency
          </span>
          <span className="hidden md:inline text-blue-200">|</span>
          <span className="hidden md:inline text-blue-100/80">Premier Hospital &amp; ICU, 150ft Ring Road, Rajkot</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-300" />
            <span>OPD: 10:00 AM – 1:00 PM | 5:00 PM – 8:00 PM</span>
          </div>
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1 rounded transition-colors text-xs"
            aria-label="Call emergency helpline"
          >
            <Phone className="w-3 h-3" />
            <span>Emergency: {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

