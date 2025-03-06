import type { Interval } from "../Interval";
import { Intervals as I } from "..";
import { add } from "./add";
import { mult } from "./mult";
import { neg } from "./neg";

const { ET12_SEMITONE, OCTAVE, UNISON } = I;

describe.each([
  [UNISON, 1, UNISON],
  [UNISON, 0, UNISON],
  [UNISON, 123, UNISON],
  [UNISON, -123, UNISON],
  [OCTAVE, 1, OCTAVE],
  [OCTAVE, 0, UNISON],
  [OCTAVE, 2, add(OCTAVE, OCTAVE)],
  [ET12_SEMITONE, 12, OCTAVE],
  [ET12_SEMITONE, -12, neg(OCTAVE)],
])("tests", (interval: Interval, factor: number, expected: Interval): void => {
  it(`${interval} factor=${factor} => ${expected}`, () => {
    const actual = mult(interval, factor);

    expect(actual).toBe(expected);
  } );
} );
