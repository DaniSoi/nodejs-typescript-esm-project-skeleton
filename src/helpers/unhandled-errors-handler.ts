import { Logger } from "./types.js"

function createUnhandledErrorHandler(
  logger: Logger = console,
): (error: any) => void {
  return (error: any): void => {
    logger.error(error)
  }
}

export { createUnhandledErrorHandler }
