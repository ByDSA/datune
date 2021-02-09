import { Arrays, mod, NonEmptyArray, NumberArray } from '@datune/utils';
import { Chromatic } from '../../../pitches';
import { NoteSet } from '../../../sets/noteset/NoteSet';
import { HarmonicFunction, Tonality } from '../../../tonalities';
import { ChromaticPattern } from '../../../voicings';
import { NameChordCalculator } from '../../octave/NameChordCalculator';
import { SymbolicChord } from '../SymbolicChord';
import { RootPatternBuilder } from './building/builders/rootpattern/RootPatternBuilder';
import { TonalityFunctionBuilder } from './building/builders/tonalityfunction/TonalityFunctionBuilder';
import { ChromaticChordCache, HashingObjectType } from './building/cache/ChromaticChordCache';
import { ChromaticChordFinder } from './building/finder/ChromaticChordFinder';
import { ChordStaticNames } from './building/staticnames/ChromaticChordStaticNames';
import { ChromaticChordString } from './building/string/ChromaticChordString';

export type ChromaticArray = NonEmptyArray<Chromatic>;
export class ChromaticChord extends ChordStaticNames implements SymbolicChord<Chromatic, ChromaticPattern, ChromaticChord> {
    private static _cache = new ChromaticChordCache((hashingObject: HashingObjectType) => new ChromaticChord(hashingObject));
    private _precalcPattern: ChromaticPattern | undefined;

    static finder(): ChromaticChordFinder {
        return new ChromaticChordFinder();
    }

    static fromNotes(...notes: ChromaticArray): ChromaticChord {
        return this._cache.getOrCreate(notes);
    }

    static fromRootPattern(root: Chromatic, pattern: ChromaticPattern): ChromaticChord {
        return RootPatternBuilder.from(root, pattern).build();
    }

    static fromTonalityFunction(tonality: Tonality, func: HarmonicFunction): ChromaticChord {
        return TonalityFunctionBuilder.from(tonality, func).build();
    }

    static fromString(str: string): ChromaticChord | null {
        return ChromaticChordString.from(str).parse();
    }

    private constructor(private _notes: ChromaticArray) {
        super();
        Object.freeze(this._notes);
    }

    withInv(n: number = 1): ChromaticChord {
        let notes: ChromaticArray = [...this.notes];
        Arrays.rotateLeft(notes, n);

        return ChromaticChord.fromNotes(...notes);
    }

    withShift(interval: number): ChromaticChord {
        let notes: ChromaticArray = <ChromaticArray>this.notes.map(chromatic => chromatic.withShift(interval));

        return ChromaticChord.fromNotes(...notes);
    }

    withBass(bass: Chromatic): ChromaticChord {
        const oldIndexOfNewBass = this.notes.indexOf(bass);
        if (oldIndexOfNewBass < 0)
            return ChromaticChord.fromNotes(bass, ...this.notes);;

        return this.withInv(oldIndexOfNewBass);
    }

    has(...chromatics: ChromaticArray): boolean {
        for (const c of chromatics)
            if (!this.notes.includes(c))
                return false;
        return true;
    }

    get root(): Chromatic {
        return this.notes[this.rootIndex];
    }

    get rootIndex(): number {
        return this.pattern.rootIndex;
    }

    get inversionNumber(): number {
        return this.pattern.inversionNumber;
    }

    get notes(): ChromaticArray {
        return this._notes;
    }

    get length() {
        return this._notes.length;
    }

    get pattern(): ChromaticPattern {
        if (!this._precalcPattern) {
            let rootIntervals = this._getRootIntervalsArray();

            this._precalcPattern = ChromaticPattern.fromRootIntervals(...rootIntervals);
            Object.freeze(this._precalcPattern);
        }

        return this._precalcPattern;
    }

    private _getRootIntervalsArray(): NumberArray {
        let patternArray: NumberArray = [0];
        const unsortedNotes: ChromaticArray = this.notes;
        let lastNote: Chromatic = unsortedNotes[0];
        let lastNumber = 0;


        unsortedNotes.forEach((current, i) => {
            if (i == 0) {
                lastNote = current;
                return;
            }

            let dist = mod(current.valueOf() - lastNote.valueOf(), Chromatic.NUMBER);
            let currentNumber = lastNumber + dist;
            patternArray.push(currentNumber);

            lastNumber = currentNumber;
            lastNote = current;
        });

        return patternArray;
    }

    get noteSet(): NoteSet {
        return NoteSet.from(...this.notes);
    }

    toString(): string {
        return new NameChordCalculator(this).get();
    }
}