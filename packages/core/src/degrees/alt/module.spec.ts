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
  "aaI",
  "aaII",
  "aaIII",
  "aaIV",
  "aaV",
  "aaVI",
  "bII",
  "bIII",
  "bIV",
  "bV",
  "bVI",
  "bVII",
  "bbII",
  "bbIII",
  "bbIV",
  "bbV",
  "bbVI",
  "bbVII",
  "bbbIII",
  "bbbVI",
  "bbbVII",
];
const functions: string[] = [
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: D,
    modules: [
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
