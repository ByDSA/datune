import { Chord } from '../../chords/Chord';
import { DiatonicAlt } from '../../degrees/DiatonicAlt';
import { DegreePattern } from '../../patterns/DegreePattern';

export class NameChordCalculator {
    private pattern: DegreePattern<any, any>;
    private inversion: number;

    constructor(private chord: Chord<any, any>) {
    }

    get(): string {
        this.inversion = this.chord.inversionNumber;
        this.pattern = this.chord.pattern.withInv(this.chord.rootIndex);

        return this.chord.root.toString() + this.pattern.shortName + this.inversionName();
    }

    private inversionName(): string {
        if (this.inversion == 0 || !this.pattern)
            return "";

        let note: DiatonicAlt = this.chord.notes[0];
        let str = "/" + note.toString();

        return str;
    }
}