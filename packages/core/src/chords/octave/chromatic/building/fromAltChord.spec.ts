import { Chords } from "chords/chromatic";
import { Pitches as P } from "pitches/alt";
import { Chords as AC } from "chords/alt";
import { fromAltChord } from "./fromAltChord";

it("chromatic", () => {
  const expected = Chords.C7;
  const chord = AC.fromPitches(P.C, P.E, P.G, P.AA);
  const actual = fromAltChord(chord);

  expect(actual).toBe(expected);
} );
