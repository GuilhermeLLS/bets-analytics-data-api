import express, { Request, Response } from "express"
import SheetsController from "@controllers/index"

export const router = express.Router({
    strict: true
});

const controller = new SheetsController

router.get('/', async (req: Request, res: Response) => {
    await controller.read(req, res)
});
