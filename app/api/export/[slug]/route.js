import { NextResponse } from 'next/server';
import { getProfileBySlug } from '@/lib/profile-service';
import { generateStandaloneHtml, generateNextjsProjectZip } from '@/lib/export-service';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'html';

    const profile = await getProfileBySlug(slug);
    if (!profile) {
      return new NextResponse('Profile not found', { status: 404 });
    }

    if (format === 'html') {
      const htmlContent = generateStandaloneHtml(profile);
      return new NextResponse(htmlContent, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': `attachment; filename="${slug}-website.html"`
        }
      });
    }

    if (format === 'zip') {
      const zipBuffer = await generateNextjsProjectZip(profile);
      return new NextResponse(zipBuffer, {
        headers: {
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${slug}-nextjs-project.zip"`
        }
      });
    }

    if (format === 'json') {
      return new NextResponse(JSON.stringify(profile, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${slug}-config.json"`
        }
      });
    }

    return new NextResponse('Invalid export format. Use ?format=html, ?format=zip, or ?format=json', { status: 400 });
  } catch (err) {
    console.error('Export Error:', err);
    return new NextResponse('Error generating export package: ' + err.message, { status: 500 });
  }
}

