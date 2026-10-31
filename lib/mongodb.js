import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global cache to prevent multiple connections in development
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, bucket: null };
}

export async function connectToDatabase() {
  if (!MONGODB_URI || !MONGODB_URI.trim()) {
    return { conn: null, bucket: null, isFallback: true };
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return { conn: cached.conn, bucket: cached.bucket, isFallback: false };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // 5s timeout instead of 30s
      connectTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      const db = mongooseInstance.connection.db;
      const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
      console.log('[MongoDB] Successfully connected to MongoDB Atlas & GridFS.');
      return {
        conn: mongooseInstance,
        bucket: bucket,
        isFallback: false
      };
    });
  }

  try {
    const res = await cached.promise;
    cached.conn = res.conn;
    cached.bucket = res.bucket;
    return { conn: cached.conn, bucket: cached.bucket, isFallback: false };
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    cached.bucket = null;
    console.warn('[MongoDB Notice] Atlas connection failed (Check IP Whitelist in MongoDB Atlas):', e.message);
    // Graceful fallback so the site and admin continue running smoothly
    return { conn: null, bucket: null, isFallback: true, error: e.message };
  }
}

export async function getGridFSBucket() {
  const { bucket, isFallback } = await connectToDatabase();
  if (isFallback || !bucket) {
    return null;
  }
  return bucket;
}
