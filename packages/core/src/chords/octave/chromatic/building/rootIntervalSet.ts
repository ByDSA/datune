import type { IntervalSet } from "sets/interval-sets/chromatic";
import type { Pitch } from "pitches/chromatic";
import type { Chord } from "../Chord";
import type { IntervalArray } from "chromatic";
import { Pitches as P } from "pitches/chromatic";
import { assertNotEmptyIntervalSet } from "sets/interval-sets/asserts";
import { fromPitches } from "./pitches";

export function fromRootIntervalSet(root: Pitch, intervalSet: IntervalSet): Chord {
  assertNotEmptyIntervalSet(intervalSet);

  const pitches = P.rootIntervals(root, intervalSet.rootIntervals as IntervalArray);

  return fromPitches(...pitches);
}
