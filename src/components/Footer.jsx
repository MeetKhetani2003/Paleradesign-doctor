import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldAlert, Award, ArrowUp } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#152B56] text-white pt-16 pb-24 md:pb-12 border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-900/50">
          
          {/* Column 1: Hospital & Doctor Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/95 p-3 rounded-xl inline-block">
              <img
                src={HOSPITAL_CONFIG.assets.logo}
                alt="Premier Hospital & ICU"
                className="h-10 w-auto object-contain"
                width="200"
                height="40"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                Dr. Avinash Kasundra
              </h3>
              <p className="text-sm text-blue-200 font-medium">
                Consultant Intensivist &amp; Pulmonologist
              </p>
              <p className="text-xs text-blue-300/80 mt-1">
                MBBS, MD (Respiratory Medicine) &bull; Critical Care Fellowship (Lilavati Hospital, Mumbai)
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Providing dedicated clinical consultations in respiratory medicine and intensive care management at Premier Hospital &amp; ICU, Rajkot.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Doctor</a>
              </li>
              <li>
                <a href="#qualifications" className="hover:text-white transition-colors">Qualifications</a>
              </li>
              <li>
                <a href="#timings" className="hover:text-white transition-colors">OPD Timings</a>
              </li>
              <li>
                <a href="#contact-form" className="hover:text-white transition-colors">Book Appointment</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Details</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Emergency */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              Consultation &amp; Emergency
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Routine OPD Hours</span>
                  <span>10:00 AM – 1:00 PM (Morning)</span>
                  <br />
                  <span>5:00 PM – 8:00 PM (Evening)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-blue-900/40">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-red-300 block">Emergency &amp; ICU</span>
                  <span className="text-red-200">24 × 7 Available Round the Clock</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Direct Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-300">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Doctor: </span>
                <a href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`} className="font-semibold text-white hover:underline">
                  {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Hospital: </span>
                <a href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`} className="font-semibold text-white hover:underline">
                  {HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${HOSPITAL_CONFIG.contacts.hospitalEmail}`} className="hover:underline text-slate-300">
                  {HOSPITAL_CONFIG.contacts.hospitalEmail}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">
                  1st &amp; 7th Floor, RK Prime Plus, Balaji Hall Circle, 150ft Ring Road, Rajkot, Gujarat.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <p>
            &copy; {new Date().getFullYear()} Dr. Avinash Kasundra &bull; Premier Hospital &amp; ICU. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="text-blue-300 hover:text-white transition-colors"
            >
              Book Consultation
            </button>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-blue-300 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

