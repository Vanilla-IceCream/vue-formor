module.exports = {
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src$1',
  },
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
