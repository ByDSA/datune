import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { Degrees } from ".";

TestInit.diatonicAltDegree();

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
  Degrees.from.name,
  Degrees.fromDegrees.name,

  // Modifiers
  Degrees.add.name,
  Degrees.sub.name,

  // Conversions
  Degrees.toChromaticDegree.name,
  Degrees.toInterval.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Degrees,
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
