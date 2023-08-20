import { createApp } from "./app.js"
import { config } from "./config/index.js"
import { getUnhandledErrorsHandler } from "./helpers/unhandled-errors-handler.js"

const logger = console

function main(): void {
  const app = createApp(config)
  const { port } = config.app
  app.listen(port, () => {
    logger.info(`Server listening on port: ${port}`)
  })
}

process
  .on("unhandledRejection", getUnhandledErrorsHandler(logger))
  .on("uncaughtException", getUnhandledErrorsHandler(logger))

main()
