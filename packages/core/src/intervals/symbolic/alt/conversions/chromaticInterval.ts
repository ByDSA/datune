import type { Interval } from "../Interval";
import type { Interval as CInterval } from "intervals/chromatic";
import { Intervals as DIntervals } from "intervals/diatonic";
import { Direction } from "intervals/symbolic/diatonic/Direction";
import { Pitches as CP } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Scales as CS } from "scales/chromatic";
import { a, d, da, dd, m } from "../quality/constants";

export function toChromaticInterval(obj: Interval): CInterval {
  return new SemisPrecalculator(obj).calc();
}

class SemisPrecalculator {
  #rootInterval: number;

  #positiveDiatonicIntValueMod7: number;

  #positiveDiatonicIntValue: number;

  constructor(private self: Interval) {
    this.#rootInterval = 0;

    this.#positiveDiatonicIntValue = Math.abs(+this.self.diatonicInterval);
    this.#positiveDiatonicIntValueMod7 = this.#positiveDiatonicIntValue % DP.NUMBER;

    this.#rootInterval = CS.MAJOR_SCALE_DEGREES[this.#positiveDiatonicIntValueMod7];
  }

  calc(): number {
    this.qualityFixer();

    this.octaveFixer();

    if (this.self.diatonicInterval.direction === Direction.ASCENDENT)
      return this.#rootInterval;

    return -this.#rootInterval;
  }

  private qualityFixer() {
    const { FIFTH, FOURTH, SECOND, SEVENTH, SIXTH, THIRD, UNISON } = DIntervals;

    switch (this.#positiveDiatonicIntValueMod7) {
      case +UNISON:
      case +FOURTH:
      case +FIFTH:
        switch (this.self.quality) {
          case d:
            this.#rootInterval--;
            break;
          case a:
            this.#rootInterval++;
            break;
          case dd:
            this.#rootInterval -= 2;
            break;
          case da:
            this.#rootInterval += 2;
            break;
          default: break;
        }
        break;
      case +SECOND:
      case +THIRD:
      case +SIXTH:
      case +SEVENTH:
        switch (this.self.quality) {
          case m:
            this.#rootInterval--;
            break;
          case d:
            this.#rootInterval -= 2;
            break;
          case a:
            this.#rootInterval++;
            break;
          case dd:
            this.#rootInterval -= 3;
            break;
          case da:
            this.#rootInterval += 2;
            break;
          default: break;
        }
        break;
      default: break;
    }
  }

  private octaveFixer() {
    const octaves: number = Math.floor(this.#positiveDiatonicIntValue / DP.NUMBER);

    this.#rootInterval += CP.NUMBER * octaves;
  }
}
