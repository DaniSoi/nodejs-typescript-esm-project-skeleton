import { createTerminus, HealthCheck } from "@godaddy/terminus"

import { IncomingMessage, Server, ServerResponse } from "http"
import { Logger } from "./types.js"

class GracefulServer {
  private readonly server: Server<typeof IncomingMessage, typeof ServerResponse>
  private logger: Logger
  private readonly options: GracefulServerOptions

  constructor(
    server: Server<typeof IncomingMessage, typeof ServerResponse>,
    logger: Logger = console,
    options: GracefulServerOptions = {},
  ) {
    this.server = server
    this.logger = logger
    this.options = options
  }

  init(): Server<typeof IncomingMessage, typeof ServerResponse> {
    const {
      livenessHandler = (): Promise<void> => Promise.resolve(),
      readinessHandler = (): Promise<void> => Promise.resolve(),
      beforeShutdown = async (): Promise<void> => {
        this.logger.info("Server is shutting down...")
      },
      onShutdown = async (): Promise<void> => {
        this.logger.info("Server shut down successfully")
      },
      onSignal = async (): Promise<void> => {
        this.logger.info("Received signal to shut down")
      },
      signals = ["SIGTERM", "SIGINT"],
    } = this.options

    return createTerminus(this.server, {
      signals,
      healthChecks: {
        "/health/liveness": livenessHandler,
        "/health/readiness": readinessHandler,
      },
      beforeShutdown,
      onShutdown,
      onSignal,
      logger: (msg, err): void => {
        this.logger.error(err, msg)
      },
    })
  }
}

interface GracefulServerOptions {
  livenessHandler?: HealthCheck
  readinessHandler?: HealthCheck
  beforeShutdown?: () => Promise<void>
  onShutdown?: () => Promise<void>
  onSignal?: () => Promise<void>
  signals?: string[]
}

export { GracefulServer, GracefulServerOptions }
