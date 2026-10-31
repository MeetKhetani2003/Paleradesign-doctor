'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Globe, 
  Award, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  X, 
  Send, 
  CheckCircle2, 
  Loader2, 
  GraduationCap, 
  HeartPulse, 
  Wind, 
  Activity, 
  Share2, 
  Wifi, 
  Battery, 
  Building2, 
  Stethoscope, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Check, 
  Plane, 
  Headphones, 
  Map, 
  ExternalLink,
  Briefcase,
  FileText,
  Download,
  User,
  Users,
  Camera,
  Laptop,
  ShoppingBag,
  Coffee,
  Utensils,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Flame,
  Zap,
  Compass,
  Moon,
  Sun,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';

const Instagram = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const Facebook = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const Youtube = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
  </svg>
);
const Linkedin = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const Twitter = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const ALL_ICONS = {
  // Healthcare
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  wind: Wind,
  activity: Activity,
  'shield-alert': ShieldAlert,
  hospital: Building2,
  
  // Communication & Social
  phone: Phone,
  message: MessageSquare,
  'message-square': MessageSquare,
  mail: Mail,
  'map-pin': MapPin,
  globe: Globe,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  send: Send,
  share: Share2,
  'share-2': Share2,

  // General & Business
  calendar: Calendar,
  clock: Clock,
  award: Award,
  'graduation-cap': GraduationCap,
  star: Star,
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
  shield: ShieldCheck,
  check: Check,
  'check-circle-2': CheckCircle2,
  building: Building2,
  'building-2': Building2,
  briefcase: Briefcase,
  'file-text': FileText,
  external: ExternalLink,
  download: Download,
  user: User,
  users: Users,
  plane: Plane,
  headphones: Headphones,
  map: Map,
  camera: Camera,
  laptop: Laptop,
  'shopping-bag': ShoppingBag,
  coffee: Coffee,
  utensils: Utensils,
  'book-open': BookOpen,
  flame: Flame,
  zap: Zap,
  compass: Compass,
  moon: Moon,
  sun: Sun,
  music: Music,
  help: HelpCircle,
  alert: AlertCircle
};

export function DynamicIcon({ name, className = "w-5 h-5" }) {
  const IconComponent = ALL_ICONS[name] || Globe;
  return <IconComponent className={className} />;
}

// Preset themes for buttons
const THEME_CLASSES = {
  amber: {
    bg: 'from-amber-950/70 via-slate-900/80 to-slate-950/90 border-amber-400/40 hover:border-amber-400/80 shadow-amber-950/20',
    iconBg: 'from-amber-400 to-amber-600 text-slate-950 border-amber-200',
    titleHover: 'group-hover:text-amber-300',
    subtitle: 'text-amber-200/90',
    chevronHover: 'group-hover:bg-amber-400 group-hover:text-slate-950'
  },
  red: {
    bg: 'from-red-950/75 via-slate-900/80 to-slate-950/90 border-red-500/40 hover:border-red-400/80 shadow-red-950/20',
    iconBg: 'from-red-500 to-rose-700 text-white border-red-300',
    titleHover: 'group-hover:text-red-300',
    subtitle: 'text-red-200/90',
    chevronHover: 'group-hover:bg-red-500 group-hover:text-white'
  },
  cyan: {
    bg: 'from-cyan-950/70 via-slate-900/80 to-slate-950/90 border-cyan-400/40 hover:border-cyan-400/80 shadow-cyan-950/20',
    iconBg: 'from-cyan-400 to-teal-600 text-slate-950 border-cyan-200',
    titleHover: 'group-hover:text-cyan-300',
    subtitle: 'text-cyan-200/90',
    chevronHover: 'group-hover:bg-cyan-400 group-hover:text-slate-950'
  },
  emerald: {
    bg: 'from-emerald-950/70 via-slate-900/80 to-slate-950/90 border-emerald-400/40 hover:border-emerald-400/80 shadow-emerald-950/20',
    iconBg: 'from-emerald-400 to-green-600 text-slate-950 border-emerald-200',
    titleHover: 'group-hover:text-emerald-300',
    subtitle: 'text-emerald-200/90',
    chevronHover: 'group-hover:bg-emerald-400 group-hover:text-slate-950'
  },
  blue: {
    bg: 'from-blue-950/70 via-indigo-950/60 to-slate-950/90 border-blue-400/40 hover:border-blue-400/80 shadow-blue-950/20',
    iconBg: 'from-blue-400 to-indigo-600 text-slate-950 border-blue-200',
    titleHover: 'group-hover:text-blue-300',
    subtitle: 'text-blue-200/90',
    chevronHover: 'group-hover:bg-blue-400 group-hover:text-slate-950'
  },
  indigo: {
    bg: 'from-slate-900/80 via-indigo-950/70 to-slate-950/90 border-indigo-400/40 hover:border-indigo-400/80 shadow-indigo-950/20',
    iconBg: 'from-indigo-400 to-violet-600 text-white border-indigo-200',
    titleHover: 'group-hover:text-indigo-300',
    subtitle: 'text-indigo-200/90',
    chevronHover: 'group-hover:bg-indigo-400 group-hover:text-slate-950'
  },
  purple: {
    bg: 'from-purple-950/70 via-slate-900/80 to-slate-950/90 border-purple-400/40 hover:border-purple-400/80 shadow-purple-950/20',
    iconBg: 'from-purple-400 to-pink-600 text-white border-purple-200',
    titleHover: 'group-hover:text-purple-300',
    subtitle: 'text-purple-200/90',
    chevronHover: 'group-hover:bg-purple-400 group-hover:text-slate-950'
  },
  slate: {
    bg: 'from-slate-900/85 via-slate-950/80 to-slate-950/90 border-slate-600/40 hover:border-slate-400/80 shadow-slate-950/20',
    iconBg: 'from-slate-600 to-slate-800 text-white border-slate-500',
    titleHover: 'group-hover:text-white',
    subtitle: 'text-slate-300',
    chevronHover: 'group-hover:bg-slate-300 group-hover:text-slate-950'
  }
};

const ACTION_CIRCLE_COLORS = {
  blue: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 border-blue-400/40',
  emerald: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 border-emerald-400/40',
  red: 'bg-gradient-to-br from-rose-500 via-red-600 to-red-800 border-red-400/40',
  cyan: 'bg-gradient-to-br from-cyan-600 via-sky-700 to-blue-900 border-cyan-400/40',
  amber: 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 border-amber-300/40',
  purple: 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-800 border-purple-400/40'
};

const RING_GRADIENTS = {
  amber: 'from-amber-400 via-blue-500 to-cyan-400',
  blue: 'from-blue-400 via-indigo-500 to-cyan-400',
  cyan: 'from-cyan-400 via-teal-500 to-blue-500',
  emerald: 'from-emerald-400 via-teal-500 to-lime-400',
  purple: 'from-purple-400 via-pink-500 to-amber-400',
  rose: 'from-rose-400 via-red-500 to-amber-400'
};

export default function DynamicProfileView({ profile, isPreview = false }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQualsOpen, setIsQualsOpen] = useState(false);
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('9:41');
  const [formStatus, setFormStatus] = useState('idle');
  const [token, setToken] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentTime: 'Morning: 10:00 AM – 1:00 PM',
    reason: ''
  });

  useEffect(() => {
    if (profile?.header?.timeFormat === 'live_ist') {
      const updateClock = () => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const istTime = new Date(utc + (3600000 * 5.5));
        const hours12 = istTime.getHours() % 12 || 12;
        const mins = istTime.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours12}:${mins}`);
      };
      updateClock();
      const interval = setInterval(updateClock, 30000);
      return () => clearInterval(interval);
    }
  }, [profile?.header?.timeFormat]);

  const handleShare = async () => {
    const shareData = {
      title: profile.name,
      text: `${profile.name} - ${profile.designation}`,
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
      }
    } catch {
      // User cancelled
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setToken(`REF-${Math.floor(100000 + Math.random() * 900000)}`);
      setFormStatus('success');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }, 800);
  };

  const handleSectionClick = (section) => {
    if (section.actionType === 'modal_booking') {
      setIsBookingOpen(true);
    } else if (section.actionType === 'modal_quals') {
      setIsQualsOpen(true);
    } else if (section.actionType === 'modal_specialties') {
      setIsSpecialtiesOpen(true);
    } else if (section.actionType === 'call' && section.actionTarget) {
      window.location.href = section.actionTarget;
    } else if (section.actionType === 'whatsapp' && section.actionTarget) {
      window.open(section.actionTarget, '_blank');
    } else if (section.actionTarget && section.actionTarget !== '#') {
      window.open(section.actionTarget, '_blank');
    }
  };

  const theme = profile.theme || {};
  const header = profile.header || {};
  const quickActions = profile.quickActions || [];
  const sections = profile.sections || [];
  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  const isWideLayout = !isPreview && theme.layoutMode === 'expanded';

  return (
    <div 
      className={`relative w-full ${isPreview ? 'h-full flex items-center justify-center p-2' : 'min-h-screen flex flex-col items-center justify-start sm:justify-center p-0 sm:py-8 sm:px-4'} selection:bg-amber-400 selection:text-black overflow-x-hidden font-sans`}
      style={{ backgroundColor: theme.backgroundColor || '#040814' }}
    >
      
      {/* 1. DYNAMIC BACKGROUND (PHOTO / GIF / GRADIENT) */}
      <div className={`${isPreview ? 'absolute' : 'fixed'} inset-0 pointer-events-none z-0 overflow-hidden`}>
        {theme.backgroundImageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
            style={{ 
              backgroundImage: `url('${theme.backgroundImageUrl}')`,
              filter: theme.backgroundBlur ? `blur(${theme.backgroundBlur}px)` : 'none'
            }}
          ></div>
        ) : (
          <div 
            className="absolute inset-0"
            style={{ background: theme.customBackgroundGradient || 'linear-gradient(to bottom, #071126, #040814, #000000)' }}
          ></div>
        )}

        {/* Dynamic Dark Overlay */}
        <div 
          className="absolute inset-0 bg-black backdrop-blur-[1px]"
          style={{ opacity: (theme.overlayOpacity ?? 75) / 100 }}
        ></div>

        {/* Vignette */}
        {theme.vignette !== false && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712]/95 pointer-events-none"></div>
        )}

        {/* Dynamic Spotlights */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ background: theme.spotlights?.top ? `radial-gradient(circle, ${theme.spotlights.top} 0%, transparent 70%)` : 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, transparent 70%)' }}
        ></div>
        <div 
          className="absolute top-1/4 -left-28 w-88 h-88 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: theme.spotlights?.left ? `radial-gradient(circle, ${theme.spotlights.left} 0%, transparent 70%)` : 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)' }}
        ></div>
        <div 
          className="absolute bottom-1/3 -right-28 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: theme.spotlights?.right ? `radial-gradient(circle, ${theme.spotlights.right} 0%, transparent 70%)` : 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)' }}
        ></div>
      </div>

      {/* 2. MAIN CONTAINER (SMARTPHONE MOCKUP OR EXPANDED EDITORIAL DESKTOP) */}
      <main className={`relative z-10 w-full ${isWideLayout ? 'max-w-4xl sm:my-auto bg-[#071126]/90 sm:backdrop-blur-2xl sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl' : 'max-w-[430px] sm:my-auto bg-[#071126]/85 sm:backdrop-blur-2xl rounded-none sm:rounded-[52px] sm:border-[6px] sm:border-slate-700/80 sm:shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_60px_rgba(38,63,145,0.35)]'} ${isPreview ? 'h-[780px] max-h-full overflow-y-auto' : 'min-h-screen sm:min-h-0'} flex flex-col items-center overflow-x-hidden pb-8 transition-all`}>
        
        {/* Status Bar */}
        <div className="w-full pt-3 px-7 pb-1 flex items-center justify-between text-xs text-white/90 select-none">
          <span className="font-semibold tracking-tight text-xs font-mono">{currentTime}</span>

          <div className="hidden sm:block w-24 h-4 bg-black rounded-full border border-white/10 shadow-inner"></div>

          <div className="flex items-center gap-1.5 text-white/85">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-1.5 bg-white rounded-xs"></span>
              <span className="w-0.5 h-2 bg-white rounded-xs"></span>
              <span className="w-0.5 h-2.5 bg-white rounded-xs"></span>
              <span className="w-0.5 h-3 bg-white rounded-xs"></span>
            </div>
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Live Status Badge & Share Action */}
        <div className="w-full flex items-center justify-between px-5 pt-2.5 text-xs">
          {header.showStatusPill !== false && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-300 shadow-md">
              <span className={`w-2 h-2 rounded-full ${header.statusPillDotColor === 'amber' ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span dangerouslySetInnerHTML={{ __html: header.statusPillText || 'Active Now' }} />
            </div>
          )}

          {header.showShareButton !== false && (
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 hover:bg-slate-800 text-slate-300 hover:text-white transition-all transform active:scale-95"
              title="Share Profile"
              aria-label="Share profile link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Circular Avatar with Glowing Ring */}
        {profile.avatarUrl && (
          <div className="relative mt-4 mb-2 flex items-center justify-center">
            {profile.avatarHasOrbit !== false && (
              <div 
                className="absolute -inset-2.5 rounded-full border border-dashed border-amber-400/50 pointer-events-none"
                style={{ animation: `spin-slow ${profile.avatarOrbitSpeed || 24}s linear infinite` }}
              ></div>
            )}
            <div 
              className="absolute -inset-1 rounded-full opacity-80 blur-xs"
              style={{
                background: profile.avatarRingCustomGradient || undefined,
                className: profile.avatarRingCustomGradient ? '' : `bg-gradient-to-tr ${RING_GRADIENTS[profile.avatarRingColor || 'amber']}`
              }}
            ></div>
            
            <div 
              className="relative rounded-full overflow-hidden p-1 shadow-[0_10px_35px_rgba(0,0,0,0.7)]"
              style={{
                width: profile.avatarSize === 'large' ? '160px' : (profile.avatarSize === 'small' ? '110px' : '136px'),
                height: profile.avatarSize === 'large' ? '160px' : (profile.avatarSize === 'small' ? '110px' : '136px'),
                border: `${profile.avatarBorderWidth || 2}px solid ${profile.avatarBorderColor || '#F59E0B'}`,
                background: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.8), rgba(255, 255, 255, 0.2), transparent)'
              }}
            >
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>

            {profile.avatarBadgeText && (
              <div className="absolute -bottom-2.5 inset-x-0 mx-auto w-fit bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full border border-amber-300 shadow-lg flex items-center gap-1">
                <DynamicIcon name={profile.avatarBadgeIcon || 'award'} className="w-3 h-3 text-slate-950" />
                <span>{profile.avatarBadgeText}</span>
              </div>
            )}
          </div>
        )}

        {/* Doctor Header & Dual-tone Branding */}
        <div className="text-center px-4 space-y-1 mt-2.5">
          {profile.isDualToneTitle && profile.titlePart1 ? (
            <h1 className="text-2xl sm:text-[27px] font-black tracking-tight font-heading drop-shadow-md flex items-center justify-center gap-2">
              <span style={{ color: profile.titlePart1Color || '#FFFFFF' }}>{profile.titlePart1}</span>
              <span 
                className="bg-clip-text text-transparent font-black"
                style={{
                  backgroundImage: profile.titlePart2CustomGradient || 'linear-gradient(to right, #FDE68A, #F59E0B, #D97706)'
                }}
              >
                {profile.titlePart2}
              </span>
            </h1>
          ) : (
            <h1 
              className="text-2xl sm:text-[27px] font-black tracking-tight font-heading drop-shadow-md"
              style={{ color: profile.titleColor || '#FFFFFF' }}
            >
              {profile.name}
            </h1>
          )}

          {profile.designation && (
            <p 
              className="text-xs sm:text-[13px] font-bold tracking-wide"
              style={{ color: profile.designationColor || '#67E8F9' }}
            >
              {profile.designation}
            </p>
          )}

          {profile.subDesignation && (
            <p 
              className="text-[11px] font-medium"
              style={{ color: profile.subDesignationColor || '#CBD5E1' }}
            >
              {profile.subDesignation}
            </p>
          )}

          {/* Brand Logo Pill */}
          {profile.brandLogoUrl && (
            <div className="pt-1.5 flex items-center justify-center">
              <a 
                href={profile.brandLogoLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 px-4 py-1.5 rounded-xl shadow-lg border border-white/50 hover:bg-white transition-all transform hover:scale-105 inline-flex items-center gap-2"
                title="Visit Official Website"
              >
                <img
                  src={profile.brandLogoUrl}
                  alt={profile.name}
                  className="h-6 w-auto object-contain"
                />
              </a>
            </div>
          )}
        </div>

        {/* Quick Action Circles */}
        {quickActions.length > 0 && (
          <div className="flex items-center justify-center gap-3 my-4 px-4 flex-wrap">
            {quickActions.map((qa) => {
              const colorClass = ACTION_CIRCLE_COLORS[qa.bgColor] || ACTION_CIRCLE_COLORS.blue;
              const customStyle = qa.customBg ? { background: qa.customBg } : {};
              return (
                <a
                  key={qa.id}
                  href={qa.url || '#'}
                  target={qa.url?.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full ${colorClass} text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border relative group`}
                  style={customStyle}
                  title={qa.label}
                  aria-label={qa.label}
                >
                  <DynamicIcon name={qa.icon} className="w-4 h-4" />
                  {qa.pingBadge && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
                  )}
                  <span className="sr-only">{qa.label}</span>
                </a>
              );
            })}
          </div>
        )}

        {/* 3. DYNAMIC ORDERED SECTIONS & RICH LINK BUTTONS */}
        <div className={`w-full px-4 space-y-3 ${isWideLayout ? 'max-w-2xl' : ''}`}>
          {sortedSections.map((sec) => {
            if (sec.type === 'button') {
              const themeStyle = THEME_CLASSES[sec.buttonTheme || 'amber'] || THEME_CLASSES.amber;
              const hasCustomBg = !!sec.customBg || !!sec.customGradient;
              const customCardStyle = hasCustomBg ? {
                background: sec.customGradient || sec.customBg,
                borderColor: sec.customBorderColor || undefined,
                color: sec.customTextColor || undefined
              } : (sec.customBorderColor ? { borderColor: sec.customBorderColor } : {});

              return (
                <button
                  key={sec.id}
                  onClick={() => handleSectionClick(sec)}
                  className={`w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 ${hasCustomBg ? '' : `bg-gradient-to-r ${themeStyle.bg}`} border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg group cursor-pointer`}
                  style={customCardStyle}
                >
                  {/* Blended Right Background Thumbnail Image or GIF */}
                  {sec.thumbnailUrl && (
                    <div 
                      className="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center pointer-events-none transition-opacity duration-300"
                      style={{ 
                        backgroundImage: `url('${sec.thumbnailUrl}')`,
                        opacity: (sec.thumbnailOpacity ?? 30) / 100,
                        maskImage: 'linear-gradient(to right, transparent 0%, black 75%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 75%)'
                      }}
                    ></div>
                  )}

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-11 h-11 rounded-full ${hasCustomBg && sec.customIconBg ? '' : `bg-gradient-to-br ${themeStyle.iconBg}`} flex items-center justify-center shadow-md shrink-0 border`}
                        style={sec.customIconBg ? { background: sec.customIconBg, color: sec.customIconColor || '#000000' } : {}}
                      >
                        <DynamicIcon name={sec.buttonIcon} className="w-5 h-5" />
                      </div>
                      <div className="pr-2">
                        <h2 
                          className={`text-sm font-black text-white ${themeStyle.titleHover} transition-colors`}
                          style={sec.customTitleColor ? { color: sec.customTitleColor } : {}}
                        >
                          {sec.buttonTitle}
                        </h2>
                        {sec.buttonSubtitle && (
                          <p 
                            className={`text-[11px] ${themeStyle.subtitle} font-medium`}
                            style={sec.customSubtitleColor ? { color: sec.customSubtitleColor } : {}}
                          >
                            {sec.buttonSubtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full bg-white/10 ${themeStyle.chevronHover} flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              );
            }

            if (sec.type === 'text_block') {
              return (
                <div 
                  key={sec.id} 
                  className={`py-2 px-3 text-${sec.textAlign || 'center'}`}
                  style={{ 
                    color: sec.textColor || '#FFFFFF',
                    backgroundColor: sec.textBgColor || 'transparent',
                    borderRadius: sec.textBgColor ? '12px' : '0'
                  }}
                >
                  {sec.textType === 'h1' && (
                    <h1 className="text-xl font-black tracking-tight" style={{ fontSize: sec.fontSize ? `${sec.fontSize}px` : undefined }}>{sec.textContent}</h1>
                  )}
                  {sec.textType === 'h2' && (
                    <h2 className="text-lg font-black tracking-tight" style={{ fontSize: sec.fontSize ? `${sec.fontSize}px` : undefined }}>{sec.textContent}</h2>
                  )}
                  {sec.textType === 'h3' && (
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300" style={{ fontSize: sec.fontSize ? `${sec.fontSize}px` : undefined }}>{sec.textContent}</h3>
                  )}
                  {sec.textType === 'paragraph' && (
                    <p className="text-xs text-slate-300 leading-relaxed" style={{ fontSize: sec.fontSize ? `${sec.fontSize}px` : undefined }}>{sec.textContent}</p>
                  )}
                  {sec.textType === 'callout' && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                      {sec.textContent}
                    </div>
                  )}
                  {sec.textType === 'quote' && (
                    <blockquote className="italic border-l-2 border-amber-400 pl-3 text-xs text-slate-300">
                      "{sec.textContent}"
                    </blockquote>
                  )}
                </div>
              );
            }

            if (sec.type === 'feature_grid') {
              const cols = sec.gridColumns === 2 ? 'grid-cols-2' : (sec.gridColumns === 3 ? 'grid-cols-3' : 'grid-cols-4');
              return (
                <div key={sec.id} className="w-full mt-2">
                  <div className={`w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/15 p-3.5 grid ${cols} gap-2 text-center shadow-lg`}>
                    {(sec.gridItems || []).map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center space-y-1">
                        <DynamicIcon name={item.icon || 'star'} className="w-5 h-5 text-amber-400" />
                        <span className="text-[10px] font-semibold text-slate-300 leading-tight">{item.title}</span>
                        {item.subtitle && (
                          <span className="text-[9px] text-slate-400/80 leading-tight">{item.subtitle}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                    <span className="w-4 h-1.5 rounded-full bg-amber-400"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                  </div>
                </div>
              );
            }

            if (sec.type === 'badge_pill') {
              return (
                <div key={sec.id} className="flex items-center justify-center pt-2">
                  <div 
                    className="px-4 py-1.5 rounded-full bg-slate-950/80 border text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5"
                    style={{
                      borderColor: sec.pillBorderColor || '#F59E0B',
                      color: sec.pillTextColor || '#FDE68A',
                      backgroundColor: sec.pillBgColor || undefined
                    }}
                  >
                    <DynamicIcon name={sec.pillIcon || 'shield-check'} className="w-3.5 h-3.5 text-amber-400" />
                    <span>{sec.pillText}</span>
                  </div>
                </div>
              );
            }

            if (sec.type === 'html_embed') {
              return (
                <div 
                  key={sec.id}
                  className="w-full rounded-2xl overflow-hidden my-2 shadow-lg"
                  dangerouslySetInnerHTML={{ __html: sec.embedHtml || '' }}
                />
              );
            }

            return null;
          })}
        </div>

        {/* Footer */}
        {profile.footer?.copyrightText && (
          <p className="mt-5 text-[10px] text-slate-400/80 text-center px-4 font-mono">
            {profile.footer.copyrightText}
          </p>
        )}

      </main>

      {/* MODAL 1: APPOINTMENT INQUIRY */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0b152d] border border-blue-500/30 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => { setIsBookingOpen(false); setFormStatus('idle'); }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {formStatus === 'success' ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs text-slate-300">
                  Your appointment inquiry for <strong className="text-white">{profile.name}</strong> has been registered.
                </p>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-white/10 text-xs font-mono text-amber-300">
                  Reference: {token}
                </div>
                <button
                  onClick={() => { setIsBookingOpen(false); setFormStatus('idle'); }}
                  className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-black text-white">{profile.modals?.bookingModal?.title || 'Book an Appointment'}</h3>
                <p className="text-xs text-slate-300 mb-4">{profile.name}</p>

                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                        className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Slot *</label>
                      <select
                        value={formData.appointmentTime}
                        onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                      >
                        <option>Morning (10 AM - 1 PM)</option>
                        <option>Evening (5 PM - 8 PM)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">Reason (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder="e.g. Health inquiry, consultation..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {formStatus === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>Confirm Request</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: VERIFIED QUALIFICATIONS */}
      {isQualsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0b152d] border border-blue-500/30 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsQualsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white">{profile.name}</h3>
            <p className="text-xs text-blue-300 mb-4">{profile.designation}</p>
            <div className="space-y-3">
              {(profile.modals?.qualsModal?.items || []).map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-900/80 border border-white/10">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-amber-300 font-medium">{item.subtitle}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsQualsOpen(false)}
              className="mt-5 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: SPECIALTIES */}
      {isSpecialtiesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0b152d] border border-cyan-500/30 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSpecialtiesOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-white">Clinical Specialties</h3>
            <p className="text-xs text-slate-300 mb-4">{profile.name}</p>
            <div className="grid grid-cols-2 gap-2 text-left">
              {(profile.modals?.specialtiesModal?.items || []).map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-cyan-400 text-xs font-bold block mb-1">{item.title}</span>
                  <p className="text-[10px] text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => { setIsSpecialtiesOpen(false); setIsBookingOpen(true); }}
              className="mt-5 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-wider"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
