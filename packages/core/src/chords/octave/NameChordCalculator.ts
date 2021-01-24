import { DiatonicAlt } from '../../pitches';
import { Pattern } from '../../voicings/relative/Pattern';
import { SymbolicChord } from './SymbolicChord';

export class NameChordCalculator {
    private pattern: Pattern<any, any> | undefined;
    private inversion: number | undefined;

    constructor(private chord: SymbolicChord<any, any, any>) {
    }

    get(): string {
        this.inversion = this.chord.inversionNumber;
        this.pattern = <Pattern<any, any>>this.chord.pattern.withInv(this.chord.rootIndex);

        return this.chord.root.toString() + this.pattern.shortName + this.inversionName();
    }

    private inversionName(): string {
        if (this.inversion == 0 || !this.pattern)
            return "";

        let chromatic: DiatonicAlt = this.chord.notes[0];
        let str = "/" + chromatic.toString();

        return str;
    }
}