/* eslint-disable camelcase */
import { MAJOR_SECOND } from "intervals/alt";
import { B as DA_B, Bb as DA_Bb, C as DA_C, D as DA_D, E as DA_E } from "pitches/alt";
import { TestInit } from "tests";
import { SEVENTH } from "voicings/alt";
import { fromRootVoicing } from "../building";
import { C, C7, CMaj7 } from "../constants";
import { add, bass, inv, sub } from "../modifiers";

TestInit.diatonicAltVoicing();
TestInit.diatonicAlt();
TestInit.chromaticChord();
TestInit.diatonicAltChord();

describe.each([
  [C, DA_C, C],
  [C, DA_E, inv(C)],
  [C, DA_B, inv(CMaj7, 3)],
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
  const actual = add(C7, MAJOR_SECOND);
  const expected = fromRootVoicing(DA_D, SEVENTH);

  expect(actual).toBe(expected);
} );

it("withSub - C7 - MAJOR_SECOND = Bb7", () => {
  const actual = sub(C7, MAJOR_SECOND);
  const expected = fromRootVoicing(DA_Bb, SEVENTH);

  expect(actual).toBe(expected);
} );
