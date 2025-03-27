/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainFunc, TonalApproach } from "@datune/analyzer";
import { MusicalDuration } from "@datune/core";
import { MusicalDurations as MD } from "@datune/core";
import { TemporalNode } from "@datune/utils";
import { intervalBetween } from "datils/math/intervals";
import { randomN } from "datils/math";
import { GenSeq } from "./GenSeq";
import { limitTime } from "./utils";

type Node = TemporalNode<MainFunc>;
export class GenMainFuncSeq extends GenSeq {
  constructor(tonalApporach: TonalApproach) {
    super(tonalApporach);
  }

  private lastTonicTime: MusicalDuration | undefined;

  generate() {
    const mainFuncSeq = this.tonalApporach.mainFuncSequence;

    mainFuncSeq.clear();
    let prevMainFunc: Node | undefined;
    let toTime: MusicalDuration;

    for (let time = MD.ZERO; time < this.tonalApporach.maxDuration; time = toTime) {
      const duration = this.#pickDuration(prevMainFunc, time);

      toTime = time + (duration);
      toTime = this.#limitTime(toTime);
      const mainFunc = this.#pickMainFunc(prevMainFunc, time, toTime);

      [prevMainFunc] = mainFuncSeq.add( {
        event: mainFunc,
        interval: intervalBetween(time, toTime),
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
    const duration = MD.WHOLE * (1 + randomN(2));

    return this.limitNextMeasure(duration, currentTime);
  }

  #pickMainFunc(
    prevMainFunc: Node | undefined,
    time: MusicalDuration,
    toTime: MusicalDuration,
  ): MainFunc {
    const maxLastTonicTime = MD.WHOLE * (4);

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

    const ret = availableMainFuncs[randomN(availableMainFuncs.length)];

    return ret;
  }
}
