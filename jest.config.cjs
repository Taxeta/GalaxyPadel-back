/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "**/src/**/*.ts",
    "!**/src/index.ts",
    "!**/src/**/connectToDatabase.ts",
    "!**/src/**/startServer.ts",
    "!**/src/server/index.ts",
    "!**/src/middlewares/CustomError.ts",
  ],
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
};
