import type { Arrays } from "@datune/utils";
import type { Voicing } from "../Voicing";
import { Voicings as DVoicings } from "../../diatonic";

export function toDiatonicInterval(obj: Voicing) {
  const arrayDiatonicChordVoicing: Arrays.Number = [] as any;

  for (const value of obj.rootIntervals)
    arrayDiatonicChordVoicing.push(+value.diatonicInterval);

  return DVoicings.fromRootIntervalInts(...arrayDiatonicChordVoicing);
}
