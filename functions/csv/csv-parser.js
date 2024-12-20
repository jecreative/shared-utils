import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { saveToJsonFile } from "../helpers/json-helpers.js";

// Get the current directory for the file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Converts a CSV file to a JSON file.
 *
 * @param {string} inputCsvPath - The file path of the input CSV file.
 * @param {string} outputJsonPath - The file path where the output JSON file will be saved.
 * @returns {Promise<void>}
 */
const convertCsvToJson = async (inputCsvPath, outputJsonPath) => {
  const results = [];

  try {
    // Create a read stream for the CSV file and parse it
    const readStream = fs.createReadStream(inputCsvPath).pipe(csv());

    for await (const data of readStream) {
      results.push(data);
    }

    // Save the parsed JSON data to the output file
    saveToJsonFile(results, outputJsonPath);

    console.log(
      `Conversion completed successfully. JSON saved at: ${outputJsonPath}`
    );
  } catch (err) {
    console.error("Error processing the file:", err.message);
  }
};

// Example usage: Update these paths as needed
const inputCsvPath = path.resolve(__dirname, "../../cribl-resources.csv"); // Path to your CSV file
const outputJsonPath = path.resolve(__dirname, "output.json"); // Path for the output JSON file

// Run the conversion
convertCsvToJson(inputCsvPath, outputJsonPath);
