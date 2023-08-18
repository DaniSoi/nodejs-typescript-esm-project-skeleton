import { NextFunction, Request, Response } from "express"

const httpErrorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(error) // Log the error for debugging purposes

  // Send Internal Server Error response
  res.status(500).json({
    error: "Internal Server Error",
  })
}

export default httpErrorHandlerMiddleware
