import type { IntervalSet } from "sets/interval-sets/alt";
import type { Pitch } from "pitches/alt";
import type { Chord } from "../Chord";
import type { IntervalArray } from "intervals/alt";
import { rootIntervals } from "pitches/alt/modifiers";
import { assertNotEmptyIntervalSet } from "sets/interval-sets/asserts";
import { fromPitches } from "./pitches";

export function fromRootIntervalSet(root: Pitch, intervalSet: IntervalSet): Chord {
  assertNotEmptyIntervalSet(intervalSet);
  const pitches = rootIntervals(root, intervalSet.rootIntervals as IntervalArray);

  return fromPitches(...pitches);
}
