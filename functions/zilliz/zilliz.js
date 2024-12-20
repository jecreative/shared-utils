import dotenv from 'dotenv';
dotenv.config();

import { readJsonFile, saveToJsonFile } from './functions/json-helpers.js';
import { createEmbeddings } from './functions/openai.js';

// Docs: https://milvus.io/api-reference/node/v2.2.x/About.md
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

console.info(`Connecting to DB: ${process.env.ZILLI_URI}`);

const config = {
  uri: process.env.ZILLI_URI,
  secure: 'True',
  user: process.env.ZILLIZ_USER,
  password: process.env.ZILLIZ_PASSWORD,
};

const client = new MilvusClient(config.uri, config.secure, config.user, config.password);

const chunkZillizData = async () => {
  // NOTE: Do not run this function! It is only used to chunk the data into smaller batches
  const data = await readJsonFile('./json/upkeep/upkeep-embeddings.json');

  const zillizData = data.map((item) => {
    return {
      id: item.id,
      embeddings: item.embeddings,
      url: item.url,
      text: item.text,
    };
  });

  const filtered = zillizData.filter((item) => item.embeddings.length !== 0);

  const batch = filtered.slice(7501, 7701);

  const testFormat = {
    rows: [...batch],
  };
  saveToJsonFile(testFormat, './json/upkeep/upkeep-final-zilliz.json');
};

const main = async (collection_name = `upkeep_embeddings`) => {
  console.log(`Creating input embeddings...`);
  const { data } = await createEmbeddings('test');
  const inputVectors = data[0].embedding;

  // search
  console.time(`Searching vector:`);
  const res = await client.search({
    collection_name,
    vectors: [inputVectors], // input embeddings here
    vector_type: DataType.FloatVector,
    search_params: {
      anns_field: 'embeddings',
      metric_type: 'IP',
      params: JSON.stringify({ nprobe: 64 }),
      topk: 10,
    },
  });
  console.timeEnd(`Searching vector:`);
  console.log(res);
  saveToJsonFile(res, './json/upkeep/upkeep-search-results.json');
};

// // Start measuring time
// const startTime = performance.now();
// // Call the function you want to measure
// await main();
// // End measuring time
// const endTime = performance.now();
// // Calculate the time taken
// const timeTaken = endTime - startTime;
// console.log(`Your function took ${timeTaken} milliseconds to run.`);

chunkZillizData();
