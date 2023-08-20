import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

import { Config } from "./config/index.js"
import { apiRouter } from "./api/index.js"
import { httpErrorHandlerMiddleware } from "./middleware/index.js"

export const createApp = (config: Config): express.Application => {
  const app = express()

  app.use(cors())
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.use(helmet())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    }),
  )

  if (config.app.env !== "test") {
    app.use(morgan("dev"))
  }

  // API Routes
  app.use(config.app.apiPathPrefix, apiRouter)

  // Error Middleware
  app.use(httpErrorHandlerMiddleware)

  return app
}
