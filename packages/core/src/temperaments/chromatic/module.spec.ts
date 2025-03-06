import { expectExportModulesAsync } from "tests/modules";
import { Temperaments as TE } from ".";

const vars: string[] = [
  // Constants
  "ET12",
  "LIMIT_5_SYMMETRIC_N1",
  "LIMIT_5_SYMMETRIC_N2",
  "PYTHAGOREAN",
];
const functions: string[] = [
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
