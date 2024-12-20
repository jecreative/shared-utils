import fs from 'fs';
import { readJsonFile } from '../functions/json-helpers.js';
import { PineconeClient } from '@pinecone-database/pinecone';

// import { createEmbeddings } from './functions/openai.js';

const pinecone = new PineconeClient();

await pinecone.init({
  environment: 'asia-northeast1-gcp',
  apiKey: '',
});

const index = pinecone.Index('bejamas-embeddings');

// Dimensions: 1536
const calcVectorDimension = (vector) => {
  if (Array.isArray(vector)) {
    return vector.length;
  } else {
    throw new Error('Input must be an array');
  }
};

// Function to format json to pinecone vectors
const formatJsonToPinecone = async (jsonFilePath, outputPath) => {
  // Read data
  const unformattedEmbeddings = await readJsonFile(jsonFilePath);

  // Remove items with embeddings array length equal to zero
  const nonNullishItems = unformattedEmbeddings.filter((item) => item.embeddings.length !== 0);

  const formattedEmbeddings = nonNullishItems.map((item, index) => {
    return {
      id: `${index}`, // index
      values: item.embeddings, // embeddings
      metadata: { url: item.url, text: item.text }, // url & text
    };
  });

  fs.writeFileSync(outputPath, JSON.stringify(formattedEmbeddings), 'utf-8');
};
// formatJsonToPinecone('./json/upkeep/upkeep-embeddings.json', './json/upkeep/upkeep-pinecone.json');

// Create pinecone index vectors

const batchUpsertVectors = async () => {
  const data = await readJsonFile('./bejamas/vector-data.json');

  const TOTAL_ITEMS = data.length; // 3841
  const BATCH_SIZE = 100;

  console.log(data.length);

  // I NEED THIS TO RUN IN BATCHES OF 100. THE NEXT CYCLE CAN ONLY START WHEN THE PREVIOUS ONE IS COMPLETELY DONE

  if (data) {
    try {
      for (let i = 0; i < TOTAL_ITEMS; i += BATCH_SIZE) {
        const start = i;
        const end = Math.min(i + BATCH_SIZE, TOTAL_ITEMS);

        const batchData = data.slice(start, end);
        console.log(`Processing batch from index ${start} to ${end - 1}`);

        await index.upsert({
          upsertRequest: {
            vectors: batchData,
          },
        });

        console.log(`Batch from index ${start} to ${end - 1} processed successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// batchUpsertVectors();

// const queryPinecone = async (input) => {
//   try {
//     // Step 1. Take input and create embeddings
//     const embeddingResponse = await createEmbeddings(input);

//     const inputVector = embeddingResponse?.data?.[0]?.embedding;

//     // Step 2. Index our pinecone vectors and return top 10 results
//     const matches = await index.query({
//       queryRequest: {
//         topK: 3,
//         includeMetadata: true,
//         vector: inputVector,
//       },
//     });

//     // Step 3. Write results to json file for review
//     fs.writeFileSync('./bejamas/query-results.json', JSON.stringify(matches), 'utf-8');
//   } catch (error) {
//     console.log('Error: ', error);
//   }
// };

// // Start measuring time
// const startTime = performance.now();
// // Call the function you want to measure
// await queryPinecone('What is bejamas?');
// // End measuring time
// const endTime = performance.now();
// // Calculate the time taken
// const timeTaken = endTime - startTime;
// console.log(`Your function took ${timeTaken} milliseconds to run.`);
