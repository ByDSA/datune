import { Arrays, NonEmptyArray } from '@datune/utils';
import { IntervalDiatonicAlt, IntervalDiatonicAltArray } from '../../../intervals';
import { DiatonicAlt } from '../../../pitches';
import { HarmonicFunction, TonalityAlt } from '../../../tonalities';
import { DiatonicAltPattern } from '../../../voicings/relative/alt/DiatonicAltPattern';
import { ChromaticArray, ChromaticChord } from '../chromatic/ChromaticChord';
import { NameChordCalculator } from '../NameChordCalculator';
import { SymbolicChord } from '../SymbolicChord';
import { RootPatternAltBuilder } from './building/builders/rootpattern/RootPatternAltBuilder';
import { TonalityAltFunctionBuilder } from './building/builders/tonalityfunction/TonalityAltFunctionBuilder';
import { ChordAltCache, HashingObjectType } from "./building/cache/ChordAltCache";
import { ChordAltStaticNames } from './building/staticnames/ChordAltStaticNames';
import { ChordAltString } from './building/string/ChordAltString';

export type DiatonicAltArray = NonEmptyArray<DiatonicAlt>;
export class ChordAlt extends ChordAltStaticNames implements SymbolicChord<DiatonicAlt, DiatonicAltPattern, ChordAlt> {
    private static _cache = new ChordAltCache((hashingObject: HashingObjectType) => new ChordAlt(hashingObject));

    static fromNotes(...notes: DiatonicAltArray): ChordAlt {
        return ChordAlt._cache.getOrCreate(notes);
    }

    static fromRootPattern(root: DiatonicAlt, pattern: DiatonicAltPattern): ChordAlt {
        return RootPatternAltBuilder.from(root, pattern).build();
    }

    static fromTonalityFunction(tonality: TonalityAlt, func: HarmonicFunction): ChordAlt {
        return TonalityAltFunctionBuilder.from(tonality, func).build();
    }

    static fromString(str: string): ChordAlt | null {
        return ChordAltString.from(str).parse();
    }

    private constructor(private _notes: DiatonicAltArray) {
        super();
        Object.freeze(this._notes);
    }

    withInv(n: number = 1): ChordAlt {
        let notes: DiatonicAltArray = [...this.notes];
        Arrays.rotateLeft(notes, n);
        return ChordAlt.fromNotes(...notes);
    }

    withAdd(interval: IntervalDiatonicAlt): ChordAlt {
        let notes: DiatonicAltArray = <DiatonicAltArray>this.notes.map(diatonicAlt => diatonicAlt.withAdd(interval));

        return ChordAlt.fromNotes(...notes);
    }

    withSub(interval: IntervalDiatonicAlt): ChordAlt {
        let notes: DiatonicAltArray = <DiatonicAltArray>this.notes.map(diatonicAlt => diatonicAlt.withSub(interval));

        return ChordAlt.fromNotes(...notes);
    }

    withBass(bass: DiatonicAlt): ChordAlt {
        const oldIndexOfNewBass = this.notes.indexOf(bass);
        if (oldIndexOfNewBass < 0)
            return ChordAlt.fromNotes(bass, ...this.notes);

        return this.withInv(oldIndexOfNewBass);
    }

    has(diatonicAlt: DiatonicAlt): boolean {
        return this.notes.includes(diatonicAlt);
    }

    get root(): DiatonicAlt {
        return this._notes[this.rootIndex];
    }

    get rootIndex(): number {
        return this.pattern.rootIndex;
    }

    get inversionNumber(): number {
        return this.pattern.inversionNumber;
    }

    get notes(): DiatonicAltArray {
        return this._notes;
    }

    get length(): number {
        return this._notes.length;
    }

    get pattern(): DiatonicAltPattern {
        let rootIntervals: IntervalDiatonicAltArray = ChordAlt._getRootIntervalsFromNotes(this.notes);

        return DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    }

    get chord(): ChromaticChord {
        let notes = <ChromaticArray>this.notes.map((diatonicAlt: DiatonicAlt) => diatonicAlt.note);

        return ChromaticChord.fromNotes(...notes);
    }

    private static _getRootIntervalsFromNotes(notes: DiatonicAltArray): IntervalDiatonicAltArray {
        let rootIntervals: IntervalDiatonicAlt[] = [];
        for (let i = 0; i < notes.length; i++) {
            let rootInterval = IntervalDiatonicAlt.between(notes[0], notes[i]);
            while (i > 0 && rootIntervals[i - 1].interval >= rootInterval.interval)
                rootInterval = rootInterval.withAdd(IntervalDiatonicAlt.PERFECT_OCTAVE);
            rootIntervals.push(rootInterval);
        }

        return <IntervalDiatonicAltArray>rootIntervals;
    }

    toString(): string {
        return new NameChordCalculator(this).get();
    }
}