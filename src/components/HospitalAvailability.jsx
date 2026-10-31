import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function HospitalAvailability({ onOpenBooking }) {
  const [currentStatus, setCurrentStatus] = useState({
    isOpen: false,
    label: 'Checking status...',
    session: ''
  });

  // Calculate live OPD status in Indian Standard Time (UTC+5:30)
  useEffect(() => {
    const checkOpdStatus = () => {
      const now = new Date();
      // Calculate IST time
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeInMinutes = hours * 60 + minutes;
      const day = istTime.getDay(); // 0 is Sunday

      // Sunday: No routine OPD
      if (day === 0) {
        setCurrentStatus({
          isOpen: false,
          label: 'OPD Closed on Sunday (Emergency ICU Open 24/7)',
          session: 'Sunday'
        });
        return;
      }

      // Morning: 10:00 AM (600) to 1:00 PM (780)
      if (timeInMinutes >= 600 && timeInMinutes <= 780) {
        setCurrentStatus({
          isOpen: true,
          label: 'OPD Open Now — Morning Session (10:00 AM - 1:00 PM)',
          session: 'morning'
        });
      } 
      // Evening: 5:00 PM (1020) to 8:00 PM (1200)
      else if (timeInMinutes >= 1020 && timeInMinutes <= 1200) {
        setCurrentStatus({
          isOpen: true,
          label: 'OPD Open Now — Evening Session (5:00 PM - 8:00 PM)',
          session: 'evening'
        });
      } else {
        let nextSession = timeInMinutes < 600 
          ? 'Next OPD opens at 10:00 AM (Morning)' 
          : (timeInMinutes < 1020 ? 'Next OPD opens at 5:00 PM (Evening)' : 'Next OPD opens tomorrow at 10:00 AM');

        setCurrentStatus({
          isOpen: false,
          label: `OPD Closed Right Now &bull; ${nextSession}`,
          session: 'closed'
        });
      }
    };

    checkOpdStatus();
    const interval = setInterval(checkOpdStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="timings" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EAF0FA] text-[#263F91] text-xs font-semibold uppercase tracking-wider mb-3">
            Facility Association &amp; Timings
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#152B56] tracking-tight">
            Premier Hospital &amp; Medical Availability
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Clinical consultations, outpatient department (OPD) schedule, and 24/7 emergency intensive care services in Rajkot.
          </p>
        </div>

        {/* Live IST Status Banner */}
        <div className="mb-10 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 border-slate-200">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${currentStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 mr-2">Live Availability Indicator:</span>
              <span 
                className="font-medium text-slate-700" 
                dangerouslySetInnerHTML={{ __html: currentStatus.label }}
              />
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono">IST (GMT+5:30)</span>
            <span>Emergency Unit is active 24/7</span>
          </div>
        </div>

        {/* Two-Column Structure: Hospital Facility & Schedule Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Hospital Profile Card */}
          <div className="lg:col-span-5 bg-[#F5F8FC] p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <img
                src={HOSPITAL_CONFIG.assets.logo}
                alt="Premier Hospital & ICU"
                className="h-12 w-auto object-contain"
                width="220"
                height="48"
              />
              
              <div>
                <h3 className="text-lg font-bold text-[#152B56]">
                  {HOSPITAL_CONFIG.hospitalName}
                </h3>
                <p className="text-xs text-[#263F91] font-medium">
                  {HOSPITAL_CONFIG.hospitalTagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A premier critical care hospital and medical facility in Rajkot, equipped with an advanced Intensive Care Unit (ICU), invasive life-support infrastructure, radiology diagnostics, and in-house laboratory services.
              </p>

              {/* Direct Hospital Contact Details */}
              <div className="pt-2 space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#263F91] shrink-0 mt-0.5" />
                  <span>
                    1st &amp; 7th Floor, RK Prime Plus, Near Balaji Hall Circle, 150ft Ring Road, Rajkot, Gujarat.
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#263F91] shrink-0" />
                  <a href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`} className="font-semibold text-[#152B56] hover:underline">
                    {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#263F91] shrink-0" />
                  <a href={`mailto:${HOSPITAL_CONFIG.contacts.hospitalEmail}`} className="text-slate-700 hover:text-[#263F91]">
                    {HOSPITAL_CONFIG.contacts.hospitalEmail}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#263F91] shrink-0" />
                  <a 
                    href={HOSPITAL_CONFIG.contacts.hospitalWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#263F91] font-medium flex items-center gap-1 hover:underline"
                  >
                    <span>premierhospital.co.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <a
                href={HOSPITAL_CONFIG.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#152B56] hover:text-[#263F91] text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Get Google Maps Directions</span>
              </a>
            </div>
          </div>

          {/* Schedule Matrix: Routine OPD vs Emergency Availability */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Routine OPD Consultation */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-blue-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#263F91]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#152B56]">
                      Routine OPD Consultation Hours
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dr. Avinash Kasundra &bull; Monday to Saturday
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-[#263F91]">
                  By Prior Appointment
                </span>
              </div>

              {/* Sessions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Morning Slot */}
                <div className="p-4 rounded-xl bg-[#F5F8FC] border border-blue-100/80">
                  <span className="text-[11px] font-bold text-[#263F91] uppercase tracking-wider block">
                    Morning Session
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-[#152B56] mt-1">
                    10:00 AM – 1:00 PM
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Consultation &amp; Pulmonary Diagnostics
                  </p>
                </div>

                {/* Evening Slot */}
                <div className="p-4 rounded-xl bg-[#F5F8FC] border border-blue-100/80">
                  <span className="text-[11px] font-bold text-[#263F91] uppercase tracking-wider block">
                    Evening Session
                  </span>
                  <p className="text-lg sm:text-xl font-bold text-[#152B56] mt-1">
                    5:00 PM – 8:00 PM
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Review &amp; Specialized Consultation
                  </p>
                </div>

              </div>

              {/* Important clarification per prompt requirements */}
              <div className="flex items-start gap-2 text-xs text-slate-500 pt-1">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <p>
                  Routine OPD consultation requires a token or prior booking. Emergency admissions are handled around the clock via the emergency department.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#263F91] hover:bg-[#152B56] text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-xl transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve an OPD Appointment</span>
                </button>
              </div>
            </div>

            {/* Emergency 24x7 Critical Care Box */}
            <div className="bg-red-50/80 p-6 sm:p-7 rounded-2xl border-2 border-red-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-red-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-red-100 text-red-700">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-red-950 flex items-center gap-2">
                      <span>Emergency &amp; Critical Care Unit</span>
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    </h3>
                    <p className="text-xs text-red-700 font-medium">
                      Intensive Care Unit (ICU) &bull; 24 Hours / 7 Days a Week
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold tracking-wide">
                  24 × 7 AVAILABLE
                </div>
              </div>

              <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
                For acute respiratory distress, severe pneumonia, cardiac arrest, septic shock, or emergency ventilator admissions, Premier Hospital &amp; ICU operates around the clock with duty medical officers and on-call intensivists.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Emergency Hotline: {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}</span>
                </a>

                <a
                  href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 bg-white text-red-900 hover:bg-red-100 text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl border border-red-200 transition-colors"
                >
                  <span>Doctor Contact: {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

