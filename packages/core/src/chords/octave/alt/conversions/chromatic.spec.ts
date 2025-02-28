import { fromPitches } from "../building";
import { toChromatic } from "./chromatic";
import { Chords } from "chords/chromatic";
import { Pitches as DA } from "pitches/alt";
import { TestInit } from "tests";

TestInit.chromaticChord();
TestInit.diatonicAltChord();

it("chromatic", () => {
  const expected = Chords.C7;
  const diatonicAltChord = fromPitches(DA.C, DA.E, DA.G, DA.AA);
  const actual = toChromatic(diatonicAltChord);

  expect(actual).toBe(expected);
} );
