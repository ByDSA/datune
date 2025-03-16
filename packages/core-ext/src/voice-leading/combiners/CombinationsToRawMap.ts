import type { Combination, RawCombination } from "./types";
import { singleStepsGetObjId } from "voice-leading/steps/single/id";
import { RawMap } from "./RawMap";

export class CombinationToRawsMap extends RawMap<Combination, RawCombination, string> {
  protected getObjId(combination: Combination) {
    return singleStepsGetObjId(combination);
  }
}
