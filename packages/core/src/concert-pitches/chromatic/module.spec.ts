import { expectExportModulesAsync } from "tests/modules";
import { ConcertPitches } from ".";

const vars: string[] = [
  "A432",
  "A440",
  "A444",
];
const functions: string[] = [
  // Building
  ConcertPitches.fromFrequencySPN.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: ConcertPitches,
    modules: [
      "constants",
      "building/frequencySPN",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
