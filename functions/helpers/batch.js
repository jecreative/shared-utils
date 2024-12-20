/**
 * Processes items in batches asynchronously.
 *
 * @param {Array} itemsToProcess - The array of items to process in batches.
 * @param {Function} callback - The async function to process each batch. Should return an array or `null`.
 * @param {number} [batchSize=15] - The number of items to process in each batch.
 * @returns {Promise<Array>} - An array of results from all the processed batches.
 */
const batch = async (itemsToProcess, callback, batchSize = 15) => {
  const totalItemCount = itemsToProcess.length;
  const allResults = [];

  let currentIndex = 0;
  while (currentIndex < totalItemCount) {
    // Define the current batch range
    const start = currentIndex;
    const end = Math.min(currentIndex + batchSize, totalItemCount);
    const itemBatch = itemsToProcess.slice(start, end);

    // Log batch progress
    console.log(`Processing items ${start + 1}-${end} of ${totalItemCount}`);

    // Process the batch and accumulate results
    const results = await callback(itemBatch);
    if (results) {
      allResults.push(...results);
    }

    // Move to the next batch
    currentIndex += batchSize;
  }

  return allResults;
};
