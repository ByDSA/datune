/* eslint-disable @typescript-eslint/naming-convention */
import type { PitchArray } from "pitches/alt";
import type { Chord } from "../Chord";
import { Pitches as P } from "pitches/alt";
import { fromPitches } from "../building";
import { inv } from "../modifiers";
import { Chords } from "..";

const { B, Bb, C, E, Eb, G } = P;
const { C: AC_C, C9, CMaj7, CmMaj7, C7 } = Chords;

describe.each(<[Chord, PitchArray][]>[
  [AC_C, [C, E, G]],
  [C7, [C, E, G, Bb]],
  [CMaj7, [C, E, G, B]],
  [CmMaj7, [C, Eb, G, B]],
  [inv(C7), [E, C, G, Bb]],
  [inv(C7, 2), [G, C, E, Bb]],
  [inv(C7, 3), [Bb, C, E, G]],
  [C9, [P.C, P.D, P.E, P.G, P.Bb]],
])("pitches", (chord: Chord, pitches: PitchArray) => {
  const chordName = chord ? String(chord) : "undefined";
  const { root: pitchRoot } = chord;

  describe("name: " + chordName, () => {
    it("defined chord", () => {
      expect(chord).toBeDefined();
    } );

    it(`pitches = ${String(pitches)}`, () => {
      const actual = chord.pitches;

      expect(actual).toStrictEqual(pitches);
    } );

    it(`length = ${pitches.length}`, () => {
      const actual = chord.size;

      expect(actual).toBe(pitches.length);
    } );

    it(`Reversible from pitches (${String(pitches)}) and root (${pitchRoot})`, () => {
      const actual = fromPitches(...pitches).withRoot(pitchRoot);

      expect(actual.pitches).toStrictEqual(chord.pitches);
    } );
  } );
} );
