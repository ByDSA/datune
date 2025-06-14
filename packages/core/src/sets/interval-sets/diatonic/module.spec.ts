import { expectExportModulesAsync } from "tests/modules";
import { IntervalSets as IS } from ".";

const vars: string[] = [
  // Constants
  "EMPTY",
  "INTERVAL_SECOND",
  "INTERVAL_THIRD",
  "INTERVAL_FOURTH",
  "INTERVAL_FIFTH",
  "INTERVAL_SIXTH",
  "INTERVAL_SEVENTH",
  "TRIAD",
  "QUARTAL",
  "SIXTH",
  "SIXTH_ADD9",
  "SEVENTH",
  "SEVENTH_ADD11",
  "SEVENTH_ADD13",
  "NINTH",
  "NINTH_SUS4",
  "NINTH_ADD6",
  "ELEVENTH",
  "THIRTEENTH",
  "THIRTEENTH_SUS4",
  "SUS4",
  "SEVENTH_SUS4",
  "TRIAD_OVER_SECOND",
  "TRIAD_OVER_THIRD",
  "TRIAD_OVER_FOURTH",
  "TRIAD_OVER_FIFTH",
  "TRIAD_OVER_SIXTH",
  "TRIAD_OVER_SEVENTH",
];
const functions: string[] = [
  // Building
  IS.fromRootIntervalsMagnitude.name,
  IS.fromRootIntervals.name,

  // Modifiers
  IS.inv.name,
  IS.add.name,
  IS.remove.name,
  IS.shift.name,
  IS.shiftDown.name,
  IS.bass.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: IS,
    modules: ["building", "modifiers", "constants"],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
