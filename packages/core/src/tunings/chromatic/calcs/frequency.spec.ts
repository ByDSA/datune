import { A4, AA4, C0, E4, GG4, SPN } from "spns/chromatic";
import { TestInit } from "tests";
import { EQUAL_440, LIMIT_5_SYMMETRIC_N1_440 } from "../constants";
import Tuning from "../Tuning";
import calcFrequency from "./frequency";

TestInit.chromaticTuning();
describe.each([
  [EQUAL_440, A4, 440],
  [EQUAL_440, C0, 16.35],
  [EQUAL_440, AA4, 466.16],
  [EQUAL_440, GG4, 415.30],
  [LIMIT_5_SYMMETRIC_N1_440, A4, 440],
  [LIMIT_5_SYMMETRIC_N1_440, E4, 330],
])("Tuning + SPN = frequency", (tuning: Tuning, spn: SPN, frequency: number) => {
  it(`tuning=(${tuning}) SPN=${String(spn)} => ${frequency}`, () => {
    const actual: number = calcFrequency(tuning, spn);

    expect(actual).toBeCloseTo(frequency);
  } );
} );
