import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.premierhospital.co.in'),
  title: "Dr. Avinash Kasundra | Consultant Intensivist & Pulmonologist",
  description: "Official digital card and profile of Dr. Avinash Kasundra (MBBS, MD - Respiratory Medicine, Fellowship in Critical Care Medicine - Lilavati Hospital, Mumbai). Premier Hospital & ICU.",
  keywords: [
    "Dr. Avinash Kasundra",
    "Pulmonologist",
    "Intensivist",
    "Respiratory Medicine",
    "Premier Hospital & ICU",
    "Critical Care",
    "Chest Specialist",
    "Asthma",
    "COPD",
    "ICU Specialist"
  ],
  authors: [{ name: "Dr. Avinash Kasundra" }],
  openGraph: {
    title: "Dr. Avinash Kasundra | Consultant Intensivist & Pulmonologist",
    description: "MBBS, MD (Respiratory Medicine) | Fellowship in Critical Care Medicine (Lilavati Hospital – Mumbai) | Premier Hospital & ICU",
    type: "profile",
    images: ["/assets/doctor-header-final.jpg"],
  },
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-[#f0f6f8] text-slate-800 antialiased selection:bg-[#0d6e77] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
