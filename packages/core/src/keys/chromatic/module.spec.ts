import { TestInit } from "tests";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { expectExportModulesAsync } from "tests/modules";
import { Keys } from ".";

TestInit.chromaticKey();

const vars: string[] = CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(v=>[v, v + "m"]).flat();
const functions: string[] = [
  // building
  Keys.from.name,

  // modifiers
  Keys.rootChord3.name,
  Keys.rootChord4.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Keys,
    modules: [
      "modifiers",
      "constants",
      "building/rootScale",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
