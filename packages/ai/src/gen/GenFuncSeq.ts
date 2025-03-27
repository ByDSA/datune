import { FuncTimeline, MainFunc, TonalApproach } from "@datune/analyzer";
import { Funcs as F, Scale } from "@datune/core";
import { Func } from "@datune/core/functions/chromatic";
import { Scales as S } from "@datune/core";
import { MusicalDurations as MD } from "@datune/core";
import { MusicalDuration } from "@datune/core/rhythm";
import { TimelineNode } from "@datune/utils";
import { randomN } from "datils/math";
import { intervalBetween } from "datils/math/intervals";
import { GenSeq } from "./GenSeq";
import { limitTime } from "./utils";

type Node = TimelineNode<Func>;
export class GenFuncSeq extends GenSeq {
  private funcTimeline: FuncTimeline;

  constructor(tonalApporach: TonalApproach) {
    super(tonalApporach);
    this.funcTimeline = this.tonalApporach.funcTimeline;
  }

  generate() {
    this.funcTimeline.clear();
    let prevNode: Node | undefined;
    let toTime: MusicalDuration;

    for (let time = MD.ZERO; time < this.tonalApporach.maxDuration; time = toTime) {
      const duration = this.#pickDuration(prevNode, time);

      toTime = time + duration;
      toTime = this.limitMaxDuration(toTime);
      toTime = limitTime(toTime, this.getNextMeasureTime(time));

      const func: Func | null = this.#pickFunc(prevNode, time, toTime);

      if (func) {
        [prevNode] = this.funcTimeline.add( {
          event: func,
          interval: intervalBetween(time, toTime),
        } );
      }
    }
  }

  #pickDuration(_prevNode: Node | undefined, time: MusicalDuration): MusicalDuration {
    const ret = MD.HALF * (1 + randomN(2));
    const nextMainFuncChange = <MusicalDuration> this.tonalApporach.mainFuncTimeline
      .getAt(time)?.interval.to;

    return limitTime(ret, nextMainFuncChange);
  }

  #pickFunc(
    prevNode: Node | undefined,
    time: MusicalDuration,
    toTime: MusicalDuration,
  ): Func | null {
    const keyAtTime = this.tonalApporach.keyTimeline.getAt(time);
    const currentScale = keyAtTime?.event.scale as Scale;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const funcIDegrees = F.getDegrees(F.I);
    const includesAll = (
      superArray: any[],
      subArray: any[],
    ) => subArray.every((v) => superArray.includes(v));

    if (this.hasNewKeyAt(time) || !prevNode) {
      if (includesAll(currentScale.degrees, funcIDegrees))
        return F.I;

      return F.Im;
    }

    let availableFuncs: Func[] = [];
    const currentMainFunc = this.tonalApporach.mainFuncTimeline.getAt(time)?.event;
    const endTimeMainFunc = this.tonalApporach.mainFuncTimeline.getAt(time)?.interval.to;
    const isLastFunc = toTime === endTimeMainFunc;
    const triads = true;

    switch (currentMainFunc) {
      case MainFunc.TONIC:
        if (currentScale === S.MAJOR) {
          if (triads)
            availableFuncs.push(F.I, F.IIIm, F.VIm);
          else
            availableFuncs.push(F.IMaj7, F.IIIm7, F.VIm7);
        } else if (currentScale === S.MINOR) {
          if (triads)
            availableFuncs.push(F.Im, F.bIII);
          else
            availableFuncs.push(F.Im7, F.bIIIMaj7);
        }

        break;
      case MainFunc.SUBDOMINANT:
        if (currentScale === S.MAJOR) {
          if (triads) {
            availableFuncs.push(F.IIm, F.IV);

            if (isLastFunc)
              availableFuncs.push(F.IVm);
          } else {
            availableFuncs.push(F.IIm7, F.IVMaj7);

            if (isLastFunc)
              availableFuncs.push(F.IVm7);
          }
        } else if (currentScale === S.MINOR) {
          if (triads)
            availableFuncs.push(F.IVm, F.bVI);
          else
            availableFuncs.push(F.IVm7, F.bVIm7);
        }

        break;
      case MainFunc.DOMINANT:
        if (currentScale === S.MAJOR) {
          if (triads)
            availableFuncs.push(F.V, F.ISUS4);
        } else if (currentScale === S.MINOR) {
          if (triads) {
            availableFuncs.push(F.Vm);

            if (isLastFunc)
              availableFuncs.push(F.V, F.V7);
          } else
            availableFuncs.push(F.Vm7);
        }

        if (isLastFunc) {
          if (triads)
            availableFuncs.push(F.VII0);

          availableFuncs.push(F.V7);
        }

        break;
      default: break;
    }

    availableFuncs = availableFuncs.filter((f) => f !== prevNode.event);

    if (availableFuncs.length === 0) {
      this.funcTimeline.remove(prevNode);

      this.funcTimeline.add( {
        event: prevNode.event,
        interval: intervalBetween(prevNode.interval.from, toTime),
      } );

      return null;
      // return prevNode.event;
    }

    return availableFuncs[randomN(availableFuncs.length)];
  }
}
