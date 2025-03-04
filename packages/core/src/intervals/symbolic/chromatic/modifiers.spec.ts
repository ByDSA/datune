import { Intervals } from ".";

describe.each([
  [Intervals.P1, 0],
  [Intervals.neg(Intervals.P1), 0],
  [Intervals.P5, 0],
  [Intervals.neg(Intervals.P5), 0],
  [Intervals.P8, 1],
  [Intervals.neg(Intervals.P8), -1],
  [Intervals.P12, 1],
  [Intervals.neg(Intervals.P12), -1],
])("octaves", (interval, expected) => {
  it(`${interval} => ${expected}`, () => {
    const actual = Intervals.octaves(interval);

    expect(actual === expected).toBeTruthy(); // 0 === -0
  } );
} );
