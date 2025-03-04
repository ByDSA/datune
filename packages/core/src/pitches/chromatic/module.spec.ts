import { expectExportModulesAsync } from "tests/modules";
import { DIATONIC_PITCHES_VARNAMES } from "pitches/diatonic/tests/varnames";
import { CHAROMATIC_PITCHES12_SHARPS_VARNAMES } from "./tests/varnames";
import { Pitches as P } from ".";

const vars: string[] = [
  ...CHAROMATIC_PITCHES12_SHARPS_VARNAMES,
  ...DIATONIC_PITCHES_VARNAMES.map(v=>v + "b"),
  "EE",
  "BB",
  "ALL",
  "NUMBER",
];
const functions: string[] = [
  // building
  P.fromInt.name,

  // modifiers
  P.add.name,
  P.rootIntervals.name,
  P.sub.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: P,
    modules: [
      "building",
      "constants",
      "modifiers",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
