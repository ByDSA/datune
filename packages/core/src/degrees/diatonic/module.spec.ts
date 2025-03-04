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
  "ALL",
];
const functions: string[] = [
  // Building
  Degrees.fromInt.name,

  // Conversions
  Degrees.toChromatic.name,
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
      "constants",
      "conversions",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );

it("sets", () => {
  expect(Degrees.ALL).toHaveLength(7);
} );
