import { Immutables } from '@datune/utils/Immutables';
import { rotativeTrim } from '@datune/utils/MathUtils';
import { arrayRotateLeft } from '@datune/utils/Utils';
import { Chromatic } from '../degrees/Chromatic';
import { NameChordCalculator } from '../lang/naming/NameChordCalculator';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { Chord } from './Chord';
import { ChromaticCache, HashingObjectType } from './ChromaticChordCache';
import { ChromaticChordStaticNames } from './ChromaticChordStaticNames';

export class ChromaticChordMainClass extends ChromaticChordStaticNames implements Chord<Chromatic, number> {
    private static _cache = new ChromaticCache((hashingObject: HashingObjectType) => new ChromaticChordMainClass(hashingObject));

    private _notes: Chromatic[];

    static from(notes: Chromatic[]): ChromaticChordMainClass {
        return this._cache.getOrCreate(notes);
    }

    private constructor(notes: Chromatic[]) {
        super();

        this._notes = Array.from(notes);

        Immutables.lock(this._notes);
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

    get notes(): Chromatic[] {
        return this._notes;
    }

    withInv(n: number = 1): ChromaticChordMainClass {
        let rootIndex = this.rootIndex - n;
        rootIndex = rotativeTrim(rootIndex, this._notes.length);
        let notes = Array.from(this.notes);
        notes = arrayRotateLeft(notes, n);

        return ChromaticChordMainClass.from(notes);
    }

    withShift(interval: number): ChromaticChordMainClass {
        let notes: Chromatic[] = this.notes.map(note => note.withShift(interval));

        return ChromaticChordMainClass.from(notes);
    }

    withBass(bass: Chromatic): ChromaticChordMainClass {
        const oldIndexOfNewBass = this.notes.indexOf(bass);
        if (oldIndexOfNewBass < 0)
            return null;

        return this.withInv(oldIndexOfNewBass);
    }

    get pattern(): ChromaticPattern {
        let patternArray = this.getRootIntervalsArray();

        return ChromaticPattern.fromRootIntervals(...patternArray);
    }

    private getRootIntervalsArray(): number[] {
        let patternArray = [0];
        let last: Chromatic;

        const unsortedNotes: Chromatic[] = this.notes;

        let first = true;
        unsortedNotes.forEach(current => {
            if (first) {
                first = false;
                last = current;
                return;
            }

            let dist = rotativeTrim(current.valueOf() - last.valueOf(), Chromatic.NUMBER);
            patternArray.push(dist);
        });

        return patternArray;
    }

    toString(): string {
        return new NameChordCalculator(this).get();
    }
}