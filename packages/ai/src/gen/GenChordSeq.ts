import { Chord } from "@datune/core/chords/chromatic";
import { bIII, bVI, bVII, I, II0, IIIm, IIm, Im, IV, IVm, V, V7, VII0, VIm } from "@datune/core/functions/chromatic/degree-function/constants";
import { Func } from "@datune/core/functions/chromatic";
import { Key } from "@datune/core/keys/chromatic";
import { from } from "@datune/core/keys/chromatic/building";
import { ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { random } from "@datune/utils";
import { intervalOf } from "@datune/utils/math";
import { CHROMATIC, DORIAN, LOCRIAN, LYDIAN, MAJOR, MINOR, MIXOLYDIAN, PHRYGIAN } from "@datune/core/scales/symbolic/chromatic/constants";
import { GenSeq } from "./GenSeq";

export class GenChordSeq extends GenSeq {
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

      const func = fNode.event as Func;

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

function pickKeyChord(originalKey: Key, func: Func, _chord: Chord): Key {
  const [root] = func.getChord(originalKey).pitches;
  const available: Key[] = [];

  switch (func) {
    case I:
    case bIII:
      available.push(from(root, MAJOR));
      break;
    case IIm:
      available.push(from(root, DORIAN));
      break;
    case IIIm:
    case IVm:
      available.push(from(root, PHRYGIAN));
      break;
    case IV:
    case bVI:
      available.push(from(root, LYDIAN));
      break;
    case V:
    case bVII:
    case V7:
      available.push(from(root, MIXOLYDIAN));
      break;
    case VIm:
    case Im:
      available.push(from(root, MINOR));
      break;
    case VII0:
    case II0:
      available.push(from(root, LOCRIAN));
      break;
    default:
      available.push(from(root, CHROMATIC));
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
