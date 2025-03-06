import { expectExportModulesAsync } from "tests/modules";
import { Voicings as V } from ".";

const vars: string[] = [
  "ELEVENTH",
  "ELEVENTH_MAJ11",
  "ELEVENTH_MINOR",
  "ELEVENTH_MINOR_MAJ11",
  "ELEVENTH_a9",
  "ELEVENTH_b9",
  "MAJOR_OVER_M2",
  "MAJOR_OVER_P4",
  "MAJOR_OVER_a4",
  "MAJOR_OVER_a5",
  "MAJOR_OVER_d5",
  "MAJOR_OVER_m2",
  "MAJOR_OVER_m3",
  "MAJOR_OVER_m6",
  "MINOR_OVER_M2",
  "MINOR_OVER_M3",
  "MINOR_OVER_P4",
  "MINOR_OVER_a4",
  "MINOR_OVER_d5",
  "MINOR_OVER_m2",
  "MINOR_OVER_m7",
  "NINTH",
  "NINTH_ADD6",
  "NINTH_MAJ9",
  "NINTH_MAJ9_a11",
  "NINTH_MINOR",
  "NINTH_MINOR_MAJ9",
  "NINTH_SUS4",
  "NINTH_a11",
  "NINTH_a5",
  "NINTH_b5",
  "POWER_CHORD",
  "SEVENTH",
  "SEVENTH_ADD11",
  "SEVENTH_ADD13",
  "SEVENTH_MAJ7",
  "SEVENTH_MAJ7_b5",
  "SEVENTH_MINOR",
  "SEVENTH_MINOR_MAJ7",
  "SEVENTH_MINOR_a5",
  "SEVENTH_MINOR_b5",
  "SEVENTH_MINOR_b9",
  "SEVENTH_SUS4",
  "SEVENTH_SUS4_b9",
  "SEVENTH_a5",
  "SEVENTH_a9",
  "SEVENTH_b5",
  "SEVENTH_b9",
  "SIXTH",
  "SIXTH_ADD9",
  "SIXTH_MINOR",
  "SIXTH_MINOR_ADD9",
  "SIXTH_SUS4",
  "THIRTEENTH_MAJ13",
  "THIRTEENTH_MAJ13_a5",
  "THIRTEENTH_MAJ13_a5a9",
  "THIRTEENTH_MAJ13_a5b9",
  "THIRTEENTH_MAJ13_a9",
  "THIRTEENTH_MAJ13_b5",
  "THIRTEENTH_MAJ13_b5a9",
  "THIRTEENTH_MAJ13_b5b9",
  "THIRTEENTH_MAJ13_b9",
  "THIRTEENTH_MINOR",
  "THIRTEENTH_MINOR_MAJ13",
  "THIRTEENTH_SUS4",
  "THIRTEENTH_a5",
  "THIRTEENTH_a5a9",
  "THIRTEENTH_a5b9",
  "THIRTEENTH_a9",
  "THIRTEENTH_b5",
  "THIRTEENTH_b5a9",
  "THIRTEENTH_b5b9",
  "THIRTEENTH_b9",
  "TRIAD_AUGMENTED",
  "TRIAD_DIMINISHED",
  "TRIAD_MAJOR",
  "TRIAD_MINOR",
  "TRIAD_QUARTAL",
  "TRIAD_SUS2",
  "TRIAD_SUS4",

  // Intervals
  "M2",
  "M3",
  "M6",
  "M7",
  "P4",
  "d5",
  "m2",
  "m3",
  "m6",
  "m7",

  // sets
  "TRIADS_MAJOR_MINOR",
  "COMMON",
  "COMMON_NON_INVERSIONS",
  "COMMON_TRIADS",
];
const functions: string[] = [
  // building
  V.fromIntraIntervals.name,
  V.fromRootIntervals.name,
  V.fromVoicings.name,

  // modifiers
  V.inv.name,

  // conversions
  V.toChromaticInterval.name,
  V.toDiatonicInterval.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: V,
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

it("sets", () => {
  expect(V.COMMON.size).toBeGreaterThan(0);
  expect(V.COMMON_TRIADS.size).toBeGreaterThan(0);
  expect(V.TRIADS_MAJOR_MINOR.size).toBeGreaterThan(0);
  expect(V.COMMON_NON_INVERSIONS.size).toBe(55);
} );
