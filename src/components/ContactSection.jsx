import React from 'react';
import { 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Clock, 
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function ContactSection({ onOpenBooking }) {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EAF0FA] text-[#263F91] text-xs font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#152B56] tracking-tight">
            Contact Information &amp; Location
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Direct communication channels for Dr. Avinash Kasundra and Premier Hospital &amp; ICU, Rajkot.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Doctor Direct Contact */}
          <div className="bg-[#F5F8FC] p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#263F91] flex items-center justify-center mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Doctor Consultation
              </span>
              <h3 className="text-base font-bold text-[#152B56] mt-0.5">
                Dr. Avinash Kasundra
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                For specialized pulmonology inquiries and appointment guidance.
              </p>
            </div>
            <a
              href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#263F91] hover:text-[#152B56] transition-colors pt-2 border-t border-slate-200/60"
            >
              <span>{HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
            </a>
          </div>

          {/* Hospital Helpdesk & Emergency */}
          <div className="bg-[#F5F8FC] p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider block">
                Hospital &amp; Emergency
              </span>
              <h3 className="text-base font-bold text-[#152B56] mt-0.5">
                Premier Hospital &amp; ICU
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                24/7 ICU admission, ambulance assistance &amp; hospital reception.
              </p>
            </div>
            <a
              href={`tel:${HOSPITAL_CONFIG.contacts.hospitalPhoneRaw}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-red-700 hover:text-red-800 transition-colors pt-2 border-t border-slate-200/60"
            >
              <span>{HOSPITAL_CONFIG.contacts.hospitalPhoneDisplay}</span>
            </a>
          </div>

          {/* Official Email */}
          <div className="bg-[#F5F8FC] p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#263F91] flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Official Email
              </span>
              <h3 className="text-base font-bold text-[#152B56] mt-0.5">
                Hospital Desk
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                For medical records, appointment confirmations, and general inquiries.
              </p>
            </div>
            <a
              href={`mailto:${HOSPITAL_CONFIG.contacts.hospitalEmail}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#263F91] hover:underline break-all pt-2 border-t border-slate-200/60"
            >
              <span>{HOSPITAL_CONFIG.contacts.hospitalEmail}</span>
            </a>
          </div>

          {/* Official Website */}
          <div className="bg-[#F5F8FC] p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#263F91] flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Online Portal
              </span>
              <h3 className="text-base font-bold text-[#152B56] mt-0.5">
                Premier Hospital Web
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Hospital infrastructure, departments, doctors, and facilities.
              </p>
            </div>
            <a
              href={HOSPITAL_CONFIG.contacts.hospitalWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#263F91] hover:underline pt-2 border-t border-slate-200/60"
            >
              <span>premierhospital.co.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Address & Interactive Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Physical Address Card */}
          <div className="lg:col-span-5 bg-[#F5F8FC] p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#263F91] text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#152B56]">Hospital Location</h3>
                  <p className="text-xs text-slate-500">Rajkot, Gujarat</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-sm space-y-1.5 text-slate-800">
                <p className="font-semibold text-[#152B56]">Premier Hospital &amp; ICU</p>
                <p>1st &amp; 7th Floor, RK Prime Plus,</p>
                <p>Balaji Hall Circle,</p>
                <p>150ft Ring Road, Rajkot,</p>
                <p className="text-slate-500 text-xs">Gujarat – 360004, India</p>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#263F91] shrink-0" />
                  <span>OPD Consultation: 10:00 AM – 1:00 PM | 5:00 PM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="font-semibold text-red-700">ICU Emergency: 24 Hours Open (Round the Clock)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <a
                href={HOSPITAL_CONFIG.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#263F91] hover:bg-[#152B56] text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-1.5 bg-white text-[#152B56] hover:bg-slate-50 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl border border-slate-300 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#263F91]" />
                <span>Book Slot</span>
              </button>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-xs min-h-[340px] bg-slate-100 relative">
            <iframe
              title="Premier Hospital & ICU Rajkot Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8286208985167!2d70.7718!3d22.2858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca128527a7c7%3A0x6b7720233e72251a!2sRK%20Prime%20Plus!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[340px]"
            ></iframe>

            {/* Quick floating address badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md max-w-xs hidden sm:block">
              <p className="text-xs font-bold text-[#152B56]">Premier Hospital &amp; ICU</p>
              <p className="text-[11px] text-slate-600 mt-0.5">RK Prime Plus, Balaji Hall Circle, Rajkot</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

