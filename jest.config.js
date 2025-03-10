export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy"
    }
  };
  