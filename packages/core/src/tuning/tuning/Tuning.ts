import { ConcertPitch, SPN, SPNAlt } from '../../pitches';
import { FrequencyCalculatorChromatic } from '../frequencycalculator/FrequencyCalculatorChromatic';
import { FrequencyCalculatorDiatonicAlt } from '../frequencycalculator/FrequencyCalculatorDiatonicAlt';
import { FrequencyCalculator } from '../frequencycalculator/FrequencyCalculatorInterface';
import { Temperament } from '../temperament/Temperament';
import { HashingObject, TuningCache } from './TuningCache';
import { TuningStaticNames } from './TuningStaticNames';

export class Tuning extends TuningStaticNames {
    private static _cache = new TuningCache(
        (hashingObject: HashingObject) => new Tuning(hashingObject.concertPitch, hashingObject.temperament)
    );

    private constructor(private _concertPitch: ConcertPitch, private _temperament: Temperament) {
        super();
    }

    getFrequency(absolutePitch: unknown): number {
        let frequencyCalculator: FrequencyCalculator;

        if (absolutePitch instanceof SPN)
            frequencyCalculator = new FrequencyCalculatorChromatic(this, absolutePitch);
        else if (absolutePitch instanceof SPNAlt)
            frequencyCalculator = new FrequencyCalculatorDiatonicAlt(this, absolutePitch);
        else
            throw new Error();

        return frequencyCalculator.calc();
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