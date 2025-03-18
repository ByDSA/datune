import { Interval, SpnArray } from "@datune/core";
import { InnerVoicingResult } from "voicings/findInnerVoicings";
import { StepReason } from "./StepReason";

export type StepReasonInfo = {
    reason: StepReason;
};

export type StepReasonVoicingResolutionInfo = StepReasonInfo & {
    innerVoicingResult: InnerVoicingResult;
 };

export type StepReasonRestNotesInfo = StepReasonInfo;

export type StepReasonNearInfo = StepReasonInfo & {
    interval: Interval;
};

type Settings = {
    base?: SpnArray;
  };
export function stringifyStepReasonInfo(reasonInfo: StepReasonInfo, settings?: Settings) {
  switch (reasonInfo.reason) {
    case StepReason.NEAR:
      return stringifyStepReasonNearInfo(
            reasonInfo as StepReasonNearInfo,
      );
    case StepReason.RESOLUTION_KEY: return "Resolution Key";
    case StepReason.RESOLUTION_VOICING:
      return stringifyStepReasonVoicingResolutionInfo(
        reasonInfo as StepReasonVoicingResolutionInfo,
        settings,
      );
    default: throw new Error();
  }
}

export function stringifyStepReasonNearInfo(
  reasonInfo: StepReasonNearInfo,
): string {
  const intervalWithSign: string = reasonInfo.interval >= 0
    ? "+" + reasonInfo.interval
    : reasonInfo.interval.toString();

  return "Near " + intervalWithSign;
}

export function stringifyStepReasonVoicingResolutionInfo(
  reasonInfo: StepReasonVoicingResolutionInfo,
  settings?: Settings,
) {
  const { innerVoicingResult } = (reasonInfo as StepReasonVoicingResolutionInfo);
  const baseIndexes = Array.from(innerVoicingResult.indexMap.values());
  const baseNotes = baseIndexes.map(i=>settings?.base?.[i]);

  return "Resolution Voicing ("
      + innerVoicingResult.innerVoicing
      + ", notes=[" + (baseNotes ?? baseIndexes).join("-") + "])";
}
