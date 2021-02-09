import { MainFunc, TonalApproach } from "@datune/analyzer";
import { MusicalDuration } from "@datune/core";
import { random, TemporalNode } from "@datune/utils";
import { GenSeq } from "./GenSeq";
import { limitTime } from "./utils";

type Node = TemporalNode<MainFunc, MusicalDuration>;
export class GenMainFuncSeq extends GenSeq {
    private lastTonicTime: MusicalDuration | undefined;
    constructor(tonalApporach: TonalApproach) {
        super(tonalApporach);
    }

    generate() {
        const mainFuncSeq = this.tonalApporach.mainFuncSequence;
        mainFuncSeq.clear();
        let prevMainFunc: Node | undefined;
        let toTime: MusicalDuration;
        for (let time = MusicalDuration.ZERO; time < this.tonalApporach.maxDuration; time = toTime) {

            const duration = this._pickDuration(prevMainFunc, time);
            toTime = time.withAdd(duration);
            toTime = this._limitTime(toTime);
            let mainFunc = this._pickMainFunc(prevMainFunc, time, toTime);

            prevMainFunc = mainFuncSeq.addEvent(mainFunc, time, toTime);
        }
    }

    private _limitTime(m: MusicalDuration): MusicalDuration {
        return limitTime(m, this.tonalApporach.maxDuration);
    }

    private _pickDuration(prevMainFunc: Node | undefined, currentTime: MusicalDuration): MusicalDuration {
        let duration = MusicalDuration.WHOLE.withMult(1 + random(2));
        return this.limitNextMeasure(duration, currentTime);
    }

    private _pickMainFunc(prevMainFunc: Node | undefined, time: MusicalDuration, toTime: MusicalDuration): MainFunc {
        const maxLastTonicTime = MusicalDuration.WHOLE.withMult(4);

        if (this.hasNewKeyAt(time) || this.lastTonicTime && time.withSub(this.lastTonicTime) >= maxLastTonicTime || !prevMainFunc) {
            this.lastTonicTime = time;
            return MainFunc.TONIC;
        }

        let availableMainFuncs: MainFunc[] = [
        ];
        switch (prevMainFunc.event) {
            case MainFunc.TONIC:
                availableMainFuncs.push(MainFunc.SUBDOMINANT, MainFunc.DOMINANT);
                break;
            case MainFunc.SUBDOMINANT:
                availableMainFuncs.push(MainFunc.DOMINANT);
                if (this.isNewMeasure(time))
                    availableMainFuncs.push(MainFunc.TONIC);
                break;
            case MainFunc.DOMINANT:
                if (this.isNewMeasure(time))
                    availableMainFuncs.push(MainFunc.TONIC);
                else
                    availableMainFuncs.push(MainFunc.SUBDOMINANT);

                break;
        }

        let ret = availableMainFuncs[random(availableMainFuncs.length)];
        return ret;
    }
}