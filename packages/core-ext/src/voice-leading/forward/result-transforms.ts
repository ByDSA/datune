import { Chord } from "@datune/core/chords/chromatic";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { PitchArray, Pitch } from "@datune/core/pitches/chromatic";
import { SPN } from "@datune/core/spns/chromatic";
import { SPNArray } from "@datune/core";
import { Target } from "../steps/Step";

export function targetsToChords(targets: Target[]): Chord[] {
  return targets.map(targetToChord).filter((c) => !!c) as Chord[];
}

function targetToChord(target: Target): Chord | null {
  const pitchArray = targetToPitches(target);

  if (pitchArray.length === 0)
    return null;

  return fromPitches(...pitchArray as PitchArray);
}

function targetToSpns(target: Target): SPN[] {
  return target.filter(n=>!!n);
}

export function targetsToSpnsArray(targets: Target[]): SPNArray[] {
  return targets.map(targetToSpns).filter(a=>a.length > 0) as SPNArray[];
}

function targetToPitches(target: Target): Pitch[] {
  return targetToSpns(target).map(n => n.pitch) as Pitch[];
}
