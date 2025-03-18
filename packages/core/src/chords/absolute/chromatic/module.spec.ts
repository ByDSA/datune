import { expectExportModulesAsync } from "tests/modules";
import { Chords } from ".";

const vars: string[] = [
];
const functions: string[] = [
  // Building
  Chords.fromRootVoicing.name,
  Chords.fromSpns.name,
  // Calca
  Chords.voicingOf.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Chords,
    modules: ["calcs", "building"],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
