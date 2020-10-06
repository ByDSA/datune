import { Immutables } from '../common/Immutables';
import { rotativeTrim } from '../common/MathUtils';
import { arrayRotateLeft } from '../common/Utils';
import { Chromatic } from '../degrees/Chromatic';
import { NameChordCalculator } from '../lang/naming/NameChordCalculator';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { Chord } from './Chord';
import { ChromaticCache, HashingObjectType } from './ChromaticChordCache';
import { ChromaticChordStaticNames } from './ChromaticChordStaticNames';

export class ChromaticChord extends ChromaticChordStaticNames implements Chord<Chromatic, number> {
    private static _cache = new ChromaticCache((hashingObject: HashingObjectType) => new ChromaticChord(hashingObject));

    private _notes: Chromatic[];

    static from(notes: Chromatic[]): ChromaticChord {
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

    withInv(n: number = 1): ChromaticChord {
        let rootIndex = this.rootIndex - n;
        rootIndex = rotativeTrim(rootIndex, this._notes.length);
        let notes = Array.from(this.notes);
        notes = arrayRotateLeft(notes, n);

        return ChromaticChord.from(notes);
    }

    withShift(interval: number): ChromaticChord {
        let notes: Chromatic[] = this.notes.map(note => note.withShift(interval));

        return ChromaticChord.from(notes);
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