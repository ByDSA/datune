import type { Interval as AInterval } from "intervals/alt";
import type { Interval } from "intervals/chromatic";
import { Intervals as DI } from "intervals/diatonic";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { NUMBER as DNUMBER } from "pitches/diatonic/constants";
import { a, d, da, dd, m } from "intervals/symbolic/alt/quality/constants";
import { MAJOR_SCALE_DEGREES } from "scales/symbolic/chromatic/constants/majorScaleDegrees";

;

export function fromAltInterval(altInterval: AInterval): Interval {
  return new SemisPrecalculator(altInterval).calc();
}

class SemisPrecalculator {
  rootInterval: number;

  #positiveDiatonicIntValueMod7: number;

  #positiveDiatonicIntValue: number;

  constructor(private aInterval: AInterval) {
    this.rootInterval = 0;

    this.#positiveDiatonicIntValue = Math.abs(+this.aInterval.diatonicInterval);
    this.#positiveDiatonicIntValueMod7 = this.#positiveDiatonicIntValue % DNUMBER;

    this.rootInterval = MAJOR_SCALE_DEGREES[this.#positiveDiatonicIntValueMod7];
  }

  calc(): number {
    this.qualityFixer();

    this.octaveFixer();

    if (this.aInterval.diatonicInterval.direction === Direction.ASCENDENT)
      return this.rootInterval;

    return -this.rootInterval;
  }

  private qualityFixer() {
    const { FIFTH, FOURTH, SECOND, SEVENTH, SIXTH, THIRD, UNISON } = DI;

    switch (this.#positiveDiatonicIntValueMod7) {
      case +UNISON:
      case +FOURTH:
      case +FIFTH:
        switch (this.aInterval.quality) {
          case d:
            this.rootInterval--;
            break;
          case a:
            this.rootInterval++;
            break;
          case dd:
            this.rootInterval -= 2;
            break;
          case da:
            this.rootInterval += 2;
            break;
          default: break;
        }
        break;
      case +SECOND:
      case +THIRD:
      case +SIXTH:
      case +SEVENTH:
        switch (this.aInterval.quality) {
          case m:
            this.rootInterval--;
            break;
          case d:
            this.rootInterval -= 2;
            break;
          case a:
            this.rootInterval++;
            break;
          case dd:
            this.rootInterval -= 3;
            break;
          case da:
            this.rootInterval += 2;
            break;
          default: break;
        }
        break;
      default: break;
    }
  }

  private octaveFixer() {
    const octaves: number = Math.floor(this.#positiveDiatonicIntValue / DNUMBER);

    this.rootInterval += CNUMBER * octaves;
  }
}
