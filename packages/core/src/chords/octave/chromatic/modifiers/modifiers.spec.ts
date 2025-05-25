import { Pitches as P, type Pitch, PitchArray, PitchSets as PS } from "chromatic";
import { Chords as C, type Chord } from "..";
import { shift } from ".";

describe("shift", () => {
  it("c7 + 2 = D7", () => {
    const actual = shift(C.C7, 2);
    const expected = C.D7;

    expect(actual).toBe(expected);
  } );

  it("c7 - 1 = B7", () => {
    const actual = shift(C.C7, -1);
    const expected = C.B7;

    expect(actual).toBe(expected);
  } );
} );

describe.each([
  [C.C.withBass(P.GG), [P.GG, P.C, P.E, P.G]],
  [C.C.withBass(P.G), [P.G, P.C, P.E]],
  [C.C.withRoot(P.D), [P.C, P.E, P.G]],
  [C.C.withRoot(P.D).withBass(P.D), [P.D, P.E, P.G, P.C]],
])("pitches", (chord: Chord, pitches: Pitch[]) => {
  it("pitches of " + chord + " should be: " + pitches, () => {
    const actual = chord.pitches;

    expect(actual).toStrictEqual(pitches);
  } );
} );

it("should not have new root in chord", ()=> {
  const actual = C.C.withRoot(P.D);

  expect(actual.has(P.D)).toBeFalsy();
} );

it("should not have new root in pitch set", ()=> {
  const actual = C.C.withRoot(P.D);

  expect(actual.pitchSet.has(P.D)).toBeFalsy();
} );

it("should not have new root in pitches", ()=> {
  const actual = C.C.withRoot(P.D);

  expect(actual.pitches.includes(P.D)).toBeFalsy();
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

it("bass is in chord but not in pitchset", () => {
  const bass = P.D;
  const c = C.C.withBass(bass);

  expect(c.has(bass)).toBeTruthy();
  expect(c.pitchSet.has(bass)).toBeTruthy();
} );

it("bass is in chord and in pitchset", () => {
  const bass = P.E;
  const c = C.C.withBass(bass);

  expect(c.has(bass)).toBeTruthy();
  expect(c.pitchSet.has(bass)).toBeTruthy();
} );

it("chord C-E-G-D", () => {
  const initPitches = [P.C, P.E, P.G, P.D] as PitchArray;
  const actual = C.fromPitches(...initPitches);

  expect(actual.hasAll(...initPitches)).toBeTruthy();
} );

it("bass pitchset is the same chord as bass in pitchset", () => {
  const bass = P.D;
  const c1 = C.C.withBass(bass);
  const c2 = C.fromPitches(...C.C.pitches, bass).withBass(bass);

  expect(c1).toBe(c2);
} );
