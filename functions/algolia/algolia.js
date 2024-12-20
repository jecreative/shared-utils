import algoliasearch from "algoliasearch";
import fs from "fs";

// Replace these with your Algolia credentials and index name
const APPLICATION_ID = "YourApplicationID";
const ADMIN_API_KEY = "YourAdminAPIKey";
const INDEX_NAME = "YourIndexName";

// Initialize Algolia client and index
const client = algoliasearch(APPLICATION_ID, ADMIN_API_KEY);
const index = client.initIndex(INDEX_NAME);

/**
 * Exports all records from the specified Algolia index to a JSON file.
 * Records are appended in batches to avoid memory issues with large datasets.
 *
 * @returns {Promise<void>}
 */
const exportRecords = async () => {
  try {
    const outputFile = "algolia_records.json";
    console.log(`Exporting records from index: ${INDEX_NAME}...`);

    const browser = index.browseObjects({
      batch: (hits) => {
        // Append each batch of hits to the output file
        fs.appendFileSync(outputFile, JSON.stringify(hits, null, 2) + ",\n");
      },
    });

    await browser;
    console.log(`Export completed! Records saved to: ${outputFile}`);
  } catch (error) {
    console.error("Error exporting records:", error.message);
  }
};

/**
 * Uploads an array of records to the specified Algolia index.
 *
 * @param {Array<Object>} records - The array of records to upload.
 * @returns {Promise<void>}
 */
const uploadRecords = async (records) => {
  try {
    console.log(`Uploading records to index: ${INDEX_NAME}...`);

    const { objectIDs } = await index.saveObjects(records, {
      autoGenerateObjectIDIfNotExist: true,
    });

    console.log(
      `Successfully uploaded ${objectIDs.length} records to index: ${INDEX_NAME}`
    );
  } catch (error) {
    console.error("Error uploading records:", error.message);
  }
};

// Example usage (replace with actual records for upload):
// const sampleRecords = [
//   { objectID: "1", name: "Record 1", description: "Description 1" },
//   { objectID: "2", name: "Record 2", description: "Description 2" },
// ];
// uploadRecords(sampleRecords);

// Example usage of exportRecords:
// exportRecords();
