import { buildClient, LogLevel } from "@datocms/cma-client-node";
import { saveToJsonFile, readJsonFile } from "../helpers/json-helpers.js";

const client = buildClient({
  apiToken: "",
  environment: "main",
  logLevel: LogLevel.BASIC,
});

export const getRecord = async (itemId) => {
  try {
    const item = await client.items.find(itemId, {
      nested: true,
      version: "published",
    });

    return item;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRecords = async (modelId = "page", offset = 0, limit = 30) => {
  console.info("Listing all records...");
  try {
    const records = await client.items.list({
      version: "current",
      page: {
        offset,
        limit,
      },
      filter: {
        type: modelId,
      },
      nested: true,
    });

    console.info(`Total records: ${records.length}`);

    // Format the data
    const results = records.map((record) => ({
        id: record?.id,
        slug: record?.slug,
        status: record?.meta?.status,
        heroBlockId: record?.hero[0],
        sections: record?.sections,
      }));

    return results;

    // console.info("Saving to JSON file...");
    // saveToJsonFile(results, "./alchemy/pages-batch-6.json");
  } catch (error) {
    console.log(error);
  }
};

export const createRecord = async (modelId, fields) => {
  const record = await client.items.create({
    item_type: { type: "item_type", id: modelId },
    ...fields,
  });

  console.log(`Published: ${record.id}!`);

  return record.id;
};

export const updateRecord = async ({ translatedRecord }) => {
  try {
    const item = await client.items.update(translatedRecord.id, translatedRecord);
    return item;
  } catch (error) {
    console.log(error);
  }
};

export const publishRecord = async (itemId) => {
  try {
    const item = await client.items.publish(itemId, {
      recursive: true,
    });
    return item;
  } catch (error) {
    console.log(error);
  }
};
