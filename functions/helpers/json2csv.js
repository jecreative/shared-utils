import fs from 'fs';
import { parse } from 'json2csv';

// Read the JSON file
const jsonFilePath = './json/bejamas-embeddings.json';
const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
const jsonObj = JSON.parse(jsonData);

// Add an ID to each row
const jsonObjWithId = jsonObj.map((row, index) => {
  return {
    id: index + 1,
    ...row
  };
});

// Define the fields (keys) you want to extract from the JSON object
const fields = ['id', 'url', 'text', 'embeddings']; // Replace with your actual field names, keeping 'id' as the first field

try {
  const opts = { fields };
  const csv = parse(jsonObjWithId, opts);
  
  // Write the CSV data to a file
  const csvFilePath = './output.csv';
  fs.writeFileSync(csvFilePath, csv);
  
  console.log('JSON to CSV conversion with ID successful');
} catch (err) {
  console.error('Error during JSON to CSV conversion with ID:', err);
}
