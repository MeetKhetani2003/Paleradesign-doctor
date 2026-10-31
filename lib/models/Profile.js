import mongoose from 'mongoose';

const QuickActionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: 'custom' }, // phone, whatsapp, emergency, map, website, email, custom
  label: { type: String, default: '' },
  icon: { type: String, default: 'globe' },
  url: { type: String, default: '#' },
  bgColor: { type: String, default: 'blue' }, // blue, emerald, red, cyan, amber, purple
  pingBadge: { type: Boolean, default: false }
}, { _id: false });

const SectionBlockSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['button', 'text_block', 'feature_grid', 'badge_pill', 'divider', 'html_embed'] 
  },
  order: { type: Number, default: 0 },
  
  // Button specific fields
  buttonTitle: { type: String, default: '' },
  buttonSubtitle: { type: String, default: '' },
  buttonIcon: { type: String, default: 'globe' },
  buttonTheme: { type: String, default: 'amber' }, // amber, red, cyan, emerald, blue, indigo, purple, slate
  thumbnailUrl: { type: String, default: '' }, // Blended right-side image or GIF from GridFS
  actionType: { type: String, default: 'url' }, // url, modal_booking, modal_quals, modal_specialties, call, whatsapp
  actionTarget: { type: String, default: '#' },
  
  // Text block specific fields
  textContent: { type: String, default: '' },
  textType: { type: String, default: 'paragraph' }, // h2, h3, paragraph, callout, quote
  textAlign: { type: String, default: 'center' }, // left, center, right
  textColor: { type: String, default: '#FFFFFF' },
  
  // Feature grid specific fields
  gridColumns: { type: Number, default: 4 },
  gridItems: [{
    icon: { type: String, default: 'star' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' }
  }],
  
  // Badge pill specific fields
  pillText: { type: String, default: '' },
  pillIcon: { type: String, default: 'shield' },
  pillBorderColor: { type: String, default: 'amber' }
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    index: true 
  },
  name: { type: String, required: true },
  isDualToneTitle: { type: Boolean, default: true },
  titlePart1: { type: String, default: '' },
  titlePart2: { type: String, default: '' },
  titlePart2Gradient: { type: String, default: 'from-amber-300 via-amber-400 to-amber-500' },
  
  designation: { type: String, default: '' },
  subDesignation: { type: String, default: '' },
  
  avatarUrl: { type: String, default: '' },
  avatarBadgeText: { type: String, default: '' },
  avatarBadgeIcon: { type: String, default: 'award' },
  avatarRingColor: { type: String, default: 'amber' }, // amber, blue, cyan, emerald, purple, rose
  avatarHasOrbit: { type: Boolean, default: true },
  
  brandLogoUrl: { type: String, default: '' },
  brandLogoLink: { type: String, default: '' },
  
  theme: {
    backgroundColor: { type: String, default: '#040814' },
    backgroundImageUrl: { type: String, default: '' }, // URL to GridFS image/gif or preset
    backgroundType: { type: String, default: 'image' }, // image, gif, gradient, solid
    overlayOpacity: { type: Number, default: 75 }, // 0 to 100
    vignette: { type: Boolean, default: true },
    spotlights: {
      top: { type: String, default: 'blue' },
      left: { type: String, default: 'cyan' },
      right: { type: String, default: 'amber' }
    },
    accentColor: { type: String, default: '#F59E0B' },
    fontFamily: { type: String, default: 'sans' }
  },
  
  header: {
    showTime: { type: Boolean, default: true },
    timeFormat: { type: String, default: 'live_ist' }, // live_ist, fixed
    showStatusPill: { type: Boolean, default: true },
    statusPillText: { type: String, default: 'Open &bull; Active Now' },
    statusPillDotColor: { type: String, default: 'emerald' },
    showShareButton: { type: Boolean, default: true }
  },
  
  quickActions: [QuickActionSchema],
  sections: [SectionBlockSchema],
  
  modals: {
    bookingModal: {
      enabled: { type: Boolean, default: true },
      title: { type: String, default: 'Book an Appointment' },
      subtitle: { type: String, default: 'Select your preferred date & timing slot' },
      recipientEmail: { type: String, default: 'premierhospitalrajkot@gmail.com' },
      whatsappPhone: { type: String, default: '919428587969' }
    },
    qualsModal: {
      enabled: { type: Boolean, default: true },
      title: { type: String, default: 'Verified Qualifications' },
      subtitle: { type: String, default: 'Medical Degrees & Certifications' },
      items: [{
        title: String,
        subtitle: String,
        description: String
      }]
    },
    specialtiesModal: {
      enabled: { type: Boolean, default: true },
      title: { type: String, default: 'Services & Specialties' },
      items: [{
        title: String,
        description: String
      }]
    }
  },
  
  footer: {
    copyrightText: { type: String, default: '© 2026 All Rights Reserved' }
  },
  
  meta: {
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    views: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

