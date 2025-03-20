import { expectExportModulesAsync } from "../../../../core/tests/modules";
import { Combiners } from ".";

const vars: string[] = [
  "processors",
];
const functions: string[] = [
  Combiners.combineStepGroups.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Combiners,
    modules: [
      "./combine-groups",
      "./processors",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
