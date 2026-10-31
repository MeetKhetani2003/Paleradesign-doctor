import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Award, ShieldAlert, Clock, MessageSquare, Calendar, ExternalLink, CheckCircle2 } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function ResumeHeader({ onOpenBooking }) {
  const [currentStatus, setCurrentStatus] = useState({
    isOpen: false,
    label: 'Checking status...'
  });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      const day = istTime.getDay();

      if (day === 0) {
        setCurrentStatus({ isOpen: false, label: 'OPD Closed on Sunday &bull; ICU Open 24/7' });
        return;
      }

      if (timeInMinutes >= 600 && timeInMinutes <= 780) {
        setCurrentStatus({ isOpen: true, label: 'OPD Open Now &bull; Morning Session (10 AM - 1 PM)' });
      } else if (timeInMinutes >= 1020 && timeInMinutes <= 1200) {
        setCurrentStatus({ isOpen: true, label: 'OPD Open Now &bull; Evening Session (5 PM - 8 PM)' });
      } else {
        const next = timeInMinutes < 600 ? 'Opens at 10 AM' : (timeInMinutes < 1020 ? 'Opens at 5 PM' : 'Opens tomorrow 10 AM');
        setCurrentStatus({ isOpen: false, label: `OPD Closed &bull; ${next} (24/7 ICU Active)` });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200/90 pb-8 pt-6">
      
      {/* Top Facility Association Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <a 
          href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
          title="Visit Premier Hospital & ICU Official Website"
        >
          <img
            src={HOSPITAL_CONFIG.assets.logo}
            alt="Premier Hospital & ICU"
            className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-[1.01]"
            width="200"
            height="44"
          />
        </a>

        {/* 24/7 ICU Emergency Hotline Quick Tag */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span>24/7 ICU Emergency: {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}</span>
          </a>
        </div>
      </div>

      {/* Doctor Executive Profile Header */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Physician Photo Badge */}
        <div className="md:col-span-3 flex justify-center md:justify-start">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#263F91]/20 shadow-md bg-slate-50 group">
            <img
              src={HOSPITAL_CONFIG.assets.doctorPortrait}
              alt="Dr. Avinash Kasundra"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-1 inset-x-1 bg-[#152B56]/90 backdrop-blur-xs text-white text-[9px] font-bold py-0.5 text-center rounded">
              Lilavati Fellow
            </div>
          </div>
        </div>

        {/* Doctor Details & Credentials */}
        <div className="md:col-span-9 space-y-3 text-center md:text-left">
          
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EAF0FA] text-[#263F91] text-[11px] font-bold uppercase tracking-wider">
              <Award className="w-3 h-3" /> Premier Hospital &amp; ICU, Rajkot
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#152B56] tracking-tight">
              Dr. Avinash Kasundra
            </h1>
            
            <p className="text-base sm:text-lg font-semibold text-[#263F91]">
              Consultant Intensivist &amp; Pulmonologist
            </p>
          </div>

          {/* Education Subtitle */}
          <p className="text-xs sm:text-sm text-slate-700 font-medium">
            MBBS, MD (Respiratory Medicine) &bull; <span className="text-[#152B56] font-semibold">Fellowship in Critical Care Medicine (Lilavati Hospital, Mumbai)</span>
          </p>

          {/* Contact & Location Chips */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs">
            <a
              href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#263F91]" />
              <span>{HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
            </a>

            <a
              href={`mailto:${HOSPITAL_CONFIG.contacts.hospitalEmail}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#263F91]" />
              <span>{HOSPITAL_CONFIG.contacts.hospitalEmail}</span>
            </a>

            <a
              href={HOSPITAL_CONFIG.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#263F91]" />
              <span>RK Prime Plus, 150ft Ring Rd, Rajkot</span>
            </a>
          </div>

          {/* Quick Action CTA Buttons & Live Status */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#263F91] hover:bg-[#152B56] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book OPD Appointment</span>
            </button>

            <a
              href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquire</span>
            </a>

            {/* Live IST indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
              <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span dangerouslySetInnerHTML={{ __html: currentStatus.label }} />
            </div>
          </div>

        </div>

      </div>

    </header>
  );
}

