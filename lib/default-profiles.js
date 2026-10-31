export const DEFAULT_PROFILES = [
  {
    slug: 'dr-avinash-kasundra',
    name: 'Dr. Avinash Kasundra',
    isDualToneTitle: true,
    titlePart1: 'DR. AVINASH',
    titlePart2: 'KASUNDRA',
    titlePart2Gradient: 'from-amber-300 via-amber-400 to-amber-500',
    designation: 'Consultant Intensivist & Pulmonologist',
    subDesignation: 'MBBS, MD (Respiratory Medicine) • Critical Care (Lilavati, Mumbai)',
    avatarUrl: '/assets/doctor.jpeg',
    avatarBadgeText: 'Lilavati Fellow',
    avatarBadgeIcon: 'award',
    avatarRingColor: 'amber',
    avatarHasOrbit: true,
    brandLogoUrl: '/assets/premier-hospital-logo.png',
    brandLogoLink: 'https://premierhospital.co.in',
    theme: {
      backgroundColor: '#040814',
      backgroundImageUrl: '/assets/cinematic-medical-bg.jpg',
      backgroundType: 'image',
      overlayOpacity: 75,
      vignette: true,
      spotlights: {
        top: 'blue',
        left: 'cyan',
        right: 'amber'
      },
      accentColor: '#F59E0B',
      fontFamily: 'sans'
    },
    header: {
      showTime: true,
      timeFormat: 'live_ist',
      showStatusPill: true,
      statusPillText: 'OPD Open &bull; Morning (10 AM – 1 PM)',
      statusPillDotColor: 'emerald',
      showShareButton: true
    },
    quickActions: [
      {
        id: 'qa-1',
        type: 'phone',
        label: 'Call Doctor',
        icon: 'phone',
        url: 'tel:+919428587969',
        bgColor: 'blue',
        pingBadge: false
      },
      {
        id: 'qa-2',
        type: 'whatsapp',
        label: 'WhatsApp',
        icon: 'message',
        url: 'https://wa.me/919428587969?text=Hello%20Dr.%20Avinash%20Kasundra,%20I%20would%20like%20to%20inquire%20about%20an%20OPD%20appointment.',
        bgColor: 'emerald',
        pingBadge: false
      },
      {
        id: 'qa-3',
        type: 'emergency',
        label: '24/7 ICU Helpline',
        icon: 'shield-alert',
        url: 'tel:9925601601',
        bgColor: 'red',
        pingBadge: true
      },
      {
        id: 'qa-4',
        type: 'map',
        label: 'Directions',
        icon: 'map-pin',
        url: 'https://maps.google.com/?q=Premier+Hospital+ICU+RK+Prime+Plus+150+Feet+Ring+Road+Rajkot',
        bgColor: 'cyan',
        pingBadge: false
      },
      {
        id: 'qa-5',
        type: 'website',
        label: 'Hospital Website',
        icon: 'globe',
        url: 'https://premierhospital.co.in',
        bgColor: 'amber',
        pingBadge: false
      }
    ],
    sections: [
      {
        id: 'sec-1',
        type: 'button',
        order: 1,
        buttonTitle: 'Book OPD Appointment',
        buttonSubtitle: 'Morning 10 AM–1 PM | Evening 5 PM–8 PM',
        buttonIcon: 'calendar',
        buttonTheme: 'amber',
        thumbnailUrl: '/assets/thumb-consultation.jpg',
        actionType: 'modal_booking',
        actionTarget: '#'
      },
      {
        id: 'sec-2',
        type: 'button',
        order: 2,
        buttonTitle: '24×7 ICU & Critical Care',
        buttonSubtitle: 'Emergency Helpline: 9925 601 601',
        buttonIcon: 'heart-pulse',
        buttonTheme: 'red',
        thumbnailUrl: '/assets/thumb-icu.jpg',
        actionType: 'call',
        actionTarget: 'tel:9925601601'
      },
      {
        id: 'sec-3',
        type: 'button',
        order: 3,
        buttonTitle: 'Pulmonology & Chest Medicine',
        buttonSubtitle: 'Asthma, COPD, ARDS, Mechanical Ventilation',
        buttonIcon: 'wind',
        buttonTheme: 'cyan',
        thumbnailUrl: '/assets/thumb-pulmonology.jpg',
        actionType: 'modal_specialties',
        actionTarget: '#'
      },
      {
        id: 'sec-4',
        type: 'button',
        order: 4,
        buttonTitle: 'Chat on WhatsApp',
        buttonSubtitle: 'Direct inquiry with Dr. Avinash Kasundra',
        buttonIcon: 'message-square',
        buttonTheme: 'emerald',
        thumbnailUrl: '/assets/thumb-consultation.jpg',
        actionType: 'whatsapp',
        actionTarget: 'https://wa.me/919428587969?text=Hello%20Dr.%20Avinash%20Kasundra,%20I%20would%20like%20to%20inquire%20about%20an%20OPD%20appointment.'
      },
      {
        id: 'sec-5',
        type: 'button',
        order: 5,
        buttonTitle: 'Education & Qualifications',
        buttonSubtitle: 'MBBS, MD (Respiratory), Lilavati Hospital Mumbai',
        buttonIcon: 'graduation-cap',
        buttonTheme: 'blue',
        thumbnailUrl: '/assets/thumb-hospital.jpg',
        actionType: 'modal_quals',
        actionTarget: '#'
      },
      {
        id: 'sec-6',
        type: 'button',
        order: 6,
        buttonTitle: 'Premier Hospital & ICU Location',
        buttonSubtitle: '1st & 7th Floor, RK Prime Plus, Rajkot',
        buttonIcon: 'map-pin',
        buttonTheme: 'indigo',
        thumbnailUrl: '/assets/thumb-hospital.jpg',
        actionType: 'url',
        actionTarget: 'https://maps.google.com/?q=Premier+Hospital+ICU+RK+Prime+Plus+150+Feet+Ring+Road+Rajkot'
      },
      {
        id: 'sec-7',
        type: 'button',
        order: 7,
        buttonTitle: 'Official Hospital Portal',
        buttonSubtitle: 'www.premierhospital.co.in',
        buttonIcon: 'globe',
        buttonTheme: 'amber',
        thumbnailUrl: '',
        actionType: 'url',
        actionTarget: 'https://premierhospital.co.in'
      },
      {
        id: 'sec-8',
        type: 'feature_grid',
        order: 8,
        gridColumns: 4,
        gridItems: [
          { icon: 'heart-pulse', title: 'Critical Care & ICU', subtitle: '24/7 Ward' },
          { icon: 'wind', title: 'Pulmonology & Asthma', subtitle: 'Advanced Care' },
          { icon: 'activity', title: 'Mechanical Ventilation', subtitle: 'Advanced ICU' },
          { icon: 'award', title: 'Lilavati Fellow', subtitle: 'Mumbai' }
        ]
      },
      {
        id: 'sec-9',
        type: 'badge_pill',
        order: 9,
        pillText: 'Your Trusted Healthcare Partner',
        pillIcon: 'shield-check',
        pillBorderColor: 'amber'
      }
    ],
    modals: {
      bookingModal: {
        enabled: true,
        title: 'Book an Appointment',
        subtitle: 'Premier Hospital & ICU • Dr. Avinash Kasundra',
        recipientEmail: 'premierhospitalrajkot@gmail.com',
        whatsappPhone: '919428587969'
      },
      qualsModal: {
        enabled: true,
        title: 'Verified Qualifications',
        subtitle: 'Medical Degrees & Certifications',
        items: [
          {
            title: 'Fellowship in Critical Care Medicine',
            subtitle: 'Lilavati Hospital – Mumbai',
            description: 'Intensive care management, invasive mechanical ventilation, ECMO, hemodynamic monitoring & life support.'
          },
          {
            title: 'MD (Respiratory Medicine)',
            subtitle: 'Postgraduate Specialization',
            description: 'Advanced pulmonary diseases, bronchial asthma, COPD, ILD, pleural disorders and sleep apnea.'
          },
          {
            title: 'MBBS',
            subtitle: 'Bachelor of Medicine & Bachelor of Surgery',
            description: 'Core medical foundation with clinical rotatory internship.'
          }
        ]
      },
      specialtiesModal: {
        enabled: true,
        title: 'Clinical Specialties',
        items: [
          { title: 'ARDS & Respiratory Failure', description: 'Advanced high-flow oxygenation & protective lung ventilation.' },
          { title: 'Bronchial Asthma & Allergy', description: 'Personalized inhaler therapy, spirometry & trigger control.' },
          { title: 'COPD & Chronic Bronchitis', description: 'Pulmonary rehabilitation and long-term lung management.' },
          { title: 'Severe Pneumonia & Sepsis', description: 'Protocolized ICU intervention and antimicrobial stewardship.' },
          { title: 'Mechanical Ventilation', description: 'Invasive & Non-invasive life support management.' },
          { title: 'Interstitial Lung Disease (ILD)', description: 'Comprehensive pulmonary fibrosis workup.' }
        ]
      }
    },
    footer: {
      copyrightText: '© 2026 Premier Hospital & ICU • Rajkot, Gujarat'
    },
    meta: {
      seoTitle: 'Dr. Avinash Kasundra | Premier Hospital & ICU Rajkot',
      seoDescription: 'Consultant Intensivist & Pulmonologist at Premier Hospital & ICU, Rajkot. MBBS, MD, Lilavati Fellow.',
      views: 142
    }
  },
  {
    slug: 'safar-squad',
    name: 'Safar Squad Tours & Travel',
    isDualToneTitle: true,
    titlePart1: 'SAFAR',
    titlePart2: 'SQUAD',
    titlePart2Gradient: 'from-amber-400 via-orange-400 to-amber-500',
    designation: 'Where Every Journey Feels First Class',
    subDesignation: 'Luxury Domestic & International Tour Packages',
    avatarUrl: '/assets/WhatsApp Image 2026-10-31 at 11.42.17 AM.jpeg',
    avatarBadgeText: 'Verified Partner',
    avatarBadgeIcon: 'check',
    avatarRingColor: 'amber',
    avatarHasOrbit: true,
    brandLogoUrl: '',
    brandLogoLink: '',
    theme: {
      backgroundColor: '#050D1A',
      backgroundImageUrl: '/assets/WhatsApp Image 2026-10-31 at 11.42.17 AM.jpeg',
      backgroundType: 'image',
      overlayOpacity: 70,
      vignette: true,
      spotlights: {
        top: 'amber',
        left: 'blue',
        right: 'orange'
      },
      accentColor: '#F59E0B',
      fontFamily: 'sans'
    },
    header: {
      showTime: true,
      timeFormat: 'live_ist',
      showStatusPill: true,
      statusPillText: 'Booking Open &bull; 2026 Season',
      statusPillDotColor: 'emerald',
      showShareButton: true
    },
    quickActions: [
      {
        id: 'qa-s1',
        type: 'phone',
        label: 'Call Us',
        icon: 'phone',
        url: 'tel:+919876543210',
        bgColor: 'blue',
        pingBadge: false
      },
      {
        id: 'qa-s2',
        type: 'whatsapp',
        label: 'WhatsApp',
        icon: 'message',
        url: 'https://wa.me/919876543210?text=Hello%20Safar%20Squad,%20I%20am%20interested%20in%20a%20tour%20package.',
        bgColor: 'emerald',
        pingBadge: false
      },
      {
        id: 'qa-s3',
        type: 'website',
        label: 'Website',
        icon: 'globe',
        url: 'https://safarsquad.com',
        bgColor: 'amber',
        pingBadge: false
      }
    ],
    sections: [
      {
        id: 'sec-s1',
        type: 'button',
        order: 1,
        buttonTitle: 'Official Website',
        buttonSubtitle: 'www.safarsquad.com',
        buttonIcon: 'globe',
        buttonTheme: 'amber',
        thumbnailUrl: '',
        actionType: 'url',
        actionTarget: 'https://safarsquad.com'
      },
      {
        id: 'sec-s2',
        type: 'button',
        order: 2,
        buttonTitle: 'Facebook Page',
        buttonSubtitle: 'Safar Squad Tours & Travel',
        buttonIcon: 'share-2',
        buttonTheme: 'blue',
        thumbnailUrl: '',
        actionType: 'url',
        actionTarget: 'https://facebook.com'
      },
      {
        id: 'sec-s3',
        type: 'button',
        order: 3,
        buttonTitle: 'Instagram Feed',
        buttonSubtitle: '@safar_squad_travel',
        buttonIcon: 'sparkles',
        buttonTheme: 'purple',
        thumbnailUrl: '',
        actionType: 'url',
        actionTarget: 'https://instagram.com'
      },
      {
        id: 'sec-s4',
        type: 'button',
        order: 4,
        buttonTitle: 'Chat on WhatsApp',
        buttonSubtitle: 'Plan Your Next Trip With Us',
        buttonIcon: 'message-square',
        buttonTheme: 'emerald',
        thumbnailUrl: '',
        actionType: 'whatsapp',
        actionTarget: 'https://wa.me/919876543210'
      },
      {
        id: 'sec-s5',
        type: 'feature_grid',
        order: 5,
        gridColumns: 4,
        gridItems: [
          { icon: 'plane', title: 'Domestic Tours', subtitle: 'All India' },
          { icon: 'globe', title: 'International Tours', subtitle: 'Worldwide' },
          { icon: 'map', title: 'Customized Packages', subtitle: 'Tailored' },
          { icon: 'headphones', title: 'Travel Support', subtitle: '24/7 Assistance' }
        ]
      },
      {
        id: 'sec-s6',
        type: 'badge_pill',
        order: 6,
        pillText: 'Your Trusted Travel Partner',
        pillIcon: 'shield-check',
        pillBorderColor: 'amber'
      }
    ],
    modals: {
      bookingModal: {
        enabled: true,
        title: 'Inquire About a Tour Package',
        subtitle: 'Safar Squad Tours & Travel',
        recipientEmail: 'info@safarsquad.com',
        whatsappPhone: '919876543210'
      }
    },
    footer: {
      copyrightText: '© 2026 Safar Squad Tours & Travel'
    },
    meta: {
      seoTitle: 'Safar Squad Tours & Travel | First Class Journeys',
      seoDescription: 'Premium domestic and international tour packages with personalized itineraries.',
      views: 89
    }
  }
];

