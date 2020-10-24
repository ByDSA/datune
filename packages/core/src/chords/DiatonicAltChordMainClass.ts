import { rotativeTrim } from '@datune/utils/MathUtils';
import { arrayRotateLeft } from '@datune/utils/Utils';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { IntervalDiatonicAlt } from '../intervals/IntervalDiatonicAlt';
import { NameChordCalculator } from '../lang/naming/NameChordCalculator';
import { DiatonicAltPattern } from '../patterns/DiatonicAltPattern';
import { Chord } from './Chord';
import { ChromaticChord } from './ChromaticChord';
import { DiatonicAltChordCache, HashingObjectType } from "./DiatonicAltChordCache";
import { DiatonicAltChordStaticNames } from './DiatonicAltChordStaticNames';

export class DiatonicAltChordMainClass extends DiatonicAltChordStaticNames implements Chord<DiatonicAlt, IntervalDiatonicAlt> {
    private static _cache = new DiatonicAltChordCache((hashingObject: HashingObjectType) => new DiatonicAltChordMainClass(hashingObject));

    private constructor(private _notes: DiatonicAlt[]) {
        super();
    }

    static from(notes: readonly DiatonicAlt[]): DiatonicAltChordMainClass {
        if (!notes)
            return null;
        const nonNullNotes = notes.filter(note => note);
        if (nonNullNotes.length === 0)
            return null;
        return DiatonicAltChordMainClass._cache.getOrCreate(nonNullNotes);
    }

    withInv(n: number = 1): DiatonicAltChordMainClass {
        let rootIndex = this.rootIndex - n;
        rootIndex = rotativeTrim(rootIndex, this._notes.length);
        let notes = this.notes;
        notes = arrayRotateLeft(notes, n);
        return DiatonicAltChordMainClass.from(notes);
    }

    withAdd(interval: IntervalDiatonicAlt): DiatonicAltChordMainClass {
        let notes: DiatonicAlt[] = this.notes.map(note => note.withAdd(interval));

        return DiatonicAltChordMainClass.from(notes);
    }

    withSub(interval: IntervalDiatonicAlt): DiatonicAltChordMainClass {
        let notes: DiatonicAlt[] = this.notes.map(note => note.withSub(interval));

        return DiatonicAltChordMainClass.from(notes);
    }

    withBass(bass: DiatonicAlt): DiatonicAltChordMainClass {
        const oldIndexOfNewBass = this.notes.indexOf(bass);
        if (oldIndexOfNewBass < 0)
            return null;

        return this.withInv(oldIndexOfNewBass);
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

    get notes(): DiatonicAlt[] {
        return Array.from(this._notes);
    }

    get length() {
        return this._notes.length;
    }

    get pattern(): DiatonicAltPattern {
        let rootIntervals: IntervalDiatonicAlt[] = DiatonicAltChordMainClass.getRootIntervalsFromNotes(this.notes);

        return DiatonicAltPattern.fromRootIntervals(...rootIntervals);
    }

    get chromaticChord(): ChromaticChord {
        let notesChromatic = this.notes.map((diatonicAlt: DiatonicAlt) => diatonicAlt.chromatic);

        return ChromaticChord.from(notesChromatic);
    }

    private static getRootIntervalsFromNotes(notes: DiatonicAlt[]): IntervalDiatonicAlt[] {
        let rootIntervals: IntervalDiatonicAlt[] = [];
        for (let i = 0; i < notes.length; i++) {
            let rootInterval = IntervalDiatonicAlt.between(notes[0], notes[i]);
            while (i > 0 && rootIntervals[i - 1].intervalChromatic >= rootInterval.intervalChromatic)
                rootInterval = rootInterval.withAdd(IntervalDiatonicAlt.PERFECT_OCTAVE);
            rootIntervals.push(rootInterval);
        }

        return rootIntervals;
    }

    toString(): string {
        return new NameChordCalculator(this).get();
    }
}