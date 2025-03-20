import { Interval } from "@datune/core/intervals/chromatic";
import { compositeStepFromIntervals } from "./building";

export const CS_NONE: Interval = 9999;

export const CS_KEEP_U1 = compositeStepFromIntervals(0, 1);

export const CS_KEEP_U2 = compositeStepFromIntervals(0, 2);

export const CS_KEEP_D1 = compositeStepFromIntervals(0, -1);

export const CS_KEEP_D2 = compositeStepFromIntervals(0, -2);

export const CS_KEEP_NULL = compositeStepFromIntervals(0, null);

export const CS_U1_KEEP = compositeStepFromIntervals(1, 0);

export const CS_U1_U1 = compositeStepFromIntervals(1, 1);

export const CS_U1_U2 = compositeStepFromIntervals(1, 2);

export const CS_U1_D1 = compositeStepFromIntervals(1, -1);

export const CS_U1_D2 = compositeStepFromIntervals(1, -2);

export const CS_U1_NULL = compositeStepFromIntervals(1, null);

export const CS_U2_KEEP = compositeStepFromIntervals(2, 0);

export const CS_U2_U1 = compositeStepFromIntervals(2, 1);

export const CS_U2_U2 = compositeStepFromIntervals(2, 2);

export const CS_U2_D1 = compositeStepFromIntervals(2, -1);

export const CS_U2_D2 = compositeStepFromIntervals(2, -2);

export const CS_U2_NULL = compositeStepFromIntervals(2, null);

export const CS_D1_KEEP = compositeStepFromIntervals(-1, 0);

export const CS_D1_U1 = compositeStepFromIntervals(-1, 1);

export const CS_D1_U2 = compositeStepFromIntervals(-1, 2);

export const CS_D1_D1 = compositeStepFromIntervals(-1, -1);

export const CS_D1_D2 = compositeStepFromIntervals(-1, -2);

export const CS_D1_NULL = compositeStepFromIntervals(-1, null);

export const CS_D2_KEEP = compositeStepFromIntervals(-2, 0);

export const CS_D2_U1 = compositeStepFromIntervals(-2, 1);

export const CS_D2_U2 = compositeStepFromIntervals(-2, 2);

export const CS_D2_D1 = compositeStepFromIntervals(-2, -1);

export const CS_D2_D2 = compositeStepFromIntervals(-2, -2);

export const CS_D2_NULL = compositeStepFromIntervals(-2, null);

export const CS_NULL_KEEP = compositeStepFromIntervals(null, 0);

export const CS_NULL_U1 = compositeStepFromIntervals(null, 1);

export const CS_NULL_U2 = compositeStepFromIntervals(null, 2);

export const CS_NULL_D1 = compositeStepFromIntervals(null, -1);

export const CS_NULL_D2 = compositeStepFromIntervals(null, -2);
