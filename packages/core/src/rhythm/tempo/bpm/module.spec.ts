import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { BPMs } from ".";

TestInit.bpm();

const vars: string[] = [
  "QUARTER_120",
];
const functions: string[] = [
  // building
  BPMs.from.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: BPMs,
    modules: [
      "building",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
