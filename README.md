# Premier Hospital & ICU — Dr. Avinash Kasundra
### Consultant Intensivist & Pulmonologist | Rajkot, Gujarat, India

A high-performance, single-page physician branding and hospital association website built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Lucide Icons**, along with a zero-dependency **Standalone Single HTML** version.

---

## 📋 Executive Overview

- **Physician:** Dr. Avinash Kasundra
- **Designation:** Consultant Intensivist and Pulmonologist
- **Medical Qualifications:**
  - MBBS
  - MD (Respiratory Medicine)
  - Fellowship in Critical Care Medicine — **Lilavati Hospital, Mumbai**
- **Associated Hospital:** Premier Hospital & ICU
- **Facility Location:** 1st & 7th Floor, RK Prime Plus, Near Balaji Hall Circle, 150ft Ring Road, Rajkot, Gujarat, India (360004)
- **OPD Timings:** Morning: 10:00 AM – 1:00 PM | Evening: 5:00 PM – 8:00 PM (Mon – Sat)
- **Emergency Service:** 24 × 7 Available (ICU Critical Care & Trauma)
- **Inquiry Email:** `premierhospitalrajkot@gmail.com`
- **Hospital Website:** `https://premierhospital.co.in`

---

## 🎨 Phase 1 & 2: Design Research & Brand Identity

### Design Research & Mobbin MCP Report
- **Mobbin MCP Availability:** Mobbin MCP is listed in the Antigravity marketplace (`antigravity-plugins-partners/plugin/mobbin`) but not currently active on this instance. Per instructions, publicly accessible design benchmarks were utilized (One Medical, Carbon Health, Mayo Clinic, Cleveland Clinic, NHS UK, and Awwwards health & clinical landing page standards).
- **Awwwards / eHealthcare Leadership Awards Benchmarks:** 
  - Editorial layout avoiding generic card-in-a-box templates.
  - Asymmetric desktop composition occupying ~100svh viewport.
  - Clear clinical trust indicators (Lilavati Hospital Fellowship badge).
  - Clear demarcation between routine outpatient (OPD) hours and round-the-clock (24/7) intensive care emergency.
  - Instant accessibility: Click-to-call, click-to-email, WhatsApp prefilled inquiries, interactive Google Maps directions.

### Brand Color Tokens
- **Primary Navy Blue:** `#263F91` (Official Premier Hospital primary)
- **Deep Navy:** `#152B56` (Headings, primary contrast)
- **Medical Blue:** `#526BB5` (Subheadings, borders, accents)
- **Soft Background:** `#F5F8FC` (Clinical soft backdrop)
- **Light Blue Accent:** `#EAF0FA` (Tags, chips, highlight cards)
- **Body Text:** `#333B49`
- **Muted Text:** `#778195`
- **Emergency Coral/Red:** `#DC2626` / `#EF4444` (Strictly reserved for 24/7 ICU triage)

---

## ⚙️ Configuration Guide: Phone, WhatsApp & Email Integration

All configuration values are centrally located in **`src/config.js`**:

```javascript
export const HOSPITAL_CONFIG = {
  // Doctor & Hospital
  doctorName: "Dr. Avinash Kasundra",
  doctorTitle: "Consultant Intensivist & Pulmonologist",
  
  // Contacts
  contacts: {
    doctorPhoneDisplay: "+91 94285 87969",
    doctorPhoneRaw: "+919428587969",
    hospitalPhoneDisplay: "9925 601 601",
    hospitalPhoneRaw: "+919925601601",
    hospitalEmail: "premierhospitalrajkot@gmail.com",
    hospitalWebsite: "https://premierhospital.co.in"
  },

  // WhatsApp Destination & Prefill Template
  whatsapp: {
    number: "919428587969", // Change here to update WhatsApp destination
    generateUrl: (patient = {}) => { ... }
  },

  // Email Integration Settings
  emailService: {
    provider: "formsubmit", // 'formsubmit' | 'emailjs' | 'mailto'
    recipientEmail: "premierhospitalrajkot@gmail.com",
    formSubmitEndpoint: "https://formsubmit.co/ajax/premierhospitalrajkot@gmail.com"
  }
};
```

### Activating the Email Relay (FormSubmit)
1. By default, the appointment form transmits an AJAX request to `https://formsubmit.co/ajax/premierhospitalrajkot@gmail.com`.
2. When the first submission is made, FormSubmit sends an activation email to `premierhospitalrajkot@gmail.com`.
3. Simply click **"Activate Form"** in that email once, and all subsequent appointment inquiries will be delivered directly to the hospital inbox with zero server code required.
4. If you prefer EmailJS, update `provider: "emailjs"` and fill in your `serviceId`, `templateId`, and `publicKey` in `src/config.js`.

---

## 🖼️ How to Replace the Logo and Doctor Photograph

The project contains dedicated SVG assets in `public/assets/`:
- `public/assets/hospital-logo.svg` (Official vector Premier Hospital & ICU logo)
- `public/assets/doctor-portrait.svg` (Dignified physician portrait card)
- `public/assets/favicon.svg` (Medical cross favicon)

### To use your own photo file:
1. Place your doctor photograph (e.g. `dr-avinash-kasundra.jpg` or `.png`) inside `public/assets/`.
2. Open `src/config.js` and update line 96:
   ```javascript
   assets: {
     logo: "./assets/hospital-logo.svg",
     doctorPortrait: "./assets/dr-avinash-kasundra.jpg", // <--- your file name here
     favicon: "./assets/favicon.svg"
   }
   ```
3. Run `npm run build` to package the new image into `dist/`.

---

## 🚀 Running the Project

### Option A: Modern Vite + React (Recommended for development)
```bash
# Start development server with hot-reload
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Option B: Standalone Single HTML (Instant double-click execution)
- Open `standalone-index.html` directly in any web browser (Chrome, Edge, Firefox, Safari).
- Or use `dist/index.html` generated by Vite.
- Requires no Node.js or local web server.

---

## 🩺 Final Quality Audit Checklist

- [x] **Single-page editorial design:** Avoids centered profile card / digital visiting card templates; spans the full viewport with balanced whitespace and clinical hierarchy.
- [x] **Accurate Credentials:** MBBS, MD (Respiratory Medicine), Fellowship in Critical Care Medicine from Lilavati Hospital, Mumbai.
- [x] **No Fabricated Data:** Years of experience, patient numbers, ratings, or unverified claims are strictly omitted.
- [x] **Timing Differentiation:** Routine OPD hours (10:00 AM – 1:00 PM | 5:00 PM – 8:00 PM) are clearly distinguished from 24/7 ICU Emergency availability.
- [x] **Live IST OPD Status Indicator:** Real-time clock displays whether OPD morning/evening session is active or closed.
- [x] **Click-to-Call & Email:** Direct phone dialing for doctor (+91 94285 87969) and hospital (9925 601 601).
- [x] **WhatsApp Integration:** 1-click `wa.me` with prefilled, formatted appointment query.
- [x] **Form Validation:** Validates Indian mobile numbers (`^[6-9]\d{9}$`), required fields, loading state, reference token generation, and confetti celebration.
- [x] **SEO & Schema.org:** JSON-LD for `Physician` and `Hospital`, Open Graph meta, Twitter card, local geo tags for Rajkot.
- [x] **Accessibility:** Keyboard skip link, accessible labels, ARIA attributes, and `prefers-reduced-motion` compliance.
- [x] **Zero Build Errors:** Built with clean TypeScript/React transpilation in ~600ms.

