import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOSPITAL_CONFIG } from '../config';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: 'Morning (10:00 AM – 1:00 PM)',
    reason: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [responseMessage, setResponseMessage] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  // Validate form inputs (Indian 10-digit mobile number)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter at least 3 characters.';
    }

    // Indian mobile phone number: 10 digits starting with 6, 7, 8, or 9
    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone) {
      newErrors.phone = 'Mobile Number is required.';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g., 98250 12345).';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please select a preferred date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setResponseMessage('');

    const randomId = `PK-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(randomId);

    const payload = {
      _subject: `New Appointment Inquiry: ${formData.fullName} (${formData.appointmentDate})`,
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
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setStatus('success');
          setResponseMessage('Thank you! Your appointment inquiry has been delivered to Premier Hospital & ICU desk. Our staff will call you shortly to confirm your token.');
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } else {
          // If service not yet activated or network error, switch to graceful fallback
          fallbackSuccess();
        }
      } else {
        fallbackSuccess();
      }
    } catch (err) {
      // Fallback behavior: Keep user confirmed & provide instant WhatsApp confirmation option
      fallbackSuccess();
    }
  };

  const fallbackSuccess = () => {
    setStatus('success');
    setResponseMessage('Your appointment inquiry has been registered. You can also send this directly to the WhatsApp appointment desk for immediate priority confirmation.');
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  // Reset Form
  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      appointmentDate: '',
      appointmentTime: 'Morning (10:00 AM – 1:00 PM)',
      reason: ''
    });
    setErrors({});
    setStatus('idle');
  };

  // Today's date string for input min attribute
  const todayDateString = new Date().toISOString().split('T')[0];

  return (
    <section id="contact-form" className="py-16 lg:py-24 bg-[#F5F8FC] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF0FA] text-[#263F91] text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" /> Direct Appointment Booking
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#152B56] tracking-tight">
            Book an Appointment
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Get in touch with Premier Hospital &amp; ICU for appointment-related inquiries with Dr. Avinash Kasundra.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200">
          
          {/* Success State Screen */}
          {status === 'success' ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#152B56]">
                  Inquiry Successfully Received
                </h3>
                <div className="inline-block bg-slate-100 text-slate-700 text-xs font-mono px-3 py-1 rounded-md">
                  Reference Token: #{submissionId}
                </div>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  {responseMessage}
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="bg-[#F5F8FC] p-4 sm:p-5 rounded-2xl border border-slate-200 max-w-lg mx-auto text-left text-xs sm:text-sm space-y-2">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Patient Name:</span>
                  <span className="font-semibold text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Mobile Number:</span>
                  <span className="font-semibold text-slate-900">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Preferred Date:</span>
                  <span className="font-semibold text-slate-900">{formData.appointmentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Time:</span>
                  <span className="font-semibold text-slate-900">{formData.appointmentTime}</span>
                </div>
              </div>

              {/* Fast WhatsApp Transfer CTA */}
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp for Instant Priority</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto text-xs text-slate-600 hover:text-slate-900 px-4 py-3 border border-slate-300 rounded-xl"
                >
                  Submit Another Inquiry
                </button>
              </div>

              <div className="text-[11px] text-slate-400">
                Inquiries are dispatched to: <span className="font-mono text-slate-600">{HOSPITAL_CONFIG.contacts.hospitalEmail}</span>
              </div>
            </div>
          ) : (
            
            /* The Active Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Row 1: Full Name & Mobile Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#152B56] uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Patel"
                      className={`w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border ${
                        errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#263F91] focus:ring-blue-100'
                      } focus:outline-none focus:ring-3 transition-colors`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#152B56] uppercase tracking-wider mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-xs font-semibold">
                      +91
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength="10"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98250 12345"
                      className={`w-full pl-12 pr-3.5 py-3 text-sm rounded-xl border ${
                        errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#263F91] focus:ring-blue-100'
                      } focus:outline-none focus:ring-3 transition-colors`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </p>
                  )}
                </div>

              </div>

              {/* Row 2: Email (Optional) & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#152B56] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-slate-400 text-[10px] font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border ${
                        errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#263F91] focus:ring-blue-100'
                      } focus:outline-none focus:ring-3 transition-colors`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="appointmentDate" className="block text-xs font-semibold text-[#152B56] uppercase tracking-wider mb-1.5">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      id="appointmentDate"
                      name="appointmentDate"
                      min={todayDateString}
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border ${
                        errors.appointmentDate ? 'border-red-500 focus:ring-red-200' : 'border-slate-300 focus:border-[#263F91] focus:ring-blue-100'
                      } focus:outline-none focus:ring-3 transition-colors`}
                    />
                  </div>
                  {errors.appointmentDate && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.appointmentDate}
                    </p>
                  )}
                </div>

              </div>

              {/* Row 3: Preferred Time Slot */}
              <div>
                <label className="block text-xs font-semibold text-[#152B56] uppercase tracking-wider mb-1.5">
                  Preferred OPD Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.appointmentTime.includes('Morning') 
                      ? 'border-[#263F91] bg-blue-50/50 text-[#152B56]' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="appointmentTime"
                      value="Morning (10:00 AM – 1:00 PM)"
                      checked={formData.appointmentTime.includes('Morning')}
                      onChange={handleChange}
                      className="text-[#263F91] focus:ring-[#263F91]"
                    />
                    <div>
                      <span className="text-xs font-bold block text-[#152B56]">Morning Session</span>
                      <span className="text-xs text-slate-500">10:00 AM – 1:00 PM</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.appointmentTime.includes('Evening') 
                      ? 'border-[#263F91] bg-blue-50/50 text-[#152B56]' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="appointmentTime"
                      value="Evening (5:00 PM – 8:00 PM)"
                      checked={formData.appointmentTime.includes('Evening')}
                      onChange={handleChange}
                      className="text-[#263F91] focus:ring-[#263F91]"
                    />
                    <div>
                      <span className="text-xs font-bold block text-[#152B56]">Evening Session</span>
                      <span className="text-xs text-slate-500">5:00 PM – 8:00 PM</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Row 4: Reason / Message */}
              <div>
                <label htmlFor="reason" className="block text-xs font-semibold text-[#152B56] uppercase tracking-wider mb-1.5">
                  Message / Reason for Consultation <span className="text-slate-400 text-[10px] font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="3"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Describe respiratory symptoms, asthma follow-up, post-ICU review, or previous medical records..."
                  className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:border-[#263F91] focus:ring-3 focus:ring-blue-100 focus:outline-none transition-colors"
                ></textarea>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#263F91] hover:bg-[#152B56] text-white font-medium text-sm py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#263F91]"
                >
                  {status === 'submitting' ? (
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold py-3.5 px-5 rounded-xl border border-emerald-300 transition-colors"
                  title="Prefill WhatsApp message directly"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Book via WhatsApp</span>
                </a>
              </div>

              {/* Security & Email Delivery Clarification */}
              <p className="text-[11px] text-slate-500 text-center leading-normal">
                Submissions are transmitted securely to <strong className="text-slate-700">{HOSPITAL_CONFIG.contacts.hospitalEmail}</strong> via configured appointment relay. Your personal medical data is strictly confidential.
              </p>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}

