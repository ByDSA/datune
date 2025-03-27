import { expectExportModulesAsync } from "../../../core/tests/modules";
import { MidiTimelines } from ".";

const vars: string[] = [

];
const functions: string[] = [
  // node
  MidiTimelines.nodeFrom.name,

  // note
  MidiTimelines.noteFrom.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: MidiTimelines,
    modules: [
      "node/building",
      "note/building/from",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
