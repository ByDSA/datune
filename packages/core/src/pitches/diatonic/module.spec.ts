import { expectExportModulesAsync } from "tests/modules";
import { DIATONIC_PITCHES_VARNAMES } from "./tests/varnames";
import { Pitches as P } from ".";

const vars: string[] = [
  ...DIATONIC_PITCHES_VARNAMES,
  "ALL",
  "NUMBER",
];
const functions: string[] = [
  // building
  P.fromInt.name,

  // modifiers
  P.add.name,
  P.sub.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: P,
    modules: [
      "constants",
      "building",
      "modifiers",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
