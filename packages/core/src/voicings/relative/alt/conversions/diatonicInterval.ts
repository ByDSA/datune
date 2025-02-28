import { Arrays } from "@datune/utils";
import { Voicings as DVoicings } from "../../diatonic";
import type { Voicing } from "../Voicing";

export function toDiatonicInterval(obj: Voicing) {
  const arrayDiatonicChordVoicing: Arrays.Number = [] as any;

  for (const value of obj.rootIntervals)
    arrayDiatonicChordVoicing.push(+value.diatonicInterval);

  return DVoicings.fromRootIntervalInts(...arrayDiatonicChordVoicing);
}
