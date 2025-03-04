import type { PitchSet } from "../PitchSet";
import type { Interval } from "intervals/chromatic";
import { Pitches, PitchArray, Pitch } from "pitches/chromatic";
import { from } from "../building";

export function add(self: PitchSet, interval: Interval): PitchSet {
  const selfPitches = self.pitches;
  const newPitches: Pitch[] = [];

  selfPitches.forEach((pitch) => {
    const newPitch = Pitches.add(pitch, interval);

    newPitches.push(newPitch);
  } );

  return from(...newPitches as PitchArray);
}

export function sub(obj: PitchSet, interval: Interval): PitchSet {
  return add(obj, -interval);
}
