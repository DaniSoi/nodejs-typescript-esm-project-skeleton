import http from "http"
import { createApp } from "./app.js"
import { config } from "./config/index.js"
import {
  GracefulServer,
  createUnhandledErrorHandler,
  Logger,
} from "./helpers/index.js"

const logger: Logger = console

function main(): void {
  const { port } = config.app
  const app = createApp(config)
  const server = http.createServer(app)

  const gracefulServer = new GracefulServer(server, logger, {}).init()

  gracefulServer.listen(port, () => {
    logger.info(`Server listening on port: ${port}`)
  })
}

process
  .on("unhandledRejection", createUnhandledErrorHandler(logger))
  .on("uncaughtException", createUnhandledErrorHandler(logger))

main()
