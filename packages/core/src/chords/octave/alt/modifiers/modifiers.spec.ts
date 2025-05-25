import { Intervals as I } from "intervals/alt";
import { Pitches as P, Pitch } from "pitches/alt";
import { Voicings as V } from "voicings/alt";
import { Chords as CC } from "chromatic";
import { PitchSets as PS } from "alt";
import { Chords as C, Chord } from "..";
import { fromRootVoicing } from "../building";
import { shift, bass, inv, shiftDown } from ".";

describe.each([
  [C.C, P.C, C.C],
  [C.C, P.E, inv(C.C)],
  [C.C, P.B, inv(C.CMaj7, 3)],
])("bass tests", (chord, pitchBass, expectedChord) => {
  it(`${chord}.withBass(${pitchBass}) = ${expectedChord}`, () => {
    const actual = bass(chord, pitchBass);

    expect(actual.pitches).toEqual(expectedChord.pitches);
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

describe.each([
  C.A,
  C.CMaj7,
])("keep root", (chord: Chord) => {
  it(`${chord} => ${C.A}`, () => {
    for (let i = 1; i < chord.size; i++)
      expect(chord.root).toBe(chord.withInv(i).root);
  } );
} );

describe.each([
  [C.C.withBass(P.GG), [P.GG, P.C, P.E, P.G]],
  [C.C.withBass(P.G), [P.G, P.C, P.E]],
  [C.C.withRoot(P.E), [P.C, P.E, P.G]],
  [C.C.withRoot(P.E).withBass(P.D), [P.D, P.E, P.G, P.C]],
])("pitches", (chord: Chord, pitches: Pitch[]) => {
  it("pitches of " + chord + " should be: " + pitches, () => {
    const actual = chord.pitches;

    expect(actual).toStrictEqual(pitches);
  } );
} );

it("should not have new root in pitch set", ()=> {
  const actual = C.C.withRoot(P.D);

  expect(actual.pitchSet.has(P.D)).toBeFalsy();
} );

it("should not have new root in pitches", ()=> {
  const actual = C.C.withRoot(P.D);

  expect(actual.pitches.includes(P.D)).toBeFalsy();
} );

it("should add new bass in pitch set", ()=> {
  const actual = C.C.withBass(P.D);

  expect(actual.pitchSet.has(P.D)).toBeTruthy();
} );

it("should add bass in pitches", ()=> {
  const actual = C.C.withBass(P.D);

  expect(actual.pitches.includes(P.D)).toBeTruthy();
} );

it("should change pitchset", () => {
  const actual = C.C.withRoot(P.D).withBass(P.D);
  const actualPs = actual.pitchSet;
  const expectedPs = PS.fromPitches(...actual.pitches);

  expect(actualPs).toBe(expectedPs);
} );

it("should add pitches", () => {
  const actual = C.C.withAdd(P.A);
  const expected = C.fromPitches(P.C, P.E, P.G, P.A);

  expect(actual).toBe(expected);
} );

it("should remove pitches", () => {
  const actual = C.C.withRemove(P.E);
  const expected = C.C5;

  expect(actual).toBe(expected);
} );

it("bass is in chord and in pitchset", () => {
  const pitchBass = P.D;
  const c = C.C.withBass(pitchBass);

  expect(c.has(pitchBass)).toBeTruthy();
  expect(c.pitchSet.has(pitchBass)).toBeTruthy();
} );

it("same chord adding bass which is not in previous chord", () => {
  const pitchBass = P.D;
  const c1 = C.C.withBass(pitchBass);
  const c2 = C.fromPitches(...C.C.pitches, pitchBass).withBass(pitchBass);

  expect(c1).toBe(c2);
} );
