import { NextFunction, Request, Response } from "express"

export class HomeController {
  static getAppInfo = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json({
        status: "success",
      })
    } catch (error) {
      next(error)
    }
  }
}
