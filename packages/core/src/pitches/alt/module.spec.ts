import { expectExportModulesAsync } from "tests/modules";
import { ALT_PITCHES_4ALTS_VARNAMES } from "./tests/varnames";
import { Pitches as P } from ".";

const vars: string[] = [
  ...ALT_PITCHES_4ALTS_VARNAMES,
  "ALL",
];
const functions: string[] = [
  // building
  P.fromChromatic.name,
  P.fromChromaticAndDiatonic.name,
  P.fromDPitchAlts.name,
  P.fromChromaticInPitchArray.name,

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
      "building/chromaticAndDiatonic",
      "building/chromaticInPitchArray",
      "building/diatonicAlts",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
