import supertest, { SuperAgentTest } from "supertest"

import { createApp } from "../../../src/app.js"
import { config } from "../../../src/config/index.js"

/*
    Axios mock example with ES modules in TypeScript:

    jest.unstable_mockModule("axios", () => {
      const originalModule = jest.requireActual<typeof import("axios")>("axios")
      return {
        default: {
          get: jest.fn(),
        },
        isAxiosError: originalModule.isAxiosError,
      }
    })

    const { default: axios } = await import("axios")
    const { createApp } = await import("../../../src/app.js")

    const mockedAxios = jest.mocked(axios)

    -------------------
    Usage example:

    it("should return 200 OK", async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          example: "example",
        },
      })

      ...
    })

    -------------------
    Reset mock:

    afterEach(() => {
      jest.clearAllMocks()
    })
 */

const initAgent = async (): Promise<SuperAgentTest> => {
  // instead of importing config, we can mock it
  const app = createApp(config)
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
