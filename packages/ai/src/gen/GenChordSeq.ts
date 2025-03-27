import { Chord } from "@datune/core/chords/chromatic";
import { Funcs as F } from "@datune/core";
import { Func } from "@datune/core/functions/chromatic";
import { Key } from "@datune/core/keys/chromatic";
import { from } from "@datune/core/keys/chromatic/building";
import { MusicalDurations as MD } from "@datune/core";
import { intervalBetween } from "datils/math/intervals";
import { Scales as S } from "@datune/core";
import { randomN } from "datils/math";
import { GenSeq } from "./GenSeq";

export class GenChordSeq extends GenSeq {
  generate() {
    const tonalApproach = this.tonalApporach;

    for (
      let time = MD.ZERO, toTime = time;
      time < tonalApproach.keySequence.duration;
      time = toTime
    ) {
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
        interval: intervalBetween(time, toTime),
      } );

      const keyChord = pickKeyChord(key, func, chord);

      tonalApproach.keyChordSequence.add( {
        event: keyChord,
        interval: intervalBetween(time, toTime),
      } );
    }
  }
}

function pickKeyChord(originalKey: Key, func: Func, _chord: Chord): Key {
  const [root] = func.getChord(originalKey).pitches;
  const available: Key[] = [];

  switch (func) {
    case F.I:
    case F.bIII:
      available.push(from(root, S.MAJOR));
      break;
    case F.IIm:
      available.push(from(root, S.DORIAN));
      break;
    case F.IIIm:
    case F.IVm:
      available.push(from(root, S.PHRYGIAN));
      break;
    case F.IV:
    case F.bVI:
      available.push(from(root, S.LYDIAN));
      break;
    case F.V:
    case F.bVII:
    case F.V7:
      available.push(from(root, S.MIXOLYDIAN));
      break;
    case F.VIm:
    case F.Im:
      available.push(from(root, S.MINOR));
      break;
    case F.VII0:
    case F.II0:
      available.push(from(root, S.LOCRIAN));
      break;
    default:
      available.push(from(root, S.CHROMATIC));
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

  return available[randomN(available.length)];
}
