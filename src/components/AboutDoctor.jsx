import React from 'react';
import { Stethoscope, Activity, HeartPulse, Wind, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function AboutDoctor({ onOpenBooking }) {
  return (
    <section id="about" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EAF0FA] text-[#263F91] text-xs font-semibold uppercase tracking-wider mb-3">
            Physician Profile &amp; Clinical Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#152B56] tracking-tight">
            About Dr. Avinash Kasundra
          </h2>
          <p className="text-base sm:text-lg text-[#263F91] font-medium mt-1">
            Consultant Intensivist and Pulmonologist &bull; Premier Hospital &amp; ICU, Rajkot
          </p>
        </div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p className="font-normal text-slate-800 leading-relaxed">
              <strong className="text-[#152B56] font-semibold">Dr. Avinash Kasundra</strong> is a Consultant Intensivist and Pulmonologist associated with 
              <span className="text-[#263F91] font-semibold"> Premier Hospital &amp; ICU, Rajkot</span>. 
              His practice centers around dedicated patient-focused critical care management and evidence-based diagnostic pulmonology.
            </p>

            <p>
              Holding an <strong className="text-slate-900 font-semibold">MBBS</strong> and postgraduate <strong className="text-slate-900 font-semibold">MD in Respiratory Medicine</strong>, 
              he pursued advanced super-specialty training with a distinguished <strong className="text-[#263F91] font-semibold">Fellowship in Critical Care Medicine from Lilavati Hospital, Mumbai</strong>—one 
              of the nation’s premier tertiary healthcare and intensive care training centers.
            </p>

            <p>
              At Premier Hospital &amp; ICU, Dr. Kasundra oversees advanced respiratory treatment regimens and high-dependency intensive care protocols, assisting patients with critical illnesses, acute respiratory distress, severe airway disorders, and complex medical emergencies.
            </p>

            {/* Core Values & Clinical Approach Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#F5F8FC] border border-blue-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white text-[#263F91] shadow-xs shrink-0">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#152B56]">Pulmonary Care</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Specialized consultation for asthma, COPD, pneumonia, chronic cough, and lung ailments.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F8FC] border border-blue-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white text-[#263F91] shadow-xs shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#152B56]">Critical Care &amp; ICU</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Invasive mechanical ventilation, sepsis resuscitation, and advanced organ support in ICU.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#152B56] hover:bg-[#263F91] text-white text-sm font-medium px-5 py-3 rounded-xl transition-colors"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Consult with Dr. Avinash Kasundra</span>
              </button>
            </div>
          </div>

          {/* Side Editorial Snapshot */}
          <div className="lg:col-span-5 bg-[#F5F8FC] p-6 sm:p-8 rounded-2xl border border-slate-200/80 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#152B56] pb-3 border-b border-slate-200">
              Clinical Practice Highlights
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#263F91] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Hospital Association</h4>
                  <p className="text-xs text-slate-600">Premier Hospital &amp; ICU, 150ft Ring Road, Rajkot</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#263F91] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Postgraduate Specialty</h4>
                  <p className="text-xs text-slate-600">MD in Respiratory Medicine (Pulmonology)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#263F91] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Super-Specialty Fellowship</h4>
                  <p className="text-xs text-slate-600">Critical Care Medicine &bull; Lilavati Hospital, Mumbai</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Routine OPD Timings</h4>
                  <p className="text-xs text-slate-600">Morning: 10:00 AM – 1:00 PM | Evening: 5:00 PM – 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Emergency &amp; Critical Care</h4>
                  <p className="text-xs text-red-700">24 × 7 Emergency Availability at Premier Hospital ICU</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
              <p className="italic">
                "Committed to rigorous clinical standards, transparent communication, and patient-first pulmonary and intensive critical care."
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

