export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.(m)?js$": "$1",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(m)?ts$",
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.mts",
    "!src/**/*.d.ts",
    "!src/**/*.d.mts",
  ],
}
