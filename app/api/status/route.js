import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { conn, isFallback, error } = await connectToDatabase();
    if (isFallback || !conn) {
      return NextResponse.json({
        connected: false,
        storage: 'local_memory',
        error: error || 'MONGODB_URI not configured or IP not whitelisted'
      });
    }

    return NextResponse.json({
      connected: true,
      storage: 'gridfs',
      database: conn.connection.name
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      storage: 'local_memory',
      error: err.message
    });
  }
}

