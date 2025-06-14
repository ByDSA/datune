import type { IntervalSet } from "sets/interval-sets/chromatic";
import type { Chord } from "../../../../chords/octave/chromatic/Chord";
import { Chords as C } from "chords/octave/chromatic";
import { IntervalSets as IS } from "..";
import { fromChord } from "./fromChord";

const { POWER_CHORD, SEVENTH, TRIAD_MAJOR } = IS;

describe.each([
  [C.C5, POWER_CHORD],
  [C.C, TRIAD_MAJOR],
  [C.C7, SEVENTH],
])("fromChord", (chord: Chord, intervalSet: IntervalSet) => {
  it(`${chord} => ${intervalSet}`, () => {
    const actual = fromChord(chord);

    expect(actual).toBe(intervalSet);
  } );
} );
