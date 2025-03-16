import type { SingleStepArray } from "voice-leading/steps";
import { Arrays } from "@datune/utils";
import { lockr } from "@datune/utils/immutables";
import { fromIntervals as compositeStepFromIntervals } from "voice-leading/steps/composite/building";
import { X0_1, X0_2, X0_S1, X0_S2, X1_1, X1_2, X1_S1, X1_S2, X2_1, X2_S1 } from "voice-leading/steps/single/constants";

export type ResolutionSteps = Arrays.NonEmpty<SingleStepArray>;

export const DEFAULT_TRITONE_RESOLUTION: ResolutionSteps = [
  [X0_1, X1_2],
  [X0_1, X1_S1],
  [X0_1, X1_S2],
  [X0_2, X1_1],
  [X0_2, X1_S1],
  [X0_2, X1_S2],
  [X0_S1, X1_1],
  [X0_S1, X1_2],
  [X0_S1, X1_S2],
  [X0_S2, X1_1],
  [X0_S2, X1_2],
  [X0_S2, X1_S1],
];
lockr(DEFAULT_TRITONE_RESOLUTION);

export const DEFAULT_AUGMENTED_RESOLUTION: ResolutionSteps = [
  [X0_1],
  [X0_S1],
  [X1_1],
  [X1_S1],
  [X2_1],
  [X2_S1],
  [X0_1, X1_1],
  [X1_1, X2_1],
  [X0_1, X2_1],
  [X0_S1, X1_S1],
  [X1_S1, X2_S1],
  [X0_S1, X2_S1],
  [X0_1, X1_S1],
  [X0_S1, X1_1],
  [X1_1, X2_S1],
  [X1_S1, X2_1],
  [X0_1, X2_S1],
  [X0_S1, X2_1],
];
lockr(DEFAULT_AUGMENTED_RESOLUTION);

export const DEFAULT_M2_RESOLUTION: ResolutionSteps = [
  compositeStepFromIntervals(-1, 0).singleSteps,
  compositeStepFromIntervals(-2, 0).singleSteps,
  compositeStepFromIntervals(0, 1).singleSteps,
  compositeStepFromIntervals(0, 2).singleSteps,
];
lockr(DEFAULT_M2_RESOLUTION);

export const DEFAULT_MINOR7_RESOLUTION: ResolutionSteps = [
  compositeStepFromIntervals(1, 0).singleSteps,
  compositeStepFromIntervals(2, 0).singleSteps,
  compositeStepFromIntervals(0, -1).singleSteps,
  compositeStepFromIntervals(0, -2).singleSteps,
];
lockr(DEFAULT_MINOR7_RESOLUTION);
