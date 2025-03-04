import { Voicings as DV } from "voicings/diatonic";
import { Voicings as CV } from "voicings/chromatic";
import { TestInit } from "tests";
import { SEVENTH } from "../constants";
import { fromVoicings } from "./voicings";

beforeAll(() => {
  TestInit.diatonicAltVoicing();
} );

it("fromVoicings - Voicing SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH", () => {
  const voicing = fromVoicings(CV.SEVENTH, DV.SEVENTH);
  const voicing2 = SEVENTH;

  expect(voicing2).toBe(voicing);
} );
