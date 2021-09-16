module.exports = {
  moduleNameMapper: {
    '~(.*)': '<rootDir>/src$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testURL: 'http://localhost/',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
  },
};
