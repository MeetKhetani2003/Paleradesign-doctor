import { getProfileBySlug } from '@/lib/profile-service';
import DynamicProfileView from '@/components/DynamicProfileView';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export const metadata = {
  title: 'Dr. Avinash Kasundra | Premier Hospital & ICU Rajkot',
  description: 'Consultant Intensivist & Pulmonologist at Premier Hospital & ICU, Rajkot. MBBS, MD, Lilavati Hospital Critical Care Fellow.',
};

export default async function HomePage() {
  const defaultProfile = await getProfileBySlug('dr-avinash-kasundra');

  return (
    <div className="relative">
      {/* Floating Admin Access Pill */}
      <div className="fixed top-3 right-3 z-50">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-amber-300 hover:text-white border border-amber-400/40 text-xs font-bold shadow-xl backdrop-blur-md transition-all hover:scale-105"
        >
          <Settings className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>Admin Builder</span>
        </Link>
      </div>

      {defaultProfile && <DynamicProfileView profile={defaultProfile} isPreview={false} />}
    </div>
  );
}

