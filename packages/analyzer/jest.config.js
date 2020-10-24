module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': require.resolve('babel-jest')
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['<rootDir>/node_modules/?!(@datune)']
  }