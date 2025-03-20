import { expectExportModulesAsync } from "../../../core/tests/modules";
import { MidiFiles } from ".";

const vars: string[] = [

];
const functions: string[] = [
  // load/save
  MidiFiles.load.name,
  MidiFiles.save.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: MidiFiles,
    modules: [
      "midi-file/load",
      "midi-file/save",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
