import { Chords, Keys, Pitches as P, PitchSets as PS } from "@datune/core/alt";
import { fromKeyChord, BasicSpaceLevels } from "./basic-space";

describe("basicSpace", () => {
  it("building", () => {
    const expected: BasicSpaceLevels = {
      octave: P.C,
      fifth: PS.fromPitches(P.C, P.G),
      triad: PS.fromPitches(P.C, P.E, P.G),
      diatonic: PS.fromPitches(P.C, P.D, P.E, P.F, P.G, P.A, P.B),
      chromatic: PS.fromPitches(...P.ALL),
    };
    const actual = fromKeyChord( {
      chord: Chords.C,
      key: Keys.C,
    } );

    expect(actual).toStrictEqual(expected);
  } );
} );
