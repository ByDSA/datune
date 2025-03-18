import { expectExportModulesAsync } from "tests/modules";
import { Spns } from ".";

const vars: string[] = [
];
const functions: string[] = [
  // calcs
  Spns.overtones.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Spns,
    modules: [
      "calcs",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
