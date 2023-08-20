interface Config {
  app: {
    host: string
    baseUrl: string
    apiPathPrefix: string
    port: number
    env: string
  }
  logger: {
    path: string
    level: string
    maxFiles: number
  }
}

const config = {
  app: {
    host: process.env.APP_HOST || "localhost",
    baseUrl: process.env.API_BASE_URL || "http://localhost:8080",
    apiPathPrefix: process.env.API_PATH_PREFIX || "/api",
    port: Number.parseInt(process.env.PORT || "") || 8080,
    env: process.env.NODE_ENV || "development",
  },
  logger: {
    path: process.env.LOGGING_DIR || "logs",
    level: process.env.LOGGING_LEVEL || "info",
    maxFiles: Number.parseInt(process.env.LOGGING_MAX_FILES || "") || 5,
  },
} as const satisfies Config

export { config, Config }
