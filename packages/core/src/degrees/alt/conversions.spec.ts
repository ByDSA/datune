import { Degrees as D, Intervals as I } from "alt";
import { Degrees as CD } from "chromatic";
import { Degrees as DD } from "diatonic";
import { cyclicOctave } from "intervals/symbolic/chromatic/modifiers";

describe.each([
  [D.aVII, CD.I],
  [D.I, CD.I],
  [I.fromDiatonicInterval(DD.I, -1), CD.VII],
])("toChromatic", (base, expected) => {
  it(`(${base}) should convert correctly to ${expected}`, () => {
    const actual = cyclicOctave(base.toChromaticInterval());

    expect(actual).toBe(expected);
  } );
} );

it("toInterval", () => {
  const actual = D.aVII;
  const expected = I.a7;

  expect(actual).toBe(expected);
} );
