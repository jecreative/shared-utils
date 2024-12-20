// SCRAPER (use when sitemap is not available)
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs-extra';

const ROOT_URL = 'https://www.hellotalk.com/';
const OUTPUT_FILE = './test-scraped.json';

async function scrape(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('title').text() || '';
    const description = $('meta[name="description"]').attr('content') || '';

    const data = {
      url,
      title: title,
      description: description,
    };

    console.log(`Scraped: ${url}`);

    // Collect all internal links on the page
    const links = [];
    $('a[href^="/"]').each((_, element) => {
      const link = $(element).attr('href');
      const absoluteUrl = new URL(link, url).href;
      if (!links.includes(absoluteUrl)) {
        links.push(absoluteUrl);
      }
    });

    return { data, links };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return { data: null, links: [] };
  }
}

async function main() {
  const visited = new Set();
  const queue = [ROOT_URL];
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
      const { data, links } = await scrape(url);
      if (data) {
        scrapedData.push(data);
      }
      links.forEach((link) => {
        if (!visited.has(link)) {
          queue.push(link);
        }
      });
    }

    setTimeout(processQueue, 1000);
  }

  processQueue();
}

main();
