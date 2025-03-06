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
  "ALL",
];
const functions: string[] = [
  // Building
  D.fromInt.name,

  // Conversions
  D.toChromatic.name,
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
      "constants",
      "conversions",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );

it("sets", () => {
  expect(D.ALL).toHaveLength(7);
} );
