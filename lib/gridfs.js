import { getGridFSBucket } from './mongodb';
import { ObjectId } from 'mongodb';
import { Readable } from 'stream';

/**
 * Upload a file buffer to MongoDB GridFS
 * @param {Buffer} buffer - File buffer
 * @param {string} filename - Name of the file
 * @param {string} contentType - MIME type (e.g. image/jpeg, image/png, image/gif)
 * @returns {Promise<string>} - The generated GridFS ObjectId string
 */
export async function uploadToGridFS(buffer, filename, contentType) {
  const bucket = await getGridFSBucket();
  if (!bucket) {
    throw new Error('GridFS bucket is unavailable. Please verify MONGODB_URI.');
  }

  return new Promise((resolve, reject) => {
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: contentType || 'application/octet-stream',
      metadata: {
        uploadedAt: new Date(),
        originalName: filename
      }
    });

    readableStream.pipe(uploadStream)
      .on('error', (err) => reject(err))
      .on('finish', () => resolve(uploadStream.id.toString()));
  });
}

/**
 * Get a file download stream from GridFS by ID
 * @param {string} fileId - MongoDB ObjectId string
 */
export async function getFileStreamFromGridFS(fileId) {
  const bucket = await getGridFSBucket();
  if (!bucket) {
    throw new Error('GridFS bucket is unavailable.');
  }

  if (!ObjectId.isValid(fileId)) {
    throw new Error('Invalid GridFS File ID format.');
  }

  const objId = new ObjectId(fileId);
  const files = await bucket.find({ _id: objId }).toArray();
  
  if (!files || files.length === 0) {
    return null;
  }

  const fileDoc = files[0];
  const downloadStream = bucket.openDownloadStream(objId);

  return {
    stream: downloadStream,
    metadata: fileDoc
  };
}

/**
 * Delete a file from GridFS
 * @param {string} fileId 
 */
export async function deleteFromGridFS(fileId) {
  const bucket = await getGridFSBucket();
  if (!bucket) return false;
  if (!ObjectId.isValid(fileId)) return false;

  await bucket.delete(new ObjectId(fileId));
  return true;
}

