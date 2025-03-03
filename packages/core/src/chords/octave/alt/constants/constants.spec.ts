import { fromPitches } from "../building";
import { Chord } from "../Chord";
import { inv } from "../modifiers";
import { C as DAC_C, C7, C9, CMaj7, CmMaj7 } from "./constants";
import { TestInit } from "tests";
import { PitchArray, Pitches } from "pitches/alt";

TestInit.diatonicAltChord();

describe("tests", () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { B, Bb, C, D, E, Eb, G } = Pitches;

  describe.each(<[Chord, PitchArray][]>[
    [DAC_C, [C, E, G]],
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
} );
