import { Interval, SpnArray } from "@datune/core";
import { InnerIntervalSetResult } from "interval-sets/findInnerIntervalSets";
import { StepReason } from "./StepReason";

export type StepReasonInfo = {
    reason: StepReason;
};

export type StepReasonIntervalSetResolutionInfo = StepReasonInfo & {
    innerIntervalSetResult: InnerIntervalSetResult;
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
    case StepReason.RESOLUTION_INTERVAL_SET:
      return stringifyStepReasonIntervalSetResolutionInfo(
        reasonInfo as StepReasonIntervalSetResolutionInfo,
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

export function stringifyStepReasonIntervalSetResolutionInfo(
  reasonInfo: StepReasonIntervalSetResolutionInfo,
  settings?: Settings,
) {
  const { innerIntervalSetResult } = (reasonInfo as StepReasonIntervalSetResolutionInfo);
  const baseIndexes = Array.from(innerIntervalSetResult.indexMap.values());
  const baseNotes = baseIndexes.map(i=>settings?.base?.[i]);

  return "Resolution IntervalSet ("
      + innerIntervalSetResult.innerIntervalSet
      + ", notes=[" + (baseNotes ?? baseIndexes).join("-") + "])";
}
