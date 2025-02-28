import { from } from "../building";
import type { NoteSet } from "../NoteSet";
import type { Interval } from "intervals/chromatic";
import { Pitches, PitchArray, Pitch } from "pitches/chromatic";

export function add(self: NoteSet, interval: Interval): NoteSet {
  const selfPitches = self.pitches;
  const newPitches: Pitch[] = [];

  selfPitches.forEach((pitch) => {
    const newPitch = Pitches.add(pitch, interval);

    newPitches.push(newPitch);
  } );

  return from(...newPitches as PitchArray);
}

export function sub(obj: NoteSet, interval: Interval): NoteSet {
  return add(obj, -interval);
}
