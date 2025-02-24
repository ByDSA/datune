/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainFunc, TonalApproach } from "@datune/analyzer";
import { MusicalDuration } from "@datune/core";
import { WHOLE, ZERO } from "@datune/core/time";
import { random, TemporalNode } from "@datune/utils";
import { intervalOf } from "@datune/utils/math";
import GenSeq from "./GenSeq";
import { limitTime } from "./utils";

type Node = TemporalNode<MainFunc>;
export default class GenMainFuncSeq extends GenSeq {
  constructor(tonalApporach: TonalApproach) {
    super(tonalApporach);
  }

  private lastTonicTime: MusicalDuration | undefined;

  generate() {
    const mainFuncSeq = this.tonalApporach.mainFuncSequence;

    mainFuncSeq.clear();
    let prevMainFunc: Node | undefined;
    let toTime: MusicalDuration;

    for (let time = ZERO; time < this.tonalApporach.maxDuration; time = toTime) {
      const duration = this.#pickDuration(prevMainFunc, time);

      toTime = time + (duration);
      toTime = this.#limitTime(toTime);
      const mainFunc = this.#pickMainFunc(prevMainFunc, time, toTime);

      [prevMainFunc] = mainFuncSeq.add( {
        event: mainFunc,
        interval: intervalOf(time, toTime),
      } );
    }
  }

  #limitTime(m: MusicalDuration): MusicalDuration {
    return limitTime(m, this.tonalApporach.maxDuration);
  }

  #pickDuration(
    prevMainFunc: Node | undefined,
    currentTime: MusicalDuration,
  ): MusicalDuration {
    const duration = WHOLE * (1 + random(2));

    return this.limitNextMeasure(duration, currentTime);
  }

  #pickMainFunc(
    prevMainFunc: Node | undefined,
    time: MusicalDuration,
    toTime: MusicalDuration,
  ): MainFunc {
    const maxLastTonicTime = WHOLE * (4);

    if (this.hasNewKeyAt(time)
    || (this.lastTonicTime && (time - this.lastTonicTime) >= maxLastTonicTime) || !prevMainFunc) {
      this.lastTonicTime = time;

      return MainFunc.TONIC;
    }

    const availableMainFuncs: MainFunc[] = [
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
      default: break;
    }

    const ret = availableMainFuncs[random(availableMainFuncs.length)];

    return ret;
  }
}
