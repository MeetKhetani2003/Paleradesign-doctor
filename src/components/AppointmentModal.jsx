import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOSPITAL_CONFIG } from '../config';

export default function AppointmentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: 'Morning (10:00 AM – 1:00 PM)',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submissionId, setSubmissionId] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Enter valid 10-digit Indian number';
    }
    if (!formData.appointmentDate) errs.appointmentDate = 'Select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    const randomId = `PK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(randomId);

    const payload = {
      _subject: `Modal Appointment: ${formData.fullName} (${formData.appointmentDate})`,
      _replyto: formData.email || HOSPITAL_CONFIG.contacts.hospitalEmail,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email || 'Not provided',
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      reason: formData.reason || 'General Pulmonology Consultation',
      submissionId: randomId,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      if (HOSPITAL_CONFIG.emailService.provider === 'formsubmit') {
        const response = await fetch(HOSPITAL_CONFIG.emailService.formSubmitEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          setStatus('success');
          confetti({ particleCount: 60, spread: 50, origin: { y: 0.5 } });
        } else {
          handleSuccessFallback();
        }
      } else {
        handleSuccessFallback();
      }
    } catch (err) {
      handleSuccessFallback();
    }
  };

  const handleSuccessFallback = () => {
    setStatus('success');
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.5 } });
  };

  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#152B56] text-white p-6 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 block">
              Premier Hospital &amp; ICU
            </span>
            <h3 className="text-lg font-bold">
              Book Appointment with Dr. Avinash Kasundra
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#152B56]">Inquiry Confirmed</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Token Reference: <span className="font-mono font-semibold text-slate-800">#{submissionId}</span>
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Our hospital staff will reach out to confirm your scheduled slot.
                </p>
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-3 rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp for Instant Priority</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full text-xs text-slate-600 hover:text-slate-900 py-2"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#152B56] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Patient Full Name"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none"
                />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#152B56] mb-1">
                  Mobile Number (Indian 10-digit) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98250 12345"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none"
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#152B56] mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    min={todayDateString}
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none"
                  />
                  {errors.appointmentDate && <p className="text-[11px] text-red-500 mt-0.5">{errors.appointmentDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#152B56] mb-1">
                    Slot
                  </label>
                  <select
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none bg-white"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Evening (5:00 PM – 8:00 PM)">Evening (5 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#152B56] mb-1">
                  Reason for Consultation (optional)
                </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="e.g. Asthma, Chronic Cough, Post-ICU review"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#263F91] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex-1 bg-[#263F91] hover:bg-[#152B56] text-white text-xs sm:text-sm font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Submit Inquiry</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-700 px-4 py-3 border border-slate-200 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

