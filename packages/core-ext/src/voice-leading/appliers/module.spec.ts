import { expectExportModulesAsync } from "../../../../core/tests/modules";
import { Appliers } from ".";

const vars: string[] = [
  "processors",
];
const functions: string[] = [
  Appliers.applyCombination.name,
  Appliers.applyCombinations.name,
  Appliers.applyCombinationsWithMeta.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Appliers,
    modules: [
      "./combination-appliers",
      "./processors",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
