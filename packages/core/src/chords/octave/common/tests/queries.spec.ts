import { NonEmptyArray } from "datils";
import { testCoreModules } from "tests/testCoreModules";

describe.each(testCoreModules)("queries", (obj)=>{
  const { Chords: C, Pitches: P, type: moduleType, Intervals: I } = obj;

  describe.each([
    [C.C.withBass(P.GG), [P.GG, P.C, P.E, P.G]],
    [C.C.withBass(P.G), [P.G, P.C, P.E]],
    [C.C.withRoot(P.D), [P.C, P.E, P.G]],
    [C.C.withRoot(P.D).withBass(P.D), [P.D, P.E, P.G, P.C]],
  ])(moduleType + ": pitches", (chord: typeof C.C, pitches: typeof P.C[]) => {
    it("pitches of " + chord + " should be: " + pitches, () => {
      const actual = chord.pitches;

      expect(actual).toStrictEqual(pitches);
    } );
  } );

  it(moduleType + ": hasAll", () => {
    const initPitches = [P.C, P.E, P.G, P.D] as NonEmptyArray<typeof P.C>;
    const actual = C.fromPitches(...initPitches);

    expect(actual.hasAll(...initPitches)).toBeTruthy();
  } );

  it(`${moduleType}: hasAny`, () => {
    expect(C.C.hasAny(P.C, P.D)).toBeTruthy();
  } );

  it(`${moduleType}: hasRootIntervals`, () => {
    expect(C.C.hasRootIntervals(I.P1, I.M3, I.P5)).toBeTruthy();
  } );

  it(`${moduleType}: hasAnyRootIntervals`, () => {
    expect(C.C.hasAnyRootIntervals(I.M2, I.M3)).toBeTruthy();
  } );
} );
