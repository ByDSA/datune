import { expectExportModulesAsync } from "../../../core/tests/modules";
import { MidiSequences } from ".";

const vars: string[] = [

];
const functions: string[] = [
  // node
  MidiSequences.nodeFrom.name,

  // note
  MidiSequences.noteFrom.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: MidiSequences,
    modules: [
      "node/building",
      "note/building/from",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
