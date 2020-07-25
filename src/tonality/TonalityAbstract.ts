import { DiatonicAltChord } from '../chords/diatonicalt/DiatonicAltChord';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { ScaleAbstract } from './ScaleAbstract';

type HashingObjectType<I, D> = { root: D, scale: ScaleAbstract<I, D> };
export abstract class TonalityAbstract<I, D, C> {
    protected _notes: D[] = [];
    protected _rootChord3: C;
    protected _rootChord4: C;

    private constructor(private _root: DiatonicAlt, private _scale: ScaleAbstract<I, D>) {
        this.calculateNotes();
        this.calculateRootChord();
    }

    protected abstract calculateNotes();

    private calculateRootChord() {
        this.calculateRootChord3();
        this.calculateRootChord4();

    }

    protected abstract calculateRootChord3();

    protected abstract calculateRootChord4();

    public containsChord(chord: DiatonicAltChord): boolean {
        for (let diatonicAlt of chord.notes) {
            if (!this.containsNote(<D><any>diatonicAlt))
                return false;
        }

        return true;
    }

    public containsNote(note: D): boolean {
        return this.notes.includes(note);
    }

    get root(): DiatonicAlt {
        return this._root;
    }

    get rootChord3(): C {
        return this._rootChord3;
    }

    get rootChord4(): C {
        return this._rootChord4;
    }

    get scale(): ScaleAbstract<I, D> {
        return this._scale;
    }

    get length(): number {
        return this._scale.length;
    }

    get notes(): D[] {
        return this._notes;
    }

    abstract hashCode(): string;

    public toString(): string {
        return this.root.toString() + " " + this.scale.toString();
    }
}