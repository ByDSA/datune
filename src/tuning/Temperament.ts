import { Degree } from '../degrees/Degree';
import { IntervalSymbolic } from '../intervals/IntervalSymbolic';
import { Settings } from '../settings/Settings';
import { IntervalPitch } from './IntervalPitch';

export abstract class Temperament {
    static ET12;
    static LIMIT_5_SYMMETRIC_N1;
    static LIMIT_5_SYMMETRIC_N2;
    static PYTHAGOREAN;

    abstract getIntervalPitch(interval: IntervalSymbolic<Degree>): IntervalPitch;

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
    }
}