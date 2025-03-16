import type { StepReasonInfo, StepReasonVoicingResolutionInfo } from "./StepReasonInfo";
import { SPNArray } from "@datune/core";

export enum StepReason {
    RESOLUTION_VOICING, RESOLUTION_KEY, NEAR
}

type Settings = {
  base?: SPNArray;
};
export function stringifyStepReasonInfo(reasonInfo: StepReasonInfo, settings?: Settings) {
  switch (reasonInfo.reason) {
    case StepReason.NEAR: return "Near";
    case StepReason.RESOLUTION_KEY: return "Resolution Key";
    case StepReason.RESOLUTION_VOICING:
    {
      const { innerVoicingResult } = (reasonInfo as StepReasonVoicingResolutionInfo);
      const baseIndexes = Array.from(innerVoicingResult.indexMap.values());
      const baseNotes = baseIndexes.map(i=>settings?.base?.[i]);

      return "Resolution Voicing ("
      + innerVoicingResult.innerVoicing
      + ", notes=[" + (baseNotes ?? baseIndexes).join("-") + "])";
    }
    default: throw new Error();
  }
}
