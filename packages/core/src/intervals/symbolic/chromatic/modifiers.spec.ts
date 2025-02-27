import { Intervals } from ".";

describe.each([
  [Intervals.PERFECT_UNISON, 0],
  [Intervals.neg(Intervals.PERFECT_UNISON), 0],
  [Intervals.PERFECT_FIFTH, 0],
  [Intervals.neg(Intervals.PERFECT_FIFTH), 0],
  [Intervals.PERFECT_OCTAVE, 1],
  [Intervals.neg(Intervals.PERFECT_OCTAVE), -1],
  [Intervals.PERFECT_TWELFTH, 1],
  [Intervals.neg(Intervals.PERFECT_TWELFTH), -1],
])("octaves", (interval, expected) => {
  it(`${interval} => ${expected}`, () => {
    const actual = Intervals.octaves(interval);

    expect(actual === expected).toBeTruthy(); // 0 === -0
  } );
} );
