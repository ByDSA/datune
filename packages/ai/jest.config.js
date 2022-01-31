module.exports = {
  moduleDirectories: [
    "node_modules",
    "src"
  ],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': require.resolve('babel-jest')
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/?!(@datune)'],
  globals: {
    'ts-jest': {
      isolatedModules: false,
    },
  },
  moduleNameMapper: {
    "^tests($|/.*)$": "<rootDir>/tests/$1",
    "^chords($|/.*)$": "<rootDir>/../core/dist/chords/$1",
    "^concert-pitches($|/.*)$": "<rootDir>/../core/dist/concert-pitches/$1",
    "^degrees($|/.*)$": "<rootDir>/../core/dist/degrees/$1",
    "^functions($|/.*)$": "<rootDir>/../core/dist/functions/$1",
    "^intervals($|/.*)$": "<rootDir>/../core/dist/intervals/$1",
    "^keys($|/.*)$": "<rootDir>/../core/dist/keys/$1",
    "^pitches($|/.*)$": "<rootDir>/../core/dist/pitches/$1",
    "^scales($|/.*)$": "<rootDir>/../core/dist/scales/$1",
    "^spns($|/.*)$": "<rootDir>/../core/dist/spns/$1",
    "^temperaments($|/.*)$": "<rootDir>/../core/dist/temperaments/$1",
    "^tunings($|/.*)$": "<rootDir>/../core/dist/tunings/$1",
    "^voicings($|/.*)$": "<rootDir>/../core/dist/voicings/$1",
  },
}