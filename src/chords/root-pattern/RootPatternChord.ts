import { IntervalDiatonicAlt } from 'interval/IntervalDiatonicAlt';
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
        let notes = this.calculateNotes();

        if (this._degree instanceof Chromatic) {
            let ret: Chord<Chromatic, number> = ChromaticChord.from(<Chromatic[]>notes);
            return ret;
        } else if (this._degree instanceof DiatonicAlt) {
            let ret: Chord<DiatonicAlt, IntervalDiatonicAlt> = DiatonicAltChord.from(<DiatonicAlt[]>notes);
            return ret;
        } else
            throw new Error();
    }

    private calculateNotes(): Degree[] {
        let notes: Degree[] = [];

        if (this._degree instanceof Chromatic)
            for (let semis of <ChromaticPattern><any>this.pattern) {
                let chromaticShifted: Chromatic = (<Chromatic>this._degree).getShift(semis);
                notes.push(chromaticShifted);
            }
        else if (this._degree instanceof DiatonicAlt)
            for (let semis of <DiatonicAltPattern><any>this.pattern) {
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
