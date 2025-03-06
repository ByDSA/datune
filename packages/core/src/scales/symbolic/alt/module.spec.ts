import { expectExportModulesAsync } from "tests/modules";
import { CHROMATIC_SCALES_VARNAMES } from "../chromatic/tests/varnames";
import { Scales as S } from ".";

const vars: string[] = [
  ...CHROMATIC_SCALES_VARNAMES,
  "CHROMATIC_BY_FIFTHS",
];
const functions: string[] = [
  // building
  S.fromDegrees.name,
  S.fromDiatonicAlts.name,
  S.generateByIntervals.name,
  S.fromIntraIntervals.name,
  S.fromRootIntervals.name,

  // modifiers
  S.getDegreeFuncs.name,
  S.calcIntraIntervals.name,
  S.mode.name,
  S.getModeIntraIntervals.name,
  S.modes.name,

  // conversions
  S.toChromatic.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: S,
    modules: [
      "building",
      "modifiers",
      "conversions",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
