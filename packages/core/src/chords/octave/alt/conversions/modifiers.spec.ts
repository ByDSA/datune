import { Intervals } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { TestInit } from "tests";
import { Voicings as DVoicings } from "voicings/alt";
import { add, bass, inv, sub } from "../modifiers";
import { C, C7, CMaj7 } from "../constants";
import { fromRootVoicing } from "../building";

TestInit.diatonicAltVoicing();
TestInit.diatonicAlt();
TestInit.chromaticChord();
TestInit.diatonicAltChord();

describe.each([
  [C, P.C, C],
  [C, P.E, inv(C)],
  [C, P.B, inv(CMaj7, 3)],
])("withBass", (chord, pitchBass, expectedChord) => {
  it(`${chord}.withBass(${pitchBass}) = ${expectedChord}`, () => {
    const actual = bass(chord, pitchBass);

    expect(actual).toBe(expectedChord);
  } );
} );

describe.each([
  [C7, 4, C7],
])("withInv", (chord, invs, expectedChord) => {
  it(`${chord}.withInv(${invs}) = ${expectedChord}`, () => {
    const actual = inv(chord, invs);

    expect(actual).toBe(expectedChord);
  } );
} );

it("withAdd - C7 + M2 = D7", () => {
  const actual = add(C7, Intervals.M2);
  const expected = fromRootVoicing(P.D, DVoicings.SEVENTH);

  expect(actual).toBe(expected);
} );

it("withSub - C7 - M2 = Bb7", () => {
  const actual = sub(C7, Intervals.M2);
  const expected = fromRootVoicing(P.Bb, DVoicings.SEVENTH);

  expect(actual).toBe(expected);
} );
