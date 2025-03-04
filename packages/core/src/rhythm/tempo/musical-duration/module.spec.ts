import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { MusicalDurations as MD } from ".";

TestInit.bpm();

const vars: string[] = [
  "DOUBLE",
  "EIGHTH",
  "HALF",
  "LONGA",
  "MAXIMA",
  "MIN",
  "QUARTER",
  "SIXTEENTH",
  "SIXTYFOURTH",
  "THIRTYSECOND",
  "WHOLE",
  "ZERO",
];
const functions: string[] = [
  // building
  MD.from.name,
  MD.fromMillisAndBPM.name,

  // modifiers
  MD.dotted.name,
  MD.triplet.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: MD,
    modules: [
      "modifiers",
      "building/from",
      "building/fromMillisAndBPM",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
