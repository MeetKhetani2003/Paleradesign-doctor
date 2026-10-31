'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  X, 
  Share2, 
  Check, 
  Sparkles, 
  Code, 
  Palette, 
  Cloud, 
  Cpu, 
  TrendingUp, 
  Briefcase, 
  ExternalLink,
  Smartphone,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Pixel-perfect Brand SVGs matching screenshot
const InstagramIcon = ({ className = "w-5 h-5 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5.5" ry="5.5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.07 7.15C8.91 7.15 8.64 7.21 8.42 7.45C8.19 7.7 7.55 8.3 7.55 9.53C7.55 10.76 8.45 11.94 8.57 12.11C8.7 12.28 10.34 14.81 12.85 15.89C13.45 16.15 13.91 16.3 14.28 16.42C14.88 16.61 15.42 16.58 15.85 16.52C16.33 16.45 17.33 15.91 17.54 15.33C17.75 14.75 17.75 14.26 17.68 14.15C17.62 14.05 17.46 13.99 17.21 13.86C16.96 13.74 15.73 13.13 15.5 13.05C15.28 12.97 15.11 12.92 14.95 13.17C14.78 13.42 14.31 13.99 14.17 14.15C14.03 14.32 13.88 14.34 13.63 14.21C13.39 14.09 12.59 13.83 11.65 12.99C10.91 12.33 10.41 11.52 10.27 11.27C10.12 11.02 10.25 10.89 10.38 10.76C10.49 10.65 10.63 10.47 10.75 10.32C10.88 10.18 10.92 10.07 11 9.91C11.08 9.74 11.04 9.6 10.98 9.47C10.92 9.35 10.43 8.14 10.22 7.64C10.02 7.16 9.82 7.22 9.66 7.21C9.52 7.21 9.35 7.15 9.07 7.15Z" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5 text-white" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

export default function DynamicProfileView({ profile, isPreview = false }) {
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [displayTime, setDisplayTime] = useState("9:41");
  const [useLiveTime, setUseLiveTime] = useState(false);
  const [isFrameless, setIsFrameless] = useState(false);

  // Live time toggle
  useEffect(() => {
    if (!useLiveTime) {
      setDisplayTime("9:41");
      return;
    }
    const updateTime = () => {
      const now = new Date();
      setDisplayTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [useLiveTime]);

  // Share profile
  const handleShare = async () => {
    const shareData = {
      title: `${profile.brandNamePart1} ${profile.brandNamePart2}`,
      text: `${profile.tagline} - Official Link Card`,
      url: typeof window !== 'undefined' ? window.location.href : 'https://jgsinnovations.netlify.app'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (e) {}
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const handleCardClick = (card) => {
    if (card.actionType === 'modal') {
      setShowServicesModal(true);
    } else if (card.url) {
      window.open(card.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-0 sm:py-8 sm:px-4 select-none">
      
      {/* Top Floating Utility Bar (Desktop only) */}
      <div className="hidden sm:flex items-center gap-3 mb-5 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200/80 shadow-md text-xs font-semibold text-slate-700 z-50">
        <span className="flex items-center gap-1.5 text-amber-600 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JSG INNOVATIONS</span>
        </span>
        <span className="text-slate-300">|</span>
        <button 
          onClick={() => setUseLiveTime(!useLiveTime)} 
          className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
          title="Toggle Clock"
        >
          <span>Time: <span className="font-mono font-bold text-slate-900">{displayTime}</span></span>
        </button>
        <span className="text-slate-300">|</span>
        <button 
          onClick={() => setIsFrameless(!isFrameless)}
          className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
          title="Toggle Phone Frame"
        >
          {isFrameless ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isFrameless ? 'Phone Frame' : 'Full Card'}</span>
        </button>
        <span className="text-slate-300">|</span>
        <button 
          onClick={handleShare}
          className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
          title="Share profile link"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* SMARTPHONE WRAPPER (Exact match to screenshot's iPhone frame) */}
      <div className="relative group flex flex-col items-center">
        
        {/* Left Hardware Buttons (Action switch & Volume controls) */}
        {!isFrameless && (
          <div className="hidden sm:block absolute -left-[13px] top-[150px] space-y-4 pointer-events-none z-0">
            {/* Action button */}
            <div className="w-[4px] h-[32px] bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-l-md shadow-xs"></div>
            {/* Volume Up */}
            <div className="w-[4px] h-[58px] bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-l-md shadow-xs"></div>
            {/* Volume Down */}
            <div className="w-[4px] h-[58px] bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-l-md shadow-xs"></div>
          </div>
        )}

        {/* Right Hardware Button (Power / Siri) */}
        {!isFrameless && (
          <div className="hidden sm:block absolute -right-[13px] top-[195px] pointer-events-none z-0">
            <div className="w-[4px] h-[78px] bg-gradient-to-l from-zinc-600 to-zinc-800 rounded-r-md shadow-xs"></div>
          </div>
        )}

        {/* Outer Phone Shell */}
        <div 
          className={`relative z-10 w-full transition-all duration-300 ${
            isFrameless 
              ? 'max-w-[420px] sm:rounded-[36px] sm:shadow-2xl' 
              : 'max-w-[415px] sm:border-[9px] sm:border-[#18191c] sm:rounded-[54px] sm:ring-1 sm:ring-black/40 sm:shadow-[0_25px_75px_rgba(0,0,0,0.32),0_12px_28px_rgba(0,0,0,0.18)]'
          } overflow-hidden bg-white`}
        >
          
          {/* ================= CARD SCREEN INTERIOR ================= */}
          <div className="relative w-full min-h-[825px] sm:min-h-[845px] flex flex-col items-center justify-between px-6 pt-3 pb-6 overflow-hidden bg-[#FFFFFF]">
            
            {/* --- SVG BACKGROUND ARTWORK (Exact flowing gold curves, pastel waves, decorative dots) --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              <svg 
                className="w-full h-full object-cover" 
                viewBox="0 0 420 860" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Subtle top gold gradients */}
                  <linearGradient id="goldCurveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ECC876" stopOpacity="0.85" />
                    <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                  </linearGradient>
                  
                  <linearGradient id="goldCurveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE047" stopOpacity="0.75" />
                    <stop offset="55%" stopColor="#D97706" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Soft bottom sky wave gradient */}
                  <linearGradient id="skyWaveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.75" />
                    <stop offset="40%" stopColor="#E0F2FE" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>

                  {/* Soft bottom amber glow */}
                  <radialGradient id="bottomAmberGlow" cx="88%" cy="96%" r="42%">
                    <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                  
                  {/* Top right subtle glow */}
                  <radialGradient id="topRightGlow" cx="95%" cy="12%" r="52%">
                    <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Ambient glows */}
                <rect width="420" height="860" fill="url(#topRightGlow)" />
                <rect width="420" height="860" fill="url(#bottomAmberGlow)" />

                {/* Top Right Flowing Golden Curves */}
                <path 
                  d="M 160 -10 C 255 45 395 125 425 280" 
                  stroke="url(#goldCurveGrad1)" 
                  strokeWidth="1.8" 
                  fill="none" 
                />
                <path 
                  d="M 220 -20 C 305 65 410 160 435 330" 
                  stroke="url(#goldCurveGrad2)" 
                  strokeWidth="1.2" 
                  fill="none" 
                />
                <path 
                  d="M 270 -10 C 345 85 415 210 440 370" 
                  stroke="url(#goldCurveGrad1)" 
                  strokeWidth="0.8" 
                  fill="none" 
                  opacity="0.6" 
                />

                {/* Bottom Left Flowing Sky Blue Fluid Waves */}
                <path 
                  d="M -30 760 C 60 770 120 830 190 850 C 260 870 340 840 450 870 L 450 890 L -30 890 Z" 
                  fill="url(#skyWaveGrad)" 
                />
                <path 
                  d="M -20 810 C 70 800 140 850 240 860 C 310 870 390 850 450 865" 
                  stroke="#7DD3FC" 
                  strokeWidth="1.5" 
                  fill="none" 
                  opacity="0.45" 
                />

                {/* Decorative 3 Vertical Dots on Left (matching screenshot position) */}
                <circle cx="78" cy="242" r="2.2" fill="#CBD5E1" />
                <circle cx="78" cy="254" r="2.2" fill="#CBD5E1" />
                <circle cx="78" cy="266" r="2.2" fill="#CBD5E1" />

                {/* Decorative 6 Dots Grid on Bottom Right (2 columns of 3, matching screenshot) */}
                <circle cx="342" cy="785" r="2.2" fill="#93C5FD" opacity="0.8" />
                <circle cx="354" cy="785" r="2.2" fill="#93C5FD" opacity="0.8" />
                <circle cx="342" cy="797" r="2.2" fill="#93C5FD" opacity="0.8" />
                <circle cx="354" cy="797" r="2.2" fill="#93C5FD" opacity="0.8" />
                <circle cx="342" cy="809" r="2.2" fill="#93C5FD" opacity="0.8" />
                <circle cx="354" cy="809" r="2.2" fill="#93C5FD" opacity="0.8" />
              </svg>
            </div>

            {/* --- TOP STATUS BAR & DYNAMIC ISLAND --- */}
            <div className="relative z-20 w-full flex items-center justify-between pt-1 px-2 text-slate-900">
              {/* Clock (Left) */}
              <span className="font-semibold text-[14px] tracking-tight font-sans pl-1">
                {displayTime}
              </span>

              {/* Dynamic Island / Notch (Center) */}
              <div className="w-[102px] h-[26px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
                {/* Speaker slit / Sensor */}
                <div className="w-2.5 h-1 bg-[#1c1c1c] rounded-full"></div>
                {/* Front Camera Lens with realistic reflection */}
                <div className="relative w-3 h-3 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1e1b4b] opacity-80"></div>
                  <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-blue-300/80 rounded-full"></div>
                </div>
              </div>

              {/* Status Icons (Right: Cellular, Wi-Fi, Battery) */}
              <div className="flex items-center gap-1.5 text-slate-900 pr-1">
                {/* 4-bar Signal Icon */}
                <div className="flex items-end gap-[1.5px] h-[11px] pb-[1px]">
                  <span className="w-[2.5px] h-[3px] bg-slate-900 rounded-[0.5px]"></span>
                  <span className="w-[2.5px] h-[5px] bg-slate-900 rounded-[0.5px]"></span>
                  <span className="w-[2.5px] h-[8px] bg-slate-900 rounded-[0.5px]"></span>
                  <span className="w-[2.5px] h-[10px] bg-slate-900 rounded-[0.5px]"></span>
                </div>

                {/* Wi-Fi Icon */}
                <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                </svg>

                {/* Battery Indicator with Fill */}
                <div className="relative w-[22px] h-[11px] rounded-[3px] border-[1.5px] border-slate-900 p-[1px] flex items-center">
                  <div className="h-full w-full bg-slate-900 rounded-[1px]"></div>
                  <div className="absolute -right-[3px] top-[2.5px] w-[1.5px] h-[4px] bg-slate-900 rounded-r-[0.5px]"></div>
                </div>
              </div>
            </div>

            {/* --- CONTENT CONTAINER --- */}
            <div className="relative z-10 w-full flex flex-col items-center mt-2.5">
              
              {/* 1. CIRCULAR LOGO BADGE (Pristine Double Gold Metallic Ring with Logo) */}
              <div className="relative flex items-center justify-center mb-2.5">
                <img 
                  src="/assets/jsg-logo.png" 
                  alt="JSG Innovations" 
                  className="w-[165px] h-[165px] object-contain drop-shadow-[0_8px_24px_rgba(217,119,6,0.22)] transform hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* 2. BRAND TITLE: "JSG INNOVATIONS" */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="font-extrabold text-[24px] sm:text-[26px] tracking-tight text-[#111827] uppercase font-sans">
                  JSG
                </span>
                <span 
                  className="font-extrabold text-[24px] sm:text-[26px] tracking-tight uppercase font-sans"
                  style={{
                    background: 'linear-gradient(135deg, #C27803 0%, #E39912 35%, #F59E0B 70%, #FBBF24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  INNOVATIONS
                </span>
              </div>

              {/* 3. SLOGAN DIVIDER: "— INNOVATING THE DIGITAL FUTURE —" */}
              <div className="w-full flex items-center justify-center gap-2 mb-4 px-3">
                <div className="h-[1.5px] w-9 bg-gradient-to-r from-transparent via-[#EAB308] to-[#D97706] rounded-full"></div>
                <span className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.16em] text-[#334155] uppercase whitespace-nowrap">
                  {profile.tagline || 'INNOVATING THE DIGITAL FUTURE'}
                </span>
                <div className="h-[1.5px] w-9 bg-gradient-to-l from-transparent via-[#EAB308] to-[#D97706] rounded-full"></div>
              </div>

              {/* 4. THREE SOCIAL QUICK ACTIONS (Instagram, WhatsApp, Website) */}
              <div className="flex items-center justify-center gap-4 mb-4.5">
                
                {/* Instagram Quick Action */}
                <a 
                  href={profile.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-[46px] h-[46px] rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(221,42,123,0.32)] hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(45deg, #F58529 0%, #FEDA77 15%, #DD2A7B 50%, #8134AF 85%, #515BD4 100%)'
                  }}
                  title="Instagram"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                  <InstagramIcon className="w-5 h-5 text-white drop-shadow-sm group-hover:scale-105 transition-transform" />
                </a>

                {/* WhatsApp Quick Action */}
                <a 
                  href={profile.actionCards.find(c => c.id === 'card-whatsapp')?.url || `https://wa.me/${profile.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-[46px] h-[46px] rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(37,211,102,0.35)] hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)'
                  }}
                  title="Chat On WhatsApp"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                  <WhatsAppIcon className="w-5 h-5 text-white drop-shadow-sm group-hover:scale-105 transition-transform" />
                </a>

                {/* Website Quick Action */}
                <a 
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-[46px] h-[46px] rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(245,158,11,0.35)] hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)'
                  }}
                  title="Official Website"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
                  <GlobeIcon className="w-5 h-5 text-white drop-shadow-sm group-hover:scale-105 transition-transform" />
                </a>

              </div>

              {/* 5. THE FOUR ACTION CARDS (Stacked with 3D colorful left accents & chevron pills) */}
              <div className="w-full space-y-3.5 px-0.5">
                
                {/* --- CARD 1: WEBSITE --- */}
                <div 
                  onClick={() => handleCardClick(profile.actionCards[0])}
                  className="group relative w-full rounded-[22px] p-[2.5px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(245,158,11,0.18)]"
                  style={{
                    background: 'linear-gradient(90deg, #F59E0B 0%, rgba(245, 158, 11, 0.45) 28%, rgba(245, 158, 11, 0.08) 60%, rgba(226, 232, 240, 0.4) 100%)'
                  }}
                >
                  <div className="w-full bg-white rounded-[20px] p-3 sm:py-3.5 sm:px-4 flex items-center justify-between">
                    
                    {/* Left Icon + Text */}
                    <div className="flex items-center gap-3.5">
                      {/* 3D Circular Icon Button */}
                      <div 
                        className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(245,158,11,0.35)]"
                        style={{
                          background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 55%, #D97706 100%)'
                        }}
                      >
                        <GlobeIcon className="w-5 h-5 text-white drop-shadow-xs" />
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-[15.5px] text-[#0F172A] tracking-tight leading-snug group-hover:text-amber-600 transition-colors">
                          Website
                        </span>
                        <span className="text-[12.5px] font-medium text-slate-500 tracking-tight leading-snug">
                          {profile.websiteDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Right Chevron Button Pill */}
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FEF3C7] border border-amber-200/60 flex items-center justify-center text-[#D97706] group-hover:translate-x-0.5 transition-transform shrink-0 shadow-xs">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                  </div>
                </div>

                {/* --- CARD 2: INSTAGRAM --- */}
                <div 
                  onClick={() => handleCardClick(profile.actionCards[1])}
                  className="group relative w-full rounded-[22px] p-[2.5px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(236,72,153,0.18)]"
                  style={{
                    background: 'linear-gradient(90deg, #EC4899 0%, rgba(236, 72, 153, 0.45) 28%, rgba(236, 72, 153, 0.08) 60%, rgba(226, 232, 240, 0.4) 100%)'
                  }}
                >
                  <div className="w-full bg-white rounded-[20px] p-3 sm:py-3.5 sm:px-4 flex items-center justify-between">
                    
                    {/* Left Icon + Text */}
                    <div className="flex items-center gap-3.5">
                      {/* 3D Circular Icon Button */}
                      <div 
                        className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(236,72,153,0.35)]"
                        style={{
                          background: 'linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)'
                        }}
                      >
                        <InstagramIcon className="w-5 h-5 text-white drop-shadow-xs" />
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-[15.5px] text-[#0F172A] tracking-tight leading-snug group-hover:text-pink-600 transition-colors">
                          Instagram
                        </span>
                        <span className="text-[12.5px] font-medium text-slate-500 tracking-tight leading-snug">
                          {profile.instagramHandle}
                        </span>
                      </div>
                    </div>

                    {/* Right Chevron Button Pill */}
                    <div className="w-[34px] h-[34px] rounded-full bg-[#FCE7F3] border border-pink-200/60 flex items-center justify-center text-[#DB2777] group-hover:translate-x-0.5 transition-transform shrink-0 shadow-xs">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                  </div>
                </div>

                {/* --- CARD 3: CHAT ON WHATSAPP --- */}
                <div 
                  onClick={() => handleCardClick(profile.actionCards[2])}
                  className="group relative w-full rounded-[22px] p-[2.5px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(34,197,94,0.18)]"
                  style={{
                    background: 'linear-gradient(90deg, #22C55E 0%, rgba(34, 197, 94, 0.45) 28%, rgba(34, 197, 94, 0.08) 60%, rgba(226, 232, 240, 0.4) 100%)'
                  }}
                >
                  <div className="w-full bg-white rounded-[20px] p-3 sm:py-3.5 sm:px-4 flex items-center justify-between">
                    
                    {/* Left Icon + Text */}
                    <div className="flex items-center gap-3.5">
                      {/* 3D Circular Icon Button */}
                      <div 
                        className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(34,197,94,0.35)]"
                        style={{
                          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 55%, #15803D 100%)'
                        }}
                      >
                        <WhatsAppIcon className="w-5 h-5 text-white drop-shadow-xs" />
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-[15.5px] text-[#0F172A] tracking-tight leading-snug group-hover:text-emerald-600 transition-colors">
                          Chat On WhatsApp
                        </span>
                        <span className="text-[12.5px] font-medium text-slate-500 tracking-tight leading-snug">
                          Get in touch with us
                        </span>
                      </div>
                    </div>

                    {/* Right Chevron Button Pill */}
                    <div className="w-[34px] h-[34px] rounded-full bg-[#DCFCE7] border border-emerald-200/60 flex items-center justify-center text-[#16A34A] group-hover:translate-x-0.5 transition-transform shrink-0 shadow-xs">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                  </div>
                </div>

                {/* --- CARD 4: OUR SERVICES --- */}
                <div 
                  onClick={() => handleCardClick(profile.actionCards[3])}
                  className="group relative w-full rounded-[22px] p-[2.5px] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_8px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_28px_rgba(14,165,233,0.18)]"
                  style={{
                    background: 'linear-gradient(90deg, #0EA5E9 0%, rgba(14, 165, 233, 0.45) 28%, rgba(14, 165, 233, 0.08) 60%, rgba(226, 232, 240, 0.4) 100%)'
                  }}
                >
                  <div className="w-full bg-white rounded-[20px] p-3 sm:py-3.5 sm:px-4 flex items-center justify-between">
                    
                    {/* Left Icon + Text */}
                    <div className="flex items-center gap-3.5">
                      {/* 3D Circular Icon Button */}
                      <div 
                        className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_12px_rgba(14,165,233,0.35)]"
                        style={{
                          background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 55%, #0284C7 100%)'
                        }}
                      >
                        <UsersIcon className="w-5 h-5 text-white drop-shadow-xs" />
                      </div>

                      {/* Text block */}
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-[15.5px] text-[#0F172A] tracking-tight leading-snug group-hover:text-sky-600 transition-colors">
                          Our Services
                        </span>
                        <span className="text-[12.5px] font-medium text-slate-500 tracking-tight leading-snug">
                          Know More about our Services
                        </span>
                      </div>
                    </div>

                    {/* Right Chevron Button Pill */}
                    <div className="w-[34px] h-[34px] rounded-full bg-[#E0F2FE] border border-sky-200/60 flex items-center justify-center text-[#0284C7] group-hover:translate-x-0.5 transition-transform shrink-0 shadow-xs">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>

                  </div>
                </div>

              </div>

            </div>

            {/* --- BOTTOM HOME BAR INDICATOR (iPhone Style) --- */}
            <div className="relative z-10 w-full pt-6 pb-1 flex justify-center">
              <div className="w-32 h-1 bg-slate-300/80 rounded-full"></div>
            </div>

          </div>

        </div>

        {/* Realistic Floor Shadow Under Mockup (Visible on Desktop) */}
        {!isFrameless && (
          <div className="hidden sm:block w-[320px] h-[20px] bg-black/25 blur-xl rounded-full mx-auto mt-2"></div>
        )}

      </div>

      {/* --- SERVICES MODAL (Triggered by 'Our Services' Card) --- */}
      {showServicesModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-slide-up border border-slate-100"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Our Services</h3>
                  <p className="text-xs text-slate-500">JSG INNOVATIONS &bull; Driving Digital Growth</p>
                </div>
              </div>
              <button 
                onClick={() => setShowServicesModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {profile.servicesList.map((service) => (
                <div 
                  key={service.id}
                  className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 hover:border-sky-200 transition-all text-left flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-sky-600 shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                    {service.icon === 'code' && <Code className="w-4 h-4" />}
                    {service.icon === 'palette' && <Palette className="w-4 h-4" />}
                    {service.icon === 'cloud' && <Cloud className="w-4 h-4" />}
                    {service.icon === 'cpu' && <Cpu className="w-4 h-4" />}
                    {service.icon === 'trending-up' && <TrendingUp className="w-4 h-4" />}
                    {service.icon === 'briefcase' && <Briefcase className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{service.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a 
                href={profile.actionCards.find(c => c.id === 'card-whatsapp')?.url || `https://wa.me/${profile.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Discuss a Project on WhatsApp</span>
              </a>

              <a 
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                <span>Visit Website</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* --- TOAST NOTIFICATION (Copy link feedback) --- */}
      {copiedToast && (
        <div className="fixed bottom-6 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fade-in border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}

    </div>
  );
}
