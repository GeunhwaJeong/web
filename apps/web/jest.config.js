const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>', '<rootDir>/../../node_modules'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^apps/web/(.*)$': '<rootDir>/$1',
    '^libs/(.*)$': '<rootDir>/../../libs/$1',
    '^base-ui$': '<rootDir>/../../libs/base-ui/index.ts',
    '.*/libs/base-ui$': '<rootDir>/../../libs/base-ui/index.ts',
    '^ox/BlockOverrides$': '<rootDir>/__mocks__/ox/BlockOverrides.js',
    // moduleDirectories makes the root node_modules win over nested package
    // copies; jest's own dependency chain needs the CJS ansi-styles that
    // pretty-format pins, not the ESM v6 hoisted to the workspace root.
    '^ansi-styles$': '<rootDir>/../../node_modules/pretty-format/node_modules/ansi-styles/index.js',
  },
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
};

module.exports = createJestConfig(customJestConfig);
