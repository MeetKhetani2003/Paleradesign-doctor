import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

/**
 * Generate a zero-dependency, standalone single-file HTML website
 * for a specific doctor or business profile.
 */
export function generateStandaloneHtml(profile) {
  const profileJson = JSON.stringify(profile);
  const title = profile.meta?.seoTitle || `${profile.name} - ${profile.designation}`;
  const description = profile.meta?.seoDescription || `${profile.name} official website and practice profile.`;
  const bgImage = profile.theme?.backgroundImageUrl || './assets/cinematic-medical-bg.jpg';
  const overlayOpacity = ((profile.theme?.overlayOpacity ?? 75) / 100).toFixed(2);
  const avatar = profile.avatarUrl || './assets/doctor.jpeg';

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="icon" type="image/svg+xml" href="./assets/favicon.svg">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.min.js"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            heading: ['Outfit', 'sans-serif']
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#040814] text-white font-sans antialiased flex flex-col items-center justify-start sm:justify-center py-0 sm:py-8 px-0 sm:px-4 selection:bg-amber-400 selection:text-black min-h-screen relative overflow-x-hidden">

  <!-- Background Wallpaper -->
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div 
      class="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-105"
      style="background-image: url('${bgImage}');"
    ></div>
    <div class="absolute inset-0 bg-black backdrop-blur-[1px]" style="opacity: ${overlayOpacity};"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-[#030712]/75 via-transparent to-[#030712]/95 pointer-events-none"></div>
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[52rem] h-[52rem] bg-gradient-to-b from-blue-600/30 via-indigo-600/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/4 -left-28 w-88 h-88 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/3 -right-28 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
  </div>

  <!-- Device Container Shell -->
  <main class="relative z-10 w-full max-w-[430px] min-h-screen sm:min-h-0 sm:my-auto bg-[#071126]/85 sm:backdrop-blur-2xl rounded-none sm:rounded-[52px] sm:border-[6px] sm:border-slate-700/80 sm:shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_60px_rgba(38,63,145,0.35)] flex flex-col items-center overflow-x-hidden pb-8">
    
    <!-- Top Status Bar -->
    <div class="w-full pt-3 px-7 pb-1 flex items-center justify-between text-xs text-white/90 select-none">
      <span class="font-semibold tracking-tight text-xs font-mono" id="clock">9:41</span>
      <div class="hidden sm:block w-24 h-4 bg-black rounded-full border border-white/10 shadow-inner"></div>
      <div class="flex items-center gap-1.5 text-white/85">
        <span class="text-[10px]">📶</span>
        <span class="text-[10px]">🛜</span>
        <span class="text-[10px]">🔋</span>
      </div>
    </div>

    <!-- Live Status Pill & Share Button -->
    <div class="w-full flex items-center justify-between px-5 pt-2.5 text-xs">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-300 shadow-md">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>${escapeHtml(profile.header?.statusPillText || 'Active Now')}</span>
      </div>

      <button onclick="shareProfile()" class="p-2 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 hover:bg-slate-800 text-slate-300 hover:text-white transition-all" title="Share Profile">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
      </button>
    </div>

    <!-- Circular Avatar with Glowing Ring -->
    <div class="relative mt-4 mb-2 flex items-center justify-center">
      <div class="absolute -inset-2.5 rounded-full border border-dashed border-amber-400/50 animate-[spin_24s_linear_infinite] pointer-events-none"></div>
      <div class="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 via-blue-500 to-cyan-400 opacity-80 blur-xs"></div>
      
      <div class="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-b from-amber-300/80 via-white/20 to-transparent border-2 border-amber-400/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
        <img src="${avatar}" alt="${escapeHtml(profile.name)}" class="w-full h-full object-cover object-top rounded-full">
      </div>

      ${profile.avatarBadgeText ? `
      <div class="absolute -bottom-2.5 inset-x-0 mx-auto w-fit bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full border border-amber-300 shadow-lg flex items-center gap-1">
        <span>⭐ ${escapeHtml(profile.avatarBadgeText)}</span>
      </div>` : ''}
    </div>

    <!-- Title & Brand Header -->
    <div class="text-center px-4 space-y-1 mt-2.5">
      ${profile.isDualToneTitle && profile.titlePart1 ? `
      <h1 class="text-2xl sm:text-[27px] font-black tracking-tight font-heading drop-shadow-md flex items-center justify-center gap-2">
        <span class="text-white">${escapeHtml(profile.titlePart1)}</span>
        <span class="bg-gradient-to-r ${profile.titlePart2Gradient || 'from-amber-300 via-amber-400 to-amber-500'} bg-clip-text text-transparent">
          ${escapeHtml(profile.titlePart2)}
        </span>
      </h1>` : `
      <h1 class="text-2xl sm:text-[27px] font-black tracking-tight text-white font-heading drop-shadow-md">
        ${escapeHtml(profile.name)}
      </h1>`}

      ${profile.designation ? `<p class="text-xs sm:text-[13px] font-bold text-cyan-300 tracking-wide">${escapeHtml(profile.designation)}</p>` : ''}
      ${profile.subDesignation ? `<p class="text-[11px] text-slate-300/90 font-medium">${escapeHtml(profile.subDesignation)}</p>` : ''}

      ${profile.brandLogoUrl ? `
      <div class="pt-1.5 flex items-center justify-center">
        <a href="${profile.brandLogoLink || '#'}" target="_blank" rel="noopener noreferrer" class="bg-white/95 px-4 py-1.5 rounded-xl shadow-lg border border-white/50 hover:bg-white transition-all transform hover:scale-105 inline-flex items-center gap-2">
          <img src="${profile.brandLogoUrl}" alt="${escapeHtml(profile.name)}" class="h-6 w-auto object-contain">
        </a>
      </div>` : ''}
    </div>

    <!-- Quick Action Circles -->
    <div class="flex items-center justify-center gap-3 my-4 px-4 flex-wrap">
      ${(profile.quickActions || []).map(qa => `
        <a href="${qa.url || '#'}" target="${qa.url?.startsWith('http') ? '_blank' : '_self'}" class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 border border-blue-400/40 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all relative" title="${escapeHtml(qa.label)}">
          <span class="text-sm">🔗</span>
        </a>
      `).join('')}
    </div>

    <!-- Ordered Sections & Buttons -->
    <div class="w-full px-4 space-y-3">
      ${(profile.sections || []).map(sec => {
        if (sec.type === 'button') {
          return `
          <button onclick="handleBtnClick('${sec.id}')" class="w-full text-left relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-r from-amber-950/70 via-slate-900/80 to-slate-950/90 border border-amber-400/40 hover:border-amber-400/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg group cursor-pointer">
            ${sec.thumbnailUrl ? `<div class="absolute right-0 top-0 bottom-0 w-44 bg-cover bg-center opacity-30 pointer-events-none" style="background-image: url('${sec.thumbnailUrl}'); mask-image: linear-gradient(to right, transparent 0%, black 75%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 75%);"></div>` : ''}
            <div class="relative z-10 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-md shrink-0 border border-amber-200">
                  <span>★</span>
                </div>
                <div class="pr-2">
                  <h2 class="text-sm font-black text-white group-hover:text-amber-300 transition-colors">${escapeHtml(sec.buttonTitle)}</h2>
                  ${sec.buttonSubtitle ? `<p class="text-[11px] text-amber-200/90 font-medium">${escapeHtml(sec.buttonSubtitle)}</p>` : ''}
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-white/10 group-hover:bg-amber-400 group-hover:text-slate-950 flex items-center justify-center text-white/80 shrink-0 transition-colors border border-white/10">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </div>
            </div>
          </button>`;
        }
        if (sec.type === 'text_block') {
          return `
          <div class="py-2 px-3 text-${sec.textAlign || 'center'}" style="color: ${sec.textColor || '#FFFFFF'};">
            ${sec.textType === 'h2' ? `<h2 class="text-lg font-black tracking-tight">${escapeHtml(sec.textContent)}</h2>` : ''}
            ${sec.textType === 'h3' ? `<h3 class="text-sm font-bold uppercase tracking-wider text-amber-300">${escapeHtml(sec.textContent)}</h3>` : ''}
            ${sec.textType === 'paragraph' ? `<p class="text-xs text-slate-300 leading-relaxed">${escapeHtml(sec.textContent)}</p>` : ''}
            ${sec.textType === 'callout' ? `<div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">${escapeHtml(sec.textContent)}</div>` : ''}
          </div>`;
        }
        if (sec.type === 'feature_grid') {
          return `
          <div class="w-full mt-2">
            <div class="w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/15 p-3.5 grid grid-cols-4 gap-2 text-center shadow-lg">
              ${(sec.gridItems || []).map(item => `
                <div class="flex flex-col items-center justify-center space-y-1">
                  <span class="text-base text-amber-400">★</span>
                  <span class="text-[10px] font-semibold text-slate-300 leading-tight">${escapeHtml(item.title)}</span>
                </div>
              `).join('')}
            </div>
          </div>`;
        }
        if (sec.type === 'badge_pill') {
          return `
          <div class="flex items-center justify-center pt-2">
            <div class="px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-400/40 text-[10px] font-extrabold uppercase tracking-widest text-amber-300/90 shadow-md flex items-center gap-1.5">
              <span>🛡️</span>
              <span>${escapeHtml(sec.pillText)}</span>
            </div>
          </div>`;
        }
        return '';
      }).join('')}
    </div>

    ${profile.footer?.copyrightText ? `
    <p class="mt-5 text-[10px] text-slate-400/80 text-center px-4 font-mono">
      ${escapeHtml(profile.footer.copyrightText)}
    </p>` : ''}

  </main>

  <script>
    const PROFILE = ${profileJson};

    function updateClock() {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      const hours12 = istTime.getHours() % 12 || 12;
      const mins = istTime.getMinutes().toString().padStart(2, '0');
      document.getElementById('clock').textContent = \`\${hours12}:\${mins}\`;
    }
    updateClock();
    setInterval(updateClock, 30000);

    function shareProfile() {
      if (navigator.share) {
        navigator.share({
          title: PROFILE.name,
          text: PROFILE.name + ' - ' + PROFILE.designation,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
      }
    }

    function handleBtnClick(secId) {
      const sec = (PROFILE.sections || []).find(s => s.id === secId);
      if (!sec) return;
      if (sec.actionType === 'call' && sec.actionTarget) {
        window.location.href = sec.actionTarget;
      } else if (sec.actionType === 'whatsapp' && sec.actionTarget) {
        window.open(sec.actionTarget, '_blank');
      } else if (sec.actionTarget && sec.actionTarget !== '#') {
        window.open(sec.actionTarget, '_blank');
      } else {
        alert(sec.buttonTitle);
      }
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate a complete, standalone Next.js Starter Project ZIP
 * where this specific profile is the home page (`/`)!
 */
export async function generateNextjsProjectZip(profile) {
  const zip = new JSZip();
  const slug = profile.slug || 'doctor-profile';

  // 1. package.json
  const packageJson = {
    name: `${slug}-website`,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start'
    },
    dependencies: {
      next: '^16.4.3',
      react: '^19.3.1',
      'react-dom': '^19.3.1',
      'lucide-react': '^1.65.0',
      'canvas-confetti': '^1.9.4',
      clsx: '^2.1.1',
      'tailwind-merge': '^3.7.0',
      tailwindcss: '^4.3.3',
      '@tailwindcss/postcss': '^4.3.3',
      postcss: '^8.5.23'
    }
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  // 2. jsconfig.json
  zip.file('jsconfig.json', JSON.stringify({
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['./*']
      }
    }
  }, null, 2));

  // 3. postcss.config.mjs
  zip.file('postcss.config.mjs', `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
`);

  // 4. next.config.mjs
  zip.file('next.config.mjs', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  }
};

export default nextConfig;
`);

  // 5. lib/profile-data.js (This specific doctor/profile is baked directly in!)
  zip.file('lib/profile-data.js', `export const PROFILE_DATA = ${JSON.stringify(profile, null, 2)};\n`);

  // 6. app/layout.jsx
  zip.file('app/layout.jsx', `import './globals.css';

export const metadata = {
  title: ${JSON.stringify(profile.meta?.seoTitle || `${profile.name} - ${profile.designation}`)},
  description: ${JSON.stringify(profile.meta?.seoDescription || `${profile.name} official website and practice profile.`)},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-[#040814] text-white antialiased selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
`);

  // 7. app/globals.css
  const existingGlobals = fs.readFileSync(path.join(process.cwd(), 'app', 'globals.css'), 'utf-8');
  zip.file('app/globals.css', existingGlobals);

  // 8. app/page.jsx (Loads this specific profile directly on the root homepage!)
  zip.file('app/page.jsx', `import { PROFILE_DATA } from '@/lib/profile-data';
import DynamicProfileView from '@/components/DynamicProfileView';

export default function HomePage() {
  return <DynamicProfileView profile={PROFILE_DATA} isPreview={false} />;
}
`);

  // 9. components/DynamicProfileView.jsx
  const existingComponent = fs.readFileSync(path.join(process.cwd(), 'components', 'DynamicProfileView.jsx'), 'utf-8');
  zip.file('components/DynamicProfileView.jsx', existingComponent);

  // 10. Copy public assets
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const assetsDir = path.join(publicDir, 'assets');
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      for (const file of files) {
        const filePath = path.join(assetsDir, file);
        if (fs.statSync(filePath).isFile()) {
          const fileData = fs.readFileSync(filePath);
          zip.file(`public/assets/${file}`, fileData);
        }
      }
    }
  }

  // 11. README.md with instructions
  zip.file('README.md', `# ${profile.name} - Standalone Website Project

This is a complete, turnkey Next.js standalone website project created for **${profile.name}** (${profile.designation || 'Biolink & Profile'}).

## How to Run in a New Project

1. Unzip this package to your desired project directory.
2. Open terminal in the directory and install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser. The homepage \`/\` immediately displays **${profile.name}**'s personal branding website!

## How to Deploy to Production (Vercel / Netlify)

- Push this repository to GitHub.
- Connect your GitHub repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
- Click Deploy! Zero configuration required.
`);

  return await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}

