import { expectExportModulesAsync } from "tests/modules";
import { Degrees } from ".";

const vars: string[] = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "bII",
  "bIII",
  "bV",
  "bVI",
  "bVII",
];
const functions: string[] = [
  // Building
  Degrees.fromInt.name,

  // Modifiers
  Degrees.add.name,
  Degrees.sub.name,

  // Conversions
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
      "constants",
      "conversions",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
