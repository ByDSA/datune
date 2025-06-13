import type { IntervalArray } from "./Array";
import { Interval } from "./Interval";
import * as Building from "./building";
import * as Constants from "./constants";
import * as Modifiers from "./modifiers";
import * as DeltaRootIntervals from "./conversions";

const staticModule = {
  ...Building,
  ...Constants,
  ...Modifiers,
  ...DeltaRootIntervals,
};

export {
  Interval,
  IntervalArray,
  staticModule as Intervals,
};
