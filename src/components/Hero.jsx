import React from 'react';
import { Calendar, Phone, Clock, Award, ShieldAlert, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function Hero({ onOpenBooking }) {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-80px)] flex items-center bg-[#F5F8FC] overflow-hidden py-10 lg:py-16"
    >
      {/* Background Architectural Medical Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full bg-indigo-100/40 blur-3xl"></div>
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]" 
          style={{
            backgroundImage: `radial-gradient(#263F91 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Doctor Introduction & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF0FA] text-[#263F91] border border-blue-200/60 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#263F91] animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wider uppercase">
                Premier Hospital &amp; ICU | Rajkot
              </span>
            </div>

            {/* Doctor's Name & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#152B56] leading-[1.12] tracking-tight">
                Dr. Avinash Kasundra
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#263F91] tracking-normal">
                Consultant Intensivist &amp; Pulmonologist
              </p>
            </div>

            {/* Supporting Introduction */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-sm space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-[#263F91] shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-[#152B56] uppercase tracking-wider">
                    Medical Qualifications &amp; Fellowships
                  </h2>
                  <p className="text-sm font-medium text-slate-800 mt-0.5 leading-relaxed">
                    MBBS, MD (Respiratory Medicine), with Fellowship in Critical Care Medicine from <strong className="text-[#263F91]">Lilavati Hospital, Mumbai</strong>.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                Dedicated medical care in respiratory medicine and critical care, with a focus on professional consultation and patient support.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2.5 bg-[#263F91] hover:bg-[#152B56] text-white text-sm sm:text-base font-medium px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#263F91] focus:ring-offset-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#152B56] hover:text-[#263F91] text-sm sm:text-base font-semibold px-5 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all duration-200"
              >
                <Phone className="w-4 h-4 text-[#263F91]" />
                <span>Contact Doctor</span>
              </a>

              <a
                href={HOSPITAL_CONFIG.whatsapp.generateUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm sm:text-base font-medium px-4 py-3.5 rounded-xl border border-emerald-200 transition-colors"
                title="Inquire via WhatsApp"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Availability Indicators: OPD & Emergency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Routine OPD Timings */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="p-2 rounded-lg bg-blue-50 text-[#263F91] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    OPD Consultation
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#152B56]">
                    10 AM – 1 PM &bull; 5 PM – 8 PM
                  </span>
                </div>
              </div>

              {/* 24x7 Critical Care Emergency */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50/70 border border-red-200 shadow-sm">
                <div className="p-2 rounded-lg bg-red-100 text-red-700 shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-red-600 uppercase tracking-wider block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                    Emergency &amp; Trauma
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-red-900">
                    24/7 Emergency Availability
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Doctor Portrait Composition */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] lg:max-w-none">
              
              {/* Decorative background framing */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#263F91]/15 to-[#526BB5]/10 rounded-3xl transform rotate-1 scale-[1.02] filter blur-[1px]"></div>
              
              {/* Main Portrait Card */}
              <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-200 overflow-hidden">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={HOSPITAL_CONFIG.assets.doctorPortrait}
                    alt="Dr. Avinash Kasundra - Pulmonologist and Intensivist"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                    loading="eager"
                  />
                  
                  {/* Lilavati Fellowship Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-[#152B56]/95 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1.5 rounded-lg border border-white/20 shadow-lg flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-300" />
                    <span>Lilavati Hospital Fellow (Critical Care)</span>
                  </div>

                  {/* Premier Hospital Watermark Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#152B56] text-[11px] font-semibold px-2.5 py-1 rounded-md border border-slate-200 shadow flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Premier Hospital &amp; ICU</span>
                  </div>
                </div>

                {/* Sub-card: Verified Specialty Summary */}
                <div className="pt-3 px-1 text-center sm:text-left">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                    <span className="font-semibold text-[#263F91]">Super-Specialty Focus</span>
                    <span className="text-emerald-700 font-medium">Rajkot, Gujarat</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug">
                    Specialized in Intensive Care Unit (ICU) hemodynamics, mechanical ventilation, complex respiratory infections &amp; pulmonary rehabilitation.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

