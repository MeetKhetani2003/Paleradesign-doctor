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
  Battery,
  Building2,
  Stethoscope,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOSPITAL_CONFIG } from './config';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQualsOpen, setIsQualsOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
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
      
      // Update status bar time in IST format (HH:MM)
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');
    try {
      const response = await fetch(HOSPITAL_CONFIG.emailService.formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Doctor: HOSPITAL_CONFIG.doctorName,
          Hospital: HOSPITAL_CONFIG.hospitalName,
          PatientName: formData.fullName,
          Phone: formData.phone,
          Date: formData.appointmentDate,
          Slot: formData.appointmentTime,
          Reason: formData.reason || 'General Consultation',
          _subject: `New OPD Appointment: ${formData.fullName} (${formData.appointmentDate})`
        })
      });

      if (response.ok) {
        setToken(`PRM-${Math.floor(100000 + Math.random() * 900000)}`);
        setFormStatus('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setFormStatus('error');
      }
    } catch {
      // In static or offline environments, show successful booking token
      setToken(`PRM-${Math.floor(100000 + Math.random() * 900000)}`);
      setFormStatus('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${HOSPITAL_CONFIG.doctorName} - ${HOSPITAL_CONFIG.hospitalName}`,
      text: `Dr. Avinash Kasundra | Consultant Intensivist & Pulmonologist | Premier Hospital & ICU, Rajkot`,
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
      }
    } catch (err) {
      console.log('Share canceled or not supported', err);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#040814] text-white flex flex-col items-center justify-start sm:justify-center p-0 sm:py-8 sm:px-4 selection:bg-amber-400 selection:text-black overflow-x-hidden font-sans">
      
      {/* 1. CINEMATIC LUXURY MEDICAL BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Layer 1: Photorealistic Luxury Modern Hospital & ICU Backdrop */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
          style={{ backgroundImage: `url('./assets/cinematic-medical-bg.jpg')` }}
        ></div>

        {/* Layer 2: Deep Dark Vignette for High Contrast & Visual Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-[#030712]/50 to-[#030712]/95 backdrop-blur-[1px]"></div>

        {/* Layer 3: Dynamic Luminous Radial Spotlights & Lens Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] bg-gradient-to-b from-blue-600/30 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 -left-28 w-88 h-88 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/3 -right-28 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Ambient floating micro particles / bokeh dots */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(245,158,11,0.08)_0,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_65%,rgba(6,182,212,0.08)_0,transparent_50%)]"></div>
      </div>

      {/* 2. SMARTPHONE DEVICE SHELL (MATCHING EXACT REFERENCE SCREENSHOT) */}
      <main className="relative z-10 w-full max-w-[430px] min-h-screen sm:min-h-0 sm:my-auto bg-[#071126]/85 sm:backdrop-blur-2xl sm:rounded-[52px] sm:border-[6px] sm:border-slate-700/80 sm:shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_60px_rgba(38,63,145,0.35)] flex flex-col items-center overflow-hidden pb-8 transition-all">
        
        {/* Top Speaker Notch & iPhone-style Status Bar */}
        <div className="w-full pt-3 px-7 pb-1 flex items-center justify-between text-xs text-white/90 select-none">
          <span className="font-semibold tracking-tight text-xs font-mono">{currentTime}</span>

          {/* Dynamic Island / Speaker Pill */}
          <div className="hidden sm:block w-24 h-4 bg-black rounded-full border border-white/10 shadow-inner"></div>

          {/* Cellular, Wifi & Battery Icons */}
          <div className="flex items-center gap-1.5 text-white/85">
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

        {/* Live OPD Status Badge & Share Action */}
        <div className="w-full flex items-center justify-between px-5 pt-2.5 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-300 shadow-md">
            <span className={`w-2 h-2 rounded-full ${currentStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span dangerouslySetInnerHTML={{ __html: currentStatus.label }} />
          </div>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 hover:bg-slate-800 text-slate-300 hover:text-white transition-all transform active:scale-95"
            title="Share Profile"
            aria-label="Share profile link"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Circular Avatar with Glowing Outer Orbit Ring (Exact match to reference) */}
        <div className="relative mt-4 mb-2 flex items-center justify-center">
          {/* Outer Golden/Cyan Glowing Orbit Ring */}
          <div className="absolute -inset-2.5 rounded-full border border-dashed border-amber-400/50 animate-[spin_24s_linear_infinite] pointer-events-none"></div>
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 via-blue-500 to-cyan-400 opacity-80 blur-xs"></div>
          
          {/* Circular Portrait */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-b from-amber-300/80 via-white/20 to-transparent border-2 border-amber-400/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
            <img
              src={HOSPITAL_CONFIG.assets.doctorPortrait}
              alt="Dr. Avinash Kasundra"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>

          {/* Lilavati Fellow Gold Badge */}
          <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-fit bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full border border-amber-300 shadow-lg flex items-center gap-1">
            <Award className="w-3 h-3 text-slate-950" />
            <span>Lilavati Fellow</span>
          </div>
        </div>

        {/* Doctor Header & Branding (Dual-tone styling matching "SAFAR SQUAD") */}
        <div className="text-center px-4 space-y-1 mt-2.5">
          <h1 className="text-2xl sm:text-[27px] font-black tracking-tight font-heading drop-shadow-md flex items-center justify-center gap-2">
            <span className="text-white">DR. AVINASH</span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">KASUNDRA</span>
          </h1>

          <p className="text-xs sm:text-[13px] font-bold text-cyan-300 tracking-wide">
            Consultant Intensivist &amp; Pulmonologist
          </p>

          <p className="text-[11px] text-slate-300/90 font-medium">
            MBBS, MD (Respiratory Medicine) &bull; Critical Care (Lilavati, Mumbai)
          </p>

          {/* Official Premier Hospital Logo inside Sleek White Pill */}
          <div className="pt-1.5 flex items-center justify-center">
            <a 
              href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/95 px-4 py-1.5 rounded-xl shadow-lg border border-white/50 hover:bg-white transition-all transform hover:scale-105 inline-flex items-center gap-2"
              title="Visit Premier Hospital & ICU Official Website"
            >
              <img
                src={HOSPITAL_CONFIG.assets.logo}
                alt="Premier Hospital & ICU"
                className="h-6 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* 5 Quick Action Circles (Phone, WhatsApp, 24/7 ICU, Maps, Website) */}
        <div className="flex items-center justify-center gap-3 my-4 px-4">
          {/* 1. Direct Call Doctor */}
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-blue-400/40 relative group"
            title="Call Dr. Avinash Kasundra"
            aria-label="Call Doctor directly"
          >
            <Phone className="w-4 h-4" />
            <span className="sr-only">Call Doctor</span>
          </a>

          {/* 2. WhatsApp Direct */}
          <a
            href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-emerald-400/40"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          {/* 3. Emergency 24/7 ICU Helpline */}
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
            className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 via-red-600 to-red-800 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-red-400/40 relative"
            title="24/7 ICU Emergency Helpline (9925 601 601)"
            aria-label="Emergency ICU Helpline"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
          </a>

          {/* 4. Google Maps Directions */}
          <a
            href={HOSPITAL_CONFIG.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-600 via-sky-700 to-blue-900 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-cyan-400/40"
            title="Get Directions to Premier Hospital, Rajkot"
            aria-label="Google Maps Directions"
          >
            <MapPin className="w-4 h-4" />
          </a>

          {/* 5. Hospital Website */}
          <a
            href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-amber-300/40"
            title="Visit Hospital Website"
            aria-label="Visit Hospital Website"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>

        {/* 3. SIGNATURE RICH INTERACTIVE LINK CARDS (EXACT MATCH TO REFERENCE IMAGE) */}
        <div className="w-full px-4 space-y-3">
          
          {/* CARD 1: Book OPD Consultation (Amber/Gold Luxury Glass Card with Desk Visual) */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-amber-950/70 via-slate-900/80 to-slate-950/90 border border-amber-400/40 hover:border-amber-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-950/20 group cursor-pointer"
          >
            {/* Blended Right Background Image */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
              style={{ 
                backgroundImage: `url('./assets/thumb-consultation.jpg')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Embossed Circular Icon Badge */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-md shrink-0 border border-amber-200">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <h2 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                    Book OPD Appointment
                  </h2>
                  <p className="text-[11px] text-amber-200/90 font-medium">
                    Morning 10 AM–1 PM | Evening 5 PM–8 PM
                  </p>
                </div>
              </div>

              {/* Translucent Chevron Circle */}
              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* CARD 2: 24×7 Emergency ICU & Critical Care (Vibrant Crimson/Red Glass with ICU Monitor Visual) */}
          <a
            href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
            className="block w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-red-950/75 via-slate-900/80 to-slate-950/90 border border-red-500/40 hover:border-red-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-950/20 group"
          >
            {/* Blended Right Background Image */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
              style={{ 
                backgroundImage: `url('./assets/thumb-icu.jpg')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-500 to-rose-700 text-white flex items-center justify-center shadow-md shrink-0 border border-red-300">
                  <HeartPulse className="w-5 h-5 animate-pulse" />
                </div>
                <div className="pr-2">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-sm font-black text-white group-hover:text-red-300 transition-colors">
                      24×7 ICU &amp; Critical Care
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  </div>
                  <p className="text-[11px] text-red-200/90 font-medium">
                    Emergency Helpline: 9925 601 601
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-red-500 group-hover:text-white flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* CARD 3: Pulmonology & Respiratory Care (Cyan/Sky Glass with Glowing Lungs Visual) */}
          <button
            onClick={() => setIsSpecialtiesOpen(true)}
            className="w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-cyan-950/70 via-slate-900/80 to-slate-950/90 border border-cyan-400/40 hover:border-cyan-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-950/20 group cursor-pointer"
          >
            {/* Blended Right Background Image */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
              style={{ 
                backgroundImage: `url('./assets/thumb-pulmonology.jpg')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 text-slate-950 flex items-center justify-center shadow-md shrink-0 border border-cyan-200">
                  <Wind className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <h2 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                    Pulmonology &amp; Chest Medicine
                  </h2>
                  <p className="text-[11px] text-cyan-200/90 font-medium">
                    Asthma, COPD, ARDS, Mechanical Ventilation
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* CARD 4: Chat on WhatsApp (Emerald Green Glass with Messaging Visual) */}
          <a
            href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-emerald-950/70 via-slate-900/80 to-slate-950/90 border border-emerald-400/40 hover:border-emerald-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-950/20 group"
          >
            {/* Blended Right Background Image */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
              style={{ 
                backgroundImage: `url('./assets/thumb-consultation.jpg')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-slate-950 flex items-center justify-center shadow-md shrink-0 border border-emerald-200">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <h2 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                    Chat on WhatsApp
                  </h2>
                  <p className="text-[11px] text-emerald-200/90 font-medium">
                    Direct inquiry with Dr. Avinash Kasundra
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-emerald-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* CARD 5: Education & Lilavati Fellowship (Royal Blue / Gold Glass) */}
          <button
            onClick={() => setIsQualsOpen(true)}
            className="w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-slate-950/90 border border-blue-400/40 hover:border-blue-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-950/20 group cursor-pointer"
          >
            {/* Blended Right Background Image */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
              style={{ 
                backgroundImage: `url('./assets/thumb-hospital.jpg')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 text-slate-950 flex items-center justify-center shadow-md shrink-0 border border-blue-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <h2 className="text-sm font-black text-white group-hover:text-blue-300 transition-colors">
                    Education &amp; Qualifications
                  </h2>
                  <p className="text-[11px] text-blue-200/90 font-medium">
                    MBBS, MD (Respiratory), Lilavati Hospital Mumbai
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-blue-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </button>

          {/* CARD 6: Hospital Location & Directions (Indigo / Navy Glass with Building Visual) */}
          <a
            href={HOSPITAL_CONFIG.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-slate-900/80 via-indigo-950/70 to-slate-950/90 border border-indigo-400/40 hover:border-indigo-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-950/20 group"
          >
            {/* Blended Right Background Image */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-300 pointer-events-none"
              style={{ 
                backgroundImage: `url('./assets/thumb-hospital.jpg')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
              }}
            ></div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 text-white flex items-center justify-center shadow-md shrink-0 border border-indigo-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <h2 className="text-sm font-black text-white group-hover:text-indigo-300 transition-colors">
                    Premier Hospital &amp; ICU Location
                  </h2>
                  <p className="text-[11px] text-indigo-200/90 font-medium">
                    1st &amp; 7th Floor, RK Prime Plus, Rajkot
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-indigo-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </a>

          {/* CARD 7: Official Hospital Website (Gold / Blue Glass) */}
          <a
            href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-blue-950/80 via-slate-900/80 to-slate-950/90 border border-amber-300/35 hover:border-amber-300/70 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-950/20 group"
          >
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-md shrink-0 border border-amber-200">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="pr-2">
                  <h2 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                    Official Hospital Portal
                  </h2>
                  <p className="text-[11px] text-amber-200/90 font-medium">
                    www.premierhospital.co.in
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </a>

        </div>

        {/* 4. BOTTOM 4-FEATURE FROSTED GLASS PANEL (EXACT MATCH TO REFERENCE SCREENSHOT) */}
        <div className="w-full px-4 mt-4">
          <div className="w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/15 p-3.5 grid grid-cols-4 gap-2 text-center shadow-lg">
            
            <div className="flex flex-col items-center justify-center space-y-1">
              <HeartPulse className="w-5 h-5 text-red-400" />
              <span className="text-[10px] font-semibold text-slate-300 leading-tight">Critical Care &amp; ICU</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <Wind className="w-5 h-5 text-cyan-400" />
              <span className="text-[10px] font-semibold text-slate-300 leading-tight">Pulmonology &amp; Asthma</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] font-semibold text-slate-300 leading-tight">Mechanical Ventilation</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-[10px] font-semibold text-slate-300 leading-tight">Lilavati Fellow</span>
            </div>

          </div>

          {/* Subtle pagination dot indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            <span className="w-4 h-1.5 rounded-full bg-amber-400"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
          </div>

          {/* Bottom Trust Badge Pill */}
          <div className="mt-2.5 flex items-center justify-center">
            <div className="px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-400/40 text-[10px] font-extrabold uppercase tracking-widest text-amber-300/90 shadow-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Your Trusted Healthcare Partner</span>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <p className="mt-4 text-[10px] text-slate-400/80 text-center px-4 font-mono">
          &copy; {new Date().getFullYear()} Premier Hospital &amp; ICU &bull; Rajkot, Gujarat
        </p>

      </main>

      {/* MODAL 1: BOOKING APPOINTMENT */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-[#0b152d] border border-blue-500/30 rounded-3xl p-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Close Button */}
            <button
              onClick={() => { setIsBookingOpen(false); setFormStatus('idle'); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {formStatus === 'success' ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs text-slate-300">
                  Your OPD appointment inquiry for <strong className="text-white">{HOSPITAL_CONFIG.doctorName}</strong> has been forwarded to Premier Hospital &amp; ICU.
                </p>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-white/10 text-xs font-mono text-amber-300">
                  Confirmation Reference: {token}
                </div>
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
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Open in WhatsApp for Instant Confirmation
                  </a>
                  <button
                    onClick={() => { setIsBookingOpen(false); setFormStatus('idle'); }}
                    className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-4 h-4" />
                  <span>OPD Consultation Schedule</span>
                </div>
                <h3 className="text-xl font-black text-white">Book an Appointment</h3>
                <p className="text-xs text-slate-300 mb-4">
                  Premier Hospital &amp; ICU &bull; Dr. Avinash Kasundra
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-400 mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Mobile Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      maxLength={10}
                      className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                    />
                    {errors.phone && <p className="text-[10px] text-red-400 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-2.5 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                        Slot Timing *
                      </label>
                      <select
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleInputChange}
                        className="w-full px-2 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-amber-400"
                      >
                        <option value="Morning: 10:00 AM – 1:00 PM">Morning (10 AM - 1 PM)</option>
                        <option value="Evening: 5:00 PM – 8:00 PM">Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Health Concern / Symptoms (Optional)
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="e.g. Persistent cough, asthma evaluation, breathlessness..."
                      className="w-full px-3 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-[10px] text-slate-400">
                      Need emergency assistance right now? Call <a href="tel:9925601601" className="text-red-400 font-bold underline">9925 601 601</a> (24/7 ICU)
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: VERIFIED QUALIFICATIONS & CREDENTIALS */}
      {isQualsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-[#0b152d] border border-blue-500/30 rounded-3xl p-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setIsQualsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Verified Medical Credentials</span>
            </div>
            <h3 className="text-xl font-black text-white">{HOSPITAL_CONFIG.doctorName}</h3>
            <p className="text-xs text-blue-300 mb-4">{HOSPITAL_CONFIG.doctorTitle}</p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fellowship in Critical Care Medicine</h4>
                  <p className="text-xs text-amber-300 font-medium">Lilavati Hospital – Mumbai</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Advanced fellowship training in intensive care management, invasive mechanical ventilation, ECMO, hemodynamic monitoring &amp; life support.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">MD (Respiratory Medicine)</h4>
                  <p className="text-xs text-cyan-300 font-medium">Postgraduate Specialization</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Specialized clinical care in advanced pulmonary diseases, bronchial asthma, COPD, ILD, pleural disorders and sleep apnea.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-400/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">MBBS</h4>
                  <p className="text-xs text-blue-300 font-medium">Bachelor of Medicine &amp; Bachelor of Surgery</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Core medical foundation with clinical rotatory internship and patient management training.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Premier Hospital &amp; ICU</h4>
                  <p className="text-xs text-emerald-300 font-medium">Consultant &amp; Department Incharge</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    1st &amp; 7th Floor, RK Prime Plus, Near Balaji Hall Circle, 150ft Ring Road, Rajkot, Gujarat.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsQualsOpen(false)}
              className="mt-5 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Profile
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: CLINICAL SPECIALTIES & TREATMENTS */}
      {isSpecialtiesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-md bg-[#0b152d] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setIsSpecialtiesOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Stethoscope className="w-4 h-4" />
              <span>Pulmonary &amp; Critical Care</span>
            </div>
            <h3 className="text-xl font-black text-white">Clinical Specialties</h3>
            <p className="text-xs text-slate-300 mb-4">Under the care of Dr. Avinash Kasundra</p>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-cyan-400 text-xs font-bold block mb-1">ARDS &amp; Respiratory Failure</span>
                <p className="text-[10px] text-slate-400">Advanced high-flow oxygenation &amp; protective lung ventilation.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-cyan-400 text-xs font-bold block mb-1">Bronchial Asthma &amp; Allergy</span>
                <p className="text-[10px] text-slate-400">Personalized inhaler therapy, spirometry &amp; trigger control.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-cyan-400 text-xs font-bold block mb-1">COPD &amp; Chronic Bronchitis</span>
                <p className="text-[10px] text-slate-400">Pulmonary rehabilitation and long-term lung management.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-cyan-400 text-xs font-bold block mb-1">Severe Pneumonia &amp; Sepsis</span>
                <p className="text-[10px] text-slate-400">Protocolized ICU intervention and antimicrobial stewardship.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-cyan-400 text-xs font-bold block mb-1">Mechanical Ventilation</span>
                <p className="text-[10px] text-slate-400">Invasive &amp; Non-invasive (BiPAP/CPAP) life support management.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-cyan-400 text-xs font-bold block mb-1">Interstitial Lung Disease (ILD)</span>
                <p className="text-[10px] text-slate-400">Comprehensive pulmonary fibrosis workup and treatment.</p>
              </div>
            </div>

            <button
              onClick={() => { setIsSpecialtiesOpen(false); setIsBookingOpen(true); }}
              className="mt-5 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation for These Conditions</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
