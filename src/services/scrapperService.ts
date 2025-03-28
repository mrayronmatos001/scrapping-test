import { getHtmlPage } from "../utils/domUtils";
import { JSDOM } from "jsdom";
import type { Product } from "../models/Product";
import fs from "fs";

const scrape = async (keyword:string): Promise<Product[]> => {

    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
        const html = await getHtmlPage(url);
        
        const dom = new JSDOM(html);
        fs.writeFileSync("jsdom-version.html", dom.serialize());

        const productElements = dom.window.document.querySelectorAll('[data-component-type="s-search-result"]');

        const products: Product[] = [];

        productElements.forEach((element) => {

            const title = element.querySelector('[data-cy="title-recipe"] h2 span')?.textContent?.trim() || 'No title';
            const rating = element.querySelector('.a-icon-star-small .a-icon-alt')?.textContent?.trim() || 'No rating';
            const reviewCount = element.querySelector('.a-link-normal .a-size-base')?.textContent?.trim() || '0';
            const imageUrl = (element.querySelector('img.s-image') as HTMLImageElement)?.src || "No image";

            products.push({
                title,
                rating,
                reviewCount,
                imageUrl
            });
        });

        return products;
        
    } catch (error: any) {
        console.error("Error scrapping amazon", error);
        throw new Error(`Failed to scrape the page: ${error.message}`);
    }
};

export default { scrape };
