import { neg, octaves, PERFECT_FIFTH, PERFECT_OCTAVE, PERFECT_TWELFTH, PERFECT_UNISON } from ".";

describe.each([
  [PERFECT_UNISON, 0],
  [neg(PERFECT_UNISON), 0],
  [PERFECT_FIFTH, 0],
  [neg(PERFECT_FIFTH), 0],
  [PERFECT_OCTAVE, 1],
  [neg(PERFECT_OCTAVE), -1],
  [PERFECT_TWELFTH, 1],
  [neg(PERFECT_TWELFTH), -1],
])("octaves", (interval, expected) => {
  it(`${interval} => ${expected}`, () => {
    const actual = octaves(interval);

    expect(actual === expected).toBeTruthy(); // 0 === -0
  } );
} );
