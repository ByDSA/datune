import { Interval } from "@datune/core/intervals/chromatic";
import { fromIntervals } from "./building";

export const NONE: Interval = 9999;

export const KEEP_U1 = fromIntervals(0, 1);

export const KEEP_U2 = fromIntervals(0, 2);

export const KEEP_D1 = fromIntervals(0, -1);

export const KEEP_D2 = fromIntervals(0, -2);

export const KEEP_NULL = fromIntervals(0, null);

export const U1_KEEP = fromIntervals(1, 0);

export const U1_U1 = fromIntervals(1, 1);

export const U1_U2 = fromIntervals(1, 2);

export const U1_D1 = fromIntervals(1, -1);

export const U1_D2 = fromIntervals(1, -2);

export const U1_NULL = fromIntervals(1, null);

export const U2_KEEP = fromIntervals(2, 0);

export const U2_U1 = fromIntervals(2, 1);

export const U2_U2 = fromIntervals(2, 2);

export const U2_D1 = fromIntervals(2, -1);

export const U2_D2 = fromIntervals(2, -2);

export const U2_NULL = fromIntervals(2, null);

export const D1_KEEP = fromIntervals(-1, 0);

export const D1_U1 = fromIntervals(-1, 1);

export const D1_U2 = fromIntervals(-1, 2);

export const D1_D1 = fromIntervals(-1, -1);

export const D1_D2 = fromIntervals(-1, -2);

export const D1_NULL = fromIntervals(-1, null);

export const D2_KEEP = fromIntervals(-2, 0);

export const D2_U1 = fromIntervals(-2, 1);

export const D2_U2 = fromIntervals(-2, 2);

export const D2_D1 = fromIntervals(-2, -1);

export const D2_D2 = fromIntervals(-2, -2);

export const D2_NULL = fromIntervals(-2, null);

export const NULL_KEEP = fromIntervals(null, 0);

export const NULL_U1 = fromIntervals(null, 1);

export const NULL_U2 = fromIntervals(null, 2);

export const NULL_D1 = fromIntervals(null, -1);

export const NULL_D2 = fromIntervals(null, -2);
