import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "pitches/chromatic/tests/varnames";
import { expectExportModulesAsync } from "tests/modules";
import { Keys as K } from ".";

const vars: string[] = CHAROMATIC_PITCHES12_SHARPS_VARNAMES.map(v=>[v, v + "m"]).flat();
const functions: string[] = [
  // building
  K.from.name,

  // modifiers
  K.rootChord3.name,
  K.rootChord4.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: K,
    modules: [
      "modifiers",
      "constants",
      "building/rootScale",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
