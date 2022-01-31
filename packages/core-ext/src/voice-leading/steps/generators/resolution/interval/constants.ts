import { lockr } from "@datune/utils/immutables";
import { _0_1, _0_2, _0_S1, _0_S2, _1_1, _1_2, _1_S1, _1_S2, _2_1, _2_S1 } from "voice-leading/steps/single";

export const DEFAULT_TRITONE_RESOLUTION = [
  [_0_1, _1_2],
  [_0_1, _1_S1],
  [_0_1, _1_S2],
  [_0_2, _1_1],
  [_0_2, _1_S1],
  [_0_2, _1_S2],
  [_0_S1, _1_1],
  [_0_S1, _1_2],
  [_0_S1, _1_S2],
  [_0_S2, _1_1],
  [_0_S2, _1_2],
  [_0_S2, _1_S1],
];

lockr(DEFAULT_TRITONE_RESOLUTION);

export const DEFAULT_AUGMENTED_RESOLUTION = [
  [_0_1],
  [_0_S1],
  [_1_1],
  [_1_S1],
  [_2_1],
  [_2_S1],
  [_0_1, _1_1],
  [_1_1, _2_1],
  [_0_1, _2_1],
  [_0_S1, _1_S1],
  [_1_S1, _2_S1],
  [_0_S1, _2_S1],
  [_0_1, _1_S1],
  [_0_S1, _1_1],
  [_1_1, _2_S1],
  [_1_S1, _2_1],
  [_0_1, _2_S1],
  [_0_S1, _2_1],
];

lockr(DEFAULT_AUGMENTED_RESOLUTION);
