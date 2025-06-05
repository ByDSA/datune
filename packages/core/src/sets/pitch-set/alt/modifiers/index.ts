import type { PitchSet } from "../PitchSet";
import type { Interval } from "intervals/alt";
import { type PitchArray, type Pitch } from "pitches/alt";
import { shift as pitchAdd } from "pitches/alt/modifiers/shift";
import { shiftDown as pitchSub } from "pitches/alt/modifiers/shift-down";
import { fromPitches } from "../building";

export function shift(obj: PitchSet, interval: Interval): PitchSet {
  const selfPitches = obj.set;
  const newPitches: Pitch[] = [];

  selfPitches.forEach((pitch) => {
    const newPitch = pitchAdd(pitch, interval);

    newPitches.push(newPitch);
  } );

  return fromPitches(...newPitches as PitchArray);
}

export function shiftDown(obj: PitchSet, interval: Interval): PitchSet {
  const selfPitches = obj.set;
  const newPitches: Pitch[] = [];

  selfPitches.forEach((pitch) => {
    const newPitch = pitchSub(pitch, interval);

    newPitches.push(newPitch);
  } );

  return fromPitches(...newPitches as PitchArray);
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

  const newPitches = obj.set;

  pitches.forEach((pitch) => {
    newPitches.delete(pitch);
  } );

  return fromPitches(...newPitches);
}
