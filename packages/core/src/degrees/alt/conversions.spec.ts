import { Degrees as D, Intervals as I } from "alt";
import { Degrees as CD } from "chromatic";
import { Degrees as DD } from "diatonic";

describe.each([
  [D.aVI, CD.bVII],
  [D.I, CD.I],
  [I.fromDiatonicInterval(DD.I, -1), CD.VII],
])("toChromaticDegree", (base, expected) => {
  it(`(${base}) should convert correctly to ${expected}`, () => {
    const actual = base.toChromaticDegree();

    expect(actual).toBe(expected);
  } );
} );

it("toInterval", () => {
  const actual = D.aVI;
  const expected = I.a6;

  expect(actual).toBe(expected);
} );
