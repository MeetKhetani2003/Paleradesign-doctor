import { NextResponse } from 'next/server';
import { uploadToGridFS } from '@/lib/gridfs';
import { connectToDatabase } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No valid file provided.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = file.name || `upload_${Date.now()}`;
    const contentType = file.type || 'application/octet-stream';

    const { isFallback } = await connectToDatabase();

    if (!isFallback) {
      // 1. Upload to MongoDB GridFS
      const fileId = await uploadToGridFS(buffer, filename, contentType);
      return NextResponse.json({
        success: true,
        url: `/api/media/${fileId}`,
        fileId: fileId,
        storage: 'gridfs',
        filename: filename
      });
    } else {
      // 2. Fallback mode: save to public/uploads directory
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const safeName = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(uploadsDir, safeName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${safeName}`,
        storage: 'local_public',
        filename: safeName,
        note: 'Saved locally. Provide MONGODB_URI in .env.local to activate MongoDB GridFS.'
      });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}

