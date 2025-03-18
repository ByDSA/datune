import { Spn, Chord, PitchArray } from "@datune/core";
import { fromPitches } from "@datune/core/chords/octave/chromatic/building/pitches";
import { Pitch } from "@datune/core/pitches/chromatic";
import { SpnArray } from "@datune/core";

export type Target = (Spn | null)[];

export function targetGetId(target: Target): string {
  return target.map(n => n?.toString() ?? "null").join(",");
}

export function targetsToChords(targets: Target[]): Chord[] {
  return targets.map(targetToChord).filter((c) => !!c) as Chord[];
}

export function targetToChord(target: Target): Chord | null {
  const pitchArray = targetToPitches(target);

  if (pitchArray.length === 0)
    return null;

  return fromPitches(...pitchArray as PitchArray);
}

function targetToSpns(target: Target): Spn[] {
  return target.filter(n=>!!n);
}

export function targetsToSpnsArray(targets: Target[]): SpnArray[] {
  return targets.map(targetToSpns).filter(a=>a.length > 0) as SpnArray[];
}

function targetToPitches(target: Target): Pitch[] {
  return targetToSpns(target).map(n => n.pitch) as Pitch[];
}
