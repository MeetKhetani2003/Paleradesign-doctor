import { getProfileBySlug } from '@/lib/profile-service';
import DynamicProfileView from '@/components/DynamicProfileView';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: profile.meta?.seoTitle || `${profile.name} - ${profile.designation}`,
    description: profile.meta?.seoDescription || `${profile.name} official digital link and profile.`,
    openGraph: {
      title: profile.name,
      description: profile.designation,
      images: profile.avatarUrl ? [profile.avatarUrl] : [],
    },
  };
}

export default async function DynamicProfilePage({ params }) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center p-6 text-center text-white">
        <h1 className="text-4xl font-black mb-2 text-amber-400">404</h1>
        <h2 className="text-xl font-bold mb-4">Page "{slug}" Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md mb-6">
          This biolink page does not exist yet. You can create it in the Admin Builder right now!
        </p>
        <Link 
          href={`/admin`}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:from-amber-300 transition-all shadow-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Admin Panel &amp; Create Page</span>
        </Link>
      </div>
    );
  }

  return <DynamicProfileView profile={profile} isPreview={false} />;
}

