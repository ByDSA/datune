import { Chords as C, Chord, Funcs as F, Keys as K, Key, PitchSet } from "@datune/core/alt";
import { regionalLevelChordDistanceRule } from "../regional/chord-distance-rule";
import { findChordByPitchSet, getAllDiatonicChordsInRegion } from "./neighbor-chords";

it("test", () => {
  const key = K.C;
  const actual = getAllDiatonicChordsInRegion(key);
  const distances = [...actual].map(c=> {
    const x = {
      chord: key.triadRootChord!,
      key: key,
    };
    const y = {
      chord: c.chord,
      key: key,
    };
    const d = regionalLevelChordDistanceRule( {
      x,
      y,
    } );

    return {
      chord: c,
      dist: d,
    };
  } );
} );

type TestCase = {
  start: Parameters<typeof findChordByPitchSet>[0]["start"];
  goalPitchSet: PitchSet;
  expectedDistance: number;
  expectedChord: Chord;
  expectedKey: Key;
};

describe.each([
  {
    start: {
      chord: C.C,
      region: K.C,
    },
    goalPitchSet: C.G.pitchSet,
    expectedDistance: 5,
    expectedChord: C.G,
    expectedKey: K.C,
  },
  {
    start: {
      chord: K.F.getChord(F.VIm),
      region: K.C,
    },
    goalPitchSet: K.Bm.getChord(F.V).pitchSet,
    expectedDistance: 30,
    expectedChord: K.Bm.getChord(F.V),
    expectedKey: K.Bm,
  },
] as TestCase[])("findChordByPitchSet", ( { start, goalPitchSet, expectedDistance, expectedChord, expectedKey } ) => {
  describe(`Transición desde ${start.chord} en degreeKey=${start.degreeKey} y region=${start.region} hacia pitchSet objetivo ${goalPitchSet}`, () => {
    let actual: ReturnType<typeof findChordByPitchSet>;

    beforeAll(() => {
      actual = findChordByPitchSet( {
        start,
        goal: {
          pitchSet: goalPitchSet,
        },
      } );
    } );

    it("should have the correct distance", () => {
      expect(actual.minFoundDistance).toBe(expectedDistance);
    } );

    it("should have exactly one path", () => {
      expect(actual.results).toHaveLength(1);
    } );

    it("should select the expected chord", () => {
      expect(actual.results[0].found.item.chord).toBe(expectedChord);
    } );

    it("should select the expected key", () => {
      expect(actual.results[0].found.item.key).toBe(expectedKey);
    } );
  } );
} );
