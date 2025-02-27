/* eslint-disable camelcase */
import { Intervals } from "intervals/alt";
import { Pitches as DA } from "pitches/alt";
import { TestInit } from "tests";
import { Voicings as DVoicings } from "voicings/alt";
import { fromRootVoicing } from "../building";
import { C, C7, CMaj7 } from "../constants";
import { add, bass, inv, sub } from "../modifiers";

TestInit.diatonicAltVoicing();
TestInit.diatonicAlt();
TestInit.chromaticChord();
TestInit.diatonicAltChord();

describe.each([
  [C, DA.C, C],
  [C, DA.E, inv(C)],
  [C, DA.B, inv(CMaj7, 3)],
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

it("withAdd - C7 + MAJOR_SECOND = D7", () => {
  const actual = add(C7, Intervals.MAJOR_SECOND);
  const expected = fromRootVoicing(DA.D, DVoicings.SEVENTH);

  expect(actual).toBe(expected);
} );

it("withSub - C7 - MAJOR_SECOND = Bb7", () => {
  const actual = sub(C7, Intervals.MAJOR_SECOND);
  const expected = fromRootVoicing(DA.Bb, DVoicings.SEVENTH);

  expect(actual).toBe(expected);
} );
