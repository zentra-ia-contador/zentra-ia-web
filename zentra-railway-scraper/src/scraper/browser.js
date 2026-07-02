const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const { getRandomUserAgent } = require('../sri/userAgents');

async function launchBrowser() {
  const executablePath = await chromium.executablePath();
  const userAgent = getRandomUserAgent();

  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    defaultViewport: null,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

  await page.emulateTimezone('America/Guayaquil');
  await page.setUserAgent(userAgent);
  await page.setViewport({ width: 1366, height: 768 });

  return { browser, page, userAgent };
}

async function closeBrowser(browser) {
  if (browser) {
    await browser.close();
  }
}

module.exports = {
  launchBrowser,
  closeBrowser,
};
