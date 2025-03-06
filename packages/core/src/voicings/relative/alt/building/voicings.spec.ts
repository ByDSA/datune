import { Voicings as DV } from "voicings/diatonic";
import { Voicings as CV } from "voicings/chromatic";
import { Voicings as V } from "..";
import { fromVoicings } from "./voicings";

const { SEVENTH } = V;

it("fromVoicings - Voicing SEVENTH + Diatonic SEVENTH = DiatonicAlt SEVENTH", () => {
  const voicing = fromVoicings(CV.SEVENTH, DV.SEVENTH);
  const voicing2 = SEVENTH;

  expect(voicing2).toBe(voicing);
} );
