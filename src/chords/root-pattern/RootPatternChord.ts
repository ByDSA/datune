import { Chromatic } from '../../degrees/Chromatic';
import { Degree } from '../../degrees/Degree';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { DegreePattern } from '../../patterns/DegreePattern';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { Chord } from '../Chord';
import { ChromaticChord } from '../chromatic/ChromaticChord';
import { DiatonicAltChord } from '../diatonicalt/DiatonicAltChord';

export class RootPatternChord<D extends Degree, I> {
    private constructor(private _degree: D, private _degreePattern: DegreePattern<D, I>) {
    }

    public static from<D extends Degree, I>(degree: D, pattern: DegreePattern<D, I>): RootPatternChord<D, I> {
        return new RootPatternChord(degree, pattern);
    }

    public get chord(): Chord<Degree, any> {
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
            let chromaticShifted: Chromatic = (<Chromatic><any>this._degree).getShift(semis);
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
            let diatonicAltShifted: DiatonicAlt = (<DiatonicAlt><any>this._degree).getAdd(semis);
            notes.push(diatonicAltShifted);
        }

        return notes;
    }

    private getDiatonicAltChord(): DiatonicAltChord {
        let notes = this.getDiatonicAltChordNotes();
        return DiatonicAltChord.from(notes);
    }

    /* Getters and setters */

    public get degree(): D {
        return this._degree;
    }

    public set degree(degree: D) {
        this._degree = degree;
    }

    public get pattern(): DegreePattern<D, I> {
        return this._degreePattern;
    }

    public set pattern(pattern: DegreePattern<D, I>) {
        this._degreePattern = pattern;
    }

    /* Object */

    public toString(): string {
        return this._degree.toString() + " " + this._degreePattern;
    }
}
