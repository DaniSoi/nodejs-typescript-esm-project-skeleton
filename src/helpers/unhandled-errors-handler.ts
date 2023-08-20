function getUnhandledErrorsHandler(logger = console): (error: any) => void {
  return (error: any): void => {
    logger.error(error)
  }
}

export { getUnhandledErrorsHandler }
