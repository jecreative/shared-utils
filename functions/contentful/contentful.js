// ---------------------------- Fetch using Content Delivery API ---------------------------------------- //

import contentful from "contentful-management";

// API KEYS
const CONTENTFUL_SPACE_ID = "";
const CONTENTFUL_CONTENT_MANAGEMENT_API_KEY = "";

const client = contentful.createClient({
  accessToken: CONTENTFUL_CONTENT_MANAGEMENT_API_KEY,
});

/**
 * Fetches all assets from a specified Contentful environment.
 *
 * @param {Object} options - Configuration options for fetching assets.
 * @param {string} options.environment - The Contentful environment to query.
 * @param {number} options.limit - The maximum number of assets to fetch.
 * @param {number} options.skip - The number of assets to skip (for pagination).
 * @returns {Promise<void>}
 */
const getAllAssets = async ({ environment, limit, skip, saveFileLocation }) => {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(environment);
    const response = await env.getAssets({ limit, skip });

    console.log(`Fetched ${response.items.length} assets.`);
    return response.items;
  } catch (error) {
    console.error("Failed to fetch assets:", error);
  }
};

/**
 * Fetches all entries of a specific content type from a Contentful environment.
 *
 * @param {Object} options - Configuration options for fetching entries.
 * @param {string} options.environment - The Contentful environment to query.
 * @param {string} options.contentType - The Content type to fetch.
 * @param {number} options.limit - The maximum number of entries to fetch.
 * @returns {Promise<void>}
 */
const getAllEntries = async ({ environment, contentType, limit }) => {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(environment);
    const response = await env.getEntries({
      content_type: contentType,
      limit,
      include: 10,
    });

    console.log(
      `Fetched ${response.items.length} entries for content type "${contentType}".`
    );

    return response.items;
  } catch (error) {
    console.error("Failed to fetch entries:", error);
  }
};

/**
 * Fetches a single entry from a specified Contentful environment.
 *
 * @param {string} environment - The Contentful environment to query.
 * @param {string} entryId - The ID of the entry to fetch.
 * @returns {Promise<Object>} - The fetched entry.
 */
const getEntry = async (environment, entryId) => {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(environment);
    const entry = await env.getEntry(entryId);

    console.log(`Fetched entry ${entryId}.`);
    return entry;
  } catch (error) {
    console.error(`Failed to fetch entry ${entryId}:`, error);
  }
};

/**
 * Updates an existing entry in a specified Contentful environment.
 *
 * @param {Object} options - Configuration options for updating an entry.
 * @param {string} options.environment - The Contentful environment to query.
 * @param {string} options.entryId - The ID of the entry to update.
 * @param {Object} options.updatedFields - The fields to update on the entry.
 * @returns {Promise<Object>} - The updated entry.
 */
const updateEntry = async ({ environment, entryId, updatedFields }) => {
  try {
    const space = await client.getSpace(CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(environment);
    const entry = await env.getEntry(entryId);

    entry.fields = { ...entry.fields, ...updatedFields };
    const updatedEntry = await entry.update();

    console.log(`Entry ${updatedEntry.sys.id} updated successfully.`);
    return updatedEntry;
  } catch (error) {
    console.error(`Failed to update entry ${entryId}:`, error);
  }
};
