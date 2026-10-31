import { NextResponse } from 'next/server';
import { getFileStreamFromGridFS } from '@/lib/gridfs';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new NextResponse('File ID required', { status: 400 });
    }

    const result = await getFileStreamFromGridFS(id);
    if (!result) {
      return new NextResponse('File not found in GridFS', { status: 404 });
    }

    const { stream, metadata } = result;
    const contentType = metadata.contentType || 'application/octet-stream';

    // Convert node readable stream to web readable stream
    const webStream = new ReadableStream({
      start(controller) {
        stream.on('data', (chunk) => controller.enqueue(chunk));
        stream.on('end', () => controller.close());
        stream.on('error', (err) => controller.error(err));
      }
    });

    return new Response(webStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': metadata.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('GridFS stream error:', error);
    return new NextResponse(error.message || 'Error streaming media', { status: 500 });
  }
}

