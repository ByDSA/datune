import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { Voicings as V } from "voicings/alt";
import { Chords as CC } from "chromatic";
import { Chords as C } from "..";
import { fromRootVoicing } from "../building";
import { shift, bass, inv, shiftDown } from ".";

describe.each([
  [C.C, P.C, C.C],
  [C.C, P.E, inv(C.C)],
  [C.C, P.B, inv(C.CMaj7, 3)],
])("bass", (chord, pitchBass, expectedChord) => {
  it(`${chord}.withBass(${pitchBass}) = ${expectedChord}`, () => {
    const actual = bass(chord, pitchBass);

    expect(actual).toBe(expectedChord);
  } );
} );

describe.each([
  [C.C7, 4, C.C7],
])("inv", (chord, invs, expectedChord) => {
  it(`${chord}.withInv(${invs}) = ${expectedChord}`, () => {
    const actual = inv(chord, invs);

    expect(actual).toBe(expectedChord);
  } );
} );

it("shift - C7 + M2 = D7", () => {
  const actual = shift(C.C7, I.M2);
  const expected = fromRootVoicing(P.D, V.SEVENTH);

  expect(actual).toBe(expected);
} );

it("shiftDown - C7 - M2 = Bb7", () => {
  const actual = shiftDown(C.C7, I.M2);
  const expected = fromRootVoicing(P.Bb, V.SEVENTH);

  expect(actual).toBe(expected);
} );

it("toChromatic", () => {
  const base = C.Gbm;
  const expected = CC.FFm;
  const actual = base.toChromatic();

  expect(actual).toBe(expected);

  const expectedReverse = C.FFm;

  expect(actual.toAlt()).toBe(expectedReverse);
} );
