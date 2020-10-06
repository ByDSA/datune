import { DiatonicAltDegree } from '../scales/degrees/DiatonicAltDegree';
import { IntervalDiatonic } from '../intervals/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { NamingDiatonicAltPattern } from '../lang/naming/NamingDiatonicAltPattern';
import { DegreePattern } from './DegreePattern';
import { ChromaticPattern } from './ChromaticPattern';
import { DiatonicPattern } from './DiatonicPattern';
import { DiatonicAltPatternCache, hashCodeDiatonicAltPatternValue } from './DiatonicAltPatternCache';

export type Difference = IntervalDiatonicAlt;
type I = Difference;
type D = DiatonicAltDegree;
export class DiatonicAltPattern implements DegreePattern<D, I>, Iterable<I> {
    static POWER_CHORD: DiatonicAltPattern;
    static TRIAD_MAJOR: DiatonicAltPattern;
    static TRIAD_MINOR: DiatonicAltPattern;
    static TRIAD_DIMINISHED: DiatonicAltPattern;
    static TRIAD_AUGMENTED: DiatonicAltPattern;
    static TRIAD_SUS4: DiatonicAltPattern;
    static TRIAD_SUS2: DiatonicAltPattern;
    static TRIAD_QUARTAL: DiatonicAltPattern;
    static SEVENTH: DiatonicAltPattern;
    static SEVENTH_b5: DiatonicAltPattern;
    static SEVENTH_MAJ7_b5: DiatonicAltPattern;
    static SEVENTH_a5: DiatonicAltPattern;
    static SEVENTH_SUS4: DiatonicAltPattern;
    static SEVENTH_SUS4_b9: DiatonicAltPattern;
    static SEVENTH_MINOR: DiatonicAltPattern;
    static SEVENTH_MINOR_b5: DiatonicAltPattern;
    static SEVENTH_MINOR_a5: DiatonicAltPattern;
    static SIXTH: DiatonicAltPattern;
    static SIXTH_MINOR: DiatonicAltPattern;
    static SIXTH_SUS4: DiatonicAltPattern;
    static SEVENTH_MAJ7: DiatonicAltPattern;
    static SEVENTH_MINOR_MAJ7: DiatonicAltPattern;
    static SIXTH_ADD9: DiatonicAltPattern;
    static SIXTH_MINOR_ADD9: DiatonicAltPattern;
    static SEVENTH_b9: DiatonicAltPattern;
    static SEVENTH_a9: DiatonicAltPattern;
    static SEVENTH_MINOR_b9: DiatonicAltPattern;
    static SEVENTH_ADD11: DiatonicAltPattern;
    static SEVENTH_ADD13: DiatonicAltPattern;
    static NINTH: DiatonicAltPattern;
    static NINTH_MINOR: DiatonicAltPattern;
    static NINTH_b5: DiatonicAltPattern;
    static NINTH_a5: DiatonicAltPattern;
    static NINTH_SUS4: DiatonicAltPattern;
    static NINTH_MAJ9: DiatonicAltPattern;
    static NINTH_MINOR_MAJ9: DiatonicAltPattern;
    static NINTH_ADD6: DiatonicAltPattern;
    static NINTH_a11: DiatonicAltPattern;
    static NINTH_MAJ9_a11: DiatonicAltPattern;
    static ELEVENTH: DiatonicAltPattern;
    static ELEVENTH_MINOR: DiatonicAltPattern;
    static ELEVENTH_b9: DiatonicAltPattern;
    static ELEVENTH_a9: DiatonicAltPattern;
    static ELEVENTH_MAJ11: DiatonicAltPattern;
    static ELEVENTH_MINOR_MAJ11: DiatonicAltPattern;
    static THIRTEENTH_MINOR: DiatonicAltPattern;
    static THIRTEENTH_SUS4: DiatonicAltPattern;
    static THIRTEENTH_b5: DiatonicAltPattern;
    static THIRTEENTH_a5: DiatonicAltPattern;
    static THIRTEENTH_b9: DiatonicAltPattern;
    static THIRTEENTH_a9: DiatonicAltPattern;
    static THIRTEENTH_b5b9: DiatonicAltPattern;
    static THIRTEENTH_b5a9: DiatonicAltPattern;
    static THIRTEENTH_a5b9: DiatonicAltPattern;
    static THIRTEENTH_a5a9: DiatonicAltPattern;
    static THIRTEENTH_MAJ13: DiatonicAltPattern;
    static THIRTEENTH_MINOR_MAJ13: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_b5: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_a5: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_b9: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_a9: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_b5b9: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_b5a9: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_a5b9: DiatonicAltPattern;
    static THIRTEENTH_MAJ13_a5a9: DiatonicAltPattern;

    static all: () => DiatonicAltPattern[];

    private static _cache = new DiatonicAltPatternCache((values: Difference[]) => new DiatonicAltPattern(...values));

    private _rootIntervals: I[];
    private _rootIndex: number;

    private _diatonicChordPattern: DiatonicPattern;
    private _chromaticChordPattern: ChromaticPattern;

    private constructor(...values: I[]) {
        this._rootIntervals = values;
        Object.freeze(this._rootIntervals);
        this._rootIndex = 0;
        Object.freeze(this._rootIndex);

        let arrayChromaticChordPattern: number[] = [];
        let arrayDiatonicChordPattern: number[] = [];
        for (const value of values) {
            arrayChromaticChordPattern.push(value.intervalChromatic);
            arrayDiatonicChordPattern.push(value.intervalDiatonic.valueOf());
        }

        this._chromaticChordPattern = ChromaticPattern.fromRootIntervals(...arrayChromaticChordPattern);
        this._diatonicChordPattern = DiatonicPattern.fromRootIntervalInts(...arrayDiatonicChordPattern);
    }

    static fromPatterns(chromaticChordPattern: ChromaticPattern, diatonicPattern: DiatonicPattern): DiatonicAltPattern {
        let rootIntervals: I[] = [];

        for (let i = 0; i < chromaticChordPattern.length; i++) {
            let semisFromRoot = chromaticChordPattern.rootIntervals[i];
            let intervalDiatonic: IntervalDiatonic = diatonicPattern.rootIntervals[i];
            let rootInterval = IntervalDiatonicAlt.fromIntervals(semisFromRoot, intervalDiatonic);
            rootIntervals.push(rootInterval);
        }

        return this.fromRootIntervals(...rootIntervals);
    }

    static fromRootIntervals(...rootIntervals: I[]): DiatonicAltPattern {
        return this._cache.getOrCreate(rootIntervals);
    }

    static fromString(strValue: string): DiatonicAltPattern {
        strValue = this.normalizeInputString(strValue);

        for (let diatonicAltPattern of this._cache.list) {
            let normalizedString = this.normalizeInputString(diatonicAltPattern.toString());
            let normalizedShortName = this.normalizeInputString(diatonicAltPattern.shortName);

            if (strValue == normalizedString || strValue == normalizedShortName)
                return diatonicAltPattern;
        }

        throw new Error("Can't get DiatonicAltPattern from string '" + strValue + "'.");
    }

    private static normalizeInputString(strValue: string): string {
        strValue = strValue.replace(/ /g, '')
            .toLowerCase();
        return strValue;
    }

    [Symbol.iterator](): Iterator<Difference> {
        return this.rootIntervals[Symbol.iterator]();
    }

    get diatonicChordPattern(): DiatonicPattern {
        return this._diatonicChordPattern;
    }

    get chromaticChordPattern(): ChromaticPattern {
        return this._chromaticChordPattern;
    }

    get rootIntervals(): Difference[] {
        return this._rootIntervals;
    }

    withInv(n: number = 1): DiatonicAltPattern {
        let rootIntervals: Difference[] = Array.from(this.rootIntervals);
        for (let i = 0; i < n; i++) {
            let firstValue: Difference = rootIntervals.shift();
            while (firstValue.intervalChromatic < rootIntervals[rootIntervals.length - 1].intervalChromatic)
                firstValue = firstValue.withAdd(IntervalDiatonicAlt.PERFECT_OCTAVE);
            rootIntervals.push(firstValue);
            firstValue = rootIntervals[0];
            rootIntervals = rootIntervals.map((value: Difference) => value.withSub(firstValue));
        }

        return DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    }

    toString() {
        return NamingDiatonicAltPattern.toString(this);
    }

    get shortName(): string {
        return NamingDiatonicAltPattern.toStringShort(this);
    }

    get rootIndex() {
        return this._rootIndex;
    }

    get inversionNumber(): number {
        return (this.length - this.rootIndex) % this.length;
    }

    get length(): number {
        return this.rootIntervals.length;
    }

    hashCode(): string {
        let ret = "";
        for (const value of this.rootIntervals) {
            ret += hashCodeDiatonicAltPatternValue(value.intervalChromatic, value.intervalDiatonic);
        }
        return ret;
    }
}