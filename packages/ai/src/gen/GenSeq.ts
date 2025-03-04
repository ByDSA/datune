import { TonalApproach } from "@datune/analyzer";
import { MusicalDuration, TimeSignature } from "@datune/core";
import { ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { divCell } from "@datune/utils/time";
import { limitTime } from "./utils";

export abstract class GenSeq {
  protected tonalApporach: TonalApproach;

  constructor(tonalApporach: TonalApproach) {
    this.tonalApporach = tonalApporach;
  }

  abstract generate(): void;

  protected limitMaxDuration(m: MusicalDuration): MusicalDuration {
    return limitTime(m, this.tonalApporach.maxDuration);
  }

  protected limitNextMeasure(duration: MusicalDuration, time: MusicalDuration): MusicalDuration {
    const nextMeasureTime = this.getNextMeasureTime(time);
    const addedTime = time + (duration);

    return (Math.min(nextMeasureTime, addedTime)) - (time);
  }

  protected getNextMeasureTime(time: MusicalDuration): MusicalDuration {
    const currentRythmNode = this.tonalApporach.rhythmSequence.get( {
      at: time,
    } )[0]
      || this.tonalApporach.rhythmSequence.get( {
        at: ZERO,
      } )[0];
    const measureDuration = this.getMeasureDuration(time);
    const currentRelativeMeasure = time
      - divCell(currentRythmNode?.interval.from, measureDuration);
    const nextMeasureRelativeTime = measureDuration * (currentRelativeMeasure + 1);
    const nextMeasureTime = currentRythmNode.interval.from + (nextMeasureRelativeTime);

    return nextMeasureTime;
  }

  private getMeasureDuration(time: MusicalDuration): MusicalDuration {
    const currentRythmNode = this.tonalApporach.rhythmSequence.get( {
      at: time,
    } )[0]
      || this.tonalApporach.rhythmSequence.get( {
        at: ZERO,
      } )[0];
    const currentRythm = <TimeSignature>currentRythmNode?.event;

    return currentRythm.denominatorBeat * (currentRythm.numerator);
  }

  protected getStartMeasureTime(time: MusicalDuration): MusicalDuration {
    const currentRythmNode = this.tonalApporach.rhythmSequence.get( {
      at: time,
    } )[0]
      || this.tonalApporach.rhythmSequence.get( {
        at: ZERO,
      } )[0];
    const measureDuration = this.getMeasureDuration(time);
    const currentRelativeMeasure = time
      - divCell(currentRythmNode?.interval.from, measureDuration);
    const currentMeasureRelativeTime = measureDuration * (currentRelativeMeasure);
    const currentMeasureTime = currentRythmNode.interval.from + (currentMeasureRelativeTime);

    return currentMeasureTime;
  }

  protected hasNewKeyAt(time: MusicalDuration): boolean {
    const [currentKeyNode] = this.tonalApporach.keySequence.get( {
      at: time,
    } );

    return currentKeyNode?.interval.from === time;
  }

  protected isNewMeasure(time: MusicalDuration): boolean {
    return time === this.getStartMeasureTime(time);
  }
}
