import { expectExportModulesAsync } from "../../../core/tests/modules";
import { MidiPitches } from ".";

const CHAROMATIC_PITCHES12_SHARPS_VARNAMES = ["C", "CC", "D", "DD", "E", "F", "FF", "G", "GG", "A", "AA", "B"];
const vars: string[] = [
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(
    v=>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(o=>v + o),
  ).flat(),
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES.slice(0, 8).map(v=>v + 10), // C10-G10
  "MIN",
  "MAX",
];
const functions: string[] = [
  // building
  MidiPitches.from.name,
  MidiPitches.fromCode.name,
  MidiPitches.fromFrequency.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: MidiPitches,
    modules: [
      "constants",
      "building",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
