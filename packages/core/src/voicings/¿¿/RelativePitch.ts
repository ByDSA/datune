import { SymbolicDegree } from "../../pitches";

export class RelativePitch<D extends SymbolicDegree> {
    private constructor(private _degree: D, private _octaveRelative: number) {
    }

    static from<D extends SymbolicDegree>(degree: D, octaveRelative: number): RelativePitch<D> {
        return new RelativePitch(degree, octaveRelative);
    }

    get octaveRelative(): number {
        return this._octaveRelative;
    }

    get degree(): D {
        return this._degree;
    }

    toString(): string {
        return this._degree + " " + this._octaveRelative;
    }
}