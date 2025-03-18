import { expectExportModulesAsync } from "tests/modules";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { Spns } from ".";

const vars: string[] = [
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(
    v=>["_S1", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(o=>v + o),
  ).flat(),
  "COMMON",
];
const functions: string[] = [
  // building
  Spns.fromPitchOctave.name,

  // modifiers
  Spns.add.name,
  Spns.sub.name,

  // conversions
  Spns.toChromatic.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Spns,
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
