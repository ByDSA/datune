import { expectExportModulesAsync } from "tests/modules";
import { SPNs } from ".";

const vars: string[] = [
];
const functions: string[] = [
  // calcs
  SPNs.overtones.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: SPNs,
    modules: [
      "calcs",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
