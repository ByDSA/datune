import { expectVoicing } from "voicings/relative/alt/tests/voicing";
import { TestInit } from "tests";
import { Pitches as P, Voicings as V, type Voicing } from "alt";
import * as C from "../constants";
import { bass } from "../modifiers";
import { toVoicing } from "./voicing";

TestInit.diatonicAltVoicing();
TestInit.diatonicAltChord();

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
