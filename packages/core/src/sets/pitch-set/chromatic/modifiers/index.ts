import type { PitchSet } from "../PitchSet";
import type { Interval } from "intervals/chromatic";
import { type PitchArray, type Pitch, Pitches } from "pitches/chromatic";
import { add as pitchAdd } from "pitches/chromatic/modifiers";
import { fromPitches } from "../building";

export function shift(obj: PitchSet, interval: Interval): PitchSet {
  const newPitches: Pitch[] = [];

  obj.forEach((pitch) => {
    const newPitch = pitchAdd(pitch, interval);

    newPitches.push(newPitch);
  } );

  return fromPitches(...newPitches as PitchArray);
}

export function shiftDown(obj: PitchSet, interval: Interval): PitchSet {
  return shift(obj, -interval);
}

export function add(
  obj: PitchSet,
  ...pitches: PitchArray
): PitchSet {
  if (pitches.length === 0)
    return obj;

  return fromPitches(...obj.pitches, ...pitches as PitchArray);
}

export function remove(
  obj: PitchSet,
  ...pitches: PitchArray
): PitchSet {
  if (pitches.length === 0)
    return obj;

  const removeSet = new Set<Pitch>(pitches);
  const newSet = new Set<Pitch>();

  obj.forEach((pitch) => {
    if (!removeSet.has(pitch))
      newSet.add(pitch);
  } );

  return fromPitches(...newSet);
}

export function reverse(obj: PitchSet): PitchSet {
  const reversedPitches: Pitch[] = [];

  for (const p of Pitches.ALL) {
    if (!obj.has(p))
      reversedPitches.push(p);
  }

  return fromPitches(...reversedPitches);
}
