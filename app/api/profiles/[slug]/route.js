import { NextResponse } from 'next/server';
import { getProfileBySlug, saveProfile, deleteProfile } from '@/lib/profile-service';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const profile = await getProfileBySlug(slug);

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const saved = await saveProfile(slug, body);
    return NextResponse.json({ success: true, profile: saved });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;
    await deleteProfile(slug);
    return NextResponse.json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

