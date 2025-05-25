import type { Pitch, PitchArray } from "pitches/chromatic";
import type { Interval } from "intervals/chromatic";
import { Arrays } from "datils/datatypes/arrays";
import { from } from "../building/pitches";
import { Chord } from "../Chord";

export function inv(obj: Chord, n: number = 1): Chord {
  if (n === 0)
    return obj;

  const prevBass = obj.bass;
  const pitchSet = obj.pitchSet.withAdd(prevBass);
  const { pitches } = pitchSet;
  const bassIndex = pitches.indexOf(prevBass);

  Arrays.rotateLeft(pitches, bassIndex + n);

  return from( {
    pitchSet,
    root: obj.root,
    bass: pitches[0],
  } );
}

export function shift(obj: Chord, interval: Interval): Chord {
  return from( {
    pitchSet: obj.pitchSet.withShift(interval),
    root: obj.root.withAdd(interval),
    bass: obj.bass.withAdd(interval),
  } );
}

export function shiftDown(obj: Chord, interval: Interval): Chord {
  return from( {
    pitchSet: obj.pitchSet.withShiftDown(interval),
    root: obj.root.withSub(interval),
    bass: obj.bass.withSub(interval),
  } );
}

export function bass(obj: Chord, pitchBass: Pitch): Chord {
  return from( {
    pitchSet: obj.pitchSet.withAdd(pitchBass),
    root: obj.root,
    bass: pitchBass,
  } );
}

export function root(obj: Chord, pitchRoot: Pitch): Chord {
  return from( {
    pitchSet: obj.pitchSet,
    root: pitchRoot,
    bass: obj.bass,
  } );
}

export function add(obj: Chord, ...pitches: PitchArray): Chord {
  return from( {
    pitchSet: obj.pitchSet.withAdd(...pitches),
    root: obj.root,
    bass: obj.bass,
  } );
}

export function remove(obj: Chord, ...pitches: PitchArray): Chord {
  return from( {
    pitchSet: obj.pitchSet.withRemove(...pitches),
    root: obj.root,
    bass: obj.bass,
  } );
}
