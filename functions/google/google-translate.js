import fetch from "node-fetch";

// Replace with your actual API key
const apiKey = "";

/**
 * Translates a given text to the specified target language using Google Translate API.
 *
 * @param {string} text - The text to translate.
 * @param {string} [targetLanguage="es"] - The target language code (default is Spanish, "es").
 * @returns {Promise<string>} - The translated text.
 * @throws {Error} - Throws an error if the translation fails.
 */
const translate = async (text, targetLanguage = "es") => {
  if (!text || text.trim().length === 0) {
    console.warn("No text provided for translation.");
    return "";
  }

  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Translation API request failed with status ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data?.data?.translations || data.data.translations.length === 0) {
      throw new Error("No translations found in the response.");
    }

    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation failed:", error.message);
    throw error;
  }
};

export default translate;
