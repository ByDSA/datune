import type { Voicing } from "alt";
import { expectVoicing } from "voicings/relative/alt/tests/voicing";
import { Pitches as P, Voicings as V, Chords as C } from "alt";
import { bass } from "../modifiers";
import { toVoicing } from "./voicing";

describe.each([
  [C.C, V.TRIAD_MAJOR],
  [bass(C.C, P.GG), V.MAJOR_OVER_a5],
  [bass(C.C, P.Gb), V.MAJOR_OVER_d5],
  [bass(C.C, P.FF), V.MAJOR_OVER_a4],
  [bass(C.Cm, P.FF), V.MINOR_OVER_a4],
  [bass(C.Cm, P.Gb), V.MINOR_OVER_d5],
])("tests", (chord, expected) => {
  it("chord " + chord.toString() + " should have voicing " + expected.toString(), () => {
    const actual = toVoicing(chord);

    expect(actual).not.toBeNull();

    expectVoicing(actual as Voicing, expected);
  } );
} );
