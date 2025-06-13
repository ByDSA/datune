import type { Voicing } from "../Voicing";
import { NonEmptyNumberArray } from "datils";
import { type Voicing as DVoicing } from "../../diatonic";
import { fromRootIntervalInts } from "../../diatonic/building/index";

export function toDiatonicVoicing(obj: Voicing): DVoicing {
  const arrayDiatonicChordVoicing = new Array(obj.length)as NonEmptyNumberArray;

  for (const value of obj)
    arrayDiatonicChordVoicing.push(+value.diatonicInterval);

  return fromRootIntervalInts(...arrayDiatonicChordVoicing);
}
