/* eslint-disable @typescript-eslint/naming-convention */
import type { PitchArray } from "pitches/alt";
import type { Chord } from "../Chord";
import { Pitches as P } from "pitches/alt";
import { fromPitches } from "../building";
import { inv } from "../modifiers";
import { Chords } from "..";

const { B, Bb, C, D, E, Eb, G } = P;
const { C: AC_C, C9, CMaj7, CmMaj7, C7 } = Chords;

describe.each(<[Chord, PitchArray][]>[
  [AC_C, [C, E, G]],
  [C7, [C, E, G, Bb]],
  [C9, [C, E, G, Bb, D]],
  [CMaj7, [C, E, G, B]],
  [CmMaj7, [C, Eb, G, B]],
  [inv(C7), [E, G, Bb, C]],
  [inv(C7, 2), [G, Bb, C, E]],
  [inv(C7, 3), [Bb, C, E, G]],
])("pitches", (chord: Chord, pitches: PitchArray) => {
  const chordName = chord ? String(chord) : "undefined";

  describe("name: " + chordName, () => {
    it("defined chord", () => {
      expect(chord).toBeDefined();
    } );

    it(`pitches = ${String(pitches)}`, () => {
      const actual = chord.pitches;

      expect(actual).toStrictEqual(pitches);
    } );

    it(`length = ${pitches.length}`, () => {
      const actual = chord.length;

      expect(actual).toBe(pitches.length);
    } );

    it(`Reversible from pitches: ${String(pitches)}`, () => {
      const actual = fromPitches(...pitches);

      expect(actual).toStrictEqual(chord);
    } );
  } );
} );
