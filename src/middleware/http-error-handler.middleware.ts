import { NextFunction, Request, Response } from "express"
import httpErrors, { isHttpError, HttpError } from "http-errors"

const httpErrorHandlerMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const httpError: HttpError = isHttpError(error)
    ? error
    : new httpErrors.InternalServerError()

  if (httpError.statusCode >= 500) {
    console.error(error)
  }

  res.status(httpError.statusCode).json({
    message: httpError.message,
  })
}

export default httpErrorHandlerMiddleware
