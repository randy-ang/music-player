module.exports = {
  collectCoverageFrom: [
    '<rootDir>/**/*.js',
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/coverage/**',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/dist/**',
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
    },
  },
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-|@)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
};
