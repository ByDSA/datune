import { Chromatic } from '../degrees/Chromatic';
import { NamingChromaticChordPattern } from '../lang/naming/NamingChromaticChordPattern';
import { ChromaticPatternCache } from './ChromaticPatternCache';
import { DegreePattern } from './DegreePattern';

export type I = number;
export class ChromaticPattern implements DegreePattern<Chromatic, I>, Iterable<I> {
    static POWER_CHORD: ChromaticPattern;
    static TRIAD_MAJOR: ChromaticPattern;
    static TRIAD_MINOR: ChromaticPattern;
    static TRIAD_DIMINISHED: ChromaticPattern;
    static TRIAD_AUGMENTED: ChromaticPattern;
    static TRIAD_SUS4: ChromaticPattern;
    static TRIAD_QUARTAL: ChromaticPattern;
    static SEVENTH: ChromaticPattern;
    static SEVENTH_b5: ChromaticPattern;
    static SEVENTH_MAJ7_b5: ChromaticPattern;
    static SEVENTH_a5: ChromaticPattern;
    static SEVENTH_SUS4: ChromaticPattern;
    static SEVENTH_SUS4_b9: ChromaticPattern;
    static SEVENTH_MINOR: ChromaticPattern;
    static SEVENTH_MINOR_b5: ChromaticPattern;
    static SEVENTH_MINOR_a5: ChromaticPattern;
    static SIXTH: ChromaticPattern;
    static SIXTH_MINOR: ChromaticPattern;
    static SIXTH_SUS4: ChromaticPattern;
    static SEVENTH_MAJ7: ChromaticPattern;
    static SEVENTH_MINOR_MAJ7: ChromaticPattern;
    static SIXTH_ADD9: ChromaticPattern;
    static SIXTH_MINOR_ADD9: ChromaticPattern;
    static SEVENTH_b9: ChromaticPattern;
    static SEVENTH_a9: ChromaticPattern;
    static SEVENTH_MINOR_b9: ChromaticPattern;
    static SEVENTH_ADD11: ChromaticPattern;
    static SEVENTH_ADD13: ChromaticPattern;
    static NINTH: ChromaticPattern;
    static NINTH_MINOR: ChromaticPattern;
    static NINTH_b5: ChromaticPattern;
    static NINTH_a5: ChromaticPattern;
    static NINTH_SUS4: ChromaticPattern;
    static NINTH_MAJ9: ChromaticPattern;
    static NINTH_MINOR_MAJ9: ChromaticPattern;
    static NINTH_ADD6: ChromaticPattern;
    static NINTH_a11: ChromaticPattern;
    static NINTH_MAJ9_a11: ChromaticPattern;
    static ELEVENTH: ChromaticPattern;
    static ELEVENTH_MINOR: ChromaticPattern;
    static ELEVENTH_b9: ChromaticPattern;
    static ELEVENTH_a9: ChromaticPattern;
    static ELEVENTH_MAJ11: ChromaticPattern;
    static ELEVENTH_MINOR_MAJ11: ChromaticPattern;
    static THIRTEENTH_MINOR: ChromaticPattern;
    static THIRTEENTH_SUS4: ChromaticPattern;
    static THIRTEENTH_b5: ChromaticPattern;
    static THIRTEENTH_a5: ChromaticPattern;
    static THIRTEENTH_b9: ChromaticPattern;
    static THIRTEENTH_a9: ChromaticPattern;
    static THIRTEENTH_b5b9: ChromaticPattern;
    static THIRTEENTH_b5a9: ChromaticPattern;
    static THIRTEENTH_a5b9: ChromaticPattern;
    static THIRTEENTH_a5a9: ChromaticPattern;
    static THIRTEENTH_MAJ13: ChromaticPattern;
    static THIRTEENTH_MINOR_MAJ13: ChromaticPattern;
    static THIRTEENTH_MAJ13_b5: ChromaticPattern;
    static THIRTEENTH_MAJ13_a5: ChromaticPattern;
    static THIRTEENTH_MAJ13_b9: ChromaticPattern;
    static THIRTEENTH_MAJ13_a9: ChromaticPattern;
    static THIRTEENTH_MAJ13_b5b9: ChromaticPattern;
    static THIRTEENTH_MAJ13_b5a9: ChromaticPattern;
    static THIRTEENTH_MAJ13_a5b9: ChromaticPattern;
    static THIRTEENTH_MAJ13_a5a9: ChromaticPattern;

    static all: () => ChromaticPattern[];

    private static _cache = new ChromaticPatternCache((values: I[]) => new ChromaticPattern(...values));

    private _rootIntervals: I[];
    private _precalcIntraIntervals: I[];
    private _rootIndex: number;

    private constructor(...values: I[]) {
        this._rootIntervals = values;
        this._rootIndex = 0;
        Object.freeze(this._rootIntervals);
        Object.freeze(this._rootIndex);
    }

    static fromRootIntervals(...rootIntervals: I[]): ChromaticPattern {
        if (rootIntervals[0] > 0)
            rootIntervals = this.getStartFromZero(rootIntervals);
        return this._cache.getOrCreate(rootIntervals);
    }

    private static getStartFromZero(array: number[]) {
        return array.map((ic, i, a) => ic - a[0]);
    }

    static fromIntraIntervals(...intraIntervals: I[]): ChromaticPattern {
        let baseIntervals: I[] = [0];
        for (let i = 0; i < intraIntervals.length; i++) {
            let baseInterval_i = baseIntervals[baseIntervals.length - 1] + intraIntervals[i];
            baseIntervals.push(baseInterval_i);
        }

        let ret = this.fromRootIntervals(...baseIntervals);
        if (!Object.isFrozen(ret._precalcIntraIntervals)) {
            ret._precalcIntraIntervals = Array.from(intraIntervals);
            Object.freeze(ret._precalcIntraIntervals);
        }

        return ret;
    }

    static fromString(strValue: string): ChromaticPattern {
        strValue = this.normalizeInputString(strValue);

        for (let chromaticPattern of this._cache.list) {
            let normalizedString = this.normalizeInputString(chromaticPattern.toString());
            let normalizedShortName = this.normalizeInputString(chromaticPattern.shortName);

            if (strValue == normalizedString || strValue == normalizedShortName)
                return chromaticPattern;
        }

        throw new Error("Can't get " + this.name + " from string '" + strValue + "'.");
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }

    [Symbol.iterator](): Iterator<I> {
        return this.rootIntervals[Symbol.iterator]();
    }

    get rootIndex(): number {
        return this._rootIndex;
    }

    get rootIntervals(): I[] {
        return this._rootIntervals;
    }

    get length(): number {
        return this._rootIntervals.length;
    }

    withInv(n: number = 1): ChromaticPattern {
        let values = Array.from(this.rootIntervals);
        for (let i = 0; i < n; i++) {
            let firstValue = values.shift();
            values.push(firstValue + Chromatic.NUMBER);
            values = values.map((value: number) => value - values[0]);
        }

        return ChromaticPattern.fromRootIntervals(...values);
    }

    toString() {
        return NamingChromaticChordPattern.toString(this);
    }

    get shortName(): string {
        return NamingChromaticChordPattern.toStringShort(this);
    }

    get inversionNumber(): number {
        return (this.rootIntervals.length - this.rootIndex) % this.rootIntervals.length;
    }
}