import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { P1 } from "./constants";
import { Intervals } from ".";

TestInit.diatonicAltInterval();

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
  Intervals.between.name,
  Intervals.betweenNext.name,
  Intervals.betweenSPN.name,

  // modifiers
  Intervals.add.name,
  Intervals.sub.name,
  Intervals.neg.name,
  Intervals.simplify.name,
  Intervals.octaves.name,
  Intervals.abs.name,
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
      "constants",
      "modifiers",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );

it("should be same ref", () => {
  expect(P1).toBe(Intervals.P1);
} );
