/* eslint-disable @typescript-eslint/no-unused-vars */
import { Chord } from "@datune/core/chords/chromatic";
import { bIII, bVI, bVII, HarmonicFunction, I, II0, IIIm, IIm, Im, IV, IVm, V, V7, VII0, VIm } from "@datune/core/functions/chromatic";
import { from as keyFrom, Key } from "@datune/core/keys/chromatic";
import { ZERO } from "@datune/core/time";
import { random } from "@datune/utils";
import { intervalOf } from "@datune/utils/math";
import { CHROMATIC, DORIAN, LOCRIAN, LYDIAN, MAJOR, MINOR, MIXOLYDIAN, PHRYGIAN } from "@datune/core/scales/chromatic";
import GenSeq from "./GenSeq";

export default class GenChordSeq extends GenSeq {
  generate() {
    const tonalApproach = this.tonalApporach;

    for (let time = ZERO, toTime = time; time < tonalApproach.keySequence.duration; time = toTime) {
      const [keyNode] = tonalApproach.keySequence.get( {
        at: time,
      } );
      const key: Key = <Key>keyNode?.event;
      const [fNode] = tonalApproach.funcSequence.get( {
        at: time,
      } );

      if (!fNode)
        throw new Error(`${time} ${tonalApproach.funcSequence.duration}`);

      const func = fNode.event as HarmonicFunction;

      toTime = fNode.interval.to;

      const chord = func.getChord(key);

      tonalApproach.chordSequence.add( {
        event: chord,
        interval: intervalOf(time, toTime),
      } );

      const keyChord = pickKeyChord(key, func, chord);

      tonalApproach.keyChordSequence.add( {
        event: keyChord,
        interval: intervalOf(time, toTime),
      } );
    }
  }
}

function pickKeyChord(originalKey: Key, f: HarmonicFunction, chord: Chord): Key {
  const [root] = f.getChord(originalKey).pitches;
  const available: Key[] = [];

  switch (f) {
    case I:
    case bIII:
      available.push(keyFrom(root, MAJOR));
      break;
    case IIm:
      available.push(keyFrom(root, DORIAN));
      break;
    case IIIm:
    case IVm:
      available.push(keyFrom(root, PHRYGIAN));
      break;
    case IV:
    case bVI:
      available.push(keyFrom(root, LYDIAN));
      break;
    case V:
    case bVII:
    case V7:
      available.push(keyFrom(root, MIXOLYDIAN));
      break;
    case VIm:
    case Im:
      available.push(keyFrom(root, MINOR));
      break;
    case VII0:
    case II0:
      available.push(keyFrom(root, LOCRIAN));
      break;
    default:
      available.push(keyFrom(root, CHROMATIC));
      break;
  }
  // let chord = f.getChord(originalKey);
  // switch (chord.voicing) {
  //     case Pattern.TRIAD_MAJOR:
  //         available.push(
  //             keyFrom(root, Scale.MAJOR),
  //             keyFrom(root, Scale.LYDIAN),
  //             keyFrom(root, Scale.MIXOLYDIAN),
  //         );
  //         break;
  //     case Pattern.SEVENTH_MAJ7:
  //         available.push(
  //             keyFrom(root, Scale.MAJOR),
  //             keyFrom(root, Scale.LYDIAN)
  //         );
  //         break;
  //     case Pattern.TRIAD_MINOR:
  //         available.push(
  //             keyFrom(root, Scale.MINOR),
  //             keyFrom(root, Scale.DORIAN),
  //             keyFrom(root, Scale.PHRYGIAN)
  //         );
  //         break;
  //     case Pattern.SEVENTH_MINOR:
  //         available.push(
  //             keyFrom(root, Scale.MINOR),
  //             keyFrom(root, Scale.DORIAN),
  //             keyFrom(root, Scale.PHRYGIAN)
  //         );
  //         break;
  //     case Pattern.TRIAD_DIMINISHED:
  //     case Pattern.SEVENTH_b5:
  //         return keyFrom(root, Scale.LOCRIAN);
  // }

  if (available.length === 0)
    return originalKey;

  return available[random(available.length)];
}
