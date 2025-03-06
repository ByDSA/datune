import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { Voicings as V } from "voicings/alt";
import { add, bass, inv, sub } from "../modifiers";
import { Chords as C } from "..";
import { fromRootVoicing } from "../building";

describe.each([
  [C.C, P.C, C.C],
  [C.C, P.E, inv(C.C)],
  [C.C, P.B, inv(C.CMaj7, 3)],
])("withBass", (chord, pitchBass, expectedChord) => {
  it(`${chord}.withBass(${pitchBass}) = ${expectedChord}`, () => {
    const actual = bass(chord, pitchBass);

    expect(actual).toBe(expectedChord);
  } );
} );

describe.each([
  [C.C7, 4, C.C7],
])("withInv", (chord, invs, expectedChord) => {
  it(`${chord}.withInv(${invs}) = ${expectedChord}`, () => {
    const actual = inv(chord, invs);

    expect(actual).toBe(expectedChord);
  } );
} );

it("withAdd - C7 + M2 = D7", () => {
  const actual = add(C.C7, I.M2);
  const expected = fromRootVoicing(P.D, V.SEVENTH);

  expect(actual).toBe(expected);
} );

it("withSub - C7 - M2 = Bb7", () => {
  const actual = sub(C.C7, I.M2);
  const expected = fromRootVoicing(P.Bb, V.SEVENTH);

  expect(actual).toBe(expected);
} );
