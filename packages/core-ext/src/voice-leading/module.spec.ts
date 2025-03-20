import { expectExportModulesAsync } from "../../../core/tests/modules";
import { VoiceLeadings } from ".";

const vars: string[] = [
  "Appliers",
  "Steps",
  "Combiners",
  "StepsGen",
];
const functions: string[] = [
  VoiceLeadings.generate.name,
  VoiceLeadings.handleResult.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: VoiceLeadings,
    modules: [
      "./steps",
      "./appliers",
      "./combiners",
      "./generators",
      "./forward/VoiceLeading",
      "./forward/Result",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
