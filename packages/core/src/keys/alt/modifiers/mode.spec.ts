import { Pitches, Scales } from "alt";
import { Keys } from "..";

describe.each([
  {
    key: Keys.C,
    n: 2,
    expected: Keys.from(Pitches.D, Scales.DORIAN),
  },
  {
    key: Keys.C,
    n: 1,
    expected: Keys.C,
  },
  {
    key: Keys.C,
    n: 3,
    expected: Keys.from(Pitches.E, Scales.PHRYGIAN),
  },
  {
    key: Keys.C,
    n: 8,
    expected: Keys.C,
  },
])("withMode with n: $n", ( { n, key, expected } ) => {
  it("should be " + expected, () => {
    const actual = key.withMode(n);

    expect(actual).toBe(expected);
  } );
} );
