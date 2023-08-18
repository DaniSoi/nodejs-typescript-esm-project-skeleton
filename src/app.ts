import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

import config from "./config/index.js"
import routes from "./routes/index.js"
import { httpErrorHandlerMiddleware } from "./middleware/index.js"

export const createApp = (): express.Application => {
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
  app.use(config.app.apiPathPrefix, routes)

  // Error Middleware
  app.use(httpErrorHandlerMiddleware)

  return app
}
