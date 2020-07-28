import { PrecalcCache } from '../common/PrecalcCache';
import { DiatonicAltDegree } from '../degrees/degrees/DiatonicAltDegree';
import { IntervalDiatonic } from '../interval/IntervalDiatonic';
import { IntervalDiatonicAlt } from '../interval/IntervalDiatonicAlt';
import { NamingDiatonicAltPattern } from '../lang/naming/NamingDiatonicAltPattern';
import { DegreePattern } from '../patterns/DegreePattern';
import { ChromaticPattern } from './ChromaticPattern';
import { DiatonicPattern } from './DiatonicPattern';

export type Difference = IntervalDiatonicAlt;
type I = Difference;
type D = DiatonicAltDegree;
export class DiatonicAltPattern implements DegreePattern<D, I>, Iterable<I> {
    public static POWER_CHORD: DiatonicAltPattern;
    public static TRIAD_MAJOR: DiatonicAltPattern;
    public static TRIAD_MINOR: DiatonicAltPattern;
    public static TRIAD_DIMINISHED: DiatonicAltPattern;
    public static TRIAD_AUGMENTED: DiatonicAltPattern;
    public static TRIAD_SUS4: DiatonicAltPattern;
    public static TRIAD_SUS2: DiatonicAltPattern;
    public static TRIAD_QUARTAL: DiatonicAltPattern;
    public static SEVENTH: DiatonicAltPattern;
    public static SEVENTH_b5: DiatonicAltPattern;
    public static SEVENTH_MAJ7_b5: DiatonicAltPattern;
    public static SEVENTH_a5: DiatonicAltPattern;
    public static SEVENTH_SUS4: DiatonicAltPattern;
    public static SEVENTH_SUS4_b9: DiatonicAltPattern;
    public static SEVENTH_MINOR: DiatonicAltPattern;
    public static SEVENTH_MINOR_b5: DiatonicAltPattern;
    public static SEVENTH_MINOR_a5: DiatonicAltPattern;
    public static SIXTH: DiatonicAltPattern;
    public static SIXTH_MINOR: DiatonicAltPattern;
    public static SIXTH_SUS4: DiatonicAltPattern;
    public static SEVENTH_MAJ7: DiatonicAltPattern;
    public static SEVENTH_MINOR_MAJ7: DiatonicAltPattern;
    public static SIXTH_ADD9: DiatonicAltPattern;
    public static SIXTH_MINOR_ADD9: DiatonicAltPattern;
    public static SEVENTH_b9: DiatonicAltPattern;
    public static SEVENTH_a9: DiatonicAltPattern;
    public static SEVENTH_MINOR_b9: DiatonicAltPattern;
    public static SEVENTH_ADD11: DiatonicAltPattern;
    public static SEVENTH_ADD13: DiatonicAltPattern;
    public static NINTH: DiatonicAltPattern;
    public static NINTH_MINOR: DiatonicAltPattern;
    public static NINTH_b5: DiatonicAltPattern;
    public static NINTH_a5: DiatonicAltPattern;
    public static NINTH_SUS4: DiatonicAltPattern;
    public static NINTH_MAJ9: DiatonicAltPattern;
    public static NINTH_MINOR_MAJ9: DiatonicAltPattern;
    public static NINTH_ADD6: DiatonicAltPattern;
    public static NINTH_a11: DiatonicAltPattern;
    public static NINTH_MAJ9_a11: DiatonicAltPattern;
    public static ELEVENTH: DiatonicAltPattern;
    public static ELEVENTH_MINOR: DiatonicAltPattern;
    public static ELEVENTH_b9: DiatonicAltPattern;
    public static ELEVENTH_a9: DiatonicAltPattern;
    public static ELEVENTH_MAJ11: DiatonicAltPattern;
    public static ELEVENTH_MINOR_MAJ11: DiatonicAltPattern;
    public static THIRTEENTH_MINOR: DiatonicAltPattern;
    public static THIRTEENTH_SUS4: DiatonicAltPattern;
    public static THIRTEENTH_b5: DiatonicAltPattern;
    public static THIRTEENTH_a5: DiatonicAltPattern;
    public static THIRTEENTH_b9: DiatonicAltPattern;
    public static THIRTEENTH_a9: DiatonicAltPattern;
    public static THIRTEENTH_b5b9: DiatonicAltPattern;
    public static THIRTEENTH_b5a9: DiatonicAltPattern;
    public static THIRTEENTH_a5b9: DiatonicAltPattern;
    public static THIRTEENTH_a5a9: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13: DiatonicAltPattern;
    public static THIRTEENTH_MINOR_MAJ13: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_b5: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_a5: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_b9: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_a9: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_b5b9: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_b5a9: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_a5b9: DiatonicAltPattern;
    public static THIRTEENTH_MAJ13_a5a9: DiatonicAltPattern;

    public static all: () => DiatonicAltPattern[];

    private static _cache = new (class Cache extends PrecalcCache<DiatonicAltPattern, Difference[]>{
        getHash(values: Difference[]): string {
            let hash: string = "";
            for (const value of values) {
                hash += DiatonicAltPattern.hashCodeDiatonicAltPatternValue(value.intervalChromatic, value.intervalDiatonic);
            }
            return hash;
        }

        getHashingObject(diatonicAltChordPattern: DiatonicAltPattern) {
            return diatonicAltChordPattern._rootIntervals;
        }

        create(values: Difference[]): DiatonicAltPattern {
            return new DiatonicAltPattern(...values);
        }
    });

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
            arrayDiatonicChordPattern.push(value.intervalDiatonic.intValue);
        }

        this._chromaticChordPattern = ChromaticPattern.fromRootIntervals(...arrayChromaticChordPattern);
        this._diatonicChordPattern = DiatonicPattern.fromRootIntervalInts(...arrayDiatonicChordPattern);
    }

    public static fromPatterns(chromaticChordPattern: ChromaticPattern, diatonicPattern: DiatonicPattern): DiatonicAltPattern {
        let rootIntervals: I[] = [];

        for (let i = 0; i < chromaticChordPattern.length; i++) {
            let semisFromRoot = chromaticChordPattern.rootIntervals[i];
            let intervalDiatonic: IntervalDiatonic = diatonicPattern.rootIntervals[i];
            let rootInterval = IntervalDiatonicAlt.fromIntervals(semisFromRoot, intervalDiatonic);
            rootIntervals.push(rootInterval);
        }

        return this.fromRootIntervals(...rootIntervals);
    }

    public static fromRootIntervals(...rootIntervals: I[]): DiatonicAltPattern {
        return this._cache.getOrCreate(rootIntervals);
    }

    public static fromString(strValue: string): DiatonicAltPattern {
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

    public get rootIntervals(): Difference[] {
        return this._rootIntervals;
    }

    public withInv(n: number = 1): DiatonicAltPattern {
        let rootIntervals: Difference[] = Array.from(this.rootIntervals);
        for (let i = 0; i < n; i++) {
            let firstValue: Difference = rootIntervals.shift();
            while (firstValue.intervalChromatic < rootIntervals[rootIntervals.length - 1].intervalChromatic)
                firstValue = firstValue.getAdd(IntervalDiatonicAlt.PERFECT_OCTAVE);
            rootIntervals.push(firstValue);
            firstValue = rootIntervals[0];
            rootIntervals = rootIntervals.map((value: Difference) => value.getSub(firstValue));
        }

        return DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    }

    public toString() {
        return NamingDiatonicAltPattern.toString(this);
    }

    public get shortName(): string {
        return NamingDiatonicAltPattern.toStringShort(this);
    }

    public get rootIndex() {
        return this._rootIndex;
    }

    public get inversionNumber(): number {
        return (this.length - this.rootIndex) % this.length;
    }

    private static hashCodeDiatonicAltPatternValue(semis: number, intervalDiatonic: IntervalDiatonic): string {
        return "s:" + semis + "d:" + intervalDiatonic;
    }

    get length(): number {
        return this.rootIntervals.length;
    }

    public hashCode(): string {
        let ret = "";
        for (const value of this.rootIntervals) {
            ret += DiatonicAltPattern.hashCodeDiatonicAltPatternValue(value.intervalChromatic, value.intervalDiatonic);
        }
        return ret;
    }

    private static initialize() {
        DiatonicAltPattern.POWER_CHORD = DiatonicAltPattern.fromPatterns(ChromaticPattern.POWER_CHORD, DiatonicPattern.FIFTH);
        DiatonicAltPattern.TRIAD_MAJOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_MAJOR, DiatonicPattern.TRIAD);
        DiatonicAltPattern.TRIAD_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_MINOR, DiatonicPattern.TRIAD);
        DiatonicAltPattern.TRIAD_DIMINISHED = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_DIMINISHED, DiatonicPattern.TRIAD);
        DiatonicAltPattern.TRIAD_AUGMENTED = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_AUGMENTED, DiatonicPattern.TRIAD);
        DiatonicAltPattern.TRIAD_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.TRIAD_SUS4, DiatonicPattern.SUS4);
        DiatonicAltPattern.TRIAD_SUS2 = DiatonicAltPattern.TRIAD_SUS4.withInv();
        DiatonicAltPattern.TRIAD_QUARTAL = DiatonicAltPattern.TRIAD_SUS2.withInv();
        DiatonicAltPattern.SEVENTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_b5, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_MAJ7_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MAJ7_b5, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_a5, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_SUS4, DiatonicPattern.SEVENTH_SUS4);
        DiatonicAltPattern.SEVENTH_SUS4_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_SUS4_b9, DiatonicPattern.NINTH_SUS4);
        DiatonicAltPattern.SEVENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_MINOR_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_b5, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_MINOR_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_a5, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SIXTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH, DiatonicPattern.SIXTH);
        DiatonicAltPattern.SIXTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR, DiatonicPattern.SIXTH);
        DiatonicAltPattern.SIXTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_SUS4, DiatonicPattern.SIXTH);
        DiatonicAltPattern.SEVENTH_MAJ7 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MAJ7, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SEVENTH_MINOR_MAJ7 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_MAJ7, DiatonicPattern.SEVENTH);
        DiatonicAltPattern.SIXTH_ADD9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR_ADD9, DiatonicPattern.SIXTH_ADD9);
        DiatonicAltPattern.SIXTH_MINOR_ADD9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SIXTH_MINOR_ADD9, DiatonicPattern.SIXTH_ADD9);
        DiatonicAltPattern.SEVENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_b9, DiatonicPattern.NINTH);
        DiatonicAltPattern.SEVENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_a9, DiatonicPattern.NINTH);
        DiatonicAltPattern.SEVENTH_MINOR_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_MINOR_b9, DiatonicPattern.NINTH);
        DiatonicAltPattern.SEVENTH_ADD11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_ADD11, DiatonicPattern.SEVENTH_ADD11);
        DiatonicAltPattern.SEVENTH_ADD13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.SEVENTH_ADD13, DiatonicPattern.SEVENTH_ADD13);
        DiatonicAltPattern.NINTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH, DiatonicPattern.NINTH);
        DiatonicAltPattern.NINTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MINOR, DiatonicPattern.NINTH);
        DiatonicAltPattern.NINTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_b5, DiatonicPattern.NINTH);
        DiatonicAltPattern.NINTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_a5, DiatonicPattern.NINTH);
        DiatonicAltPattern.NINTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_SUS4, DiatonicPattern.NINTH_SUS4);
        DiatonicAltPattern.NINTH_MAJ9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MAJ9, DiatonicPattern.NINTH);
        DiatonicAltPattern.NINTH_MINOR_MAJ9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MINOR, DiatonicPattern.NINTH);
        DiatonicAltPattern.NINTH_ADD6 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_ADD6, DiatonicPattern.NINTH_ADD6);
        DiatonicAltPattern.NINTH_a11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_a11, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.NINTH_MAJ9_a11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.NINTH_MAJ9_a11, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.ELEVENTH = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.ELEVENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MINOR, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.ELEVENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_b9, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.ELEVENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_a9, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.ELEVENTH_MAJ11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MAJ11, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.ELEVENTH_MINOR_MAJ11 = DiatonicAltPattern.fromPatterns(ChromaticPattern.ELEVENTH_MINOR_MAJ11, DiatonicPattern.ELEVENTH);
        DiatonicAltPattern.THIRTEENTH_MINOR = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MINOR, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_SUS4 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_SUS4, DiatonicPattern.THIRTEENTH_SUS4);
        DiatonicAltPattern.THIRTEENTH_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_b5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5b9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_b5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_b5a9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_a5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5b9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_a5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_a5a9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MINOR_MAJ13 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MINOR_MAJ13, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_b5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_a5 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_b5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5b9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_b5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_b5a9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_a5b9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5b9, DiatonicPattern.THIRTEENTH);
        DiatonicAltPattern.THIRTEENTH_MAJ13_a5a9 = DiatonicAltPattern.fromPatterns(ChromaticPattern.THIRTEENTH_MAJ13_a5a9, DiatonicPattern.THIRTEENTH);

        DiatonicAltPattern.all = function () {
            return Array.from([
                this.POWER_CHORD,
                this.TRIAD_MAJOR,
                this.TRIAD_MINOR,
                this.TRIAD_DIMINISHED,
                this.TRIAD_AUGMENTED,
                this.TRIAD_SUS4,
                this.TRIAD_SUS2,
                this.TRIAD_QUARTAL,
                this.SEVENTH,
                this.SEVENTH_b5,
                this.SEVENTH_MAJ7_b5,
                this.SEVENTH_a5,
                this.SEVENTH_SUS4,
                this.SEVENTH_SUS4_b9,
                this.SEVENTH_MINOR,
                this.SEVENTH_MINOR_b5,
                this.SEVENTH_MINOR_a5,
                this.SIXTH,
                this.SIXTH_MINOR,
                this.SIXTH_SUS4,
                this.SEVENTH_MAJ7,
                this.SEVENTH_MINOR_MAJ7,
                this.SIXTH_ADD9,
                this.SIXTH_MINOR_ADD9,
                this.SEVENTH_b9,
                this.SEVENTH_a9,
                this.SEVENTH_MINOR_b9,
                this.SEVENTH_ADD11,
                this.SEVENTH_ADD13,
                this.NINTH,
                this.NINTH_MINOR,
                this.NINTH_b5,
                this.NINTH_a5,
                this.NINTH_SUS4,
                this.NINTH_MAJ9,
                this.NINTH_MINOR_MAJ9,
                this.NINTH_ADD6,
                this.NINTH_a11,
                this.NINTH_MAJ9_a11,
                this.ELEVENTH,
                this.ELEVENTH_MINOR,
                this.ELEVENTH_b9,
                this.ELEVENTH_a9,
                this.ELEVENTH_MAJ11,
                this.ELEVENTH_MINOR_MAJ11,
                this.THIRTEENTH_MINOR,
                this.THIRTEENTH_SUS4,
                this.THIRTEENTH_b5,
                this.THIRTEENTH_a5,
                this.THIRTEENTH_b9,
                this.THIRTEENTH_a9,
                this.THIRTEENTH_b5b9,
                this.THIRTEENTH_b5a9,
                this.THIRTEENTH_a5b9,
                this.THIRTEENTH_a5a9,
                this.THIRTEENTH_MAJ13,
                this.THIRTEENTH_MINOR_MAJ13,
                this.THIRTEENTH_MAJ13_b5,
                this.THIRTEENTH_MAJ13_a5,
                this.THIRTEENTH_MAJ13_b9,
                this.THIRTEENTH_MAJ13_a9,
                this.THIRTEENTH_MAJ13_b5b9,
                this.THIRTEENTH_MAJ13_b5a9,
                this.THIRTEENTH_MAJ13_a5b9,
                this.THIRTEENTH_MAJ13_a5a9
            ]);
        }

        for (let pattern of this.all()) {
            for (let i = 1; i < pattern.length; i++) {
                let patternInv = pattern.withInv(i);
                if (!this.all().includes(patternInv)) {
                    patternInv._rootIndex = pattern.length - i;
                }
            }
        }

        for (let pattern of this.all()) {
            for (let i = 0; i < pattern.length; i++) {
                let patternInv = pattern.withInv(i);
                Object.freeze(patternInv);
            }
        }

        //Immutables.lockrIf(DiatonicAltChordPattern, (obj) => !(obj instanceof ImmutablesCache));
    }
}