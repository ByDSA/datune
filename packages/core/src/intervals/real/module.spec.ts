import { TestInit } from "tests";
import { expectExportModulesAsync } from "tests/modules";
import { Intervals } from ".";

TestInit.realInterval();

const vars: string[] = [
  "CENT",
  "ET12_M2",
  "ET12_M3",
  "ET12_M6",
  "ET12_M7",
  "ET12_P4",
  "ET12_P5",
  "ET12_QUARTER_TONE",
  "ET12_SEMITONE",
  "ET12_TRITONE",
  "ET12_m2",
  "ET12_m3",
  "ET12_m6",
  "ET12_m7",
  "J_GREATER_SEPTIMAL_TRITONE",
  "J_LESSER_SEPTIMAL_TRITONE",
  "J_M3",
  "J_M6",
  "J_M7",
  "J_MAJOR_TONE",
  "J_MINOR_TONE",
  "J_P4",
  "J_P5",
  "J_QUARTER_TONE",
  "J_a2",
  "J_a3",
  "J_a4",
  "J_a4_EXT",
  "J_a5",
  "J_a6",
  "J_a7",
  "J_d3",
  "J_d5",
  "J_d5_EXT",
  "J_d7",
  "J_m2",
  "J_m3",
  "J_m6",
  "J_m7_GREATER",
  "J_m7_SMALL",
  "OCTAVE",
  "PT_COMMA",
  "PT_M2",
  "PT_M3",
  "PT_M6",
  "PT_M7",
  "PT_P4",
  "PT_P5",
  "PT_TRITONE",
  "PT_a1",
  "PT_a2",
  "PT_a3",
  "PT_a4",
  "PT_a5",
  "PT_a6",
  "PT_a7",
  "PT_d2",
  "PT_d3",
  "PT_d4",
  "PT_d5",
  "PT_d6",
  "PT_d7",
  "PT_d8",
  "PT_m2",
  "PT_m3",
  "PT_m6",
  "PT_m7",
  "UNISON",
];
const functions: string[] = [
  // building
  Intervals.fromCents.name,
  Intervals.from.name,

  // independent modifiers
  Intervals.add.name,
  Intervals.sub.name,

  // modifiers
  Intervals.shiftOctaves.name,
  Intervals.mult.name,
  Intervals.neg.name,
];

it("module should export functions and vars", async () => {
  await expectExportModulesAsync( {
    expected: {
      functions,
      vars,
    },
    barrel: Intervals,
    modules: [
      "building",
      "modifiers/independentModifiers",
      "modifiers/shiftOctaves",
      "modifiers/mult",
      "modifiers/neg",
      "constants",
    ],
    // eslint-disable-next-line no-undef
    dirname: __dirname,
  } );
} );
