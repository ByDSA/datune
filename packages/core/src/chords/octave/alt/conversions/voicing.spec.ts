import * as C from "../constants";
import { bass } from "../modifiers";
import { toVoicing } from "./voicing";
import { expectVoicing } from "voicings/relative/alt/tests/voicing";
import { TestInit } from "tests";
import { Pitches, Voicings as V, type Voicing } from "alt";

TestInit.diatonicAltVoicing();
TestInit.diatonicAltChord();

describe.each([
  [C.C, V.TRIAD_MAJOR],
  [bass(C.C, Pitches.GG), V.MAJOR_OVER_a5],
  [bass(C.C, Pitches.Gb), V.MAJOR_OVER_d5],
  [bass(C.C, Pitches.FF), V.MAJOR_OVER_a4],
  [bass(C.Cm, Pitches.FF), V.MINOR_OVER_a4],
  [bass(C.Cm, Pitches.Gb), V.MINOR_OVER_d5],
])("tests", (chord, expected) => {
  it("chord " + chord.toString() + " should have voicing " + expected.toString(), () => {
    const actual = toVoicing(chord);

    expect(actual).not.toBeNull();

    expectVoicing(actual as Voicing, expected);
  } );
} );
