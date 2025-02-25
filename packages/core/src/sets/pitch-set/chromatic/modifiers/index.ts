/* eslint-disable import/prefer-default-export */
import { Interval } from "intervals/chromatic";
import { add as pitchAdd, Array as PitchArray, Pitch } from "pitches/chromatic";
import { from } from "../building";
import NoteSet from "../NoteSet";

export function add(self: NoteSet, interval: Interval): NoteSet {
  const selfPitches = self.pitches;
  const newPitches: Pitch[] = [];

  selfPitches.forEach((pitch) => {
    const newPitch = pitchAdd(pitch, interval);

    newPitches.push(newPitch);
  } );

  return from(...newPitches as PitchArray);
}

export function sub(obj: NoteSet, interval: Interval): NoteSet {
  return add(obj, -interval);
}
