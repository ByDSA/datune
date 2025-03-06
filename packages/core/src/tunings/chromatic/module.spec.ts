import { expectExportModulesAsync } from "tests/modules";
import { Tunings as TU } from ".";

const vars: string[] = [
  "EQUAL_440",
  "LIMIT_5_SYMMETRIC_N1_440",
];
const functions: string[] = [
  // building
  TU.from.name,

  // calcs
  TU.calcFrequency.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: TU,
    modules: [
      "building",
      "calcs",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
