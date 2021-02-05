import { TonalApproach } from "@datune/analyzer";
import { MusicalDuration, TimeSignature } from "@datune/core";
import { limitTime } from "./utils";

export abstract class GenSeq {
    protected constructor(protected tonalApporach: TonalApproach) {
    }

    abstract generate(): void;

    protected limitMaxDuration(m: MusicalDuration): MusicalDuration {
        return limitTime(m, this.tonalApporach.maxDuration);
    }

    protected limitNextMeasure(duration: MusicalDuration, time: MusicalDuration): MusicalDuration {
        const nextMeasureTime = this.getNextMeasureTime(time);
        const addedTime = time.withAdd(duration).value;

        return MusicalDuration.from(Math.min(nextMeasureTime.value, addedTime)).withSub(time);
    }

    protected getNextMeasureTime(time: MusicalDuration): MusicalDuration {
        const currentRythmNode = this.tonalApporach.rhythmSequence.getNodeAt(time) || this.tonalApporach.rhythmSequence.getNodeAt(MusicalDuration.ZERO);
        const measureDuration = this.getMeasureDuration(time);
        const currentRelativeMeasure = time.withSub(<MusicalDuration>currentRythmNode?.from).withDivCell(measureDuration);
        const nextMeasureRelativeTime = measureDuration.withMult(currentRelativeMeasure + 1);
        const nextMeasureTime = <MusicalDuration>currentRythmNode?.from.withAdd(nextMeasureRelativeTime);

        return nextMeasureTime;
    }

    private getMeasureDuration(time: MusicalDuration): MusicalDuration {
        const currentRythmNode = this.tonalApporach.rhythmSequence.getNodeAt(time) || this.tonalApporach.rhythmSequence.getNodeAt(MusicalDuration.ZERO);
        const currentRythm = <TimeSignature>currentRythmNode?.event;
        return currentRythm.denominatorBeat.withMult(currentRythm.numerator);
    }

    protected getStartMeasureTime(time: MusicalDuration): MusicalDuration {
        const currentRythmNode = this.tonalApporach.rhythmSequence.getNodeAt(time) || this.tonalApporach.rhythmSequence.getNodeAt(MusicalDuration.ZERO);
        const measureDuration = this.getMeasureDuration(time);
        const currentRelativeMeasure = time.withSub(<MusicalDuration>currentRythmNode?.from).withDivCell(measureDuration);
        const currentMeasureRelativeTime = measureDuration.withMult(currentRelativeMeasure);
        const currentMeasureTime = <MusicalDuration>currentRythmNode?.from.withAdd(currentMeasureRelativeTime);

        return currentMeasureTime;
    }

    protected hasNewKeyAt(time: MusicalDuration): boolean {
        let currentKeyNode = this.tonalApporach.keySequence.getNodeAt(time);
        return currentKeyNode?.from == time;
    }

    protected isNewMeasure(time: MusicalDuration): boolean {
        return time == this.getStartMeasureTime(time);
    }
}