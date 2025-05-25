import { expectExportModulesAsync } from "tests/modules";
import { PitchSets as PS } from ".";

const vars: string[] = [
  "C5",
  "CC5",
  "D5",
  "Eb5",
  "E5",
  "F5",
  "Gb5",
  "G5",
  "GG5",
  "A5",
  "Bb5",
  "B5",
  "EMPTY",
];
const functions: string[] = [
  // building
  PS.from.name,
  PS.fromPitches.name,

  // modifiers
  PS.add.name,
  PS.remove.name,
  PS.shift.name,
  PS.shiftDown.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: PS,
    modules: [
      "building",
      "modifiers",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
