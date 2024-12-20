import dotenv from 'dotenv';
dotenv.config();

import { Storage } from '@google-cloud/storage';
import zlib from 'zlib';

const storage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_SERVICE_ACCOUNT),
});

async function readAndDecompressFileFromBucket(bucketName, fileName) {
  try {
    // Read the gzipped file from Google Cloud Storage
    const file = storage.bucket(bucketName).file(fileName);
    const [compressedContents] = await file.download();

    // Decompress the contents
    const contents = zlib.gunzipSync(compressedContents);

    // Convert the contents to a string
    const data = contents.toString('utf8');

    // Parse the JSON string into an object
    const jsonData = JSON.parse(data);

    // Work with the JSON data
    console.log(jsonData[0]);

    return jsonData;
  } catch (error) {
    console.error('Error reading and decompressing file from bucket:', error);
    throw error;
  }
}

const bucketName = 'bejamas-embeddings';
const fileName = 'bejamas-embeddings.json.gz';

readAndDecompressFileFromBucket(bucketName, fileName);
