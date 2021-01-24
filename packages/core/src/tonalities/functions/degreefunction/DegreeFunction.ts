import { Chord, ChordAlt } from '../../../chords';
import { Chromatic, Diatonic, DiatonicAlt } from '../../../pitches';
import { DegreeAlt, DegreeAltArray, DiatonicDegree } from '../../../scales';
import { DiatonicAltPattern } from '../../../voicings/relative/alt/DiatonicAltPattern';
import { TonalityAlt } from '../../alt/TonalityAlt';
import { Tonality } from '../../chromatic/Tonality';
import { HarmonicFunction } from '../HarmonicFunction';
import { DegreeFunctionCache, degreeFunctionHashCode, HashingObjectType } from './building/cache/DegreeFunctionCache';

export class DegreeFunction extends HarmonicFunction {
    private static _cache = new DegreeFunctionCache(
        (hashingObject: HashingObjectType) => new DegreeFunction(hashingObject.degree, hashingObject.pattern)
    );

    protected constructor(private _degreeAlt: DegreeAlt, private _patternAlt: DiatonicAltPattern) {
        super();
    }

    static from(degree: DegreeAlt, pattern: DiatonicAltPattern): DegreeFunction {
        return this._cache.getOrCreate({ degree: degree, pattern: pattern });
    }

    get degreeAlt(): DegreeAlt {
        return this._degreeAlt;
    }

    get patternAlt(): DiatonicAltPattern {
        return this._patternAlt;
    }

    protected calculateChordAlt(tonality: TonalityAlt): ChordAlt {
        let noteBase: DiatonicAlt = tonality.root.withAdd(this.degreeAlt.intervalDiatonicAlt);

        return ChordAlt.fromRootPattern(noteBase, this._patternAlt);
    }

    protected calculateChord(tonality: Tonality): Chord {
        let noteBase: Chromatic = tonality.root.withShift(this.degreeAlt.degree)

        return Chord.fromRootPattern(noteBase, this._patternAlt.pattern);
    }

    private _degrees: DegreeAltArray | undefined;

    get degrees(): DegreeAltArray {
        if (!this._degrees) {
            let degrees = [];
            for (let value of this.patternAlt) {
                let diatonicDegreeInt = this.degreeAlt.diatonicDegree.valueOf() + value.intervalDiatonic.valueOf();
                let diatonicDegree = DiatonicDegree.fromInt(diatonicDegreeInt);
                let alts = (this.degreeAlt.degree + value.interval) - Diatonic.fromInt(diatonicDegree.valueOf()).chromatic.valueOf();
                alts %= Chromatic.NUMBER;
                let degree = DegreeAlt.from(diatonicDegree, alts);
                degrees.push(degree);
            }

            this._degrees = <DegreeAltArray>degrees;
        }

        return this._degrees;
    }

    /* Object */

    toString(): string {
        switch (this._patternAlt) {
            case DiatonicAltPattern.TRIAD_MINOR: return this._degreeAlt.toString().toLowerCase();
        }

        return this._degreeAlt.toString() + this._patternAlt.shortName;
    }

    hashCode(): string {
        return degreeFunctionHashCode(this._degreeAlt, this._patternAlt);
    }
}