import type { Request, Response } from "express";
import scrapperService from "../services/scrapperService";

export const startScrapping = async (req: Request, res: Response) => {
    try {
        const keyword = req.query.keyword as string;
        const data = await scrapperService.scrape(keyword);
        res.json(data);
    } catch (error) {
        res.status(500).send({"error": "error"});
    }
}