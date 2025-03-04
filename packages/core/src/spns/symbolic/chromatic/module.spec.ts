import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { SPNs } from ".";

TestInit.chromaticSPN();

const vars: string[] = [
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(
    v=>["_S1", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(o=>v + o),
  ).flat(),
  "ALL",
];
const functions: string[] = [
  // building/pitch-octave
  SPNs.fromPitchOctave.name,

  // modifiers
  SPNs.add.name,
  SPNs.sub.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: SPNs,
    modules: [
      "modifiers",
      "constants",
      "building/pitch-octave",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
