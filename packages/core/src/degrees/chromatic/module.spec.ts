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
  "bII",
  "bIII",
  "bV",
  "bVI",
  "bVII",
];
const functions: string[] = [
  // Building
  D.fromInt.name,
  D.fromAltDegree.name,

  // Modifiers
  D.add.name,
  D.sub.name,
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
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
