module.exports = {
  moduleDirectories: [
    "node_modules",
    "src",
  ],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@time/(.*)$": "<rootDir>/src/time/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
};
