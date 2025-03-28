import puppeteer from "puppeteer";
import fs from "fs";

export const getHtmlPage = async (url: string) => {

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent( "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36" );
  await page.setExtraHTTPHeaders( { "accept-language": "en-US,en;q=0.9" } );
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[data-component-type="s-search-result"]', { timeout: 8000 })
    .catch(() => { console.log("⚠️ Elemento .s-result-item não encontrado.") });

  const html = await page.content();
  fs.writeFileSync("amazon.html", html);

  await browser.close();

  return html;
};