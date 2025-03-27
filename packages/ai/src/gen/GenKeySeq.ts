import { TonalApproach } from "@datune/analyzer";
import { MusicalDuration } from "@datune/core";
import { Key } from "@datune/core/keys/chromatic";
import { MusicalDurations as MD } from "@datune/core";
import { intervalBetween } from "datils/math/intervals";
import { randomN } from "datils/math";
import { GenSeq } from "./GenSeq";

export class GenKeySeq extends GenSeq {
  constructor(tonalApporach: TonalApproach, private keys: Key[]) {
    super(tonalApporach);
  }

  generate() {
    const keySeq = this.tonalApporach.keySequence;

    keySeq.clear();
    let prevKey: Key | undefined;
    let prevDuration: MusicalDuration | undefined;
    let time: MusicalDuration = MD.ZERO;

    while (time < this.tonalApporach.maxDuration) {
      time = keySeq.duration;
      const key = this.#pickKey(prevKey, time);
      const duration = pickDuration(prevDuration, time);
      let toTime = time + duration;

      toTime = this.limitMaxDuration(toTime);
      keySeq.add( {
        event: key,
        interval: intervalBetween(time, toTime),
      } );
    }
  }

  #pickKey(_prevKey: Key | undefined, _time: MusicalDuration): Key {
    return this.keys[randomN(this.keys.length)];
  }
}

function pickDuration(
  _prevDuration: MusicalDuration | undefined,
  _time: MusicalDuration,
): MusicalDuration {
  return MD.LONGA * (40 * (2 + randomN(2)));
}
