export const DOCTOR_PROFILE = {
  name: "Dr. Avinash Kasundra",
  qualifications: "MBBS, MD (Respiratory Medicine)",
  fellowship: "Fellowship in Critical Care Medicine (Lilavati Hospital – Mumbai)",
  designation: "Consultant Intensivist and Pulmonologist",
  phone: "+91 94285 87969",
  phoneRaw: "+919428587969",
  hospital: {
    name: "Premier Hospital & ICU",
    phone: "+91 9925 601 601",
    phoneRaw: "+919925601601",
    website: "www.premierhospital.co.in",
    websiteUrl: "https://www.premierhospital.co.in",
    location: "Premier Hospital & ICU",
    googleMapsUrl: "https://maps.google.com/?q=Premier+Hospital+ICU"
  },
  opdTimings: {
    title: "OPD Timing:",
    slot1: "10:00 AM – 1:00 PM",
    slot2: "5:00 PM – 8:00 PM",
    fullText: "10:00 AM – 1:00 PM &\n5:00 PM – 8:00 PM",
    days: "Monday to Saturday"
  },
  emergency: {
    title: "Emergency Services:",
    badge: "Available 24/7.",
    phone: "+91 9925 601 601",
    phoneRaw: "+919925601601"
  },
  specialties: [
    {
      title: "Pulmonology & Respiratory Medicine",
      desc: "Comprehensive diagnosis and treatment for Asthma, COPD, Lung Infections, Bronchiectasis, and Pulmonary Fibrosis."
    },
    {
      title: "Critical Care & Advanced ICU",
      desc: "Expert intensivist management for severe ARDS, Septic Shock, Multi-Organ Failure, and invasive mechanical ventilation."
    },
    {
      title: "Diagnostic & Interventional Bronchoscopy",
      desc: "Advanced airway inspection, Bronchoalveolar Lavage (BAL), transbronchial biopsy, and therapeutic clearances."
    },
    {
      title: "Sleep Apnea & Polysomnography",
      desc: "Sleep study diagnostics, CPAP/BiPAP titration, and treatment for Obstructive Sleep Apnea (OSA)."
    },
    {
      title: "Spirometry & Pulmonary Rehabilitation",
      desc: "Lung function assessment (PFT), smoking cessation counseling, and post-COVID pulmonary rehabilitation."
    }
  ],
  images: {
    header: "/assets/doctor-header-final.jpg",
    lungsIcon: "/assets/lungs-icon-cropped.png",
    bottomWaves: "/assets/bottom-waves-upscaled.png"
  }
};

export const PROFILE_DATA = DOCTOR_PROFILE;
