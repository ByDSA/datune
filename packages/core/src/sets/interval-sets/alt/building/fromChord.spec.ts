import { expectIntervalSet } from "sets/interval-sets/alt/tests/interval-set";
import { Pitches as P } from "pitches/alt";
import { IntervalSets as IS } from "sets/interval-sets/alt";
import { Chords as C } from "chords/alt";
import { fromRootChord } from "./fromChord";

describe.each([
  [C.C, IS.TRIAD_MAJOR],
  [C.C.withBass(P.GG), IS.MAJOR_OVER_a5.withInv().withClosed()],
  [C.C.withBass(P.Gb), IS.MAJOR_OVER_d5.withInv().withClosed()],
  [C.C.withBass(P.FF), IS.MAJOR_OVER_a4.withInv().withClosed()],
  [C.Cm.withBass(P.FF), IS.MINOR_OVER_a4.withInv().withClosed()],
  [C.Cm.withBass(P.Gb), IS.MINOR_OVER_d5.withInv().withClosed()],
])("tests", (chord, expected) => {
  it("chord " + chord.toString() + " should have intervalSet " + expected.toString(), () => {
    const actual = fromRootChord(chord);

    expect(actual).not.toBeNull();

    expectIntervalSet(actual, expected);
  } );
} );
