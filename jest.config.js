const { defaults } = require('jest-config');

module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: null,
  testRegex: '/__tests__/.*\\.test\\.(js|ts)$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  clearMocks: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: false,
    },
  },
  collectCoverageFrom: [
    '*/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  modulePaths: ['<rootDir>'],
};
