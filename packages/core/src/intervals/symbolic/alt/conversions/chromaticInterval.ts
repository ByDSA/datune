import type { Interval } from "../Interval";
import type { Interval as Chromatic } from "intervals/chromatic";
import { Intervals as DIntervals } from "intervals/diatonic";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { AUGMENTED, DIMINISHED, DOUBLY_AUGMENTED, DOUBLY_DIMINISHED, MINOR } from "intervals/symbolic/quality";
import { Pitches as CPitches } from "pitches/chromatic";
import { Pitches as DPitches } from "pitches/diatonic";
import { Scales as CScales } from "scales/chromatic";

export function toChromaticInterval(obj: Interval): Chromatic {
  return new SemisPrecalculator(obj).calc();
}

class SemisPrecalculator {
  private rootInterval: number;

  private positiveDiatonicIntValueMod7: number;

  private positiveDiatonicIntValue: number;

  constructor(private self: Interval) {
    this.rootInterval = 0;

    this.positiveDiatonicIntValue = Math.abs(+this.self.diatonicInterval);
    this.positiveDiatonicIntValueMod7 = this.positiveDiatonicIntValue % DPitches.NUMBER;

    this.rootInterval = CScales.MAJOR_SCALE_DEGREES[this.positiveDiatonicIntValueMod7];
  }

  calc(): number {
    this.qualityFixer();

    this.octaveFixer();

    if (this.self.diatonicInterval.direction === Direction.ASCENDENT)
      return this.rootInterval;

    return -this.rootInterval;
  }

  private qualityFixer() {
    const { FIFTH, FOURTH, SECOND, SEVENTH, SIXTH, THIRD, UNISON } = DIntervals;

    switch (this.positiveDiatonicIntValueMod7) {
      case +UNISON:
      case +FOURTH:
      case +FIFTH:
        switch (this.self.quality) {
          case DIMINISHED:
            this.rootInterval--;
            break;
          case AUGMENTED:
            this.rootInterval++;
            break;
          case DOUBLY_DIMINISHED:
            this.rootInterval -= 2;
            break;
          case DOUBLY_AUGMENTED:
            this.rootInterval += 2;
            break;
          default: break;
        }
        break;
      case +SECOND:
      case +THIRD:
      case +SIXTH:
      case +SEVENTH:
        switch (this.self.quality) {
          case MINOR:
            this.rootInterval--;
            break;
          case DIMINISHED:
            this.rootInterval -= 2;
            break;
          case AUGMENTED:
            this.rootInterval++;
            break;
          default: break;
        }
        break;
      default: break;
    }
  }

  private octaveFixer() {
    const octaves: number = Math.floor(this.positiveDiatonicIntValue / DPitches.NUMBER);

    this.rootInterval += CPitches.NUMBER * octaves;
  }
}
