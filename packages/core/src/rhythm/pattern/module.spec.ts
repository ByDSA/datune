import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { RhythmPatterns as RP } from ".";

TestInit.rhythmPattern();

const vars: string[] = [
  "CINQUILLO",
  "QUARTER",
  "QUARTER_THIRD",
  "RUMBA",
  "THIRD",
  "TRESILLO",
];
const functions: string[] = [
  // building
  RP.from.name,
  RP.fromArray.name,

  // modifiers
  RP.reverse.name,
  RP.rotate.name,

  RP.calculateEuclideanRhythm.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: RP,
    modules: [
      "building",
      "constants",
      "modifiers",
      "euclidean",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
