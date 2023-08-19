import supertest, { SuperAgentTest } from "supertest"

import { createApp } from "../../src/app.js"
import config from "../../src/config/index.js"

const initAgent = async (): Promise<SuperAgentTest> => {
  const app = createApp()
  return supertest.agent(app)
}

let agent: SuperAgentTest

beforeAll(async () => {
  agent = await initAgent()
})

describe("GET /home/", () => {
  it("should return 200 OK", async () => {
    const response = await agent.get(`${config.app.apiPathPrefix}/home/`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: "success",
    })
  })
})
