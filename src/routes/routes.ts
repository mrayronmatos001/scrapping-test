import { Router } from "express";
import type { Request, Response } from "express";
import { startScrapping } from "../controllers/startScrapping";

const routes = Router();

routes.get("/api/scrape", (req: Request, res: Response) => startScrapping(req, res));

export default routes;