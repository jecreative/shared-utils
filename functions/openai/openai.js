import fs from "fs";
import { Configuration, OpenAIApi } from "openai";

import { readJsonFile } from "./json-helpers.js";

const configuration = new Configuration({
  apiKey: "",
});

const openai = new OpenAIApi(configuration);

export const createEmbeddings = async (input) => {
  try {
    const result = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input,
    });

    console.log("Usage: ", result.data.usage);

    return result.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// const result = await createEmbeddings('What is upkeep?');
// fs.writeFileSync('./test.json', JSON.stringify(result.data[0].embedding, null, 2));

const main = async () => {
  const chunkedData = await readJsonFile(
    "./json/upkeep/upkeep-chunked-nullish.json"
  );

  // Initialize an array to hold all the objects
  const allObjs = [];

  // Loop through each object in the array
  for (const obj of chunkedData) {
    try {
      // Tokenize the text
      const tokenizedText = obj.tokenizedText;

      // Create embeddings with tokenizedText
      const response = await createEmbeddings(tokenizedText);

      // Extract embeddings from response
      const embeddings = response?.data?.[0]?.embedding;

      // Add embeddings to object
      const newObj = {
        id: obj.id,
        url: obj.url,
        text: obj.text,
        embeddings: embeddings || [],
      };

      // Add the object to the array
      allObjs.push(newObj);
    } catch (error) {
      console.log(error);
    }
  }

  // Write the array to the JSON file
  fs.writeFileSync(
    "./json/upkeep/upkeep-embeddings-2.json",
    JSON.stringify(allObjs, null, 2)
  );
};

main();
