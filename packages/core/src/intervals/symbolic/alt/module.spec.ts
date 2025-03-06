import { expectExportModulesAsync } from "tests/modules";
import { Intervals } from ".";

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
  "a1",
  "a10",
  "a11",
  "a12",
  "a13",
  "a14",
  "a15",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "d1",
  "d10",
  "d11",
  "d12",
  "d13",
  "d14",
  "d15",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "d8",
  "d9",
  "da1",
  "da10",
  "da11",
  "da12",
  "da13",
  "da14",
  "da15",
  "da2",
  "da3",
  "da4",
  "da5",
  "da6",
  "da7",
  "da9",
  "dd10",
  "dd11",
  "dd12",
  "dd13",
  "dd14",
  "dd15",
  "dd3",
  "dd4",
  "dd5",
  "dd6",
  "dd7",
  "dd8",
  "dd9",
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
  Intervals.fromIntervalQuality.name,
  Intervals.fromIntervals.name,

  // modifiers
  Intervals.serie.name,
  Intervals.abs.name,
  Intervals.add.name,
  Intervals.cyclic.name,
  Intervals.mult.name,
  Intervals.neg.name,
  Intervals.simplify.name,
  Intervals.sub.name,

  // conversions
  Intervals.toChromaticInterval.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Intervals,
    modules: [
      "quality/building",
      "quality/constants",
      "quality/conversions",
      "building/between",
      "building/betweenNext",
      "building/intervalQuality",
      "building/intervals",
      "constants",
      "modifiers/calcSerie",
      "modifiers/abs",
      "modifiers/add",
      "modifiers/cyclic",
      "modifiers/mult",
      "modifiers/neg",
      "modifiers/simplify",
      "modifiers/sub",
      "conversions",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
