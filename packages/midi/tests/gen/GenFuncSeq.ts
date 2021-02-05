import { MainFunc, TonalApproach } from "@datune/analyzer";
import { MusicalDuration, Scale } from "@datune/core";
import { Degree } from "@datune/core/scales";
import { Func, HarmonicFunction } from "@datune/core/tonalities";
import { NonEmptyArray, random, TemporalNode } from "@datune/utils";
import { GenSeq } from "./GenSeq";
import { limitTime } from "./utils";

type Node = TemporalNode<HarmonicFunction, MusicalDuration>;
export class GenFuncSeq extends GenSeq {
    constructor(tonalApporach: TonalApproach) {
        super(tonalApporach);
    }

    generate() {
        const funcSeq = this.tonalApporach.funcSequence;
        funcSeq.clear();
        let prevNode: Node | undefined;
        let toTime: MusicalDuration;
        for (let time = MusicalDuration.ZERO; time < this.tonalApporach.maxDuration; time = toTime) {
            const duration = this._pickDuration(prevNode, time);
            toTime = time.withAdd(duration);
            toTime = this.limitMaxDuration(toTime);
            toTime = limitTime(toTime, this.getNextMeasureTime(time));

            let func: HarmonicFunction | null = this._pickFunc(prevNode, time, toTime);

            if (func)
                prevNode = funcSeq.addEvent(func, time, toTime);
        }
    }

    private _pickDuration(prevNode: Node | undefined, time: MusicalDuration): MusicalDuration {
        let ret = MusicalDuration.HALF.withMult(1 + random(2));
        const nextMainFuncChange = <MusicalDuration>this.tonalApporach.mainFuncSequence.getNodeAt(time)?.to;
        return limitTime(ret, nextMainFuncChange);
    }

    private _pickFunc(prevNode: Node | undefined, time: MusicalDuration, toTime: MusicalDuration): HarmonicFunction | null {
        const currentScale = <Scale>this.tonalApporach.keySequence.getNodeAt(time)?.event.scale;
        const funcIDegrees = <NonEmptyArray<Degree>>Func.I.degrees.map(alt => alt.degree);
        if (this.hasNewKeyAt(time) || !prevNode)
            if (currentScale.hasDegrees(...funcIDegrees))
                return Func.I;
            else
                return Func.i;

        let availableFuncs: HarmonicFunction[] = [];
        const currentMainFunc = this.tonalApporach.mainFuncSequence.getNodeAt(time)?.event;
        const endTimeMainFunc = this.tonalApporach.mainFuncSequence.getNodeAt(time)?.to;
        const isLastFunc = toTime == endTimeMainFunc;
        const triads = true;
        switch (currentMainFunc) {
            case MainFunc.TONIC:
                if (currentScale == Scale.MAJOR) {
                    if (triads)
                        availableFuncs.push(Func.I, Func.iii, Func.vi);
                    else
                        availableFuncs.push(Func.IMaj7, Func.IIIm7, Func.VIm7);
                } else if (currentScale == Scale.MINOR) {
                    if (triads)
                        availableFuncs.push(Func.i, Func.bIII);
                    else
                        availableFuncs.push(Func.Im7, Func.bIIIMaj7);
                }
                break;
            case MainFunc.SUBDOMINANT:
                if (currentScale == Scale.MAJOR) {
                    if (triads) {
                        availableFuncs.push(Func.ii, Func.IV);
                        if (isLastFunc)
                            availableFuncs.push(Func.iv);
                    } else {
                        availableFuncs.push(Func.IIm7, Func.IVMaj7);
                        if (isLastFunc)
                            availableFuncs.push(Func.IVm7);
                    }
                } else if (currentScale == Scale.MINOR) {
                    if (triads)
                        availableFuncs.push(Func.iv, Func.bVI);
                    else
                        availableFuncs.push(Func.IVm7, Func.bVIm7);
                }
                break;
            case MainFunc.DOMINANT:
                if (currentScale == Scale.MAJOR) {
                    if (triads)
                        availableFuncs.push(Func.V, Func.ISUS4);
                } else if (currentScale == Scale.MINOR) {
                    if (triads) {
                        availableFuncs.push(Func.v);
                        if (isLastFunc)
                            availableFuncs.push(Func.V, Func.V7);
                    } else {
                        availableFuncs.push(Func.Vm7);
                    }
                }

                if (isLastFunc) {
                    if (triads)
                        availableFuncs.push(Func.VII0);
                    availableFuncs.push(Func.V7);
                }
                break;
        }

        availableFuncs = availableFuncs.filter(f => f != prevNode.event);
        if (availableFuncs.length == 0) {
            prevNode.to = toTime;
            return null;
            // return prevNode.event;
        }

        return availableFuncs[random(availableFuncs.length)];
    }
}