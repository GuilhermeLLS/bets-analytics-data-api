import { Request, Response } from "express"
import SheetsHandler from "@handlers/index"

export class SheetsController {
    public async read(req: Request, res: Response) {
        const sheetId = req.query["sid"]
        if (!sheetId) {
            return res.status(400).send("no sid param found")
        }
        const data = await SheetsHandler(sheetId as string)
        return res.json({ data })
    }
}
