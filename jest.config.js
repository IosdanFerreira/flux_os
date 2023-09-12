/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable linebreak-style */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/tests/PrismaMockProvider.ts"],
};
