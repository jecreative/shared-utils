// SCRAPER (use when sitemap is available - remember to import urls from sitemap)
import axios from "axios";
import fs from "fs-extra";
import urlsToScrape from "../../data/upkeepUrls.js";
import path from "path";
import cheerio from "cheerio"; // Add cheerio for parsing HTML

// Directory to store the scraped HTML files
const OUTPUT_DIR = path.resolve("./upkeep");

// Ensure the output directory exists
fs.ensureDirSync(OUTPUT_DIR);

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
];

function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)/g, ""); // Remove leading/trailing dashes
}

async function scrape(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": getRandomUserAgent(),
      },
    });

    const fullHTML = response.data;
    const $ = cheerio.load(fullHTML);

    // Extract the page title
    const pageTitle = $("title").text().trim();
    const slug = createSlug(pageTitle);

    console.log(`Scraped: ${url} (Title: ${pageTitle})`);

    return { url, html: fullHTML, slug };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return { url, html: null, slug: null };
  }
}

const batchUrls = urlsToScrape.slice(0, 3);

async function main() {
  const visited = new Set();
  const queue = [...urlsToScrape]; // Create a shallow copy of the URLs list

  async function processQueue() {
    if (queue.length === 0) {
      console.log(`Scraping completed. HTML files saved in ${OUTPUT_DIR}`);
      return;
    }

    const url = queue.shift();
    if (!visited.has(url)) {
      visited.add(url);
      const { url: scrapedUrl, html, slug } = await scrape(url);
      if (html && slug) {
        const fileName = path.join(OUTPUT_DIR, `${slug}.html`);
        await fs.writeFile(fileName, html);
        console.log(`Saved: ${fileName}`);
      }
    }

    // Run the processQueue function again every 500ms
    setTimeout(processQueue, 500);
  }

  processQueue();
}

main();
