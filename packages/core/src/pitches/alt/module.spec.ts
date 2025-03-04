import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { ALT_PITCHES_4ALTS_VARNAMES } from "./tests/varnames";
import { Pitches as P } from ".";

TestInit.diatonicAlt();

const vars: string[] = [
  ...ALT_PITCHES_4ALTS_VARNAMES,
  "ALL",
];
const functions: string[] = [
  // building/chromatic
  P.fromChromatic.name,

  // building/diatonicAlts
  P.fromDiatonicAlts.name,

  // modifiers
  P.add.name,
  P.rootIntervals.name,
  P.sub.name,

  // conversions
  P.toChromatic.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: P,
    modules: [
      "modifiers",
      "conversions",
      "constants",
      "building/chromatic",
      "building/diatonicAlts",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
