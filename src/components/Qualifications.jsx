import React from 'react';
import { GraduationCap, Award, Building2, CheckCircle, FileCheck } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function Qualifications() {
  return (
    <section id="qualifications" className="py-16 lg:py-20 bg-[#F5F8FC] border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0FA] text-[#263F91] text-xs font-semibold uppercase tracking-wider mb-3">
            <FileCheck className="w-3.5 h-3.5" /> Verified Medical Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#152B56] tracking-tight">
            Education &amp; Professional Qualifications
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Formal medical training, postgraduate specialization, and advanced super-specialty intensive care fellowship.
          </p>
        </div>

        {/* Streamlined, Scan-Friendly Qualifications Layout */}
        <div className="space-y-4">
          
          {/* Degree 1: MBBS */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-xs hover:border-[#263F91]/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#263F91] flex items-center justify-center font-bold text-base shrink-0 border border-blue-100">
                MBBS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#152B56]">
                    Bachelor of Medicine &amp; Bachelor of Surgery
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-[#263F91]">
                    <CheckCircle className="w-3 h-3" /> Medical Graduate
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Core undergraduate medical education, clinical rotations, and multi-disciplinary internship.
                </p>
              </div>
            </div>
          </div>

          {/* Degree 2: MD (Respiratory Medicine) */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-xs hover:border-[#263F91]/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#263F91] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                MD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#152B56]">
                    MD (Respiratory Medicine)
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Postgraduate Specialty
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Postgraduate medical degree in Respiratory &amp; Pulmonary Medicine, respiratory failure management, and chronic airway disease.
                </p>
              </div>
            </div>
          </div>

          {/* Fellowship: Lilavati Hospital - Mumbai */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border-2 border-blue-200/90 shadow-sm hover:border-[#263F91] transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#263F91] text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg">
              Super-Specialty Fellowship
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#152B56] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#152B56]">
                      Fellowship in Critical Care Medicine
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-[#263F91]" />
                    <span className="text-sm font-semibold text-[#263F91]">
                      Lilavati Hospital – Mumbai
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Super-specialty fellowship at one of India’s foremost tertiary centers: intensive critical care, mechanical ventilator management, septic shock, hemodynamic monitoring, and acute trauma resuscitation.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Verification Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            All qualifications accurately represent verified medical degrees and recognized hospital fellowship credentials.
          </p>
        </div>

      </div>
    </section>
  );
}

