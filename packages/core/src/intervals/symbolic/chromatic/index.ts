import type { IntervalArray } from "./Array";
import type { Interval } from "./Interval";
import * as Building from "./building";
import * as Constants from "./constants";
import * as Modifiers from "./modifiers";

const staticModule = {
  ...Building,
  ...Constants,
  ...Modifiers,
};

export {
  Interval,
  IntervalArray,
  staticModule as Intervals,
};
