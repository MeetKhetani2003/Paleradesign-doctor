import { NextResponse } from 'next/server';
import { getAllProfiles, saveProfile } from '@/lib/profile-service';
import { DEFAULT_PROFILES } from '@/lib/default-profiles';

export async function GET() {
  try {
    const profiles = await getAllProfiles();
    return NextResponse.json({ success: true, profiles });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, name, template = 'dr-avinash-kasundra' } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Page slug is required' }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '-').trim();

    // Use selected template as base or blank
    const baseTemplate = DEFAULT_PROFILES.find(p => p.slug === template) || DEFAULT_PROFILES[0];
    const newProfile = {
      ...JSON.parse(JSON.stringify(baseTemplate)),
      slug: cleanSlug,
      name: name || baseTemplate.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = await saveProfile(cleanSlug, newProfile);
    return NextResponse.json({ success: true, profile: saved });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

