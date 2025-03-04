import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { PitchSets as PS } from ".";

TestInit.chromaticPitchSet();

const vars: string[] = [
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(n=>n + "5"),
];
const functions: string[] = [
  // building
  PS.from.name,

  // modifiers
  PS.add.name,
  PS.sub.name,
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
