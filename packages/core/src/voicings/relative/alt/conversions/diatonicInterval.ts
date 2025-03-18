import type { Voicing } from "../Voicing";
import { NonEmptyNumberArray } from "datils";
import { Voicings as DVoicings } from "../../diatonic";

export function toDiatonicInterval(obj: Voicing) {
  const arrayDiatonicChordVoicing: NonEmptyNumberArray = [] as any;

  for (const value of obj.rootIntervals)
    arrayDiatonicChordVoicing.push(+value.diatonicInterval);

  return DVoicings.fromRootIntervalInts(...arrayDiatonicChordVoicing);
}
