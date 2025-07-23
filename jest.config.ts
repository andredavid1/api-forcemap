import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  maxWorkers: "50%",
  passWithNoTests: true,
};

export default config;
