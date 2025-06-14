import { NonEmptyArray } from "datils";
import { testCoreModules } from "tests/testCoreModules";

describe.each(testCoreModules)("building", (obj)=>{
  const { Chords: C, Pitches: P, type: moduleType,
    PitchSets: PS, IntervalSets: IS, Keys: K, Funcs: F } = obj;

  it(moduleType + ": should throw error trying to create a chord with empty pitch set", () => {
    expect(() => {
      C.from( {
        pitchSet: PS.EMPTY,
        root: P.C,
        bass: P.D,
      } );
    } ).toThrow();
  } );

  describe(moduleType + ": fromPitches", () => {
    it("get from ImmutableCache", () => {
      const chord = C.fromPitches(
        P.C,
        P.E,
        P.G,
        P.Bb,
      );
      const expected = C.C7;

      expect(chord).toBe(expected);
    } );

    it("from array const", () => {
      const pitches: NonEmptyArray<typeof P.C> = [P.C, P.E, P.G];
      const expected = C.C;
      const actual = C.fromPitches(...pitches);

      pitches[1] = P.F;

      expect(actual).toBe(expected);
    } );

    it("two chords with same pitches, same bass and same root should be the same (independent of order)", () => {
      const chord1 = C.fromPitches(P.C, P.E, P.G);
      const chord2 = C.fromPitches(P.C, P.G, P.E);

      expect(chord1).toBe(chord2);
    } );
  } );

  describe(moduleType + ": fromRootIntervalSet", () => {
    const { NINTH, SEVENTH, SEVENTH_MAJ7, TRIAD_MAJOR, TRIAD_MINOR } = IS;

    describe.each([
      [P.C, TRIAD_MAJOR, C.C],
      [P.C, SEVENTH, C.C7],
      [P.A, TRIAD_MINOR, C.Am],
      [P.C, SEVENTH_MAJ7, C.CMaj7],
      [P.C, NINTH, C.C9, false],
    ])("from Root + IntervalSet", (pitch: typeof P.C, intervalSet: typeof TRIAD_MAJOR, expectedChord: typeof C.C, reversible: boolean = true) => {
      const pitchName = String(pitch);
      const chordName = "expectedChord.pitches";
      const intervalSetName = String(intervalSet);

      it(`(${pitchName}, ${intervalSetName}) => ${chordName}`, () => {
        const chord = C.fromRootIntervalSet(pitch, intervalSet);

        expect(chord).toBe(expectedChord);
      } );

      if (reversible) {
        it(`Reversible: root=${pitchName}, intervalSet=${intervalSetName}`, () => {
          const chord = C.fromRootIntervalSet(pitch, intervalSet);

          expect(chord.pitches[0]).toBe(pitch);
          expect(chord.toIntervalSet()).toBe(intervalSet);
        } );
      }
    } );
  } );

  describe(moduleType + ": fromKeyFunc", () => {
    it("calculateChord: Key C, DegreeFunction I = Chord C", () => {
      const chord = C.fromKeyFunc(K.C, F.I);

      expect(chord).toBe(C.C);
    } );
  } );
} );
