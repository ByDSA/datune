import { Chromatic } from '../../degrees/Chromatic';
import { Degree } from '../../degrees/Degree';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { DegreePattern } from '../../patterns/DegreePattern';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { Chord } from '../Chord';
import { ChromaticChord } from '../ChromaticChord';
import { DiatonicAltChord } from '../DiatonicAltChord';

export class RootPatternChord<D extends Degree, I> {
    private constructor(private _degree: D, private _degreePattern: DegreePattern<D, I>) {
    }

    static from<D extends Degree, I>(degree: D, pattern: DegreePattern<D, I>): RootPatternChord<D, I> {
        return new RootPatternChord(degree, pattern);
    }

    get chord(): Chord<Degree, any> {
        if (this._degree instanceof Chromatic) {
            return this.getChromaticChord();
        } else if (this._degree instanceof DiatonicAlt) {
            return this.getDiatonicAltChord();
        } else
            throw new Error();
    }

    private getChromaticChordNotes(): Chromatic[] {
        let notes: Chromatic[] = [];
        for (let semis of <ChromaticPattern><any>this.pattern) {
            let chromaticShifted: Chromatic = (<Chromatic><any>this._degree).withShift(semis);
            notes.push(chromaticShifted);
        }

        return notes;
    }

    private getChromaticChord(): ChromaticChord {
        let notes = this.getChromaticChordNotes();
        return ChromaticChord.from(notes);
    }

    private getDiatonicAltChordNotes(): DiatonicAlt[] {
        let notes: DiatonicAlt[] = [];
        for (let semis of <DiatonicAltPattern><any>this.pattern) {
            let diatonicAltShifted: DiatonicAlt = (<DiatonicAlt><any>this._degree).withAdd(semis);
            notes.push(diatonicAltShifted);
        }

        return notes;
    }

    private getDiatonicAltChord(): DiatonicAltChord {
        let notes = this.getDiatonicAltChordNotes();
        return DiatonicAltChord.from(notes);
    }

    /* Getters and setters */

    get degree(): D {
        return this._degree;
    }

    set degree(degree: D) {
        this._degree = degree;
    }

    get pattern(): DegreePattern<D, I> {
        return this._degreePattern;
    }

    set pattern(pattern: DegreePattern<D, I>) {
        this._degreePattern = pattern;
    }

    /* Object */

    toString(): string {
        return this._degree.toString() + " " + this._degreePattern;
    }
}
