import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, Stethoscope } from 'lucide-react';
import { HOSPITAL_CONFIG } from '../config';

export default function Header({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Doctor', href: '#about' },
    { name: 'Qualifications', href: '#qualifications' },
    { name: 'OPD Timings', href: '#timings' },
    { name: 'Hospital', href: '#hospital' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Official Hospital & Doctor Identity */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#263F91] rounded-lg p-1">
            <img
              src={HOSPITAL_CONFIG.assets.logo}
              alt="Premier Hospital & ICU Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              width="210"
              height="40"
            />
            <div className="hidden xl:block border-l border-slate-200 pl-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#263F91]">
                Dr. Avinash Kasundra
              </span>
              <span className="block text-[11px] text-slate-500 font-medium">
                Pulmonologist &amp; Intensivist
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-[13px] font-medium text-slate-700 hover:text-[#263F91] hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#152B56] hover:text-[#263F91] px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              title="Call Doctor directly"
            >
              <Phone className="w-3.5 h-3.5 text-[#263F91]" />
              <span>{HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 bg-[#263F91] hover:bg-[#152B56] text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenBooking}
              className="bg-[#263F91] text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-[#263F91] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#263F91]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="border-b border-slate-100 pb-3">
            <p className="text-xs font-semibold text-[#263F91] uppercase tracking-wider">
              Dr. Avinash Kasundra
            </p>
            <p className="text-xs text-slate-500">
              Consultant Intensivist &amp; Pulmonologist
            </p>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#263F91] hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#263F91] text-white text-sm font-medium py-2.5 rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>

            <a
              href={`tel:${HOSPITAL_CONFIG.contacts.doctorPhoneRaw}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-50 text-[#152B56] text-sm font-medium py-2.5 rounded-lg border border-slate-200"
            >
              <Phone className="w-4 h-4 text-[#263F91]" />
              <span>Call Doctor: {HOSPITAL_CONFIG.contacts.doctorPhoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

