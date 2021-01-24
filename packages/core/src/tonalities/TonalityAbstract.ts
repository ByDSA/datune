import { NonEmptyArray } from '@datune/utils';
import { SymbolicChord } from '../chords';
import { SymbolicDegree } from '../pitches';
import { ScaleAbstract } from '../scales';
import { Pattern } from '../voicings';

export abstract class TonalityAbstract<INTERVAL, PATTERN extends Pattern<DEGREE, INTERVAL>, DEGREE extends SymbolicDegree, SCALE extends ScaleAbstract<INTERVAL, any>, CHORD extends SymbolicChord<DEGREE, PATTERN, CHORD>> {
    private _notes: NonEmptyArray<DEGREE> | undefined;
    private _rootChord3: Readonly<CHORD | null> | undefined;
    private _rootChord4: Readonly<CHORD | null> | undefined;

    protected constructor(private _root: DEGREE, private _scale: SCALE) {
    }

    protected abstract calcNotes(): NonEmptyArray<DEGREE>;

    protected abstract calcRootChord3(): CHORD | null;

    protected abstract calcRootChord4(): CHORD | null;

    hasChord(chord: CHORD): boolean {
        return this.hasNotes(...chord.notes);
    }

    hasNotes(...notes: NonEmptyArray<DEGREE>): boolean {
        for (let chromatic of notes) {
            if (!this.notes.includes(chromatic))
                return false;
        }

        return true;
    }

    get root(): DEGREE {
        return this._root;
    }

    get scale(): SCALE {
        return this._scale;
    }

    get rootChord3(): CHORD | null {
        if (!this._rootChord3)
            this._rootChord3 = this.calcRootChord3();
        return this._rootChord3;
    }

    get rootChord4(): CHORD | null {
        if (!this._rootChord4)
            this._rootChord4 = this.calcRootChord4();
        return this._rootChord4;
    }

    get length(): number {
        return this._scale.length;
    }

    get notes(): NonEmptyArray<DEGREE> {
        if (!this._notes)
            this._notes = <NonEmptyArray<DEGREE>>Object.freeze(this.calcNotes());
        return this._notes;
    }

    abstract hashCode(): string;

    toString(): string {
        return this.root.toString() + " " + this.scale.toString();
    }
}