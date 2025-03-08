import { Keys as K } from "keys/alt";
import { Pitches as P } from "pitches/alt";
import { Pitches as CP } from "pitches/chromatic";
import { expectPitch } from "pitches/alt/tests/expect";
import { fromChromaticInPitchArray } from "./chromaticInPitchArray";

describe("from Chromatic and DiatonicAlt list", () => {
  it("chromatic DD in Key Cm = Eb", () => {
    const list = K.Cm.pitches;
    const actual = fromChromaticInPitchArray(CP.DD, list);

    expectPitch(actual, P.Eb);
  } );
} );
