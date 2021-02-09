import { IntervalPitch } from '../../intervals';
import { IntervalDiatonicAlt } from '../../intervals';
import { ChromaticInterval } from '../../intervals';
import { Settings } from '../../config';
import { TemperamentStaticNames } from './TemperamentStaticNames';

export abstract class Temperament extends TemperamentStaticNames {
    abstract getIntervalPitch(interval: IntervalDiatonicAlt | ChromaticInterval): IntervalPitch;

    hashCode(): string {
        switch (this) {
            case Temperament.ET12: return "ET12";
            case Temperament.LIMIT_5_SYMMETRIC_N1: return "LIMIT_5_SYMMETRIC_N1";
            case Temperament.LIMIT_5_SYMMETRIC_N2: return "LIMIT_5_SYMMETRIC_N2";
            case Temperament.PYTHAGOREAN: return "PYTHAGOREAN";
        }

        throw new Error();
    }

    toString(): string {
        switch (this) {
            case Temperament.ET12: return Settings.lang.temperaments.ET12;
            case Temperament.LIMIT_5_SYMMETRIC_N1: return Settings.lang.temperaments.LIMIT_5_SYMMETRIC_N1;
            case Temperament.LIMIT_5_SYMMETRIC_N2: return Settings.lang.temperaments.LIMIT_5_SYMMETRIC_N2;
            case Temperament.PYTHAGOREAN: return Settings.lang.temperaments.PYTHAGOREAN;
        }

        throw new Error();
    }
}