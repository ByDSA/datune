import { Chord } from '../../chords/Chord';
import { Chromatic } from '../../degrees/Chromatic';
import { Degree } from '../../degrees/Degree';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { DegreePattern } from '../../patterns/DegreePattern';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { ChromaticChord } from '../chromatic/ChromaticChord';
import { DiatonicAltChord } from '../diatonicalt/DiatonicAltChord';

export class PatternChord<D extends Degree> {
    private constructor(private _degree: D, private _degreePattern: DegreePattern<D>) {
    }

    public static from<D extends Degree>(degree: D, pattern: DegreePattern<D>): PatternChord<D> {
        return new PatternChord(degree, pattern);
    }

    public get chord(): Chord<Degree> {
        let notes = this.calculateNotes();

        if (this._degree instanceof Chromatic) {
            let ret: Chord<Chromatic> = ChromaticChord.from(<Chromatic[]>notes);
            return ret;
        } else if (this._degree instanceof DiatonicAlt) {
            let ret: Chord<DiatonicAlt> = DiatonicAltChord.from(<DiatonicAlt[]>notes);
            return ret;
        } else
            throw new Error();
    }

    private calculateNotes(): Degree[] {
        let notes: Degree[] = [];

        if (this._degree instanceof Chromatic)
            for (let semis of <ChromaticPattern>this.pattern) {
                let chromaticShifted: Chromatic = (<Chromatic>this._degree).getShift(semis);
                notes.push(chromaticShifted);
            }
        else if (this._degree instanceof DiatonicAlt)
            for (let semis of <DiatonicAltPattern>this.pattern) {
                let chromaticShifted: DiatonicAlt = (<DiatonicAlt>this._degree).getAdd(semis);
                notes.push(chromaticShifted);
            }

        return notes;
    }

    /* Getters and setters */

    public get degree(): D {
        return this._degree;
    }

    public set degree(degree: D) {
        this._degree = degree;
    }

    public get pattern(): DegreePattern<D> {
        return this._degreePattern;
    }

    public set pattern(pattern: DegreePattern<D>) {
        this._degreePattern = pattern;
    }

    /* Object */

    public toString(): string {
        return this._degree.toString() + " " + this._degreePattern;
    }
}