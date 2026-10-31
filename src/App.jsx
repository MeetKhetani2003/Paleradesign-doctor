import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Calendar, 
  MessageSquare, 
  GraduationCap, 
  Stethoscope, 
  CheckCircle2, 
  Send, 
  Loader2, 
  ExternalLink,
  Building2,
  AlertCircle,
  Wind,
  HeartPulse,
  Activity,
  Sparkles,
  Share2,
  BadgeCheck,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOSPITAL_CONFIG } from './config';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'credentials' | 'conditions' | 'schedule'
  const [currentStatus, setCurrentStatus] = useState({
    isOpen: false,
    label: 'Checking status...',
    sessionText: 'Routine OPD + 24/7 ICU'
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: 'Morning: 10:00 AM – 1:00 PM',
    reason: ''
  });

  const [quickDateSelect, setQuickDateSelect] = useState('today');
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [token, setToken] = useState('');

  // Check IST OPD status (Indian Standard Time UTC+5:30)
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
        setCurrentStatus({
          isOpen: false,
          label: 'OPD Closed on Sunday &bull; ICU Open 24/7',
          sessionText: '24/7 ICU Emergency Active'
        });
        return;
      }

      if (timeInMinutes >= 600 && timeInMinutes <= 780) {
        setCurrentStatus({
          isOpen: true,
          label: 'OPD Open Now &bull; Morning Session',
          sessionText: 'Morning OPD: 10:00 AM – 1:00 PM'
        });
      } else if (timeInMinutes >= 1020 && timeInMinutes <= 1200) {
        setCurrentStatus({
          isOpen: true,
          label: 'OPD Open Now &bull; Evening Session',
          sessionText: 'Evening OPD: 5:00 PM – 8:00 PM'
        });
      } else {
        const nextTime = timeInMinutes < 600 
          ? 'Next OPD: 10:00 AM' 
          : (timeInMinutes < 1020 ? 'Next OPD: 5:00 PM' : 'Next OPD Tomorrow: 10:00 AM');
        setCurrentStatus({
          isOpen: false,
          label: `OPD Closed &bull; ${nextTime}`,
          sessionText: '24/7 ICU Available'
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Quick date selector handlers
  const handleQuickDate = (type) => {
    setQuickDateSelect(type);
    const now = new Date();
    if (type === 'today') {
      setFormData(prev => ({ ...prev, appointmentDate: now.toISOString().split('T')[0] }));
    } else if (type === 'tomorrow') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({ ...prev, appointmentDate: tomorrow.toISOString().split('T')[0] }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Enter valid 10-digit Indian number';
    }
    if (!formData.appointmentDate) errs.appointmentDate = 'Select appointment date';
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

  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-[#263F91] selection:text-white">
      
      {/* 1. TOP 24/7 ICU EMERGENCY HOTLINE (FULL-WIDTH) */}
      <aside aria-label="Emergency hotline banner" className="bg-[#152B56] text-white py-2 px-4 sm:px-8 border-b border-blue-900/40 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="font-bold tracking-wide text-red-300 uppercase">
              24/7 Critical Care &amp; ICU Emergency
            </span>
            <span className="hidden md:inline text-blue-300">|</span>
            <span className="hidden md:inline text-blue-100/90 font-medium">Premier Hospital &amp; ICU, 150ft Ring Road, Rajkot</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-blue-200">
              OPD Timings: 10:00 AM – 1:00 PM &bull; 5:00 PM – 8:00 PM
            </span>
            <a
              href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-md transition-colors text-xs shadow-xs"
            >
              <Phone className="w-3 h-3" />
              <span>Emergency: {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 2. DOCTOR BIO PROFILE MASTHEAD (MOBBIN HEALTHCARE SPECIALIST PATTERN) */}
      <section className="relative bg-gradient-to-b from-[#F5F8FC] via-white to-slate-50/50 border-b border-slate-200/90 pt-8 pb-12 overflow-hidden">
        
        {/* Ambient background medical accents */}
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-blue-100/50 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -ml-28 -mb-28"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hospital Association Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
            <a 
              href={HOSPITAL_CONFIG.contacts.hospitalWebsite} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <img
                src={HOSPITAL_CONFIG.assets.logo}
                alt="Premier Hospital & ICU"
                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.01]"
                width="220"
                height="48"
              />
            </a>

            {/* Live IST Status Pill with Glowing Beacon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
              <span className={`w-2.5 h-2.5 rounded-full ${currentStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span dangerouslySetInnerHTML={{ __html: currentStatus.label }} />
            </div>
          </div>

          {/* Profile Card Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Doctor Identity & Verification */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0FA] text-[#263F91] text-xs font-bold uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  Premier Hospital &amp; ICU &bull; Rajkot
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Consultant Physician
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#152B56] font-heading tracking-tight">
                  Dr. Avinash Kasundra
                </h1>
                <p className="text-lg sm:text-xl font-bold text-[#263F91]">
                  Consultant Intensivist &amp; Pulmonologist
                </p>
              </div>

              {/* Verified Credentials Summary */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-[#263F91] shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-[#152B56] uppercase tracking-wider">
                      Medical Background &amp; Specialization
                    </h2>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      MBBS, MD (Respiratory Medicine) &bull; <span className="text-[#263F91] font-bold">Fellowship in Critical Care Medicine (Lilavati Hospital, Mumbai)</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  Dedicated medical care in respiratory medicine and critical care, with a focus on professional consultation, patient support, and round-the-clock intensive care.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#book-opd"
                  className="inline-flex items-center gap-2 bg-[#263F91] hover:bg-[#152B56] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book OPD Appointment</span>
                </a>

                <a
                  href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-md transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Inquire</span>
                </a>

                <a
                  href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#152B56] text-sm font-bold px-4 py-3 rounded-xl border border-slate-300 shadow-xs transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#263F91]" />
                  <span>{HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
                </a>
              </div>

              {/* Key Quick Facts Row (Mobbin Pattern) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Super-Specialty</span>
                  <span className="text-xs font-bold text-[#152B56] block mt-0.5">Critical Care</span>
                  <span className="text-[10px] text-[#263F91] font-semibold">Lilavati Mumbai</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specialty</span>
                  <span className="text-xs font-bold text-[#152B56] block mt-0.5">Pulmonology</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">MD Respiratory</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OPD Schedule</span>
                  <span className="text-xs font-bold text-[#152B56] block mt-0.5">10–1 &bull; 5–8 PM</span>
                  <span className="text-[10px] text-slate-500 font-medium">Mon to Sat</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 text-center sm:text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Emergency</span>
                  <span className="text-xs font-bold text-red-600 block mt-0.5">24 × 7 ICU</span>
                  <span className="text-[10px] text-red-500 font-medium">Helpline Active</span>
                </div>
              </div>

            </div>

            {/* Right Column: Physician Portrait Card */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                
                {/* Visual shadow / backdrop glow */}
                <div className="absolute inset-0 bg-[#263F91]/10 rounded-3xl transform rotate-2 scale-[1.03] filter blur-[2px]"></div>
                
                <div className="relative bg-white rounded-3xl p-3 shadow-xl border border-slate-200 overflow-hidden">
                  <div className="relative aspect-square sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={HOSPITAL_CONFIG.assets.doctorPortrait}
                      alt="Dr. Avinash Kasundra - Consultant Pulmonologist & Intensivist"
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Lilavati Fellowship Tag */}
                    <div className="absolute top-2.5 left-2.5 bg-[#152B56]/95 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-md border border-white/20 shadow">
                      Lilavati Hospital Fellow
                    </div>

                    {/* Premier Hospital Watermark */}
                    <div className="absolute bottom-2.5 right-2.5 bg-white/95 backdrop-blur-md text-[#152B56] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Premier Hospital &amp; ICU
                    </div>
                  </div>

                  <div className="p-3 text-center">
                    <span className="text-sm font-bold text-[#152B56] block">Dr. Avinash Kasundra</span>
                    <span className="text-xs font-semibold text-[#263F91] block">Consultant Intensivist &amp; Pulmonologist</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE SEGMENTED TABS (MOBBIN PHYSICIAN BIO PATTERN) */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-[#263F91] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Profile Overview
            </button>

            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'credentials'
                  ? 'bg-[#263F91] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Qualifications &amp; Education
            </button>

            <button
              onClick={() => setActiveTab('conditions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'conditions'
                  ? 'bg-[#263F91] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Clinical Practice Areas
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === 'schedule'
                  ? 'bg-[#263F91] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              OPD Timings &amp; Hospital
            </button>

            <a
              href="#book-opd"
              className="ml-auto px-4 py-2 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Book Consultation</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. MAIN BODY SECTIONS BASED ON ACTIVE TAB OR SCROLL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* OVERVIEW / ABOUT BIO */}
        {(activeTab === 'overview' || activeTab === 'all') && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#263F91] block">
                  Clinical Background
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#152B56] font-heading">
                  About Dr. Avinash Kasundra
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                <p>
                  <strong className="text-[#152B56] font-bold">Dr. Avinash Kasundra</strong> is a Consultant Intensivist and Pulmonologist practicing at 
                  <span className="text-[#263F91] font-semibold"> Premier Hospital &amp; ICU, Rajkot</span>. 
                  His clinical career focuses on delivering specialized intensive care resuscitation and comprehensive outpatient respiratory medicine.
                </p>

                <p>
                  Having accomplished his <strong className="text-slate-900">MBBS</strong> and post-graduate <strong className="text-slate-900">MD in Respiratory Medicine</strong>, 
                  Dr. Kasundra completed his super-specialty <strong className="text-[#263F91]">Fellowship in Critical Care Medicine at Lilavati Hospital, Mumbai</strong>—one 
                  of the premier tertiary care and critical care training centers in India.
                </p>

                <p>
                  His clinical scope includes the bedside management of acute respiratory distress syndrome (ARDS), septic shock, mechanical ventilation protocols, severe asthma, chronic obstructive pulmonary disease (COPD), diagnostic bronchoscopy, and post-ICU respiratory recovery.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#263F91] font-semibold border border-blue-100">
                    Lilavati Hospital Mumbai Fellow
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    Pulmonology &amp; Critical Care
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                    Premier Hospital &amp; ICU, Rajkot
                  </span>
                </div>
              </div>

              {/* Fast Consultation Snapshot */}
              <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-[#152B56] uppercase tracking-wider pb-2 border-b border-slate-100">
                  Consultation Summary
                </h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#263F91] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">Routine OPD Timings:</span>
                      <span>10:00 AM – 1:00 PM (Morning)</span><br />
                      <span>5:00 PM – 8:00 PM (Evening)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-red-900 block">Emergency &amp; ICU Care:</span>
                      <span className="text-red-700">24 × 7 Available at Premier Hospital</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#263F91] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">Consultation Location:</span>
                      <span>1st &amp; 7th Floor, RK Prime Plus, Balaji Hall Circle, 150ft Ring Rd, Rajkot</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#book-opd"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#263F91] hover:bg-[#152B56] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve OPD Slot</span>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* CREDENTIALS SECTION */}
        {(activeTab === 'credentials' || activeTab === 'all') && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#263F91] block">
                  Verified Degrees
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#152B56] font-heading">
                  Education &amp; Professional Qualifications
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#263F91]/50 transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#263F91] flex items-center justify-center font-bold text-base border border-blue-100">
                  MBBS
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#263F91] uppercase tracking-wider block">Undergraduate Medical</span>
                  <h3 className="text-base font-bold text-[#152B56] mt-0.5">Bachelor of Medicine &amp; Surgery</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fundamental clinical training, clinical rotations, and multi-specialty medical internship.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#263F91]/50 transition-all space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#263F91] text-white flex items-center justify-center font-bold text-base shadow-xs">
                  MD
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Postgraduate Specialty</span>
                  <h3 className="text-base font-bold text-[#152B56] mt-0.5">MD (Respiratory Medicine)</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Postgraduate medical degree in pulmonary and respiratory diseases, chronic bronchitis, asthma, and COPD.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-sm relative overflow-hidden space-y-3">
                <div className="absolute top-0 right-0 bg-[#263F91] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg">
                  Super-Specialty
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#152B56] text-white flex items-center justify-center font-bold text-base">
                  <Award className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#263F91] uppercase tracking-wider block">Critical Care Fellowship</span>
                  <h3 className="text-base font-bold text-[#152B56] mt-0.5">Fellowship in Critical Care Medicine</h3>
                  <p className="text-xs font-bold text-[#263F91] mt-0.5">Lilavati Hospital – Mumbai</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Advanced fellowship at Lilavati Hospital Mumbai: invasive mechanical ventilation, ARDS management, septic shock, and multi-organ critical care.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* CLINICAL CONDITIONS & PRACTICE AREAS */}
        {(activeTab === 'conditions' || activeTab === 'all') && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#263F91] block">
                  Areas of Expertise
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#152B56] font-heading">
                  Pulmonary &amp; Critical Care Practice Areas
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              
              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#263F91] w-fit">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#152B56]">Critical Care &amp; ICU Management</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bedside management of multi-organ failure, hemodynamic monitoring, septic shock, and life-support resuscitation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#263F91] w-fit">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#152B56]">Invasive Mechanical Ventilation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Advanced ventilator management, pressure/volume modes, non-invasive ventilation (BiPAP/CPAP), and ventilator weaning.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#263F91] w-fit">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#152B56]">Severe ARDS &amp; Respiratory Distress</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evidence-based prone positioning, lung-protective ventilation, severe pneumonia, and hypoxemic distress treatment.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#263F91] w-fit">
                  <Wind className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#152B56]">Asthma, COPD &amp; Chronic Cough</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized pulmonary consultation for chronic airway disease, acute asthma exacerbations, and inhaler regimens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#263F91] w-fit">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#152B56]">Diagnostic Bronchoscopy &amp; Pleural Care</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fiberoptic bronchoscopy, pleural fluid aspiration, intercostal chest tube insertion, and thoracic diagnostics.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-blue-50 text-[#263F91] w-fit">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#152B56]">Post-ICU Pulmonary Rehabilitation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structured post-critical care follow-ups, tracheostomy decannulation, pulmonary exercise programs, and long-term recovery.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* TIMINGS & HOSPITAL FACILITY */}
        {(activeTab === 'schedule' || activeTab === 'all') && (
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#263F91] block">
                  Hospital Association &amp; Timings
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#152B56] font-heading">
                  Premier Hospital Practice &amp; Availability
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <img
                    src={HOSPITAL_CONFIG.assets.logo}
                    alt="Premier Hospital & ICU"
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#152B56]">Premier Hospital &amp; ICU, Rajkot</h3>
                    <p className="text-xs text-[#263F91] font-semibold">Centre for Advanced Pulmonary Medicine &amp; Critical Care</p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    A premier critical care hospital in Rajkot, equipped with an Intensive Care Unit, high-dependency beds, ventilator infrastructure, and around-the-clock intensive care physicians.
                  </p>
                  <div className="space-y-2 pt-2 text-xs text-slate-700">
                    <p>📍 1st &amp; 7th Floor, RK Prime Plus, Near Balaji Hall Circle, 150ft Ring Road, Rajkot, Gujarat.</p>
                    <p>📞 Hospital Helpline: <strong className="text-slate-900">9925 601 601</strong></p>
                    <p>✉️ premierhospitalrajkot@gmail.com</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={HOSPITAL_CONFIG.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#263F91] hover:bg-[#152B56] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors"
                  >
                    Get Google Maps Directions
                  </a>
                  <a
                    href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors"
                  >
                    Visit Website &rarr;
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-[#152B56]">Routine OPD Consultation Hours</h3>
                      <p className="text-xs text-slate-500">Dr. Avinash Kasundra &bull; Monday to Saturday</p>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-[#263F91]">By Prior Appointment</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <span className="text-[10px] font-bold text-[#263F91] uppercase tracking-wider block">Morning Session</span>
                      <p className="text-lg font-bold text-[#152B56] mt-0.5">10:00 AM – 1:00 PM</p>
                      <p className="text-xs text-slate-500 mt-1">Consultations &amp; Diagnostic Reviews</p>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                      <span className="text-[10px] font-bold text-[#263F91] uppercase tracking-wider block">Evening Session</span>
                      <p className="text-lg font-bold text-[#152B56] mt-0.5">5:00 PM – 8:00 PM</p>
                      <p className="text-xs text-slate-500 mt-1">Evening OPD &amp; Pulmonology Follow-ups</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50/80 p-6 rounded-3xl border-2 border-red-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-red-100 border-b">
                    <div>
                      <h3 className="text-base font-bold text-red-950 flex items-center gap-2">
                        <span>Emergency &amp; Critical Care Unit</span>
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                      </h3>
                      <p className="text-xs text-red-700 font-medium">Intensive Care Unit (ICU) &bull; 24 Hours / 7 Days a Week</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold tracking-wide w-fit">24 × 7 AVAILABLE</span>
                  </div>

                  <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                    For acute respiratory distress, severe pneumonia, cardiac arrest, septic shock, or emergency ventilator admissions, Premier Hospital &amp; ICU operates around the clock.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shadow-xs"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Emergency Hotline: {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}</span>
                    </a>
                    <a
                      href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
                      className="inline-flex items-center justify-center gap-2 bg-white text-red-900 hover:bg-red-100 text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl border border-red-200 transition-colors"
                    >
                      <span>Doctor: {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* 5. APPOINTMENT BOOKING WIDGET (MOBBIN HEALTHCARE CONVERSION PATTERN) */}
        <section id="book-opd" className="pt-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 max-w-4xl mx-auto">
            
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0FA] text-[#263F91] text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" /> Direct Appointment Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#152B56] font-heading">
                Book an OPD Appointment
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Schedule a routine consultation with Dr. Avinash Kasundra at Premier Hospital &amp; ICU.
              </p>
            </div>

            {formStatus === 'success' ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#152B56]">Inquiry Successfully Transmitted</h3>
                <div className="inline-block bg-slate-100 text-slate-700 text-xs font-mono px-3 py-1 rounded-md">
                  Reference Token: #{token}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you! Premier Hospital appointment staff will call your number to confirm your scheduled token.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
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
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send to WhatsApp for Instant Confirmation</span>
                  </a>

                  <button
                    onClick={() => {
                      setFormStatus('idle');
                      setFormData({
                        fullName: '',
                        phone: '',
                        appointmentDate: todayDateString,
                        appointmentTime: 'Morning: 10:00 AM – 1:00 PM',
                        reason: ''
                      });
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 px-4 py-3 border border-slate-300 rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Step 1: Quick Date Selection Pills */}
                <div>
                  <label className="block text-xs font-bold text-[#152B56] uppercase tracking-wider mb-2">
                    1. Select Preferred Date
                  </label>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDate('today')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        quickDateSelect === 'today'
                          ? 'bg-[#263F91] text-white border-[#263F91]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Today
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickDate('tomorrow')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        quickDateSelect === 'tomorrow'
                          ? 'bg-[#263F91] text-white border-[#263F91]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Tomorrow
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickDate('custom')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        quickDateSelect === 'custom'
                          ? 'bg-[#263F91] text-white border-[#263F91]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Custom Date Picker
                    </button>
                  </div>

                  {quickDateSelect === 'custom' && (
                    <input
                      type="date"
                      name="appointmentDate"
                      min={todayDateString}
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      className="w-full sm:w-64 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none"
                    />
                  )}
                  {errors.appointmentDate && <p className="text-[11px] text-red-500 mt-1">{errors.appointmentDate}</p>}
                </div>

                {/* Step 2: Preferred Slot */}
                <div>
                  <label className="block text-xs font-bold text-[#152B56] uppercase tracking-wider mb-2">
                    2. Select OPD Session Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.appointmentTime.includes('Morning')
                        ? 'border-[#263F91] bg-blue-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="appointmentTime"
                        value="Morning: 10:00 AM – 1:00 PM"
                        checked={formData.appointmentTime.includes('Morning')}
                        onChange={handleInputChange}
                        className="text-[#263F91] focus:ring-[#263F91]"
                      />
                      <div>
                        <span className="text-xs font-bold block text-[#152B56]">Morning Session</span>
                        <span className="text-xs text-slate-500">10:00 AM – 1:00 PM</span>
                      </div>
                    </label>

                    <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.appointmentTime.includes('Evening')
                        ? 'border-[#263F91] bg-blue-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="appointmentTime"
                        value="Evening: 5:00 PM – 8:00 PM"
                        checked={formData.appointmentTime.includes('Evening')}
                        onChange={handleInputChange}
                        className="text-[#263F91] focus:ring-[#263F91]"
                      />
                      <div>
                        <span className="text-xs font-bold block text-[#152B56]">Evening Session</span>
                        <span className="text-xs text-slate-500">5:00 PM – 8:00 PM</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Step 3: Patient Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#152B56] uppercase tracking-wider mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Patel"
                      className={`w-full px-4 py-3 text-sm rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-slate-300 focus:border-[#263F91]'} focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#152B56] uppercase tracking-wider mb-1">
                      Mobile Number (Indian 10-digit) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="98250 12345"
                      className={`w-full px-4 py-3 text-sm rounded-xl border ${errors.phone ? 'border-red-500' : 'border-slate-300 focus:border-[#263F91]'} focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#152B56] uppercase tracking-wider mb-1">
                    Reason for Consultation (optional)
                  </label>
                  <input
                    type="text"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    placeholder="e.g. Asthma symptoms, chronic cough, breathing discomfort, post-ICU checkup"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full sm:flex-1 bg-[#263F91] hover:bg-[#152B56] text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Appointment Inquiry</span>
                      </>
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold py-3.5 px-5 rounded-xl border border-emerald-300 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Book via WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-slate-500 text-center">
                  Direct submission to: <span className="font-mono text-slate-700">{HOSPITAL_CONFIG.contacts.hospitalEmail}</span>
                </p>

              </form>
            )}

          </div>
        </section>

        {/* 6. DIRECTORY & GOOGLE MAP FRAME */}
        <section className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Doctor Direct</span>
              <h4 className="text-sm font-bold text-[#152B56] mt-0.5">Dr. Avinash Kasundra</h4>
              <a href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`} className="text-xs font-bold text-[#263F91] hover:underline mt-2 block">
                {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider block">Emergency &amp; ICU</span>
              <h4 className="text-sm font-bold text-[#152B56] mt-0.5">Premier Hospital &amp; ICU</h4>
              <a href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`} className="text-xs font-bold text-red-600 hover:underline mt-2 block">
                {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Desk</span>
              <h4 className="text-sm font-bold text-[#152B56] mt-0.5">Premier Hospital</h4>
              <a href={`mailto:${HOSPITAL_CONFIG.contacts.hospitalEmail}`} className="text-xs font-bold text-[#263F91] hover:underline mt-2 block break-all">
                {HOSPITAL_CONFIG.contacts.hospitalEmail}
              </a>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Official Portal</span>
              <h4 className="text-sm font-bold text-[#152B56] mt-0.5">Hospital Website</h4>
              <a href={HOSPITAL_CONFIG.contacts.hospitalWebsite} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#263F91] hover:underline mt-2 block">
                premierhospital.co.in &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm min-h-[300px]">
            <iframe
              title="Premier Hospital &amp; ICU Rajkot Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8286208985167!2d70.7718!3d22.2858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca128527a7c7%3A0x6b7720233e72251a!2sRK%20Prime%20Plus!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>

      </div>

      {/* 7. FULL-WIDTH DEEP NAVY FOOTER */}
      <footer className="bg-[#152B56] text-white pt-12 pb-8 border-t border-blue-900/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-blue-900/50">
            <div className="space-y-1">
              <span className="text-lg font-bold text-white font-heading block">Dr. Avinash Kasundra</span>
              <p className="text-xs text-blue-200">Consultant Intensivist &amp; Pulmonologist &bull; Premier Hospital &amp; ICU, Rajkot</p>
              <p className="text-[11px] text-blue-300/80">MBBS, MD (Respiratory Medicine) &bull; Critical Care Fellowship (Lilavati Hospital, Mumbai)</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-blue-200">
              <a href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`} className="hover:text-white font-semibold">
                Doctor: {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}
              </a>
              <span>&bull;</span>
              <a href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`} className="hover:text-white font-semibold text-red-300">
                Hospital: {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}
              </a>
              <span>&bull;</span>
              <a href={HOSPITAL_CONFIG.contacts.hospitalWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                premierhospital.co.in
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300/70">
            <p>&copy; {new Date().getFullYear()} Dr. Avinash Kasundra &bull; Premier Hospital &amp; ICU. All rights reserved.</p>
            <p>1st &amp; 7th Floor, RK Prime Plus, 150ft Ring Road, Rajkot, Gujarat – 360004</p>
          </div>
        </div>
      </footer>

      {/* 8. FLOATING WHATSAPP ACTION BUTTON */}
      <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-5 z-40">
        <a
          href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-transform hover:scale-105"
          aria-label="Book on WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-white"></span>
          </span>
          <MessageSquare className="w-7 h-7" />
        </a>
      </aside>

    </div>
  );
}
