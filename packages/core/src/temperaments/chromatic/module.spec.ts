import { expectExportModulesAsync } from "tests/modules";
import { TestInit } from "tests";
import { Temperaments as TE } from ".";

TestInit.chromaticTemperament();

const vars: string[] = [
];
const functions: string[] = [
  // Constants
  "ET12",
  "LIMIT_5_SYMMETRIC_N1",
  "LIMIT_5_SYMMETRIC_N2",
  "PYTHAGOREAN",
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: TE,
    modules: [
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
