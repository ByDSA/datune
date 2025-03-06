import { expectExportModulesAsync } from "tests/modules";
import { Degrees as D } from ".";

const vars: string[] = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "aI",
  "aII",
  "aIII",
  "aIV",
  "aV",
  "aVI",
  "aVII",
  "bII",
  "bIII",
  "bV",
  "bVI",
  "bVII",
];
const functions: string[] = [
  // Building
  D.from.name,
  D.fromDegrees.name,

  // Modifiers
  D.add.name,
  D.sub.name,

  // Conversions
  D.toChromaticDegree.name,
  D.toInterval.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: D,
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
