import type { SingleStepArray } from "voice-leading/steps";
import { NonEmptyArray } from "datils/datatypes";
import { deepFreeze } from "datils/datatypes/objects";
import { compositeStepFromIntervals } from "voice-leading/steps/composite/building";
import { SS_0_1, SS_0_2, SS_0_S1, SS_0_S2, SS_1_1, SS_1_2, SS_1_S1, SS_1_S2, SS_2_1, SS_2_S1 } from "voice-leading/steps/single/constants";

export type ResolutionSteps = NonEmptyArray<SingleStepArray>;

export const DEFAULT_TRITONE_RESOLUTION: ResolutionSteps = [
  [SS_0_1, SS_1_2],
  [SS_0_1, SS_1_S1],
  [SS_0_1, SS_1_S2],
  [SS_0_2, SS_1_1],
  [SS_0_2, SS_1_S1],
  [SS_0_2, SS_1_S2],
  [SS_0_S1, SS_1_1],
  [SS_0_S1, SS_1_2],
  [SS_0_S1, SS_1_S2],
  [SS_0_S2, SS_1_1],
  [SS_0_S2, SS_1_2],
  [SS_0_S2, SS_1_S1],
];
deepFreeze(DEFAULT_TRITONE_RESOLUTION);

export const DEFAULT_AUGMENTED_RESOLUTION: ResolutionSteps = [
  [SS_0_1],
  [SS_0_S1],
  [SS_1_1],
  [SS_1_S1],
  [SS_2_1],
  [SS_2_S1],
  [SS_0_1, SS_1_1],
  [SS_1_1, SS_2_1],
  [SS_0_1, SS_2_1],
  [SS_0_S1, SS_1_S1],
  [SS_1_S1, SS_2_S1],
  [SS_0_S1, SS_2_S1],
  [SS_0_1, SS_1_S1],
  [SS_0_S1, SS_1_1],
  [SS_1_1, SS_2_S1],
  [SS_1_S1, SS_2_1],
  [SS_0_1, SS_2_S1],
  [SS_0_S1, SS_2_1],
];
deepFreeze(DEFAULT_AUGMENTED_RESOLUTION);

export const DEFAULT_M2_RESOLUTION: ResolutionSteps = [
  compositeStepFromIntervals(-1, 0).singleSteps,
  compositeStepFromIntervals(-2, 0).singleSteps,
  compositeStepFromIntervals(0, 1).singleSteps,
  compositeStepFromIntervals(0, 2).singleSteps,
];
deepFreeze(DEFAULT_M2_RESOLUTION);

export const DEFAULT_MINOR7_RESOLUTION: ResolutionSteps = [
  compositeStepFromIntervals(1, 0).singleSteps,
  compositeStepFromIntervals(2, 0).singleSteps,
  compositeStepFromIntervals(0, -1).singleSteps,
  compositeStepFromIntervals(0, -2).singleSteps,
];
deepFreeze(DEFAULT_MINOR7_RESOLUTION);
