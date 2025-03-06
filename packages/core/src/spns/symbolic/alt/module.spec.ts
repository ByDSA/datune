import { expectExportModulesAsync } from "tests/modules";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { SPNs } from ".";

const vars: string[] = [
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(
    v=>["_S1", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(o=>v + o),
  ).flat(),
  "COMMON",
];
const functions: string[] = [
  // building
  SPNs.fromPitchOctave.name,

  // modifiers
  SPNs.add.name,
  SPNs.sub.name,

  // conversions
  SPNs.toChromatic.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: SPNs,
    modules: [
      "building",
      "modifiers",
      "constants",
      "conversions",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
