import { Chords as C, Keys as K, PitchSet } from "@datune/core/alt";
import { chordalCircleOfFifthsRule, getNChordalCircleOfFifthsRule } from "./chordal-circle-of-fifths-rule";

const keyCPitchSet = K.C.pitchSet;

describe.each([
  [C.C, keyCPitchSet, 1, C.G, 1],
  [C.C, keyCPitchSet, 2, C.Dm, 2],
  [C.C, keyCPitchSet, 3, C.Am, 3], // p. 60 example
  [C.C, keyCPitchSet, 4, C.Em, -3],
  [C.C, keyCPitchSet, 5, C.B0, -2],
  [C.C, keyCPitchSet, 6, C.F, -1],
  [C.C, keyCPitchSet, 7, C.C, 0],
  [C.C, keyCPitchSet, -1, C.F, -1],
  [C.C, keyCPitchSet, -2, C.B0, -2],
  [C.C, keyCPitchSet, -3, C.Em, -3],
  [C.C, keyCPitchSet, -4, C.Am, 3],
  [C.C, keyCPitchSet, -5, C.Dm, 2],
  [C.C, keyCPitchSet, -6, C.G, 1],
  [C.C, keyCPitchSet, -7, C.C, 0],
  [C.C, keyCPitchSet, 0, C.Cm, 0], // p. 60 example
])("chordalCircleOfFifthsRule(%s, %s, %s, %s)", (chord, diatonicLevel: PitchSet, n, expected, expectedN) => {
  it("returns the expected chord pitchSet", () => {
    const actual = chordalCircleOfFifthsRule( {
      chord,
      diatonicLevel,
      n,
    } );

    expect(actual.root).toBe(expected.root);
  } );

  it("getNChordalCircleOfFifthsRule should be " + n, () => {
    const actual = getNChordalCircleOfFifthsRule( {
      from: chord,
      to: expected,
    } );

    expect(actual).toBe(expectedN);
  } );
} );
