import { Chromatic } from '../degrees/Chromatic';
import { Degree } from '../degrees/Degree';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { IntervalSymbolic } from '../intervals/IntervalSymbolic';
import { SymbolicPitch } from '../pitches/symbolic/SymbolicPitch';
import { ConcertPitch } from './ConcertPitch';
import { Temperament } from './Temperament';
import { TuningCache, HashingObject } from './TuningCache';

export class Tuning {
    static EQUAL_440;
    static LIMIT_5_SYMMETRIC_N1_440;

    private static _cache = new TuningCache(
        (hashingObject: HashingObject) => new Tuning(hashingObject.concertPitch, hashingObject.temperament)
    );

    private constructor(private _concertPitch: ConcertPitch, private _temperament: Temperament) {
    }

    getFrequency(symbolicPitch: SymbolicPitch): number {
        let symbolicNote: Degree = symbolicPitch.degree;
        let symbolicNoteRoot: Degree = this._concertPitch.symbolicPitch.degree;
        let interval: IntervalSymbolic<Degree>;
        if (symbolicNoteRoot instanceof DiatonicAlt && symbolicNote instanceof DiatonicAlt) {
            interval = IntervalDiatonicAlt.between(symbolicNoteRoot, symbolicNote);
        } else if (symbolicNoteRoot instanceof Chromatic && symbolicNote instanceof Chromatic) {
            interval = IntervalDiatonicAlt.betweenChromatic(symbolicNoteRoot, symbolicNote);
        } else {
            throw new Error("Cannot calculate the interval: root=" + symbolicNoteRoot + " note=" + symbolicNote);
        }

        let ratioNumber = this._temperament.getIntervalPitch(interval).ratio.value;

        if (typeof symbolicNote != typeof symbolicNoteRoot)
            throw new Error();

        let distOctave = symbolicPitch.octave - this._concertPitch.symbolicPitch.octave;
        if ((<Degree>symbolicNote) < <Degree>symbolicNoteRoot)
            distOctave--;

        return this._concertPitch.frequency * Math.pow(2, distOctave) * ratioNumber;
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