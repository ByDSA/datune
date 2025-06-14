import { inspect } from "node:util";
import { Pitches as P, Pitches } from "pitches/chromatic";
import { fromPitches } from "./building";
import { reverse } from "./modifiers";
import { PitchSet } from "./PitchSet";
import { PitchSets as PS } from ".";

const { C, E, G } = P;

it("constants", () => {
  const pitchSet1 = PS.C5;
  const pitchSet2 = fromPitches(C, G);

  expect(pitchSet1).toBe(pitchSet2);
} );

it("content", () => {
  expect(PS.C5.has(C)).toBeTruthy();
  expect(PS.C5.has(G)).toBeTruthy();
  expect(PS.C5.has(E)).toBeFalsy();
} );

it("hasAny checks if set contains any of given pitches", () => {
  const set = PS.C5;

  expect(set.hasAny(C, E)).toBeTruthy();
  expect(set.hasAny(E)).toBeFalsy();
} );

it("hasAll checks if set contains all given pitches", () => {
  const set = PS.C5;

  expect(set.hasAll(C, G)).toBeTruthy();
  expect(set.hasAll(C, E, G)).toBeFalsy();
} );

it("returns pitches as array", () => {
  const set = PS.C5;

  expect(set.pitches).toEqual([C, G]);
} );

it("returns correct size", () => {
  const set = PS.C5;

  expect(set.size).toBe(2);
} );

it("has correct string tag", () => {
  const set = PS.C5;

  expect(Object.prototype.toString.call(set)).toBe("[object PitchSet]");
} );

it("two pitch sets with same notes should be the same (independent of order)", () => {
  const ps1 = fromPitches(C, G);
  const ps2 = fromPitches(G, C);

  expect(ps1).toBe(ps2);
} );

it("two pitch sets with same unrepeated notes should be the same (independent of order)", () => {
  const ps1 = fromPitches(C, G, C);
  const ps2 = fromPitches(G, C, G);

  expect(ps1).toBe(ps2);
} );

it("removes pitch from set", () => {
  const ps = PS.C5;
  const actual = PS.remove(ps, P.C);

  expect(actual).toBe(PS.fromPitches(P.G));
} );

it("removes all pitches from set", () => {
  const ps = PS.C5;
  const actual = PS.remove(ps, P.C, P.G);

  expect(actual).toBe(PS.EMPTY);
} );

it("two empty pitchset should be the same", () => {
  const ps1 = PS.fromPitches();
  const ps2 = PS.fromPitches();

  expect(ps1).toBe(ps2);
} );

it("add already existing pitch to set does not change it", () => {
  const ps = PS.C5;
  const actual = PS.add(ps, P.C);

  expect(actual).toBe(ps);
} );

it("shifts all pitches in set by given interval", () => {
  const ps = PS.C5;
  const actual = PS.shift(ps, 4);

  expect(actual).toBe(PS.E5);
} );

it("shifts all pitches in set by negative interval", () => {
  const ps = PS.C5;
  const actual = PS.shift(ps, -4);

  expect(actual).toBe(PS.fromPitches(P.Ab, P.Eb));
} );

it("reverse CMaj7", () => {
  const initial = PS.fromPitches(P.C, P.E, P.G, P.B);
  const expected = PS.fromPitches(P.CC, P.D, P.DD, P.F, P.FF, P.GG, P.A, P.AA);
  const actual = reverse(initial);

  expect(actual).toBe(expected);
  expect(reverse(actual)).toBe(initial);
} );

it("reverse EMPTY SET should be ALL-SET", () => {
  const expected = PS.fromPitches(...Pitches.ALL);
  const actual = reverse(PS.EMPTY);

  expect(actual).toBe(expected);
} );

describe.each([
  [PS.C5, "C, G"],
  [PS.fromPitches(P.C, P.E, P.G), "C, E, G"],
  [PS.EMPTY, ""],
])("toString", (ps: PitchSet, expected: string) => {
  it("should match " + expected, () => {
    const actual = ps.toString();

    expect(actual).toBe(expected);
  } );
} );

it("should get custom inspect", () => {
  const ps = PS.C5;
  const output = inspect(ps);

  expect(output).toBe("PitchSet(C,G)");
} );

it("immutable set", () => {
  const set = new Set([P.C, P.A, P.C]);

  set.add(P.B);
  const actual = PS.from(set);

  set.add(P.AA);

  const expected = new Set([P.C, P.A, P.B]);

  expect((actual as any).set).toEqual(expected);
} );
