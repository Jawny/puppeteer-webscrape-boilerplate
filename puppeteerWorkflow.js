const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");

// Randomize mouse movements
function rdn(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const puppeteerWorkflow = async () => {
  puppeteer.use(pluginStealth());

  const browserFetcher = puppeteer.createBrowserFetcher();

  const revisionInfo = await browserFetcher.download("809590.");

  const browser = await puppeteer.launch({
    executablePath: revisionInfo.executablePath,
    // executablePath: "/usr/bin/chromium-browser",
    headless: false,
    args: [
      "--window-size=1920,1080",
      "--window-position=000,000",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--disable-features=site-per-process",
      "--disable-features=IsolateOrigins",
      "--disable-site-isolation-trials",
      "--ignore-certifcate-errors",
      "--ignore-certifcate-errors-spki-list",
      "--disable-setuid-sandbox",
      "--disable-infobars",
    ],
  });
  try {
    // Open webpage and do all the scraping you need.
    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
      "https://gorillamind.com/collections/all/products/turkesterone",
      ["geolocation"]
    );
    await page.setBypassCSP(true);
    await page.setDefaultNavigationTimeout(0);

    await page.goto(
      "https://gorillamind.com/collections/all/products/turkesterone"
    );
  } finally {
    // Close browser when you're finished
    browser.close();
  }
};

console.log("`ctrl + c` to exit");
process.on("SIGINT", () => {
  console.log("bye!");
  process.exit();
});

module.exports = puppeteerWorkflow;
