import { createApp } from "./app.js"
import { config } from "./config/index.js"

function main(): void {
  const app = createApp(config)
  const { port } = config.app
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
  })
}
main()
