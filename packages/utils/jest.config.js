module.exports = {
  moduleDirectories: [
    "node_modules",
    "src",
  ],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": require.resolve("babel-jest"),
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/?!(@datune)"],
  globals: {
    "ts-jest": {
      isolatedModules: false,
    },
  },
  moduleNameMapper: {
    "^@time/(.*)$": "<rootDir>/src/time/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
};
