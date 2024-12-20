import fs from "fs";

export const readJsonFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) {
        reject(`Error reading file: ${err}`);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(`Error parsing JSON: ${error}`);
        }
      }
    });
  });
};

export const saveToJsonFile = (array, filename) => {
  const jsonString = JSON.stringify(array, null, 2);

  fs.writeFile(filename, jsonString, (err) => {
    if (err) {
      console.error(`Error writing to file: ${err}`);
    } else {
      console.log(`File saved as ${filename}`);
    }
  });
};

export const reverseJsonFile = (jsonObj) => {
  try {
    if (Array.isArray(jsonObj)) {
      jsonObj.reverse();
    } else {
      const entries = Object.entries(jsonObj);
      const reversedEntries = entries.reverse();
      jsonObj = Object.fromEntries(reversedEntries);
    }

    const reversedJsonString = JSON.stringify(jsonObj);
    return reversedJsonString;
  } catch (error) {
    console.error("Invalid JSON string:", error);
    return null;
  }
};

export function splitAndSaveJSONArray(array, outputFile1, outputFile2) {
  const middleIndex = Math.ceil(array.length / 2);

  const firstHalf = array.slice(0, middleIndex);
  const secondHalf = array.slice(middleIndex);

  saveToJsonFile(firstHalf, outputFile1);
  saveToJsonFile(secondHalf, outputFile2);
}