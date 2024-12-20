// SCRAPER (use when sitemap is available - remember to import urls from sitemap)
import axios from "axios";
import cheerio from "cheerio";
import fs from "fs-extra";

import urlsToScrape from "";

// UPDATE THIS TO THE CORRECT PATH FROM THE ROOT OF PROJECT
const OUTPUT_FILE = "";

const userAgents = [
  // Add a list of User-Agent strings here
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:86.0) Gecko/20100101 Firefox/86.0",
  "Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
];

function getRandomUserAgent() {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function scrape(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": getRandomUserAgent(),
      },
    });

    const $ = cheerio.load(response.data);

    // Use Cheerio ($) to scrape the data you need

    console.log(`Scraped: ${url}`);
    const obj = {};

    return obj;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return { data: null, links: [] };
  }
}

// Use a batch of URLs to scrape
// const batchUrls = urlsToScrape.slice(0, 10);

async function main() {
  const visited = new Set();
  const queue = [...urlsToScrape];
  const scrapedData = [];

  async function processQueue() {
    if (queue.length === 0) {
      await fs.writeJson(OUTPUT_FILE, scrapedData, { spaces: 2 });
      console.log(`Data saved to ${OUTPUT_FILE}`);
      return;
    }

    const url = queue.shift();
    if (!visited.has(url)) {
      visited.add(url);
      const result = await scrape(url);
      if (result) {
        scrapedData.push(result);
      }
    }

    setTimeout(processQueue, 500);
  }

  processQueue();
}

main();
