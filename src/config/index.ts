const config = {
  app: {
    host: process.env.APP_HOST,
    baseUrl: process.env.API_BASE_URL,
    apiPathPrefix: process.env.API_PATH_PREFIX || "/api",
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV,
  },
  logger: {
    path: process.env.LOGGING_DIR || "logs",
    level: process.env.LOGGING_LEVEL || "info",
    maxFiles: process.env.LOGGING_MAX_FILES || 5,
  },
} as const

export default config
