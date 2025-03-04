import { Chords } from "chords/chromatic";
import { Pitches as P } from "pitches/alt";
import { TestInit } from "tests";
import { fromPitches } from "../building";
import { toChromatic } from "./chromatic";

TestInit.chromaticChord();
TestInit.diatonicAltChord();

it("chromatic", () => {
  const expected = Chords.C7;
  const chord = fromPitches(P.C, P.E, P.G, P.AA);
  const actual = toChromatic(chord);

  expect(actual).toBe(expected);
} );
