import { SEVENTH } from "../constants";
import { fromVoicings } from "./voicings";
import { Voicings as DVoicings } from "voicings/diatonic";
import { Voicings as CVoicings } from "voicings/chromatic";
import { TestInit } from "tests";

beforeAll(() => {
  TestInit.diatonicAltVoicing();
} );

it("fromVoicings - Voicing SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH", () => {
  const diatonicAltVoicing = fromVoicings(CVoicings.SEVENTH, DVoicings.SEVENTH);
  const diatonicAltVoicing2 = SEVENTH;

  expect(diatonicAltVoicing2).toBe(diatonicAltVoicing);
} );
