import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { Scales as S } from ".";

TestInit.realScale();

const vars: string[] = [
  "ET12_MAJOR",
  "PT_MAJOR",
];
const functions: string[] = [
  // building
  S.fromIntervals.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: S,
    modules: [
      "constants",
      "building",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
