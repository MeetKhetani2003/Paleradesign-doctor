import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Globe, 
  Award, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  X, 
  Send, 
  CheckCircle2, 
  Loader2, 
  GraduationCap, 
  HeartPulse, 
  Wind, 
  Activity, 
  Share2,
  Wifi,
  Battery
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOSPITAL_CONFIG } from './config';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQualsOpen, setIsQualsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('9:41');
  const [currentStatus, setCurrentStatus] = useState({
    isOpen: false,
    label: 'Checking status...'
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: 'Morning: 10:00 AM – 1:00 PM',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle');
  const [token, setToken] = useState('');

  // Live IST clock and OPD status calculation
  useEffect(() => {
    const updateTimeAndStatus = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      
      // Update phone status bar time in IST format (HH:MM)
      const hours12 = istTime.getHours() % 12 || 12;
      const mins = istTime.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours12}:${mins}`);

      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      const day = istTime.getDay();

      if (day === 0) {
        setCurrentStatus({ isOpen: false, label: 'OPD Closed Today (Sunday) &bull; ICU Open 24/7' });
        return;
      }

      if (timeInMinutes >= 600 && timeInMinutes <= 780) {
        setCurrentStatus({ isOpen: true, label: 'OPD Open Now &bull; Morning (10 AM – 1 PM)' });
      } else if (timeInMinutes >= 1020 && timeInMinutes <= 1200) {
        setCurrentStatus({ isOpen: true, label: 'OPD Open Now &bull; Evening (5 PM – 8 PM)' });
      } else {
        const nextTime = timeInMinutes < 600 ? 'Opens 10 AM' : (timeInMinutes < 1020 ? 'Opens 5 PM' : 'Opens Tomorrow 10 AM');
        setCurrentStatus({ isOpen: false, label: `OPD Closed &bull; ${nextTime} (24/7 ICU)` });
      }
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Enter valid 10-digit Indian number';
    }
    if (!formData.appointmentDate) errs.appointmentDate = 'Select date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');
    const genToken = `PK-${Math.floor(100000 + Math.random() * 900000)}`;
    setToken(genToken);

    try {
      await fetch(HOSPITAL_CONFIG.emailService.formSubmitEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `OPD Inquiry: ${formData.fullName} (${formData.appointmentDate})`,
          ...formData,
          token: genToken,
          submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });
    } catch (err) {}

    setFormStatus('success');
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dr. Avinash Kasundra | Premier Hospital & ICU',
        text: 'Consultant Intensivist & Pulmonologist at Premier Hospital & ICU, Rajkot.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#030712] text-white flex justify-center py-0 sm:py-6 px-0 sm:px-4 selection:bg-[#263F91] selection:text-white font-sans relative overflow-x-hidden">
      
      {/* 1. CINEMATIC HIGH-END MEDICAL BACKGROUND WITH PULSE & BOKEH */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Layer 1: Photographic Clinical SVG Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-85 transition-opacity"
          style={{ backgroundImage: `url('./assets/medical-bg.svg')` }}
        ></div>

        {/* Layer 2: Deep Dark Vignette for Ultra Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-transparent to-[#030712]/90"></div>

        {/* Layer 3: Dynamic Luminous Radial Spotlights */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] bg-gradient-to-b from-[#263F91]/40 via-blue-600/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* 2. SMARTPHONE DEVICE SHELL (MATCHING REFERENCE SCREENSHOT) */}
      <main className="relative z-10 w-full max-w-[430px] sm:my-auto bg-[#071126]/90 sm:backdrop-blur-xl sm:rounded-[48px] sm:border-[5px] sm:border-slate-800/80 sm:shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(38,63,145,0.25)] flex flex-col items-center overflow-hidden pb-8">
        
        {/* Top Speaker Notch & Status Bar (iPhone aesthetic from reference) */}
        <div className="w-full pt-3 px-7 pb-1 flex items-center justify-between text-xs text-white/90 select-none">
          <span className="font-semibold tracking-tight text-xs">{currentTime}</span>

          {/* Dynamic Island / Speaker Pill */}
          <div className="hidden sm:block w-24 h-4 bg-black rounded-full border border-white/10 shadow-inner"></div>

          {/* Cellular, Wifi & Battery Icons */}
          <div className="flex items-center gap-1.5 text-white/80">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-1.5 bg-white rounded-xs"></span>
              <span className="w-0.5 h-2 bg-white rounded-xs"></span>
              <span className="w-0.5 h-2.5 bg-white rounded-xs"></span>
              <span className="w-0.5 h-3 bg-white rounded-xs"></span>
            </div>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Live OPD Status Bar & Share Action */}
        <div className="w-full flex items-center justify-between px-5 pt-3 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-300 shadow-md">
            <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span dangerouslySetInnerHTML={{ __html: currentStatus.label }} />
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Share Profile"
            aria-label="Share profile link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Glowing Circular Avatar (Reference image design) */}
        <div className="relative mt-4 mb-3">
          {/* Dual-tone glowing ring */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#263F91] via-blue-400 to-amber-300 opacity-90 blur-xs"></div>
          
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-b from-white/40 via-white/10 to-transparent border border-white/30 shadow-2xl">
            <img
              src={HOSPITAL_CONFIG.assets.doctorPortrait}
              alt="Dr. Avinash Kasundra"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>

          {/* Lilavati Fellow Badge */}
          <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-fit bg-gradient-to-r from-[#263F91] via-[#1d357d] to-[#152B56] text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-0.5 rounded-full border border-blue-300/50 shadow-lg flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-300" />
            <span>Lilavati Fellow</span>
          </div>
        </div>

        {/* Doctor Header & Hospital Branding */}
        <div className="text-center px-4 space-y-1 mt-2">
          <h1 className="text-2xl sm:text-[26px] font-black text-white tracking-tight font-heading drop-shadow-md">
            Dr. Avinash Kasundra
          </h1>

          <p className="text-xs sm:text-sm font-bold text-blue-300 tracking-wide">
            Consultant Intensivist &amp; Pulmonologist
          </p>

          <p className="text-[11px] text-slate-300/90 font-medium">
            MBBS, MD (Respiratory Medicine) &bull; Critical Care (Mumbai)
          </p>

          {/* Hospital Logo inside White Pill */}
          <div className="pt-2 flex items-center justify-center">
            <div className="bg-white/95 px-4 py-1.5 rounded-xl shadow-lg border border-white/40 inline-flex items-center gap-2">
              <img
                src={HOSPITAL_CONFIG.assets.logo}
                alt="Premier Hospital & ICU"
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* 4 Action Circles (Call, WhatsApp, 24/7 ICU, Maps) */}
        <div className="flex items-center justify-center gap-3.5 my-4 px-4">
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border border-blue-400/40"
            title="Call Doctor directly"
            aria-label="Call Doctor"
          >
            <Phone className="w-5 h-5" />
          </a>

          <a
            href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border border-green-300/40"
            title="Chat on WhatsApp"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-5 h-5" />
          </a>

          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border border-red-400/40 relative"
            title="24/7 ICU Emergency Helpline"
            aria-label="24/7 Emergency"
          >
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
            <ShieldAlert className="w-5 h-5" />
          </a>

          <a
            href={HOSPITAL_CONFIG.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform border border-amber-300/40"
            title="Google Maps Location"
            aria-label="Location"
          >
            <MapPin className="w-5 h-5" />
          </a>
        </div>

        {/* 7 SIGNATURE RICH INTERACTIVE LINK PILLS */}
        <div className="w-full space-y-2.5 px-3">
          
          {/* Pill 1: Book OPD Appointment */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#D97706]/95 via-[#B45309]/85 to-[#78350F]/95 border border-amber-400/40 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide">
                  Book an OPD Appointment
                </span>
                <span className="text-[10px] sm:text-[11px] text-amber-100 font-medium block">
                  Morning: 10–1 PM &bull; Evening: 5–8 PM
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-amber-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Pill 2: Chat on WhatsApp */}
          <a
            href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#059669]/95 via-[#047857]/85 to-[#065F46]/95 border border-emerald-400/40 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide">
                  Chat on WhatsApp
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-100 font-medium block">
                  Fastest Appointment Inquiry
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-emerald-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </a>

          {/* Pill 3: 24/7 ICU Emergency Helpline */}
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#DC2626]/95 via-[#B91C1C]/85 to-[#7F1D1D]/95 border border-red-400/40 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide flex items-center gap-1.5">
                  <span>24/7 ICU Emergency Helpline</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-red-100 font-medium block">
                  {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay} &bull; Trauma &amp; ICU Care
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-red-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </a>

          {/* Pill 4: Call Doctor Directly */}
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#2563EB]/95 via-[#1D4ED8]/85 to-[#1E3A8A]/95 border border-blue-400/40 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide">
                  Call Doctor Directly
                </span>
                <span className="text-[10px] sm:text-[11px] text-blue-100 font-medium block">
                  {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay} &bull; Consultations
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </a>

          {/* Pill 5: Qualifications & Lilavati Fellowship */}
          <button
            onClick={() => setIsQualsOpen(true)}
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#7C3AED]/95 via-[#6D28D9]/85 to-[#4C1D95]/95 border border-purple-400/40 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide">
                  Qualifications &amp; Fellowship
                </span>
                <span className="text-[10px] sm:text-[11px] text-purple-100 font-medium block">
                  MBBS, MD (Respiratory), Lilavati Fellow
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-purple-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          {/* Pill 6: Hospital Location & Directions */}
          <a
            href={HOSPITAL_CONFIG.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#0D9488]/95 via-[#0F766E]/85 to-[#115E59]/95 border border-teal-400/40 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide">
                  Hospital Location &amp; Directions
                </span>
                <span className="text-[10px] sm:text-[11px] text-teal-100 font-medium block">
                  1st &amp; 7th Floor, RK Prime Plus, Rajkot
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-teal-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </a>

          {/* Pill 7: Hospital Website */}
          <a
            href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-[#475569]/95 via-[#334155]/85 to-[#1E293B]/95 border border-slate-400/30 shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-white block font-heading tracking-wide">
                  Premier Hospital &amp; ICU Website
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-200 font-medium block">
                  www.premierhospital.co.in &bull; Facilities
                </span>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-colors shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </a>

        </div>

        {/* 4 Bottom Highlights Grid */}
        <div className="w-full mt-5 grid grid-cols-4 gap-1.5 px-3">
          <div className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-center space-y-1">
            <HeartPulse className="w-3.5 h-3.5 text-red-400 mx-auto" />
            <span className="text-[9px] font-bold text-slate-200 block leading-tight">Critical Care</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-center space-y-1">
            <Wind className="w-3.5 h-3.5 text-blue-400 mx-auto" />
            <span className="text-[9px] font-bold text-slate-200 block leading-tight">Pulmonology</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-center space-y-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400 mx-auto" />
            <span className="text-[9px] font-bold text-slate-200 block leading-tight">Ventilation</span>
          </div>

          <div className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-center space-y-1">
            <Award className="w-3.5 h-3.5 text-amber-400 mx-auto" />
            <span className="text-[9px] font-bold text-slate-200 block leading-tight">Lilavati Fellow</span>
          </div>
        </div>

        {/* Slogan & Footer */}
        <div className="mt-4 mb-1 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-semibold text-slate-400 uppercase tracking-widest text-center">
          Premier Hospital &amp; ICU &bull; Rajkot
        </div>

        <p className="text-[9px] text-slate-500 text-center">
          &copy; {new Date().getFullYear()} Dr. Avinash Kasundra. All rights reserved.
        </p>

      </main>

      {/* MODAL: BOOK APPOINTMENT */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3">
          <div className="relative bg-[#0a1329] text-white w-full max-w-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-[#263F91] to-[#152B56] p-4 flex items-center justify-between border-b border-white/10">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-blue-300 block">
                  Premier Hospital &amp; ICU
                </span>
                <h3 className="text-sm font-bold font-heading">
                  Book OPD Appointment
                </h3>
              </div>
              <button
                onClick={() => setIsBookingOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {formStatus === 'success' ? (
                <div className="text-center py-3 space-y-2.5">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold">Inquiry Transmitted!</h4>
                  <p className="text-xs text-slate-300">
                    Token: <strong className="text-white font-mono">#{token}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Hospital staff will call you shortly to confirm your scheduled consultation slot.
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    <a
                      href={HOSPITAL_CONFIG.whatsapp.generateUrl({
                        name: formData.fullName,
                        date: formData.appointmentDate,
                        time: formData.appointmentTime,
                        phone: formData.phone,
                        reason: formData.reason
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-xl transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send to WhatsApp for Instant Priority</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsBookingOpen(false);
                        setFormStatus('idle');
                      }}
                      className="text-xs text-slate-400 hover:text-white py-1"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/15 text-white focus:border-blue-400 focus:outline-none"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-400 mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Mobile Number (Indian 10-digit) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="98250 12345"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/15 text-white focus:border-blue-400 focus:outline-none"
                    />
                    {errors.phone && <p className="text-[10px] text-red-400 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        min={todayDateString}
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 text-xs rounded-xl bg-slate-900 border border-white/15 text-white focus:border-blue-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        OPD Session
                      </label>
                      <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                        className="w-full px-2 py-1.5 text-xs rounded-xl bg-slate-900 border border-white/15 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="Morning: 10:00 AM – 1:00 PM">Morning (10–1 PM)</option>
                        <option value="Evening: 5:00 PM – 8:00 PM">Evening (5–8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Reason for Consultation (optional)
                    </label>
                    <input
                      type="text"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="e.g. Asthma, cough, post-ICU review"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-white/15 text-white focus:border-blue-400 focus:outline-none"
                    />
                  </div>

                  <div className="pt-1 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-[#263F91] hover:bg-blue-600 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <span>Send Appointment Request</span>
                      )}
                    </button>

                    <a
                      href={HOSPITAL_CONFIG.whatsapp.generateUrl({
                        name: formData.fullName,
                        date: formData.appointmentDate,
                        time: formData.appointmentTime,
                        phone: formData.phone,
                        reason: formData.reason
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Book Instantly via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* MODAL: QUALIFICATIONS */}
      {isQualsOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3">
          <div className="relative bg-[#0a1329] text-white w-full max-w-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-purple-200 block">
                    Verified Credentials
                  </span>
                  <h3 className="text-sm font-bold font-heading">
                    Education &amp; Fellowships
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsQualsOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider block">Super-Specialty Fellowship</span>
                <h4 className="text-xs font-bold text-white">Fellowship in Critical Care Medicine</h4>
                <p className="text-[11px] font-semibold text-purple-200">Lilavati Hospital – Mumbai</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Advanced critical care training: mechanical ventilation, ARDS, septic shock, and multi-organ life support.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">Postgraduate Degree</span>
                <h4 className="text-xs font-bold text-white">MD (Respiratory Medicine)</h4>
                <p className="text-[10px] text-slate-400">
                  Specialized clinical training in pulmonary ailments, chronic asthma, COPD, pneumonia, and chest diseases.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider block">Medical Graduation</span>
                <h4 className="text-xs font-bold text-white">MBBS</h4>
                <p className="text-[10px] text-slate-400">
                  Bachelor of Medicine &amp; Bachelor of Surgery &bull; Clinical rotations and internship.
                </p>
              </div>

              <button
                onClick={() => setIsQualsOpen(false)}
                className="w-full mt-1 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
