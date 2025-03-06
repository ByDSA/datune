import { expectExportModulesAsync } from "tests/modules";
import * as Constants from "./constants";
import { Intervals as I } from ".";

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
  I.fromInt.name,

  // modifiers
  I.abs.name,
  I.add.name,
  I.neg.name,
  I.simplify.name,
  I.sub.name,

  // isMainInterval
  I.isMainInterval.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: I,
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
  expect(Constants.UNISON).toBe(I.UNISON);
} );
