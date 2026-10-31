import './globals.css';

export const metadata = {
  metadataBase: new URL('https://jgsinnovations.netlify.app'),
  title: "JSG INNOVATIONS | Innovating The Digital Future",
  description: "Official digital card of JSG Innovations. Explore our website, connect on Instagram & WhatsApp, and discover our services.",
  keywords: ["JSG Innovations", "Digital Future", "Web Development", "Technology", "IT Services"],
  openGraph: {
    title: "JSG INNOVATIONS | Innovating The Digital Future",
    description: "Official digital card of JSG Innovations. Explore our website, connect on Instagram & WhatsApp.",
    images: ["/assets/jsg-logo.png"]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" 
          rel="stylesheet" 
        />
        <link rel="icon" href="/assets/jsg-logo.png" />
      </head>
      <body className="min-h-screen antialiased selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
