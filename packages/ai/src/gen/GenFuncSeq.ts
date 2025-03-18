import { FuncSequence, MainFunc, TonalApproach } from "@datune/analyzer";
import { bIII, bIIIMaj7, bVI, bVIm7, I, IIIm, IIIm7, IIm, IIm7, Im, Im7, IMaj7, ISUS4, IV, IVm, IVm7, IVMaj7, V, V7, VII0, VIm, VIm7, Vm, Vm7 } from "@datune/core/functions/chromatic/degree-function/constants";
import { Func, Funcs as F } from "@datune/core/functions/chromatic";
import { MAJOR, MINOR } from "@datune/core/scales/symbolic/chromatic/constants";
import { HALF, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { MusicalDuration } from "@datune/core/rhythm";
import { TemporalNode } from "@datune/utils";
import { randomN } from "datils/math";
import { intervalOf } from "datils/math";
import { GenSeq } from "./GenSeq";
import { limitTime } from "./utils";

type Node = TemporalNode<Func>;
export class GenFuncSeq extends GenSeq {
  private funcSeq: FuncSequence;

  constructor(tonalApporach: TonalApproach) {
    super(tonalApporach);
    this.funcSeq = this.tonalApporach.funcSequence;
  }

  generate() {
    this.funcSeq.clear();
    let prevNode: Node | undefined;
    let toTime: MusicalDuration;

    for (let time = ZERO; time < this.tonalApporach.maxDuration; time = toTime) {
      const duration = this.#pickDuration(prevNode, time);

      toTime = time + duration;
      toTime = this.limitMaxDuration(toTime);
      toTime = limitTime(toTime, this.getNextMeasureTime(time));

      const func: Func | null = this.#pickFunc(prevNode, time, toTime);

      if (func) {
        [prevNode] = this.funcSeq.add( {
          event: func,
          interval: intervalOf(time, toTime),
        } );
      }
    }
  }

  #pickDuration(_prevNode: Node | undefined, time: MusicalDuration): MusicalDuration {
    const ret = HALF * (1 + randomN(2));
    const nextMainFuncChange = <MusicalDuration> this.tonalApporach.mainFuncSequence.get( {
      at: time,
    } )[0]?.interval.to;

    return limitTime(ret, nextMainFuncChange);
  }

  #pickFunc(
    prevNode: Node | undefined,
    time: MusicalDuration,
    toTime: MusicalDuration,
  ): Func | null {
    const [keyAtTime] = this.tonalApporach.keySequence.get( {
      at: time,
    } );
    const currentScale = keyAtTime?.event.scale;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const funcIDegrees = F.getDegrees(I);
    const includesAll = (
      superArray: any[],
      subArray: any[],
    ) => subArray.every((v) => superArray.includes(v));

    if (this.hasNewKeyAt(time) || !prevNode) {
      if (includesAll(currentScale.degrees, funcIDegrees))
        return I;

      return Im;
    }

    let availableFuncs: Func[] = [];
    const currentMainFunc = this.tonalApporach.mainFuncSequence.get( {
      at: time,
    } )[0]?.event;
    const endTimeMainFunc = this.tonalApporach.mainFuncSequence.get( {
      at: time,
    } )[0]?.interval.to;
    const isLastFunc = toTime === endTimeMainFunc;
    const triads = true;

    switch (currentMainFunc) {
      case MainFunc.TONIC:
        if (currentScale === MAJOR) {
          if (triads)
            availableFuncs.push(I, IIIm, VIm);
          else
            availableFuncs.push(IMaj7, IIIm7, VIm7);
        } else if (currentScale === MINOR) {
          if (triads)
            availableFuncs.push(Im, bIII);
          else
            availableFuncs.push(Im7, bIIIMaj7);
        }

        break;
      case MainFunc.SUBDOMINANT:
        if (currentScale === MAJOR) {
          if (triads) {
            availableFuncs.push(IIm, IV);

            if (isLastFunc)
              availableFuncs.push(IVm);
          } else {
            availableFuncs.push(IIm7, IVMaj7);

            if (isLastFunc)
              availableFuncs.push(IVm7);
          }
        } else if (currentScale === MINOR) {
          if (triads)
            availableFuncs.push(IVm, bVI);
          else
            availableFuncs.push(IVm7, bVIm7);
        }

        break;
      case MainFunc.DOMINANT:
        if (currentScale === MAJOR) {
          if (triads)
            availableFuncs.push(V, ISUS4);
        } else if (currentScale === MINOR) {
          if (triads) {
            availableFuncs.push(Vm);

            if (isLastFunc)
              availableFuncs.push(V, V7);
          } else
            availableFuncs.push(Vm7);
        }

        if (isLastFunc) {
          if (triads)
            availableFuncs.push(VII0);

          availableFuncs.push(V7);
        }

        break;
      default: break;
    }

    availableFuncs = availableFuncs.filter((f) => f !== prevNode.event);

    if (availableFuncs.length === 0) {
      this.funcSeq.remove(prevNode);

      this.funcSeq.add( {
        event: prevNode.event,
        interval: intervalOf(prevNode.interval.from, toTime),
      } );

      return null;
      // return prevNode.event;
    }

    return availableFuncs[randomN(availableFuncs.length)];
  }
}
