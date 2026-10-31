'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone,
  Globe,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Download,
  Copy,
  Check,
  X,
  Send,
  MessageSquare,
  QrCode,
  ShieldAlert,
  Activity,
  HeartPulse,
  Stethoscope,
  Building2,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOCTOR_PROFILE } from '@/lib/profile-data';

// Custom Pulmonology Lungs Line Icon
function PulmonologyLungsIcon({ className = "w-9 h-9 text-[#0d7377]" }) {
  return (
    <svg 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trachea & Airway */}
      <path d="M32 7 V22" strokeWidth="2.8" />
      <path d="M29 11 H35" />
      <path d="M29 15 H35" />
      <path d="M29 19 H35" />
      
      {/* Left Bronchial Tree */}
      <path d="M32 22 C28 25 24 28 20 31" />
      <path d="M24 28 C21 32 19 37 18 42" strokeWidth="1.8" />
      <path d="M22 30 C20 34 21 38 23 42" strokeWidth="1.8" />
      
      {/* Right Bronchial Tree */}
      <path d="M32 22 C36 25 40 28 44 31" />
      <path d="M40 28 C43 32 45 37 46 42" strokeWidth="1.8" />
      <path d="M42 30 C44 34 43 38 41 42" strokeWidth="1.8" />
      
      {/* Left Lung Outline */}
      <path 
        d="M28 22 C25 18 20 18 16 22 C11 27 9 36 10 44 C11 51 16 55 22 55 C26 55 28 51 29 46 C30 40 29 30 29 24" 
        fill="currentColor" 
        fillOpacity="0.08"
      />
      
      {/* Right Lung Outline */}
      <path 
        d="M36 22 C39 18 44 18 48 22 C53 27 55 36 54 44 C53 51 48 55 42 55 C38 55 36 51 35 46 C34 40 35 30 35 24" 
        fill="currentColor" 
        fillOpacity="0.08"
      />
    </svg>
  );
}

// Custom Emergency Siren Icon with Radiating Beams
function EmergencySirenIcon({ className = "w-6 h-6 text-red-600" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 2 L12 4.5" strokeWidth="2.4" />
      <path d="M4.5 4.5 L6.2 6.2" strokeWidth="2.2" />
      <path d="M19.5 4.5 L17.8 6.2" strokeWidth="2.2" />
      <path d="M2 12 L4.5 12" strokeWidth="2.4" />
      <path d="M19.5 12 L22 12" strokeWidth="2.4" />
      <path d="M7 17 C7 11.2 8.6 7 12 7 C15.4 7 17 11.2 17 17 Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M5 17 H19" strokeWidth="2.5" />
      <path d="M6 17 L6 20 C6 20.6 6.4 21 7 21 H17 C17.6 21 18 20.6 18 20 L18 17" />
    </svg>
  );
}

// Custom Hospital Building with Medical Cross
function HospitalCrossIcon({ className = "w-6 h-6 text-white" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M12 7v5" strokeWidth="2.5" />
      <path d="M9.5 9.5h5" strokeWidth="2.5" />
      <path d="M9 16h1.5" />
      <path d="M13.5 16h1.5" />
    </svg>
  );
}

// Custom OPD Calendar with schedule dots
function OpdCalendarIcon({ className = "w-6 h-6 text-[#0d7377]" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="3" fill="currentColor" fillOpacity="0.1" />
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2.5" />
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2.5" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="8" cy="14" r="1.2" fill="currentColor" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      <circle cx="16" cy="14" r="1.2" fill="currentColor" />
      <circle cx="8" cy="17.5" r="1.2" fill="currentColor" />
      <circle cx="12" cy="17.5" r="1.2" fill="currentColor" />
      <circle cx="16" cy="17.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export default function DoctorProfileWebsite() {
  const profile = DOCTOR_PROFILE;

  // Modal states
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [isHospitalInfoOpen, setIsHospitalInfoOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Appointment Form state
  const [form, setForm] = useState({
    patientName: '',
    patientPhone: '',
    preferredDate: '2026-11-01',
    slot: 'Morning (10:00 AM – 1:00 PM)',
    issue: ''
  });

  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      setForm(prev => ({ ...prev, preferredDate: today }));
    } catch (e) {
      // fallback
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${profile.name} - ${profile.designation}`,
      text: `Consult with ${profile.name} (${profile.qualifications}), ${profile.designation} at ${profile.hospital.name}. Call: ${profile.phone}`,
      url: typeof window !== 'undefined' ? window.location.href : 'https://premierhospital.co.in'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareData.url, 'profile link');
        }
      }
    } else {
      copyToClipboard(shareData.url, 'profile link');
    }
  };

  const downloadVCard = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0d7377', '#14ffec', '#065f59', '#38bdf8']
    });

    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Kasundra;Avinash;;Dr.;
FN:${profile.name}
TITLE:${profile.designation}
ORG:${profile.hospital.name}
ROLE:${profile.designation}
TEL;TYPE=CELL,VOICE:${profile.phoneRaw}
TEL;TYPE=WORK,VOICE:${profile.hospital.phoneRaw}
URL:${profile.hospital.websiteUrl}
NOTE:${profile.qualifications}. ${profile.fellowship}. OPD: ${profile.opdTimings.slot1} & ${profile.opdTimings.slot2}. Emergency 24/7.
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dr_Avinash_Kasundra.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Contact card downloaded! Add to your contacts.');
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!form.patientName || !form.patientPhone) {
      showToast('Please fill patient name and phone number.');
      return;
    }

    const message = `Hello Dr. Avinash Kasundra,%0A%0AI would like to book an OPD Appointment:%0A• Patient: ${encodeURIComponent(form.patientName)}%0A• Contact: ${encodeURIComponent(form.patientPhone)}%0A• Date: ${encodeURIComponent(form.preferredDate)}%0A• Slot: ${encodeURIComponent(form.slot)}%0A• Reason/Symptoms: ${encodeURIComponent(form.issue || 'General Consultation')}%0A%0APlease confirm my appointment timing at ${encodeURIComponent(profile.hospital.name)}.`;
    
    window.open(`https://wa.me/${profile.phoneRaw.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    setIsAppointmentOpen(false);
    showToast('Opening WhatsApp to confirm appointment...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf2f5] via-[#f1f7f9] to-[#e4eef2] flex flex-col items-center justify-start sm:py-8 sm:px-4 text-slate-800">
      
      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#073b42] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border border-teal-400/40 animate-bounce">
          <Check className="w-4 h-4 text-teal-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Utilities Bar (Clean Web Experience - No Mobile Frame!) */}
      <header className="w-full max-w-[430px] sm:max-w-[460px] flex items-center justify-between px-4 py-2.5 mb-1 text-slate-600">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#09545c]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Verified Medical Profile</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={downloadVCard}
            title="Save Contact to Phone"
            className="p-2 rounded-full hover:bg-white/80 active:scale-95 text-slate-600 hover:text-[#09545c] transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsQrOpen(true)}
            title="Show QR Code"
            className="p-2 rounded-full hover:bg-white/80 active:scale-95 text-slate-600 hover:text-[#09545c] transition-all"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            title="Share Profile"
            className="p-2 rounded-full hover:bg-white/80 active:scale-95 text-slate-600 hover:text-[#09545c] transition-all"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Card Viewport - Exact Match to Reference Image, Rendered natively without mobile phone frame */}
      <main className="relative w-full max-w-[430px] sm:max-w-[460px] bg-white sm:rounded-[36px] shadow-[0_16px_50px_rgba(8,50,65,0.08)] sm:border sm:border-teal-100/80 overflow-hidden flex flex-col pb-6 transition-all">
        
        {/* 1. DOCTOR PORTRAIT HEADER */}
        <div className="relative w-full aspect-[808/584] bg-[#eaf4f7] overflow-hidden">
          <img 
            src="/assets/doctor-header-final.jpg?v=2" 
            alt="Dr. Avinash Kasundra - Pulmonologist & Intensivist" 
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />
          {/* Subtle bottom gradient to blend smoothly into the white name card */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none" />
        </div>

        {/* 2. FLOATING DOCTOR IDENTITY CARD */}
        <div className="relative z-10 -mt-10 sm:-mt-12 mx-4 sm:mx-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(6,78,89,0.10)] border border-teal-50/80 text-center">
          <h1 className="text-[22px] sm:text-[26px] font-extrabold text-[#094750] tracking-tight font-sans leading-tight">
            {profile.name}
          </h1>

          <p className="text-xs sm:text-[13px] font-medium text-slate-700 mt-2 leading-relaxed">
            {profile.qualifications}
          </p>

          <p className="text-[11px] sm:text-xs font-normal text-slate-500 mt-0.5 leading-relaxed">
            {profile.fellowship}
          </p>

          {/* Title Pill with decorative side dashes */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-[1.5px] w-6 sm:w-10 bg-teal-600/35 rounded-full"></span>
            <span className="inline-block bg-[#07535b] text-white text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm tracking-wide">
              {profile.designation}
            </span>
            <span className="h-[1.5px] w-6 sm:w-10 bg-teal-600/35 rounded-full"></span>
          </div>
        </div>

        {/* 3. CENTER PULMONOLOGY LUNGS EMBLEM */}
        <div className="flex justify-center my-3.5 sm:my-4">
          <div 
            onClick={() => setIsSpecialtiesOpen(true)}
            title="Click to view Pulmonology & Critical Care specializations"
            className="group relative cursor-pointer flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-[#e0f4f7] to-[#d2eff4] border border-cyan-200/80 shadow-[0_4px_16px_rgba(13,115,125,0.12)] hover:scale-105 active:scale-95 transition-all"
          >
            <div className="animate-breathe flex items-center justify-center">
              <PulmonologyLungsIcon className="w-8 h-8 text-[#0a6169] group-hover:text-[#064e54] transition-colors" />
            </div>
            {/* Subtle glow ring */}
            <div className="absolute inset-0 rounded-full border border-teal-400/30 animate-ping opacity-20 pointer-events-none"></div>
          </div>
        </div>

        {/* 4. THREE SIGNATURE ACTION BUTTONS */}
        <div className="w-full px-4 sm:px-5 space-y-3">
          
          {/* BUTTON 1: PHONE NUMBER */}
          <div className="relative group bg-white rounded-2xl sm:rounded-[22px] border border-slate-100 shadow-[0_6px_20px_rgba(0,40,60,0.06)] hover:shadow-[0_10px_28px_rgba(0,40,60,0.12)] transition-all duration-300 flex items-center overflow-hidden">
            {/* Left curved teal pill badge with phone icon */}
            <div className="w-14 sm:w-16 self-stretch bg-gradient-to-r from-[#07535b] to-[#0c6b75] flex items-center justify-center text-white rounded-l-2xl rounded-r-[26px] shadow-sm flex-shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>

            {/* Center Text */}
            <a 
              href={`tel:${profile.phoneRaw}`}
              className="flex-1 px-4 py-3.5 text-left flex flex-col justify-center"
            >
              <span className="text-[15px] sm:text-[17px] font-bold text-[#083e45] tracking-tight group-hover:text-[#0d7377] transition-colors">
                {profile.phone}
              </span>
            </a>

            {/* Right quick actions + Chevron */}
            <div className="flex items-center space-x-1 pr-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(profile.phone, 'phone number');
                }}
                title="Copy phone number"
                className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a 
                href={`tel:${profile.phoneRaw}`}
                className="p-1 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* BUTTON 2: PREMIER HOSPITAL & ICU */}
          <div 
            onClick={() => setIsHospitalInfoOpen(true)}
            className="cursor-pointer group bg-white rounded-2xl sm:rounded-[22px] border border-slate-100 shadow-[0_6px_20px_rgba(0,40,60,0.06)] hover:shadow-[0_10px_28px_rgba(0,40,60,0.12)] transition-all duration-300 flex items-center overflow-hidden"
          >
            {/* Left curved teal pill badge with hospital building icon */}
            <div className="w-14 sm:w-16 self-stretch bg-gradient-to-r from-[#07535b] to-[#0c6b75] flex items-center justify-center text-white rounded-l-2xl rounded-r-[26px] shadow-sm flex-shrink-0">
              <HospitalCrossIcon className="w-6 h-6 text-white" />
            </div>

            {/* Center Text */}
            <div className="flex-1 px-4 py-3 text-left flex flex-col justify-center">
              <span className="text-[15px] sm:text-[16px] font-bold text-[#083e45] leading-snug group-hover:text-[#0d7377] transition-colors">
                {profile.hospital.name}
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-slate-600 mt-0.5">
                {profile.hospital.phone}
              </span>
            </div>

            {/* Right Chevron */}
            <div className="pr-3 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          {/* BUTTON 3: OFFICIAL WEBSITE */}
          <a 
            href={profile.hospital.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl sm:rounded-[22px] border border-slate-100 shadow-[0_6px_20px_rgba(0,40,60,0.06)] hover:shadow-[0_10px_28px_rgba(0,40,60,0.12)] transition-all duration-300 flex items-center overflow-hidden"
          >
            {/* Left curved teal pill badge with globe icon */}
            <div className="w-14 sm:w-16 self-stretch bg-gradient-to-r from-[#07535b] to-[#0c6b75] flex items-center justify-center text-white rounded-l-2xl rounded-r-[26px] shadow-sm flex-shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>

            {/* Center Text */}
            <div className="flex-1 px-4 py-3.5 text-left flex flex-col justify-center">
              <span className="text-[13px] sm:text-[15px] font-bold text-[#083e45] tracking-tight group-hover:text-[#0d7377] transition-colors">
                {profile.hospital.website}
              </span>
            </div>

            {/* Right Chevron */}
            <div className="pr-3 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </a>

        </div>

        {/* 5. DUAL INFO SECTION: OPD TIMING & EMERGENCY SERVICES */}
        <div className="w-full px-4 sm:px-5 mt-3.5">
          <div className="bg-white rounded-2xl sm:rounded-[22px] border border-slate-100 shadow-[0_6px_20px_rgba(0,40,60,0.06)] p-3.5 sm:p-4 grid grid-cols-2 gap-3 divide-x divide-slate-100">
            
            {/* LEFT: OPD TIMING */}
            <div 
              onClick={() => setIsAppointmentOpen(true)}
              className="cursor-pointer group pr-2 flex flex-col justify-between"
              title="Click to book OPD appointment"
            >
              <div className="flex items-center space-x-2">
                <OpdCalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#0c6b75] flex-shrink-0" />
                <span className="text-xs sm:text-[13px] font-bold text-[#09545c]">
                  {profile.opdTimings.title}
                </span>
              </div>
              
              <div className="mt-2 text-[11px] sm:text-xs font-semibold text-slate-700 leading-tight space-y-0.5">
                <div>{profile.opdTimings.slot1} &</div>
                <div>{profile.opdTimings.slot2}</div>
              </div>

              <div className="mt-2 text-[10px] text-teal-700 font-medium group-hover:underline flex items-center">
                <span>Book Slot</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </div>
            </div>

            {/* RIGHT: EMERGENCY SERVICES */}
            <div className="pl-3 flex flex-col justify-between">
              <div className="flex items-center space-x-2">
                <EmergencySirenIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc2626] flex-shrink-0" />
                <span className="text-xs sm:text-[13px] font-bold text-[#b91c1c] leading-tight">
                  {profile.emergency.title}
                </span>
              </div>

              <div className="mt-2">
                <a
                  href={`tel:${profile.emergency.phoneRaw}`}
                  className="inline-block w-full text-center bg-[#dc2626] hover:bg-[#b91c1c] active:scale-95 text-white text-[11px] sm:text-xs font-bold py-1.5 px-2 rounded-full shadow-sm animate-siren-glow transition-all"
                  title="Call Emergency ICU 24/7"
                >
                  {profile.emergency.badge}
                </a>
              </div>

              <div className="mt-2 text-[10px] text-red-600 font-medium text-center">
                ICU Hotline Active
              </div>
            </div>

          </div>
        </div>

        {/* 6. BOTTOM ACTION BUTTONS: SAVE CONTACT & BOOK APPOINTMENT */}
        <div className="w-full px-4 sm:px-5 mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={downloadVCard}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#07535b] to-[#0c6b75] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md active:scale-98 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save Contact</span>
          </button>

          <button
            onClick={() => setIsAppointmentOpen(true)}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-white border border-[#0d7377]/40 text-[#07535b] hover:bg-teal-50/60 active:scale-98 text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4 text-[#07535b]" />
            <span>Book OPD</span>
          </button>
        </div>

        {/* 7. BOTTOM GRAPHIC WAVES */}
        <div className="relative w-full mt-4 -mb-6 overflow-hidden">
          <img 
            src="/assets/bottom-waves-upscaled.png" 
            alt="Medical teal waves footer" 
            className="w-full h-auto object-cover select-none pointer-events-none opacity-95"
          />
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-[430px] sm:max-w-[460px] text-center mt-5 text-xs text-slate-500 space-y-1">
        <p className="font-medium text-slate-600">
          Dr. Avinash Kasundra &bull; {profile.hospital.name}
        </p>
        <p className="text-[11px] text-slate-400">
          &copy; 2026 All Rights Reserved &bull; Official Digital Visiting Card
        </p>
      </footer>

      {/* MODAL 1: BOOK OPD APPOINTMENT */}
      {isAppointmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-teal-100 text-slate-800">
            <button
              onClick={() => setIsAppointmentOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-[#07535b]">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#094750]">Book OPD Appointment</h3>
                <p className="text-xs text-slate-500">{profile.name} &bull; {profile.hospital.name}</p>
              </div>
            </div>

            <form onSubmit={handleAppointmentSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. 9876543210"
                  value={form.patientPhone}
                  onChange={(e) => setForm({ ...form, patientPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input 
                    type="date" 
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    OPD Time Slot
                  </label>
                  <select 
                    value={form.slot}
                    onChange={(e) => setForm({ ...form, slot: e.target.value })}
                    className="w-full px-2 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Health Issue / Reason (Optional)
                </label>
                <textarea 
                  rows={2}
                  placeholder="e.g. Persistent cough, breathing difficulty, chest congestion..."
                  value={form.issue}
                  onChange={(e) => setForm({ ...form, issue: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#07535b] to-[#0c6b75] hover:from-[#064249] hover:to-[#0a5a63] text-white font-semibold rounded-xl text-sm shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>Send Request via WhatsApp</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Direct message to Dr. Avinash Kasundra's OPD reception.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: HOSPITAL INFO & DIRECTIONS */}
      {isHospitalInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-teal-100 text-slate-800">
            <button
              onClick={() => setIsHospitalInfoOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-[#07535b]">
                <HospitalCrossIcon className="w-7 h-7 text-[#07535b]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#094750]">{profile.hospital.name}</h3>
                <p className="text-xs text-slate-500">Multispeciality Hospital & Advanced ICU Care</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-3">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-500">Hospital Reception / ICU</div>
                  <a href={`tel:${profile.hospital.phoneRaw}`} className="text-sm font-bold text-[#083e45] hover:underline">
                    {profile.hospital.phone}
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-3">
                <Globe className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-500">Official Portal</div>
                  <a href={profile.hospital.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#083e45] hover:underline">
                    {profile.hospital.website}
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start space-x-3">
                <Clock className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-500">Doctor's OPD Hours</div>
                  <div className="text-sm font-semibold text-slate-800">
                    {profile.opdTimings.slot1} & {profile.opdTimings.slot2}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{profile.opdTimings.days}</div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={`tel:${profile.hospital.phoneRaw}`}
                className="py-2.5 px-3 bg-[#07535b] text-white text-xs sm:text-sm font-semibold rounded-xl text-center shadow-sm flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hospital</span>
              </a>

              <a
                href={profile.hospital.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl text-center flex items-center justify-center space-x-1.5"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SPECIALTIES & CLINICAL EXPERTISE */}
      {isSpecialtiesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-teal-100 text-slate-800 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setIsSpecialtiesOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center text-[#07535b]">
                <PulmonologyLungsIcon className="w-7 h-7 text-[#07535b]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#094750]">Clinical Specializations</h3>
                <p className="text-xs text-slate-500">{profile.name}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Dr. Avinash Kasundra specializes in advanced pulmonology, critical care medicine, and interventional pulmonary procedures with extensive experience from Lilavati Hospital, Mumbai.
            </p>

            <div className="space-y-3">
              {profile.specialties.map((spec, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-2 text-sm font-bold text-[#094750]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>{spec.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 pl-3.5 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <button
                onClick={() => {
                  setIsSpecialtiesOpen(false);
                  setIsAppointmentOpen(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#07535b] to-[#0c6b75] text-white font-semibold rounded-xl text-sm shadow-md transition-all active:scale-98"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: QR CODE */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-teal-100 text-center">
            <button
              onClick={() => setIsQrOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-50 mx-auto flex items-center justify-center text-[#07535b] mb-3">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-[#094750]">Scan Digital Visiting Card</h3>
            <p className="text-xs text-slate-500 mb-4">{profile.name} &bull; {profile.hospital.name}</p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block mx-auto mb-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://premierhospital.co.in')}`}
                alt="QR Code" 
                className="w-44 h-44 rounded-lg"
              />
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Point your smartphone camera to instantly save contact details and open this card.
            </p>

            <button
              onClick={handleShare}
              className="w-full py-2.5 bg-[#07535b] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm"
            >
              Share Card Link
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
