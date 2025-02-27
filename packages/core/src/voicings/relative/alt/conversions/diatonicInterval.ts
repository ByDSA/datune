import { Arrays } from "@datune/utils";
import { Voicings as DVoicings } from "../../diatonic";
import Voicing from "../Voicing";

export default function toDiatonic(obj: Voicing) {
  const arrayDiatonicChordVoicing: Arrays.Number = [] as any;

  for (const value of obj.rootIntervals)
    arrayDiatonicChordVoicing.push(+value.diatonicInterval);

  return DVoicings.fromRootIntervalInts(...arrayDiatonicChordVoicing);
}
