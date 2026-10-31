/**
 * Central Configuration for Dr. Avinash Kasundra Personal Branding Website
 * Premier Hospital & ICU, Rajkot, Gujarat
 */

export const HOSPITAL_CONFIG = {
  doctorName: "Dr. Avinash Kasundra",
  doctorTitle: "Consultant Intensivist & Pulmonologist",
  doctorSubtitle: "MBBS, MD (Respiratory Medicine), Fellowship in Critical Care Medicine (Lilavati Hospital, Mumbai)",
  hospitalName: "Premier Hospital & ICU",
  hospitalTagline: "Centre for Advanced Pulmonary Medicine & Critical Care",
  locationCity: "Rajkot, Gujarat, India",
  
  address: {
    line1: "1st & 7th Floor, RK Prime Plus",
    line2: "Near Balaji Hall Circle, 150ft Ring Road",
    city: "Rajkot",
    state: "Gujarat",
    pincode: "360004",
    country: "India",
    googleMapsUrl: "https://maps.google.com/?q=Premier+Hospital+ICU+RK+Prime+Plus+150+Feet+Ring+Road+Rajkot"
  },

  contacts: {
    doctorPhoneDisplay: "+91 94285 87969",
    doctorPhoneRaw: "+919428587969",
    hospitalPhoneDisplay: "9925 601 601",
    hospitalPhoneRaw: "+919925601601",
    emergencyHelpline: "9925 601 601",
    hospitalEmail: "premierhospitalrajkot@gmail.com",
    hospitalWebsite: "https://premierhospital.co.in"
  },

  whatsapp: {
    number: "919428587969",
    defaultGreeting: "Hello Dr. Avinash Kasundra,\nI would like to inquire about an appointment at Premier Hospital & ICU, Rajkot.",
    generateUrl: (patient = {}) => {
      const { name, date, time, phone, reason } = patient;
      let text = `Hello, I would like to inquire about an appointment with Dr. Avinash Kasundra at Premier Hospital & ICU, Rajkot.\n\n`;
      text += `• Name: ${name || '[Patient Name]'}\n`;
      text += `• Preferred Date: ${date || '[Preferred Date]'}\n`;
      text += `• Preferred Time: ${time || '[Morning 10AM-1PM / Evening 5PM-8PM]'}\n`;
      text += `• Contact Number: ${phone || '[Phone Number]'}\n`;
      if (reason) text += `• Reason for Consultation: ${reason}\n`;
      text += `\nPlease share the available appointment details.`;
      
      return `https://wa.me/${HOSPITAL_CONFIG.whatsapp.number}?text=${encodeURIComponent(text)}`;
    }
  },

  timings: {
    opdMorning: "10:00 AM – 1:00 PM",
    opdEvening: "5:00 PM – 8:00 PM",
    opdDays: "Monday to Saturday",
    opdSunday: "Emergency & Prior Appointments Only",
    emergency: "24 × 7 Emergency & Critical Care Availability",
    emergencyNote: "24/7 ICU & Critical Care Trauma admission available round the clock with on-duty intensivist team."
  },

  emailService: {
    provider: "formsubmit", 
    recipientEmail: "premierhospitalrajkot@gmail.com",
    formSubmitEndpoint: "https://formsubmit.co/ajax/premierhospitalrajkot@gmail.com"
  },

  assets: {
    logo: "./assets/premier-hospital-logo.png",
    doctorPortrait: "./assets/doctor.jpeg",
    favicon: "./assets/favicon.svg"
  }
};
