import type { Tuning } from "../Tuning";
import { SPNs, type SPN } from "spns/chromatic";
import { Tunings as TU } from "..";
import { calcFrequency } from "./frequency";

const { A4, AA4, C0, E4, GG4 } = SPNs;
const { EQUAL_440, LIMIT_5_SYMMETRIC_N1_440 } = TU;

describe.each([
  [EQUAL_440, A4, 440],
  [EQUAL_440, C0, 16.35],
  [EQUAL_440, AA4, 466.16],
  [EQUAL_440, GG4, 415.30],
  [LIMIT_5_SYMMETRIC_N1_440, A4, 440],
  [LIMIT_5_SYMMETRIC_N1_440, E4, 330],
])("tuning + SPN = frequency", (tuning: Tuning, spn: SPN, frequency: number) => {
  it(`tuning=(${tuning}) SPN=${String(spn)} => ${frequency}`, () => {
    const actual: number = calcFrequency(tuning, spn);

    expect(actual).toBeCloseTo(frequency);
  } );
} );
