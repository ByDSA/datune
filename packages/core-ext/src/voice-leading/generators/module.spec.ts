import { expectExportModulesAsync } from "../../../../core/tests/modules";
import { StepsGen } from ".";

const vars: string[] = [
  "processors",
];
const functions: string[] = [
  StepsGen.multiple.name,
  StepsGen.toKeyResolution.name,
  StepsGen.toNear.name,
  StepsGen.toVoicingResolution.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: StepsGen,
    modules: [
      "./near/generate",
      "./voicing-resolution/generate",
      "./key-resolution/generate",
      "./multiple/generate",
      "./processors",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
