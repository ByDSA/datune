import { TonalApproach } from "@datune/analyzer";
import { Key, MusicalDuration } from "@datune/core";
import { random } from "@datune/utils";
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
        let time: MusicalDuration = MusicalDuration.ZERO;
        while (time < this.tonalApporach.maxDuration) {
            time = keySeq.duration;
            let key = this._pickKey(prevKey, time);
            const duration = this._pickDuration(prevDuration, time);
            let toTime = time.withAdd(duration);
            toTime = this.limitMaxDuration(toTime);
            keySeq.addEvent(key, time, toTime);
        }
    }

    private _pickDuration(prevDuration: MusicalDuration | undefined, time: MusicalDuration): MusicalDuration {
        return MusicalDuration.LONGA.withMult(40 * (2 + random(2)));
    }

    private _pickKey(prevKey: Key | undefined, time: MusicalDuration): Key {
        return this.keys[random(this.keys.length)];
    }
}