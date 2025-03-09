import { expectExportModulesAsync } from "tests/modules";
import { CHROMATIC_SCALES_VARNAMES } from "./tests/varnames";
import { Scales as S } from ".";

const vars: string[] = [
  ...CHROMATIC_SCALES_VARNAMES,
  "MAJOR_SCALE_DEGREES",
];
const functions: string[] = [
  // building
  S.generateByIntervals.name,
  S.fromIntraIntervals.name,
  S.fromRootIntervals.name,
  S.fromAltScale.name,

  // modifiers
  S.getModeIntraIntervals.name,
  S.mode.name,
  S.modes.name,
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
      "constants",
      "constants/majorScaleDegrees",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );

it("sets", () => {
  expect(S.DIATONIC_SCALES.size).toBeGreaterThan(0);
  expect(S.COMMON.size).toBeGreaterThan(0);
} );
