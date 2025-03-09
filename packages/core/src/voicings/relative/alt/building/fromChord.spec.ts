import { expectVoicing } from "voicings/relative/alt/tests/voicing";
import { Pitches as P } from "pitches/alt";
import { Voicings as V } from "voicings/alt";
import { Chords as C } from "chords/alt";
import { fromChord } from "./fromChord";

describe.each([
  [C.C, V.TRIAD_MAJOR],
  [C.C.withBass(P.GG), V.MAJOR_OVER_a5],
  [C.C.withBass(P.Gb), V.MAJOR_OVER_d5],
  [C.C.withBass(P.FF), V.MAJOR_OVER_a4],
  [C.Cm.withBass(P.FF), V.MINOR_OVER_a4],
  [C.Cm.withBass(P.Gb), V.MINOR_OVER_d5],
])("tests", (chord, expected) => {
  it("chord " + chord.toString() + " should have voicing " + expected.toString(), () => {
    const actual = fromChord(chord);

    expect(actual).not.toBeNull();

    expectVoicing(actual, expected);
  } );
} );
