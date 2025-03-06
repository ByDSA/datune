import { expectExportModulesAsync } from "tests/modules";
import * as Constants from "./constants";
import { Intervals as I } from ".";

const vars: string[] = [
  "M10",
  "M13",
  "M14",
  "M2",
  "M3",
  "M6",
  "M7",
  "M9",
  "P1",
  "P11",
  "P12",
  "P15",
  "P4",
  "P5",
  "P8",
  "TRITONE",
  "d12",
  "d5",
  "m10",
  "m13",
  "m14",
  "m2",
  "m3",
  "m6",
  "m7",
  "m9",
];
const functions: string[] = [
  // building
  I.between.name,
  I.betweenNext.name,
  I.betweenSPN.name,

  // modifiers
  I.add.name,
  I.sub.name,
  I.neg.name,
  I.simplify.name,
  I.octaves.name,
  I.abs.name,
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
      "constants",
      "modifiers",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );

it("should be same ref", () => {
  expect(Constants.P1).toBe(I.P1);
} );
