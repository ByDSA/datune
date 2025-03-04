import type { RhythmPattern } from "./Pattern";
import type { ArrayRhythm } from "./array";
import * as Building from "./building";
import * as Constants from "./constants";
import * as Modifiers from "./modifiers";
import * as Euclidean from "./euclidean";

const { initialize, ...publicConstants } = Constants;
const staticModule = {
  ...Building,
  ...publicConstants,
  ...Modifiers,
  ...Euclidean,
};

export {
  RhythmPattern,
  ArrayRhythm,
  staticModule as RhythmPatterns,
};
