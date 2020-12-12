import { Chromatic } from '../../degrees/Chromatic';
import { Degree } from '../../degrees/Degree';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { ChromaticPattern } from '../../patterns/ChromaticPattern';
import { DegreePattern } from '../../patterns/DegreePattern';
import { DiatonicAltPattern } from '../../patterns/DiatonicAltPattern';
import { Chord } from '../Chord';
import { ChromaticChord } from '../ChromaticChord';
import { DiatonicAltChord } from '../DiatonicAltChord';

export class RootPatternBuilder {
    private _degree: Degree;
    private _degreePattern: DegreePattern<Degree, any>;

    private constructor() {
    }

    static create(): RootPatternBuilder {
        return new RootPatternBuilder();
    }

    build(): Chord<Degree, any> {
        this._checkBuildingConsistence();

        if (this._degree instanceof Chromatic) {
            return this.getChromaticChord();
        } else if (this._degree instanceof DiatonicAlt) {
            return this.getDiatonicAltChord();
        } else
            throw new Error();
    }

    private _checkBuildingConsistence() {
        if (!this._degree || !this._degreePattern)
            throw new Error();
    }

    private getChromaticChordNotes(): Chromatic[] {
        let notes: Chromatic[] = [];
        for (let semis of <ChromaticPattern><any>this.getPattern()) {
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
        for (let semis of <DiatonicAltPattern><any>this.getPattern()) {
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

    getRoot(): Degree {
        return this._degree;
    }

    setRoot(degree: Degree): RootPatternBuilder {
        this._degree = degree;

        return this;
    }

    getPattern(): DegreePattern<Degree, any> {
        return this._degreePattern;
    }

    setPattern(pattern: DegreePattern<Degree, any>) {
        this._degreePattern = pattern;

        return this;
    }

    /* Object */

    toString(): string {
        return this._degree.toString() + " " + this._degreePattern;
    }
}
