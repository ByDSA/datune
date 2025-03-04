import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { TimeSignatures as TS } from ".";

TestInit.rhythmPattern();

const vars: string[] = [
  "S3_4",
  "S4_4",
];
const functions: string[] = [
  // building
  TS.fromAdditive.name,
  TS.fromFrac.name,
  TS.fromPattern.name,
  TS.fromRhythmArray.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: TS,
    modules: [
      "constants",
      "building",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
