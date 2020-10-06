import { Chromatic } from '../degrees/Chromatic';
import { Degree } from '../degrees/Degree';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { SymbolicPitch } from '../pitches/symbolic/SymbolicPitch';
import { ConcertPitch } from './ConcertPitch';
import { Temperament } from './Temperament';
import { HashingObject, TuningCache } from './TuningCache';

export class Tuning {
    static EQUAL_440;
    static LIMIT_5_SYMMETRIC_N1_440;

    private static _cache = new TuningCache(
        (hashingObject: HashingObject) => new Tuning(hashingObject.concertPitch, hashingObject.temperament)
    );

    private constructor(private _concertPitch: ConcertPitch, private _temperament: Temperament) {
    }

    getFrequency(symbolicPitch: SymbolicPitch): number {
        return new FrequencyCalculator(this, symbolicPitch).calculate();
    }

    get concertPitch(): ConcertPitch {
        return this._concertPitch;
    }

    get temperament(): Temperament {
        return this._temperament;
    }

    static from(concertPitch: ConcertPitch, temperament: Temperament) {
        return this._cache.getOrCreate({ concertPitch: concertPitch, temperament: temperament });
    }

    toString(): string {
        return this.concertPitch + " " + this.temperament;
    }
}

class FrequencyCalculator {
    degree: Degree;
    degreeRoot: Degree;
    interval: IntervalDiatonicAlt;

    ratioNumber: number;
    distOctave: number;

    constructor(private _tuning: Tuning, private symbolicPitch: SymbolicPitch) {
    }

    private getDistOctave(): number {
        let distOctave = this.symbolicPitch.octave - this._tuning.concertPitch.symbolicPitch.octave;
        if (this.degree instanceof Chromatic) {
            if (this.degree < this.degreeRoot)
                distOctave--;
        } else if (this.degree instanceof DiatonicAlt) {
            if (this.degree.diatonic < (<DiatonicAlt>this.degreeRoot).diatonic)
                distOctave--;
        }

        return distOctave;
    }

    private getInterval(): IntervalDiatonicAlt {
        if (this.degree instanceof DiatonicAlt) {
            return IntervalDiatonicAlt.between(<DiatonicAlt>this.degreeRoot, this.degree);
        } else if (this.degree instanceof Chromatic) {
            return IntervalDiatonicAlt.betweenChromatic(<Chromatic>this.degreeRoot, this.degree);
        }
    }

    calculate() {
        this.degree = this.symbolicPitch.degree;
        this.degreeRoot = this._tuning.concertPitch.symbolicPitch.degree;

        if (
            typeof this.degree != typeof this.degreeRoot ||
            !(this.degreeRoot instanceof DiatonicAlt) &&
            !(this.degreeRoot instanceof Chromatic)
        )
            throw new Error("Cannot calculate the interval: root=" + this.degreeRoot + " note=" + this.degree);

        this.interval = this.getInterval();

        this.ratioNumber = this._tuning.temperament.getIntervalPitch(this.interval).ratio.value;

        let distOctave = this.getDistOctave();

        return this._tuning.concertPitch.frequency * Math.pow(2, distOctave) * this.ratioNumber;
    }
}