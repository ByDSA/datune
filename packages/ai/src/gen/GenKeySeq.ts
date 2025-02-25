/* eslint-disable @typescript-eslint/no-unused-vars */
import { TonalApproach } from "@datune/analyzer";
import { MusicalDuration } from "@datune/core";
import { Key } from "@datune/core/keys/chromatic";
import { LONGA, ZERO } from "@datune/core/time";
import { random } from "@datune/utils";
import { intervalOf } from "@datune/utils/math";
import GenSeq from "./GenSeq";

export default class GenKeySeq extends GenSeq {
  constructor(tonalApporach: TonalApproach, private keys: Key[]) {
    super(tonalApporach);
  }

  generate() {
    const keySeq = this.tonalApporach.keySequence;

    keySeq.clear();
    let prevKey: Key | undefined;
    let prevDuration: MusicalDuration | undefined;
    let time: MusicalDuration = ZERO;

    while (time < this.tonalApporach.maxDuration) {
      time = keySeq.duration;
      const key = this.#pickKey(prevKey, time);
      const duration = pickDuration(prevDuration, time);
      let toTime = time + duration;

      toTime = this.limitMaxDuration(toTime);
      keySeq.add( {
        event: key,
        interval: intervalOf(time, toTime),
      } );
    }
  }

  #pickKey(_prevKey: Key | undefined, _time: MusicalDuration): Key {
    return this.keys[random(this.keys.length)];
  }
}

function pickDuration(
  prevDuration: MusicalDuration | undefined,
  time: MusicalDuration,
): MusicalDuration {
  return LONGA * (40 * (2 + random(2)));
}
