import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { UNISON } from "./constants";
import { Intervals } from ".";

TestInit.diatonicInterval();

const vars: string[] = [
  "ELEVENTH",
  "FIFTEENTH",
  "FIFTH",
  "FOURTEENTH",
  "FOURTH",
  "NINTH",
  "OCTAVE",
  "SECOND",
  "SEVENTH",
  "SIXTH",
  "TENTH",
  "THIRD",
  "THIRTEENTH",
  "TWELFTH",
  "UNISON",
];
const functions: string[] = [
  // building
  Intervals.fromInt.name,

  // modifiers
  Intervals.abs.name,
  Intervals.add.name,
  Intervals.neg.name,
  Intervals.simplify.name,
  Intervals.sub.name,

  // isMainInterval
  Intervals.isMainInterval.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Intervals,
    modules: [
      "building",
      "modifiers/abs",
      "modifiers/add",
      "modifiers/neg",
      "modifiers/simplify",
      "modifiers/sub",
      "isMainInterval",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );

it("should be same ref", () => {
  expect(UNISON).toBe(Intervals.UNISON);
} );
