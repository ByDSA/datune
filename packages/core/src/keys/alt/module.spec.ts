import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { Keys } from ".";

TestInit.diatonicAltKey();

const vars: string[] = CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(v=>[v, v + "m"]).flat();
const functions: string[] = [
  // building
  Keys.from.name,

  // modifiers
  Keys.rootChord3.name,
  Keys.rootChord4.name,

  // conversions
  Keys.toChromatic.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Keys,
    modules: [
      "building",
      "conversions",
      "constants",
      "modifiers",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
