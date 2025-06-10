import { Intervals as I } from "..";

describe.each([
  [I.OCTAVE, I.UNISON],
  [I.UNISON, I.UNISON],
  [I.UNISON.withNeg(), I.UNISON],
  [I.SECOND, I.SECOND],
  [I.SECOND.withNeg(), I.SEVENTH],
  [I.NINTH.withNeg(), I.SEVENTH],
])("cyclicOctave", (interval, expected) => {
  it(`should return simplified within octave interval (${interval}) => (${expected})`, () => {
    expect(interval.withCyclicOctave()).toBe(expected);
  } );
} );
