import supertest, { SuperAgentTest } from "supertest"

import { createApp } from "../../../src/app.js"
import { config } from "../../../src/config/index.js"

/*
    Axios mock example with ES modules in TypeScript:

    // mock the module before it is imported with jest.unstable_mockModule
    // instead of jest.mock because of ES modules
    jest.unstable_mockModule("axios", () => {
      // original module can be imported with jest.requireActual to use any
      // of its original functionality that is not mocked. Note that the type
      // allows to access the original module's properties with TypeScript
      const originalModule = jest.requireActual<typeof import("axios")>("axios")

      return {
        default: {
          get: jest.fn(),
        },
        isAxiosError: originalModule.isAxiosError,
      }
    })

    // after the module is mocked, import it
    const { default: axios } = await import("axios")

    // after importing the mocked module, import the module under
    // test that imports the mocked module directly or indirectly
    const { createApp } = await import("../../../src/app.js")

    // get the mocked module for further usage in tests
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
