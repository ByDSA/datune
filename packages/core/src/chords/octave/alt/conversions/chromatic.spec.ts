import { C7 as CC_C7 } from "chords/chromatic";
import { AA as DA_AA, C as DA_C, E as DA_E, G as DA_G } from "pitches/alt";
import { TestInit } from "tests";
import { fromPitches } from "../building";
import toChromatic from "./chromatic";

TestInit.chromaticChord();
TestInit.diatonicAltChord();

it("chromatic", () => {
  const expected = CC_C7;
  const diatonicAltChord = fromPitches(DA_C, DA_E, DA_G, DA_AA);
  const actual = toChromatic(diatonicAltChord);

  expect(actual).toBe(expected);
} );
