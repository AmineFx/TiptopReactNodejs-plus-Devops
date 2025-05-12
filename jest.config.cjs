module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|webp|svg|jpg|jpeg|ttf|woff|woff2)$": "<rootDir>/src/__mocks__/fileMock.js"
  }
};
